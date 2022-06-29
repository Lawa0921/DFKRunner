require('dotenv').config();
const config = require("./config.json");
const tavernABI_27apr2022 = require('./abi/tavernABI_27apr2022.json')
const axios = require('axios');
const autils = require("./autils")
const Hero = require('./hero');
const Valuator = require('./valuator')

async function test() {
  await axios.post(config.queryHeroEndPoint,
    { "limit":1,"params":[{"field":"id","operator":"=","value":"1565"}],"offset":0 }
  ).then(async (res) => {
    const valuator = new Valuator("5100000000000000000000", "5100000000000000000000", new Hero(res.data[0]));

    console.log(`execute result: ${valuator.execute()}`);
    console.log(`isFixedPrice result: ${valuator.isFixedPrice()}`);
    console.log(`isUnderUnconditionalPurchasePrice result: ${valuator.isUnderUnconditionalPurchasePrice()}`);
    console.log(`g0PurchaseConditions result: ${valuator.g0PurchaseConditions()}`);
  }).catch(err => {
    console.log(err);
    return;
  })
}

test();
