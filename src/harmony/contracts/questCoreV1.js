const config = require("~/config.js");
const autils = require('~/src/services/autils');
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

  async startGoldMining(heroIds) {
    let rawTxnData = "0xc855dea3" + 
      "0000000000000000000000000000000000000000000000000000000000000060" +
      "000000000000000000000000569e6a4c2e3af31b337be00657b4c040c828dd73" +
      autils.intToInput(1) +
      autils.intToInput(heroIds.length)

    heroIds.forEach((heroId) => {
      rawTxnData += autils.intToInput(heroId)
    })

    const txn = hmy.transactions.newTx({
      to: config.harmony.questCoreV1,
      value: 0,
      gasLimit: config.harmony.gasLimit,
      shardID: 0,
      toShardID: 0,
      gasPrice: config.harmony.gasPrice,
      data: rawTxnData
    })

    const signedTxn = await hmy.wallet.signTransaction(txn);
    const txnHash = await hmy.blockchain.createObservedTransaction(signedTxn).promise;

    if (txnHash.txStatus === 'CONFIRMED') {
      console.log(`Sent ${heroIds} gold mining quest success`)
    } else {
      console.log(`Sent ${heroIds} gold mining quest failed`)
    } 
  }

  async startJewelMining (heroIds) {
    let rawTxnData = "0xc855dea3" +
      "0000000000000000000000000000000000000000000000000000000000000060" +
      "0000000000000000000000006ff019415ee105acf2ac52483a33f5b43eadb8d0" +
      autils.intToInput(1) +
      autils.intToInput(heroIds.length)

    heroIds.forEach((heroId) => {
      rawTxnData += autils.intToInput(heroId)
    })

    const txn = hmy.transactions.newTx({
      to: config.harmony.questCoreV1,
      value: 0,
      gasLimit: config.harmony.gasLimit,
      shardID: 0,
      toShardID: 0,
      gasPrice: config.harmony.gasPrice,
      data: rawTxnData
    })

    const signedTxn = await hmy.wallet.signTransaction(txn);
    const txnHash = await hmy.blockchain.createObservedTransaction(signedTxn).promise;

    if (txnHash.txStatus === 'CONFIRMED') {
      console.log(`Sent ${heroIds} jewel mining quest success`)
    } else {
      console.log(`Sent ${heroIds} jewel mining quest failed`)
    } 
  }
}
