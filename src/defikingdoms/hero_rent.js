const AssistingAuctionUpgradeable = require("./contracts/assistingAuctionUpgradeable")
const config = require("../../config")
const RentValuator = require('../services/rent_valuator')

exports.runDFKRentHeroLogic = async (owningHeroObjects, accountInfo) => {
  const assistingAuctionUpgradeableContract = new AssistingAuctionUpgradeable(accountInfo)
  const filtedHeroObjects = owningHeroObjects.filter((heroObject) => {
    return config.notForRentHeroIds.indexOf(heroObject.id) === -1 && 
      config.defikingdoms.heroForSale.map(heroData => heroData.id).indexOf(heroObject.id) === -1 &&
      heroObject.owner === accountInfo.walletAddress &&
      config.defikingdoms.useStaminaVialHeroIds.indexOf(heroObject.id) === -1 &&
      heroObject.network === "dfk"
  })

  for (let i = 0; i < filtedHeroObjects.length; i++) {
    if (filtedHeroObjects[i].rentable()) {
      let rentValuator = new RentValuator(filtedHeroObjects[i])
      rentValuator.execute()

      if (rentValuator.valuation === 0) {
        console.log(`${filtedHeroObjects[i].id} not have any rental value`)
      } else {
        await assistingAuctionUpgradeableContract.listHero(filtedHeroObjects[i].id, rentValuator.valuation)
      }
    }
  }
}
