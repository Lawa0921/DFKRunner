const config = require("../../../config");
const autils = require('../../services/autils');
const ethers = require('ethers');
const powerUpManagerABI = require('../../../abis/PowerUpManager.json')
const contractAddress = "0xc20a268bc7c4dB28f1f6e1703676513Db06C1B93"
const { NonceManager } = require("@ethersproject/experimental")

module.exports = class powerUpManager {
  constructor(accountInfo) {
    this.provider = new ethers.providers.JsonRpcProvider(config.defikingdoms.rpcs[config.defikingdoms.useRpcIndex])
    this.wallet = new ethers.Wallet(accountInfo.privateKey, this.provider)
    this.contract = new ethers.Contract(contractAddress, powerUpManagerABI, new NonceManager(this.wallet))
    this.accountName = accountInfo.accountName
  }

  async getActivePowerUps() {
    const rawData = await this.contract.getActivePowerUps()
    const powerUpData = rawData.map((data) => {
      return {
        id: ethers.utils.formatUnits(data.id, 0),
        name: data.name,
        powerUpType: ethers.utils.formatUnits(data.powerUpType, 0),
        tiers: ethers.utils.formatUnits(data.tiers, 0),
        heroesPerTier: ethers.utils.formatUnits(data.heroesPerTier, 0),
        lockTimeRequiredToAcquire: ethers.utils.formatUnits(data.lockTimeRequiredToAcquire, 0),
        cancelDelay: ethers.utils.formatUnits(data.cancelDelay, 0),
        govTokenPerTier: data.govTokenPerTier.map(perTier => ethers.utils.formatUnits(perTier))
      }
    })

    return powerUpData
  }

  async isUserPowerUpActive(powerUpId) {
    return await this.contract.isUserPowerUpActive(this.wallet.address, powerUpId)
  }

  async getUserPowerUpDataForActivePowerUps() {
    const rawData = await this.contract.getUserPowerUpDataForActivePowerUps(this.wallet.address)
    const userPowerUpDataForActivePowerUps = rawData.reduce((accumulator, currentValue, index) => {
      if (index === 0) {
        currentValue.forEach((powerUpUserData, j) => {
          accumulator[j].isActivated = powerUpUserData.isActivated
          accumulator[j].emergencyWithdrawHappened = powerUpUserData.emergencyWithdrawHappened
          accumulator[j].tier = ethers.utils.formatUnits(powerUpUserData.tier, 0)
          accumulator[j].openHeroSlots = ethers.utils.formatUnits(powerUpUserData.openHeroSlots, 0)
          accumulator[j].cancellationHeldSlots = ethers.utils.formatUnits(powerUpUserData.cancellationHeldSlots, 0)
          accumulator[j].heldSlotExpiration = ethers.utils.formatUnits(powerUpUserData.heldSlotExpiration, 0)
          accumulator[j].govTokenHoldExpiration = ethers.utils.formatUnits(powerUpUserData.govTokenHoldExpiration, 18)
          accumulator[j].owner = powerUpUserData.owner
        })
      } else if (index === 1) {
        currentValue.forEach((powerUpLock, j) => {
          accumulator[j].powerUpId = ethers.utils.formatUnits(powerUpLock.powerUpId, 0)
          accumulator[j].govTokens = ethers.utils.formatUnits(powerUpLock.govTokens, 18)
          accumulator[j].end = ethers.utils.formatUnits(powerUpLock.end, 0)
          accumulator[j].usedBalance = ethers.utils.formatUnits(powerUpLock.usedBalance, 18)
        })
      }

      return accumulator
    }, rawData.map((_element) => { return {}}))

    return userPowerUpDataForActivePowerUps
  }

  async getAssignedHeroIds(powerUpId) {
    const rawData = await this.contract.getAssignedHeroIds(this.wallet.address, powerUpId)
    const heroIds = rawData.map(data => ethers.utils.formatUnits(data, 0))

    return heroIds
  }

  async assignHeroes(powerUpIds, heroIds) {
    const txn = await this.contract.assignHeroes(powerUpIds, heroIds, { gasPrice: await autils.getDFKGasFee() })
    const res = await txn.wait();

    if (res.status === 1) {
      console.log(`DFK Assign ${heroIds.length} heroes success`)
    } else {
      console.log(`DFK Assign ${heroIds.length} heroes failed`)
    }

    return res;
  }

  async assignHero(powerUpId, heroId) {
    console.log(`DFK Assign hero: ${heroId} powerUp: ${powerUpId}`)

    const txn = await this.contract.assignHero(powerUpId, heroId, { gasPrice: await autils.getDFKGasFee() })
    const res = await txn.wait();

    if (res.status === 1) {
      console.log(`DFK Assign hero: ${heroId} powerUp: ${powerUpId} success`)
    } else {
      console.log(`DFK Assign hero: ${heroId} powerUp: ${powerUpId} failed`)
    }

    return res;
  }

  async cancel(powerUpId) {
    const txn = await this.contract.cancel(powerUpId, { gasPrice: await autils.getDFKGasFee() })
    const res = await txn.wait();

    if (res.status === 1) {
      console.log(`DFK cancel powerUp ${powerUpId} success`)
    } else {
      console.log(`DFK cancel powerUp ${powerUpId} failed`)
    }

    return res;
  }
}
