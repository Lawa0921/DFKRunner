const config = require("~/config.js");
const autils = require('~/src/services/autils');
const KLAYDuelS2 = require('~/src/klay/contracts/DFKDuelS2')

exports.KLAYAutoDueler = async() => {
  if (config.klay.duelSetting.isActive) {
    const baseGasPrice = await autils.getKLAYBaseGasFee()
    console.log(`KLAY Current base gasPrice: ${baseGasPrice}`)
  
    if (baseGasPrice > config.klay.maxGasPrice) {
      console.log(`KLAY Current base gasPrice: ${baseGasPrice} is over then maxGasPrice setting: ${config.klay.maxGasPrice}, will retry later.`)
    } else {
      await KLAYAutoDuelScript(config.walletAddressAndPrivateKeyMappings[config.klay.duelSetting.autoDuelerWalletIndex])
    }
  }
}

getKLAYHeroDailyDuelAmount = (hero, duelRecords, currentBlockNumber) => {
  const oneDayBlock = 86400

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

KLAYAutoDuelScript = async (accountInfo) => {
  try {
		const KLAYDuelSetting = config.klay.duelSetting
    const KLAYDuelS2Contract = new KLAYDuelS2(accountInfo)
    const duelHeroAmount =  KLAYDuelS2Contract.duelType()[KLAYDuelSetting.type]
    const activeDuels = await KLAYDuelS2Contract.getActiveDuels().then(res => res.filter(duel => duel.player1Heroes.length === duelHeroAmount))
    const activeEntries = await KLAYDuelS2Contract.getPlayerDuelEntries().then(res => res.filter(entry => entry.heroes.length === duelHeroAmount))

    if (activeDuels.length > 0) {
      await Promise.allSettled(activeDuels.map(duel => KLAYDuelS2Contract.completeDuel((duel.id))))
    } else if (activeEntries.length > 0) {
      await KLAYDuelS2Contract.matchMake(KLAYDuelSetting.type)
    } else {
      const duelerHeroes = await autils.getHeroesInfoByIds(autils.getKLAYOwningHeroIds().filter(heroId => KLAYDuelSetting.notForDuelHeroes.indexOf(heroId) === -1))
      const duelRecords = await KLAYDuelS2Contract.getDuelHistory().then(res => 
        res.filter(duelHistory => duelHistory.player1Heroes.length === duelHeroAmount)
      )

      const currentBlockNumber = await KLAYDuelS2Contract.provider.getBlock().then((res) => { return res.number })
      const filteredDuelHeroes = duelerHeroes.filter((heroObject) => {
        return !heroObject.isOnSale &&
          heroObject.owner === accountInfo.walletAddress &&
          getKLAYHeroDailyDuelAmount(heroObject, duelRecords, currentBlockNumber) < KLAYDuelS2Contract.duelTypeDailyLimit()[KLAYDuelSetting.type]
      })

      if (filteredDuelHeroes.length < duelHeroAmount) {
        console.log(`Duelable hero amount not enough. duelType: ${KLAYDuelSetting.type}, currentDuelerAmount: ${filteredDuelHeroes.length}`)
      } else {
        const bounsClass = await KLAYDuelS2Contract.getCurrentClassBonuses()
        
        let duelers = []

        for (let i = 0; i < duelHeroAmount; i++) {
          const pickedHero = pickDueler(duelers, filteredDuelHeroes, bounsClass)

          console.log(`${pickedHero.instance.id} picked, statPower: ${pickedHero.pickScore}`)

          duelers.push(pickedHero.instance)
        }

        await KLAYDuelS2Contract.enterDuelLobby(
          KLAYDuelSetting.type,
          duelers.map(heroObject => heroObject.id),
          KLAYDuelSetting.fee,
          KLAYDuelS2Contract.getHeroesBestBackground(duelers),
          KLAYDuelS2Contract.getHeroesBestStat(duelers)
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