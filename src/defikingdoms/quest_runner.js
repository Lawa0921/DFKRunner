const dataParser = require('~/src/services/data_parser') 
const QuestCoreV2 = require("~/src/defikingdoms/contracts/questCoreV2");
const { CheckAndSendDFKFishers } = require("~/src/defikingdoms/quest_fishing");
const { CheckAndSendDFKForagers } = require("~/src/defikingdoms/quest_foraging");
const { CheckAndSendDFKStatQuests } = require("~/src/defikingdoms/quest_stats");
const { CheckAndSendDFKGoldMiners } = require('~/src/defikingdoms/quest_gold_mining');
const { CheckAndSendDFKCrystalMiners } = require('~/src/defikingdoms/quest_crystal_mining');
const { CheckAndSendDFKGardeners } = require("~/src/defikingdoms/quest_gardening");
const { CompleteQuests } = require('~/src/defikingdoms/quest_complete');
const { sendHeroTo } = require("~/src/defikingdoms/send_hero");
const { runDFKSalesLogic } = require('~/src/defikingdoms/sales_handler');
const { runDFKLevelUpLogic } = require('~/src/defikingdoms/hero_level_up'); 
const { runDFKRentHeroLogic } = require('~/src/defikingdoms/hero_rent');
const autils = require("~/src/services/autils");
const config = require("~/config.js");

exports.runDFKChainQuest = async (accountInfo) => {
  try {
    const baseGasPrice = await autils.getBaseGasFee()
    console.log(`DFK Current base gasPrice: ${baseGasPrice - config.defikingdoms.overBaseGasFeeWei}`)
  
    if (baseGasPrice - config.defikingdoms.overBaseGasFeeWei > config.defikingdoms.maxGasPrice) {
      console.log(`DFK Current base gasPrice: ${baseGasPrice - config.defikingdoms.overBaseGasFeeWei} is over then maxGasPrice setting: ${config.defikingdoms.maxGasPrice}, will retry later.`)
    } else {
      const questCoreV2Contract = new QuestCoreV2(accountInfo);
  
      const activeQuests = await questCoreV2Contract.getAccountActiveQuests();
      const heroesStruct = dataParser.questDataParser(activeQuests);
      const owningHeroObjects = await autils.getHerosInfo(autils.getDFKOwningHeroIds());
    
      await CompleteQuests(heroesStruct, accountInfo);
      await sendHeroTo(heroesStruct, accountInfo);
  
      await runDFKSalesLogic(owningHeroObjects, accountInfo);
      await runDFKRentHeroLogic(owningHeroObjects, accountInfo);
  
      await runDFKLevelUpLogic(owningHeroObjects, accountInfo);
  
      await CheckAndSendDFKFishers(heroesStruct, owningHeroObjects, accountInfo)
      await CheckAndSendDFKForagers(heroesStruct, owningHeroObjects, accountInfo)
      await CheckAndSendDFKGardeners(heroesStruct, owningHeroObjects, accountInfo)
      await CheckAndSendDFKGoldMiners(heroesStruct, owningHeroObjects, accountInfo)
      await CheckAndSendDFKCrystalMiners(heroesStruct, accountInfo)
      await CheckAndSendDFKStatQuests(heroesStruct, owningHeroObjects, accountInfo)
    }
  } catch (error) {
    console.log(error)
    process.exit();
  }
}
