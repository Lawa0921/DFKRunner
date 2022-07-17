const config = require("~/config.js");
const axios = require('axios')
const axiosRetry = require('axios-retry');

axiosRetry(axios, {
  retries: 5, // number of retries
  retryDelay: (retryCount) => {
    console.log(`retry attempt: ${retryCount}`);
    return retryCount * 2000; // time interval between retries
  },
  retryCondition: (error) => {
    return error.response.status === 500;
  },
});

const isAPIv6Owner = async (heroID) => {
  let returnValue;

  await axios.post(config.queryHeroEndPoint, {"limit":1,"params":[{"field":"id","operator":"=","value":heroID.toString()}],"offset":0}).then((res) => {
    if (res.data[0].owner_address.toLowerCase() === config.walletAddress.toLowerCase()) {
      returnValue = true;
    }
  }).catch((_err) => {
    returnValue = false;
  })
  return returnValue;
}

async function main() {
  const onSaleHeroIds = config.harmony.heroForSale.map((heroData) => { return heroData.id });

  for (let index = 0; onSaleHeroIds.length > index; index++) {
    if (await isAPIv6Owner(onSaleHeroIds[index])) {
      console.log(`Holding hero ${onSaleHeroIds[index]}`)
    } else {
      console.log(`Hero ${onSaleHeroIds[index]} is sold!`)
    }
  }
}

main()
