const config = require("~/config.js");
const autils = require('~/src/services/autils');
const QuestCoreV2 = require('~/src/defikingdoms/contracts/questCoreV2');
const SaleAuction = require('~/src/defikingdoms/contracts/saleAuction');
const minStamina = 25;
const maxBatch = 6;

exports.CheckAndSendDFKGoldMiners = async (heroesStruct, owningHeroObjects, accountInfo) => {
  const questType = config.defikingdoms.quest.goldMining
  const activeQuesterIds = heroesStruct.allQuesters
  const possibleGoldMiners = owningHeroObjects.filter((heroObject) => { 
    return questType.heroes.indexOf(heroObject.id) > -1 && activeQuesterIds.indexOf(heroObject.id) === -1 && heroObject.currentStamina() >= minStamina && heroObject.owner === accountInfo.walletAddress && !heroObject.isOnQuesting
  })
  const batchAmount = questType.singleBatchAmount > maxBatch ? maxBatch : questType.singleBatchAmount

  if (possibleGoldMiners.length > 0 && possibleGoldMiners.length >= batchAmount) {
    const sendGoldMiners = possibleGoldMiners.slice(0, batchAmount)
    const sentMinerIds = sendGoldMiners.map(heroObject => heroObject.id)
    const saleAuctionContract = new SaleAuction(accountInfo);

    const unsellPromise = sendGoldMiners.filter(heroObject => heroObject.isOnSale).map(onSaleHeroObject => saleAuctionContract.unlistHero(onSaleHeroObject.id))

    if (unsellPromise.length > 0) {
      await Promise.allSettled(unsellPromise)
      await autils.sleep(5000)
    }

    console.log(`${accountInfo.accountName} sending ${sentMinerIds} to gold mining quest`)
    await new QuestCoreV2(accountInfo).startGoldMining(sentMinerIds)
  } else {
    console.log(`${accountInfo.accountName} no gold miner sent`)
  }
}
