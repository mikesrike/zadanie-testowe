// Deklaracja globalnych zmiennych zawierających aktualne tablele
var enabled = { names: [] };
var disabled = { names: [] };

/**
 * Funkcja dodaje wszystkie imiona i nazwiska do poszczególnych tabeli oraz
 * dodaje do przycisków event umożliwiający kliknięcie
 *
 * @param  {object} data   Obiekt zawierający imiona i nazwiska do dodania
 * @param  {string} column Nazwa kolumny do której mają zostać dodane imiona i
 *                         nazwiska. Przyjmuje wartości 'enabled' lub 'disabled'
 */
function insert(data, column) {
    for (var i = 0; i < data.names.length; i++) {
        var html = '<div class="item"><div class="first-name">' +
            data.names[i].firstName + '</div><div class="last-name">' +
            data.names[i].lastName + '</div></div>';

        if (column == 'enabled') {
            $('.container.enabled').append(html);
        } else {
            $('.container.disabled').append(html);
        }
    }

    if (column == 'enabled') {
        $('.container.enabled .item').on('click', move);
    } else {
        $('.container.disabled .item').on('click', move);
    }

    return;
}

/**
 * Funkcja pobiera pliki JSON przy pomocy API, a następnie wywołuje funkcję
 * umieszczającą wszystkie wpisy w tabelach, funkcję sortującą oraz wczytuje
 * aktualny stan plików do podglądu.
 */
function load() {
    $.getJSON("/api/enabled", function(data) {
        insert(data, 'enabled');
    });

    $.getJSON("/api/disabled", function(data) {
        insert(data, 'disabled');
        sort();
        updatePreview();
    });

    return;
}

/**
 * Funkcja zapisuje wszystkie zmiany w kolumnach do obiektów, a następnie
 * wysyła obiekty do API, gdzie są później zapisywane w formie plików .json.
 * Po otrzymaniu odpowiedzi zwrotnej od serwera API funkcja odświeża pogląd
 * plików oraz pokazuje komunikat o powodzeniu bądź niepowodzeniu.
 */
function save() {
    var errors = 0;

    $.ajax({
        url: '/api/save-enabled',
        type: 'get',
        dataType: 'json',
        data: enabled
    })
    .done(function() {
        updatePreview();
    })
    .fail(function() {
        errors++;
    });

    $.ajax({
        url: '/api/save-disabled',
        type: 'get',
        dataType: 'json',
        data: disabled
    })
    .done(function() {
        updatePreview();
    })
    .fail(function() {
        errors++;
    })
    .always(function() {
        if (errors > 0) {
            notify('Aktualizacja plików nie powiodła się');
        } else {
            notify('Pomyślnie zaktualizowano pliki');
        }
    });

    return;
}

/**
 * Funkcja sortuje wpisy w tabelach. Jest wywoływana każdorazowo po zmianie w
 * tabeli.
 */
function sort() {
    enabled = { names: [] };
    disabled = { names: [] };

    $('.container.enabled .item').each(function(index, el) {
        var name = {
            'firstName': $(this).children('.first-name').text(),
            'lastName': $(this).children('.last-name').text()
        }

        enabled.names.push(name);
    });

    $('.container.disabled .item').each(function(index, el) {
        var name = {
            'firstName': $(this).children('.first-name').text(),
            'lastName': $(this).children('.last-name').text()
        }

        disabled.names.push(name);
    });

    enabled.names.sort(function(a, b) {
        return a.id - b.id  ||  a.lastName.localeCompare(b.lastName);
    });

    disabled.names.sort(function(a, b) {
        return a.id - b.id  ||  a.lastName.localeCompare(b.lastName);
    });

    $('.container.enabled, .container.disabled').empty();

    insert(enabled, 'enabled');
    insert(disabled, 'disabled');

    return;
}

/**
 * Funkcja odświeża aktualny podgląd plików JSON.
 */
function updatePreview() {
    $('.container.code').empty();

    $('.enabled-json').append('<pre>' + JSON.stringify(enabled, null, 4) + '</pre>');
    $('.disabled-json').append('<pre>' + JSON.stringify(disabled, null, 4) + '</pre>');

    return;
}

/**
 * Funkcja wywoływana kliknięciem na imię/nazwisko przerzuca dane imię/nazwisko
 * do przeciwnej kolumny, a następnie wywoływuje sortowanie elementów.
 */
function move() {
    var currentColumn = $(this).parent('.container').attr('class');
    var element = $(this).detach();

    if (currentColumn.includes('enabled')) {
        $('.container.disabled').append(element);
    } else {
        $('.container.enabled').append(element);
    }

    sort();

    return;
}

/**
 * Funkcja pokazuje przez 2 sekundy powiadomienie obok przycisku 'zapisz'.
 *
 * @param  {string} message Treść wiadomości jaka ma się pokazać
 */
function notify(message) {
    $('.notify').empty();

    $('.notify').append(message);

    $('.notify').addClass('visible');

    setTimeout(function(){
        $('.notify').removeClass('visible');
    }, 2000);

    return;
}

/**
 * Funkcja wywołana wpisywaniem w polu szukania liter filtruje wyniki
 * wyszukiwania i ukrywa elementy które nie pasują do szukanej frazy.
 */
function search() {
    var search = $('#search-input').val().toLowerCase();

    $('.container.enabled .item').each(function(index, el) {
        $(this).removeClass('nodisplay');

        var rawItemValue = $(this).children('.first-name').text() + ' ' +
            $(this).children('.last-name').text();
        var itemValue = rawItemValue.toLowerCase();

        if (!itemValue.includes(search)) {
            $(this).addClass('nodisplay');
        }
    });

    return;
}

$(document).ready(function() {
    load();

    $('#save').click(save);
    $('#search-input').keyup(search);
});
