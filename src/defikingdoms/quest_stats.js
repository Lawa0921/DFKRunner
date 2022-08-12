const config = require("~/config.js");
const QuestCoreV2 = require('~/src/defikingdoms/contracts/questCoreV2');
const questCoreV2Contract = new QuestCoreV2();

exports.CheckAndSendDFKStatQuests = async (heroesStruct) => {
    let counter = 0;
    while (counter < 8) {
        let questType = config.defikingdoms.quest.statQuests[counter]
        let maxBatch = 1;
        let minStam = questType.minStam

        let activeQuesters = heroesStruct.allQuesters;
        let questHeroes = questType.heroes;
        let possibleQuestHeroes = questHeroes.filter((e) => {
            return (activeQuesters.indexOf(e) < 0);
        });

        let staminaValues = [];
        for ( let i = 0; i < possibleQuestHeroes.length; i++ ) {
            staminaValues.push(questCoreV2Contract.getCurrentStamina(possibleQuestHeroes[i]));
        }
    
        staminaValues = await Promise.all(staminaValues);

        LocalBatching = []
        for (let index = 0; index < possibleQuestHeroes.length; index++) {
            const stam = staminaValues[index];
            if ( stam >= minStam ) {
                LocalBatching.push(possibleQuestHeroes[index]);
            }

            if (LocalBatching.length === maxBatch) {
                break;
            }
        }

        if (LocalBatching.length > 0) {
            while(LocalBatching.length < maxBatch) {
                LocalBatching.push(0)
            }
        }

        if (LocalBatching.length > 0) {
            console.log("senting " + LocalBatching + " to" + questType.name + " quest");
            await questCoreV2Contract.startStatQuest(LocalBatching, minStam / 5, questType.contractAddress, questType.name);
        } else {
            console.log(`No ${questType.name} hero sent`)
        }
        counter++;
    }
}
