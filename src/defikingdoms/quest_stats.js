const config = require("~/config.js");
const autils = require('~/src/services/autils')
const QuestCoreV2 = require('~/src/defikingdoms/contracts/questCoreV2');
const SaleAuction = require('~/src/defikingdoms/contracts/saleAuction');
const saleAuctionContract = new SaleAuction();
const minStamina = 25;
const maxQueue = 10;
const maxHeroCount = 6;

exports.CheckAndSendDFKStatQuests = async (heroesStruct, owningHeroObjects) => {
  for (let i = 0; i < config.defikingdoms.quest.statQuests.length; i++) {
  	const questType = config.defikingdoms.quest.statQuests[i]

    if (questType.heroes.length !== 0) {
			const activeQuesterIds = heroesStruct.allQuesters
			const possibleHeroes = owningHeroObjects.filter((heroObject) => { 
				return questType.heroes.indexOf(heroObject.id) > -1 && activeQuesterIds.indexOf(heroObject.id) === -1 && heroObject.currentStamina() >= minStamina && heroObject.owner === config.walletAddress 
			})
    
			if (possibleHeroes.length > 0) {
				const questCount = amountOfQuest(heroesStruct, questType)

				if (questCount >= maxQueue) {
					console.log(`${questType.name} queue has reached its maximum value.`)
				} else {
					let sendHeroCount = 0;

					for (let i = 0; i < maxQueue - questCount - 1 && i < Math.ceil(possibleHeroes.length / maxHeroCount); i++) {
						const sentHeroes = possibleHeroes.slice(sendHeroCount, maxHeroCount + sendHeroCount)

						const unlistPromise = sentHeroes.filter(heroObject => heroObject.isOnSale).map(onSaleHeroObject => saleAuctionContract.unlistHero(onSaleHeroObject.id))

						if (unlistPromise.length > 0) {
							await Promise.allSettled(unlistPromise)
							await autils.sleep(5000)
						}
				
						const attemp = Math.floor(minStamina / 5)

						console.log(`sending ${sentHeroes.map(heroObject => heroObject.id)} to ${questType.name} quest`)

						await new QuestCoreV2().startStatQuest(sentHeroes.map(heroObject => heroObject.id), attemp, questType.contractAddress, questType.name);
						sendHeroCount += sentHeroes.length
					}
				}
			} else {
				console.log(`No ${questType.name} hero send`)
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
