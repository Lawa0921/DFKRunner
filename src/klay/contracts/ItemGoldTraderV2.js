const config = require("../../../config");
const autils = require('../../services/autils');
const ethers = require('ethers');
const itemGoldTraderV2ABI = require('../../../abis/ItemGoldTraderV2.json')
const contractAddress = "0x3Eab8a8F71dDA3e6c907C74302B734805C4f3278"
const { NonceManager } = require("@ethersproject/experimental")

module.exports = class ItemGoldTraderV2 {
  constructor(accountInfo) {
    this.provider = new ethers.providers.JsonRpcProvider(config.klay.rpcs[config.klay.useRpcIndex])
    this.wallet = new ethers.Wallet(accountInfo.privateKey, this.provider)
    this.contract = new ethers.Contract(contractAddress, itemGoldTraderV2ABI, new NonceManager(this.wallet))
    this.accountName = accountInfo.accountName
  }

  async sellItem(contractAddress, amount) {
    const txn = await this.contract.sellItem(contractAddress, amount, { gasPrice: await autils.getKLAYGasFee() })
    const receipt = await txn.wait()

    if (receipt.status === 1) {
      console.log(`KLAY sell ${amount} ${contractAddress} success`)
    } else {
      console.log(`KLAY sell ${amount} ${contractAddress} failed`)
    }
    return receipt
  }
}
