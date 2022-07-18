const dataParser = require('~/src/services/data_parser') 
const QuestCoreV2 = require("~/src/defikingdoms/contracts/questCoreV2");
const { CheckAndSendDFKFishers } = require("~/src/defikingdoms/quest_fishing")
const config = require('~/config.js')
const autils = require("~/src/services/autils")
const questCoreV2Contract = new QuestCoreV2("dfk")

exports.runDFKChainQuest = async () => {
  try {
    console.log("DFK Chain quest");
    const activeQuests = await questCoreV2Contract.getActiveAccountQuests();
    const heroesStruct = dataParser.ParseActiveQuests(activeQuests);

    await CheckAndSendDFKFishers(heroesStruct, true);

    console.log("DFK Chain quest process completed");
  } catch {
    autils.log(error.toString(), true);
  }
}
