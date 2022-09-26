const config = require("~/config.js");
const autils = require('~/src/services/autils');
const QuestCoreV2 = require('~/src/defikingdoms/contracts/questCoreV2');
const SaleAuction = require('~/src/defikingdoms/contracts/saleAuction');
const saleAuctionContract = new SaleAuction();
const minStamina = 25;
const maxQueue = 10;
const maxHeroCount = 6;

exports.CheckAndSendDFKFishers = async (heroesStruct, owningHeroObjects) => {
	if (heroesStruct.fishingQuestCount >= maxQueue) {
		console.log("fishing queue has reached its maximum value.")
	} else {
		const questType = config.defikingdoms.quest.fishing
		const activeQuesterIds = heroesStruct.allQuesters
		const possibleFishers = owningHeroObjects.filter((heroObject) => { 
			return questType.heroes.indexOf(heroObject.id) > -1 && activeQuesterIds.indexOf(heroObject.id) === -1 && heroObject.currentStamina() >= minStamina && heroObject.owner === config.walletAddress
		})
		const unsellPromise = possibleFishers.filter(heroObject => heroObject.isOnSale).map(onSaleHeroObject => saleAuctionContract.unlistHero(onSaleHeroObject.id))

		if (unsellPromise.length > 0) {
			await Promise.allSettled(unsellPromise)
			await autils.sleep(5000)
		}
	
		if (possibleFishers.length > 0) {
			const professionFishers = possibleFishers.filter(heroObject => heroObject.profession === "fishing")
			const nonProfessionFishers = possibleFishers.filter(heroObject => heroObject.profession !== "fishing")

			let questCount = heroesStruct.fishingQuestCount
			let sendProfessionHeroesCount = 0
			let sendNonProfessionHeroesCount = 0;

			if (professionFishers.length > 0) {
				for (let i = 0; i < maxQueue - questCount - 1 && i < Math.ceil(professionFishers.length / maxHeroCount); i++) {
					const sendProfessionHeroes = professionFishers.slice(sendProfessionHeroesCount, maxHeroCount + sendProfessionHeroesCount)
					const attemp = Math.floor(minStamina / 5)

					console.log(`sending ${sendProfessionHeroes.map(heroObject => heroObject.id)} to fishing quest`)

					await new QuestCoreV2().startFishingQuest(sendProfessionHeroes.map(heroObject => heroObject.id), attemp);
					sendProfessionHeroesCount += sendProfessionHeroes.length
					questCount++
				}
			}

			if (nonProfessionFishers.length > 0) {
				for (let i = 0; i < maxQueue - questCount - 1 && i < Math.ceil(nonProfessionFishers.length / maxHeroCount); i++) {
					const sendNonProfessionHeroes = nonProfessionFishers.slice(sendProfessionHeroesCount, maxHeroCount + sendNonProfessionHeroesCount)
					const attemp = Math.floor(minStamina / 7)

					console.log(`sending (N) ${sendNonProfessionHeroes.map(heroObject => heroObject.id)} to fishing quest`)

					await new QuestCoreV2().startFishingQuest(sendNonProfessionHeroes.map(heroObject => heroObject.id), attemp);
					sendNonProfessionHeroesCount += sendNonProfessionHeroes.length
					questCount++
				}
			}
		} else {
			console.log("No fisher sent")
		}
	}
}
