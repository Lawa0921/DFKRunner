const autils = require('~/src/services/autils');
const config = require("../../config");

/*

questV1:
  {
    id: BN { negative: 0, words: [Array], length: 1, red: null },
    quest: '0xe4154B6E5D240507F9699C730a496790A722DF19',
    heroes: [ [BN] ],
    player: '0xA2FD1c90A8080142d27C49F3745602acF05a357D',
    startTime: BN { negative: 0, words: [Array], length: 2, red: null },
    startBlock: BN { negative: 0, words: [Array], length: 1, red: null },
    completeAtTime: BN { negative: 0, words: [Array], length: 2, red: null },
    attempts: '1',
    status: '1'
  }
questV2:
  {
    id: BN { negative: 0, words: [Array], length: 2, red: null },
    questAddress: '0xB465F4590095daD50FEe6Ee0B7c6700AC2b04dF8',
    level: '0',
    heroes: [ [BN], [BN], [BN] ],
    player: '0xA2FD1c90A8080142d27C49F3745602acF05a357D',
    startBlock: BN { negative: 0, words: [Array], length: 1, red: null },
    startAtTime: BN { negative: 0, words: [Array], length: 2, red: null },
    completeAtTime: BN { negative: 0, words: [Array], length: 2, red: null },
    attempts: '5',
    status: '1'
  }
*/
exports.questDataParser = (activeQuests) => {
  let returnValue = {
    leadQuesters: [],
    completedLeadQuesters: [],
    completedQuesters: [],
    allQuesters: [],
    foragingQuestCount: 0,
    fishingQuestCount: 0,
    statQuestStrCount: 0,
    statQuestDexCount: 0,
    statQuestAgiCount: 0,
    statQuestVitCount: 0,
    statQuestEndCount: 0,
    statQuestIntCount: 0,
    statQuestWisCount: 0,
    statQuestLukCount: 0,
  }

  activeQuests.forEach(quest => {
    returnValue.leadQuesters.push(quest.heroes[0].toString());
    let questCompletedDate = new Date(quest.completeAtTime * 1000)

    if (questCompletedDate < autils.getCurrentDateTime()) {
      returnValue.completedLeadQuesters.push(quest.heroes[0].toString());
      quest.heroes.forEach(heroId => {
        returnValue.completedQuesters.push(heroId.toString());
      })
    }
    quest.heroes.forEach(heroId => {
      returnValue.allQuesters.push(heroId.toString());
    })

    if (quest.questAddress) {
      if (quest.questAddress === config.defikingdoms.quest.fishing.contractAddress || quest.questAddress === config.klay.quest.fishing.contractAddress) {
        returnValue.fishingQuestCount ++
      } else if (quest.questAddress === config.defikingdoms.quest.foraging.contractAddress || quest.questAddress === config.klay.quest.foraging.contractAddress) {
        returnValue.foragingQuestCount ++
      } else if (quest.questAddress === config.defikingdoms.quest.statQuest.quests[0].contractAddress || quest.questAddress === config.klay.quest.statQuest.quests[0].contractAddress) {
        returnValue.statQuestStrCount ++
      } else if (quest.questAddress === config.defikingdoms.quest.statQuest.quests[1].contractAddress || quest.questAddress === config.klay.quest.statQuest.quests[1].contractAddress) {
        returnValue.statQuestDexCount ++
      } else if (quest.questAddress === config.defikingdoms.quest.statQuest.quests[2].contractAddress || quest.questAddress === config.klay.quest.statQuest.quests[2].contractAddress) {
        returnValue.statQuestAgiCount ++
      } else if (quest.questAddress === config.defikingdoms.quest.statQuest.quests[3].contractAddress || quest.questAddress === config.klay.quest.statQuest.quests[3].contractAddress) {
        returnValue.statQuestVitCount ++
      } else if (quest.questAddress === config.defikingdoms.quest.statQuest.quests[4].contractAddress || quest.questAddress === config.klay.quest.statQuest.quests[4].contractAddress) {
        returnValue.statQuestEndCount ++
      } else if (quest.questAddress === config.defikingdoms.quest.statQuest.quests[5].contractAddress || quest.questAddress === config.klay.quest.statQuest.quests[5].contractAddress) {
        returnValue.statQuestIntCount ++
      } else if (quest.questAddress === config.defikingdoms.quest.statQuest.quests[6].contractAddress || quest.questAddress === config.klay.quest.statQuest.quests[6].contractAddress) {
        returnValue.statQuestWisCount ++
      } else if (quest.questAddress === config.defikingdoms.quest.statQuest.quests[7].contractAddress || quest.questAddress === config.klay.quest.statQuest.quests[7].contractAddress) {
        returnValue.statQuestLukCount ++
      }
    }
  });

  return returnValue;
}
