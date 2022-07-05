require('dotenv').config()
const config = require("./config.json");
const autils = require("./autils")
const axios = require('axios')
const axiosRetry = require('axios-retry');
const tavernABI_27apr2022 = require('./abi/tavernABI_27apr2022.json')
const date = require('date-and-time');

const { Harmony } = require('@harmony-js/core');
const { Wallet } = require('@harmony-js/account');
const { Contract } = require("@harmony-js/contract")
const { Messenger, WSProvider } = require('@harmony-js/network');
const { ChainID, ChainType, hexToNumber } = require('@harmony-js/utils');
const Hero = require('./hero');
const Valuator = require('./valuator');
const { bidHero } = require('./tavern_bid');
const ws = new WSProvider(config.webSocketsRpcs[0]);

const wallet = new Wallet(
  new Messenger(
    ws,
    ChainType.Harmony,
    ChainID.HmyMainnet,
  ),
);

wallet.addByPrivateKey(process.env.PRIVATE_KEY);

const tavernContract = new Contract(
  tavernABI_27apr2022,
  config.tavernContract, {
  defaultGas: config.gasLimit,
  defaultGasPrice: config.gasPrice
}, wallet)

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

    autils.watchHeroLog(valuator.hero, price, valuator.valuation);

    if (!valuator.hero.isOwning() && valuator.price <= valuator.valuation) {
      await bidHero(tokenId, price);
    }
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
