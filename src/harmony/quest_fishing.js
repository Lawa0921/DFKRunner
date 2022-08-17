const config = require("~/config.js");
const autils = require('~/src/services/autils');
const QuestCoreV2 = require('~/src/harmony/contracts/questCoreV2');
const questCoreV2Contract = new QuestCoreV2();
const minStamina = 25;

exports.CheckAndSendFishers = async (heroesStruct) => {
	const questType = config.harmony.quest.fishing
	const activeQuesterIds = heroesStruct.allQuesters
	const heroObjects = await autils.getHerosInfo(questType.heroes)
	const possibleFishers = heroObjects.filter((heroObject) => { return activeQuesterIds.indexOf(heroObject.id) === -1 && heroObject.currentStamina >= minStamina && heroObject.owner === config.walletAddress })

	if (possibleFishers.length > 0) {
		for (let i = 0; i < possibleFishers.length; i++) {
			console.log(`senting ${possibleFishers[i].id} to fishing quest`);
			const attemp = possibleFishers[i].profession === "fishing" ? Math.floor(possibleFishers[i].currentStamina / 5) : Math.floor(possibleFishers[i].currentStamina / 7)
			await questCoreV2Contract.startFishingQuest([possibleFishers[i].id], attemp);
		}
	} else {
		console.log("No fisher sent")
	}
}
