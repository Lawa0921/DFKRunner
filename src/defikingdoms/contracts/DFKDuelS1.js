const config = require("~/config.js");
const autils = require('~/src/services/autils');
const ethers = require('ethers');
const DFKDuelS1ABI = require('~/abis/DFKDuelS1.json')
const { NonceManager } = require("@ethersproject/experimental")

const type = {
	'solo': 1,
	'squad': 3,
	'war': 9
}

const background = {
	'desert': 0,
	'forest': 2,
	'plains': 4,
	'island': 6,
	'swamp': 8,
	'mountains': 10,
	'city': 12,
	'arctic': 14
}

const stat = {
	'STR': 0,
	'AGI': 2,
	'INT': 4,
	'WIS': 6,
	'LCK': 8,
	'VIT': 10,
	'END': 12,
	'DEX': 14
}

const typeFee = {
	"solo": {
		"low": "0.1",
		"medium": "0.5",
		"large": "1"
	},
	"squad": {
		"low": "0.3",
		"medium": "1.5",
		"large": "3"
	},
	"war": {
		"low": "1",
		"medium": "5",
		"large": "10"
	}
}

module.exports = class DFKDuelS1Contract {
  constructor(accountInfo) {
		this.provider = new ethers.providers.JsonRpcProvider(config.defikingdoms.rpcs[config.defikingdoms.useRpcIndex])
		this.wallet = new ethers.Wallet(accountInfo.privateKey, this.provider)
		this.contract = new ethers.Contract(config.defikingdoms.DFKDuelS1, DFKDuelS1ABI, new NonceManager(this.wallet))
		this.accountName = accountInfo.accountName
	}

  async enterDuelLobby(duelType, heroIds, fee, duelBackground, duelStat) {
    const txn = await this.contract.enterDuelLobby(
			type[duelType],
			heroIds,
			ethers.utils.parseEther(typeFee[duelType][fee], "ether"),
			background[duelBackground],
			stat[duelStat],
			{ gasPrice: await autils.getBaseGasFee() }
		)

    const receipt = await txn.wait()

    if (receipt.status === 1) {
      console.log(`send ${duelType}:${heroIds} ${duelBackground}/${duelStat}/${fee} duel success`)
    } else {
      console.log(`send ${duelType}:${heroIds} ${duelBackground}/${duelStat}/${fee} duel failed`)
    }
    return receipt
  }

	async completeDuel(duelId) {
		const txn = await this.contract.completeDuel(duelId, { gasPrice: await autils.getBaseGasFee() })
		const receipt = await txn.wait()

		if (receipt.status === 1) {
      console.log(`complete ${duelId} duel success`)
    } else {
      console.log(`complete ${duelId} duel failed`)
    }
    return receipt
	}

	async getActiveDuels() {
		const rawData = await this.contract.getActiveDuels(this.wallet.address)
		const duelData = rawData.map(data => {
			return {
				id: data.id.toString(),
				player1: data.player1,
				player2: data.player2,
				player1DuelEntry: data.player1DuelEntry.toString(),
				player2DuelEntry: data.player2DuelEntry.toString(),
				winner: data.winner,
				player1Heroes: data.player1Heroes.map((heroId) => { return heroId.toString() }),
				player2Heroes: data.player2Heroes.map((heroId) => { return heroId.toString() }),
				startBlock: data.startBlock.toString(),
				duelType: data.duelType,
				status: data.status,
			}
		})

		return duelData
	}

	async getDuelHistory() {
		const rawData = await this.contract.getDuelHistory(this.wallet.address)
		const duelData = rawData.filter(data => data.status !== 0).map(data => {
			return {
				id: data.id.toString(),
				player1: data.player1,
				player2: data.player2,
				player1DuelEntry: data.player1DuelEntry.toString(),
				player2DuelEntry: data.player2DuelEntry.toString(),
				winner: data.winner,
				player1Heroes: data.player1Heroes.map((heroId) => { return heroId.toString() }),
				player2Heroes: data.player2Heroes.map((heroId) => { return heroId.toString() }),
				startBlock: data.startBlock.toString(),
				duelType: data.duelType,
				status: data.status,
			}
		})

		return duelData
	}
}

