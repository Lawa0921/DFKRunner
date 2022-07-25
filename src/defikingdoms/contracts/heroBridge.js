const config = require("~/config.js");
const ethers = require('ethers');
const heroBridgeABI = require('~/abis/HeroBridge.json');

const DFKBridgeFee = "40000000000000000";
const HarmonyChainId = 1666600000;

module.exports = class HeroBridgeContract {
  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(config.defikingdoms.rpcs[config.defikingdoms.useRpcIndex])
    this.wallet = new ethers.Wallet(config.privateKey, this.provider)
    this.contract = new ethers.Contract(config.defikingdoms.heroBridge, heroBridgeABI, this.wallet)
  }

  async sendHero(heroId) {
    return await this.contract.sendHero(heroId, HarmonyChainId, { value: DFKBridgeFee });
  }

  async bridgeHero(heroId) {
    const tx = await this.sendHero(heroId)
    const res = await tx.wait();
    if (res.status === 1) {
      console.log(`bridage hero: ${heroId} success`);
    } else {
      console.log(`bridage hero: ${heroId} falied`);
    }

    return res;
  }
}
