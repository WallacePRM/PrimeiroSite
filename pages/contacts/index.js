class Contacts {
    #contactListComp;
    constructor() {
        this.#bindEvents();
        this.#init();
    }
    #bindEvents() {
        $('[name="btn_show_modal"]').on('click', this.#handleShowModal.bind(this));
    }
    #init() {
        const contacts = ContactsApi.getContacts();
        this.#contactListComp = new ContactList($('#page-contacts'));
        this.#contactListComp.loadContacts(contacts);

        $('[name="btn_show_modal"]').addClass('active');
    }

    #handleShowModal() {
        const contactModal = new ContactModal();
        contactModal.onContactCreated = (contact) => {

            this.#contactListComp.addContact(contact);
        };
        contactModal.show();
    }
}

jQuery(() => {
    new Contacts();
});
