const autils = require("~/src/services/autils");
const MeditationCircle = require('~/src/defikingdoms/contracts/meditationCircle');
const meditationCircleContract = new MeditationCircle();
const ShvasRune = require('~/src/defikingdoms/contracts/shvasRune');
const shvasRuneContract = new ShvasRune();
const MokshaRune = require('~/src/defikingdoms/contracts/mokshaRune');
const mokshaRuneContract = new MokshaRune();

exports.runDFKLevelUpLogic = async () => {
  const heroIds = autils.getDFKOwningHeroIds();
  const heroObjects = await autils.getHerosInfo(heroIds);
  const levelUpableHeros = heroObjects.filter(hero => hero.levelUpable());
  const activeMeditations = await meditationCircleContract.getActiveMeditations();

  if (activeMeditations.length > 0) {
    for (let i = 0; i < activeMeditations.length; i++) {
      const txn = await meditationCircleContract.completeMeditation(parseInt(activeMeditations[i].heroId))
      const res = await txn.wait();

      if (res.status === 1) {
        console.log(`level up ${parseInt(activeMeditations[i].heroId)} success!`)
      } else {
        console.log(`complete level up ${parseInt(activeMeditations[i].heroId)} failed`)
      }
    }
  }

  if (levelUpableHeros.length > 0) {
    for (let i = 0; i < levelUpableHeros.length; i++ ) {
      const shvasRuneBalanceOf = await shvasRuneContract.balanceOf();
      const mokshaRuneBalanceOf = await mokshaRuneContract.balanceOf();
      const [shvasRuneRequireCount, mokshaRuneRequireCount] = await meditationCircleContract.getRequiredRunes(levelUpableHeros[i].level);

      if (shvasRuneRequireCount > shvasRuneBalanceOf) {
        console.log(`shvasRune is not enough to level up the hero ${levelUpableHeros[i].id}`)
      } else if (mokshaRuneRequireCount > mokshaRuneBalanceOf) {
        console.log(`mokshaRune is not enough to level up the hero ${levelUpableHeros[i].id}`)
      } else {
        const [mainGrowth, subGrowth1, subGrowth2] = levelUpableHeros[i].growthStats();

        const startMeditationTxn = await meditationCircleContract.startMeditation(levelUpableHeros[i].id, mainGrowth, subGrowth1, subGrowth2);
        const startMeditationRes = await startMeditationTxn.wait();

        if (startMeditationRes.status === 1) {
          const completeMeditationTxn = await meditationCircleContract.completeMeditation(levelUpableHeros[i].id);
          const completeMeditationRes = await completeMeditationTxn.wait();

          if (completeMeditationRes.status === 1) {
            console.log(`level up ${levelUpableHeros[i].id} success!`)
          } else {
            console.log(`complete level up ${levelUpableHeros[i].id} failed`)
          }
        } else {
          console.log(`level up ${levelUpableHeros[i].id} failed`)
        }
      }
    }
  } else {
    console.log("No hero should level up")
  }
}
