const HarmonyHeroBridge = require('~/src/harmony/contracts/heroBridge');
const harmonyHeroBridgeContract = new HarmonyHeroBridge();
const autils = require('~/src/services/autils');

async function main() {
  const bridgeHeroIds = [];
  const heroObjects = await autils.getHerosInfo(bridgeHeroIds);

  for (let i = 0; i < heroObjects.length; i++ ) {
    await harmonyHeroBridgeContract.bridgeHero(heroObjects[i].id);
  }

  console.log("process completed")
}

main()
