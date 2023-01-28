const config = require("../../../config");
const autils = require('../../services/autils');
const ethers = require('ethers');
const airdropClaimABI = require('../../../abis/AirdropClaim.json')
const contractAddress = "0x947873092dc57C1A70704033c41cB110f4462a8B"

module.exports = class AirdropClaim {
  constructor(accountInfo) {
    this.provider = new ethers.providers.JsonRpcProvider(config.defikingdoms.rpcs[config.defikingdoms.useRpcIndex])
    this.wallet = new ethers.Wallet(accountInfo.privateKey, this.provider)
    this.contract = new ethers.Contract(contractAddress, airdropClaimABI, this.wallet)
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
    const txn = await this.contract.claimAirdrop(dropId, { gasPrice: await autils.getDFKGasFee() })
    const res = await txn.wait();

    if (res.status === 1) {
      console.log(`claim ${dropId} airdrop success`)
    } else {
      console.log(`claim ${dropId} airdrop failed`)
    }

    return res;
  }
}
