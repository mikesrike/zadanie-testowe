# Edytor listy JSON

Przed uruchomieniem serwera należy ustawić dowiązanie symboliczne katalogu storage żeby umożliwić aplikacji dostęp i edycję plików .json. Robimy to komendą:

```sh
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
