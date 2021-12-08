class ContactsApi {
    static saveContacts = (contact) => {
        contact.id = new Date().getTime();
        const contactList = this.getContacts();
        contactList.push(contact);

        const jsoncontactList = JSON.stringify(contactList);
        localStorage.setItem('contact-list', jsoncontactList);
    };

    static getContacts() {
        const contacts = JSON.parse(localStorage.getItem('contact-list'));
        return contacts;
    }
}