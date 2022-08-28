const SaleAuction = require("~/src/defikingdoms/contracts/saleAuction")
const saleAuctionContract = new SaleAuction()
const autils = require("~/src/services/autils")
const config = require("~/config.js")
const RentValuator = require('~/src/services/rent_valuator')

exports.runDFKRentHeroLogic = async () => {
  const owningHeroIds = autils.getDFKOwningHeroIds().filter(heroId => config.defikingdoms.notForRentHeroIds.indexOf(heroId) === -1)
  const heroObjects = await autils.getHerosInfo(owningHeroIds)

  for (let i = 0; i < heroObjects.length; i++) {
    if (heroObjects[i].rentable()()) {
      let rentValuator = new RentValuator(heroObjects[i])
      rentValuator.execute()

      await saleAuctionContract.rentHero(heroObjects[i].id, rentValuator.valuation)
    }
  }
}
