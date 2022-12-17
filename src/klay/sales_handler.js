const config = require("~/config.js");
const SaleAuction = require("~/src/klay/contracts/saleAuction");
const AssistingAuctionUpgradeable = require("~/src/klay/contracts/assistingAuctionUpgradeable")

const isShouldList = (heroObject) => {
  return !heroObject.isOnSale && !heroObject.isOnQuesting && heroObject.currentStamina() <= config.klay.listStamina
}

const sellHero = async (heroId, price, saleAuctionContract) => {
  await saleAuctionContract.listHero(heroId, price);
}

exports.runKLAYSalesLogic = async (owningHeroObjects, accountInfo) => {
  const heroList = config.klay.heroForSale.map((heroData) => {
    return {...heroData, instance: owningHeroObjects.find(heroObject => heroObject.id === heroData.id)}
  }).filter((heroObject) => {
    if (typeof(heroObject) === "undefined") {
      console.log(`KLAY ${heroObject.id} is sold`)
    }

    return typeof(heroObject.instance) !== "undefined" &&
      heroObject.instance.owner === accountInfo.walletAddress &&
      heroObject.instance.network === "kla"
  })
  const assistingAuctionUpgradeableContract = new AssistingAuctionUpgradeable(accountInfo)
  const shouldSellHeroes = heroList.filter(heroObject => isShouldList(heroObject.instance))

  for (let i = 0; i < shouldSellHeroes.length; i++) {
    if (shouldSellHeroes[i].instance.isOnRent) {
      await assistingAuctionUpgradeableContract.unlistHero(shouldSellHeroes[i].instance.id)
    }
  }

  const saleAuctionContract = new SaleAuction(accountInfo)
  const saleHandlerPromises = shouldSellHeroes.map(shouldListHero => sellHero(shouldListHero.id, shouldListHero.price, saleAuctionContract))
  await Promise.allSettled(saleHandlerPromises)
}
