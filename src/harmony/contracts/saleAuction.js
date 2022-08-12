const config = require("~/config.js");
const autils = require("~/src/services/autils");
const saleAuctionABI = require('~/abis/SaleAuction.json');
const { Harmony } = require('@harmony-js/core');
const {
    ChainID,
    ChainType,
  } = require('@harmony-js/utils');

const hmy = new Harmony(
  autils.getRpc(config.harmony.useRpcIndex), {
    chainType: ChainType.Harmony,
    chainId: ChainID.HmyMainnet,
  }
);

hmy.wallet.addByPrivateKey(config.privateKey);

module.exports = class HeroBridgeContract {
  constructor() {
    this.contract = hmy.contracts.createContract(saleAuctionABI, config.harmony.saleAuction)
  }

  async cancelAuction(heroId) {
    return await this.contract.methods.cancelAuction(heroId).send(autils.gasSettingFormater());
  }

  async createAuction(heroId, price) {
    return await this.contract.methods.createAuction(heroId, autils.formatPrice(price), autils.formatPrice(price), 60, autils.get0xAddress()).send(autils.gasSettingFormater());
  }

  async isOnAuction(heroId) {
    return this.contract.methods.isOnAuction(heroId).call();
  }

  async bid(heroId, price) {
    return this.contract.methods.bid(heroId, price).send(autils.gasSettingFormater());
  }

  async rentHero(heroId, price) {
    let rawTxnData = "0x4ee42914" + autils.intToInput(heroId) + autils.intToInput(autils.formatPrice(price)) + autils.intToInput(autils.formatPrice(price)) + autils.intToInput(60) + "0000000000000000000000000000000000000000000000000000000000000000"

    const txn = hmy.transactions.newTx({
      to: "one1vh02j0mm3pkr8fuvzq6rye7a89e8w7xzvel70f",
      value: 0,
      gasLimit: config.harmony.gasLimit,
      shardID: 0,
      toShardID: 0,
      gasPrice: config.harmony.gasPrice,
      data: rawTxnData
    });

    const signedTxn = await hmy.wallet.signTransaction(txn);
    const txnHash = await hmy.blockchain.createObservedTransaction(signedTxn).promise;

    if (txnHash.txStatus === 'CONFIRMED') {
      console.log(`rent ${heroId} ${price} J success`)
    } else {
      console.log(`rent ${heroId} ${price} J failed`)
    } 
  }

  async listHero(heroId, price) {
    const id = parseInt(heroId, 10);
    console.log(`listing hero: ${id}: ${price}`);
  
    const { transaction } = await this.createAuction(id, price);

    if (transaction.txStatus === "CONFIRMED") {
      console.log(`listing hero: ${id} completed`);
    } else {
      console.log(`list hero: ${id} failed`);
    }

    return transaction;
  }

  async unlistHero(heroId) {
    const id = parseInt(heroId, 10);
    console.log(`unlisting hero: ${id}`);

    const { transaction } = await this.cancelAuction(id);

    if (transaction.txStatus === "CONFIRMED") {
      console.log(`unlisting hero: ${id} completed`);
    } else {
      console.log(`unlist hero: ${id} failed`);
    }

    return transaction;
  }

  async buyHero(heroId) {
    const id = parseInt(heroId, 10);
    const heroesData = await autils.getHerosInfo([id])

    const { transaction } = await this.bid(id, heroesData[0].salePrice);

    if (transaction.txStatus === "CONFIRMED") {
      console.log(`buy hero: ${id} use ${parseInt(heroesData[0].salePrice) / Math.pow(10, 18)} J completed`);
    } else {
      console.log(`buy hero: ${id} use ${parseInt(heroesData[0].salePrice) / Math.pow(10, 18)} J failed`);
    }

    return transaction;
  }
}
