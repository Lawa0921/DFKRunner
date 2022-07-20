const config = require("~/config.js");
const autils = require('~/src/services/autils');

async function main() {
  const harmonyOnSaleHeroIds = config.harmony.heroForSale.map((heroData) => { return heroData.id });
  const dfkOnSaleHeroIds = config.defikingdoms.heroForSale.map((heroData) => { return heroData.id });
  const onSaleHeroIds = harmonyOnSaleHeroIds.concat(dfkOnSaleHeroIds);

  for (let index = 0; onSaleHeroIds.length > index; index++) {
    if (await autils.isAPIv6Owner(onSaleHeroIds[index])) {
      console.log(`Holding hero ${onSaleHeroIds[index]}`)
    } else {
      console.log(`Hero ${onSaleHeroIds[index]} is sold!`)
    }
  }
}

main()
