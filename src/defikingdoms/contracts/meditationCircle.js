const config = require("~/config.js");
const ethers = require('ethers');
const meditationCircleABI = require('~/abis/MeditationCircle.json')

module.exports = class MeditationCircle {
  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(config.defikingdoms.rpcs[config.defikingdoms.useRpcIndex])
    this.wallet = new ethers.Wallet(config.privateKey, this.provider)
    this.contract = new ethers.Contract(config.defikingdoms.meditationCircle, meditationCircleABI, this.wallet)
  }

  async startMeditation(heroId, mainStat, subStat1, subStat2) {
    return await this.contract.startMeditation(heroId, this.getStatInt(mainStat), this.getStatInt(subStat1), this.getStatInt(subStat2), autils.get0xAddress());
  }

  async completeMeditation(heroId) {
    return await this.contract.completeMeditation(heroId);
  }

  async getActiveMeditations() {
    return await this.contract.getActiveMeditations(config.walletAddress);
  }

  async getRequiredRunes(level) {
    return await this.contract._getRequiredRunes(level);
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
