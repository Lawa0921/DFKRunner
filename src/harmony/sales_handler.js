const config = require("~/config.js");
const autils = require('~/src/services/autils')
const QuestCoreV2 = require('~/src/harmony/contracts/questCoreV2');
const questCoreV2Contract = new QuestCoreV2();
const HeroCore = require('~/src/harmony/contracts/heroCore');
let heroCoreContract = new HeroCore();
const SaleAuction = require('~/src/harmony/contracts/saleAuction');
let saleAuctionContract = new SaleAuction();

const isHeroOnSale = (ownerAddress) => {
    return ownerAddress.toLowerCase() === config.harmony.saleAuction.toLowerCase();
}

const isOwning = (ownerAddress) => {
    return ownerAddress.toLowerCase() === config.walletAddress.toLowerCase();
}

const isShouldList = (ownerAddress, stamina) => {
    return isOwning(ownerAddress) && !isHeroOnSale(ownerAddress) && stamina < config.harmony.listStamina && stamina !== -1;
}

const isShouldUnList = async (ownerAddress, stamina, heroId) => {
    return isHeroOnSale(ownerAddress) && stamina > config.harmony.unlistStamina && await autils.isAPIv6Owner(heroId);
}

exports.runSalesLogic = async () => {
    const heroList = config.harmony.heroForSale;
    let staminaValues = [];
	for ( let i = 0; i < heroList.length; i++ ) {
		staminaValues.push(questCoreV2Contract.getCurrentStamina(heroList[i].id));
	}

	staminaValues = await Promise.all(staminaValues);

    let heroOwners = [];
    for (let i = 0; i < heroList.length; i++ ) {
        heroOwners.push(heroCoreContract.ownerOf(heroList[i].id));
    }

    heroOwners = await Promise.all(heroOwners);

    for (let i = 0; i < heroOwners.length; i++) {
        if (await isShouldUnList(heroOwners[i], staminaValues[i], heroList[i].id)) {
            await saleAuctionContract.unlistHero(heroList[i].id);
        } else if (isShouldList(heroOwners[i], staminaValues[i])) {
            await saleAuctionContract.listHero(heroList[i].id, heroList[i].price);
        }
    }

    return;
}
