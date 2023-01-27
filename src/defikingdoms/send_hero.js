const config = require("../../config");
const autils = require('../services/autils');
const ethers = require('ethers');
const HeroCore = require('./contracts/heroCore');
const DFKAssistingAuctionUpgradeable = require("./contracts/assistingAuctionUpgradeable")

exports.sendHeroTo = async (heroesStruct, accountInfo, owningHeroObjects) => {
  if (config.sendHeroTo !== null && ethers.utils.isAddress(config.sendHeroTo) && config.sendHeroTo !== accountInfo.walletAddress) {
    const heroObjects = await autils.getHeroesInfoByIds(heroesStruct.completedQuesters)

    for (let i = 0; i < heroObjects.length; i++) {
      const heroCoreContract = new HeroCore(accountInfo)
      const DFKAssistingAuctionUpgradeableContract = new DFKAssistingAuctionUpgradeable(accountInfo)

      if (heroObjects[i].isOnRent) {
        await DFKAssistingAuctionUpgradeableContract.unlistHero(heroObjects[i].id)
      }

      await heroCoreContract.transferFrom(config.sendHeroTo, heroObjects[i].id)
    }

    for (let i = 0; i < owningHeroObjects.length; i++) {
      if (!owningHeroObjects[i].isOnRent && !owningHeroObjects[i].isOnSale && !owningHeroObjects[i].isOnQuesting) {
        const heroCoreContract = new HeroCore(accountInfo)
        await heroCoreContract.transferFrom(config.sendHeroTo, owningHeroObjects[i].id)
      }
    }
  }
}