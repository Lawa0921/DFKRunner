const config = require("../../../config");
const ethers = require('ethers');
const saleAuctionABI = require('~/abis/SaleAuction.json');
const autils = require('~/src/services/autils');
const { NonceManager } = require("@ethersproject/experimental")

module.exports = class SaleAuction {
  constructor(accountInfo) {
    this.provider = new ethers.providers.JsonRpcProvider(config.klay.rpcs[config.klay.useRpcIndex])
    this.wallet = new ethers.Wallet(accountInfo.privateKey, this.provider)
    this.contract = new ethers.Contract(config.klay.saleAuction, saleAuctionABI, new NonceManager(this.wallet))
    this.accountName = accountInfo.accountName
  }

  async cancelAuction(heroId) {
    return await this.contract.cancelAuction(heroId, { gasPrice: await autils.getKLAYGasFee() })
  }

  async createAuction(heroId, price) {
    return await this.contract.createAuction(heroId, autils.ethersFormatNumberToWei(price), autils.ethersFormatNumberToWei(price), 60, autils.get0xAddress(), { gasPrice: await autils.getKLAYGasFee() });
  }

  async isOnAuction(heroId) {
    return this.contract.isOnAuction(heroId);
  }

  async bid(heroId, price) {
    return this.contract.bid(heroId, price, { gasPrice: await autils.getKLAYGasFee() });
  }

  async listHero(heroId, price) {
    const id = parseInt(heroId, 10);
    console.log(`${this.accountName} KLAY listing hero: ${id}: ${price} Jade`);
  
    const tx = await this.createAuction(id, price)
    const res = await tx.wait();

    if (res.status === 1) {
      console.log(`${this.accountName} KLAY listing hero: ${id} completed`);
    } else {
      console.log(`${this.accountName} KLAY list hero: ${id} failed`);
    }

    return res;
  }

  async unlistHero(heroId) {
    const id = parseInt(heroId, 10);
    console.log(`${this.accountName} KLAY unlisting hero: ${id}`);

    const tx = await this.cancelAuction(id);
    const res = await tx.wait();
    if (res.status === 1) {
      console.log(`${this.accountName} KLAY unlisting hero: ${id} completed`);
    } else {
      console.log(`${this.accountName} KLAY unlist hero: ${id} failed`);
    }

    return res;
  }

  async buyHero(heroId) {
    const id = parseInt(heroId, 10);
    const heroesData = await autils.getHeroesInfoByIds([id])

    const tx = await this.bid(id, heroesData[0].salePrice);
    const res = await tx.wait();

    if (res.status === 1) {
      console.log(`${this.accountName} buy hero: ${id} use ${parseInt(heroesData[0].salePrice) / Math.pow(10, 18)} C completed`);
    } else {
      console.log(`${this.accountName} buy hero: ${id} use ${parseInt(heroesData[0].salePrice) / Math.pow(10, 18)} C failed`);
    }

    return res;
  }
}
