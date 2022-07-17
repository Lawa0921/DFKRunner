const { Harmony } = require('@harmony-js/core');
const {
    ChainID,
    ChainType,
  } = require('@harmony-js/utils');

const config = require("~/config.js");
const autils = require("./autils")

const hmy = new Harmony(
    autils.getRpc(config.useRpcIndex),
    {
        chainType: ChainType.Harmony,
        chainId: ChainID.HmyMainnet,
    },
);
hmy.wallet.addByPrivateKey(config.privateKey);

const questCoreV2 = require('~/abis/QuestCoreV2.json')
let questContract = hmy.contracts.createContract(
		questCoreV2,
    config.questCoreV2,   
    {
        defaultGas: config.gasLimit,
        defaultGasPrice: config.gasPrice
    });

exports.CheckAndSendFishers = async (heroesStruct, isPro) => {
	let questType = config.quests[0]
	if (questType.name !== "Fishing")
	{
			throw new Error("config index was changed");
	}

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

	let FisherPromises = []
	possibleFishers.forEach(fisher => {
		FisherPromises.push(questContract.methods.getCurrentStamina(fisher).call(undefined, autils.getLatestBlockNumber()))
	});

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
		await questContract.methods.startQuest(LocalBatching, config.quests[0].contractAddress, fishingTries, 0).send(autils.gasSettingFormater()).then((txnHash) => {
			if (txnHash.transaction.txStatus === 'CONFIRMED') {
				console.log("Sent " + LocalBatching + " on a " + (isPro ? "professional" : "normal") + "Fishing Quest")
			} else {
				autils.txnFailLog("sent " + LocalBatching + " failed");
			}
		}).catch((error) => {
			console.log(error);
		});
	} else {
		console.log("No Fisher sent")
	} 
}
