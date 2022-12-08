const dataParser = require('~/src/services/data_parser') 
const QuestCoreV2 = require("~/src/klay/contracts/questCoreV2");
const { CompleteQuests } = require('~/src/klay/quest_complete');
const autils = require("~/src/services/autils");
const config = require("~/config.js");

exports.runKLAYChainQuest = async (accountInfo) => {
  try {
    const baseGasPrice = await autils.getKLAYBaseGasFee()
    console.log(`KLAY Current base gasPrice: ${baseGasPrice}`)
  
    if (baseGasPrice > config.klay.maxGasPrice) {
      console.log(`KLAY Current base gasPrice: ${baseGasPrice} is over then maxGasPrice setting: ${config.defikingdoms.maxGasPrice}, will retry later.`)
    } else {
      const questCoreV2Contract = new QuestCoreV2(accountInfo);
  
      const activeQuests = await questCoreV2Contract.getAccountActiveQuests();
      const heroesStruct = dataParser.questDataParser(activeQuests);
      const owningHeroObjects = await autils.getHeroesInfoByIds(autils.getKLAYOwningHeroIds());

      await CompleteQuests(heroesStruct, accountInfo);
      // to do
    }
  } catch (error) {
    console.log(`fail reason: ${error.reason}`)
    console.log(`error code: ${error.code}`)
    console.log(`error message: ${error.message}`)
    process.exit();
  }
}
