const config = require("../../../config");
const autils = require('../../services/autils');
const ethers = require('ethers');
const contractAddress = "0x0f85fdf6c561C42d6b46d0E27ea6Aa9Bf9476B3f"
const itemGoldTraderV2ABI = require('../../../abis/ItemGoldTraderV2.json')
const { NonceManager } = require("@ethersproject/experimental")

module.exports = class ItemGoldTraderV2 {
  constructor(accountInfo) {
    this.provider = new ethers.providers.JsonRpcProvider(config.defikingdoms.rpcs[config.defikingdoms.useRpcIndex])
    this.wallet = new ethers.Wallet(accountInfo.privateKey, this.provider)
    this.contract = new ethers.Contract(contractAddress, itemGoldTraderV2ABI, new NonceManager(this.wallet))
    this.accountName = accountInfo.accountName
  }

  async sellItem(contractAddress, amount) {
    const txn = await this.contract.sellItem(contractAddress, amount, { gasPrice: await autils.getDFKGasFee() })
    const receipt = await txn.wait()

    if (receipt.status === 1) {
      console.log(`sell ${amount} ${contractAddress} success`)
    } else {
      console.log(`sell ${amount} ${contractAddress} failed`)
    }
    return receipt
  }
}
