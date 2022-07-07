const { Harmony } = require('@harmony-js/core');
const {
  ChainID,
  ChainType,
} = require('@harmony-js/utils');
const autils = require("./autils")
const config = require("./config.json");
const questABI = require("./abi/abi.json")

const hmy = new Harmony(
	autils.getRpc(config.useRpcIndex),
	{
		chainType: ChainType.Harmony,
		chainId: ChainID.HmyMainnet,
	},
);

hmy.wallet.addByPrivateKey(process.env.PRIVATE_KEY);

const questContract = hmy.contracts.createContract(
	questABI,
	config.questContract,   
	{
		defaultGas: config.gasLimit,
		defaultGasPrice: config.gasPrice
	}
);

gardeningQuestPattern = (heroIdInt, poolIdInt) => {
	let rv = ""
	rv += "0xf51333f5" // signature of startQuestWithData
	rv += "0000000000000000000000000000000000000000000000000000000000000080" // not sure - some random checksum
	rv += "000000000000000000000000e4154b6e5d240507f9699c730a496790a722df19" // GardeningQuest Contract
	rv += "0000000000000000000000000000000000000000000000000000000000000001" // attempts
	rv += "00000000000000000000000000000000000000000000000000000000000000c0" // ?
	rv += "0000000000000000000000000000000000000000000000000000000000000001" // ? 
	rv += autils.intToInput(heroIdInt) // heroid
	rv += autils.intToInput(poolIdInt) // poolid (0x0 = one-jewel, 0x11=luna-jewel)
	rv += "0000000000000000000000000000000000000000000000000000000000000000" // ?
	rv += "0000000000000000000000000000000000000000000000000000000000000000" // ?
	rv += "0000000000000000000000000000000000000000000000000000000000000000" // ?
	rv += "0000000000000000000000000000000000000000000000000000000000000000" // ?
	rv += "0000000000000000000000000000000000000000000000000000000000000000" // ?
	rv += "0000000000000000000000000000000000000000000000000000000000000180" // ?
	rv += "00000000000000000000000000000000000000000000000000000000000001a0" // ?
	rv += "0000000000000000000000000000000000000000000000000000000000000000" // ?
	rv += "0000000000000000000000000000000000000000000000000000000000000000" // ?
	rv += "0000000000000000000000000000000000000000000000000000000000000000" // ?
	rv += "0000000000000000000000000000000000000000000000000000000000000000" // ?
	rv += "0000000000000000000000000000000000000000000000000000000000000000" // ?
	rv += "0000000000000000000000000000000000000000000000000000000000000000" // ?
	return rv;
}

exports.CheckAndSendGardeners = async (heroesStruct) => {
	let questType = config.quests[5]
	if (questType.name !== "Gardening") {
		throw new Error("Gardening config index was changed");
	}
	
	let minStam = questType.MinStam;
	let configGardeners = questType.professionHeroes;
	let possibleGardeners = [];

	for (let index = 0; configGardeners.length > index; index++) {
		let heroStamina = await questContract.methods.getCurrentStamina(configGardeners[index].heroID).call();

		if (heroStamina >= minStam && !heroesStruct.allQuesters.includes(configGardeners[index].heroID)) {
				possibleGardeners.push(configGardeners[index]);
		}
	}


  if (possibleGardeners.length > 0) {
		for (let index = 0; configGardeners.length > index; index++) {
			const txn = hmy.transactions.newTx({
				to: config.questContract,
				value: 0,
				gasLimit: config.gasLimit,
				shardID: 0,
				toShardID: 0,
				gasPrice: config.gasPrice,
				data: gardeningQuestPattern(possibleGardeners[index].heroID, possibleGardeners[index].gardenID)
			});

			const signedTxn = await hmy.wallet.signTransaction(txn);
			const txnHash = await hmy.blockchain.createObservedTransaction(signedTxn).promise;

			if (txnHash.txStatus === 'CONFIRMED') {
				console.log("Sent " + possibleGardeners[index].heroID + " on a " + possibleGardeners[index].gardenID + " Gardening Quest")
			} else {
				console.log(`fail hero ${possibleGardeners}`);
				autils.txnFailLog(txnHash);
			}
		}
  } else {
		console.log("No Gardening sent.")
	}
}
