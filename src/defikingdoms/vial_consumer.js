const config = require("~/config.js");
const ConsumableItem = require('~/src/defikingdoms/contracts/consumableItem');
const ItemConsumer = require('~/src/defikingdoms/contracts/itemConsumer');
const SaleAuction = require("~/src/defikingdoms/contracts/saleAuction")
const staminaVialRegenerateAmount = 25;

exports.runVialLogic = async (owningHeroObjects, accountInfo) => {
  const staminaVialContract = new ConsumableItem(accountInfo, config.defikingdoms.staminaVial)

  if (config.defikingdoms.useStaminaVialHeroIds.length > 0) {
    if ((await staminaVialContract.balanceOf()).toNumber() === 0) {
      console.log("not have stamina vial")
    } else {
      const consumers = owningHeroObjects.filter((heroObject) => { 
        return config.defikingdoms.useStaminaVialHeroIds.indexOf(heroObject.id) > -1 && heroObject.stamina - heroObject.currentStamina() >= staminaVialRegenerateAmount && heroObject.owner === accountInfo.walletAddress && !heroObject.isOnQuesting
      })
  
      for (let i = 0; i < consumers.length; i++) {
        const saleAuctionContract = new SaleAuction(accountInfo)
        const itemConsumerContract = new ItemConsumer(accountInfo)

        if (consumers[i].isOnRent) {
          await saleAuctionContract.unrentHero(consumers[i].id)
        } else if (consumers[i].isOnSale) {
          await saleAuctionContract.unlistHero(consumers[i].id)
        } else if (consumers[i].isOnQuesting) {
          continue
        }

        await itemConsumerContract.consumeItem(config.defikingdoms.staminaVial ,consumers[i].id)
      }
    }
  }
}