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
    return await this.contract.cancelAuction(heroId, { gasPrice: config.defikingdoms.gasPrice })
  }

  async createAuction(heroId, price) {
    return await this.contract.createAuction(heroId, autils.ethersFormatNumberToWei(price), autils.ethersFormatNumberToWei(price), 60, autils.get0xAddress(), { gasPrice: config.defikingdoms.gasPrice });
  }

  async isOnAuction(heroId) {
    return this.contract.isOnAuction(heroId);
  }

  async bid(heroId, price) {
    return this.contract.bid(heroId, price, { gasLimit: 3000000, gasPrice: 4000000000000 });
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
      console.log(`unlisting hero: ${id} completed`);
    } else {
      autils.txnFailLog(`unlist hero: ${id} failed`);
    }

    return res;
  }

  async unrentHero(heroId) {
    let rawTxnData = "0x96b5a755" + autils.intToInput(heroId)

    console.log(`unrenting hero: ${heroId}`);

    const txnData = {
      to: "0x8101CfFBec8E045c3FAdC3877a1D30f97d301209", 
      gasLimit: 100000,
      gasPrice: config.defikingdoms.gasPrice,
      chainId: 53935,
      data: rawTxnData,
    }

    const sendTxn = await this.wallet.sendTransaction(txnData);
    const res = await sendTxn.wait();

    if (res.status === 1) {
      console.log(`unrent hero: ${heroId} completed`);
    } else {
      autils.txnFailLog(`unrent hero: ${heroId} failed`);
    }

    return res;
  }

  async rentHero(heroId, price) {
    let rawTxnData = "0x4ee42914" + autils.intToInput(heroId) + autils.intToInput(autils.ethersFormatNumberToWei(price)) + autils.intToInput(autils.ethersFormatNumberToWei(price)) + autils.intToInput(60) + "0000000000000000000000000000000000000000000000000000000000000000"

    console.log(`renting hero: ${heroId}`);

    const txnData = {
      to: "0x8101CfFBec8E045c3FAdC3877a1D30f97d301209", 
      gasLimit: 300000,
      gasPrice: config.defikingdoms.gasPrice,
      chainId: 53935,
      data: rawTxnData,
    }

    const sendTxn = await this.wallet.sendTransaction(txnData);
    const res = await sendTxn.wait();

    if (res.status === 1) {
      console.log(`rent hero: ${heroId} ${price} C completed`);
    } else {
      autils.txnFailLog(`rent hero: ${heroId} ${price} C failed`);
    }

    return res;
  }

  async buyHero(heroId) {
    const id = parseInt(heroId, 10);
    const heroesData = await autils.getHerosInfo([id])

    const tx = await this.bid(id, heroesData[0].salePrice);
    const res = await tx.wait();

    if (res.status === 1) {
      console.log(`buy hero: ${id} use ${parseInt(heroesData[0].salePrice) / Math.pow(10, 18)} C completed`);
    } else {
      console.log(`buy hero: ${id} use ${parseInt(heroesData[0].salePrice) / Math.pow(10, 18)} C failed`);
    }

    return res;
  }
}
