const autils = require('./src/services/autils')
const config = require("./config.js")
const axios = require('axios')
const axiosRetry = require('axios-retry');
const date = require('date-and-time');
const Valuator = require('./src/services/valuator');
const DFKSaleAuction = require("./src/defikingdoms/contracts/saleAuction");
const KLAYSaleAuction = require("./src/klay/contracts/saleAuction");
const DFKSaleAuctionContract = new DFKSaleAuction(config.walletAddressAndPrivateKeyMappings[config.autoBuyerSetting.saleWatcherWalletIndex]);
const KLAYSaleAuctionContract = new KLAYSaleAuction(config.walletAddressAndPrivateKeyMappings[config.autoBuyerSetting.saleWatcherWalletIndex]);

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
  autils.watchHeroLog(valuator.hero, price, valuator.valuation, "dfk");

  if (config.autoBuyerSetting.autoBuyerSwitch && !valuator.hero.isOwning() && valuator.price <= valuator.valuation) {
    console.log(`!!! DFK bid hero ${tokenId} txn created !!!`)
    const txn = await DFKSaleAuctionContract.bid(tokenId, price);
    const res = await txn.wait();

    if (res.status === 1) {
      console.log(`!!! DFK bid hero ${tokenId} txn confirmed !!! txn: ${JSON.stringify(res)}`)

      autils.bidHeroLog(`${new Date().toLocaleTimeString()} DFK Purchased hero: ${tokenId} use ${parseInt(price) / Math.pow(10, 18)} C`)
    } else {
      autils.bidHeroLog(`${new Date().toLocaleTimeString()} !!! DFK bid hero ${tokenId} failed !!! txn: ${JSON.stringify(res)}`)
    }
  }
}

const KLAYSaleHandler = async (tokenId, price) => {
  let heroObjects = await autils.getHeroesInfoByIds([parseInt(tokenId)]);

  const valuator = new Valuator(price, heroObjects[0]);
  valuator.execute();
  autils.watchHeroLog(valuator.hero, price, valuator.valuation, "kla");

  if (config.autoBuyerSetting.autoBuyerSwitch && !valuator.hero.isOwning() && valuator.price <= valuator.valuation) {
    console.log(`!!! KLAY bid hero ${tokenId} txn created !!!`)
    const txn = await DFKSaleAuctionContract.bid(tokenId, price);
    const res = await txn.wait();

    if (res.status === 1) {
      console.log(`!!! KLAY bid hero ${tokenId} txn confirmed !!! txn: ${JSON.stringify(res)}`)

      autils.bidHeroLog(`${new Date().toLocaleTimeString()} KLAY Purchased hero: ${tokenId} use ${parseInt(price) / Math.pow(10, 18)} Jade`)
    } else {
      autils.bidHeroLog(`${new Date().toLocaleTimeString()} !!! KLAY bid hero ${tokenId} failed !!! txn: ${JSON.stringify(res)}`)
    }
  }
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

  KLAYSaleAuctionContract.contract.on("AuctionCreated", (auctionId, owner, tokenId, startingPrice, endingPrice, duration, winner, event) => {
    clearTimeout(timerId);
    KLAYSaleHandler(tokenId, startingPrice, "kla");

    timerId = setTimeout(() => {
      console.log(`${date.addMinutes(new Date(Date.now()), 0)}: restart process`)
      process.exit(0);
    }, 120000);
  })
}

main()
