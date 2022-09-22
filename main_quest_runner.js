const { runDFKChainQuest } = require('~/src/defikingdoms/quest_runner');
const autils = require("~/src/services/autils")
const config = require("~/config.js")

async function main() {
  try {
    console.log(autils.getCurrentDateTime().toLocaleTimeString());
    
    setTimeout(() => { process.exit() }, 300000) // 如果執行 script 超過 300 秒會自動中斷重啟，此為防治卡死的手段

    await Promise.allSettled([
      runDFKChainQuest(),
    ])

    console.log("------------ main process completed ------------");
    setTimeout(() => { process.exit() }, config.setQuestScriptTimeSecond * 1000) 
  } catch(error) {
    autils.log(error.toString(), true);
    process.exit();
  }
}

main();
