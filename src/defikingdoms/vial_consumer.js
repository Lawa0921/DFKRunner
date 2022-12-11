const config = require("~/config.js");
const ethers = require('ethers');
const ConsumableItem = require('~/src/defikingdoms/contracts/consumableItem');
const ItemConsumer = require('~/src/defikingdoms/contracts/itemConsumer');
const SaleAuction = require("~/src/defikingdoms/contracts/saleAuction")
const AssistingAuctionUpgradeable = require("~/src/defikingdoms/contracts/assistingAuctionUpgradeable")
const staminaVialRegenerateAmount = 25;

exports.runVialLogic = async (owningHeroObjects, accountInfo) => {
  const staminaVialContract = new ConsumableItem(accountInfo, config.defikingdoms.staminaVial)

  if (config.defikingdoms.useStaminaVialHeroIds.length > 0) {
    if ((await staminaVialContract.balanceOf()).toNumber() === 0) {
      console.log("not have stamina vial")
    } else {
      const consumers = owningHeroObjects.filter((heroObject) => { 
        return config.defikingdoms.useStaminaVialHeroIds.indexOf(heroObject.id) > -1 &&
          heroObject.stamina - heroObject.currentStamina() >= staminaVialRegenerateAmount && 
          heroObject.owner === accountInfo.walletAddress && 
          !heroObject.isOnQuesting &&
          heroObject.network === "dfk"
      })
  
      for (let i = 0; i < consumers.length; i++) {
        const saleAuctionContract = new SaleAuction(accountInfo)
        const AssistingAuctionUpgradeableContract = new AssistingAuctionUpgradeable(accountInfo)
        const itemConsumerContract = new ItemConsumer(accountInfo)
        const staminaVialAllowance = await staminaVialContract.allowance(config.defikingdoms.staminaVial)

        if (consumers[i].isOnRent) {
          await AssistingAuctionUpgradeableContract.unlistHero(consumers[i].id)
        } else if (consumers[i].isOnSale) {
          await saleAuctionContract.unlistHero(consumers[i].id)
        } else if (consumers[i].isOnQuesting) {
          continue
        }

        if (staminaVialAllowance === 0) {
          await staminaVialContract.approve(config.defikingdoms.itemConsumer ,ethers.constants.MaxUint256)
        }

        await itemConsumerContract.consumeItem(config.defikingdoms.staminaVial ,consumers[i].id)
      }
    }
  }
}