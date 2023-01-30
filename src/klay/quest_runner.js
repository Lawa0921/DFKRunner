const dataParser = require('../services/data_parser') 
const QuestCoreV2 = require("./contracts/questCoreV2");
const { CompleteQuests } = require('./quest_complete');
const { CheckAndSendKLAYFishers } = require("./quest_fishing");
const { CheckAndSendKLAYForagers } = require("./quest_foraging");
const { CheckAndSendKLAYStatQuests } = require("./quest_stats");
const { CheckAndSendKLAYGardeners } = require("./quest_gardening");
const { CheckAndSendKLAYGoldMiners } = require('./quest_gold_mining');
const { CheckAndSendKLAYJadeMiners } = require('./quest_jade_mining');
const { runKLAYSalesLogic } = require('./sales_handler');
const { runKLAYLevelUpLogic } = require('./hero_level_up');
const { runKLAYRentHeroLogic } = require('./hero_rent');
const { sendHeroTo } = require("./send_hero");
const { enterRaffle } = require("./enter_raffle");
const { runVialLogic } = require('./vial_consumer');
const { airdropClaim } = require("./airdrop_claim");
const { runKLAYAssignPowerUp } = require("./powerUp")
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

      // await runKLAYAssignPowerUp(owningHeroObjects, accountInfo);
      await runKLAYLevelUpLogic(owningHeroObjects, accountInfo);
      await runKLAYSalesLogic(owningHeroObjects, accountInfo);
      await runKLAYRentHeroLogic(owningHeroObjects, accountInfo);
      await runVialLogic(owningHeroObjects, accountInfo);

      await CheckAndSendKLAYFishers(heroesStruct, owningHeroObjects, accountInfo)
      await CheckAndSendKLAYForagers(heroesStruct, owningHeroObjects, accountInfo)
      await CheckAndSendKLAYGardeners(heroesStruct, owningHeroObjects, accountInfo)
      await CheckAndSendKLAYGoldMiners(heroesStruct, owningHeroObjects, accountInfo)
      await CheckAndSendKLAYJadeMiners(heroesStruct, accountInfo)
      await CheckAndSendKLAYStatQuests(heroesStruct, owningHeroObjects, accountInfo)
    }
  } catch (error) {
    console.log(`fail reason: ${error.reason}`)
    console.log(`error code: ${error.code}`)
    console.log(`error message: ${error.message}`)
    console.log(`raw error: ${error}`)
    process.exit();
  }
}
