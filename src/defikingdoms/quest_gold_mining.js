const config = require("../../config");
const autils = require('../services/autils');
const QuestCoreV3 = require('./contracts/questCoreV3');
const SaleAuction = require('./contracts/saleAuction');
const minStamina = config.defikingdoms.quest.goldMining.minStamina;
const maxBatch = 6;

exports.CheckAndSendDFKGoldMiners = async (heroesStruct, owningHeroObjects, accountInfo) => {
  const questType = config.defikingdoms.quest.goldMining
  const activeQuesterIds = heroesStruct.allQuesters
  const possibleGoldMiners = owningHeroObjects.filter((heroObject) => { 
    return questType.heroes.indexOf(heroObject.id) > -1 && 
      activeQuesterIds.indexOf(heroObject.id) === -1 && 
      heroObject.currentStamina() >= minStamina &&
      heroObject.owner === accountInfo.walletAddress &&
      !heroObject.isOnQuesting &&
      heroObject.network === "dfk"
  })
  const batchAmount = questType.singleBatchAmount > maxBatch ? maxBatch : questType.singleBatchAmount

  if (possibleGoldMiners.length > 0 && possibleGoldMiners.length >= batchAmount) {
    const sendGoldMiners = possibleGoldMiners.slice(0, batchAmount)
    const sentMinerIds = sendGoldMiners.map(heroObject => heroObject.id)
    const saleAuctionContract = new SaleAuction(accountInfo);
    const questLevel = sendGoldMiners.filter(heroObject => heroObject.mining >= 100).length === questType.singleBatchAmount ? 0 : 0
    const unsellPromise = sendGoldMiners.filter(heroObject => heroObject.isOnSale).map(onSaleHeroObject => saleAuctionContract.unlistHero(onSaleHeroObject.id))

    if (unsellPromise.length > 0) {
      await Promise.allSettled(unsellPromise)
      await autils.sleep(5000)
    }

    console.log(`${accountInfo.accountName} DFK sending ${sentMinerIds} to LV ${questLevel} gold mining quest`)
    await new QuestCoreV3(accountInfo).startGoldMining(sentMinerIds, minStamina, questLevel)
  } else {
    console.log(`${accountInfo.accountName} DFK no gold miner sent`)
  }
}
