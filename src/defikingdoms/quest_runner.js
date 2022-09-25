const dataParser = require('~/src/services/data_parser') 
const QuestCoreV2 = require("~/src/defikingdoms/contracts/questCoreV2");
const { CheckAndSendDFKFishers } = require("~/src/defikingdoms/quest_fishing");
const { CheckAndSendDFKForagers } = require("~/src/defikingdoms/quest_foraging");
const { CheckAndSendDFKStatQuests } = require("~/src/defikingdoms/quest_stats");
const { CheckAndSendDFKGoldMiners } = require('~/src/defikingdoms/quest_gold_mining');
const { CheckAndSendDFKCrystalMiners } = require('~/src/defikingdoms/quest_crystal_mining');
const { CheckAndSendDFKGardeners } = require("~/src/defikingdoms/quest_gardening");
const { CompleteQuests } = require('~/src/defikingdoms/quest_complete');
const { runDFKSalesLogic } = require('~/src/defikingdoms/sales_handler');
const { runDFKLevelUpLogic } = require('~/src/defikingdoms/hero_level_up'); 
const { runDFKRentHeroLogic } = require('~/src/defikingdoms/hero_rent');
const autils = require("~/src/services/autils");
const config = require("~/config.js");
const questCoreV2Contract = new QuestCoreV2();

exports.runDFKChainQuest = async () => {
  try {
    const baseGasPrice = await autils.getBaseGasFee()
    console.log(`Current base gasPrice: ${baseGasPrice}`)

    if (baseGasPrice > config.defikingdoms.maxGasPrice) {
      console.log(`Current base gasPrice: ${baseGasPrice} is over then maxGasPrice setting: ${config.defikingdoms.maxGasPrice}, will retry later.`)
    } else {
      const activeQuests = await questCoreV2Contract.getAccountActiveQuests();
      const heroesStruct = dataParser.questDataParser(activeQuests);
      const owningHeroObjects = await autils.getHerosInfo(autils.getDFKOwningHeroIds());
  
      await CompleteQuests(heroesStruct);
  
      await runDFKSalesLogic(owningHeroObjects);
      await runDFKRentHeroLogic(owningHeroObjects);
  
      await runDFKLevelUpLogic(owningHeroObjects);
  
      await CheckAndSendDFKFishers(heroesStruct, owningHeroObjects)
      await CheckAndSendDFKForagers(heroesStruct, owningHeroObjects)
      await CheckAndSendDFKGardeners(heroesStruct, owningHeroObjects)
      await CheckAndSendDFKGoldMiners(heroesStruct, owningHeroObjects)
      // await CheckAndSendDFKCrystalMiners(heroesStruct)
      await CheckAndSendDFKStatQuests(heroesStruct, owningHeroObjects)
    }
  } catch(error) {
    autils.log(error.toString(), true);
  }
}
