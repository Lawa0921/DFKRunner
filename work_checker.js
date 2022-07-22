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

const getConfigOwningHeroIds = async () => {
  let heroIds = [];

  for (let i = 0; i < config.harmony.quests.length; i++ ) {
    if (config.harmony.quests[i].name === "Gardening") {
      heroIds = heroIds.concat(config.harmony.quests[i].professionHeroes.map((heroData) => { return heroData.heroID }))
    } else {
      heroIds = heroIds.concat(config.harmony.quests[i].professionHeroes);
    }
  }

  for (let i = 0; i < config.harmony.statQuests.length; i++ ) {
    heroIds = heroIds.concat(config.harmony.statQuests[i].heroes);
  }

  heroIds = heroIds.concat(config.defikingdoms.quest.fishing.professionHeroes);
  heroIds = heroIds.concat(config.defikingdoms.quest.foraging.professionHeroes);

  return heroIds;
}

async function main() {
  const owningHeroIds = await getOwningHeroIds()
  const configHeroIds = await getConfigOwningHeroIds()

  for (let i = 0; i < owningHeroIds.length; i++ ) {
    if (!configHeroIds.includes(owningHeroIds[i])) {
      console.log(`hero ${owningHeroIds[i]} not working!`)
    }
  }

  console.log("process complete")
}

main()
