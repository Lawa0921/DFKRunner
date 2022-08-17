const autils = require('~/src/services/autils');

exports.heroDataParse = function heroDataParse(activeQuests) {
  let leadQuestersArray = [];
  let allQuestersArray = [];
  let completedQuestsArray = [];
  let completedQuestersCountArray = []

  activeQuests.forEach(element => {
    leadQuestersArray.push(element.heroes[0].toString());
    let questCompletedDate = new Date(element.completeAtTime * 1000)

    if (questCompletedDate < autils.getCurrentDateTime()) {
      completedQuestsArray.push(element.heroes[0].toString());
      completedQuestersCountArray.push(element.heroes.length);
    }
    element.heroes.forEach(hero => {
      allQuestersArray.push(hero.toString());
    })
  });

  let rv = {
    leadQuesters: leadQuestersArray,
    allQuesters: allQuestersArray,
    completedQuesters: completedQuestsArray,
    completedQuestersCount: completedQuestersCountArray
  }
  return rv;
}
