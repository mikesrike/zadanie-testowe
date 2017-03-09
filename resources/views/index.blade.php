@extends('templates.main')

@section('content')
    @include('shared.modal')
    <div class="notify"></div>
    <div class="section">
        <div class="container">
            <div class="columns">
                <div class="column is-narrow">
                    <p class="title">
                        Edytor listy JSON
                    </p>
                </div>

                <div class="column is-narrow">
                    <a id="save" class="button">
                        Zapisz
                    </a>

                    <a id="add" class="button">
                        Dodaj element
                    </a>
                </div>
            </div>

            <div class="notification">
                Kliknięcie na wybrane nazwisko spowoduje przeniesienie go do
                drugiej kolumny. Pliki JSON są aktualizowane dopiero po
                wcięsnięciu przycisku "zapisz".
            </div>

            <p class="control has-icon search">
                <input id="search-input" class="input" type="text" placeholder="Szukaj w enabled">
                <span class="icon is-small">
                    <i class="fa fa-search"></i>
                </span>
            </p>

            <div class="box">
                <div class="columns">
                    <div class="column border-right">
                        <p class="title is-4">
                            Enabled
                        </p>

                        <div class="container enabled">
                            {{-- W tym miejscu pokażą się imiona i nazwiska --}}
                        </div>
                    </div>

                    <div class="column">
                        <p class="title is-4">
                            Disabled
                        </p>

                        <div class="container disabled">
                            {{-- W tym miejscu pokażą się imiona i nazwiska --}}
                        </div>
                    </div>
                </div>
            </div>

            <div class="container json">
                <p class="title is-4">
                    Podgląd plików JSON
                </p>

                <div class="columns">
                    <div class="column border-right">
                        <p class="title is-5">
                            enabled.json
                        </p>

                        <div class="wrapper-code">
                            <div class="container code enabled-json">
                                Ładowanie...
                            </div>

                            <a href="{{ asset('storage/enabled.json') }}" class="button json-link" download>
                                Pobierz
                            </a>
                        </div>
                    </div>

                    <div class="column">
                        <p class="title is-5">
                            disabled.json
                        </p>

                        <div class="wrapper-code">
                            <div class="container code disabled-json">
                                Ładowanie...
                            </div>

                            <a href="{{ asset('storage/disabled.json') }}" class="button json-link" download>
                                Pobierz
                            </a>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </div>
@endsection
