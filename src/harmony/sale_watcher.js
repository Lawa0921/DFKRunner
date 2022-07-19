const config = require("~/config.js");
const autils = require('~/src/services/autils')
const axios = require('axios')
const axiosRetry = require('axios-retry');
const saleAuctionABI = require('~/abis/SaleAuction.json')
const date = require('date-and-time');

const { Harmony } = require('@harmony-js/core');
const { Wallet } = require('@harmony-js/account');
const { Contract } = require("@harmony-js/contract")
const { Messenger, WSProvider } = require('@harmony-js/network');
const { ChainID, ChainType, hexToNumber } = require('@harmony-js/utils');
const Hero = require('./hero');
const Valuator = require('./valuator');
const { bidHero } = require('./tavern_bid');
const ws = new WSProvider(config.harmony.webSocketsRpcs[1]);

const wallet = new Wallet(
  new Messenger(
    ws,
    ChainType.Harmony,
    ChainID.HmyMainnet,
  ),
);

wallet.addByPrivateKey(config.privateKey);

const tavernContract = new Contract(saleAuctionABI, config.harmony.saleAuction, {}, wallet)

axiosRetry(axios, {
  retries: 5, // number of retries
  retryDelay: (retryCount) => {
    console.log(`retry attempt: ${retryCount}`);
    return retryCount * 2000; // time interval between retries
  },
  retryCondition: (error) => {
    // if retry condition is not specified, by default idempotent requests are retried
    return error.response.status === 500;
  },
});

const saleHandler = async (tokenId, price) => {
  await axios.post("https://us-central1-defi-kingdoms-api.cloudfunctions.net/query_heroes",
    {"limit":1,"params":[{"field":"id","operator":"=","value":tokenId}],"offset":0}
  ).then(async (res) => {
    const valuator = new Valuator(price, new Hero(res.data[0]));
    await valuator.execute();

    if (!valuator.hero.isOwning() && valuator.price <= valuator.valuation) {
      await bidHero(tokenId, price);
    }

    autils.watchHeroLog(valuator.hero, price, valuator.valuation);
  }).catch(err => {
    if (err.toString().includes('Request failed with status code 500')) {
        autils.log(err.toString(), true);
    }
    return;
  })
}

async function main() {
  console.log(`${date.addMinutes(new Date(Date.now()), 0)}: start watching`);

  let timerId = setTimeout(() => {
    console.log(`${date.addMinutes(new Date(Date.now()), 0)}: restart process`)
    process.exit(0);
  }, 120000);

  tavernContract.events.AuctionCreated().onData((event) => {
    clearTimeout(timerId);
    const { tokenId, startingPrice } = event.returnValues;

    saleHandler(tokenId, startingPrice);

    timerId = setTimeout(() => {
      console.log(`${date.addMinutes(new Date(Date.now()), 0)}: restart process`)
      process.exit(0);
    }, 120000);
  });
}

main()
