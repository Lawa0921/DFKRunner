const config = require("~/config.js");
const autils = require('~/src/services/autils');
const QuestCoreV2 = require('~/src/defikingdoms/contracts/questCoreV2');
const questCoreV2Contract = new QuestCoreV2();
const minStamina = 25;
const maxBatch = 6;

exports.CheckAndSendDFKGoldMiners = async (heroesStruct) => {
  const questType = config.defikingdoms.quest.goldMining
  const activeQuesterIds = heroesStruct.allQuesters
  const heroObjects = await autils.getHerosInfo(questType.heroes)
  const possibleGoldMiners = heroObjects.filter((heroObject) => { return activeQuesterIds.indexOf(heroObject.id) === -1 && heroObject.currentStamina >= minStamina && heroObject.owner === config.walletAddress })
  const batchAmount = questType.singleBatchAmount > maxBatch ? maxBatch : questType.singleBatchAmount

  if (possibleGoldMiners.length > 0 && possibleGoldMiners.length >= batchAmount) {
    const sentMinerIds = possibleGoldMiners.slice(0, batchAmount).map(heroObject => heroObject.id)
    console.log(`senting ${sentMinerIds} to gold mining quest`)
    await questCoreV2Contract.startGoldMining(sentMinerIds)
  } else {
    console.log("No gold miner sent")
  }
}
