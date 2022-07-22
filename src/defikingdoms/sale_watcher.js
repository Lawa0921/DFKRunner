const SaleAuction = require("~/src/defikingdoms/contracts/saleAuction");
const saleAuctionContract = new SaleAuction();
const Valuator = require('~/src/services/valuator');
const autils = require('~/src/services/autils');
const date = require('date-and-time');

const saleHandler = async (tokenId, price) => {
  let heroObjects = await autils.getHerosInfo([tokenId]);

  const valuator = new Valuator(price, heroObjects[0]);
  await valuator.execute();

  if (!valuator.hero.isOwning() && valuator.price <= valuator.valuation) {
    await saleAuctionContract.bid(tokenId, price);
  }

  autils.watchHeroLog(valuator.hero, price, valuator.valuation, "dfk");
}

main = async () => {
  console.log(`${date.addMinutes(new Date(Date.now()), 0)}: start watching`);

  let timerId = setTimeout(() => {
    console.log(`${date.addMinutes(new Date(Date.now()), 0)}: restart process`)
    process.exit(0);
  }, 120000);

  saleAuctionContract.contract.on("AuctionCreated", (auctionId, owner, tokenId, startingPrice, endingPrice, duration, winner, event) => {
    saleHandler(parseInt(tokenId), parseInt(startingPrice));

    timerId = setTimeout(() => {
      console.log(`${date.addMinutes(new Date(Date.now()), 0)}: restart process`)
      process.exit(0);
    }, 120000);
  })
}

main();
