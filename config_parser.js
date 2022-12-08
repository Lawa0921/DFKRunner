const config = require("~/config.js");
const autils = require('~/src/services/autils');

main = async() => {
  console.log("start parse config heroes ...")

  const configHeroesIds = autils.getAllConfigHeroIds()
  const configHeroes = await autils.getHeroesInfoByIds(configHeroesIds)
  const configAddresses = config.walletAddressAndPrivateKeyMappings.map(accountInfo => accountInfo.walletAddress)
  const owningHeroes = await autils.getHeroesInfoByAddresses(configAddresses)
  const notOwningHeroes = configHeroes.filter((heroObject) => {
    return config.walletAddressAndPrivateKeyMappings.map(accountInfo => accountInfo.walletAddress).indexOf(heroObject.owner) === -1
  })
  console.log("---------------------------------")
  console.log("not owning heroes:")
  console.log(notOwningHeroes.map(heroObject => heroObject.id))
  console.log("---------------------------------")
  console.log("not working heroes:")
  console.log(owningHeroes.map(heroObject => heroObject.id).filter(heroId => configHeroesIds.indexOf(heroId) === -1))

  config.walletAddressAndPrivateKeyMappings.forEach((accountInfo) => {
    console.log(`----- ${accountInfo.accountName} config detail -----`)
    const owningHeroes = configHeroes.filter(heroObject => heroObject.owner === accountInfo.walletAddress)
    console.log(`Total ${owningHeroes.length} heroes`)

    console.log(`----- DFK Chain -----`)

    const DFKFishingHeroes = owningHeroes.filter(heroObject => config.defikingdoms.quest.fishing.heroes.indexOf(heroObject.id) > -1)
    console.log(`DFK ${DFKFishingHeroes.length} fishing heroes`)

    const DFKForagingHeroes = owningHeroes.filter(heroObject => config.defikingdoms.quest.foraging.heroes.indexOf(heroObject.id) > -1)
    console.log(`DFK ${DFKForagingHeroes.length} foraging heroes`)

    const DFKGoldMiningHeroes = owningHeroes.filter(heroObject => config.defikingdoms.quest.goldMining.heroes.indexOf(heroObject.id) > -1)
    console.log(`DFK ${DFKGoldMiningHeroes.length} gold mining heroes`)

    const crystalMiningHeroes = owningHeroes.filter(heroObject => config.defikingdoms.quest.crystalMining.heroes.indexOf(heroObject.id) > -1)
    console.log(`DFK ${crystalMiningHeroes.length} crystal mining heroes`)

    config.defikingdoms.quest.gardening.pairAddressMappings.forEach((gardeningQuest) => {
      const gardeningHeroes = owningHeroes.filter(heroObject => gardeningQuest.heroes.indexOf(heroObject.id) > -1)
      console.log(`DFK ${gardeningHeroes.length} ${gardeningQuest.tokenPair} gardening heroes`)
    })

    config.defikingdoms.quest.statQuests.forEach((statQuest) => {
      const statHeroes = owningHeroes.filter(heroObject => statQuest.heroes.indexOf(heroObject.id) > -1)
      console.log(`DFK ${statHeroes.length} ${statQuest.name} heroes`)
    })

    console.log(`----- KLAY Chain -----`)

    const KLAYFishingHeroes =  owningHeroes.filter(heroObject => config.klay.quest.fishing.heroes.indexOf(heroObject.id) > -1)
    console.log(`KLAY ${KLAYFishingHeroes.length} fishing heroes`)
  
    const KLAYForagingHeroes =  owningHeroes.filter(heroObject => config.klay.quest.foraging.heroes.indexOf(heroObject.id) > -1)
    console.log(`KLAY ${KLAYForagingHeroes.length} foraging heroes`)

    const KLAYGoldMiningHeroes = owningHeroes.filter(heroObject => config.klay.quest.goldMining.heroes.indexOf(heroObject.id) > -1)
    console.log(`KLAY ${KLAYGoldMiningHeroes.length} gold mining heroes`)

    const jadeMiningHeroes = owningHeroes.filter(heroObject => config.klay.quest.jadeMining.heroes.indexOf(heroObject.id) > -1)
    console.log(`KLAY ${jadeMiningHeroes.length} jade mining heroes`)

    config.klay.quest.gardening.pairAddressMappings.forEach((gardeningQuest) => {
      const gardeningHeroes = owningHeroes.filter(heroObject => gardeningQuest.heroes.indexOf(heroObject.id) > -1)
      console.log(`KLAY ${gardeningHeroes.length} ${gardeningQuest.tokenPair} gardening heroes`)
    })

    config.klay.quest.statQuests.forEach((statQuest) => {
      const statHeroes = owningHeroes.filter(heroObject => statQuest.heroes.indexOf(heroObject.id) > -1)
      console.log(`KLAY ${statHeroes.length} ${statQuest.name} heroes`)
    })
  })
}

main()
