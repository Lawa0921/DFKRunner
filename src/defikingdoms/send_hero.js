const config = require("~/config.js");
const autils = require('~/src/services/autils');
const ethers = require('ethers');
const HeroCore = require('~/src/defikingdoms/contracts/heroCore');
const SaleAuction = require('~/src/defikingdoms/contracts/saleAuction');

exports.sendHeroTo = async (heroesStruct, accountInfo, owningHeroObjects) => {
    if (config.sendHeroTo !== null && ethers.utils.isAddress(config.sendHeroTo) && config.sendHeroTo !== accountInfo.walletAddress) {
        const heroObjects = await autils.getHerosInfo(heroesStruct.completedQuesters)

        for (let i = 0; i < heroObjects.length; i++) {
            const heroCoreContract = new HeroCore(accountInfo)
            const saleAuctionContract = new SaleAuction(accountInfo)

            if (heroObjects[i].isOnRent) {
                await saleAuctionContract.unrentHero(heroObjects[i].id)
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