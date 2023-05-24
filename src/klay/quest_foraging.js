const config = require("../../config");
const autils = require('../services/autils');
const QuestCoreV3 = require('./contracts/questCoreV3');
const SaleAuction = require('./contracts/saleAuction');
const minStamina = config.klay.quest.foraging.minStamina;
const maxQueue = 5;
const maxHeroCount = 5;

exports.CheckAndSendKLAYForagers = async (heroesStruct, owningHeroObjects, accountInfo) => {
	if (heroesStruct.foragingQuestCount >= maxQueue) {
		console.log(`${accountInfo.accountName} KLAY foraging queue has reached its maximum value.`)
	} else {
		const questType = config.klay.quest.foraging
		const saleAuctionContract = new SaleAuction(accountInfo);
		const activeQuesterIds = heroesStruct.allQuesters
		const possibleForagers = owningHeroObjects.filter((heroObject) => { 
			return questType.heroes.indexOf(heroObject.id) > -1 && 
        activeQuesterIds.indexOf(heroObject.id) === -1 && 
        heroObject.currentStamina() >= minStamina && 
        heroObject.owner === accountInfo.walletAddress && 
        !heroObject.isOnQuesting &&
        heroObject.network === "kla"
		})
		const unsellPromise = possibleForagers.filter(heroObject => heroObject.isOnSale).map(onSaleHeroObject => saleAuctionContract.unlistHero(onSaleHeroObject.id))

		if (unsellPromise.length > 0) {
			await Promise.allSettled(unsellPromise)
			await autils.sleep(5000)
		}

		if (possibleForagers.length > 0) {
			const LV10professioForagers = possibleForagers.filter(heroObject => heroObject.profession === "foraging" && heroObject.foraging >= 100)
			const LV0professioForagers = possibleForagers.filter(heroObject => heroObject.profession === "foraging" && heroObject.foraging < 100)
			const LV10nonProfessioForagers = possibleForagers.filter(heroObject => heroObject.profession === "foraging" && heroObject.foraging >= 100)
			const LV0nonProfessioForagers = possibleForagers.filter(heroObject => heroObject.profession === "foraging" && heroObject.foraging < 100)

			let questCount = heroesStruct.foragingQuestCount
			let sendProfessionHeroesCount = 0
			let sendNonProfessionHeroesCount = 0;

			if (LV10professioForagers.length > 0) {
				for (let i = 0; i < maxQueue - questCount - 1 && i < Math.ceil(LV10professioForagers.length / maxHeroCount); i++) {
					const sendProfessionHeroes = LV10professioForagers.slice(sendProfessionHeroesCount, maxHeroCount + sendProfessionHeroesCount)
					const attemp = Math.floor(minStamina / 5)

					console.log(`${accountInfo.accountName} KLAY sending ${sendProfessionHeroes.map(heroObject => heroObject.id)} to LV 10 foraging quest`)

					await new QuestCoreV3(accountInfo).startForagingQuest(sendProfessionHeroes.map(heroObject => heroObject.id), attemp, 10);
					sendProfessionHeroesCount += sendProfessionHeroes.length
					questCount++
				}
			}

			if (LV0professioForagers.length > 0) {
				for (let i = 0; i < maxQueue - questCount - 1 && i < Math.ceil(LV0professioForagers.length / maxHeroCount); i++) {
					const sendProfessionHeroes = LV0professioForagers.slice(sendProfessionHeroesCount, maxHeroCount + sendProfessionHeroesCount)
					const attemp = Math.floor(minStamina / 5)

					console.log(`${accountInfo.accountName} KLAY sending ${sendProfessionHeroes.map(heroObject => heroObject.id)} to LV 0 foraging quest`)

					await new QuestCoreV3(accountInfo).startForagingQuest(sendProfessionHeroes.map(heroObject => heroObject.id), attemp, 0);
					sendProfessionHeroesCount += sendProfessionHeroes.length
					questCount++
				}
			}

			if (LV10nonProfessioForagers.length > 0) {
				for (let i = 0; i < maxQueue - questCount - 1 && i < Math.ceil(LV10nonProfessioForagers.length / maxHeroCount); i++) {
					const sendNonProfessionHeroes = LV10nonProfessioForagers.slice(sendProfessionHeroesCount, maxHeroCount + sendNonProfessionHeroesCount)
					const attemp = Math.floor(minStamina / 7)

					console.log(`${accountInfo.accountName} KLAY sending (N) ${sendNonProfessionHeroes.map(heroObject => heroObject.id)} to LV 10 foraging quest`)

					await new QuestCoreV3(accountInfo).startForagingQuest(sendNonProfessionHeroes.map(heroObject => heroObject.id), attemp, 10);
					sendNonProfessionHeroesCount += sendNonProfessionHeroes.length
					questCount++
				}
			}

			if (LV0nonProfessioForagers.length > 0) {
				for (let i = 0; i < maxQueue - questCount - 1 && i < Math.ceil(LV0nonProfessioForagers.length / maxHeroCount); i++) {
					const sendNonProfessionHeroes = LV0nonProfessioForagers.slice(sendProfessionHeroesCount, maxHeroCount + sendNonProfessionHeroesCount)
					const attemp = Math.floor(minStamina / 7)

					console.log(`${accountInfo.accountName} KLAY sending (N) ${sendNonProfessionHeroes.map(heroObject => heroObject.id)} to LV 0 foraging quest`)

					await new QuestCoreV3(accountInfo).startForagingQuest(sendNonProfessionHeroes.map(heroObject => heroObject.id), attemp, 0);
					sendNonProfessionHeroesCount += sendNonProfessionHeroes.length
					questCount++
				}
			}
		} else {
			console.log(`${accountInfo.accountName} KLAY no forager Sent`)
		}
	}
}
