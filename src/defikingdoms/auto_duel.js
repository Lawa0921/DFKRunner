const config = require("../../config");
const autils = require('../services/autils');
const DFKDuelS2 = require('./contracts/DFKDuelS2')

exports.DFKAutoDueler = async() => {
  if (config.defikingdoms.duelSetting.isActive) { 
    const baseGasPrice = await autils.getDFKBaseGasFee()
    console.log(`DFK Current base gasPrice: ${baseGasPrice}`)
  
    if (baseGasPrice > config.defikingdoms.maxGasPrice) {
      console.log(`DFK Current base gasPrice: ${baseGasPrice} is over then maxGasPrice setting: ${config.defikingdoms.maxGasPrice}, will retry later.`)
    } else {
      await DFKAutoDuelScript(config.walletAddressAndPrivateKeyMappings[config.defikingdoms.duelSetting.autoDuelerWalletIndex])
    }
  }
}

getDFKHeroDailyDuelAmount = (hero, duelRecords, currentBlockNumber) => {
  const oneDayBlock = 43200

  const heroDuelTypeAmount = duelRecords.filter((duelRecord) => {
    return duelRecord.startBlock >= currentBlockNumber - oneDayBlock &&
      duelRecord.player1Heroes.indexOf(hero.id) > -1 ||
      duelRecord.player2Heroes.indexOf(hero.id) > -1 
  }).length

  
  return heroDuelTypeAmount
}

pickDueler = (currentDuelers, waitingForPickDuelers, bounsClass) => {
  const heroObjects = waitingForPickDuelers.filter((heroObject) => currentDuelers.map(dueler => dueler.id).indexOf(heroObject.id) === -1).map((heroObject) => {
    return {
      instance: heroObject,
      pickScore: heroObject.duelPickScore(currentDuelers, bounsClass)
    }
  }).sort((heroInfo, nextHeroInfo) => {
    return nextHeroInfo.pickScore - heroInfo.pickScore
  })

  return heroObjects[0]
}

DFKAutoDuelScript = async (accountInfo) => {
  try {
		const DFKDuelSetting = config.defikingdoms.duelSetting
    const DFKDuelS2Contract = new DFKDuelS2(accountInfo)
    const duelHeroAmount =  DFKDuelS2Contract.duelType()[DFKDuelSetting.type]
    const activeDuels = await DFKDuelS2Contract.getActiveDuels().then(res => res.filter(duel => duel.player1Heroes.length === duelHeroAmount))
    const activeEntries = await DFKDuelS2Contract.getPlayerDuelEntries().then(res => res.filter(entry => entry.heroes.length === duelHeroAmount))

    if (activeDuels.length > 0) {
      await Promise.allSettled(activeDuels.map(duel => DFKDuelS2Contract.completeDuel((duel.id))))
    } else if (activeEntries.length > 0) {
      await DFKDuelS2Contract.matchMake(DFKDuelSetting.type)
    } else {
      const duelerHeroes = await autils.getHeroesInfoByIds(autils.getDFKOwningHeroIds().filter(heroId => DFKDuelSetting.notForDuelHeroes.indexOf(heroId) === -1))
      const duelRecords = await DFKDuelS2Contract.getDuelHistory().then(res => 
        res.filter(duelHistory => duelHistory.player1Heroes.length === duelHeroAmount)
      )

      const currentBlockNumber = await DFKDuelS2Contract.provider.getBlock().then((res) => { return res.number })
      const filteredDuelHeroes = duelerHeroes.filter((heroObject) => {
        return !heroObject.isOnSale &&
          heroObject.owner === accountInfo.walletAddress &&
          getDFKHeroDailyDuelAmount(heroObject, duelRecords, currentBlockNumber) < DFKDuelS2Contract.duelTypeDailyLimit()[DFKDuelSetting.type]
      })

      if (filteredDuelHeroes.length < duelHeroAmount) {
        console.log(`Duelable hero amount not enough. duelType: ${DFKDuelSetting.type}, currentDuelerAmount: ${filteredDuelHeroes.length}`)
      } else {
        const bounsClass = await DFKDuelS2Contract.getCurrentClassBonuses()
        
        let duelers = []

        for (let i = 0; i < duelHeroAmount; i++) {
          const pickedHero = pickDueler(duelers, filteredDuelHeroes, bounsClass)

          console.log(`${pickedHero.instance.id} picked, statPower: ${pickedHero.pickScore}`)

          duelers.push(pickedHero.instance)
        }

        await DFKDuelS2Contract.enterDuelLobby(
          DFKDuelSetting.type,
          duelers.map(heroObject => heroObject.id),
          DFKDuelSetting.fee,
          DFKDuelS2Contract.getHeroesBestBackground(duelers),
          DFKDuelS2Contract.getHeroesBestStat(duelers)
        )
      }
    }
		
    console.log(`--- ${accountInfo.accountName} auto dueler process completed ---`)
  } catch(error) {
    console.log(`fail reason: ${error.reason}`)
    console.log(`error code: ${error.code}`)
    console.log(`error message: ${error}`)
    process.exit();
  }
}