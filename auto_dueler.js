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
	await autils.sleep(config.setDuelScriptTimeSecond * 1000)

  process.exit()
}

autoDuelScript = async (accountInfo) => {
  try {
		const DFKDuelSetting = config.defikingdoms.duelSetting.filter(duelSetting => duelSetting.isActive && duelSetting.heroes.length > 0)[0]
		
		if (typeof(DFKDuelSetting) !== "undefined") {
			const DFKDuelS2Contract = new DFKDuelS2(accountInfo)
			const activeDuels = await DFKDuelS2Contract.getActiveDuels().then(res => res.filter(duel => duel.player1Heroes.length === DFKDuelS2Contract.duelType()[DFKDuelSetting.type]))
			const activeEntries = await DFKDuelS2Contract.getPlayerDuelEntries().then(res => res.filter(entry => entry.heroes.length === DFKDuelS2Contract.duelType()[DFKDuelSetting.type]))

			if (activeDuels.length > 0) {
				await Promise.allSettled(activeDuels.map(duel => DFKDuelS2Contract.completeDuel((duel.id))))
			} else if (activeEntries.length > 0) {
				await DFKDuelS2Contract.matchMake(DFKDuelSetting.type)
			} else {
				const duelerHeroes = await Promise.allSettled(DFKDuelSetting.heroes.map(heroIds => autils.getHeroesInfoByIds(heroIds))).then((res) => res.map(promiseResult => promiseResult.value))
				let duelHeroes

				if (duelerHeroes.length === 1) {
					duelHeroes = duelerHeroes[0]
				} else {
					const DuelRecords = await DFKDuelS2Contract.getDuelHistory().then(res => 
						res.filter(duelHistory => duelHistory.player1Heroes.length === DFKDuelS2Contract.duelType()[DFKDuelSetting.type])
					)
					if (DuelRecords.length === 0) {
						duelHeroes = duelerHeroes[Math.floor(Math.random() * duelerHeroes.length)]
					} else {
						const lastDuelRecord = DuelRecords[0]
						const lastDuelTeam = duelerHeroes.find(heroObjects => 
							heroObjects.filter(heroObject => lastDuelRecord.player1Heroes.indexOf(heroObject.id) > -1).length === DFKDuelS2Contract.duelType()[DFKDuelSetting.type]
						)

						if (typeof(lastDuelTeam) === "undefined") {
							duelHeroes = duelerHeroes[Math.floor(Math.random() * duelerHeroes.length)]
						} else if(lastDuelRecord.winner === accountInfo.walletAddress) {
							duelHeroes = lastDuelTeam
						} else {
							const duelerHeroesObjects = duelerHeroes.filter(heroObjects => 
								heroObjects.filter(heroObject => lastDuelTeam.indexOf(heroObject) > -1).length !== DFKDuelS2Contract.duelType()[DFKDuelSetting.type]
							)
							duelHeroes = duelerHeroesObjects[Math.floor(Math.random() * duelerHeroesObjects.length)]
						}
					}
				}
				
				await DFKDuelS2Contract.enterDuelLobby(
					DFKDuelSetting.type,
					duelHeroes.map(heroObject => heroObject.id),
					DFKDuelSetting.fee,
					DFKDuelS2Contract.getHeroesBestBackground(duelHeroes),
					DFKDuelS2Contract.getHeroesBestStat(duelHeroes)
				)
			}
		}
		
    console.log(`--- ${accountInfo.accountName} auto dueler process completed ---`)
  } catch(error) {
    console.log(`fail reason: ${error.reason}`)
    console.log(`error code: ${error.code}`)
    console.log(`error message: ${error.message}`)
    process.exit();
  }
}

main()