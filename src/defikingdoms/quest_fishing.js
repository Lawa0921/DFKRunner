const config = require("../../config");
const autils = require('../services/autils');
const QuestCoreV3 = require('./contracts/questCoreV3');
const SaleAuction = require('./contracts/saleAuction');
const minStamina = config.defikingdoms.quest.fishing.minStamina;
const maxQueue = 10;
const maxHeroCount = 6;

exports.CheckAndSendDFKFishers = async (heroesStruct, owningHeroObjects, accountInfo) => {
	if (heroesStruct.fishingQuestCount >= maxQueue) {
		console.log(`${accountInfo.accountName} DFK fishing queue has reached its maximum value.`)
	} else {
		const questType = config.defikingdoms.quest.fishing
		const activeQuesterIds = heroesStruct.allQuesters
		const saleAuctionContract = new SaleAuction(accountInfo);
		const possibleFishers = owningHeroObjects.filter((heroObject) => { 
			return questType.heroes.indexOf(heroObject.id) > -1 && 
        activeQuesterIds.indexOf(heroObject.id) === -1 && 
        heroObject.currentStamina() >= minStamina && 
        heroObject.owner === accountInfo.walletAddress && 
        !heroObject.isOnQuesting &&
        heroObject.network === "dfk"
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

					console.log(`${accountInfo.accountName} DFK sending ${sendProfessionHeroes.map(heroObject => heroObject.id)} to fishing quest`)

					await new QuestCoreV3(accountInfo).startFishingQuest(sendProfessionHeroes.map(heroObject => heroObject.id), attemp);
					sendProfessionHeroesCount += sendProfessionHeroes.length
					questCount++
				}
			}

			if (nonProfessionFishers.length > 0) {
				for (let i = 0; i < maxQueue - questCount - 1 && i < Math.ceil(nonProfessionFishers.length / maxHeroCount); i++) {
					const sendNonProfessionHeroes = nonProfessionFishers.slice(sendProfessionHeroesCount, maxHeroCount + sendNonProfessionHeroesCount)
					const attemp = Math.floor(minStamina / 7)

					console.log(`${accountInfo.accountName} DFK sending (N) ${sendNonProfessionHeroes.map(heroObject => heroObject.id)} to fishing quest`)

					await new QuestCoreV3(accountInfo).startFishingQuest(sendNonProfessionHeroes.map(heroObject => heroObject.id), attemp);
					sendNonProfessionHeroesCount += sendNonProfessionHeroes.length
					questCount++
				}
			}
		} else {
			console.log(`${accountInfo.accountName} DFK no fisher sent`)
		}
	}
}
