const config = require("~/config.js");
const autils = require('~/src/services/autils');

main = async() => {
  console.log("start parse config heroes ...")

  const configHeroesIds = autils.getAllConfigHeroIds()
  const configHeroes = await autils.getHerosInfo(configHeroesIds)
  const notOwningHeroes = configHeroes.filter((heroObject) => {
    return config.walletAddressAndPrivateKeyMappings.map(accountInfo => accountInfo.walletAddress).indexOf(heroObject.owner) === -1
  })
  console.log("---------------------------------")
  console.log("not owning heroes:")
  console.log(notOwningHeroes.map(heroObject => heroObject.id))
  console.log("---------------------------------")

  config.walletAddressAndPrivateKeyMappings.forEach((accountInfo) => {
    console.log(`----- ${accountInfo.accountName} config detail -----`)
    const owningHeroes = configHeroes.filter(heroObject => heroObject.owner === accountInfo.walletAddress)
    console.log(` ${owningHeroes.length} heroes`)

    const fishingHeroes = owningHeroes.filter(heroObject => config.defikingdoms.quest.fishing.heroes.indexOf(heroObject.id) > -1)
    console.log(` ${fishingHeroes.length} fishing heroes`)
  
    const foragingHeroes = owningHeroes.filter(heroObject => config.defikingdoms.quest.foraging.heroes.indexOf(heroObject.id) > -1)
    console.log(` ${foragingHeroes.length} foraging heroes`)
  
    const goldMiningHeroes = owningHeroes.filter(heroObject => config.defikingdoms.quest.goldMining.heroes.indexOf(heroObject.id) > -1)
    console.log(` ${goldMiningHeroes.length} gold mining heroes`)

    const crystalMiningHeroes = owningHeroes.filter(heroObject => config.defikingdoms.quest.crystalMining.heroes.indexOf(heroObject.id) > -1)
    console.log(` ${crystalMiningHeroes.length} crystal mining heroes`)

    config.defikingdoms.quest.gardening.pairAddressMappings.forEach((gardeningQuest) => {
      const gardeningHeroes = owningHeroes.filter(heroObject => gardeningQuest.heroes.indexOf(heroObject.id) > -1)
      console.log(` ${gardeningHeroes.length} ${gardeningQuest.tokenPair} gardening heroes`)
    })

    config.defikingdoms.quest.statQuests.forEach((statQuest) => {
      const statHeroes = owningHeroes.filter(heroObject => statQuest.heroes.indexOf(heroObject.id) > -1)
      console.log(` ${statHeroes.length} ${statQuest.name} heroes`)
    })
  })
}

main()
