const { DFKAutoDueler } = require('./src/defikingdoms/auto_duel');
const { KLAYAutoDueler } = require('./src/klay/auto_duel');
const autils = require("./src/services/autils")
const config = require("./config.js")

async function main() {
  console.log(autils.getCurrentDateTime().toLocaleTimeString());
  setTimeout(() => { process.exit() }, 600000) // 如果執行 script 超過 600 秒會自動中斷重啟，此為防治卡死的手段

  await Promise.allSettled([
    DFKAutoDueler(),
    KLAYAutoDueler()
  ])
  await autils.sleep(config.setDuelScriptTimeSecond * 1000)

  process.exit()
}

main();