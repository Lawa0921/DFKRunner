const autils = require('~/src/services/autils');
const config = require("~/config.js");

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
    completedQuesters: [],
    allQuesters: [],
    foragingQuestCount: 0,
    fishingQuestCount: 0
  }

  activeQuests.forEach(quest => {
    returnValue.leadQuesters.push(quest.heroes[0].toString());
    let questCompletedDate = new Date(quest.completeAtTime * 1000)

    if (questCompletedDate < autils.getCurrentDateTime()) {
      returnValue.completedQuesters.push(quest.heroes[0].toString());
    }
    quest.heroes.forEach(heroId => {
      returnValue.allQuesters.push(heroId.toString());
    })

    if (quest.questAddress) {
      if (quest.questAddress === config.harmony.quest.fishing.contract0xAddress || quest.questAddress === config.defikingdoms.quest.fishing.contractAddress) {
        returnValue.fishingQuestCount ++
      } else if (quest.questAddress === config.harmony.quest.foraging.contract0xAddress || quest.questAddress === config.defikingdoms.quest.foraging.contractAddress) {
        returnValue.foragingQuestCount ++
      }
    }
  });

  return returnValue;
}
