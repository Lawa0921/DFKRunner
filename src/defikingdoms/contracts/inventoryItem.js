const config = require("../../../config");
const autils = require('../../services/autils');
const ethers = require('ethers');
const InventoryItemABI = require('../../../abis/InventoryItem.json');
const { NonceManager } = require("@ethersproject/experimental")

module.exports = class InventoryItem {
  constructor(accountInfo, contractAddress) {
    this.provider = new ethers.providers.JsonRpcProvider(config.defikingdoms.rpcs[config.defikingdoms.useRpcIndex])
    this.wallet = new ethers.Wallet(accountInfo.privateKey, this.provider)
    this.contract = new ethers.Contract(contractAddress, InventoryItemABI, new NonceManager(this.wallet))
    this.accountName = accountInfo.accountName
  }

  async allowance(spenderAddress) {
    return await this.contract.allowance(this.wallet.address, spenderAddress)
  }

  async approve(spenderAddress, amount) {
    const txn = await this.contract.approve(spenderAddress, amount, { gasPrice: await autils.getDFKGasFee() })
    const receipt = await txn.wait()

    if (receipt.status === 1) {
      console.log(`approve ${spenderAddress} ${amount} success`)
    } else {
      console.log(`approve ${spenderAddress} ${amount} failed`)
    }

    return receipt
  }

  async balanceOf() {
    return await this.contract.balanceOf(this.wallet.address)
  }

  async name() {
    return await this.contract.name()
  }
}
