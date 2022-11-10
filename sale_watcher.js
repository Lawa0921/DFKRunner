const autils = require('~/src/services/autils')
const config = require("~/config.js")
const axios = require('axios')
const axiosRetry = require('axios-retry');
const date = require('date-and-time');
const Valuator = require('~/src/services/valuator');
const DFKSaleAuction = require("~/src/defikingdoms/contracts/saleAuction");
const DFKSaleAuctionContract = new DFKSaleAuction(config.walletAddressAndPrivateKeyMappings[config.saleWatcherWalletIndex]);

axiosRetry(axios, {
  retries: 5,
  retryDelay: (retryCount) => {
    console.log(`retry attempt: ${retryCount}`);
    return retryCount * 2000;
  },
  retryCondition: (error) => {
    return error.response.status === 500 || error.response.status === 504;
  },
});

const DFKSaleHandler = async (tokenId, price) => {
  let heroObjects = await autils.getHeroesInfoByIds([parseInt(tokenId)]);

  const valuator = new Valuator(price, heroObjects[0]);
  valuator.execute();

  if (!valuator.hero.isOwning() && valuator.price <= valuator.valuation) {
    console.log(`!!! bid hero ${tokenId} txn created !!!`)
    const txn = await DFKSaleAuctionContract.bid(tokenId, price);
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

async function main() {
  console.log(`${date.addMinutes(new Date(Date.now()), 0)}: start watching`);

  let timerId = setTimeout(() => {
    console.log(`${date.addMinutes(new Date(Date.now()), 0)}: restart process`)
    process.exit(0);
  }, 120000);

  DFKSaleAuctionContract.contract.on("AuctionCreated", (auctionId, owner, tokenId, startingPrice, endingPrice, duration, winner, event) => {
    clearTimeout(timerId);
    DFKSaleHandler(tokenId, startingPrice);

    timerId = setTimeout(() => {
      console.log(`${date.addMinutes(new Date(Date.now()), 0)}: restart process`)
      process.exit(0);
    }, 120000);
  })
}

main()
