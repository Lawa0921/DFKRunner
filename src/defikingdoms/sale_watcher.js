const SaleAuction = require("~/src/defikingdoms/contracts/saleAuction");
const saleAuctionContract = new SaleAuction();
const Valuator = require('~/src/services/valuator');
const autils = require('~/src/services/autils');
const date = require('date-and-time');

const saleHandler = async (tokenId, price) => {
  let heroObjects = await autils.getHerosInfo([parseInt(tokenId)]);

  const valuator = new Valuator(price, heroObjects[0]);
  await valuator.execute();

  if (!valuator.hero.isOwning() && valuator.price <= valuator.valuation) {
    console.log(`!!! bid hero ${tokenId} txn created !!!`)
    const txn = await saleAuctionContract.bid(tokenId, price);
    const res = await txn.wait();

    if (res.status === 1) {
      console.log(`!!! bid hero ${tokenId} txn confirmed !!! txn: ${JSON.stringify(res)}`)

      autils.bidHeroLog(`${new Date().toLocaleTimeString()} Purchased hero: ${tokenId} use ${parseInt(price) / Math.pow(10, 18)} C`)
    } else {
      autils.bidHeroLog(`${new Date().toLocaleTimeString()} !!! bid hero ${tokenId} failed !!! txn: ${JSON.stringify(res)}`)
    }
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
    saleHandler(tokenId, startingPrice);

    timerId = setTimeout(() => {
      console.log(`${date.addMinutes(new Date(Date.now()), 0)}: restart process`)
      process.exit(0);
    }, 120000);
  })
}

main();
