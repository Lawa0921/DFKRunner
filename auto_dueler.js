const config = require("~/config.js");
const autils = require('~/src/services/autils');
const DFKDuelS2 = require('~/src/defikingdoms/contracts/DFKDuelS2')

main = async() => {
	console.log(autils.getCurrentDateTime().toLocaleTimeString());
	setTimeout(() => { process.exit() }, 300000) // 如果執行 script 超過 300 秒會自動中斷重啟，此為防治卡死的手段
	const baseGasPrice = await autils.getDFKBaseGasFee()
	console.log(`DFK Current base gasPrice: ${baseGasPrice}`)

	if (baseGasPrice > config.defikingdoms.maxGasPrice) {
		console.log(`DFK Current base gasPrice: ${baseGasPrice} is over then maxGasPrice setting: ${config.defikingdoms.maxGasPrice}, will retry later.`)
	} else {
		await autoDuelScript(config.walletAddressAndPrivateKeyMappings[config.autoDuelerWalletIndex])
	}
	await autils.sleep(config.defikingdoms.duelSetting.setDuelScriptTimeSecond * 1000)

  process.exit()
}

getHeroDailyDuelAmount = async(hero, duelRecords, duelType) => {
  // to do
}

getLeadHero = async(heroes, bounsClass) => {
  // to do
}

pickDueler = async(currentDuelers, waitingForPickDuelers, duelRecords, bounsClass) => {
  // to do
}

autoDuelScript = async (accountInfo) => {
  try {
		const DFKDuelSetting = config.defikingdoms.newDuelSetting
    const DFKDuelS2Contract = new DFKDuelS2(accountInfo)
    const duelHeroAmount =  DFKDuelS2Contract.duelType()[DFKDuelSetting.type]
    const activeDuels = await DFKDuelS2Contract.getActiveDuels().then(res => res.filter(duel => duel.player1Heroes.length === duelHeroAmount))
    const activeEntries = await DFKDuelS2Contract.getPlayerDuelEntries().then(res => res.filter(entry => entry.heroes.length === duelHeroAmount))

    if (activeDuels.length > 0) {
      await Promise.allSettled(activeDuels.map(duel => DFKDuelS2Contract.completeDuel((duel.id))))
    } else if (activeEntries.length > 0) {
      await DFKDuelS2Contract.matchMake(DFKDuelSetting.type)
    } else {
      const duelerHeroes = await autils.getHeroesInfoByIds(DFKDuelSetting.heroes)
      const duelRecords = await DFKDuelS2Contract.getDuelHistory().then(res => 
        res.filter(duelHistory => duelHistory.player1Heroes.length === duelHeroAmount)
      )

      const filteredDuelHeroes = duelerHeroes.filter((heroObject) => {
        return !heroObject.isOnSale &&
          heroObject.owner === accountInfo.walletAddress &&
          getHeroDailyDuelAmount(heroObject, duelRecords, DFKDuelSetting.type) < DFKDuelS2Contract.duelTypeDailyLimit()[DFKDuelSetting.type]
      })

      if (filteredDuelHeroes.length < duelHeroAmount) {
        console.log(`Duelable hero amount not enough. duelType: ${DFKDuelSetting.type}, currentDuelerAmount: ${filteredDuelHeroes.length}`)
      } else {
        const bounsClass = await DFKDuelS2Contract.getCurrentClassBonuses()
        
        let leadHero = getLeadHero(filteredDuelHeroes, bounsClass)
        let duelers = [leadHero]

        for (let i = 0; i < duelHeroAmount - 1; i++) {
          duelers.push(pickDueler(duelers, filteredDuelHeroes, duelRecords, bounsClass))
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

main()