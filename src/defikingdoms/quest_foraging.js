const config = require("~/config.js");
const autils = require('~/src/services/autils');
const QuestCoreV2 = require('~/src/defikingdoms/contracts/questCoreV2');
const questCoreV2Contract = new QuestCoreV2();
const SaleAuction = require('~/src/defikingdoms/contracts/saleAuction');
const saleAuctionContract = new SaleAuction();
const minStamina = 25;
const maxQueue = 6;

exports.CheckAndSendDFKForagers = async (heroesStruct, owningHeroObjects) => {
	if (heroesStruct.foragingQuestCount >= maxQueue) {
		console.log("foraging queue has reached its maximum value.")
	} else {
		const questType = config.defikingdoms.quest.foraging
		const activeQuesterIds = heroesStruct.allQuesters
		const possibleForagers = owningHeroObjects.filter((heroObject) => { 
			return questType.heroes.indexOf(heroObject.id) > -1 && activeQuesterIds.indexOf(heroObject.id) === -1 && heroObject.currentStamina() >= minStamina && heroObject.owner === config.walletAddress
		})

		if (possibleForagers.length > 0) {
			for (let i = 0; i < maxQueue - heroesStruct.foragingQuestCount - 1 && i < possibleForagers.length; i++) {
				console.log(`senting ${possibleForagers[i].id} to foraging quest`);

				if (possibleForagers[i].isOnSale) {
					await saleAuctionContract.unlistHero(possibleForagers[i].id)
				}

				const attemp = possibleForagers[i].profession === "foraging" ? Math.floor(possibleForagers[i].currentStamina() / 5) : Math.floor(possibleForagers[i].currentStamina() / 7)
				await questCoreV2Contract.startForagingQuest([possibleForagers[i].id], attemp);
			}
		} else {
			console.log("No Forager Sent")
		}
	}
}
