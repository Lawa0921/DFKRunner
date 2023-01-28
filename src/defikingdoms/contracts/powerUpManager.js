const config = require("../../../config");
const autils = require('../../services/autils');
const ethers = require('ethers');
const powerUpManagerABI = require('../../../abis/PowerUpManager.json')
const contractAddress = "0xc20a268bc7c4dB28f1f6e1703676513Db06C1B93"

module.exports = class powerUpManager {
  constructor(accountInfo) {
    this.provider = new ethers.providers.JsonRpcProvider(config.defikingdoms.rpcs[config.defikingdoms.useRpcIndex])
    this.wallet = new ethers.Wallet(accountInfo.privateKey, this.provider)
    this.contract = new ethers.Contract(contractAddress, powerUpManagerABI, this.wallet)
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

  // async claimAirdrop(dropId) {
  //   const txn = await this.contract.claimAirdrop(dropId, { gasPrice: await autils.getDFKGasFee() })
  //   const res = await txn.wait();

  //   if (res.status === 1) {
  //     console.log(`claim ${dropId} airdrop success`)
  //   } else {
  //     console.log(`claim ${dropId} airdrop failed`)
  //   }

  //   return res;
  // }
}
