const autils = require("~/src/services/autils");
const MeditationCircle = require('~/src/harmony/contracts/meditationCircle');
const meditationCircleContract = new MeditationCircle();
const ShvasRune = require('~/src/harmony/contracts/shvasRune');
const shvasRuneContract = new ShvasRune();
const MokshaRune = require('~/src/harmony/contracts/mokshaRune');
const mokshaRuneContract = new MokshaRune();

exports.runLevelUpLogic = async () => {
  const heroIds = autils.getHarmonyOwningHeroIds();
  const heroObjects = await autils.getHerosInfo(heroIds);
  const levelUpableHeros = heroObjects.filter(hero => hero.levelUpable());
  const activeMeditations = await meditationCircleContract.getActiveMeditations();

  if (activeMeditations.length > 0) {
    for (let i = 0; i < activeMeditations.length; i++) {
      const { transaction } = await meditationCircleContract.completeMeditation(parseInt(activeMeditations[i].heroId));

      if (transaction.txStatus === "CONFIRMED") {
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

      if (parseInt(shvasRuneRequireCount) > parseInt(shvasRuneBalanceOf)) {
        console.log(`shvasRune is not enough to level up the hero ${levelUpableHeros[i].id}`)
      } else if (parseInt(mokshaRuneRequireCount) > parseInt(mokshaRuneBalanceOf)) {
        console.log(`mokshaRune is not enough to level up the hero ${levelUpableHeros[i].id}`)
      } else {
        const [mainGrowth, subGrowth1, subGrowth2] = levelUpableHeros[i].growthStats();

        const { transaction: startMeditationTxn } = await meditationCircleContract.startMeditation(levelUpableHeros[i].id, mainGrowth, subGrowth1, subGrowth2);
        if (startMeditationTxn.txStatus === "CONFIRMED") {
          const { transaction: completeMeditationTxn } = await meditationCircleContract.completeMeditation(levelUpableHeros[i].id);

          if (completeMeditationTxn.txStatus === "CONFIRMED") {
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
