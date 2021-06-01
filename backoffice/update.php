<div class="modal micromodal-slide" id="update" aria-hidden="true">
    <div class="modal__overlay" tabindex="-1" data-micromodal-close>
        <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="update-title">
            <header class="modal__header">
                <h2 class="modal__title" id="update-title">
                    Modifier un badge NFC
                </h2>
                <button class="modal__close" aria-label="Close modal" data-micromodal-close></button>
            </header>
            <form action="#" id="update-form">
                <main class="modal__content" id="delete-content">
                        <label for="update-select">Choix du badge</label>
                        <select name="update-select" id="update-select">
                            <?php
                                $users = callWB("http://localhost:3000/users");
                                foreach ($users as $user){
                                    echo '<option value="'.$user['uid'].'">'.$user['uid'].'</option>';
                                }
                            ?>
                        </select>

                        <label for="update-uid">UID</label>
                        <input type="text" name="uid" id="update-uid">

                        <label for="update-name">NOM</label>
                        <input type="text" name="name" id="update-name">
                </main>
                <footer class="modal__footer">
                    <button class="modal__btn modal__btn-primary" type="submit" id="update-submit">Modifier</button>
                    <button class="modal__btn" data-micromodal-close aria-label="Close this dialog window">Close</button>
                </footer>
            </form>
        </div>
    </div>
</div>