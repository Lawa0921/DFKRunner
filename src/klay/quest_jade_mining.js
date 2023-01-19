const config = require("../../config");
const autils = require('../services/autils');
const QuestCoreV2 = require('~/src/klay/contracts/questCoreV2');
const SaleAuction = require('~/src/klay/contracts/saleAuction');
const minStamina = config.klay.quest.jadeMining.minStamina;
const maxBatch = 6;

exports.CheckAndSendDFKJadeMiners = async (heroesStruct, accountInfo) => {
  const saleAuctionContract = new SaleAuction(accountInfo);
  const questType = config.klay.quest.jadeMining
  const activeQuesterIds = heroesStruct.allQuesters
  const heroObjects = await autils.getHeroesInfoByIds(questType.heroes)
  const possibleJadeMiners = heroObjects.filter((heroObject) => {
    return activeQuesterIds.indexOf(heroObject.id) === -1 && 
      heroObject.currentStamina() >= minStamina && 
      heroObject.owner === accountInfo.walletAddress && 
      !heroObject.isOnQuesting &&
      heroObject.network === "kla"
  }).sort((heroInfo, nextHeroInfo) => {
    return (nextHeroInfo.strength + nextHeroInfo.endurance) - (heroInfo.strength + heroInfo.endurance)
  })

  const batchAmount = questType.singleBatchAmount > maxBatch ? maxBatch : questType.singleBatchAmount

  if (possibleJadeMiners.length > 0 && possibleJadeMiners.length >= batchAmount) {
    const sendJadeMiners = possibleJadeMiners.slice(0, batchAmount)

    for (let i = 0; i < sendJadeMiners.length; i++) {
      if (sendJadeMiners[i].isOnSale) {
        await saleAuctionContract.unlistHero(sendJadeMiners[i].id)
      }
    }

    let sentMinerIds = [sendJadeMiners[0].id]

    if (batchAmount > 1) {
      sentMinerIds = sentMinerIds.concat(sendJadeMiners.map(heroObject => heroObject.id).slice((batchAmount - 1) * -1))
    }
    console.log(`${accountInfo.accountName} KLAY sending ${sentMinerIds} to jade mining quest`)

    await new QuestCoreV2(accountInfo).startJadeMining(sentMinerIds, minStamina)
  } else {
    console.log(`${accountInfo.accountName} KLAY no jade miner sent`)
  }
}
