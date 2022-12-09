const config = require("~/config.js");
const ethers = require('ethers');
const assistingAuctionUpgradeableABI = require('~/abis/AssistingAuctionUpgradeable.json');
const autils = require('~/src/services/autils');
const { NonceManager } = require("@ethersproject/experimental")

module.exports = class AssistingAuctionUpgradeable {
  constructor(accountInfo) {
    this.provider = new ethers.providers.JsonRpcProvider(config.klay.rpcs[config.klay.useRpcIndex])
    this.wallet = new ethers.Wallet(accountInfo.privateKey, this.provider)
    this.contract = new ethers.Contract(config.klay.assistingAuctionUpgradable, assistingAuctionUpgradeableABI, new NonceManager(this.wallet))
    this.accountName = accountInfo.accountName
  }

  async cancelAuction(heroId) {
    return await this.contract.cancelAuction(heroId, { gasPrice: await autils.getKLAYGasFee() })
  }

  async createAuction(heroId, price) {
    return await this.contract.createAuction(heroId, autils.ethersFormatNumberToWei(price), autils.ethersFormatNumberToWei(price), 60, autils.get0xAddress(), { gasPrice: await autils.getKLAYGasFee() });
  }

  async listHero(heroId, price) {
    const id = parseInt(heroId, 10);
    console.log(`${this.accountName} KLAY renting hero: ${id}: ${price} Jade`);
  
    const tx = await this.createAuction(id, price)
    const res = await tx.wait();

    if (res.status === 1) {
      console.log(`${this.accountName} KLAY rented hero: ${id} completed`);
    } else {
      console.log(`${this.accountName} KLAY rented hero: ${id} failed`);
    }

    return res;
  }

  async unlistHero(heroId) {
    const id = parseInt(heroId, 10);
    console.log(`${this.accountName} KLAY unrenting hero: ${id}`);

    const tx = await this.cancelAuction(id);
    const res = await tx.wait();
    if (res.status === 1) {
      console.log(`${this.accountName} KLAY unrented hero: ${id} completed`);
    } else {
      console.log(`${this.accountName} KLAY unrented hero: ${id} failed`);
    }

    return res;
  }
}
