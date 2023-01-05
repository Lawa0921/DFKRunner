const config = require("~/config.js");
const autils = require('~/src/services/autils');
const ethers = require('ethers');
const DuelRaffleTicketABI = require('~/abis/DuelRaffleTicket.json');
const { NonceManager } = require("@ethersproject/experimental")

module.exports = class DuelRaffleTicket {
  constructor(accountInfo) {
    this.provider = new ethers.providers.JsonRpcProvider(config.klay.rpcs[config.klay.useRpcIndex])
    this.wallet = new ethers.Wallet(accountInfo.privateKey, this.provider)
    this.contract = new ethers.Contract(config.klay.duelRaffleTicket, DuelRaffleTicketABI, new NonceManager(this.wallet))
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
