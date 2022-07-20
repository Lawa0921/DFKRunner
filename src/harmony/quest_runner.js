const { Harmony } = require('@harmony-js/core');
const {
    ChainID,
    ChainType,
} = require('@harmony-js/utils');
const date = require('date-and-time');
const config = require("~/config.js");
const autils = require('~/src/services/autils')
const questCoreV1ABI = require("~/abis/QuestCoreV1.json")
const { CompleteQuests } = require('./quest_complete');
const { CheckAndSendFishers } = require('./quest_fishing');
const { CheckAndSendForagers } = require('./quest_foraging');
const { jewelMiningPattern } = require('./quest_jewelmining');
const { goldMiningPattern } = require('./quest_goldmining');
const { gardeningQuestPattern } = require('./quest_gardening');
const { CheckAndSendStatQuests } = require('./quest_stats');
const questCoreV2ABI = require('~/abis/QuestCoreV2.json')
const QuestCoreV2 = require('~/src/harmony/contracts/questCoreV2');
const questCoreV2Contract = new QuestCoreV2();

const { runSalesLogic } = require('./sales_handler');

const hmy = new Harmony(
    autils.getRpc(config.harmony.useRpcIndex),
    {
        chainType: ChainType.Harmony,
        chainId: ChainID.HmyMainnet,
    },
);

hmy.wallet.addByPrivateKey(config.privateKey);

const questCoreV1Contract = hmy.contracts.createContract(questCoreV1ABI, config.harmony.questCoreV1);

async function getActiveQuests()
{
    let returnValue;
    await questCoreV1Contract.methods.getActiveQuests(config.walletAddress).call(undefined, autils.getLatestBlockNumber())
    .catch(ex => {
        autils.log(`getActiveQuests failed: ${JSON.stringify(ex), returnValue}`, true);
        throw ex;
    }).then((res) => {
        returnValue = res;
    })
    return returnValue;
}

async function CheckAndSendGoldMiners(heroesStruct, isPro)
{
    // too lazy to change struct in config
    let questType = config.harmony.quests[3]
    if (questType.name !== "GoldMining")
    {
        throw new Error("GoldMining config index was changed");
    }

    let minBatch = isPro ? questType.professionHeroes.length : questType.nonProfessionHeroes.length;
    let maxBatch = 6;
    minBatch = minBatch > maxBatch ? maxBatch : minBatch;
    let minStam = isPro ? questType.proMinStam : questType.normMinStam;

    let activeQuesters = heroesStruct.allQuesters
    let configGoldMiners = isPro ? questType.professionHeroes : questType.nonProfessionHeroes
    //console.log(activeQuesters);
    //console.log(configForagers);
    let possibleGoldMiners = configGoldMiners.filter((e) => {
        return (activeQuesters.indexOf(e) < 0);
      });

    let GoldMinerPromises = []
    possibleGoldMiners.forEach(hero => {
        GoldMinerPromises.push(questCoreV1Contract.methods.getCurrentStamina(hero).call(undefined, autils.getLatestBlockNumber()))
    });

    let staminaValues = await Promise.allSettled(GoldMinerPromises);
    staminaValues = staminaValues.map(res => res = res.value?.toNumber() || 0);
    
    // Batching heroes. we only take 6. -> next iteration then we go again
    LocalBatching = []
    for (let index = 0; index < possibleGoldMiners.length; index++) {
        const stam = staminaValues[index];
        if ( stam >= minStam )
        {
            LocalBatching.push(possibleGoldMiners[index]);
        }

        // list full
        if (LocalBatching.length === maxBatch)
        {
            break;
        }
    }

    let numHeroesToSend = LocalBatching.length;

    // fill the last batch up
    if (LocalBatching.length > 0)
    {
        while(LocalBatching.length < maxBatch)
        {
            LocalBatching.push(0)
        }
    }

    console.log("Gold Miner Batches" + (isPro ? " (P): " : " (N): ") + LocalBatching)

    // be lazy only send 1 batch for now.. next minute can send another
    
    if (numHeroesToSend >= minBatch && minBatch > 0)
    {
         const txn = hmy.transactions.newTx({
            to: config.harmony.questCoreV1,
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
            data: goldMiningPattern(LocalBatching[0],LocalBatching[1],LocalBatching[2],LocalBatching[3],LocalBatching[4],LocalBatching[5])
        });
          
        
        // sign the transaction use wallet;
        const signedTxn = await hmy.wallet.signTransaction(txn);
        //  console.log(signedTxn);
        const txnHash = await hmy.blockchain.createObservedTransaction(signedTxn).promise;
        console.log("!!! sending the message on the wire !!!");
        //  console.log(txnHash);
        
        console.log("Sent " + LocalBatching + " on a Gold Mining Quest")
    }
}

