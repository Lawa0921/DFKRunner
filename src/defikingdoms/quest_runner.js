const dataParser = require('../services/data_parser') 
const QuestCoreV3 = require("./contracts/questCoreV3");
const { CheckAndSendDFKFishers } = require("./quest_fishing");
const { CheckAndSendDFKForagers } = require("./quest_foraging");
const { CheckAndSendDFKStatQuests } = require("./quest_stats");
const { CheckAndSendDFKGoldMiners } = require('./quest_gold_mining');
const { CheckAndSendDFKCrystalMiners } = require('./quest_crystal_mining');
const { CheckAndSendDFKGardeners } = require("./quest_gardening");
const { CompleteQuests } = require('./quest_complete');
const { sendHeroTo } = require("./send_hero");
const { enterRaffle } = require("./enter_raffle");
const { airdropClaim } = require("./airdrop_claim");
const { runDFKSalesLogic } = require('./sales_handler');
const { runDFKLevelUpLogic } = require('./hero_level_up'); 
const { runDFKRentHeroLogic } = require('./hero_rent');
const { runVialLogic } = require('./vial_consumer');
const { runDFKAssignPowerUp } = require("./powerUp")
const autils = require('../services/autils');
const config = require("../../config");

exports.runDFKChainQuest = async (accountInfo) => {
  try {
    const baseGasPrice = await autils.getDFKBaseGasFee()
    console.log(`DFK Current base gasPrice: ${baseGasPrice}`)
  
    if (baseGasPrice > config.defikingdoms.maxGasPrice) {
      console.log(`DFK Current base gasPrice: ${baseGasPrice} is over then maxGasPrice setting: ${config.defikingdoms.maxGasPrice}, will retry later.`)
    } else {
      const questCoreV3Contract = new QuestCoreV3(accountInfo);
  
      const activeQuests = await questCoreV3Contract.getAccountActiveQuests();
      const heroesStruct = dataParser.questDataParser(activeQuests);
      const owningHeroObjects = await autils.getHeroesInfoByIds(autils.getDFKOwningHeroIds());
    
      await CompleteQuests(heroesStruct, accountInfo);
      await sendHeroTo(heroesStruct, accountInfo, owningHeroObjects);
      await enterRaffle(accountInfo);
      await airdropClaim(accountInfo);
      
      // await runDFKAssignPowerUp(owningHeroObjects, accountInfo);
      await runDFKLevelUpLogic(owningHeroObjects, accountInfo);
      await runDFKSalesLogic(owningHeroObjects, accountInfo);
      await runDFKRentHeroLogic(owningHeroObjects, accountInfo);  
      await runVialLogic(owningHeroObjects, accountInfo);
  
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
