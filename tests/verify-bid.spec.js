import { test, expect } from '@playwright/test';
import { Homepage } from '../pages/home';
import { CardPage } from '../pages/cards';

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

  await expect(await Card.betTitles.nth(0)).toContainText(rateCardNames[0]);
  await expect(await Card.betTitles.nth(1)).toContainText(rateCardNames[1]);
  await expect(await Card.betOdds.nth(0)).toContainText(rateCardPrice[0]);
  await expect(await Card.betOdds.nth(1)).toContainText(rateCardPrice[1]);

});