const config = require("~/config.js");
const autils = require('~/src/services/autils');
const QuestCoreV1 = require('~/src/harmony/contracts/questCoreV1');
const questCoreV1Contract = new QuestCoreV1();
const minStamina = 25;

exports.CheckAndSendGoldMiners = async (heroesStruct) => {
  const questType = config.harmony.quest.goldMining
  const activeQuesterIds = heroesStruct.allQuesters
  const heroObjects = await autils.getHerosInfo(questType.heroes)
  const possibleGoldMiners = heroObjects.filter((heroObject) => { return activeQuesterIds.indexOf(heroObject.id) === -1 && heroObject.currentStamina >= minStamina && heroObject.owner === config.walletAddress })

  if (possibleGoldMiners.length > 0 && possibleGoldMiners.length >= questType.singleBatchAmount) {
    const sentMinerIds = possibleGoldMiners.slice(questType.singleBatchAmount - 1).map(heroObject => heroObject.id)
    console.log(`senting ${sentMinerIds} to gold mining quest`)
    await questCoreV1Contract.startGoldMining(sentMinerIds)
  } else {
    console.log("No gold miner sent")
  }
}
