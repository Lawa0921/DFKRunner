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
			const LV10professionFishers = possibleFishers.filter(heroObject => heroObject.profession === "fishing" && heroObject.fishing >= 100)
			const LV0professionFishers = possibleFishers.filter(heroObject => heroObject.profession === "fishing" && heroObject.fishing < 100)
			const LV10nonProfessionFishers = possibleFishers.filter(heroObject => heroObject.profession !== "fishing" && heroObject.fishing >= 100)
			const LV0nonProfessionFishers = possibleFishers.filter(heroObject => heroObject.profession !== "fishing" && heroObject.fishing < 100)

			let questCount = heroesStruct.fishingQuestCount
			let sendProfessionHeroesCount = 0
			let sendNonProfessionHeroesCount = 0;

			if (LV10professionFishers.length > 0) {
				for (let i = 0; i < maxQueue - questCount - 1 && i < Math.ceil(LV10professionFishers.length / maxHeroCount); i++) {
					const sendProfessionHeroes = LV10professionFishers.slice(sendProfessionHeroesCount, maxHeroCount + sendProfessionHeroesCount)
					const attemp = Math.floor(minStamina / 5)

					console.log(`${accountInfo.accountName} DFK sending ${sendProfessionHeroes.map(heroObject => heroObject.id)} to LV 10 fishing quest`)

					await new QuestCoreV3(accountInfo).startFishingQuest(sendProfessionHeroes.map(heroObject => heroObject.id), attemp, 10);
					sendProfessionHeroesCount += sendProfessionHeroes.length
					questCount++
				}
			}

			if (LV0professionFishers.length > 0) {
				for (let i = 0; i < maxQueue - questCount - 1 && i < Math.ceil(LV0professionFishers.length / maxHeroCount); i++) {
					const sendProfessionHeroes = LV0professionFishers.slice(sendProfessionHeroesCount, maxHeroCount + sendProfessionHeroesCount)
					const attemp = Math.floor(minStamina / 5)

					console.log(`${accountInfo.accountName} DFK sending ${sendProfessionHeroes.map(heroObject => heroObject.id)} to LV 0 fishing quest`)

					await new QuestCoreV3(accountInfo).startFishingQuest(sendProfessionHeroes.map(heroObject => heroObject.id), attemp, 0);
					sendProfessionHeroesCount += sendProfessionHeroes.length
					questCount++
				}
			}

			if (LV10nonProfessionFishers.length > 0) {
				for (let i = 0; i < maxQueue - questCount - 1 && i < Math.ceil(LV10nonProfessionFishers.length / maxHeroCount); i++) {
					const sendNonProfessionHeroes = LV10nonProfessionFishers.slice(sendProfessionHeroesCount, maxHeroCount + sendNonProfessionHeroesCount)
					const attemp = Math.floor(minStamina / 7)

					console.log(`${accountInfo.accountName} DFK sending (N) ${sendNonProfessionHeroes.map(heroObject => heroObject.id)} to LV 10 fishing quest`)

					await new QuestCoreV3(accountInfo).startFishingQuest(sendNonProfessionHeroes.map(heroObject => heroObject.id), attemp, 10);
					sendNonProfessionHeroesCount += sendNonProfessionHeroes.length
					questCount++
				}
			}

			if (LV0nonProfessionFishers.length > 0) {
				for (let i = 0; i < maxQueue - questCount - 1 && i < Math.ceil(LV0nonProfessionFishers.length / maxHeroCount); i++) {
					const sendNonProfessionHeroes = LV0nonProfessionFishers.slice(sendProfessionHeroesCount, maxHeroCount + sendNonProfessionHeroesCount)
					const attemp = Math.floor(minStamina / 7)

					console.log(`${accountInfo.accountName} DFK sending (N) ${sendNonProfessionHeroes.map(heroObject => heroObject.id)} to LV 0 fishing quest`)

					await new QuestCoreV3(accountInfo).startFishingQuest(sendNonProfessionHeroes.map(heroObject => heroObject.id), attemp, 0);
					sendNonProfessionHeroesCount += sendNonProfessionHeroes.length
					questCount++
				}
			}
		} else {
			console.log(`${accountInfo.accountName} DFK no fisher sent`)
		}
	}
}
