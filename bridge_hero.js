const config = require("~/config.js")
const autils = require("~/src/services/autils");
const DFKAssistingAuctionUpgradeable = require("~/src/defikingdoms/contracts/assistingAuctionUpgradeable")
const KLAYAssistingAuctionUpgradeable = require("~/src/klay/contracts/assistingAuctionUpgradeable")
const DFKHeroBridge = require('~/src/defikingdoms/contracts/heroBridge');
const KLAYHeroBridge = require('~/src/klay/contracts/heroBridge');
const DFKSaleAuction = require("~/src/defikingdoms/contracts/saleAuction");
const KLAYSaleAuction = require("~/src/klay/contracts/saleAuction");

main = async() => {
  try {
    console.log("start bridge heroes")

    const toNetwork = "dfk" // kla 或是 dfk，表示你要去的鏈
    const bridgeHeroIds = [ // 把你要跨鏈的英雄 id 填到裡面
      
    ]
    const bridgeHeroObjects = await autils.getHeroesInfoByIds(bridgeHeroIds);

    for (let i = 0; i < config.walletAddressAndPrivateKeyMappings.length; i++) {
      const filteredHeroObjects = bridgeHeroObjects.filter((heroObject) => {
        return heroObject.network !== toNetwork &&
          heroObject.owner === config.walletAddressAndPrivateKeyMappings[i].walletAddress
      })

      const rentingHeroes = filteredHeroObjects.filter((heroObject) => { return heroObject.isOnRent })
      const onSaleHeroes = filteredHeroObjects.filter((heroObject) => { return heroObject.isOnSale })

      let saleAuctionContract;
      let assistingAuctionUpgradeableContract;
      let bridgeHeroContract;
      let unrentPromise = []
      let unsalePromise = []

      if (rentingHeroes.length > 0) {
        if (toNetwork === "kla") {
          assistingAuctionUpgradeableContract = new DFKAssistingAuctionUpgradeable(config.walletAddressAndPrivateKeyMappings[i])
        } else if (toNetwork === "dfk") {
          assistingAuctionUpgradeableContract = new KLAYAssistingAuctionUpgradeable(config.walletAddressAndPrivateKeyMappings[i])
        }

        rentingHeroes.forEach((rentingHero) => {
          unrentPromise.push(assistingAuctionUpgradeableContract.unlistHero(rentingHero.id))
        })

        await Promise.allSettled(unrentPromise)
      }

      if (onSaleHeroes.length > 0) {
        if (toNetwork === "kla") {
          saleAuctionContract = new DFKSaleAuction(config.walletAddressAndPrivateKeyMappings[i])
        } else if (toNetwork === "dfk") {
          saleAuctionContract = new KLAYSaleAuction(config.walletAddressAndPrivateKeyMappings[i])
        }

        onSaleHeroes.forEach((onSaleHero) => {
          unsalePromise.push(saleAuctionContract.unlistHero(onSaleHero.id))
        })

        await Promise.allSettled(unsalePromise)
      }

      for (let j = 0; j < filteredHeroObjects.length; j++) {
        if (filteredHeroObjects[j].isOnQuesting) {
          console.log(`${filteredHeroObjects[j].id} is onQuesting, please retry later`)
          continue
        }

        if (toNetwork === "kla") {
          bridgeHeroContract = new DFKHeroBridge(config.walletAddressAndPrivateKeyMappings[i])
        } else if (toNetwork === "dfk") {
          bridgeHeroContract = new KLAYHeroBridge(config.walletAddressAndPrivateKeyMappings[i])
        }

        await bridgeHeroContract.bridgeHero(filteredHeroObjects[j].id)
      }
    }
  
    console.log("process complete")
  } catch(error) {
    console.log(`fail reason: ${error.reason}`)
    console.log(`error code: ${error.code}`)
    console.log(`error message: ${error.message}`)
    main()
  }
}

main()
