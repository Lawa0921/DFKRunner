const config = require("~/config.js");
const autils = require('~/src/services/autils')
const QuestCoreV2 = require('~/src/harmony/contracts/questCoreV2');
const questCoreV2Contract = new QuestCoreV2();
const minStamina = 25;

exports.CheckAndSendStatQuests = async (heroesStruct) => {
    for (let i = 0; i < config.harmony.quest.statQuests.length; i++) {
        const questType = config.harmony.quest.statQuests[i]

        if (questType.heroes.length !== 0) {
            const activeQuesterIds = heroesStruct.allQuesters
            const heroObjects = await autils.getHerosInfo(questType.heroes)
            const possibleHeroes = heroObjects.filter((heroObject) => { return activeQuesterIds.indexOf(heroObject.id) === -1 && heroObject.currentStamina() >= minStamina && heroObject.owner === config.walletAddress })
    
            if (possibleHeroes.length > 0) {
                for (let i = 0; i < possibleHeroes.length; i++) {
                    console.log(`senting ${possibleHeroes[i].id} to ${questType.name}`);
                    const attemp = Math.floor(possibleHeroes[i].currentStamina() / 5)
                    await questCoreV2Contract.startStatQuest([possibleHeroes[i].id], attemp, questType.contractAddress, questType.name);
                }
            }
        }
    }
}
