const config = require("~/config.js");
const SaleAuction = require("~/src/defikingdoms/contracts/saleAuction");

const isOwning = (heroObject) => {
  return heroObject.owner === config.walletAddress;
}

const isShouldList = (heroObject) => {
  return isOwning(heroObject) && !heroObject.isOnSale && !heroObject.isOnRent && !heroObject.isOnQuesting && config.defikingdoms.heroForSale.map((heroData) => { return heroData.id }).indexOf(heroObject.id) > -1 && heroObject.currentStamina() <= config.defikingdoms.listStamina
}

exports.runDFKSalesLogic = async (owningHeroObjects, accountInfo) => {
  const saleAuctionContract = new SaleAuction(accountInfo)
  const heroList = config.defikingdoms.heroForSale.map((heroData) => {
    return {...heroData, instance: owningHeroObjects.find(heroObject => heroObject.id === heroData.id)}
  })

  const saleHandlerPromises = heroList.filter(heroObject => isShouldList(heroObject.instance)).map(shouldListHero => sellHero(shouldListHero.id, shouldListHero.price, saleAuctionContract))

  await Promise.allSettled(saleHandlerPromises)
}

sellHero = async (heroId, price, saleAuctionContract) => {
  await saleAuctionContract.listHero(heroId, price);
}
