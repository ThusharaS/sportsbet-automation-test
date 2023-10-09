import { test, expect } from '@playwright/test';
import { Homepage } from '../pages/home';
import { CardPage } from '../pages/cards';
const assert = require('assert');


//Setting viewport to 460 pixels
test.use({
  viewport: { width: 460, height: 460 },
});

test('test', async ({ page }) => {

  const Home = new Homepage(page)
  const Card = new CardPage(page)

  await Home.gotoSportsBetSite()
  await Home.openFirstcard()

  const rateCardNames = await Card.getRateCardNames();
  const rateCardPrice = await Card.getRateCardPrice();

  await Card.addBets();
  await Card.openBetSlip();

  const addedBetNames = await Card.getBetSlipBetTitles();
  const addedBetPrice = await Card.getBetSlipBetPrice();

  assert.deepStrictEqual(rateCardNames, addedBetNames, 'Added Bet Names are not present in Bet Slip!');
  assert.deepStrictEqual(rateCardPrice, rateCardNames, 'Added Bet Price are not present in Bet Slip!');

});