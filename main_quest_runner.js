const { runDFKChainQuest } = require('~/src/defikingdoms/quest_runner')
const autils = require("~/src/services/autils")

async function main() {
  try {
    console.log(autils.getCurrentDateTime().toLocaleTimeString());

    await runDFKChainQuest();

    console.log("main process completed");
  } catch(error) {
    autils.log(error.toString(), true);
  }
}

while (true) {
  main();
}
