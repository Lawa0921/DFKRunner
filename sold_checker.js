const config = require("~/config.js");
const autils = require('~/src/services/autils');

async function main() {
  const harmonyOnSaleHeroIds = config.harmony.heroForSale.map((heroData) => { return heroData.id });
  const dfkOnSaleHeroIds = config.defikingdoms.heroForSale.map((heroData) => { return heroData.id });
  const onSaleHeroIds = harmonyOnSaleHeroIds.concat(dfkOnSaleHeroIds);
  const heroObjects = await autils.getHerosInfo(onSaleHeroIds);

  for (let index = 0; heroObjects.length > index; index++) {
    if (heroObjects[index].owner !== config.walletAddress) {
      console.log(`Hero ${heroObjects[index].id} is sold!`)
    }
  }
  console.log("process completed")
}

main()
