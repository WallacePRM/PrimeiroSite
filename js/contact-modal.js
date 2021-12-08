class ContactModal {
    #modalUtils;
    onContactCreated;
    constructor() {
        this.#modalUtils = this.#create();
    }

    show() {
        this.#modalUtils.show();
    }
    hide() {
        this.#modalUtils.hide();
    }

    #create() {
        const header = `<div class="modal-contact-header">
            <i name="btn_cancel" class="btn-cancel fas fa-times"></i>
            <h3>Novo contato</h3>
            <i name="btn_create_contact" class="btn-confirm fas fa-check"></i>
        </div>`;
        const content = `<form class="modal-form">
            <i class="contact-img fas fa-user-circle"></i>
            <div class="modal-contact-content">
                <div class="modal-content-item">
                    <div class="modal-contact-item-info">
                        <label>Nome *</label>
                        <div class="modal-contact-multiple-info">
                            <input name="name" placeholder="nome do contato">
                        </div>
                    </div>
                </div>
                <div class="modal-content-item">
                    <div class="modal-contact-item-info">
                        <label>Telefone *</label>
                        <div class="modal-contact-multiple-info">
                            <select name="ddd"><option value="0">+ 55</option></select>
                            <input name="phone" placeholder="(00) 9 0000-0000">
                        </div>
                    </div>
                </div>
                <div class="modal-content-item">
                    <div class="modal-contact-item-info">
                        <label>E-mail</label>
                        <div class="modal-contact-multiple-info">
                            <input name="email" placeholder="exemplo@provedor.com" type="email">
                        </div>
                    </div>
                </div>
            </div>
        </form>`;
        const modalUtils = new ModalUtils(header, content);
        const $modal = modalUtils.getRootElement();
        $modal.find('[name="btn_cancel"]').on('click', () => this.#handleCloseModal(modalUtils));
        $modal.find('[name="btn_create_contact"]').on('click', (e) => this.#handleCreateContact(e, modalUtils));
        $modal.find('[name="phone"]').mask('(00) 9 0000-0000');

        return modalUtils;
    }
    #getFormContact($form) {
        const contact = {};
        contact.name = $form.find('[name="name"]').val();
        contact.phone = $form.find('[name="phone"]').val();
        contact.email = $form.find('[name="email"]').val();

        return contact;
    }
    #validateContact($form) {
        const contactData = [];
        let verified  = true;

        contactData.push($form.find('[name="name"]'));
        contactData.push($form.find('[name="phone"]'));

        for (var i = 0; i < contactData.length; i++) {
            if (contactData[i].val().trim() === '' || (contactData[i].attr('name') === 'phone' && contactData[i].val().length !== 16)) {
                contactData[i].addClass('erro');
                verified  = false;
            }
            else {
                contactData[i].removeClass('erro');
            }
        }

        return verified;
    };
    #handleCloseModal(modal) {
        modal.hide();
    }
    #handleCreateContact(e, modal) {
        e.preventDefault();

        const $form = $(e.currentTarget).closest('.modal').find('form');
        if (this.#validateContact($form)) {
            const contact = this.#getFormContact($form);
            ContactsApi.saveContacts(contact);
            this.onContactCreated(contact);

            modal.hide();
        }
    }
}