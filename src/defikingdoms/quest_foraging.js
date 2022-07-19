const config = require("~/config.js");
const QuestCoreV2 = require('~/src/defikingdoms/contracts/questCoreV2');
const autils = require('~/src/services/autils')

exports.CheckAndSendDFKForagers = async (heroesStruct, isPro) => {
  const questType = config.defikingdoms.quest.foraging
  let minBatch = isPro ? questType.professionHeroes.length : questType.nonProfessionHeroes.length;
	let maxBatch = 1;
	minBatch = minBatch > maxBatch ? maxBatch : minBatch;
	let proStamUsage = 5;
	let normStamUsage = 7;
	let minStam = isPro ? questType.proMinStam : questType.normMinStam;
	let proForagingTries = Math.floor(minStam/proStamUsage);
	let normForagingTries = Math.floor(minStam/normStamUsage);
	let foragingTries = isPro ? proForagingTries : normForagingTries;

	let activeQuesters = heroesStruct.allQuesters
	let configForagers = isPro ? questType.professionHeroes : questType.nonProfessionHeroes
	let possibleForagers = configForagers.filter((e) => {
		return (activeQuesters.indexOf(e) < 0);
	});

  let ForagerPromises = []

	for (let i = 0; i < possibleForagers.length; i++ ) {
		ForagerPromises.push(await new QuestCoreV2().getCurrentStamina(possibleForagers[i]))
	}


	let staminaValues = await Promise.allSettled(ForagerPromises);
	staminaValues = staminaValues.map(res => res = res.value?.toNumber() || 0);
	
	LocalBatching = []
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
    const tx = await new QuestCoreV2().startForagingQuest(LocalBatching, foragingTries)
		let res = await tx.wait();

		if (res.status === 1) {
			console.log("Sent " + LocalBatching + " on a " + (isPro ? "professional" : "normal") + "Fishing Quest")
		} else {
			autils.txnFailLog("sent " + LocalBatching + " failed");
		}
  } else {
		console.log("No Forager sent")
	} 
}
