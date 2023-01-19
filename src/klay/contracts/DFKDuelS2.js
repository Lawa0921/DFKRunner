const config = require("../../../config");
const autils = require('~/src/services/autils');
const ethers = require('ethers');
const DFKDuelS2ABI = require('~/abis/DFKDuelS2.json')
const { NonceManager } = require("@ethersproject/experimental")

module.exports = class DFKDuelS2Contract {
  constructor(accountInfo) {
		this.provider = new ethers.providers.JsonRpcProvider(config.klay.rpcs[config.klay.useRpcIndex])
		this.wallet = new ethers.Wallet(accountInfo.privateKey, this.provider)
		this.contract = new ethers.Contract(config.klay.DFKDuelS2, DFKDuelS2ABI, new NonceManager(this.wallet))
		this.accountName = accountInfo.accountName
	}

  async getCurrentClassBonuses() {
    let [bounsMainclassesInt, bounsSubclassesInt] = await this.contract.getCurrentClassBonuses()

    return {
      bounsMainclasses: bounsMainclassesInt.map(classInt => this.heroClasses()[classInt]).filter(mainclass => typeof(mainclass) !== "undefined"),
      bounsSubclasses: bounsSubclassesInt.map(classInt => this.heroClasses()[classInt]).filter(subclass => typeof(subclass) !== "undefined"),
    }
  }

  async enterDuelLobby(duelType, heroIds, fee, duelBackground, duelStat) {
    const txn = await this.contract.enterDuelLobby(
			this.duelType()[duelType],
			heroIds,
			ethers.utils.parseEther(this.duelFee()[duelType][fee], "ether"),
			this.duelBackground()[duelBackground],
			this.duelStat()[duelStat],
			{ gasPrice: await autils.getKLAYGasFee() }
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
		const txn = await this.contract.completeDuel(duelId, { gasPrice: await autils.getKLAYGasFee() })
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
				startBlock: parseInt(data.startBlock),
				duelType: data.duelType,
				status: data.status,
			}
		})

		return duelData
	}

	async getPlayerDuelEntries() {
		const rawData = await this.contract.getPlayerDuelEntries(this.wallet.address)

		const entryData = rawData.map(data => {
			return {
				id: data.id.toString(),
				heroes: data.heroes.map((heroId) => { return heroId.toString() }),
				startBlock: data.startBlock.toString(),
				heroPower: data.heroPower.toString(),
				score: data.score.toString(),
				scoreAfter: data.scoreAfter.toString(),
				tokenFee: ethers.utils.formatEther(data.tokenFee.toString()),
				duelType: data.duelType,
				status: data.status,
			}
		})
		
		return entryData
	}

	async matchMake(type) {
		const txn = await this.contract.matchMake(this.duelType()[type], { gasPrice: await autils.getKLAYGasFee() })
		const receipt = await txn.wait()

		if (receipt.status === 1) {
      console.log(`match ${type} duel success`)
    } else {
      console.log(`match ${type} duel failed`)
    }
    return receipt
	}

	getHeroesBestStat(heroObjects) {
		if (heroObjects.length === 1) {
			return Object.keys(heroObjects[0].sortedStat())[0]
		} else {
			const heroesBestStat = heroObjects.map(heroObject => Object.keys(heroObject.sortedStat())[0])
			const bestStatCount = heroesBestStat.reduce(
				(result, stat) => { 
					result[stat] += 1
					return result 
				},
				{ STR: 0, INT: 0, WIS: 0, LCK: 0, AGI: 0, VIT: 0, END: 0, DEX: 0 }
			)

			const sortedStat = Object.fromEntries(Object.entries(bestStatCount).sort(([,a],[,b]) => b - a))
			return Object.keys(sortedStat)[0]
		}
	}

	getHeroesBestBackground(heroObjects) {
		if (heroObjects.length === 1) {
			return heroObjects[0].background
		} else {
			const heroesBackground = heroObjects.map(heroObject => heroObject.background)
			const heroesBackgroundCount = heroesBackground.reduce(
				(result, background) => {
					result[background] += 1 
					return result
				},
				{ desert: 0, forest: 0, plains: 0, island: 0, swamp: 0, mountains: 0, city: 0, arctic: 0 }
			)

			const sortedBackground = Object.fromEntries(Object.entries(heroesBackgroundCount).sort(([,a],[,b]) => b - a))

			return Object.keys(sortedBackground)[0]
		}
	}

	duelType() {
		return {
			'solo': 1,
			'squad': 3,
			'war': 9
		}
	}

	duelBackground() {
		return {
			'desert': 0,
			'forest': 2,
			'plains': 4,
			'island': 6,
			'swamp': 8,
			'mountains': 10,
			'city': 12,
			'arctic': 14
		}
	}

	duelStat() {
		return {
			'STR': 0,
			'AGI': 2,
			'INT': 4,
			'WIS': 6,
			'LCK': 8,
			'VIT': 10,
			'END': 12,
			'DEX': 14
		}
	}

	duelFee() {
		return {
			"solo": {
				"low": "0.1",
				"medium": "0.5",
				"high": "1"
			},
			"squad": {
				"low": "0.3",
				"medium": "1.5",
				"high": "3"
			},
			"war": {
				"low": "1",
				"medium": "5",
				"high": "10"
			}
		}
	}

  heroClasses() {
    return {
      0: "Warrior",
      1: "Knight",
      2: "Thief",
      3: "Archer",
      4: "Priest",
      5: "Wizard",
      6: "Monk",
      7: "Pirate",
      8: "Berserker",
      9: "Seer",
      10: "Legionnaire",
      11: "Scholar",
      16: "Paladin",
      17: "DarkKnight",
      18: "Summoner",
      19: "Ninja",
      20: "Shapeshifter",
      21: "Bard",
      24: "Dragoon",
      25: "Sage",
      26: "SpellBow",
      28: "DreadKnight"
    }
  }

  duelTypeDailyLimit() {
    return {
      "solo": 10,
      "squad": 30,
      "war": 90,
    }
  }
}

