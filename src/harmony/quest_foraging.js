const config = require("~/config.js");
const QuestCoreV2 = require('~/src/harmony/contracts/questCoreV2');
const questCoreV2Contract = new QuestCoreV2();

exports.CheckAndSendForagers = async (heroesStruct, isPro) => {
	const questType = config.harmony.quest.foraging
	let minBatch = isPro ? questType.professionHeroes.length : questType.nonProfessionHeroes.length;
	let maxBatch = 1;
	minBatch = minBatch > maxBatch ? maxBatch : minBatch;
	let proStamUsage = 5;
	let normStamUsage = 7;
	let minStam = isPro ? questType.proMinStam : questType.normMinStam;
	let proForagingTries = Math.round(minStam/proStamUsage);
	let normForagingTries = Math.round(minStam/normStamUsage);
	let foragingTries = isPro ? proForagingTries : normForagingTries;

	let activeQuesters = heroesStruct.allQuesters
	let configForagers = isPro ? questType.professionHeroes : questType.nonProfessionHeroes
	let possibleForagers = configForagers.filter((e) => {
		return (activeQuesters.indexOf(e) < 0);
	});

	let staminaValues = [];
	for ( let i = 0; i < possibleForagers.length; i++ ) {
		staminaValues.push(questCoreV2Contract.getCurrentStamina(possibleForagers[i]));
	}

	staminaValues = await Promise.all(staminaValues);

	let LocalBatching = []
	for (let index = 0; index < possibleForagers.length; index++) {
		const stam = staminaValues[index];
		if ( stam >= minStam ) {
			LocalBatching.push(possibleForagers[index]);
		}

		if (LocalBatching.length === maxBatch) {
			break;
		}
	}
    
	if (LocalBatching.length > 0) {
		console.log("senting " + LocalBatching + " to foraging quest");
		await questCoreV2Contract.startForagingQuest(LocalBatching, foragingTries);
	} else {
		console.log("No Forager Sent")
	}
}
