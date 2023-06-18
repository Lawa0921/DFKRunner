const autils = require('./src/services/autils');
const Valuator = require('./src/services/valuator');

async function main() {
  console.log("start parse on sale heroes ...")
  const onSaleHeros = await autils.getOnAuctionHeroInfos()

  for (let i = 0; i < onSaleHeros.length; i++) {
    const valuator = new Valuator(onSaleHeros[i].price, onSaleHeros[i].hero);
    valuator.execute();

    if (valuator.price <= valuator.valuation * 1.2) {
      autils.watchHeroLog(valuator.hero, valuator.price, valuator.valuation * 1.2, onSaleHeros[i].hero.network);
    }
  }

  console.log("process complete")
}

main();
