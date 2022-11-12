const config = require("~/config.js");
const autils = require('~/src/services/autils');
const DFKDuelS1 = require('~/src/defikingdoms/contracts/DFKDuelS1')

main = async() => {
	console.log(autils.getCurrentDateTime().toLocaleTimeString());
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
				
				if (duelerHeroes.length === 1) {
					await DFKDuelS1Contract.enterDuelLobby(
						DFKDuelSetting[i].type,
						duelerHeroes[0],
						DFKDuelSetting[i].fee,
						DFKDuelS1Contract.getHeroesBestBackground(duelerHeroes[0]),
						DFKDuelS1Contract.getHeroesBestStat(duelerHeroes[0])
					)
				} else {
					const duelHistory = await DFKDuelS1Contract.getDuelHistory().then(res => res.filter(duelHistory => duelHistory.duelType === DFKDuelS1Contract.duelType()[DFKDuelSetting[i].type]))
					// to do
				}				
			}
		}
		
    console.log(`--- ${accountInfo.accountName} auto dueler process completed ---`)
  } catch(error) {
		console.log(error)
    process.exit();
  }
}

main()