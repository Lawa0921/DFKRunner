const config = require("~/config.js");
const autils = require('~/src/services/autils');
const QuestCoreV2 = require('~/src/defikingdoms/contracts/questCoreV2');
const SaleAuction = require('~/src/defikingdoms/contracts/saleAuction');
const saleAuctionContract = new SaleAuction();
const minStamina = 25;
const maxBatch = 6;

exports.CheckAndSendDFKCrystalMiners = async (heroesStruct) => {
  const questType = config.defikingdoms.quest.crystalMining
  const activeQuesterIds = heroesStruct.allQuesters
  const heroObjects = await autils.getHerosInfo(questType.heroes)
  const possibleCrystalMiners = heroObjects.filter((heroObject) => {
    return activeQuesterIds.indexOf(heroObject.id) === -1 && heroObject.currentStamina() >= minStamina && heroObject.owner === config.walletAddress
  }).sort((heroInfo, nextHeroInfo) => {
    return (nextHeroInfo.strength + nextHeroInfo.endurance) - (heroInfo.strength + heroInfo.endurance)
  })

  const batchAmount = questType.singleBatchAmount > maxBatch ? maxBatch : questType.singleBatchAmount

  if (possibleCrystalMiners.length > 0 && possibleCrystalMiners.length >= batchAmount) {
    const sendCrystalMiners = possibleCrystalMiners.slice(0, batchAmount)

    for (let i = 0; i < sendCrystalMiners.length; i++) {
      if (sendCrystalMiners[i].isOnSale) {
        await saleAuctionContract.unlistHero(sendCrystalMiners[i].id)
      }
    }

    let sentMinerIds = [possibleCrystalMiners[0].id]

    if (batchAmount > 1) {
      sentMinerIds = sentMinerIds.concat(possibleCrystalMiners.map(heroObject => heroObject.id).slice((batchAmount - 1) * -1))
    }
    console.log(`sending ${sentMinerIds} to crystal mining quest`)
    await new QuestCoreV2().startCrystalMining(sentMinerIds)
  } else {
    console.log("No crystal miner sent")
  }
}
