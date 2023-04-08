// 測試用
const config = require("./config.js");
const autils = require('./src/services/autils');
const DFKAssistingAuctionUpgradeable = require("./src/defikingdoms/contracts/assistingAuctionUpgradeable")
const KLAYAssistingAuctionUpgradeable = require("./src/klay/contracts/assistingAuctionUpgradeable")
const DFKAssistingAuctionUpgradeableContract = new DFKAssistingAuctionUpgradeable(config.walletAddressAndPrivateKeyMappings[0])
const KLAYAssistingAuctionUpgradeableContract = new KLAYAssistingAuctionUpgradeable(config.walletAddressAndPrivateKeyMappings[0])

async function test() {  
  try {
    const DFKOwningHeroObjects = await autils.getHeroesInfoByIds(autils.getDFKOwningHeroIds());
    const DFKOnRentHeroes = DFKOwningHeroObjects.filter(heroObject => heroObject.isOnRent);

    for (let i = 0; i < DFKOnRentHeroes.length; i++) {
      await DFKAssistingAuctionUpgradeableContract.unlistHero(DFKOnRentHeroes[i].id)
    }

    const KLAYOwningHeroObjects = await autils.getHeroesInfoByIds(autils.getKLAYOwningHeroIds())
    const KLAYOnRentHeroes = KLAYOwningHeroObjects.filter(heroObject => heroObject.isOnRent);

    for (let i = 0; i < KLAYOnRentHeroes.length; i++) {
      await KLAYAssistingAuctionUpgradeableContract.unlistHero(DFKOnRentHeroes[i].id)
    }
  } catch(error) {
    console.log(`fail reason: ${error.reason}`)
    console.log(`error code: ${error.code}`)
    console.log(`error message: ${error.message}`)
    console.log(`raw error: ${error}`)
    test()
  }
}

test();
