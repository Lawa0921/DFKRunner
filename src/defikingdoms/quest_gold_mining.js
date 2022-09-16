const config = require("~/config.js");
const QuestCoreV2 = require('~/src/defikingdoms/contracts/questCoreV2');
const questCoreV2Contract = new QuestCoreV2();
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

  if (possibleGoldMiners.length > 0 && possibleGoldMiners.length >= batchAmount) {
    const sendGoldMiners = possibleGoldMiners.slice(0, batchAmount)
    const sentMinerIds = sendGoldMiners.map(heroObject => heroObject.id)

    for (let i = 0; i < sendGoldMiners.length; i++) {
      if (sendGoldMiners[i].isOnSale) {
        await saleAuctionContract.unlistHero(sendGoldMiners[i].id)
      }
    }

    console.log(`senting ${sentMinerIds} to gold mining quest`)
    await questCoreV2Contract.startGoldMining(sentMinerIds)
  } else {
    console.log("No gold miner sent")
  }
}
