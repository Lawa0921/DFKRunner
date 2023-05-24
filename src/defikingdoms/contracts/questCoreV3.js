const config = require("../../../config");
const ethers = require('ethers');
const autils = require('../../services/autils');
const questCoreV3ABI = require('../../../abis/QuestCoreV3.json');
const contractAddress = "0x530fff22987E137e7C8D2aDcC4c15eb45b4FA752"
const { NonceManager } = require("@ethersproject/experimental")

module.exports = class QuestCoreV3 {
  constructor(accountInfo) {
    this.provider = new ethers.providers.JsonRpcProvider(config.defikingdoms.rpcs[config.defikingdoms.useRpcIndex])
    this.wallet = new ethers.Wallet(accountInfo.privateKey, this.provider)
    this.contract = new ethers.Contract(contractAddress, questCoreV3ABI, new NonceManager(this.wallet))
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

  async startFishingQuest(heroIds, attempt, level) {
    const txn = await this.contract.startQuest(heroIds, 1, attempt, level, 0, { gasPrice: await autils.getDFKGasFee() })
    const res = await txn.wait();
    if (res.status === 1) {
      console.log(`${this.accountName} DFK send ${heroIds} on a ${level} fishing quest completed`)
    } else {
      console.log(`${this.accountName} DFK send ${heroIds} on a ${level} fishing quest failed`)
    }

    return res;
  }

  async startForagingQuest(heroIds, attempt, level) {
    const txn = await this.contract.startQuest(heroIds, 2, attempt, level, 0, { gasPrice: await autils.getDFKGasFee() })
    const res = await txn.wait();
    if (res.status === 1) {
      console.log(`${this.accountName} DFK send ${heroIds} on a ${level} foraging quest completed`)
    } else {
      console.log(`${this.accountName} DFK send ${heroIds} on a ${level} foraging quest failed`)
    }

    return res;
  }

  async startStatQuest(heroIds, attempt, questTypeId, type) {
    const tx = await this.contract.startQuest(heroIds, 6, attempt, 1, questTypeId, { gasPrice: await autils.getDFKGasFee() })
    const res = await tx.wait();
    if (res.status === 1) {
      console.log(`${this.accountName} DFK send ${heroIds} on a ${type} stat quest completed`)
    } else {
      console.log(`${this.accountName} DFK send ${heroIds} on a ${type} stat quest failed`)
    }

    return res;
  }

  async startGoldMining(heroIds, attempt) {
    const tx = await this.contract.startQuest(heroIds, 3, attempt, 0, 0, { gasPrice: await autils.getDFKGasFee() })
    const res = await tx.wait();

    if (res.status === 1) {
      console.log(`${this.accountName} DFK send ${heroIds} on a gold mining quest completed`)
    } else {
      console.log(`${this.accountName} DFK send ${heroIds} on a gold mining quest failed`)
    }

    return res;
  }

  async startCrystalMining(heroIds, attempt) {
    const tx = await this.contract.startQuest(heroIds, 4, attempt, 0, 0, { gasPrice: await autils.getDFKGasFee() })
    const res = await tx.wait();

    if (res.status === 1) {
      console.log(`${this.accountName} DFK send ${heroIds} on a crystal mining quest completed`)
    } else {
      console.log(`${this.accountName} DFK send ${heroIds} on a crystal mining quest failed`)
    }

    return res;
  }

  async startGardeningQuest(heroIds, poolId, attempt) {
    const tx = await this.contract.startQuest(heroIds, 5, attempt, 0, poolId, { gasPrice: await autils.getDFKGasFee() })
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
