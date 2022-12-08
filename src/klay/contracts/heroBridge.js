const config = require("~/config.js");
const ethers = require('ethers');
const heroBridgeABI = require('~/abis/HeroBridge.json');
const { NonceManager } = require("@ethersproject/experimental")

const KLAYBridgeFee = "?????";
const DFKChainId = 53935;

module.exports = class HeroBridgeContract {
  constructor(accountInfo) {
    this.provider = new ethers.providers.JsonRpcProvider(config.klay.rpcs[config.klay.useRpcIndex])
    this.wallet = new ethers.Wallet(accountInfo.privateKey, this.provider)
    this.contract = new ethers.Contract(config.klay.heroBridge, heroBridgeABI, new NonceManager(this.wallet))
    this.accountName = accountInfo.accountName
  }

  async sendHero(heroId) {
    return await this.contract.sendHero(heroId, DFKChainId, { value: KLAYBridgeFee });
  }

  async bridgeHero(heroId) {
    const tx = await this.sendHero(heroId)
    const res = await tx.wait();
    if (res.status === 1) {
      console.log(`${this.accountName} KLAY bridage hero: ${heroId} success`);
    } else {
      console.log(`${this.accountName} KLAY hero: ${heroId} falied`);
    }

    return res;
  }
}
