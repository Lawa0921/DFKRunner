const config = require("~/config.js");
const ethers = require('ethers');
const consumableItemABI = require('~/abis/consumableItem.json');
const autils = require('~/src/services/autils');
const { NonceManager } = require("@ethersproject/experimental")

module.exports = class ConsumableItem {
  constructor(accountInfo, contractAddress) {
    this.provider = new ethers.providers.JsonRpcProvider(config.defikingdoms.rpcs[config.defikingdoms.useRpcIndex])
    this.wallet = new ethers.Wallet(accountInfo.privateKey, this.provider)
    this.contract = new ethers.Contract(contractAddress, consumableItemABI, new NonceManager(this.wallet))
    this.accountName = accountInfo.accountName
  }
  async balanceOf() {
    return await this.contract.balanceOf(this.wallet.address);
  }
}