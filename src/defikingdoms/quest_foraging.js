const config = require("~/config.js");
const autils = require('~/src/services/autils');
const QuestCoreV2 = require('~/src/defikingdoms/contracts/questCoreV2');
const SaleAuction = require('~/src/defikingdoms/contracts/saleAuction');
const saleAuctionContract = new SaleAuction();
const minStamina = 25;
const maxQueue = 10;
const maxHeroCount = 6;

exports.CheckAndSendDFKForagers = async (heroesStruct, owningHeroObjects, accountInfo) => {
	if (heroesStruct.foragingQuestCount >= maxQueue) {
		console.log("foraging queue has reached its maximum value.")
	} else {
		const questType = config.defikingdoms.quest.foraging
		const activeQuesterIds = heroesStruct.allQuesters
		const possibleForagers = owningHeroObjects.filter((heroObject) => { 
			return questType.heroes.indexOf(heroObject.id) > -1 && activeQuesterIds.indexOf(heroObject.id) === -1 && heroObject.currentStamina() >= minStamina && heroObject.owner === config.walletAddress
		})
		const unsellPromise = possibleForagers.filter(heroObject => heroObject.isOnSale).map(onSaleHeroObject => saleAuctionContract.unlistHero(onSaleHeroObject.id))

		if (unsellPromise.length > 0) {
			await Promise.allSettled(unsellPromise)
			await autils.sleep(5000)
		}

		if (possibleForagers.length > 0) {
			const professioForagers = possibleForagers.filter(heroObject => heroObject.profession === "foraging")
			const nonProfessioForagers = possibleForagers.filter(heroObject => heroObject.profession !== "foraging")

			let questCount = heroesStruct.foragingQuestCount
			let sendProfessionHeroesCount = 0
			let sendNonProfessionHeroesCount = 0;

			if (professioForagers.length > 0) {
				for (let i = 0; i < maxQueue - questCount - 1 && i < Math.ceil(professioForagers.length / maxHeroCount); i++) {
					const sendProfessionHeroes = professioForagers.slice(sendProfessionHeroesCount, maxHeroCount + sendProfessionHeroesCount)
					const attemp = Math.floor(minStamina / 5)

					console.log(`sending ${sendProfessionHeroes.map(heroObject => heroObject.id)} to foraging quest`)

					await new QuestCoreV2(accountInfo).startForagingQuest(sendProfessionHeroes.map(heroObject => heroObject.id), attemp);
					sendProfessionHeroesCount += sendProfessionHeroes.length
					questCount++
				}
			}

			if (nonProfessioForagers.length > 0) {
				for (let i = 0; i < maxQueue - questCount - 1 && i < Math.ceil(nonProfessioForagers.length / maxHeroCount); i++) {
					const sendNonProfessionHeroes = nonProfessioForagers.slice(sendProfessionHeroesCount, maxHeroCount + sendNonProfessionHeroesCount)
					const attemp = Math.floor(minStamina / 7)

					console.log(`sending (N) ${sendNonProfessionHeroes.map(heroObject => heroObject.id)} to foraging quest`)

					await new QuestCoreV2().startForagingQuest(sendNonProfessionHeroes.map(heroObject => heroObject.id), attemp);
					sendNonProfessionHeroesCount += sendNonProfessionHeroes.length
					questCount++
				}
			}
		} else {
			console.log("No Forager Sent")
		}
	}
}
