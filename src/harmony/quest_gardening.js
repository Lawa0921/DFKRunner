const config = require("~/config.js");
const autils = require('~/src/services/autils');
const QuestCoreV1 = require('~/src/harmony/contracts/questCoreV1');
const questCoreV1Contract = new QuestCoreV1();
const minStamina = 25;

exports.CheckAndSendGardeners = async (heroesStruct) => {
  const questType = config.harmony.quest.gardening
  const activeQuesterIds = heroesStruct.allQuesters
  const heroObjects = await autils.getHerosInfo(questType.heroes.map(heroData => heroData.heroID))
  const possibleGardeners = heroObjects.filter((heroObject) => { 
    return activeQuesterIds.indexOf(heroObject.id) === -1 && heroObject.currentStamina >= minStamina && heroObject.owner === config.walletAddress
  })

  if (possibleGardeners.length > 0) {
    for (let i = 0; i < possibleGardeners.length; i++) {
      const gardeningHeroData = questType.heroes.find(heroData => heroData.heroID === possibleGardeners[i].id)

      if (gardeningHeroData) {
        await questCoreV1Contract.startGardening(gardeningHeroData.heroID, gardeningHeroData.gardenID)   
      }
    }
  } else {
    console.log("No Gardener sent")
  }
}
