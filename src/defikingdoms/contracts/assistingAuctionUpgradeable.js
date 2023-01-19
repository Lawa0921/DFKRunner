const config = require("../../../config");
const ethers = require('ethers');
const assistingAuctionUpgradeableABI = require('~/abis/AssistingAuctionUpgradeable.json');
const autils = require('../../services/autils');
const { NonceManager } = require("@ethersproject/experimental")

module.exports = class AssistingAuctionUpgradeable {
  constructor(accountInfo) {
    this.provider = new ethers.providers.JsonRpcProvider(config.defikingdoms.rpcs[config.defikingdoms.useRpcIndex])
    this.wallet = new ethers.Wallet(accountInfo.privateKey, this.provider)
    this.contract = new ethers.Contract(config.defikingdoms.assistingAuctionUpgradable, assistingAuctionUpgradeableABI, new NonceManager(this.wallet))
    this.accountName = accountInfo.accountName
  }

  async cancelAuction(heroId) {
    return await this.contract.cancelAuction(heroId, { gasPrice: await autils.getDFKGasFee() })
  }

  async createAuction(heroId, price) {
    return await this.contract.createAuction(heroId, autils.ethersFormatNumberToWei(price), autils.ethersFormatNumberToWei(price), 60, autils.get0xAddress(), { gasPrice: await autils.getDFKGasFee() });
  }

  async listHero(heroId, price) {
    const id = parseInt(heroId, 10);
    console.log(`${this.accountName} DFK renting hero: ${id}: ${price} C`);
  
    const tx = await this.createAuction(id, price)
    const res = await tx.wait();

    if (res.status === 1) {
      console.log(`${this.accountName} DFK rented hero: ${id} completed`);
    } else {
      console.log(`${this.accountName} DFK rented hero: ${id} failed`);
    }

    return res;
  }

  async unlistHero(heroId) {
    const id = parseInt(heroId, 10);
    console.log(`${this.accountName} DFK unrenting hero: ${id}`);

    const tx = await this.cancelAuction(id);
    const res = await tx.wait();
    if (res.status === 1) {
      console.log(`${this.accountName} DFK unrented hero: ${id} completed`);
    } else {
      console.log(`${this.accountName} DFK unrented hero: ${id} failed`);
    }

    return res;
  }
}
