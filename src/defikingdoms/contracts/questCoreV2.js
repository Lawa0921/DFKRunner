const config = require("~/config.js");
const ethers = require('ethers');
const questCoreV2ABI = require('~/abis/QuestCoreV2.json')

module.exports = class QuestCoreV2 {
  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(config.defikingdoms.rpcs[config.defikingdoms.useRpcIndex])
    this.wallet = new ethers.Wallet(config.privateKey, this.provider)
    this.contract = new ethers.Contract(config.defikingdoms.questCoreV2, questCoreV2ABI, this.wallet)
  }

  async getAccountActiveQuests() {
    return await this.contract.getAccountActiveQuests(this.wallet.address);
  }

  async completeQuest(heroId) {
    return await this.contract.completeQuest(heroId);
  }

  async startFishingQuest(heroId, attempt) {
    return await this.contract.startQuest(heroId, config.defikingdoms.quest.fishing.contractAddress, attempt, 0)
  }

  async startForagingQuest(heroIds, attempt) {
    const txn = await this.contract.startQuest(heroIds, config.defikingdoms.quest.foraging.contractAddress, attempt, 0)
    const res = await txn.wait();
    if (res.status === 1) {
      console.log("Sent " + heroIds + " on a Foraging Quest completed")
    } else {
      console.log("Sent " + heroIds + " on a Foraging Quest failed")
    }

    return res;
  }

  async startStatQuest(heroIds, attempt, address, type) {
    const tx = await this.contract.startQuest(heroIds, address, attempt, 1)
    const res = await tx.wait();
    if (res.status === 1) {
      console.log("Sent " + heroIds + " on a " + type + " Stat Quest completed")
    } else {
      console.log("Sent " + heroIds + " on a " + type + " Stat Quest failed")
    }

    return res;
  }

  async getCurrentStamina(heroId) {
    return await this.contract.getCurrentStamina(heroId)
  }
}
