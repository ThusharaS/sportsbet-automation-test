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

  expect.soft(rateCardNames[0]).toBe(addedBetNames[0]);
  expect.soft(rateCardPrice[0]).toBe(addedBetPrice[0]);

  expect(test.info().errors).toHaveLength(0);

});