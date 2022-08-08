const config = require("~/config.js");
const autils = require("~/src/services/autils");
const ConsumableItemABI = require('~/abis/ConsumableItem.json');
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

module.exports = class StaminaVial {
  constructor() {
    this.contract = hmy.contracts.createContract(ConsumableItemABI, config.harmony.staminaVial)
  }

  async balanceOf() {
    return await this.contract.methods.balanceOf(config.walletAddress).call();
  }

  async consumeItem(heroId){
    let rawTxnData = "0x106f46e4000000000000000000000000959ba19508827d1ed2333b1b503bd5ab006c710e"
    rawTxnData += autils.intToInput(heroId)

    const txn = hmy.transactions.newTx({
      to: "one18rnkju4azuusrd09usa6tj6xg2fmsrp3c28mwt",
      value: 0,
      gasLimit: config.harmony.gasLimit,
      shardID: 0,
      toShardID: 0,
      gasPrice: config.harmony.gasPrice,
      data: rawTxnData
    });

    const signedTxn = await hmy.wallet.signTransaction(txn);
    const txnHash = await hmy.blockchain.createObservedTransaction(signedTxn).promise;

    if (txnHash.txStatus === 'CONFIRMED') {
      console.log(heroId + " already used stamina vial.")
    } else {
      console.log(heroId + " use stamina vial failed.")
    } 
  }
}
