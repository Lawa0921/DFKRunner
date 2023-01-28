const config = require("../../../config");
const ethers = require('ethers');
const autils = require('../../services/autils');
const questCoreV2ABI = require('../../../abis/QuestCoreV2.json');
const contractAddress = "0xE9AbfBC143d7cef74b5b793ec5907fa62ca53154"
const { NonceManager } = require("@ethersproject/experimental")

module.exports = class QuestCoreV2 {
  constructor(accountInfo) {
    this.provider = new ethers.providers.JsonRpcProvider(config.defikingdoms.rpcs[config.defikingdoms.useRpcIndex])
    this.wallet = new ethers.Wallet(accountInfo.privateKey, this.provider)
    this.contract = new ethers.Contract(contractAddress, questCoreV2ABI, new NonceManager(this.wallet))
    this.accountName = accountInfo.accountName
  }

  async getAccountActiveQuests() {
    return await this.contract.getAccountActiveQuests(this.wallet.address);
  }

  async completeQuest(heroId) {
    return await this.contract.completeQuest(heroId, { gasPrice: await autils.getDFKGasFee() });
  }

  async cancelQuest(heroId) {
    const txn = await this.contract.cancelQuest(heroId, { gasPrice: await autils.getDFKGasFee() });
    const res = await txn.wait();

    if (res.status === 1) {
      console.log(`${this.accountName} DFK cancel ${heroId} quest completed`)
    } else {
      console.log(`${this.accountName} DFK cancel ${heroId} quest failed`)
    }

    return res;
  }

  async startFishingQuest(heroIds, attempt) {
    const txn = await this.contract.startQuest(heroIds, config.defikingdoms.quest.fishing.contractAddress, attempt, 0, { gasPrice: await autils.getDFKGasFee() })
    const res = await txn.wait();
    if (res.status === 1) {
      console.log(`${this.accountName} DFK send ${heroIds} on a fishing quest completed`)
    } else {
      console.log(`${this.accountName} DFK send ${heroIds} on a fishing quest failed`)
    }

    return res;
  }

  async startForagingQuest(heroIds, attempt) {
    const txn = await this.contract.startQuest(heroIds, config.defikingdoms.quest.foraging.contractAddress, attempt, 0, { gasPrice: await autils.getDFKGasFee() })
    const res = await txn.wait();
    if (res.status === 1) {
      console.log(`${this.accountName} DFK send ${heroIds} on a foraging quest completed`)
    } else {
      console.log(`${this.accountName} DFK send ${heroIds} on a foraging quest failed`)
    }

    return res;
  }

  async startStatQuest(heroIds, attempt, address, type) {
    const tx = await this.contract.startQuest(heroIds, address, attempt, 1, { gasPrice: await autils.getDFKGasFee() })
    const res = await tx.wait();
    if (res.status === 1) {
      console.log(`${this.accountName} DFK send ${heroIds} on a ${type} stat quest completed`)
    } else {
      console.log(`${this.accountName} DFK send ${heroIds} on a ${type} stat quest failed`)
    }

    return res;
  }

  async startGoldMining(heroIds, attempt) {
    const tx = await this.contract.startQuest(heroIds, config.defikingdoms.quest.goldMining.contractAddress, attempt, 0, { gasPrice: await autils.getDFKGasFee() })
    const res = await tx.wait();

    if (res.status === 1) {
      console.log(`${this.accountName} DFK send ${heroIds} on a gold mining quest completed`)
    } else {
      console.log(`${this.accountName} DFK send ${heroIds} on a gold mining quest failed`)
    }

    return res;
  }

  async startCrystalMining(heroIds, attempt) {
    const tx = await this.contract.startQuest(heroIds, config.defikingdoms.quest.crystalMining.contractAddress, attempt, 0, { gasPrice: await autils.getDFKGasFee() })
    const res = await tx.wait();

    if (res.status === 1) {
      console.log(`${this.accountName} DFK send ${heroIds} on a crystal mining quest completed`)
    } else {
      console.log(`${this.accountName} DFK send ${heroIds} on a crystal mining quest failed`)
    }

    return res;
  }

  async startGardeningQuest(heroIds, pairAddress, attempt) {
    const tx = await this.contract.startQuest(heroIds, pairAddress, attempt, 0, { gasPrice: await autils.getDFKGasFee() })
    const res = await tx.wait();

    if (res.status === 1) {
      console.log(`${this.accountName} DFK send ${heroIds} on a gardening quest completed`)
    } else {
      console.log(`${this.accountName} DFK send ${heroIds} on a gardening quest failed`)
    }

    return res;
  }

  async getCurrentStamina(heroId) {
    return await this.contract.getCurrentStamina(heroId)
  }
}
