# Edytor listy JSON

Przed uruchomieniem serwera należy zainstalować wszystkie zależności oraz ustawić dowiązanie symboliczne katalogu storage żeby umożliwić aplikacji dostęp i edycję plików .json. Robimy to komendami:

```sh
$ composer install
$ php artisan storage:link
```

Następnie uruchamiamy serwer
```sh
$ php artisan serve
```

Aplikacja nie korzysta z żadnej bazy danych, pliki .json znajdują się w katalogu
```
/storage/app/public
```
