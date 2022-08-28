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

  for (let i = 0; i < heroObjects.length; i++) {
    if (isShouldUnList(heroObjects[i])) {
      await saleAuctionContract.unlistHero(heroList[i].id);
    } else if (isShouldList(heroObjects[i])) {
      await saleAuctionContract.listHero(heroList[i].id, heroList[i].price);
    }
  }
}
