const config = require("~/config.js");
const autils = require('~/src/services/autils');
const QuestCoreV2 = require('~/src/defikingdoms/contracts/questCoreV2');
const SaleAuction = require('~/src/defikingdoms/contracts/saleAuction');
const minStamina = config.defikingdoms.quest.crystalMining.minStamina;
const maxBatch = 6;

exports.CheckAndSendDFKCrystalMiners = async (heroesStruct, accountInfo) => {
  const saleAuctionContract = new SaleAuction(accountInfo);
  const questType = config.defikingdoms.quest.crystalMining
  const activeQuesterIds = heroesStruct.allQuesters
  const heroObjects = await autils.getHeroesInfoByIds(questType.heroes)
  const possibleCrystalMiners = heroObjects.filter((heroObject) => {
    return activeQuesterIds.indexOf(heroObject.id) === -1 && 
      heroObject.currentStamina() >= minStamina && 
      heroObject.owner === accountInfo.walletAddress && 
      !heroObject.isOnQuesting &&
      heroObject.network === "dfk"
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

    let sentMinerIds = [sendCrystalMiners[0].id]

    if (batchAmount > 1) {
      sentMinerIds = sentMinerIds.concat(sendCrystalMiners.map(heroObject => heroObject.id).slice((batchAmount - 1) * -1))
    }
    console.log(`${accountInfo.accountName} DFK sending ${sentMinerIds} to crystal mining quest`)

    await new QuestCoreV2(accountInfo).startCrystalMining(sentMinerIds, minStamina)
  } else {
    console.log(`${accountInfo.accountName} DFK no crystal miner sent`)
  }
}
