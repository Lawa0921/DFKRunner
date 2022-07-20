const config = require("~/config.js");
const autils = require("~/src/services/autils");
const questCoreV2ABI = require('~/abis/QuestCoreV2.json')
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

module.exports = class QuestCoreV2 {
  constructor() {
    this.contract = hmy.contracts.createContract(questCoreV2ABI, config.harmony.questCoreV2);
  }

  async getAccountActiveQuests() {
    return await this.contract.methods.getAccountActiveQuests(config.walletAddress).call();
  }

  async completeQuest(heroId) {
    return await this.contract.methods.completeQuest(heroId).send(autils.gasSettingFormater());
  }

  async startFishingQuest(heroIds, attempt) {
    const { transaction } = await this.contract.methods.startQuest(heroIds, config.harmony.quests[0].contractAddress, attempt, 0).send(autils.gasSettingFormater());

    if (transaction.txStatus === "CONFIRMED") {
      console.log("Sent " + heroIds + " on a Fishing Quest completed")
    } else {
      console.log("Sent " + heroIds + " on a Fishing Quest failed")
    }

    return transaction;
  }

  async startForagingQuest(heroIds, attempt) {
    const { transaction } = await this.contract.methods.startQuest(heroIds, config.harmony.quests[1].contractAddress, attempt, 0).send(autils.gasSettingFormater());

    if (transaction.txStatus === "CONFIRMED") {
      console.log("Sent " + heroIds + " on a Foraging Quest completed")
    } else {
      console.log("Sent " + heroIds + " on a Foraging Quest failed")
    }

    return transaction;
  }

  async startStatQuest(heroIds, attempt, address, type) {
    const { transaction } = await this.contract.methods.startQuest(heroIds, address, attempt, 1).send(autils.gasSettingFormater());

    if (transaction.txStatus === "CONFIRMED") {
      console.log("Sent " + heroIds + " on a " + type + " Stat Quest completed")
    } else {
      console.log("Sent " + heroIds + " on a " + type + " Stat Quest failed")
    }

    return transaction;
  }

  async getCurrentStamina(heroId) {
    return await this.contract.methods.getCurrentStamina(heroId).call();
  }
}
