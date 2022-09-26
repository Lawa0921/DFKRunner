const config = require("~/config.js");
const autils = require('~/src/services/autils');
const QuestCoreV2 = require('~/src/defikingdoms/contracts/questCoreV2');
const SaleAuction = require('~/src/defikingdoms/contracts/saleAuction');
const saleAuctionContract = new SaleAuction();
const minStamina = 25;
const maxBatch = 6;

exports.CheckAndSendDFKGoldMiners = async (heroesStruct, owningHeroObjects) => {
  const questType = config.defikingdoms.quest.goldMining
  const activeQuesterIds = heroesStruct.allQuesters
  const possibleGoldMiners = owningHeroObjects.filter((heroObject) => { 
    return questType.heroes.indexOf(heroObject.id) > -1 && activeQuesterIds.indexOf(heroObject.id) === -1 && heroObject.currentStamina() >= minStamina && heroObject.owner === config.walletAddress 
  })
  const batchAmount = questType.singleBatchAmount > maxBatch ? maxBatch : questType.singleBatchAmount

  const unlistPromise = possibleGoldMiners.filter(heroObject => heroObject.isOnSale).map(onSaleHeroObject => saleAuctionContract.unlistHero(onSaleHeroObject.id))

  if (unlistPromise.length > 0) {
    await Promise.allSettled(unlistPromise)
    await autils.sleep(5000)
  }

  if (possibleGoldMiners.length > 0 && possibleGoldMiners.length >= batchAmount) {
    const sendGoldMiners = possibleGoldMiners.slice(0, batchAmount)
    const sentMinerIds = sendGoldMiners.map(heroObject => heroObject.id)

    console.log(`sending ${sentMinerIds} to gold mining quest`)
    await new QuestCoreV2().startGoldMining(sentMinerIds)
  } else {
    console.log("No gold miner sent")
  }
}
