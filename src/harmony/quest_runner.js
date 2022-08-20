const { Harmony } = require('@harmony-js/core');
const {
    ChainID,
    ChainType,
} = require('@harmony-js/utils');
const config = require("~/config.js");
const autils = require('~/src/services/autils');
const dataParser = require('~/src/services/data_parser');
const questCoreV1ABI = require("~/abis/QuestCoreV1.json")
const { CompleteQuests } = require('./quest_complete');
const { CheckAndSendFishers } = require('~/src/harmony/quest_fishing');
const { CheckAndSendForagers } = require('~/src/harmony/quest_foraging');
const { CheckAndSendStatQuests } = require('./quest_stats');
const { runLevelUpLogic } = require('~/src/harmony/hero_level_up');
const { runVialLogic } = require('~/src/harmony/vial_consumer');
const questCoreV2ABI = require('~/abis/QuestCoreV2.json')
const QuestCoreV2 = require('~/src/harmony/contracts/questCoreV2');
const questCoreV2Contract = new QuestCoreV2();
const QuestCoreV1 = require('~/src/harmony/contracts/questCoreV1');
const questCoreV1Contract = new QuestCoreV1();

const { runSalesLogic } = require('./sales_handler');

const hmy = new Harmony(
    autils.getRpc(config.harmony.useRpcIndex),
    {
        chainType: ChainType.Harmony,
        chainId: ChainID.HmyMainnet,
    },
);

hmy.wallet.addByPrivateKey(config.privateKey);

async function CheckAndSendGoldMiners(heroesStruct, isPro)
{
    const questType = config.harmony.quest.goldMining
    let minBatch = isPro ? questType.professionHeroes.length : questType.nonProfessionHeroes.length;
    let maxBatch = 6;
    minBatch = minBatch > maxBatch ? maxBatch : minBatch;
    let minStam = isPro ? questType.proMinStam : questType.normMinStam;

    let activeQuesters = heroesStruct.allQuesters
    let configGoldMiners = isPro ? questType.professionHeroes : questType.nonProfessionHeroes
    let possibleGoldMiners = configGoldMiners.filter((e) => {
        return (activeQuesters.indexOf(e) < 0);
      });

    let GoldMinerPromises = []
    possibleGoldMiners.forEach(hero => {
        GoldMinerPromises.push(questCoreV1Contract.getCurrentStamina(hero))
    });

    let staminaValues = await Promise.allSettled(GoldMinerPromises);
    staminaValues = staminaValues.map(res => res = res.value?.toNumber() || 0);
    
    LocalBatching = []
    for (let index = 0; index < possibleGoldMiners.length; index++) {
        const stam = staminaValues[index];
        if ( stam >= minStam )
        {
            LocalBatching.push(possibleGoldMiners[index]);
        }

        if (LocalBatching.length === maxBatch)
        {
            break;
        }
    }

    let numHeroesToSend = LocalBatching.length;

    if (LocalBatching.length > 0)
    {
        while(LocalBatching.length < maxBatch)
        {
            LocalBatching.push(0)
        }
    }
    
    if (numHeroesToSend >= minBatch && minBatch > 0) {
        await questCoreV1Contract.startGoldMining(LocalBatching)
    }
}

async function CheckAndSendJewelMiners(heroesStruct, isPro)
{
    const questType = config.harmony.quest.jewelMining
    let minBatch = isPro ? questType.professionHeroes.length : questType.nonProfessionHeroes.length;
    let maxBatch = 1;
    minBatch = minBatch > maxBatch ? maxBatch : minBatch;
    let minStam = isPro ? questType.proMinStam : questType.normMinStam;

    let activeQuesters = heroesStruct.allQuesters
    let configJewelMiners = isPro ? questType.professionHeroes : questType.nonProfessionHeroes
    let possibleJewelMiners = configJewelMiners.filter((e) => {
        return (activeQuesters.indexOf(e) < 0);
      });

    let JewelMinerPromises = []
    possibleJewelMiners.forEach(hero => {
        JewelMinerPromises.push(questCoreV1Contract.getCurrentStamina(hero))
    });

    let staminaValues = await Promise.allSettled(JewelMinerPromises);
    staminaValues = staminaValues.map(res => res = res.value?.toNumber() || 0);
    
    LocalBatching = []
    for (let index = 0; index < possibleJewelMiners.length; index++) {
        const stam = staminaValues[index];
        if ( stam >= minStam )
        {
            LocalBatching.push(possibleJewelMiners[index]);
        }

        if (LocalBatching.length === maxBatch)
        {
            break;
        }
    }

    let numHeroesToSend = LocalBatching.length;

    if (LocalBatching.length > 0)
    {
        while(LocalBatching.length < maxBatch)
        {
            LocalBatching.push(0)
        }
    }
    
    if (numHeroesToSend >= minBatch && minBatch > 0) {
        await questCoreV1Contract.startJewelMining(LocalBatching)
    }    
}

async function CheckAndSendGardeners(heroesStruct, isPro)
{
    const questType = config.harmony.quest.gardening
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
        GardenerPromises.push(questCoreV1Contract.getCurrentStamina(heroDetails.heroID))
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
        await questCoreV1Contract.startGardening(LocalBatching[0].heroID, LocalBatching[0].gardenID)   
    } else {
        console.log("No Gardener sent")
    }
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

        let activeQuests = await questCoreV1Contract.getActiveQuests();
        let activeQuests2 = await questCoreV2Contract.getAccountActiveQuests();

        const heroesStruct = dataParser.questDataParser(activeQuests);
        const heroesStruct2 = dataParser.questDataParser(activeQuests2);

        await CompleteQuests(heroesStruct, config.harmony.questCoreV1, questCoreV1ABI);
        await CompleteQuests(heroesStruct2, config.harmony.questCoreV2, questCoreV2ABI);

        await runLevelUpLogic();
        await runVialLogic();
        await runSalesLogic();

        await CheckAndSendFishers(heroesStruct2);
        await CheckAndSendForagers(heroesStruct2)

        await CheckAndSendGoldMiners(heroesStruct, true);
        await CheckAndSendJewelMiners(heroesStruct, true);
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
