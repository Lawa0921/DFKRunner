const SaleAuction = require("~/src/defikingdoms/contracts/saleAuction")
const saleAuctionContract = new SaleAuction()
const config = require("~/config.js")
const RentValuator = require('~/src/services/rent_valuator')

exports.runDFKRentHeroLogic = async (owningHeroObjects) => {
  const filtedHeroObjects = owningHeroObjects.filter((heroObject) => {
    return config.defikingdoms.notForRentHeroIds.indexOf(heroObject.id) === -1 && config.defikingdoms.heroForSale.map(heroData => heroData.id).indexOf(heroObject.id) === -1
  })

  for (let i = 0; i < filtedHeroObjects.length; i++) {
    if (filtedHeroObjects[i].rentable()) {
      let rentValuator = new RentValuator(filtedHeroObjects[i])
      rentValuator.execute()

      if (rentValuator.valuation > 0) {
        await saleAuctionContract.rentHero(filtedHeroObjects[i].id, rentValuator.valuation)
      } else {
        console.log(`${filtedHeroObjects[i].id} not has any rental value`)
      }
    }
  }
}
