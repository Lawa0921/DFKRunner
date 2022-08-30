const { runDFKChainQuest } = require('~/src/defikingdoms/quest_runner');
const { runHarmonyQuest } = require('~/src/harmony/quest_runner');
const autils = require("~/src/services/autils")

async function main() {
  try {
    console.log(autils.getCurrentDateTime().toLocaleTimeString());

    await Promise.allSettled([
      runDFKChainQuest(),
      runHarmonyQuest(),
    ])

    console.log("------------ main process completed ------------");
    process.exit();
  } catch(error) {
    autils.log(error.toString(), true);
    process.exit();
  }
}

main();
