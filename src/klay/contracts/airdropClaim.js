const config = require("~/config.js");
const autils = require('~/src/services/autils');
const ethers = require('ethers');
const airdropClaimABI = require('~/abis/AirdropClaim.json')

module.exports = class AirdropClaim {
  constructor(accountInfo) {
    this.provider = new ethers.providers.JsonRpcProvider(config.klay.rpcs[config.klay.useRpcIndex])
    this.wallet = new ethers.Wallet(accountInfo.privateKey, this.provider)
    this.contract = new ethers.Contract(config.klay.airdropClaim, airdropClaimABI, this.wallet)
    this.accountName = accountInfo.accountName
  }

  async viewAirdrops() {
    const rawData = await this.contract.viewAirdrops()
    const airdropData = rawData.map((data, index) => {
      return {
        id: index,
        tokenAddress: data.tokenAddress,
        amount: parseInt(data.amount),
        time: data.time.toString(),
        node: data.note,
      }
    })

    return airdropData
  }

  async claimAirdrop(dropId) {
    const txn = await this.contract.claimAirdrop(dropId, { gasPrice: await autils.getKLAYGasFee() })
    const res = await txn.wait();

    if (res.status === 1) {
      console.log(`KLAY claim ${dropId} airdrop success`)
    } else {
      console.log(`KLAY claim ${dropId} airdrop failed`)
    }

    return res;
  }
}
