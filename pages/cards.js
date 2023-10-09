exports.CardPage = class CardPage {

    constructor(page) {

        this.page = page
        this.outcome = page.locator("[data-automation-id='racecard-body'] [data-automation-id='racecard-outcome-name']")
        this.price = page.locator("[data-automation-id='racecard-body'] span[data-automation-id='price-text']")

        this.close_bet_slip = page.locator("[data-automation-id='betslip-header-hide']")
        this.bet_slip = page.locator("//span[text()='Bet Slip']")

        this.betTitles = page.locator("[data-automation-id='betslip-bet-title']")
        this.betOdds = page.locator("[data-automation-id='betslip-bet-odds']")
    }

    async getRateCardNames() {
        return await this.getElementText(this.outcome);
    }

    async getRateCardPrice() {
        return await this.getElementText(this.price);
    }

    async getElementText(selector) {
        const elementTexts = [];
        for (let i = 0; i < 2; i++) {
            var element = selector.nth(i);
            await element.waitFor();
            elementTexts.push(await element.textContent());
        }
        return elementTexts;
    }

    async addBets(){
        for (let i = 0; i < 2; i++) {
            var element = await this.price.nth(i);
            await element.click();
            if(i==0){
                const bet_slip_close = await this.close_bet_slip
                await bet_slip_close.waitFor();
                await bet_slip_close.click();
            }
        }
    }

    async openBetSlip() {
        await this.bet_slip.click();
    }

    async getBetSlipBetTitles(){
        return await this.getElementText(this.betTitles);
    }

    async getBetSlipBetPrice(){
        return await this.getElementText(this.betOdds);
    }
}