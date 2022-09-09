const config = require("~/config.js");
const autils = require('~/src/services/autils')
const QuestCoreV2 = require('~/src/defikingdoms/contracts/questCoreV2');
const questCoreV2Contract = new QuestCoreV2();
const minStamina = 25;
const maxQueue = 6;

exports.CheckAndSendDFKStatQuests = async (heroesStruct) => {
  for (let i = 0; i < config.defikingdoms.quest.statQuests.length; i++) {
  	const questType = config.defikingdoms.quest.statQuests[i]

    if (questType.heroes.length !== 0) {
			const activeQuesterIds = heroesStruct.allQuesters
			const heroObjects = await autils.getHerosInfo(questType.heroes)
			const possibleHeroes = heroObjects.filter((heroObject) => { return activeQuesterIds.indexOf(heroObject.id) === -1 && heroObject.currentStamina() >= minStamina && heroObject.owner === config.walletAddress })
    
			if (possibleHeroes.length > 0) {
				if (isMaxAmountOfQuest(heroesStruct, questType)) {
					console.log(`${questType.name} queue has reached its maximum value.`)
				} else {
					for (let i = 0; i < possibleHeroes.length; i++) {
						console.log(`senting ${possibleHeroes[i].id} to ${questType.name}`);
						const attemp = Math.floor(possibleHeroes[i].currentStamina() / 5)
						await questCoreV2Contract.startStatQuest([possibleHeroes[i].id], attemp, questType.contractAddress, questType.name);
					}
				}
			}
		}
	}
}

isMaxAmountOfQuest = (heroesStruct, questType) => {
	switch(questType.name) {
		case "StatQuest_Str":
			return heroesStruct.statQuestStrCount >= maxQueue ? true : false
		case "StatQuest_Dex":
			return heroesStruct.statQuestDexCount >= maxQueue ? true : false
		case "StatQuest_Agi":
			return heroesStruct.statQuestAgiCount >= maxQueue ? true : false
		case "StatQuest_Vit":
			return heroesStruct.statQuestVitCount >= maxQueue ? true : false
		case "StatQuest_End":
			return heroesStruct.statQuestEndCount >= maxQueue ? true : false
		case "StatQuest_Int":
			return heroesStruct.statQuestIntCount >= maxQueue ? true : false
		case "StatQuest_Wis":
			return heroesStruct.statQuestWisCount >= maxQueue ? true : false
		case "StatQuest_Luk":
			return heroesStruct.statQuestLukCount >= maxQueue ? true : false
	}
}
