const config = require("../../../config");
const ethers = require('ethers');
const itemConsumerABI = require('../../../abis/ItemConsumer.json');
const autils = require('../../services/autils');
const contractAddress = "0xc9A9F352Aa188f422A8f8902B547FB3E59D37210"
const { NonceManager } = require("@ethersproject/experimental")

module.exports = class ItemConsumer {
  constructor(accountInfo) {
    this.provider = new ethers.providers.JsonRpcProvider(config.defikingdoms.rpcs[config.defikingdoms.useRpcIndex])
    this.wallet = new ethers.Wallet(accountInfo.privateKey, this.provider)
    this.contract = new ethers.Contract(contractAddress, itemConsumerABI, new NonceManager(this.wallet))
    this.accountName = accountInfo.accountName
  }

  async consumeItem(itemAddress ,heroId) {
    const txn = await this.contract.consumeItem(itemAddress, heroId, { gasPrice: await autils.getDFKGasFee() })
    const receipt = await txn.wait()

    if (receipt.status === 1) {
      console.log(`${heroId} use ${itemAddress} vial success`)
    } else {
      console.log(`${heroId} use ${itemAddress} vial failed`)
    }
    return receipt
  }
}