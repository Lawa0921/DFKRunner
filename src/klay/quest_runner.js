const autils = require("~/src/services/autils");
const config = require("~/config.js");

exports.runKLAYChainQuest = async (accountInfo) => {
  try {
    const baseGasPrice = await autils.getKLAYBaseGasFee()
    console.log(`KLAY Current base gasPrice: ${baseGasPrice}`)
  
    if (baseGasPrice > config.klay.maxGasPrice) {
      console.log(`KLAY Current base gasPrice: ${baseGasPrice} is over then maxGasPrice setting: ${config.defikingdoms.maxGasPrice}, will retry later.`)
    } else {
      // to do
    }
  } catch (error) {
    console.log(`fail reason: ${error.reason}`)
    console.log(`error code: ${error.code}`)
    console.log(`error message: ${error.message}`)
    process.exit();
  }
}
