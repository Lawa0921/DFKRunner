const config = require("../../../config");
const ethers = require('ethers');
const consumableItemABI = require('../../../abis/ConsumableItem.json');
const autils = require('../../services/autils');
const { NonceManager } = require("@ethersproject/experimental")

module.exports = class ConsumableItem {
  constructor(accountInfo, contractAddress) {
    this.provider = new ethers.providers.JsonRpcProvider(config.klay.rpcs[config.klay.useRpcIndex])
    this.wallet = new ethers.Wallet(accountInfo.privateKey, this.provider)
    this.contract = new ethers.Contract(contractAddress, consumableItemABI, new NonceManager(this.wallet))
    this.accountName = accountInfo.accountName
  }

  async balanceOf() {
    return await this.contract.balanceOf(this.wallet.address);
  }

  async allowance(spenderAddress) {
    return await this.contract.allowance(this.wallet.address, spenderAddress)
  }

  async approve(spenderAddress, amount) {
    const txn = await this.contract.approve(spenderAddress, amount, { gasPrice: await autils.getKLAYGasFee() })
    const receipt = await txn.wait()

    if (receipt.status === 1) {
      console.log(`KLAY approve ${spenderAddress} ${amount} success`)
    } else {
      console.log(`KLAY approve ${spenderAddress} ${amount} failed`)
    }

    return receipt
  }
}