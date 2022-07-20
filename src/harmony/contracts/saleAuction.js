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
    const formatPrice = (BigInt(price) * BigInt(10 ** 18)).toString();

    return await this.contract.methods.createAuction(heroId, formatPrice, formatPrice, 60, "0x0000000000000000000000000000000000000000").send(autils.gasSettingFormater());
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

    const { transaction } = await this.cancelAuction(id).send()

    if (transaction.txStatus === "CONFIRMED") {
      console.log(`unlisting hero: ${id} completed`);
    } else {
      console.log(`unlist hero: ${id} failed`);
    }

    return transaction;
  }
}