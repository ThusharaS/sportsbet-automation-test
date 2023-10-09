exports.Homepage = class HomePage {

    constructor(page) {

        this.page = page
        this.first_card = page.locator("[data-automation-id='group-1-carousel-1-body-container-cell-1']")
    }

    async gotoSportsBetSite() {
        await this.page.goto('https://www.sportsbet.com.au/');
    }

    async openFirstcard() {
        await this.first_card.click();
    }
}