const config = require("../../config");
const autils = require('../services/autils');
const QuestCoreV3 = require('./contracts/questCoreV3');
const SaleAuction = require('./contracts/saleAuction');
const minStamina = 25;
const maxQueue = 5;
const maxHeroCount = 5;

exports.CheckAndSendKLAYStatQuests = async (heroesStruct, owningHeroObjects, accountInfo) => {
	const statHeroIds = config.klay.quest.statQuest.quests.map(statQuestSetting => statQuestSetting.heroes).flat()
	const activeQuesterIds = heroesStruct.allQuesters
	const saleAuctionContract = new SaleAuction(accountInfo);
	const possibleStatHeroes = owningHeroObjects.filter((heroObject) => { 
		return statHeroIds.indexOf(heroObject.id) > -1 && 
      activeQuesterIds.indexOf(heroObject.id) === -1 && 
      heroObject.currentStamina() >= minStamina && 
      heroObject.owner === accountInfo.walletAddress && 
      !heroObject.isOnQuesting &&
      heroObject.network === "kla"
	})
	const unsellPromise = possibleStatHeroes.filter(heroObject => heroObject.isOnSale).map(onSaleHeroObject => saleAuctionContract.unlistHero(onSaleHeroObject.id))

	if (unsellPromise.length > 0) {
		await Promise.allSettled(unsellPromise)
		await autils.sleep(5000)
	}

  for (let i = 0; i < config.klay.quest.statQuest.quests.length; i++) {
  	const questType = config.klay.quest.statQuest.quests[i]

    if (questType.heroes.length !== 0) {
			const currentPossibleHeroes = possibleStatHeroes.filter(heroObject => questType.heroes.indexOf(heroObject.id) > -1)
    
			if (currentPossibleHeroes.length > 0) {
				const questCount = amountOfQuest(heroesStruct, questType)

				if (questCount >= maxQueue) {
					console.log(`${accountInfo.accountName} KLAY ${questType.name} queue has reached its maximum value.`)
				} else {
					let sendHeroCount = 0;

					for (let i = 0; i < maxQueue - questCount - 1 && i < Math.ceil(currentPossibleHeroes.length / maxHeroCount); i++) {
						const sentHeroes = currentPossibleHeroes.slice(sendHeroCount, maxHeroCount + sendHeroCount)
						const attemp = Math.floor(minStamina / 5)

						console.log(`${accountInfo.accountName} KLAY sending ${sentHeroes.map(heroObject => heroObject.id)} to ${questType.name} quest`)

						await new QuestCoreV3(accountInfo).startStatQuest(sentHeroes.map(heroObject => heroObject.id), attemp, questType.questTypeId, questType.name);
						sendHeroCount += sentHeroes.length
					}
				}
			} else {
				console.log(`${accountInfo.accountName} KLAY no ${questType.name} hero send`)
			}
		}
	}
}

amountOfQuest = (heroesStruct, questType) => {
	switch(questType.name) {
		case "StatQuest_Str":
			return heroesStruct.statQuestStrCount
		case "StatQuest_Dex":
			return heroesStruct.statQuestDexCount
		case "StatQuest_Agi":
			return heroesStruct.statQuestAgiCount
		case "StatQuest_Vit":
			return heroesStruct.statQuestVitCount
		case "StatQuest_End":
			return heroesStruct.statQuestEndCount
		case "StatQuest_Int":
			return heroesStruct.statQuestIntCount
		case "StatQuest_Wis":
			return heroesStruct.statQuestWisCount
		case "StatQuest_Luk":
			return heroesStruct.statQuestLukCount
	}
}
