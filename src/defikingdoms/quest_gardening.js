const config = require("~/config.js");
const autils = require('~/src/services/autils');
const QuestCoreV2 = require('~/src/defikingdoms/contracts/questCoreV2');
const SaleAuction = require('~/src/defikingdoms/contracts/saleAuction');
const minStamina = 25;

exports.CheckAndSendDFKGardeners = async (heroesStruct, owningHeroObjects, accountInfo) => {
  const questType = config.defikingdoms.quest.gardening
  const activeQuesterIds = heroesStruct.allQuesters

  const gardeningHeroIds = questType.pairAddressMappings.map(gardeningQuestSetting => gardeningQuestSetting.heroes).flat()
  const possibleGardeners = owningHeroObjects.filter((heroObject) => {
    return gardeningHeroIds.indexOf(heroObject.id) > -1 && activeQuesterIds.indexOf(heroObject.id) === -1 && heroObject.currentStamina() >= minStamina && heroObject.owner === accountInfo.walletAddress && !heroObject.isOnQuesting
  })

  for (let i = 0; i < questType.pairAddressMappings.length; i++) {
    const currentPossibleGardeners = possibleGardeners.filter(heroObject => questType.pairAddressMappings[i].heroes.indexOf(heroObject.id) > -1)

    if (currentPossibleGardeners.length > 0 && currentPossibleGardeners.length >= questType.pairAddressMappings[i].singleBatchAmount) {
      const sendGardeners = currentPossibleGardeners.slice(0, questType.pairAddressMappings[i].singleBatchAmount)
      const sentGardenerIds = sendGardeners.map(heroObject => heroObject.id)
      const saleAuctionContract = new SaleAuction(accountInfo)

      const unsellPromise = sendGardeners.filter(heroObject => heroObject.isOnSale).map(onSaleHeroObject => saleAuctionContract.unlistHero(onSaleHeroObject.id))

      if (unsellPromise.length > 0) {
        await Promise.allSettled(unsellPromise)
        await autils.sleep(5000)
      }

      console.log(`${accountInfo.accountName} DFK sending ${sentGardenerIds} to ${questType.pairAddressMappings[i].tokenPair} gardening quest`)
      await new QuestCoreV2(accountInfo).startGardeningQuest(sentGardenerIds, questType.pairAddressMappings[i].pairAddress, minStamina)
    } else {
      console.log(`${accountInfo.accountName} DFK no gardener sent to ${questType.pairAddressMappings[i].tokenPair}`)
    }
  }
}
