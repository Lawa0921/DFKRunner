const config = require("~/config.js");
const autils = require('~/src/services/autils');
const QuestCoreV2 = require("~/src/defikingdoms/contracts/questCoreV2");
const HeroCore = require("~/src/defikingdoms/contracts/heroCore");
const SaleAuction = require("~/src/defikingdoms/contracts/saleAuction");
const questCoreV2Contract = new QuestCoreV2("dfk");
const heroCoreContract = new HeroCore("dfk");
const saleAuctionContract = new SaleAuction("dfk");

const isHeroOnSale = (ownerAddress) => {
  return ownerAddress.toLowerCase() === config.defikingdoms.saleAuction.toLowerCase();
}

const isOwning = (ownerAddress) => {
  return ownerAddress.toLowerCase() === config.walletAddress.toLowerCase();
}

const isShouldList = (ownerAddress, stamina) => {
  return isOwning(ownerAddress) && !isHeroOnSale(ownerAddress) && stamina < config.defikingdoms.listStamina && stamina !== -1;
}

const isShouldUnList = async (ownerAddress, stamina, heroId) => {
  return isHeroOnSale(ownerAddress) && stamina > config.defikingdoms.unlistStamina && await autils.isAPIv6Owner(heroId);
}

exports.runDFKSalesLogic = async () => {
  const heroList = config.defikingdoms.heroForSale;
  const staminaPromises = []

  for (let i = 0; i < heroList.length; i++ ) {
    staminaPromises.push(await questCoreV2Contract.getCurrentStamina(heroList[i].id));
  }

  let staminaValues = await Promise.allSettled(staminaPromises)
  staminaValues = staminaValues.map( res => res.value ? Number(res.value) : -1 )

  const heroOwnersPromises = []
  for (let i = 0; i < heroList.length; i++ ) {
    heroOwnersPromises.push(await heroCoreContract.ownerOf(heroList[i].id));
  }

  let heroOwners = await Promise.allSettled(heroOwnersPromises);
  heroOwners = heroOwners.map( res => res.value || -1)

  for (let i = 0; i < heroOwners.length; i++) {
    if (heroOwners[i] === -1) {
      return;
    } else {
      if (await isShouldUnList(heroOwners[i], staminaValues[i], heroList[i].id)) {
        await saleAuctionContract.unlistHero(heroList[i].id);
      } else if (isShouldList(heroOwners[i], staminaValues[i])) {
        await saleAuctionContract.listHero(heroList[i].id, heroList[i].price);
      }
    }
  }
}