async function CheckAndSendJewelMiners(heroesStruct, isPro)
{
    // too lazy to change struct in config
    let questType = config.harmomy.quests[4]
    if (questType.name !== "JewelMining")
    {
        throw new Error("JewelMining config index was changed");
    }

    let minBatch = isPro ? questType.professionHeroes.length : questType.nonProfessionHeroes.length;
    let maxBatch = 1;
    minBatch = minBatch > maxBatch ? maxBatch : minBatch;
    let minStam = isPro ? questType.proMinStam : questType.normMinStam;

    let activeQuesters = heroesStruct.allQuesters
    let configJewelMiners = isPro ? questType.professionHeroes : questType.nonProfessionHeroes
    //console.log(activeQuesters);
    //console.log(configForagers);
    let possibleJewelMiners = configJewelMiners.filter((e) => {
        return (activeQuesters.indexOf(e) < 0);
      });

    let JewelMinerPromises = []
    possibleJewelMiners.forEach(hero => {
        JewelMinerPromises.push(questCoreV1Contract.methods.getCurrentStamina(hero).call(undefined, autils.getLatestBlockNumber()))
    });

    let staminaValues = await Promise.allSettled(JewelMinerPromises);
    staminaValues = staminaValues.map(res => res = res.value?.toNumber() || 0);
    
    // Batching heroes. we only take 6. -> next iteration then we go again
    LocalBatching = []
    for (let index = 0; index < possibleJewelMiners.length; index++) {
        const stam = staminaValues[index];
        if ( stam >= minStam )
        {
            LocalBatching.push(possibleJewelMiners[index]);
        }

        // list full
        if (LocalBatching.length === maxBatch)
        {
            break;
        }
    }

    let numHeroesToSend = LocalBatching.length;

    // fill the last batch up
    if (LocalBatching.length > 0)
    {
        while(LocalBatching.length < maxBatch)
        {
            LocalBatching.push(0)
        }
    }

    console.log("Jewel Miner Batches" + (isPro ? " (P): " : " (N): ") + LocalBatching)

    // be lazy only send 1 batch for now.. next minute can send another
    
    if (numHeroesToSend >= minBatch && minBatch > 0)
    {
        const txn = hmy.transactions.newTx({
            to: config.harmony.questCoreV1,
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
            data: jewelMiningPattern(LocalBatching[0],LocalBatching[1],LocalBatching[2],LocalBatching[3],LocalBatching[4],LocalBatching[5])
        });
          
        
        // sign the transaction use wallet;
        const signedTxn = await hmy.wallet.signTransaction(txn);
        //  console.log(signedTxn);
        console.log("!!! sending the message on the wire !!!");
        const txnHash = await hmy.blockchain.createObservedTransaction(signedTxn).promise;
        
        console.log("Sent " + LocalBatching + " on a Jewel Mining Quest")
    }    
}

async function CheckAndSendGardeners(heroesStruct, isPro)
{
    // too lazy to change struct in config
    let questType = config.harmony.quests[5]
    if (questType.name !== "Gardening")
    {
        throw new Error("Gardening config index was changed");
    }
    
    let minStam = isPro ? questType.proMinStam : questType.normMinStam

    let activeQuesters = heroesStruct.allQuesters
    let configGardeners = isPro ? questType.professionHeroes : questType.nonProfessionHeroes

    let possibleGardeners = [];
    
    if (configGardeners.length > 0)
    {
        possibleGardeners = configGardeners.filter((e) => {
            return (activeQuesters.indexOf(e.heroID) < 0);
        });
    }

    let GardenerPromises = []
    possibleGardeners.forEach(heroDetails => {
        GardenerPromises.push(questCoreV1Contract.methods.getCurrentStamina(heroDetails.heroID).call(undefined, autils.getLatestBlockNumber()))
    });

    let staminaValues = await Promise.allSettled(GardenerPromises);
    staminaValues = staminaValues.map(res => res = res.value?.toNumber() || 0);

    LocalBatching = []
    for (let index = 0; index < possibleGardeners.length; index++) {
        const stam = staminaValues[index];
        if ( stam >= minStam )
        {
            LocalBatching.push(possibleGardeners[index]);
        }
    }

    if (LocalBatching.length > 0) {
        const txn = hmy.transactions.newTx({
            to: config.harmony.questCoreV1,
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
            data: gardeningQuestPattern(LocalBatching[0].heroID,LocalBatching[0].gardenID)
        });
          
        const signedTxn = await hmy.wallet.signTransaction(txn);
        const txnHash = await hmy.blockchain.createObservedTransaction(signedTxn).promise;

        if (txnHash.txStatus === 'CONFIRMED') {
            console.log("Sent " + LocalBatching[0].heroID + " on a " + LocalBatching[0].gardenID + " Gardening Quest")
        } else {
            autils.txnFailLog("sent " + LocalBatching[0].heroID + " failed");
        }        
    } else {
        console.log("No Gardener sent")
    }
}



