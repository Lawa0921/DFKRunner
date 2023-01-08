const config = require("./config.js");
const autils = require('./src/services/autils');
const DFKAssistingAuctionUpgradeable = require("./src/defikingdoms/contracts/assistingAuctionUpgradeable")
const KLAYAssistingAuctionUpgradeable = require("./src/klay/contracts/assistingAuctionUpgradeable")
const RentValuator = require('./src/services/rent_valuator')

DFKRerenter = async () => {
  const DFKOwningHeroObjects = await autils.getHeroesInfoByIds(autils.getDFKOwningHeroIds());
  const DFKOnRentHeroes = DFKOwningHeroObjects.filter(heroObject => heroObject.isOnRent);

  for (let i = 0; DFKOnRentHeroes.length > i; i++) {
    let rentValuator = new RentValuator(DFKOnRentHeroes[i])
    rentValuator.execute()

    if (rentValuator.valuation === 0) {
      continue
    } else if (DFKOnRentHeroes[i].rentPrice < rentValuator.valuation * 0.9 || DFKOnRentHeroes[i].rentPrice > rentValuator.valuation * 1.1) { // 可自訂多餘或少於估價幾成需要重新出租，更改數字即可
      const accountInfo = config.walletAddressAndPrivateKeyMappings.find(accountInfo => accountInfo.walletAddress === DFKOnRentHeroes[i].owner)
      const DFKAssistingAuctionUpgradeableContract = new DFKAssistingAuctionUpgradeable(accountInfo)

      console.log(`${DFKOnRentHeroes[i].id} current rent price ${DFKOnRentHeroes[i].rentPrice} C, re-rent ${rentValuator.valuation} C`)

      await DFKAssistingAuctionUpgradeableContract.unlistHero(DFKOnRentHeroes[i].id)
      await DFKAssistingAuctionUpgradeableContract.listHero(DFKOnRentHeroes[i].id, rentValuator.valuation)
    } 
  }
}

KLAYRerenter = async () => {
  const KLAYOwningHeroObjects = await autils.getHeroesInfoByIds(autils.getKLAYOwningHeroIds())
  const KLAYOnRentHeroes = KLAYOwningHeroObjects.filter(heroObject => heroObject.isOnRent);

  for (let i = 0; KLAYOnRentHeroes.length > i; i++) {
    let rentValuator = new RentValuator(KLAYOnRentHeroes[i])
    rentValuator.execute()

    if (rentValuator.valuation === 0) {
      continue
    } else if (KLAYOnRentHeroes[i].rentPrice < rentValuator.valuation * 0.9 || KLAYOnRentHeroes[i].rentPrice > rentValuator.valuation * 1.1) { // 可自訂多餘或少於估價幾成需要重新出租，更改數字即可
      const accountInfo = config.walletAddressAndPrivateKeyMappings.find(accountInfo => accountInfo.walletAddress === KLAYOnRentHeroes[i].owner)
      const KLAYAssistingAuctionUpgradeableContract = new KLAYAssistingAuctionUpgradeable(accountInfo)

      console.log(`${KLAYOnRentHeroes[i].id} current rent price ${KLAYOnRentHeroes[i].rentPrice} Jade, re-rent ${rentValuator.valuation} Jade`)

      await KLAYAssistingAuctionUpgradeableContract.unlistHero(KLAYOnRentHeroes[i].id)
      await KLAYAssistingAuctionUpgradeableContract.listHero(KLAYOnRentHeroes[i].id, rentValuator.valuation)
    } 
  }
}

async function main() {
  try {
    await Promise.allSettled([DFKRerenter(), KLAYRerenter()])

    console.log("process completed")
  } catch(error) {
    console.log(`fail reason: ${error.reason}`)
    console.log(`error code: ${error.code}`)
    console.log(`error message: ${error.message}`)
    console.log(`raw error: ${error}`)
    main()
  }
}

main()