const { Harmony } = require('@harmony-js/core');
const {
    ChainID,
    ChainType,
  } = require('@harmony-js/utils');

const config = require("~/config.js");
const autils = require('~/src/services/autils')

const hmy = new Harmony(
    autils.getRpc(config.harmony.useRpcIndex),
    {
        chainType: ChainType.Harmony,
        chainId: ChainID.HmyMainnet,
    },
);
hmy.wallet.addByPrivateKey(config.privateKey);

const questCoreV2 = require('~/abis/QuestCoreV2.json');
const questContract = hmy.contracts.createContract(questCoreV2, config.harmony.questCoreV2);

const heroCoreABI = require('~/abis/HeroCore.json')
const heroContract = hmy.contracts.createContract(heroCoreABI, config.harmony.heroCore);
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
    const staminaPromises = []
    heroList.forEach((heroToSell) => {
        staminaPromises.push(questContract.methods.getCurrentStamina(parseInt(heroToSell.id, 10)).call(undefined, autils.getLatestBlockNumber()))
    })

    let staminaValues = await Promise.allSettled(staminaPromises)
    staminaValues = staminaValues.map( res => res.value ? Number(res.value) : -1 )

    const heroOwnersPromises = []
    heroList.forEach((hero) => {
        heroOwnersPromises.push(heroContract.methods.ownerOf(hero.id).call(undefined, autils.getLatestBlockNumber()));
    });

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

    return;
}
