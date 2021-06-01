<div class="modal micromodal-slide" id="delete" aria-hidden="true">
    <div class="modal__overlay" tabindex="-1" data-micromodal-close>
        <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="delete-title">
            <header class="modal__header">
                <h2 class="modal__title" id="delete-title">
                    Supprimer un badge NFC
                </h2>
                <button class="modal__close" aria-label="Close modal" data-micromodal-close></button>
            </header>
            <form action="#" id="delete-form">
                <main class="modal__content" id="delete-content">
                        <label for="delete-select">Choix du badge</label>
                        <select name="delete-select" id="delete-select">
                            <?php
                                $users = callWB("http://localhost:3000/users");
                                foreach ($users as $user){
                                    echo '<option value="'.$user['uid'].'">'.$user['uid'].'</option>';
                                }
                            ?>
                        </select>
                </main>
                <footer class="modal__footer">
                    <button class="modal__btn modal__btn-primary" type="submit" id="delete-submit">Supprimer</button>
                    <button class="modal__btn" data-micromodal-close aria-label="Close this dialog window">Close</button>
                </footer>
            </form>
        </div>
    </div>
</div>