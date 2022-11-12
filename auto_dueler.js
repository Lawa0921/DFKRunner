const config = require("~/config.js");
const autils = require('~/src/services/autils');
const DFKDuelS1 = require('~/src/defikingdoms/contracts/DFKDuelS1')

main = async() => {
	const autoDuelPromise = config.walletAddressAndPrivateKeyMappings.map((accountInfo) => {
		autoDuelScript(accountInfo)
	})
	
	await Promise.allSettled(autoDuelPromise)
  await autils.sleep(config.setDuelScriptTimeSecond * 1000)

  process.exit()
}

autoDuelScript = async (accountInfo) => {
  try {
		const DFKDuelSetting = config.defikingdoms.duelSetting.filter(duelSetting => duelSetting.isActive && duelSetting.heroes.length > 0)
		
		for (let i = 0; i <= DFKDuelSetting.length; i++) {
			const DFKDuelS1Contract = new DFKDuelS1(accountInfo)
			const activeDuels = await DFKDuelS1Contract.getActiveDuels().then(res => res.filter(duel => duel.duelType === DFKDuelS1Contract.duelType()[DFKDuelSetting[i].type]))
			const activeEntries = await DFKDuelS1Contract.getPlayerDuelEntries().then(res => res.filter(entry => entry.duelType === DFKDuelS1Contract.duelType()[DFKDuelSetting[i].type]))
			
			if (activeDuels.length > 0) {
				await Promise.allSettled(activeDuels.map(duel => DFKDuelS1Contract.completeDuel((duel.id))))
			} else if (activeEntries.length > 0) {
				await DFKDuelS1Contract.matchMake(DFKDuelSetting[i].type)
			} else {
				const duelerHeroes = await Promise.allSettled(DFKDuelSetting[i].heroes.map(heroIds => autils.getHeroesInfoByIds(heroIds))).then((res) => res.map(promiseResult => promiseResult.value))
				const duelHistory = await DFKDuelS1Contract.getDuelHistory().filter(duelHistory => duelHistory.duelType === DFKDuelS1Contract.duelType()[DFKDuelSetting[i].type])
				
				// to do
			}
		}
		
    console.log(`--- ${accountInfo.accountName} auto dueler process completed ---`)
  } catch(error) {
    process.exit();
  }
}

main()