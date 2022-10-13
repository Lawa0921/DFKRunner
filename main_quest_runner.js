const { runDFKChainQuest } = require('~/src/defikingdoms/quest_runner');
const autils = require("~/src/services/autils")
const config = require("~/config.js")

async function main() {
  console.log(autils.getCurrentDateTime().toLocaleTimeString());
  setTimeout(() => { process.exit() }, 300000) // 如果執行 script 超過 180 秒會自動中斷重啟，此為防治卡死的手段

  const questScriptPromise = config.walletAddressAndPrivateKeyMappings.map((accountInfo) => {
    mainQuestScript(accountInfo)
  })

  await Promise.allSettled(questScriptPromise)
  await autils.sleep(config.setQuestScriptTimeSecond * 1000)

  process.exit()
}

mainQuestScript = async (accountInfo) => {
  try {
    await Promise.allSettled([
      runDFKChainQuest(accountInfo),
    ])
    console.log(`--- ${accountInfo.accountName} quest script process completed ---`)
  } catch(error) {
    autils.log(error, true);
    process.exit();
  }
}

main();
