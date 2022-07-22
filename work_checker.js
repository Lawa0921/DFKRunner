const config = require("~/config.js");
const autils = require("~/src/services/autils");
const axios = require('axios')
const axiosRetry = require('axios-retry');

axiosRetry(axios, {
  retries: 5, // number of retries
  retryDelay: (retryCount) => {
    console.log(`retry attempt: ${retryCount}`);
    return retryCount * 2000; // time interval between retries
  },
  retryCondition: (error) => {
    return error.response.status === 500 || error.response.status === 504;
  },
});

const getOwningHeroIds = async () => {
  let heroIds;
  const queryStr = `{
    heroes(where: {owner: ${JSON.stringify(config.walletAddress)}}) { 
      id
    }
  }`

  await axios.post(config.graphqlEndPoint, { query: queryStr }).then((res) => {
    heroIds = res.data.data.heroes.map((heroData) => { return heroData.id });
  }).catch((err) => {
    console.log(err);
  })

  return heroIds;
}

async function main() {
  const owningHeroIds = await getOwningHeroIds()
  const configHeroIds = await autils.getAllConfigHeroIds();

  for (let i = 0; i < owningHeroIds.length; i++ ) {
    if (!configHeroIds.includes(owningHeroIds[i])) {
      console.log(`hero ${owningHeroIds[i]} not working!`)
    }
  }

  console.log("process complete")
}

main()
