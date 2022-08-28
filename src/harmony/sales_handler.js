const config = require("~/config.js");
const autils = require('~/src/services/autils');
const SaleAuction = require("~/src/harmony/contracts/saleAuction");
const saleAuctionContract = new SaleAuction();

const isOwning = (heroObject) => {
  return heroObject.owner === config.walletAddress;
}

const isShouldList = (heroObject) => {
  return isOwning(heroObject) && !heroObject.isOnSale && !heroObject.isOnRent && heroObject.currentStamina() < config.harmony.listStamina
}

const isShouldUnList = (heroObject) => {
  return heroObject.isOnSale && heroObject.currentStamina() > config.harmony.unlistStamina;
}

exports.runSalesLogic = async () => {
  const heroList = config.harmony.heroForSale.sort((a, b) => { return parseInt(a.id) - parseInt(b.id); });
  const heroObjects = await autils.getHerosInfo(heroList.map((heroData) => { return heroData.id }))

  for (let i = 0; i < heroObjects.length; i++) {
    if (isShouldUnList(heroObjects[i])) {
      await saleAuctionContract.unlistHero(heroList[i].id);
    } else if (isShouldList(heroObjects[i])) {
      await saleAuctionContract.listHero(heroList[i].id, heroList[i].price);
    }
  }
}
