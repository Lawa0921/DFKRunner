const config = require("~/config.js");
const ethers = require('ethers');
const InventoryItemABI = require('~/abis/InventoryItem.json');

module.exports = class MokshaRune {
  constructor(accountInfo) {
    this.provider = new ethers.providers.JsonRpcProvider(config.defikingdoms.rpcs[config.defikingdoms.useRpcIndex])
    this.wallet = new ethers.Wallet(accountInfo.privateKey, this.provider)
    this.contract = new ethers.Contract(config.defikingdoms.mokshaRune, InventoryItemABI, this.wallet)
    this.accountName = accountInfo.accountName
  }

  async balanceOf() {
    return await this.contract.balanceOf(this.wallet.address);
  }
}
