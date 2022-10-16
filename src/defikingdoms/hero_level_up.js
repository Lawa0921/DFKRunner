const MeditationCircle = require('~/src/defikingdoms/contracts/meditationCircle');
const ShvasRune = require('~/src/defikingdoms/contracts/shvasRune');
const MokshaRune = require('~/src/defikingdoms/contracts/mokshaRune');
const SaleAuction = require('~/src/defikingdoms/contracts/saleAuction');
const config = require("~/config.js")

exports.runDFKLevelUpLogic = async (owningHeroObjects, accountInfo) => {
  const saleAuctionContract = new SaleAuction(accountInfo);
  const meditationCircleContract = new MeditationCircle(accountInfo);
  const shvasRuneContract = new ShvasRune(accountInfo);
  const mokshaRuneContract = new MokshaRune(accountInfo);

  const activeMeditations = await meditationCircleContract.getActiveMeditations();
  const levelUpableHeros = owningHeroObjects.filter(hero => 
    config.defikingdoms.notForLevelHeroIds.indexOf(hero.id) === -1 &&
    hero.levelUpable() && 
    activeMeditations.map(activeMeditation => parseInt(activeMeditation.heroId).toString()).indexOf(hero.id) === -1 &&
    hero.owner === accountInfo.walletAddress
  );

  if (activeMeditations.length > 0) {
    for (let i = 0; i < activeMeditations.length; i++) {
      let heroObject = owningHeroObjects.find(heroObject => heroObject.id === parseInt(activeMeditations[i].heroId).toString())

      if (heroObject.isOnSale && heroObject.owner === accountInfo.walletAddress) {
        await saleAuctionContract.unlistHero(heroObject.id)
      }
      
      if (heroObject.isOnQuesting) {
        continue
      }

      const txn = await meditationCircleContract.completeMeditation(parseInt(activeMeditations[i].heroId))
      const res = await txn.wait();

      if (res.status === 1) {
        console.log(`${accountInfo.accountName} level up ${parseInt(activeMeditations[i].heroId)} success!`)
      } else {
        console.log(`${accountInfo.accountName} complete level up ${parseInt(activeMeditations[i].heroId)} failed`)
      }
    }
  }

  if (levelUpableHeros.length > 0) {
    for (let i = 0; i < levelUpableHeros.length; i++ ) {
      const shvasRuneBalanceOf = await shvasRuneContract.balanceOf();
      const mokshaRuneBalanceOf = await mokshaRuneContract.balanceOf();
      const [shvasRuneRequireCount, mokshaRuneRequireCount] = await meditationCircleContract.getRequiredRunes(levelUpableHeros[i].level);

      if (parseInt(shvasRuneRequireCount) > parseInt(shvasRuneBalanceOf)) {
        console.log(`${accountInfo.accountName} shvasRune is not enough to level up the hero ${levelUpableHeros[i].id}`)
      } else if (parseInt(mokshaRuneRequireCount) > parseInt(mokshaRuneBalanceOf)) {
        console.log(`${accountInfo.accountName} mokshaRune is not enough to level up the hero ${levelUpableHeros[i].id}`)
      } else {
        const [mainGrowth, subGrowth1, subGrowth2] = levelUpableHeros[i].growthStats();

        const startMeditationTxn = await meditationCircleContract.startMeditation(levelUpableHeros[i].id, mainGrowth, subGrowth1, subGrowth2);
        const startMeditationRes = await startMeditationTxn.wait();

        if (startMeditationRes.status === 1) {
          const completeMeditationTxn = await meditationCircleContract.completeMeditation(levelUpableHeros[i].id);
          const completeMeditationRes = await completeMeditationTxn.wait();

          if (completeMeditationRes.status === 1) {
            console.log(`${accountInfo.accountName} level up ${levelUpableHeros[i].id} success!`)
          } else {
            console.log(`${accountInfo.accountName} complete level up ${levelUpableHeros[i].id} failed`)
          }
        } else {
          console.log(`${accountInfo.accountName} level up ${levelUpableHeros[i].id} failed`)
        }
      }
    }
  } else {
    console.log(`${accountInfo.accountName} no hero should level up`)
  }
}
