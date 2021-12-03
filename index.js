
var contactList = [];
jQuery(() => {

    $(window).on('resize', () => { 
        setTimeout(function() {
            setDisplayBoardSize();
        }, 200);
    });
    $('button').on('click', (e) => e.preventDefault());

    $('[name="btn_toggle_sidebar"]').on('click', handleToggleSidebar);
    $('.sidebar-nav-item').on('click', handleActiveSidebarNav);

    $('[name="btn_show_modal"]').on('click', handleShowModal);
    $('[name="search_field"]').on('keyup', searchContact);
    $('[name="btn_search_field"]').on('click', handleSearchContact);

    $('[name="btn_create_contact"]').on('click', handleCreateContact);
    $('[name="btn_cancel"]').on('click', handleCloseModal);
    $('[name="btn_mobile_sidebar"]').on('click', handleToggleSidebar);

    /* INIT */
    $('[data-page="page-contacts"]').click();
    loadContacts();
});

function setDisplayBoardSize() {
    const win = $(this); //this = window
    if (win.width() <= 700) {
        $('.sidebar').removeClass('active');
    }
    if (win.width() > 700) {
        $('.sidebar').addClass('active');
    }
}
function toggleSidebar() {
    $('.background-black').off('click');

    if ($('.sidebar').is('.active')) {
        $('.sidebar').removeClass('active');

        if ($(window).width() <= 700) {
            $('.background-black').removeClass('active');
        }
    }
    else {
        $('.sidebar').addClass('active');

        if ($(window).width() <= 700) {
            $('.background-black').on('click', handleToggleSidebar);
            $('.background-black').addClass('active');
        }
    }
}
function showModal() {
    $('.background-modal').addClass('active');
}
function closeModal() {
    $('.background-modal').removeClass('active');
}
function getFormContact($form) {
    const contact = {};
    contact.name = $form.find('[name="name"]').val();
    contact.phone = $form.find('[name="phone"]').val();
    contact.email = $form.find('[name="email"]').val();

    return contact;
}
function validateContact($form) {
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
function saveContact(contact) {
    contactList.push(contact);
    var jsoncontactList = JSON.stringify(contactList);
    localStorage.setItem('contact-list' ,jsoncontactList);
}
function appendContactSeparator(title) {
    let exist = false;
    title = title[0].toUpperCase();
    const separatorList = $('.contact-list-separator').toArray();
    for (let i = 0; i < separatorList.length; i++) {

        let term = $(separatorList[i]).text();
        if (term === title) {
            exist = true;
            return;
        }
    }

    if (!exist) {
        $('.contact-list').append(`<div class="contact-list-separator">${title}</div>`);
    }
}
function appendContact(contact) {
    $('.contact-list').append(`
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
function loadContacts() {
    contactList = JSON.parse(localStorage.getItem('contact-list'));
    if (contactList !== null) {
        contactList = contactList.sort((a, b) => sortAsc(a.name.toLowerCase(), b.name.toLowerCase()));
        for (let i = 0; i < contactList.length; i++) {
            appendContactSeparator(contactList[i].name);
            appendContact(contactList[i]);
        }

        $('[name="phone"]').mask('(00) 9 0000-0000');
    }
    else {
        contactList = [];
    }
}
function searchContact() {
    let term = $('[name="search_field"]').val();
    term = term.toLowerCase();

    const contacts = $('.contact-item').toArray();
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
function sortContacts() {

    $('.contact-list').html('');
    contactList = contactList.sort((a, b) => sortAsc(a.name.toLowerCase(), b.name.toLowerCase()));
    for (let i = 0; i < contactList.length; i++) {
        appendContactSeparator(contactList[i].name);
        appendContact(contactList[i]);
    }

    $('[name="phone"]').mask('(00) 9 0000-0000');
}
/* HANDLES FUNCTIONS */
function handleActiveSidebarNav(e) {

    $('.sidebar-nav-item').removeClass('active');
    const $navItem = $(e.currentTarget);
    $navItem.addClass('active');

    if ($navItem.is('[data-page="page-contacts"]')) {
        $('.btn-modal').addClass('active');
    }
    else {
        $('.btn-modal').removeClass('active');
    }

    if ($(window).width() <= 700) {
        toggleSidebar();
    }
}
function handleToggleSidebar() {
    toggleSidebar();
}
function handleShowModal() {
    showModal();
}
function handleCloseModal() {
    closeModal();
}
function handleSearchContact() {
    searchContact();
}
function handleCreateContact(e) {
    e.preventDefault();

    const $form = $(e.currentTarget).closest('.modal-contact').find('form');
    if (validateContact($form)) {
        const contact = getFormContact($form);
        saveContact(contact);
        sortContacts();

        closeModal();
    }
}