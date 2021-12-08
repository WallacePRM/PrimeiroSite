class ModalUtils {
    #backgroundModal;
    constructor(header, content, footer) {
        const $modal = this.#create(header, content, footer);
        this.#backgroundModal = $(`<div class="background-modal"></div>`);
        this.#backgroundModal.append($modal);

        $('body').append(this.#backgroundModal);
    }
    #create(header, content, footer) {
        const $modal = $(`<div class="modal">
            ${header}
            ${content}
            ${footer || ''}
        </div>`);

        return $modal;
    }
    show() {
       this.#backgroundModal.addClass('active');
    }
    hide() {
        this.#backgroundModal.remove();
    }
    getRootElement() {
        return this.#backgroundModal;
    }
}