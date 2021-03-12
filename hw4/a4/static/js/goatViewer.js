function GoatViewer(myGoats, numRows, goatsPerRow) {
    const that = this;

    const goatsPerPage = numRows * goatsPerRow;

    this.updateCards = function (goats) {
        $('#cards').empty();

        for (var row = 0; row < numRows; row++) {
            const deck = $('<div class="card-deck"></div>');

            for (var col = 0; col < goatsPerRow; col++) {
                const index = row * goatsPerRow + col;
                if (index < goats.length) {
                    const goat = goats[row * goatsPerRow + col];

                    const card = $(`
                        <div class="card ${myGoats || goat.adopted < 0 ? '' : 'adopted'}">
                            <img class="card-img-top" src="/static/img/goats/${goat.image}">
                            <div class="card-body">
                                <h5 class="card-title">${goat.name}</h5>
                                <p class="card-text">${goat.age} years old</p>
                                <button class="adopt-button btn btn-primary">
                                    ${myGoats ? 'Unadopt' : 'Adopt'}
                                </button>
                            </div>
                        </div>
                    `);

                    $(card).find('.adopt-button').click(function () {
                        if (myGoats)
                            that.unadopt(goat);
                        else
                            that.adopt(goat);
                    });

                    $(deck).append(card);
                } else {

                    const card = $(`
                        <div class="card">
                        </div>
                    `);
                    $(deck).append(card);

                }
            }

            $('#cards').append(deck);
        }
    }

    const createPageLink = function (text, toPage, active, disabled) {
        const link = $(`
            <li class="page-item">
                <a class="page-link">${text}</a>
            </li>
        `);
        $(link).find('.page-link').click(function () {
            that.currentPage = toPage;
            that.load();
        });
        if (active)
            link.addClass('active');
        if (disabled)
            link.addClass('disabled');
        return link;
    }

    this.currentPage = 1;

    this.updatePagination = function (total) {
        let pages = Math.ceil(total / goatsPerPage);
        $('#paginator').empty().append(
            createPageLink('Previous', this.currentPage - 1, false, this.currentPage == 1)
        );
        for (var page = 1; page <= pages; page++)
            $('#paginator').append(
                createPageLink(page, page, page == this.currentPage, false)
            );
        $('#paginator').append(
            createPageLink('Next', this.currentPage + 1, false, this.currentPage == pages)
        );
    }

    this.update = function (data) {
        this.updateCards(data.goats);
        this.updatePagination(data.total);
    }

    this.load = function () {
        $.get(myGoats ? '/api/my_goats' : '/api/get_goats', {
            n: goatsPerPage,
            offset: (this.currentPage - 1) * goatsPerPage
        }, function (data) {
            that.update(data);
        });
    }

    this.adopt = function (goat) {
        $.post('/api/adopt_goat', {
            goat_id: goat.id,
            n: goatsPerPage,
            offset: (this.currentPage - 1) * goatsPerPage
        }, function (data) {
            that.update(data);
        });
    }

    this.unadopt = function (goat) {
        $.post('/api/unadopt_goat', {
            goat_id: goat.id,
            n: goatsPerPage,
            offset: (this.currentPage - 1) * goatsPerPage
        }, function (data) {
            that.update(data);
        });
    }
}
