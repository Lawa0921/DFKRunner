const config = require("../../config");
const SaleAuction = require("./contracts/saleAuction");
const AssistingAuctionUpgradeable = require("./contracts/assistingAuctionUpgradeable")

const isShouldList = (heroObject) => {
  return !heroObject.isOnSale && !heroObject.isOnQuesting && heroObject.currentStamina() <= config.defikingdoms.listStamina
}

const sellHero = async (heroId, price, saleAuctionContract) => {
  await saleAuctionContract.listHero(heroId, price);
}

exports.runDFKSalesLogic = async (owningHeroObjects, accountInfo) => {
  const heroList = config.defikingdoms.heroForSale.map((heroData) => {
    return {...heroData, instance: owningHeroObjects.find(heroObject => heroObject.id === heroData.id)}
  }).filter((heroObject) => {
    if (typeof(heroObject) === "undefined") {
      console.log(`DFK ${heroObject.id} is sold`)
    }

    return typeof(heroObject.instance) !== "undefined" &&
      heroObject.instance.owner === accountInfo.walletAddress &&
      heroObject.instance.network === "dfk"
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
