const config = require("~/config.js");
const ethers = require('ethers');
const heroCoreABI = require('~/abis/HeroCore.json')

module.exports = class HeroCore {
  constructor(network) {
    this.network = network

    if (network === "dfk") {
      this.provider = new ethers.providers.JsonRpcProvider(config.defikingdoms.rpcs[config.defikingdoms.useRpcIndex])
      this.wallet = new ethers.Wallet(config.privateKey, this.provider)
      this.contract = new ethers.Contract(config.defikingdoms.heroCore, heroCoreABI, this.wallet)
    } else if (network === "harmony") {
      // to do
    }
  }

  async ownerOf(heroId) {
    return await this.contract.ownerOf(heroId)
  }
}
