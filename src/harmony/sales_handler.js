const { Harmony } = require('@harmony-js/core');
const {
    ChainID,
    ChainType,
  } = require('@harmony-js/utils');

const config = require("~/config.js");
const autils = require('~/src/services/autils')
const axios = require('axios')

const LocalSignOn = true;

const hmy = new Harmony(
    autils.getRpc(config.harmony.useRpcIndex),
    {
        chainType: ChainType.Harmony,
        chainId: ChainID.HmyMainnet,
    },
);
hmy.wallet.addByPrivateKey(config.privateKey);

const questCoreV2 = require('~/abis/QuestCoreV2.json');
let questContract = hmy.contracts.createContract(
    questCoreV2,
    config.harmony.questCoreV2,   
    {
        defaultGas: config.harmony.gasLimit,
        defaultGasPrice: config.harmony.gasPrice
    });
const saleAuctionABI = require('~/abis/SaleAuction.json')

const heroCoreABI = require('~/abis/HeroCore.json')
let heroContract = hmy.contracts.createContract(
    heroCoreABI,
    config.harmony.heroCore,
    {
        defaultGas: config.harmony.gasLimit,
        defaultGasPrice: config.harmony.gasPrice
    });

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
    // get stamina of the registed heroes to be on sale
    const staminaPromises = []
    heroList.forEach((heroToSell) => {
        staminaPromises.push(questContract.methods.getCurrentStamina(parseInt(heroToSell.id, 10)).call(undefined, autils.getLatestBlockNumber()))
    })

    let staminaValues = await Promise.allSettled(staminaPromises)
    staminaValues = staminaValues.map( res => res.value ? Number(res.value) : -1 )
    // console.log('staminaValues', staminaValues);

    // get the current owners of those heroes
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
                await unlistHero(heroList[i].id);
            } else if (isShouldList(heroOwners[i], staminaValues[i])) {
                await listHero(heroList[i].id, heroList[i].price);
            }
        }
    }

    return;
}

const unlistHero = async (heroID) => {
    const id = parseInt(heroID, 10);
    console.log(`unlisting hero: ${id}`);
    const txn = hmy.transactions.newTx({
        // contract address
        to: config.harmony.saleAuction,
        // amount of one to send
        value: 0,
        // gas limit, you can use string
        gasLimit: config.harmony.gasLimit,
        // send token from shardID
        shardID: 0,
        // send token to toShardID
        toShardID: 0,
        // gas Price, you can use Unit class, and use Gwei, then remember to use toWei(), which will be transformed to BN
        gasPrice: config.harmony.gasPrice,
        // tx data
        data: cancelAuctionPattern(id)
    });
    // sign the transaction use wallet;
    const signedTxn = await hmy.wallet.signTransaction(txn);
    if (LocalSignOn === true)
    {
        await hmy.blockchain.createObservedTransaction(signedTxn).promise;
        console.log(`unlisting hero: ${id} COMPLETED!`);
    }
    return;
}

const listHero = async (heroID, price) => {
    const id = parseInt(heroID, 10);
    console.log(`listing hero: ${parseInt(id)}: ${price}`);
    const txn = hmy.transactions.newTx({
        // contract address
        to: config.harmony.saleAuction,
        // amount of one to send
        value: 0,
        // gas limit, you can use string
        gasLimit: config.harmony.gasLimit,
        // send token from shardID
        shardID: 0,
        // send token to toShardID
        toShardID: 0,
        // gas Price, you can use Unit class, and use Gwei, then remember to use toWei(), which will be transformed to BN
        gasPrice: config.harmony.gasPrice,
        // tx data
        data: createAuctionPattern(id, price)
    });
    // sign the transaction use wallet;
    const signedTxn = await hmy.wallet.signTransaction(txn);
    if (LocalSignOn === true)
    {
        await hmy.blockchain.createObservedTransaction(signedTxn).promise;
        console.log(`listing hero: ${id} COMPLETED!`);
    }
    return;
}

const cancelAuctionPattern = (heroID) => {
    let rv = '0x96b5a755'
    rv += autils.intToInput(heroID);
    return rv
}

const createAuctionPattern = (heroID, price) => {
    let rv = '0x4ee42914'
    rv += autils.intToInput(heroID);
    const priceInput = (BigInt(price) * BigInt(10 ** 18)).toString(16).padStart(64,'0');
    rv += priceInput // startPrice
    rv += priceInput // endPrice
    rv += '000000000000000000000000000000000000000000000000000000000000003c'
    rv += '0000000000000000000000000000000000000000000000000000000000000000'
    return rv
}
