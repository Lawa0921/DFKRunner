const AssistingAuctionUpgradeable = require("~/src/klay/contracts/assistingAuctionUpgradeable")
const config = require("~/config.js")
const RentValuator = require('~/src/services/rent_valuator')

exports.runKLAYRentHeroLogic = async (owningHeroObjects, accountInfo) => {
  const assistingAuctionUpgradeableContract = new AssistingAuctionUpgradeable(accountInfo)
  const filtedHeroObjects = owningHeroObjects.filter((heroObject) => {
    return config.klay.notForRentHeroIds.indexOf(heroObject.id) === -1 && 
      config.klay.heroForSale.map(heroData => heroData.id).indexOf(heroObject.id) === -1 &&
      heroObject.owner === accountInfo.walletAddress &&
      config.klay.useStaminaVialHeroIds.indexOf(heroObject.id) === -1 &&
      heroObject.network === "kla"
  })

  for (let i = 0; i < filtedHeroObjects.length; i++) {
    if (filtedHeroObjects[i].rentable()) {
      let rentValuator = new RentValuator(filtedHeroObjects[i])
      rentValuator.execute()

      if (rentValuator.valuation > 0) {
        await assistingAuctionUpgradeableContract.listHero(filtedHeroObjects[i].id, rentValuator.valuation)
      } else {
        console.log(`${filtedHeroObjects[i].id} not have any rental value`)
      }
    }
  }
}
