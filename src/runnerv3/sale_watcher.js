require('dotenv').config()
const config = require("./config.json");
const autils = require("./autils")
const axios = require('axios')
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

const hmy = new Harmony(
    autils.getRpc(config.useRpcIndex), {
      chainType: ChainType.Harmony,
      chainId: ChainID.HmyMainnet,
    },
);

wallet.addByPrivateKey(process.env.PRIVATE_KEY);

const tavernContract = new Contract(
  tavernABI_27apr2022,
  config.tavernContract, {
  defaultGas: config.gasLimit,
  defaultGasPrice: config.gasPrice
}, wallet)

const saleHandler = async (tokenId, price) => {
  await axios.post("https://us-central1-defi-kingdoms-api.cloudfunctions.net/query_heroes",
    {"limit":1,"params":[{"field":"id","operator":"=","value":tokenId.toString()}],"offset":0}
  ).then(async (res) => {
    const valuator = new Valuator(price, new Hero(res.data[0]));
    autils.watchHeroLog(valuator.hero, price);

    if (valuator.execute()) {
      await bidHero(valuator.id, valuator.price);
      console.log("!!! Purchased !!!")
    }
  }).catch(err => {
    console.log(err);
    return;
  })
}

async function main() {
  console.log(`${date.addMinutes(new Date(Date.now()), 0)}: start watching`);

  tavernContract.events.AuctionCreated().
    on(
      'data', (event) => {
        const { tokenId, startingPrice } = event.returnValues;

        saleHandler(tokenId, startingPrice);
      }
    )
}

main()
