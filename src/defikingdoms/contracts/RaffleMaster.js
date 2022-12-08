const config = require("~/config.js");
const autils = require('~/src/services/autils');
const ethers = require('ethers');
const RaffleMasterABI = require('~/abis/RaffleMaster.json')
const { NonceManager } = require("@ethersproject/experimental")

module.exports = class DFKDuelS1Contract {
  constructor(accountInfo) {
		this.provider = new ethers.providers.JsonRpcProvider(config.defikingdoms.rpcs[config.defikingdoms.useRpcIndex])
		this.wallet = new ethers.Wallet(accountInfo.privateKey, this.provider)
		this.contract = new ethers.Contract(config.defikingdoms.raffleMaster, RaffleMasterABI, new NonceManager(this.wallet))
		this.accountName = accountInfo.accountName
	}

  async getCurrentRaffleBuckets() {
    const rawData = await this.contract.getCurrentRaffleBuckets()

    const BucketsData = rawData.map(data => {
      return data.toString()
    })

    return BucketsData
  }

  async getCurrentRaffleData() {
    const rawData = await this.contract.getCurrentRaffleData()

    const raffleData = rawData.reduce((accumulator, currentValue, index) => {
      if (index === 0) {
        currentValue.forEach((raffle, j) => {
          accumulator[j].raffleId = raffle.id.toString()
          accumulator[j].startTime = raffle.startTime.toString()
          accumulator[j].totalEntries = raffle.totalEntries.toString()
          accumulator[j].endTime = raffle.endTime.toString()
          accumulator[j].closedBlock = raffle.closedBlock.toString()
          accumulator[j].winners = raffle.winners
          accumulator[j].status = raffle.status
        })
      } else if (index === 1) {
        currentValue.forEach((raffleType, j) => {
          accumulator[j].raffleTypeId = raffleType.id.toString(),
          accumulator[j].rewards = raffleType.rewards,
          accumulator[j].rewardAmounts = raffleType.rewardAmounts,
          accumulator[j].maxWinners = raffleType.maxWinners.toString(),
          accumulator[j].duration = raffleType.duration.toString()
        })
      } else if (index === 2) {
        currentValue.forEach((playerEntryAmount, j) => {
          accumulator[j].playerEntryAmount = parseInt(playerEntryAmount)
        })
      } else if (index === 3) {
        currentValue.forEach((raffleDuration, j) => {
          accumulator[j].raffleDuration = raffleDuration.toString()
        })
      }

      return accumulator
    }, rawData[0].map((_element) => { return {}}))

    return raffleData
  }

  async getLastRaffleBuckets() {
    const rawData = await this.contract.getLastRaffleBuckets()

    const BucketsData = rawData.map(data => {
      return data.toString()
    })

    return BucketsData
  }

  async enterRaffle(raffleId, ticketAmount) {
    const txn = await this.contract.enterRaffle(raffleId, ticketAmount, { gasPrice: await autils.getDFKGasFee() })
		const receipt = await txn.wait()

		if (receipt.status === 1) {
      console.log(`enter ${ticketAmount} to ${raffleId} pool success`)
    } else {
      console.log(`enter ${ticketAmount} to ${raffleId} pool failed`)
    }
    return receipt
  }
}