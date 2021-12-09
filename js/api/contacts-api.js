class ContactsApi {
    static saveContacts = (contact) => {
        contact.id = new Date().getTime();
        let contactList = this.getContacts();
        if (!contactList) { contactList = []; }
        contactList.push(contact);

        const jsoncontactList = JSON.stringify(contactList);
        localStorage.setItem('contact-list', jsoncontactList);
    };

    static getContacts() {
        const contacts = JSON.parse(localStorage.getItem('contact-list'));
        return contacts;
    }
}