class ContactList {
    #contacts = [];
    #contactList;
    #root;
    constructor($target) {
        this.#root = $(`
        <div class="contact-list-wrapper">
            <div class="search-field">
                <i name="btn_search_field" class="fa fa-search" aria-hidden="true"></i>
                <input name="search_field" placeholder="Procurar contato">
            </div>
            <div class="contact-list"></div>
        </div>`);
        $target.append(this.#root);
        this.#contactList = this.#root.find('.contact-list');
        this.#root.find('[name="search_field"]').on('keyup', this.#handleSearchContact.bind(this));
    }
    loadContacts(contactList) {
        if (contactList !== null) {
            contactList = contactList.sort((a, b) => sortAsc(a.name.toLowerCase(), b.name.toLowerCase()));
            for (let i = 0; i < contactList.length; i++) {
                this.#appendContactSeparator(contactList[i].name);
                this.#appendContact(contactList[i]);
            }

            this.#contactList.find('[name="phone"]').mask('(00) 9 0000-0000');
        }
        else {
            contactList = [];
        }

        this.#contacts = contactList;
    }
    addContact(contact) {
        this.#contacts.push(contact);
        this.sortContacts();
    }
    #appendContact(contact) {
        this.#contactList.append(`
            <div class="contact-item">
                <i class="contact-img fas fa-user-circle"></i>
                <div class="contact-item-info">
                    <label name="name" class="contact-name">${contact.name}</label>
                    <div class="contact-communication">
                        <div class="contact-communication-item">
                            <i class="fas fa-phone verde"></i>
                            <span name="phone">${contact.phone}</span>
                        </div>
                        ${contact.email ? `<div class="contact-communication-item"><i class="fas fa-at vermelho"></i><span name="email">${contact.email}</span></div>` : ''}
                    </div>
                    <i name="btn_contact_options" class="fas fa-chevron-right"></i>
                </div>
            </div>
        `);
    }
    #appendContactSeparator(title) {
        title = title[0].toUpperCase();
        const separatorList = this.#contactList.find('.contact-list-separator').toArray();
        for (let i = 0; i < separatorList.length; i++) {

            let term = $(separatorList[i]).text();
            if (term === title) return;
        }

        this.#contactList.append(`<div class="contact-list-separator">${title}</div>`);
    }
    sortContacts() {
        this.#contactList.html('');
        this.#contacts = this.#contacts.sort((a, b) => sortAsc(a.name.toLowerCase(), b.name.toLowerCase()));
        for (let i = 0; i < this.#contacts.length; i++) {
            this.#appendContactSeparator(this.#contacts[i].name);
            this.#appendContact(this.#contacts[i]);
        }

        this.#contactList.find('[name="phone"]').mask('(00) 9 0000-0000');
    }
    #searchContact() {
        let term = this.#root.find('[name="search_field"]').val();
        term = term.toLowerCase();

        const contacts = this.#contactList.find('.contact-item').toArray();
        for (let i = 0; i < contacts.length; i++) {
            const name = $(contacts[i]).find('[name="name"]').text().toLowerCase();
            const phone = $(contacts[i]).find('[name="phone"]').text();
            if (name.indexOf(term) === -1 && phone.indexOf(term) === -1) {
                $(contacts[i]).addClass('hidden');
            }
            else {
                $(contacts[i]).removeClass('hidden');
            }
        }
    }

    #handleSearchContact() {
        this.#searchContact();
    }
}