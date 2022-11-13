const config = require("~/config.js");
const autils = require('~/src/services/autils');
const DFKDuelS1 = require('~/src/defikingdoms/contracts/DFKDuelS1')

main = async() => {
	console.log(autils.getCurrentDateTime().toLocaleTimeString());
	setTimeout(() => { process.exit() }, 300000) // 如果執行 script 超過 300 秒會自動中斷重啟，此為防治卡死的手段

	await autoDuelScript(config.walletAddressAndPrivateKeyMappings[config.autoDuelerWalletIndex])
  await autils.sleep(config.setDuelScriptTimeSecond * 1000)

  process.exit()
}

autoDuelScript = async (accountInfo) => {
  try {
		const DFKDuelSetting = config.defikingdoms.duelSetting.filter(duelSetting => duelSetting.isActive && duelSetting.heroes.length > 0)
		
		for (let i = 0; i < DFKDuelSetting.length; i++) {
			const DFKDuelS1Contract = new DFKDuelS1(accountInfo)
			const activeDuels = await DFKDuelS1Contract.getActiveDuels().then(res => res.filter(duel => duel.player1Heroes.length === DFKDuelS1Contract.duelType()[DFKDuelSetting[i].type]))
			const activeEntries = await DFKDuelS1Contract.getPlayerDuelEntries().then(res => res.filter(entry => entry.heroes.length === DFKDuelS1Contract.duelType()[DFKDuelSetting[i].type]))

			if (activeDuels.length > 0) {
				await Promise.allSettled(activeDuels.map(duel => DFKDuelS1Contract.completeDuel((duel.id))))
			} else if (activeEntries.length > 0) {
				await DFKDuelS1Contract.matchMake(DFKDuelSetting[i].type)
			} else {
				const duelerHeroes = await Promise.allSettled(DFKDuelSetting[i].heroes.map(heroIds => autils.getHeroesInfoByIds(heroIds))).then((res) => res.map(promiseResult => promiseResult.value))
				let duelHeroes

				if (duelerHeroes.length === 1) {
					duelHeroes = duelerHeroes[0]
				} else {
					const DuelRecords = await DFKDuelS1Contract.getDuelHistory().then(res => 
						res.filter(duelHistory => duelHistory.player1Heroes.length === DFKDuelS1Contract.duelType()[DFKDuelSetting[i].type])
					)
					if (DuelRecords.length === 0) {
						duelHeroes = duelerHeroes[Math.floor(Math.random() * duelerHeroes.heroes.length)]
					} else {
						const lastDuelRecord = DuelRecords[0]
						const lastDuelTeam = duelerHeroes.find(heroObjects => 
							heroObjects.filter(heroObject => lastDuelRecord.player1Heroes.indexOf(heroObject.id) > -1).length === DFKDuelS1Contract.duelType()[DFKDuelSetting[i].type]
						)

						if (typeof(lastDuelTeam) === "undefined") {
							duelHeroes = duelerHeroes[Math.floor(Math.random() * duelerHeroes.length)]
						} else if(lastDuelRecord.winner === accountInfo.walletAddress) {
							duelHeroes = lastDuelTeam
						} else {
							const duelerHeroesObjects = duelerHeroes.filter(heroObjects => 
								heroObjects.filter(heroObject => lastDuelTeam.indexOf(heroObject) > -1).length !== DFKDuelS1Contract.duelType()[DFKDuelSetting[i].type]
							)
							duelHeroes = duelerHeroesObjects[Math.floor(Math.random() * duelerHeroesObjects.length)]
						}
					}
				}
				
				await DFKDuelS1Contract.enterDuelLobby(
					DFKDuelSetting[i].type,
					duelHeroes.map(heroObject => heroObject.id),
					DFKDuelSetting[i].fee,
					DFKDuelS1Contract.getHeroesBestBackground(duelHeroes),
					DFKDuelS1Contract.getHeroesBestStat(duelHeroes)
				)
			}
		}
		
    console.log(`--- ${accountInfo.accountName} auto dueler process completed ---`)
  } catch(error) {
		console.log(error)
    process.exit();
  }
}

main()