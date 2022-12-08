const MeditationCircle = require('~/src/klay/contracts/meditationCircle');
const InventoryItem = require('~/src/klay/contracts/inventoryItem');
const SaleAuction = require('~/src/klay/contracts/saleAuction');
const Jade = require('~/src/klay/contracts/jade');
const config = require("~/config.js")
const ethers = require('ethers');

exports.runKLAYLevelUpLogic = async (owningHeroObjects, accountInfo) => {
  const saleAuctionContract = new SaleAuction(accountInfo);
  const meditationCircleContract = new MeditationCircle(accountInfo);
  const shvasRuneContract = new InventoryItem(accountInfo, config.klay.shvasRune);
  const mokshaRuneContract = new InventoryItem(accountInfo, config.klay.mokshaRune);
  const jadeContract = new Jade(accountInfo);

  const activeMeditations = await meditationCircleContract.getActiveMeditations();
  const levelUpableHeros = owningHeroObjects.filter(hero => 
    config.klay.notForLevelUpHeroIds.indexOf(hero.id) === -1 &&
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
        console.log(`${accountInfo.accountName} KLAY level up ${parseInt(activeMeditations[i].heroId)} success!`)
      } else {
        console.log(`${accountInfo.accountName} KLAY complete level up ${parseInt(activeMeditations[i].heroId)} failed`)
      }
    }
  }

  if (levelUpableHeros.length > 0) {
    for (let i = 0; i < levelUpableHeros.length; i++ ) {
      const shvasRuneBalanceOf = await shvasRuneContract.balanceOf();
      const shvasRuneAllowance = await shvasRuneContract.allowance(config.klay.meditationCircle);
      const mokshaRuneBalanceOf = await mokshaRuneContract.balanceOf();
      const mokshaRuneAllowance = await mokshaRuneContract.allowance(config.klay.meditationCircle)
      const jadeAllowance = await jadeContract.allowance(config.klay.meditationCircle)
      const [shvasRuneRequireCount, mokshaRuneRequireCount] = await meditationCircleContract.getRequiredRunes(levelUpableHeros[i].level);

      if (shvasRuneAllowance < shvasRuneRequireCount) {
        await shvasRuneContract.approve(config.klay.meditationCircle, ethers.constants.MaxUint256)
      }
      if (mokshaRuneAllowance < mokshaRuneRequireCount) {
        await mokshaRuneContract.approve(config.klay.meditationCircle, ethers.constants.MaxUint256)
      }
      if (jadeAllowance === 0) {
        await jadeContract.approve(config.klay.meditationCircle, ethers.constants.MaxUint256)
      }

      if (parseInt(shvasRuneRequireCount) > parseInt(shvasRuneBalanceOf)) {
        console.log(`${accountInfo.accountName} KLAY shvasRune is not enough to level up the hero ${levelUpableHeros[i].id}`)
      } else if (parseInt(mokshaRuneRequireCount) > parseInt(mokshaRuneBalanceOf)) {
        console.log(`${accountInfo.accountName} KLAY mokshaRune is not enough to level up the hero ${levelUpableHeros[i].id}`)
      } else {
        const [mainGrowth, subGrowth1, subGrowth2] = levelUpableHeros[i].growthStats();

        const startMeditationTxn = await meditationCircleContract.startMeditation(levelUpableHeros[i].id, mainGrowth, subGrowth1, subGrowth2);
        const startMeditationRes = await startMeditationTxn.wait();

        if (startMeditationRes.status === 1) {
          const completeMeditationTxn = await meditationCircleContract.completeMeditation(levelUpableHeros[i].id);
          const completeMeditationRes = await completeMeditationTxn.wait();

          if (completeMeditationRes.status === 1) {
            console.log(`${accountInfo.accountName} KLAY level up ${levelUpableHeros[i].id} success!`)
          } else {
            console.log(`${accountInfo.accountName} KLAY complete level up ${levelUpableHeros[i].id} failed`)
          }
        } else {
          console.log(`${accountInfo.accountName} KLAY level up ${levelUpableHeros[i].id} failed`)
        }
      }
    }
  } else {
    console.log(`${accountInfo.accountName} KLAY no hero should level up`)
  }
}