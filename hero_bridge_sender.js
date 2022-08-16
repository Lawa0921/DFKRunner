const HarmonyHeroBridge = require('~/src/harmony/contracts/heroBridge');
const harmonyHeroBridgeContract = new HarmonyHeroBridge();
const SaleAuction = require('~/src/harmony/contracts/saleAuction');
const saleAuctionContract = new SaleAuction();
const autils = require('~/src/services/autils');

async function main() {
  const bridgeHeroIds = [];
  const heroObjects = await autils.getHerosInfo(bridgeHeroIds);

  for (let i = 0; i < heroObjects.length; i++ ) {
    if (heroObjects[i].isOnSale) {
      await saleAuctionContract.unlistHero(heroObjects[i].id)
    } else if (heroObjects[i].isOnRent) {
      await saleAuctionContract.unrentHero(heroObjects[i].id)
    }
    await harmonyHeroBridgeContract.bridgeHero(heroObjects[i].id);
  }

  console.log("process completed")
}

main()
