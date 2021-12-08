class App {
    constructor() {
        this.#bindEvents();
        this.#init();
    }

    #setDisplayBoardSize() {
        const width = $(window).width();
        if (width <= 700) {
            $('.sidebar').removeClass('active');
        }
        if (width > 700) {
            $('.sidebar').addClass('active');
        }
    }
    #appendPage(html) {
        const $html = $(html);
        for (const element of $html.toArray()) {
            if ($(element).is('link')) {
                $('head').append(element);
            }
            else if ($(element).is('script')) {
                const script = document.createElement('script');
                script.src = element.src;

                document.body.append(script);
            }
            else {
                $('.pages-content').append(element);
            }
        }
    }
    #bindEvents() {
        $(window).on('resize', () =>  setTimeout(() => this.#setDisplayBoardSize(), 200));
        $('button').on('click', (e) => e.preventDefault());

        $('[name="btn_toggle_sidebar"]').on('click', this.#handleToggleSidebar.bind(this));
        $('.sidebar-nav-item').on('click', this.#handleActiveSidebarNav.bind(this));
        $('.sidebar-nav-item').on('click', this.#handleShowContent.bind(this));

        $('[name="btn_mobile_sidebar"]').on('click', this.#handleToggleSidebar.bind(this));

    }
    #init() {
        $('[data-page="page-contacts"]').click();
    }
    toggleSidebar() {
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
                $('.background-black').on('click', this.#handleToggleSidebar.bind(this));
                $('.background-black').addClass('active');
            }
        }
    }

    /* HANDLES FUNCTIONS */
    #handleActiveSidebarNav(e) {

        $('.sidebar-nav-item').removeClass('active');
        const $navItem = $(e.currentTarget);
        const title = $navItem.text().trim();

        $navItem.addClass('active');
        $('.pages-nav h2').html(title);

        if ($(window).width() <= 700) {
            this.toggleSidebar();
        }
    }
    #handleToggleSidebar() {
        this.toggleSidebar();
    }
    async #handleShowContent(event) {

        $('.screen').removeClass('active');

        const $sidebarItem = $(event.currentTarget);
        const path = $sidebarItem.attr('data-path');
        const pageId = $sidebarItem.attr('data-page');
        const $content = $('.pages-content');

        let $screen = $content.find(`#${pageId}`);
        if ($screen.length !== 0) {
            $screen.addClass('active');
            return;
        }

        try {
            const html = await FetchUtils.fetchHtml(path);
            this.#appendPage(html);
        }
        catch(error) {
            console.error(error);
            alert('Falha ao baixar página');
        }

        $screen = $content.find(`#${pageId}`);
        $screen.addClass('active');

        setTimeout(() => {
            $(document).trigger('loaded-page', [path]);
        }, 500);

    };
}

jQuery(() => {
    const app = new App();
});