const dataParser = require('~/src/services/data_parser') 
const QuestCoreV2 = require("./contracts/questCoreV2");
const { CompleteQuests } = require('./quest_complete');
const { CheckAndSendDFKFishers } = require("./quest_fishing");
const { CheckAndSendDFKForagers } = require("./quest_foraging");
const { CheckAndSendDFKStatQuests } = require("./quest_stats");
const { CheckAndSendDFKGardeners } = require("./quest_gardening");
const { CheckAndSendDFKGoldMiners } = require('./quest_gold_mining');
const { CheckAndSendDFKJadeMiners } = require('./quest_jade_mining');
const { runKLAYSalesLogic } = require('./sales_handler');
const { runKLAYLevelUpLogic } = require('./hero_level_up');
const { runKLAYRentHeroLogic } = require('./hero_rent');
const { sendHeroTo } = require("./send_hero");
const { enterRaffle } = require("./enter_raffle");
const { runVialLogic } = require('./vial_consumer');
const { airdropClaim } = require("./airdrop_claim");
const autils = require('../services/autils');
const config = require("../../config");

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
      await sendHeroTo(heroesStruct, accountInfo, owningHeroObjects);
      await enterRaffle(accountInfo);
      await airdropClaim(accountInfo);

      await runKLAYLevelUpLogic(owningHeroObjects, accountInfo);
      await runKLAYSalesLogic(owningHeroObjects, accountInfo);
      await runKLAYRentHeroLogic(owningHeroObjects, accountInfo);
      await runVialLogic(owningHeroObjects, accountInfo);

      await CheckAndSendDFKFishers(heroesStruct, owningHeroObjects, accountInfo)
      await CheckAndSendDFKForagers(heroesStruct, owningHeroObjects, accountInfo)
      await CheckAndSendDFKGardeners(heroesStruct, owningHeroObjects, accountInfo)
      await CheckAndSendDFKGoldMiners(heroesStruct, owningHeroObjects, accountInfo)
      await CheckAndSendDFKJadeMiners(heroesStruct, accountInfo)
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
