const config = require("../../../config");
const autils = require('~/src/services/autils');
const ethers = require('ethers');
const heroCoreABI = require('~/abis/HeroCore.json')

module.exports = class HeroCore {
  constructor(accountInfo) {
    this.provider = new ethers.providers.JsonRpcProvider(config.klay.rpcs[config.klay.useRpcIndex])
    this.wallet = new ethers.Wallet(accountInfo.privateKey, this.provider)
    this.contract = new ethers.Contract(config.klay.heroCore, heroCoreABI, this.wallet)
    this.accountName = accountInfo.accountName
  }

  async ownerOf(heroId) {
    return await this.contract.ownerOf(heroId)
  }

  async transferFrom(to, heroId) {
    const txn = await this.contract.transferFrom(this.wallet.address, to, heroId, { gasPrice: await autils.getKLAYGasFee() })
    const res = await txn.wait();
    if (res.status === 1) {
      console.log(`KLAY ${heroId} send to ${to} success`)
    } else {
      console.log(`KLAY ${heroId} send to ${to} failed`)
    }

    return res;
  }
}
