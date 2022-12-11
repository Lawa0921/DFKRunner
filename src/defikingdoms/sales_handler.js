const config = require("~/config.js");
const SaleAuction = require("~/src/defikingdoms/contracts/saleAuction");

const isShouldList = (heroObject) => {
  return !heroObject.isOnSale && !heroObject.isOnRent && !heroObject.isOnQuesting && heroObject.currentStamina() <= config.defikingdoms.listStamina
}

exports.runDFKSalesLogic = async (owningHeroObjects, accountInfo) => {
  const saleAuctionContract = new SaleAuction(accountInfo)
  const heroList = config.defikingdoms.heroForSale.map((heroData) => {
    return {...heroData, instance: owningHeroObjects.find(heroObject => heroObject.id === heroData.id)}
  }).filter((heroObject) => {
    if (typeof(heroObject) === "undefined") {
      console.log(`DFK ${heroObject.id} is sold`)
    }

    return typeof(heroObject.instance) !== "undefined" &&
      heroObject.instance.owner === accountInfo.walletAddress
  })

  const saleHandlerPromises = heroList.filter(heroObject => isShouldList(heroObject.instance)).map(shouldListHero => sellHero(shouldListHero.id, shouldListHero.price, saleAuctionContract))

  await Promise.allSettled(saleHandlerPromises)
}

sellHero = async (heroId, price, saleAuctionContract) => {
  await saleAuctionContract.listHero(heroId, price);
}
