const config = require("~/config.js");
const QuestCoreV2 = require('~/src/defikingdoms/contracts/questCoreV2');
const autils = require('~/src/services/autils');

exports.CheckAndSendDFKFishers = async (heroesStruct, isPro) => {
  const questType = config.defikingdoms.quest.fishing
  let minBatch = isPro ? questType.professionHeroes.length : questType.nonProfessionHeroes.length;
	let maxBatch = 1;
	minBatch = minBatch > maxBatch ? maxBatch : minBatch;
	let proStamUsage = 5;
	let normStamUsage = 7;
	let minStam = isPro ? questType.proMinStam : questType.normMinStam;
	let proFishingTries = Math.floor(minStam/proStamUsage);
	let normFishingTries = Math.floor(minStam/normStamUsage);
	let fishingTries = isPro ? proFishingTries : normFishingTries;

	let activeQuesters = heroesStruct.allQuesters
	let configFishers = isPro ? questType.professionHeroes : questType.nonProfessionHeroes
	let possibleFishers = configFishers.filter((e) => {
		return (activeQuesters.indexOf(e) < 0);
	});

  let FisherPromises = []

	for (let i = 0; i < possibleFishers.length; i++ ) {
		FisherPromises.push(await new QuestCoreV2().getCurrentStamina(possibleFishers[i]))
	}


	let staminaValues = await Promise.allSettled(FisherPromises);
	staminaValues = staminaValues.map(res => res = res.value?.toNumber() || 0);
	
	LocalBatching = []
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
    const tx = await new QuestCoreV2().startFishingQuest(LocalBatching, fishingTries)
		let res = await tx.wait();

		if (res.status === 1) {
			console.log("Sent " + LocalBatching + " on a " + (isPro ? "professional" : "normal") + "Fishing Quest")
		} else {
			autils.txnFailLog("sent " + LocalBatching + " failed");
		}
  } else {
		console.log("No Fisher sent")
	} 
}
