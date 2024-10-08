const config = require("../../../config");
const autils = require('../../services/autils');
const ethers = require('ethers');
const heroCoreABI = require('../../../abis/HeroCore.json')
const contractAddress = "0x268CC8248FFB72Cd5F3e73A9a20Fa2FF40EfbA61"

module.exports = class HeroCore {
  constructor(accountInfo) {
    this.provider = new ethers.providers.JsonRpcProvider(config.klay.rpcs[config.klay.useRpcIndex])
    this.wallet = new ethers.Wallet(accountInfo.privateKey, this.provider)
    this.contract = new ethers.Contract(contractAddress, heroCoreABI, this.wallet)
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
