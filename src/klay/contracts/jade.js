const config = require("../../../config");
const autils = require('../../services/autils');
const ethers = require('ethers');
const ICrystalABI = require('../../../abis/ICrystalToken.json');
const contractAddress = "0xB3F5867E277798b50ba7A71C0b24FDcA03045eDF"
const { NonceManager } = require("@ethersproject/experimental")

module.exports = class Jade {
  constructor(accountInfo) {
    this.provider = new ethers.providers.JsonRpcProvider(config.klay.rpcs[config.klay.useRpcIndex])
    this.wallet = new ethers.Wallet(accountInfo.privateKey, this.provider)
    this.contract = new ethers.Contract(contractAddress, ICrystalABI, new NonceManager(this.wallet))
    this.accountName = accountInfo.accountName
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

  async balanceOf() {
    return await this.contract.balanceOf(this.wallet.address)
  }

  async name() {
    return await this.contract.name()
  }
}
