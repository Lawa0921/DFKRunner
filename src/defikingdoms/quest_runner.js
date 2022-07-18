const dataParser = require('~/src/services/data_parser') 
const QuestCoreV2 = require("~/src/defikingdoms/contracts/questCoreV2");
const { CheckAndSendDFKFishers } = require("~/src/defikingdoms/quest_fishing");
const { CheckAndSendDFKForagers } = require("~/src/defikingdoms/quest_foraging");
const config = require('~/config.js')
const autils = require("~/src/services/autils")
const questCoreV2Contract = new QuestCoreV2("dfk")

exports.runDFKChainQuest = async () => {
  try {
    console.log("DFK Chain quest");
    const activeQuests = await questCoreV2Contract.getAccountActiveQuests();
    const heroesStruct = await dataParser.heroDataParse(activeQuests);

    await CheckAndSendDFKFishers(heroesStruct, true);
    await CheckAndSendDFKForagers(heroesStruct, true);

    console.log("DFK Chain quest process completed");
  } catch(error) {
    autils.log(error.toString(), true);
  }
}
