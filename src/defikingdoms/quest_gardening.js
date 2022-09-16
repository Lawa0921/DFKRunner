const config = require("~/config.js");
const QuestCoreV2 = require('~/src/defikingdoms/contracts/questCoreV2');
const questCoreV2Contract = new QuestCoreV2();
const minStamina = 25;

exports.CheckAndSendDFKGardeners = async (heroesStruct, owningHeroObjects) => {
  const questType = config.defikingdoms.quest.gardening
  const activeQuesterIds = heroesStruct.allQuesters

  for (let i = 0; i < questType.pairAddressMappings.length; i++) {
    const possibleGardeners = owningHeroObjects.filter((heroObject) => { 
      return questType.pairAddressMappings[i].heroes.indexOf(heroObject.id) > -1 && activeQuesterIds.indexOf(heroObject.id) === -1 && heroObject.currentStamina() >= minStamina && heroObject.owner === config.walletAddress 
    })

    if (possibleGardeners.length > 0 && possibleGardeners.length >= questType.pairAddressMappings[i].singleBatchAmount) {
      const sentGardenerIds = possibleGardeners.slice(0, questType.pairAddressMappings[i].singleBatchAmount).map(heroObject => heroObject.id)
      console.log(`senting ${sentGardenerIds} to ${questType.pairAddressMappings[i].tokenPair} gardening quest`)
      await questCoreV2Contract.startGardeningQuest(sentGardenerIds, questType.pairAddressMappings[i].pairAddress)
    } else {
      console.log(`No gardener sent to ${questType.pairAddressMappings[i].tokenPair}`)
    }
  }
}