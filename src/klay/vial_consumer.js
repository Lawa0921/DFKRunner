const config = require("../../config");
const ethers = require('ethers');
const ConsumableItem = require('~/src/klay/contracts/consumableItem');
const ItemConsumer = require('~/src/klay/contracts/itemConsumer');
const SaleAuction = require("~/src/klay/contracts/saleAuction")
const AssistingAuctionUpgradeable = require("~/src/klay/contracts/assistingAuctionUpgradeable")
const staminaVialRegenerateAmount = 25;

exports.runVialLogic = async (owningHeroObjects, accountInfo) => {
  const staminaVialContract = new ConsumableItem(accountInfo, config.klay.staminaVial)

  if (config.klay.useStaminaVialHeroIds.length > 0) {
    if ((await staminaVialContract.balanceOf()).toNumber() === 0) {
      console.log("not have stamina vial")
    } else {
      const consumers = owningHeroObjects.filter((heroObject) => { 
        return config.klay.useStaminaVialHeroIds.indexOf(heroObject.id) > -1 && 
        heroObject.stamina - heroObject.currentStamina() >= staminaVialRegenerateAmount && 
        heroObject.owner === accountInfo.walletAddress && 
        !heroObject.isOnQuesting &&
        heroObject.network === "kla"
      })
  
      for (let i = 0; i < consumers.length; i++) {
        const saleAuctionContract = new SaleAuction(accountInfo)
        const AssistingAuctionUpgradeableContract = new AssistingAuctionUpgradeable(accountInfo)
        const itemConsumerContract = new ItemConsumer(accountInfo)
        const staminaVialAllowance = await staminaVialContract.allowance(config.klay.staminaVial)

        if (consumers[i].isOnRent) {
          await AssistingAuctionUpgradeableContract.unlistHero(consumers[i].id)
        } else if (consumers[i].isOnSale) {
          await saleAuctionContract.unlistHero(consumers[i].id)
        } else if (consumers[i].isOnQuesting) {
          continue
        }

        if (staminaVialAllowance === 0) {
          await staminaVialContract.approve(config.klay.itemConsumer ,ethers.constants.MaxUint256)
        }

        await itemConsumerContract.consumeItem(config.klay.staminaVial ,consumers[i].id)
      }
    }
  }
}