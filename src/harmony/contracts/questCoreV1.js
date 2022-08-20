const config = require("~/config.js");
const questCoreV1ABI = require('~/abis/QuestCoreV1.json')
const { Harmony } = require('@harmony-js/core');
const {
    ChainID,
    ChainType,
  } = require('@harmony-js/utils');

const hmy = new Harmony(
  config.harmony.rpcs[config.harmony.useRpcIndex], {
    chainType: ChainType.Harmony,
    chainId: ChainID.HmyMainnet,
  }
);

hmy.wallet.addByPrivateKey(config.privateKey);

module.exports = class QuestCoreV1 {
  constructor() {
    this.contract = hmy.contracts.createContract(questCoreV1ABI, config.harmony.questCoreV1);
  }

  async getActiveQuests() {
    return await this.contract.methods.getActiveQuests(config.walletAddress).call()
  }

  async getCurrentStamina(heroId) {
    return await this.contract.methods.getCurrentStamina(heroId).call();
  }
}