function GetCurrentDateTime(useRealTime = false)
{
    if (useRealTime)
    {
        return date.addMinutes(new Date(Date.now()), 0);
    }
    return date.addMinutes(new Date(Date.now()), 0);
}

function ParseActiveQuests(activeQuests)
{
    let leadQuestersArray = [];
    let allQuestersArray = [];
    let completedQuestsArray = [];
    let completedQuestersCountArray = []

    const listOfOnSaleHeroes = config.harmony.heroForSale.map( (heroObject) => heroObject = heroObject.id );

    activeQuests.forEach(element => {
        if (element.id.toString() !== "16305")
        {
            leadQuestersArray.push(element.heroes[0].toString());
            let questCompletedDate = new Date(element.completeAtTime*1000)
            // if you found the hero (index != -1) ? true : false
            const useRealTime = (listOfOnSaleHeroes.findIndex(heroOnSale => element.heroes[0].toString() === heroOnSale) !== -1) ? true : false;
            if (questCompletedDate < GetCurrentDateTime(useRealTime))
            {
                completedQuestsArray.push(element.heroes[0].toString());
                completedQuestersCountArray.push(element.heroes.length);
            }
            element.heroes.forEach(hero => {
                allQuestersArray.push(hero.toString());
            })
        }
    });

    let rv = {
        leadQuesters: leadQuestersArray,
        allQuesters: allQuestersArray,
        completedQuesters: completedQuestsArray,
        completedQuestersCount: completedQuestersCountArray
    }
    return rv;
}

async function GetLatestBlock()
{
    const res = await hmy.blockchain.getBlockNumber(0);
    const lastblock = parseInt(res.result,16);
    return lastblock;
}

// ==========================================
let prevBlock = 0;
exports.runHarmonyQuest = async () => {
    try {
        console.log("--- Harmony quest ---");
        let lastBlock = await GetLatestBlock()-1;
        if (lastBlock <= prevBlock)
        {
            autils.log("RPC Lagging..", true);
            return;
        }
        autils.setLatestBlockNumber(lastBlock);
        prevBlock = lastBlock;

        let activeQuests = await getActiveQuests();
        let activeQuests2 = await questCoreV2Contract.getAccountActiveQuests();

        let heroesStruct = ParseActiveQuests(activeQuests);
        let heroesStruct2 = ParseActiveQuests(activeQuests2);

        await CompleteQuests(heroesStruct, config.harmony.questCoreV1, questCoreV1ABI);
        await CompleteQuests(heroesStruct2, config.harmony.questCoreV2, questCoreV2ABI);

        await runSalesLogic();

        await CheckAndSendFishers(heroesStruct2, true);
        await CheckAndSendForagers(heroesStruct2, true);

        // await CheckAndSendGoldMiners(heroesStruct, true);
        // await CheckAndSendJewelMiners(heroesStruct, true);
        await CheckAndSendGardeners(heroesStruct, true);

        await CheckAndSendStatQuests(heroesStruct2);

        console.log("--- Harmony quest process completed ---");
    }
    catch(error)
    {
        if (error.toString().includes('Maximum call stack size exceeded'))
        {
            // can't do anything about a memory leak...
            autils.log(error.toString(), true);
        }
        if (error.toString().includes('The transaction is still not confirmed after 20 attempts'))
        {
            // failure to recover from @harmony-js/core package. restart
            autils.log(error.toString(), true);
        }
        if (error.toString() === '[object Object]')
        {
            autils.log(JSON.stringify(error), true);
        }
        else {
            autils.log(error.toString(), true);
        }
    }
}
