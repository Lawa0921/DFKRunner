const HarmonyHeroBridgeContract = require('~/src/harmony/contracts/heroBridge');
const harmonyHeroBridgeContract = new HarmonyHeroBridgeContract();

async function main() {
  let bridgeHeroIds = [244669, 215972, 160537, 189485, 219722, 200149, 253628, 251244, 256980, 256603];

  for (let i = 0; i < bridgeHeroIds.length; i++ ) {
    await harmonyHeroBridgeContract.bridgeHero(bridgeHeroIds[i]);
  }

  console.log("process completed")
}

main()
