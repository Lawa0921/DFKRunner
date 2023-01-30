const PowerUpManager = require("./contracts/powerUpManager")
const autils = require('../services/autils');
const config = require("../../config")

exports.runDFKAssignPowerUp = async (owningHeroObjects, accountInfo) => {
  const powerUpManagerContract = new PowerUpManager(accountInfo)
  const userPowerUpDatas = await powerUpManagerContract.getUserPowerUpDataForActivePowerUps()
  const activeUserPowerUpDatas = userPowerUpDatas.filter(userPowerUpData => parseInt(userPowerUpData.openHeroSlots) > 0)

  for(let i = 0; i < activeUserPowerUpDatas.length; i++) {
    const assignedHeroIds = await powerUpManagerContract.getAssignedHeroIds(activeUserPowerUpDatas[i].powerUpId)

    let needAssignedHeroIds

    if (activeUserPowerUpDatas[i].powerUpId === "1") { // Quick Study
      needAssignedHeroIds = owningHeroObjects.filter((heroObject) => {
        return assignedHeroIds.indexOf(heroObject.id) === -1 &&
          config.defikingdoms.heroForSale.map(heroData => heroData.id).indexOf(heroObject.id) === -1 &&
          !heroObject.isOnQuesting &&
          heroObject.owner === accountInfo.walletAddress &&
          heroObject.network === "dfk"
      }).map(heroObject => heroObject.id)
    } else if (activeUserPowerUpDatas[i].powerUpId === "2") { // Rapid Renewal
      needAssignedHeroIds = owningHeroObjects.filter((heroObject) => {
        return assignedHeroIds.indexOf(heroObject.id) === -1 &&
          config.defikingdoms.heroForSale.map(heroData => heroData.id).indexOf(heroObject.id) === -1 &&
          autils.getDFK2fAndTrainingQuestHeroIds().indexOf(heroObject.id) > -1 &&
          !heroObject.isOnQuesting &&
          heroObject.owner === accountInfo.walletAddress &&
          heroObject.network === "dfk"
      }).map(heroObject => heroObject.id)
    }

    let assignHeroPromise = []

    for (let j = 0; j < parseInt(activeUserPowerUpDatas[i].openHeroSlots) && j < needAssignedHeroIds.length; j++) {
      assignHeroPromise.push(powerUpManagerContract.assignHero(activeUserPowerUpDatas[i].powerUpId, needAssignedHeroIds[j]))
    }

    await Promise.allSettled(assignHeroPromise)
  }
}