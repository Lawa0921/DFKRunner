const config = require("~/config.js");
const autils = require("~/src/services/autils");
const axios = require('axios')
const axiosRetry = require('axios-retry');

async function main() {
  const owningHeroIds = await getOwningHeroIds()
  const configHeroIds = autils.getAllConfigHeroIds();

  for (let i = 0; i < owningHeroIds.length; i++ ) {
    if (!configHeroIds.includes(owningHeroIds[i])) {
      console.log(`hero ${owningHeroIds[i]} not working!`)
    }
  }
  console.log(`owning ${owningHeroIds.length} heros`)
  console.log("process complete")
}

main()
