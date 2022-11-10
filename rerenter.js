const config = require("~/config.js");
const autils = require('~/src/services/autils');
const SaleAuction = require("~/src/defikingdoms/contracts/saleAuction")
const RentValuator = require('~/src/services/rent_valuator')

async function main() {
  try {
    const owningHeroObjects = await autils.getHeroesInfoByIds(autils.getDFKOwningHeroIds());
    const onRentHeroes = owningHeroObjects.filter(heroObject => heroObject.isOnRent);
  
    for (let i = 0; onRentHeroes.length > i; i++) {
      let rentValuator = new RentValuator(onRentHeroes[i])
      rentValuator.execute()
  
      if (rentValuator.valuation === 0) {
        continue
      } else if (onRentHeroes[i].rentPrice < rentValuator.valuation * 0.9 || onRentHeroes[i].rentPrice > rentValuator.valuation * 1.1) { // 可自訂多餘或少於估價幾成需要重新出租，更改數字即可
        const accountInfo = config.walletAddressAndPrivateKeyMappings.find(accountInfo => accountInfo.walletAddress === onRentHeroes[i].owner)
        const saleAuctionContract = new SaleAuction(accountInfo)
  
        console.log(`${onRentHeroes[i].id} current rent price ${onRentHeroes[i].rentPrice} C, re-rent ${rentValuator.valuation} C`)
  
        await saleAuctionContract.unrentHero(onRentHeroes[i].id)
        await saleAuctionContract.rentHero(onRentHeroes[i].id, rentValuator.valuation)
      } 
    }
    console.log("process completed")
  } catch(_error) {
    main()
  }
}

main()
