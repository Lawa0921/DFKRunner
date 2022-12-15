const config = require("~/config.js");
const autils = require('~/src/services/autils');

main = async() => {
  console.log("start parse config heroes ...")

  const configAddresses = config.walletAddressAndPrivateKeyMappings.map(accountInfo => accountInfo.walletAddress)
  const DFKConfigHeroes = await autils.getHeroesInfoByIds(autils.getDFKOwningHeroIds())
  const KLAYConfigHeroes = await autils.getHeroesInfoByIds(autils.getKLAYOwningHeroIds())
  const ALLConfigHeroes = DFKConfigHeroes.concat(KLAYConfigHeroes)

  const DFKOwningHeroes = await autils.getHeroesInfoByAddressesAndNetworks(configAddresses, ["dfk"])
  const KLAYOwningHeroes = await autils.getHeroesInfoByAddressesAndNetworks(configAddresses, ["kla"])
  const owningHeroes = DFKOwningHeroes.concat(KLAYOwningHeroes)

  const notOwningHeroes = ALLConfigHeroes.filter((heroObject) => {
    return config.walletAddressAndPrivateKeyMappings.map(accountInfo => accountInfo.walletAddress).indexOf(heroObject.owner) === -1
  })
  console.log("---------------------------------")
  console.log("not owning heroes:")
  console.log(notOwningHeroes.map(heroObject => heroObject.id))
  console.log("---------------------------------")
  console.log("not working heroes:")
  console.log(owningHeroes.map(heroObject => heroObject.id).filter(heroId => ALLConfigHeroes.map(heroObject => heroObject.id).indexOf(heroId) === -1))

  config.walletAddressAndPrivateKeyMappings.forEach((accountInfo) => {
    console.log(`----- ${accountInfo.accountName} config detail -----`)
    const owningHeroes = ALLConfigHeroes.filter(heroObject => heroObject.owner === accountInfo.walletAddress)
    console.log(`Total ${owningHeroes.length} heroes`)

    console.log(`----- DFK Chain -----`)

    const notInDFKHeroes = DFKConfigHeroes.filter(heroObject => DFKOwningHeroes.map(heroObject => heroObject.id).indexOf(heroObject.id) === -1 && heroObject.owner === accountInfo.walletAddress)
    console.log("not in DFK heroes:")
    console.log(notInDFKHeroes.map(heroObject => { return { id: heroObject.id, currentNetwork: heroObject.network } }))

    const DFKFishingHeroes = DFKConfigHeroes.filter(heroObject => config.defikingdoms.quest.fishing.heroes.indexOf(heroObject.id) > -1)
    console.log(`DFK ${DFKFishingHeroes.length} fishing heroes`)

    const DFKForagingHeroes = DFKConfigHeroes.filter(heroObject => config.defikingdoms.quest.foraging.heroes.indexOf(heroObject.id) > -1)
    console.log(`DFK ${DFKForagingHeroes.length} foraging heroes`)

    const DFKGoldMiningHeroes = DFKConfigHeroes.filter(heroObject => config.defikingdoms.quest.goldMining.heroes.indexOf(heroObject.id) > -1)
    console.log(`DFK ${DFKGoldMiningHeroes.length} gold mining heroes`)

    const crystalMiningHeroes = DFKConfigHeroes.filter(heroObject => config.defikingdoms.quest.crystalMining.heroes.indexOf(heroObject.id) > -1)
    console.log(`DFK ${crystalMiningHeroes.length} crystal mining heroes`)

    config.defikingdoms.quest.gardening.pairAddressMappings.forEach((gardeningQuest) => {
      const gardeningHeroes = DFKConfigHeroes.filter(heroObject => gardeningQuest.heroes.indexOf(heroObject.id) > -1)
      console.log(`DFK ${gardeningHeroes.length} ${gardeningQuest.tokenPair} gardening heroes`)
    })

    config.defikingdoms.quest.statQuest.quests.forEach((statQuest) => {
      const statHeroes = DFKConfigHeroes.filter(heroObject => statQuest.heroes.indexOf(heroObject.id) > -1)
      console.log(`DFK ${statHeroes.length} ${statQuest.name} heroes`)
    })

    console.log(`----- KLAY Chain -----`)

    const notInKLAYHeroes = KLAYConfigHeroes.filter(heroObject => KLAYOwningHeroes.map(heroObject => heroObject.id).indexOf(heroObject.id) === -1 && heroObject.owner === accountInfo.walletAddress)
    console.log("not in KLAY heroes:")
    console.log(notInKLAYHeroes.map(heroObject => { return { id: heroObject.id, currentNetwork: heroObject.network } }))

    const KLAYFishingHeroes =  KLAYConfigHeroes.filter(heroObject => config.klay.quest.fishing.heroes.indexOf(heroObject.id) > -1)
    console.log(`KLAY ${KLAYFishingHeroes.length} fishing heroes`)
  
    const KLAYForagingHeroes =  KLAYConfigHeroes.filter(heroObject => config.klay.quest.foraging.heroes.indexOf(heroObject.id) > -1)
    console.log(`KLAY ${KLAYForagingHeroes.length} foraging heroes`)

    const KLAYGoldMiningHeroes = KLAYConfigHeroes.filter(heroObject => config.klay.quest.goldMining.heroes.indexOf(heroObject.id) > -1)
    console.log(`KLAY ${KLAYGoldMiningHeroes.length} gold mining heroes`)

    const jadeMiningHeroes = KLAYConfigHeroes.filter(heroObject => config.klay.quest.jadeMining.heroes.indexOf(heroObject.id) > -1)
    console.log(`KLAY ${jadeMiningHeroes.length} jade mining heroes`)

    config.klay.quest.gardening.pairAddressMappings.forEach((gardeningQuest) => {
      const gardeningHeroes = KLAYConfigHeroes.filter(heroObject => gardeningQuest.heroes.indexOf(heroObject.id) > -1)
      console.log(`KLAY ${gardeningHeroes.length} ${gardeningQuest.tokenPair} gardening heroes`)
    })

    config.klay.quest.statQuest.quests.forEach((statQuest) => {
      const statHeroes = KLAYConfigHeroes.filter(heroObject => statQuest.heroes.indexOf(heroObject.id) > -1)
      console.log(`KLAY ${statHeroes.length} ${statQuest.name} heroes`)
    })
  })
}

main()
