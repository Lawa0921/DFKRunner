const config = require('~/config.js')

exports.heroDataParse = function heroDataParse(activeQuests) {
  let leadQuestersArray = [];
  let allQuestersArray = [];
  let completedQuestsArray = [];
  let completedQuestersCountArray = []

  const listOfOnSaleHeroes = config.defikingdoms.heroForSale.map((heroObject) => heroObject = heroObject.id );

  activeQuests.forEach(element => {
    leadQuestersArray.push(element.heroes[0].toString());
    let questCompletedDate = new Date(element.completeAtTime * 1000)

    const useRealTime = (listOfOnSaleHeroes.findIndex(heroOnSale => element.heroes[0].toString() === heroOnSale) !== -1) ? true : false;
    if (questCompletedDate < GetCurrentDateTime(useRealTime)) {
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
