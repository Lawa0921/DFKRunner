const autils = require('../../services/autils');
const config = require("../../../config");
const ethers = require('ethers');
const meditationCircleABI = require('../../../abis/MeditationCircle.json')
const contractAddress = "0xdbEE8C336B06f2d30a6d2bB3817a3Ae0E34f4900"
const { NonceManager } = require("@ethersproject/experimental")

module.exports = class MeditationCircle {
  constructor(accountInfo) {
    this.provider = new ethers.providers.JsonRpcProvider(config.klay.rpcs[config.klay.useRpcIndex])
    this.wallet = new ethers.Wallet(accountInfo.privateKey, this.provider)
    this.contract = new ethers.Contract(contractAddress, meditationCircleABI, new NonceManager(this.wallet))
    this.accountName = accountInfo.accountName
  }

  async startMeditation(heroId, mainStat, subStat1, subStat2) {
    return await this.contract.startMeditation(heroId, this.getStatInt(mainStat), this.getStatInt(subStat1), this.getStatInt(subStat2), autils.get0xAddress(), { gasPrice: await autils.getKLAYGasFee() });
  }

  async completeMeditation(heroId) {
    return await this.contract.completeMeditation(heroId, { gasPrice: await autils.getKLAYGasFee() });
  }

  async getActiveMeditations() {
    return await this.contract.getActiveMeditations(this.wallet.address);
  }

  async getRequiredRunes(level) {
    return await this.contract._getRequiredRunes(level);
  }

  async getActiveMeditations() {
    return await this.contract.getActiveMeditations(this.wallet.address);
  }

  getStatInt(stat) {
    const stats = {
      'STR': 0,
      'AGI': 1,
      'INT': 2,
      'WIS': 3,
      'LCK': 4,
      'VIT': 5,
      'END': 6,
      'DEX': 7
    }

    return stats[stat];
  }
}
