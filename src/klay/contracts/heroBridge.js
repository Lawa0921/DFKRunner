const config = require("../../../config");
const ethers = require('ethers');
const heroBridgeABI = require('../../../abis/HeroBridge.json');
const contractAddress = "0xEE258eF5F4338B37E9BA9dE6a56382AdB32056E2"
const { NonceManager } = require("@ethersproject/experimental")

const KLAYToDFKBridgeFee = "1440000000000000";
const DFKChainId = 53935;

module.exports = class HeroBridgeContract {
  constructor(accountInfo) {
    this.provider = new ethers.providers.JsonRpcProvider(config.klay.rpcs[config.klay.useRpcIndex])
    this.wallet = new ethers.Wallet(accountInfo.privateKey, this.provider)
    this.contract = new ethers.Contract(contractAddress, heroBridgeABI, new NonceManager(this.wallet))
    this.accountName = accountInfo.accountName
  }

  async sendHero(heroId) {
    return await this.contract.sendHero(heroId, DFKChainId, { value: KLAYToDFKBridgeFee });
  }

  async bridgeHero(heroId) {
    console.log(`${this.accountName} KLAY bridage hero: ${heroId}`)

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
