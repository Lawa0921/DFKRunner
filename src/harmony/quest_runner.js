const config = require("~/config.js");
const autils = require('~/src/services/autils');
const dataParser = require('~/src/services/data_parser');
const questCoreV1ABI = require("~/abis/QuestCoreV1.json")
const { CompleteQuests } = require('./quest_complete');
const { CheckAndSendFishers } = require('~/src/harmony/quest_fishing');
const { CheckAndSendForagers } = require('~/src/harmony/quest_foraging');
const { CheckAndSendGardeners } = require('~/src/harmony/quest_gardening');
const { CheckAndSendGoldMiners } = require('~/src/harmony/quest_gold_mining');
const { CheckAndSendJewelMiners } = require('~/src/harmony/quest_jewel_mining');
const { CheckAndSendStatQuests } = require('./quest_stats');
const { runLevelUpLogic } = require('~/src/harmony/hero_level_up');
const { runVialLogic } = require('~/src/harmony/vial_consumer');
const { runSalesLogic } = require('./sales_handler');
const questCoreV2ABI = require('~/abis/QuestCoreV2.json')
const QuestCoreV2 = require('~/src/harmony/contracts/questCoreV2');
const questCoreV2Contract = new QuestCoreV2();
const QuestCoreV1 = require('~/src/harmony/contracts/questCoreV1');
const questCoreV1Contract = new QuestCoreV1();

exports.runHarmonyQuest = async () => {
    try {
        console.log("--- Harmony quest ---");

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

        await CheckAndSendGoldMiners(heroesStruct);
        await CheckAndSendJewelMiners(heroesStruct);
        await CheckAndSendGardeners(heroesStruct);

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
