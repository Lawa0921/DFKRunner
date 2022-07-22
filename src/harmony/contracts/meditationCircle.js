const config = require("~/config.js");
const autils = require("~/src/services/autils");
const meditationCircleABI = require('~/abis/MeditationCircle.json');
const { Harmony } = require('@harmony-js/core');
const {
    ChainID,
    ChainType,
  } = require('@harmony-js/utils');

const hmy = new Harmony(
  autils.getRpc(config.harmony.useRpcIndex), {
    chainType: ChainType.Harmony,
    chainId: ChainID.HmyMainnet,
  }
);

hmy.wallet.addByPrivateKey(config.privateKey);

module.exports = class MeditationCircle {
  constructor() {
    this.contract = hmy.contracts.createContract(meditationCircleABI, config.harmony.meditationCircle)
  }

  async startMeditation(heroId, mainStat, subStat1, subStat2) {
    return await this.contract.methods.startMeditation(heroId, this.getStatInt(mainStat), this.getStatInt(subStat1), this.getStatInt(subStat2), autils.get0xAddress()).send(autils.gasSettingFormater());
  }

  async completeMeditation(heroId) {
    return await this.contract.methods.completeMeditation(heroId).send(autils.gasSettingFormater());
  }

  async getActiveMeditations() {
    return await this.contract.methods.getActiveMeditations(config.walletAddress).call();
  }

  async getRequiredRunes(level) {
    return await this.contract.methods._getRequiredRunes(level).call();
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
