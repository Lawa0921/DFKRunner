const config = require("~/config.js");
const autils = require('~/src/services/autils');
const SaleAuction = require("~/src/defikingdoms/contracts/saleAuction");
const saleAuctionContract = new SaleAuction();

const isOwning = (heroObject) => {
  return heroObject.owner === config.walletAddress;
}

const isShouldList = (heroObject) => {
  return isOwning(heroObject) && !heroObject.isOnSale && !heroObject.isOnRent && heroObject.currentStamina() < config.defikingdoms.listStamina
}

const isShouldUnList = (heroObject) => {
  return heroObject.isOnSale && heroObject.currentStamina() > config.defikingdoms.unlistStamina;
}

exports.runDFKSalesLogic = async () => {
  const heroList = config.defikingdoms.heroForSale.sort((a, b) => { return parseInt(a.id) - parseInt(b.id); });
  const heroObjects = await autils.getHerosInfo(heroList.map((heroData) => { return heroData.id }))
  let saleHandlerPromises = []

  for (let i = 0; i < heroObjects.length; i++) {
    if (isShouldUnList(heroObjects[i])) {
      saleHandlerPromises.push(unsellHero(heroList[i].id))
    } else if (isShouldList(heroObjects[i])) {
      saleHandlerPromises.push(sellHero(heroList[i].id, heroList[i].price))
    }
  }

  await Promise.allSettled(saleHandlerPromises)
}

sellHero = async (heroId, price) => {
  await saleAuctionContract.listHero(heroId, price);
}

unsellHero = async (heroId) => {
  await saleAuctionContract.unlistHero(heroId);
}
