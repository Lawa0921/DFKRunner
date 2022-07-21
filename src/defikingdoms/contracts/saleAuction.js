const config = require("~/config.js");
const ethers = require('ethers');
const saleAuctionABI = require('~/abis/SaleAuction.json');
const autils = require('~/src/services/autils');

module.exports = class SaleAuction {
  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(config.defikingdoms.rpcs[config.defikingdoms.useRpcIndex])
    this.wallet = new ethers.Wallet(config.privateKey, this.provider)
    this.contract = new ethers.Contract(config.defikingdoms.saleAuction, saleAuctionABI, this.wallet)
  }

  async cancelAuction(heroId) {
    return await this.contract.cancelAuction(heroId)
  }

  async createAuction(heroId, price) {
    return await this.contract.createAuction(heroId, autils.formatPrice(price), autils.formatPrice(price), 60, "0x0000000000000000000000000000000000000000")
  }

  async isOnAuction(heroId) {
    return this.contract.isOnAuction(heroId);
  }

  async bid(heroId, price) {
    return this.contract.bid(heroId, price);
  }

  async listHero(heroId, price) {
    const id = parseInt(heroId, 10);
    console.log(`listing hero: ${id}: ${price}`);
  
    const tx = await this.createAuction(id, price)
    const res = await tx.wait();
    if (res.status === 1) {
      console.log(`listing hero: ${id} completed`);
    } else {
      autils.txnFailLog(`list hero: ${id} failed`);
    }

    return res;
  }

  async unlistHero(heroId) {
    const id = parseInt(heroId, 10);
    console.log(`unlisting hero: ${id}`);

    const tx = await this.cancelAuction(id);
    const res = await tx.wait();
    if (res.status === 1) {
      console.log(`unlisting hero: ${id} completeed`);
    } else {
      autils.txnFailLog(`unlist hero: ${id} failed`);
    }

    return res;
  }

  async buyHero(heroId) {
    const id = parseInt(heroId, 10);
    const heroesData = await autils.getHerosInfo([id])

    const tx = await this.bid(id, heroesData[0].salePrice);
    const res = await tx.wait();

    if (res.status === 1) {
      console.log(`buy hero: ${id} use ${parseInt(heroesData[0].salePrice) / Math.pow(10, 18)} J completed`);
    } else {
      console.log(`buy hero: ${id} use ${parseInt(heroesData[0].salePrice) / Math.pow(10, 18)} J failed`);
    }

    return res;
  }
}
