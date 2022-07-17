const { Harmony } = require('@harmony-js/core');
const {
	ChainID,
	ChainType,
} = require('@harmony-js/utils');

const config = require("../../config.js");
const autils = require("./autils")
const questCoreV2 = require('../../abis/QuestCoreV2.json')

const hmy = new Harmony(
	autils.getRpc(config.useRpcIndex),
	{
		chainType: ChainType.Harmony,
		chainId: ChainID.HmyMainnet,
	},
);
hmy.wallet.addByPrivateKey(config.privateKey);

const questContract = hmy.contracts.createContract(
	questCoreV2,
	config.questCoreV2
);

exports.CheckAndSendForagers = async (heroesStruct, isPro) => {
	let questType = config.quests[1]
	if (questType.name !== "Foraging") {
		throw new Error("config index was changed");
	}

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

	let ForagerPromises = []
	possibleForagers.forEach(hero => {
		ForagerPromises.push(questContract.methods.getCurrentStamina(hero).call(undefined, autils.getLatestBlockNumber()))
	});

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
		await questContract.methods.startQuest(LocalBatching, config.quests[1].contractAddress, foragingTries, 0).send(autils.gasSettingFormater()).then((txnHash) => {
			if (txnHash.transaction.txStatus === 'CONFIRMED') {
				console.log("Sent " + LocalBatching + " on a " + (isPro ? "professional" : "normal") + "Foraging Quest")
			} else {
				autils.txnFailLog("sent " + LocalBatching + " failed");
			}
		}).catch((error) => {
			console.log(error);
		});
	} else {
		console.log("No Forager Sent")
	}
}
