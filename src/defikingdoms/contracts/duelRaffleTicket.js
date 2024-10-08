const config = require("../../../config");
const autils = require('../../services/autils');
const ethers = require('ethers');
const DuelRaffleTicketABI = require('../../../abis/DuelRaffleTicket.json');
const contractAddress = "0xBbd7c4Be2e54fF5e013471162e1ABAD7AB74c3C3"
const { NonceManager } = require("@ethersproject/experimental")

module.exports = class DuelRaffleTicket {
  constructor(accountInfo) {
    this.provider = new ethers.providers.JsonRpcProvider(config.defikingdoms.rpcs[config.defikingdoms.useRpcIndex])
    this.wallet = new ethers.Wallet(accountInfo.privateKey, this.provider)
    this.contract = new ethers.Contract(contractAddress, DuelRaffleTicketABI, new NonceManager(this.wallet))
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
    return await this.contract.balanceOf(this.wallet.address).then(res => parseInt(res))
  }

  async name() {
    return await this.contract.name()
  }
}
