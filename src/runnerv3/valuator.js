const config = require("./config.json");
require('dotenv').config();

module.exports = class Valuator {
  constructor(price, hero) {
    this.price = parseInt(price) / Math.pow(10, 18);
    this.hero = hero;
  }

  execute() {
    if (this.isUnderUnconditionalPurchasePrice()) {
      return true;
    } else if (this.g0PurchaseConditions()) {
      return true;
    } else {
      return false;
    }
  }

  isUnderUnconditionalPurchasePrice() {
    return this.price <= config.unconditionalPurchasePrice ? true : false;
  }

  g0PurchaseConditions() {
    if (this.hero.generation !== 0) {
      return false;
    } else {
      return this.price <= config.g0ConditionsOfPurchase ? true : false;
    }
  }  
}
