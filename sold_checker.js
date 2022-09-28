const config = require("~/config.js");
const autils = require('~/src/services/autils');

async function main() {
  const onSaleHeroIds = config.defikingdoms.heroForSale.map((heroData) => { return heroData.id });
  const heroObjects = await autils.getHerosInfo(onSaleHeroIds);

  for (let i = 0; heroObjects.length > i; i++) {
    if (config.walletAddressAndPrivateKeyMappings.map(accountInfo => accountInfo.walletAddress).indexOf(heroObjects[i].owner) === -1) {
      console.log(`Hero ${heroObjects[i].id} is sold!`)
    }
  }
  console.log("process completed")
}

main()
