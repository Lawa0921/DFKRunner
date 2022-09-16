const config = require("~/config.js");
const SaleAuction = require("~/src/defikingdoms/contracts/saleAuction");
const saleAuctionContract = new SaleAuction();

const isOwning = (heroObject) => {
  return heroObject.owner === config.walletAddress;
}

const isShouldList = (heroObject) => {
  return isOwning(heroObject) && !heroObject.isOnSale && !heroObject.isOnRent && !heroObject.isOnQuesting && config.defikingdoms.heroForSale.map((heroData) => { return heroData.id }).indexOf(heroObject.id) > -1 && heroObject.currentStamina() <= config.defikingdoms.listStamina
}

exports.runDFKSalesLogic = async (owningHeroObjects) => {
  const heroList = config.defikingdoms.heroForSale.map((heroData) => {
    return {...heroData, instance: owningHeroObjects.find(heroObject => heroObject.id === heroData.id)}
  })

  let saleHandlerPromises = []

  for (let i = 0; i < heroList.length; i++) {
    if (isShouldList(heroList[i].instance)) {
      saleHandlerPromises.push(sellHero(heroList[i].id, heroList[i].price))
    }
  }

  await Promise.allSettled(saleHandlerPromises)
}

sellHero = async (heroId, price) => {
  await saleAuctionContract.listHero(heroId, price);
}
