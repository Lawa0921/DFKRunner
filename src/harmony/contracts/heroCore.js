const config = require("~/config.js");
const autils = require("~/src/services/autils");
const heroCoreABI = require('~/abis/HeroCore.json');
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

module.exports = class HeroCoreContract {
  constructor() {
    this.contract = hmy.contracts.createContract(heroCoreABI, config.harmony.heroCore)
  }

  async ownerOf(heroId) {
    return await this.contract.methods.ownerOf(heroId).call();
  }
}
