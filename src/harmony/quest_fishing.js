const config = require("~/config.js");
const QuestCoreV2 = require('~/src/harmony/contracts/questCoreV2');
const questCoreV2Contract = new QuestCoreV2();

exports.CheckAndSendFishers = async (heroesStruct, isPro) => {
	const questType = config.harmony.quest.fishing
	let minBatch = isPro ? questType.professionHeroes.length : questType.nonProfessionHeroes.length;
	let maxBatch = 1;
	minBatch = minBatch > maxBatch ? maxBatch : minBatch;
	let proStamUsage = 5;
	let normStamUsage = 7;
	let minStam = isPro ? questType.proMinStam : questType.normMinStam;
	let proFishingTries = Math.round(minStam/proStamUsage);
	let normFishingTries = Math.round(minStam/normStamUsage);
	let fishingTries = isPro ? proFishingTries : normFishingTries;

	let activeQuesters = heroesStruct.allQuesters
	let configFishers = isPro ? questType.professionHeroes : questType.nonProfessionHeroes
	let possibleFishers = configFishers.filter((e) => {
		return (activeQuesters.indexOf(e) < 0);
	});

	let staminaValues = [];
	for ( let i = 0; i < possibleFishers.length; i++ ) {
		staminaValues.push(questCoreV2Contract.getCurrentStamina(possibleFishers[i]));
	}

	staminaValues = await Promise.all(staminaValues);
	
	let LocalBatching = []
	for (let index = 0; index < possibleFishers.length; index++) {
		const stam = staminaValues[index];
		if ( stam >= minStam ) {
			LocalBatching.push(possibleFishers[index]);
		}

		if (LocalBatching.length === maxBatch) {
			break;
		}
	}

	if (LocalBatching.length > 0) {
		console.log("senting " + LocalBatching + " to fishing quest");
		await questCoreV2Contract.startFishingQuest(LocalBatching, fishingTries);
	} else {
		console.log("No Fisher sent")
	} 
}
