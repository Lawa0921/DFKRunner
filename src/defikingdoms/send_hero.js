const config = require("~/config.js");
const autils = require('~/src/services/autils');
const ethers = require('ethers');
const HeroCore = require('~/src/defikingdoms/contracts/heroCore');
const SaleAuction = require('~/src/defikingdoms/contracts/saleAuction');

exports.sendHeroTo = async (heroesStruct, accountInfo) => {
    if (config.sendHeroTo !== null && ethers.utils.isAddress(config.sendHeroTo)) {
        const heroObjects = await autils.getHerosInfo(heroesStruct.completedQuesters)

        for (let i = 0; i < heroObjects.length; i++) {
            const heroCoreContract = new HeroCore(accountInfo)
            const saleAuctionContract = new SaleAuction(accountInfo)

            if (heroObjects[i].isOnRent) {
                await saleAuctionContract.unrentHero(heroObjects[i].id)
            }

            await heroCoreContract.transferFrom(config.sendHeroTo, heroObjects[i].id)
        }
    }
}