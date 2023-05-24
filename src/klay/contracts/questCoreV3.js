const config = require("../../../config");
const ethers = require('ethers');
const autils = require('../../services/autils');
const questCoreV3ABI = require('../../../abis/QuestCoreV3.json');
const contractAddress = "0x1Ac6Cd893EDdb6Cac15E5A9FC549335b8b449015"
const { NonceManager } = require("@ethersproject/experimental")

module.exports = class QuestCoreV3 {
  constructor(accountInfo) {
    this.provider = new ethers.providers.JsonRpcProvider(config.klay.rpcs[config.klay.useRpcIndex])
    this.wallet = new ethers.Wallet(accountInfo.privateKey, this.provider)
    this.contract = new ethers.Contract(contractAddress, questCoreV3ABI, new NonceManager(this.wallet))
    this.accountName = accountInfo.accountName
  }

  async getAccountActiveQuests() {
    return await this.contract.getAccountActiveQuests(this.wallet.address);
  }

  async completeQuest(heroId) {
    return await this.contract.completeQuest(heroId, { gasPrice: await autils.getKLAYGasFee() });
  }

  async cancelQuest(heroId) {
    const txn = await this.contract.cancelQuest(heroId, { gasPrice: await autils.getKLAYGasFee() });
    const res = await txn.wait();

    if (res.status === 1) {
      console.log(`${this.accountName} KLAY cancel ${heroId} quest completed`)
    } else {
      console.log(`${this.accountName} KLAY cancel ${heroId} quest failed`)
    }

    return res;
  }

  async startFishingQuest(heroIds, attempt) {
    const txn = await this.contract.startQuest(heroIds, config.klay.quest.fishing.contractAddress, attempt, 0, { gasPrice: await autils.getKLAYGasFee() })
    const res = await txn.wait();
    if (res.status === 1) {
      console.log(`${this.accountName} KLAY send ${heroIds} on a fishing quest completed`)
    } else {
      console.log(`${this.accountName} KLAY send ${heroIds} on a fishing quest failed`)
    }

    return res;
  }

  async startForagingQuest(heroIds, attempt) {
    const txn = await this.contract.startQuest(heroIds, config.klay.quest.foraging.contractAddress, attempt, 0, { gasPrice: await autils.getKLAYGasFee() })
    const res = await txn.wait();
    if (res.status === 1) {
      console.log(`${this.accountName} KLAY send ${heroIds} on a foraging quest completed`)
    } else {
      console.log(`${this.accountName} KLAY send ${heroIds} on a foraging quest failed`)
    }

    return res;
  }

  async startStatQuest(heroIds, attempt, address, type) {
    const tx = await this.contract.startQuest(heroIds, address, attempt, 1, { gasPrice: await autils.getKLAYGasFee() })
    const res = await tx.wait();
    if (res.status === 1) {
      console.log(`${this.accountName} KLAY send ${heroIds} on a ${type} stat quest completed`)
    } else {
      console.log(`${this.accountName} KLAY send ${heroIds} on a ${type} stat quest failed`)
    }

    return res;
  }

  async startGoldMining(heroIds, attempt) {
    const tx = await this.contract.startQuest(heroIds, config.klay.quest.goldMining.contractAddress, attempt, 0, { gasPrice: await autils.getKLAYGasFee() })
    const res = await tx.wait();

    if (res.status === 1) {
      console.log(`${this.accountName} KLAY send ${heroIds} on a gold mining quest completed`)
    } else {
      console.log(`${this.accountName} KLAY send ${heroIds} on a gold mining quest failed`)
    }

    return res;
  }

  async startJadeMining(heroIds, attempt) {
    const tx = await this.contract.startQuest(heroIds, config.klay.quest.jadeMining.contractAddress, attempt, 0, { gasPrice: await autils.getKLAYGasFee() })
    const res = await tx.wait();

    if (res.status === 1) {
      console.log(`${this.accountName} KLAY send ${heroIds} on a jade mining quest completed`)
    } else {
      console.log(`${this.accountName} KLAY send ${heroIds} on a jade mining quest failed`)
    }

    return res;
  }

  async startGardeningQuest(heroIds, pairAddress, attempt) {
    const tx = await this.contract.startQuest(heroIds, pairAddress, attempt, 0, { gasPrice: await autils.getKLAYGasFee() })
    const res = await tx.wait();

    if (res.status === 1) {
      console.log(`${this.accountName} KLAY send ${heroIds} on a gardening quest completed`)
    } else {
      console.log(`${this.accountName} KLAY send ${heroIds} on a gardening quest failed`)
    }

    return res;
  }

  async getCurrentStamina(heroId) {
    return await this.contract.getCurrentStamina(heroId)
  }
}
