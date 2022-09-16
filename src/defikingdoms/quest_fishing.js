const config = require("~/config.js");
const autils = require('~/src/services/autils');
const QuestCoreV2 = require('~/src/defikingdoms/contracts/questCoreV2');
const questCoreV2Contract = new QuestCoreV2();
const SaleAuction = require('~/src/defikingdoms/contracts/saleAuction');
const saleAuctionContract = new SaleAuction();
const minStamina = 25;
const maxQueue = 6;

exports.CheckAndSendDFKFishers = async (heroesStruct, owningHeroObjects) => {
	if (heroesStruct.fishingQuestCount >= maxQueue) {
		console.log("fishing queue has reached its maximum value.")
	} else {
		const questType = config.defikingdoms.quest.fishing
		const activeQuesterIds = heroesStruct.allQuesters
		const possibleFishers = owningHeroObjects.filter((heroObject) => { 
			return questType.heroes.indexOf(heroObject.id) > -1 && activeQuesterIds.indexOf(heroObject.id) === -1 && heroObject.currentStamina() >= minStamina && heroObject.owner === config.walletAddress
		})
	
		if (possibleFishers.length > 0) {
			for (let i = 0; i < maxQueue - heroesStruct.fishingQuestCount - 1 && i < possibleFishers.length; i++) {
				console.log(`senting ${possibleFishers[i].id} to fishing quest`);

				if (possibleFishers[i].isOnSale) {
					await saleAuctionContract.unlistHero(possibleFishers[i].id)
				}

				const attemp = possibleFishers[i].profession === "fishing" ? Math.floor(possibleFishers[i].currentStamina() / 5) : Math.floor(possibleFishers[i].currentStamina() / 7)
				await questCoreV2Contract.startFishingQuest([possibleFishers[i].id], attemp);
			}
		} else {
			console.log("No fisher sent")
		}
	}
}
