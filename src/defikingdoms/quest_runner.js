const dataParser = require('~/src/services/data_parser') 
const QuestCoreV2 = require("~/src/defikingdoms/contracts/questCoreV2");
const { CheckAndSendDFKFishers } = require("~/src/defikingdoms/quest_fishing");
const { CheckAndSendDFKForagers } = require("~/src/defikingdoms/quest_foraging");
const { CheckAndSendDFKStatQuests } = require("~/src/defikingdoms/quest_stats");
const { CheckAndSendDFKGoldMiners } = require('~/src/defikingdoms/quest_gold_mining');
const { CheckAndSendDFKCrystalMiners } = require('~/src/defikingdoms/quest_crystal_mining');
const { CompleteQuests } = require('~/src/defikingdoms/quest_complete');
const { runDFKSalesLogic } = require('~/src/defikingdoms/sales_handler');
const { runDFKLevelUpLogic } = require('~/src/defikingdoms/hero_level_up'); 
const { runDFKRentHeroLogic } = require('~/src/defikingdoms/hero_rent');
const autils = require("~/src/services/autils");
const questCoreV2Contract = new QuestCoreV2();

exports.runDFKChainQuest = async () => {
  try {
    console.log("--- DFK Chain quest ---");
    const activeQuests = await questCoreV2Contract.getAccountActiveQuests();
    const heroesStruct = dataParser.questDataParser(activeQuests);

    await CompleteQuests(heroesStruct);
    await runDFKSalesLogic();
    await runDFKRentHeroLogic();
    await runDFKLevelUpLogic();
    await CheckAndSendDFKFishers(heroesStruct);
    await CheckAndSendDFKForagers(heroesStruct);
    await CheckAndSendDFKGoldMiners(heroesStruct);
    await CheckAndSendDFKCrystalMiners(heroesStruct);
    await CheckAndSendDFKStatQuests(heroesStruct);

    console.log("--- DFK Chain quest process completed ---");
  } catch(error) {
    autils.log(error.toString(), true);
  }
}
