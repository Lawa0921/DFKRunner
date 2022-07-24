const config = require("~/config.js");
const autils = require("~/src/services/autils");
const HeroBridgeABI = require('~/abis/HeroBridge.json');
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

const harmonyBridgeFee = 160000000000000000;
const DFKChainId = 53935;

hmy.wallet.addByPrivateKey(config.privateKey);

module.exports = class HeroBridgeContract {
  constructor() {
    this.contract = hmy.contracts.createContract(HeroBridgeABI, config.harmony.heroBridge)
  }

  async sendHero(heroId) {
    let sendValue = {};
    Object.assign(sendValue, autils.gasSettingFormater(), { value: harmonyBridgeFee })

    return await this.contract.methods.sendHero(heroId, DFKChainId).send(sendValue);
  }

  async bridgeHero(heroId) {
    const { transaction } = await this.sendHero(heroId)

    if (transaction.txStatus === "CONFIRMED") {
      console.log(`bridage hero: ${heroId} success`);
    } else {
      console.log(`bridage hero: ${heroId} falied`);
    }

    return transaction;
  }
}
