const config = require("~/config.js");
const ConsumableItem = require('~/src/defikingdoms/contracts/consumableItem');
const ItemConsumer = require('~/src/defikingdoms/contracts/itemConsumer');
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
        const itemConsumerContract = new ItemConsumer(accountInfo)
        await itemConsumerContract.consumeItem(config.defikingdoms.staminaVial ,consumers[i].id)
      }
    }
  }
}