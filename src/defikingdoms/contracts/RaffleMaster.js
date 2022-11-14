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
        accumulator.raffles = currentValue.map((raffle => {
          return {
            id: raffle.id.toString(),
            raffleType: raffle.raffleType.toString(),
            startTime: raffle.startTime.toString(),
            totalEntries: raffle.totalEntries.toString(),
            endTime: raffle.endTime.toString(),
            closedBlock: raffle.closedBlock.toString(),
            winners: raffle.winners,
            status: raffle.status
          }
        }))
      } else if (index === 1) {
        accumulator.raffleTypes = currentValue.map((raffleType) => {
          return {
            id: raffleType.id.toString(),
            rewards: raffleType.rewards,
            rewardAmounts: raffleType.rewardAmounts,
            maxWinners: raffleType.maxWinners.toString(),
            duration: raffleType.duration.toString()
          }
        })
      } else if (index === 2) {
        accumulator.playerEntryAmounts = currentValue.map(playerEntryAmount => playerEntryAmount.toString())
      } else if (index === 3) {
        accumulator.raffleDurations = currentValue.map(raffleDuration => raffleDuration.toString())
      }

      return accumulator
    }, { raffles: [], raffleTypes: [], playerEntryAmounts: [], raffleDurations: [] })

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
    const txn = await this.contract.enterRaffle(raffleId, ticketAmount, { gasPrice: await autils.getBaseGasFee() })
		const receipt = await txn.wait()

		if (receipt.status === 1) {
      console.log(`enter ${ticketAmount} to ${raffleId} pool success`)
    } else {
      console.log(`enter ${ticketAmount} to ${raffleId} pool failed`)
    }
    return receipt
  }
}