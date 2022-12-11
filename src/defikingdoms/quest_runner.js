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
const { enterRaffle } = require("~/src/defikingdoms/enter_raffle");
const { airdropClaim } = require("~/src/defikingdoms/airdrop_claim");
const { runDFKSalesLogic } = require('~/src/defikingdoms/sales_handler');
const { runDFKLevelUpLogic } = require('~/src/defikingdoms/hero_level_up'); 
const { runDFKRentHeroLogic } = require('~/src/defikingdoms/hero_rent');
const { runVialLogic } = require('~/src/defikingdoms/vial_consumer');
const autils = require("~/src/services/autils");
const config = require("~/config.js");

exports.runDFKChainQuest = async (accountInfo) => {
  try {
    const baseGasPrice = await autils.getDFKBaseGasFee()
    console.log(`DFK Current base gasPrice: ${baseGasPrice}`)
  
    if (baseGasPrice > config.defikingdoms.maxGasPrice) {
      console.log(`DFK Current base gasPrice: ${baseGasPrice} is over then maxGasPrice setting: ${config.defikingdoms.maxGasPrice}, will retry later.`)
    } else {
      const questCoreV2Contract = new QuestCoreV2(accountInfo);
  
      const activeQuests = await questCoreV2Contract.getAccountActiveQuests();
      const heroesStruct = dataParser.questDataParser(activeQuests);
      const owningHeroObjects = await autils.getHeroesInfoByIds(autils.getDFKOwningHeroIds());
    
      await CompleteQuests(heroesStruct, accountInfo);
      await sendHeroTo(heroesStruct, accountInfo, owningHeroObjects);
      await enterRaffle(accountInfo);
      await airdropClaim(accountInfo);
  
      await runDFKSalesLogic(owningHeroObjects, accountInfo);
      await runDFKRentHeroLogic(owningHeroObjects, accountInfo);
  
      await runVialLogic(owningHeroObjects, accountInfo);
      await runDFKLevelUpLogic(owningHeroObjects, accountInfo);
  
      await CheckAndSendDFKFishers(heroesStruct, owningHeroObjects, accountInfo)
      await CheckAndSendDFKForagers(heroesStruct, owningHeroObjects, accountInfo)
      await CheckAndSendDFKGardeners(heroesStruct, owningHeroObjects, accountInfo)
      await CheckAndSendDFKGoldMiners(heroesStruct, owningHeroObjects, accountInfo)
      await CheckAndSendDFKCrystalMiners(heroesStruct, accountInfo)
      await CheckAndSendDFKStatQuests(heroesStruct, owningHeroObjects, accountInfo)
    }
  } catch (error) {
    console.log(`fail reason: ${error.reason}`)
    console.log(`error code: ${error.code}`)
    console.log(`error message: ${error.message}`)
    console.log(`raw error: ${error}`)
    process.exit();
  }
}
