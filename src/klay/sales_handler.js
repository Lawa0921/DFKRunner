const config = require("~/config.js");
const SaleAuction = require("~/src/klay/contracts/saleAuction");

const isShouldList = (heroObject) => {
  return !heroObject.isOnSale && !heroObject.isOnRent && !heroObject.isOnQuesting && heroObject.currentStamina() <= config.klay.listStamina
}

exports.runKLAYSalesLogic = async (owningHeroObjects, accountInfo) => {
  const saleAuctionContract = new SaleAuction(accountInfo)
  const heroList = config.klay.heroForSale.map((heroData) => {
    return {...heroData, instance: owningHeroObjects.find(heroObject => heroObject.id === heroData.id)}
  }).filter((heroObject) => {
    return heroObject.instance.owner === accountInfo.walletAddress
  })

  const saleHandlerPromises = heroList.filter(heroObject => isShouldList(heroObject.instance)).map(shouldListHero => sellHero(shouldListHero.id, shouldListHero.price, saleAuctionContract))

  await Promise.allSettled(saleHandlerPromises)
}

sellHero = async (heroId, price, saleAuctionContract) => {
  await saleAuctionContract.listHero(heroId, price);
}
