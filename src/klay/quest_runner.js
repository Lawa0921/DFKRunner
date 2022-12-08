const dataParser = require('~/src/services/data_parser') 
const QuestCoreV2 = require("~/src/klay/contracts/questCoreV2");
const { CompleteQuests } = require('~/src/klay/quest_complete');
const { CheckAndSendDFKFishers } = require("~/src/klay/quest_fishing");
const { CheckAndSendDFKForagers } = require("~/src/klay/quest_foraging");
const { CheckAndSendDFKStatQuests } = require("~/src/klay/quest_stats");
const { CheckAndSendDFKGardeners } = require("~/src/klay/quest_gardening");
const { CheckAndSendDFKGoldMiners } = require('~/src/klay/quest_gold_mining');
const autils = require("~/src/services/autils");
const config = require("~/config.js");

exports.runKLAYChainQuest = async (accountInfo) => {
  try {
    const baseGasPrice = await autils.getKLAYBaseGasFee()
    console.log(`KLAY Current base gasPrice: ${baseGasPrice}`)
  
    if (baseGasPrice > config.klay.maxGasPrice) {
      console.log(`KLAY Current base gasPrice: ${baseGasPrice} is over then maxGasPrice setting: ${config.klay.maxGasPrice}, will retry later.`)
    } else {
      const questCoreV2Contract = new QuestCoreV2(accountInfo);
  
      const activeQuests = await questCoreV2Contract.getAccountActiveQuests();
      const heroesStruct = dataParser.questDataParser(activeQuests);
      const owningHeroObjects = await autils.getHeroesInfoByIds(autils.getKLAYOwningHeroIds());

      await CompleteQuests(heroesStruct, accountInfo);
      await CheckAndSendDFKFishers(heroesStruct, owningHeroObjects, accountInfo)
      await CheckAndSendDFKForagers(heroesStruct, owningHeroObjects, accountInfo)
      await CheckAndSendDFKGardeners(heroesStruct, owningHeroObjects, accountInfo)
      await CheckAndSendDFKGoldMiners(heroesStruct, owningHeroObjects, accountInfo)
      await CheckAndSendDFKStatQuests(heroesStruct, owningHeroObjects, accountInfo)

      // to do
    }
  } catch (error) {
    console.log(`fail reason: ${error.reason}`)
    console.log(`error code: ${error.code}`)
    console.log(`error message: ${error.message}`)
    process.exit();
  }
}
