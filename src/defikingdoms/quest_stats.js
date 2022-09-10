const config = require("~/config.js");
const autils = require('~/src/services/autils')
const QuestCoreV2 = require('~/src/defikingdoms/contracts/questCoreV2');
const questCoreV2Contract = new QuestCoreV2();
const minStamina = 25;
const maxQueue = 6;

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
					for (let i = 0; i < maxQueue - questCount - 1 && i < possibleHeroes.length; i++) {
						console.log(`senting ${possibleHeroes[i].id} to ${questType.name}`);
						const attemp = Math.floor(possibleHeroes[i].currentStamina() / 5)
						await questCoreV2Contract.startStatQuest([possibleHeroes[i].id], attemp, questType.contractAddress, questType.name);
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
