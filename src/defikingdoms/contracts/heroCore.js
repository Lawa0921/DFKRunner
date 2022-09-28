const config = require("~/config.js");
const ethers = require('ethers');
const heroCoreABI = require('~/abis/HeroCore.json')

module.exports = class HeroCore {
  constructor(accountInfo) {
    this.provider = new ethers.providers.JsonRpcProvider(config.defikingdoms.rpcs[config.defikingdoms.useRpcIndex])
    this.wallet = new ethers.Wallet(accountInfo.privateKey, this.provider)
    this.contract = new ethers.Contract(config.defikingdoms.heroCore, heroCoreABI, this.wallet)
    this.accountName = accountInfo.accountName
  }

  async ownerOf(heroId) {
    return await this.contract.ownerOf(heroId)
  }
}
