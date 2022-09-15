const config = require("~/config.js");
const ethers = require('ethers');
const autils = require('~/src/services/autils');
const questCoreV2ABI = require('~/abis/QuestCoreV2.json');
const { NonceManager } = require("@ethersproject/experimental")

module.exports = class QuestCoreV2 {
  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(config.defikingdoms.rpcs[config.defikingdoms.useRpcIndex])
    this.wallet = new ethers.Wallet(config.privateKey, this.provider)
    this.contract = new ethers.Contract(config.defikingdoms.questCoreV2, questCoreV2ABI, new NonceManager(this.wallet))
  }

  async getAccountActiveQuests() {
    return await this.contract.getAccountActiveQuests(this.wallet.address);
  }

  async completeQuest(heroId) {
    return await this.contract.completeQuest(heroId, { gasPrice: config.defikingdoms.gasPrice });
  }

  async startFishingQuest(heroIds, attempt) {
    const txn = await this.contract.startQuest(heroIds, config.defikingdoms.quest.fishing.contractAddress, attempt, 0, { gasPrice: config.defikingdoms.gasPrice })
    const res = await txn.wait();
    if (res.status === 1) {
      console.log("Sent " + heroIds + " on a Fishing Quest completed")
    } else {
      console.log("Sent " + heroIds + " on a Fishing Quest failed")
    }

    return res;
  }

  async startForagingQuest(heroIds, attempt) {
    const txn = await this.contract.startQuest(heroIds, config.defikingdoms.quest.foraging.contractAddress, attempt, 0, { gasPrice: config.defikingdoms.gasPrice })
    const res = await txn.wait();
    if (res.status === 1) {
      console.log("Sent " + heroIds + " on a Foraging Quest completed")
    } else {
      console.log("Sent " + heroIds + " on a Foraging Quest failed")
    }

    return res;
  }

  async startStatQuest(heroIds, attempt, address, type) {
    const tx = await this.contract.startQuest(heroIds, address, attempt, 1, { gasPrice: config.defikingdoms.gasPrice })
    const res = await tx.wait();
    if (res.status === 1) {
      console.log("Sent " + heroIds + " on a " + type + " Stat Quest completed")
    } else {
      console.log("Sent " + heroIds + " on a " + type + " Stat Quest failed")
    }

    return res;
  }

  async startGoldMining(heroIds) {
    const tx = await this.contract.startQuest(heroIds, config.defikingdoms.quest.goldMining.contractAddress, 1, 0, { gasPrice: config.defikingdoms.gasPrice })
    const res = await tx.wait();

    if (res.status === 1) {
      console.log(`Sent ${heroIds} gold mining success`)
    } else {
      console.log(`Sent ${heroIds} gold mining failed`)
    }

    return res;
  }

  async startCrystalMining(heroIds) {
    const tx = await this.contract.startQuest(heroIds, config.defikingdoms.quest.crystalMining.contractAddress, 1, 0, { gasPrice: config.defikingdoms.gasPrice })
    const res = await tx.wait();

    if (res.status === 1) {
      console.log(`Sent ${heroIds} crystal mining success`)
    } else {
      console.log(`Sent ${heroIds} crystal mining failed`)
    }

    return res;
  }

  async startGardeningQuest(heroIds, pairAddress) {
    let rawTxnData = "0x8a2da17b" + 
      "0000000000000000000000000000000000000000000000000000000000000080" + 
      pairAddress.slice(2).toString(16).padStart(64, "0") +
      autils.intToInput(1) +
      "0000000000000000000000000000000000000000000000000000000000000000" +
      autils.intToInput(heroIds.length)

    heroIds.forEach((heroId) => {
      rawTxnData += autils.intToInput(heroId)
    })

    const txnData = {
      to: config.defikingdoms.questCoreV2, 
      gasLimit: 2000000, // to do await this.provider.estimateGas(txnData)
      gasPrice: config.defikingdoms.gasPrice,
      chainId: 53935,
      data: rawTxnData,
    }
      
    const sendTxn = await this.wallet.sendTransaction(txnData);
    const res = await sendTxn.wait();

    if (res.status === 1) {
      console.log(`Sent ${heroIds} gardening quest success`);
    } else {
      autils.txnFailLog(`Sent ${heroIds} gardening quest failed`);
    }

    return res;
  }

  async getCurrentStamina(heroId) {
    return await this.contract.getCurrentStamina(heroId)
  }
}
