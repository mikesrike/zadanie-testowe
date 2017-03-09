<div id="modal-add" class="modal">
    <div class="modal-background"></div>
    <div class="modal-content">
        <div class="container">
            <div class="box">
                <p class="title is-4">
                    Dodawanie elementu
                </p>

                <form id="form-add">
                    <label class="label">Imię i nazwisko</label>
                    <p class="control">
                        <input id="input-name" class="input" type="text" placeholder="Imię i nazwisko" autocomplete="off">

                        <span class="tooltips"></span>
                    </p>

                    <label class="label">Tabela</label>
                    <p class="control">
                        <label class="radio">
                            <input type="radio" name="table" value="enabled" checked>
                            Enabled
                        </label>

                        <label class="radio">
                            <input type="radio" name="table" value="disabled">
                            Disabled
                        </label>
                    </p>

                    <button class="button is-pulled-right" type="submit">
                        Dodaj element
                    </button>

                    <div class="clearfix"></div>
                </form>

            </div>
        </div>
    </div>
    <button class="modal-close"></button>
</div>
