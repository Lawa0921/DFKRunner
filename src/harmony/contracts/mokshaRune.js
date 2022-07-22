const config = require("~/config.js");
const autils = require("~/src/services/autils");
const InventoryItemABI = require('~/abis/InventoryItem.json');
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

module.exports = class MokshaRune {
  constructor() {
    this.contract = hmy.contracts.createContract(InventoryItemABI, config.harmony.mokshaRune)
  }

  async balanceOf() {
    return await this.contract.methods.balanceOf(config.walletAddress).call();
  }
}
