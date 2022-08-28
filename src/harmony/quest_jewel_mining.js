const config = require("~/config.js");
const autils = require('~/src/services/autils');
const QuestCoreV1 = require('~/src/harmony/contracts/questCoreV1');
const questCoreV1Contract = new QuestCoreV1();
const minStamina = 25;
const maxBatch = 6;

exports.CheckAndSendJewelMiners = async (heroesStruct) => {
  const questType = config.harmony.quest.jewelMining
  const activeQuesterIds = heroesStruct.allQuesters
  const heroObjects = await autils.getHerosInfo(questType.heroes)
  const possibleJewelMiners = heroObjects.filter((heroObject) => {
    return activeQuesterIds.indexOf(heroObject.id) === -1 && heroObject.currentStamina() >= minStamina && heroObject.owner === config.walletAddress
  }).sort((heroInfo, nextHeroInfo) => {
    return (nextHeroInfo.strength + nextHeroInfo.endurance) - (heroInfo.strength + heroInfo.endurance)
  })

  const batchAmount = questType.singleBatchAmount > maxBatch ? maxBatch : questType.singleBatchAmount

  if (possibleJewelMiners.length > 0 && possibleJewelMiners.length >= batchAmount) {
    let sentMinerIds = [possibleJewelMiners[0].id]

    if (batchAmount > 1) {
      sentMinerIds = sentMinerIds.concat(possibleJewelMiners.map(heroObject => heroObject.id).slice((batchAmount - 1) * -1))
    }
    console.log(`senting ${sentMinerIds} to jewel mining quest`)
    await questCoreV1Contract.startJewelMining(sentMinerIds)
  } else {
    console.log("No jewel miner sent")
  }
}
