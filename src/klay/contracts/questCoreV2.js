const config = require("~/config.js");
const ethers = require('ethers');
const autils = require('~/src/services/autils');
const questCoreV2ABI = require('~/abis/QuestCoreV2.json');
const { NonceManager } = require("@ethersproject/experimental")

module.exports = class QuestCoreV2 {
  constructor(accountInfo) {
    this.provider = new ethers.providers.JsonRpcProvider(config.klay.rpcs[config.klay.useRpcIndex])
    this.wallet = new ethers.Wallet(accountInfo.privateKey, this.provider)
    this.contract = new ethers.Contract(config.klay.questCoreV2, questCoreV2ABI, new NonceManager(this.wallet))
    this.accountName = accountInfo.accountName
  }

  async getAccountActiveQuests() {
    return await this.contract.getAccountActiveQuests(this.wallet.address);
  }

  async completeQuest(heroId) {
    return await this.contract.completeQuest(heroId, { gasPrice: await autils.getBaseGasFee() });
  }

  async startFishingQuest(heroIds, attempt) {
    const txn = await this.contract.startQuest(heroIds, config.klay.quest.fishing.contractAddress, attempt, 0, { gasPrice: await autils.getBaseGasFee() })
    const res = await txn.wait();
    if (res.status === 1) {
      console.log(`KLAY ${this.accountName} send ${heroIds} on a fishing quest completed`)
    } else {
      console.log(`KLAY ${this.accountName} send ${heroIds} on a fishing quest failed`)
    }

    return res;
  }

  async startForagingQuest(heroIds, attempt) {
    const txn = await this.contract.startQuest(heroIds, config.klay.quest.foraging.contractAddress, attempt, 0, { gasPrice: await autils.getBaseGasFee() })
    const res = await txn.wait();
    if (res.status === 1) {
      console.log(`KLAY ${this.accountName} send ${heroIds} on a foraging quest completed`)
    } else {
      console.log(`KLAY ${this.accountName} send ${heroIds} on a foraging quest failed`)
    }

    return res;
  }

  async startStatQuest(heroIds, attempt, address, type) {
    const tx = await this.contract.startQuest(heroIds, address, attempt, 1, { gasPrice: await autils.getBaseGasFee() })
    const res = await tx.wait();
    if (res.status === 1) {
      console.log(`KLAY ${this.accountName} send ${heroIds} on a ${type} stat quest completed`)
    } else {
      console.log(`KLAY ${this.accountName} send ${heroIds} on a ${type} stat quest failed`)
    }

    return res;
  }

  async startGoldMining(heroIds) {
    const tx = await this.contract.startQuest(heroIds, config.klay.quest.goldMining.contractAddress, 1, 0, { gasPrice: await autils.getBaseGasFee() })
    const res = await tx.wait();

    if (res.status === 1) {
      console.log(`KLAY ${this.accountName} send ${heroIds} on a gold mining quest completed`)
    } else {
      console.log(`KLAY ${this.accountName} send ${heroIds} on a gold mining quest failed`)
    }

    return res;
  }

  async startCrystalMining(heroIds) {
    const tx = await this.contract.startQuest(heroIds, config.klay.quest.crystalMining.contractAddress, 1, 0, { gasPrice: await autils.getBaseGasFee() })
    const res = await tx.wait();

    if (res.status === 1) {
      console.log(`KLAY ${this.accountName} send ${heroIds} on a crystal mining quest completed`)
    } else {
      console.log(`KLAY ${this.accountName} send ${heroIds} on a crystal mining quest failed`)
    }

    return res;
  }

  async startGardeningQuest(heroIds, pairAddress) {
    const tx = await this.contract.startQuest(heroIds, pairAddress, 1, 0, { gasPrice: await autils.getBaseGasFee() })
    const res = await tx.wait();

    if (res.status === 1) {
      console.log(`KLAY ${this.accountName} send ${heroIds} on a gardening quest completed`)
    } else {
      console.log(`KLAY ${this.accountName} send ${heroIds} on a gardening quest failed`)
    }

    return res;
  }

  async getCurrentStamina(heroId) {
    return await this.contract.getCurrentStamina(heroId)
  }
}
