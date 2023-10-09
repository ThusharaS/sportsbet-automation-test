import { test, expect } from '@playwright/test';
import { Homepage } from '../pages/home';
import { CardPage } from '../pages/cards';

const assert = require('assert');


//Setting viewport 
test.use({
  viewport: { width: 420, height: 420 },
});

test('test', async ({ page }) => {

  const Home = new Homepage(page)
  const Card = new CardPage(page)

  await Home.gotoSportsBetSite()
  await Home.openFirstcard()

  const rateCardNames = await Card.getRateCardNames();
  const rateCardPrice = await Card.getRateCardPrice();

  console.log('Expected rateCardNames '+ rateCardNames)
  console.log('Expected rateCardPrice '+ rateCardPrice)

  await Card.addBets();
  await Card.openBetSlip();

  const addedBetNames = await Card.getBetSlipBetTitles();
  const addedBetPrice = await Card.getBetSlipBetPrice();

  console.log('Actual rateCardNames '+ addedBetNames)
  console.log('Actual rateCardPrice '+ addedBetPrice)

  assert.deepStrictEqual(rateCardNames, addedBetNames, 'Added Bet Names are not present in Bet Slip!');
  assert.deepStrictEqual(rateCardPrice, addedBetPrice, 'Added Bet Price are not present in Bet Slip!');

});