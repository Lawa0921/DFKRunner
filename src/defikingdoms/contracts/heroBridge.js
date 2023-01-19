const config = require("../../../config");
const ethers = require('ethers');
const heroBridgeABI = require('~/abis/HeroBridge.json');
const { NonceManager } = require("@ethersproject/experimental")

const DFKToKLAYBridgeFee = "24000000000000000";
const KlayChainId = 8217;

module.exports = class HeroBridgeContract {
  constructor(accountInfo) {
    this.provider = new ethers.providers.JsonRpcProvider(config.defikingdoms.rpcs[config.defikingdoms.useRpcIndex])
    this.wallet = new ethers.Wallet(accountInfo.privateKey, this.provider)
    this.contract = new ethers.Contract(config.defikingdoms.heroBridge, heroBridgeABI, new NonceManager(this.wallet))
    this.accountName = accountInfo.accountName
  }

  async sendHero(heroId) {
    return await this.contract.sendHero(heroId, KlayChainId, { value: DFKToKLAYBridgeFee });
  }

  async bridgeHero(heroId) {
    console.log(`${this.accountName} DFK bridage hero: ${heroId}`)

    const tx = await this.sendHero(heroId)
    const res = await tx.wait();
    if (res.status === 1) {
      console.log(`${this.accountName} DFK bridage hero: ${heroId} success`);
    } else {
      console.log(`${this.accountName} DFK bridage hero: ${heroId} falied`);
    }

    return res;
  }
}
