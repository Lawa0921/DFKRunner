const config = require("../../../config");
const ethers = require('ethers');
const itemConsumerABI = require('~/abis/ItemConsumer.json');
const autils = require('../../services/autils');
const { NonceManager } = require("@ethersproject/experimental")

module.exports = class ItemConsumer {
  constructor(accountInfo) {
    this.provider = new ethers.providers.JsonRpcProvider(config.klay.rpcs[config.klay.useRpcIndex])
    this.wallet = new ethers.Wallet(accountInfo.privateKey, this.provider)
    this.contract = new ethers.Contract(config.klay.itemConsumer, itemConsumerABI, new NonceManager(this.wallet))
    this.accountName = accountInfo.accountName
  }

  async consumeItem(itemAddress ,heroId) {
    const txn = await this.contract.consumeItem(itemAddress, heroId, { gasPrice: await autils.getKLAYGasFee() })
    const receipt = await txn.wait()

    if (receipt.status === 1) {
      console.log(`KLAY ${heroId} use ${itemAddress} vial success`)
    } else {
      console.log(`KLAY ${heroId} use ${itemAddress} vial failed`)
    }
    return receipt
  }
}