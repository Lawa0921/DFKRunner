// 測試用
const config = require("./config.js");
const autils = require('./src/services/autils');
const ethers = require('ethers');
const HeroCore = require("./src/defikingdoms/contracts/heroCore");
const KLAYQuestCore = require("./src/klay/contracts/questCoreV2");
const DFKQuestCore = require("./src/defikingdoms/contracts/questCoreV2");
const RaffleMaster = require("./src/defikingdoms/contracts/raffleMaster")
const AirdropClaim = require("./src/defikingdoms/contracts/airdropClaim")
const Crystal = require("./src/defikingdoms/contracts/crystal")
const AssistingAuctionUpgradeable = require("./src/klay/contracts/assistingAuctionUpgradeable")
const DFKDuelS2 = require('./src/defikingdoms/contracts/DFKDuelS2')
const PowerUpManager = require("./src/defikingdoms/contracts/powerUpManager")
const { BigNumber } = require("@ethersproject/bignumber")
const raffleMasterContract = new RaffleMaster(config.walletAddressAndPrivateKeyMappings[0])
const airdropClaimContract = new AirdropClaim(config.walletAddressAndPrivateKeyMappings[0])
const crystalContract = new Crystal(config.walletAddressAndPrivateKeyMappings[0])
const assistingAuctionUpgradeableContract = new AssistingAuctionUpgradeable(config.walletAddressAndPrivateKeyMappings[0])
const DFKDuelS2Contract = new DFKDuelS2(config.walletAddressAndPrivateKeyMappings[0])
const KLAYQuestCoreContract = new KLAYQuestCore(config.walletAddressAndPrivateKeyMappings[0])
const DFKQuestCoreContract = new DFKQuestCore(config.walletAddressAndPrivateKeyMappings[0])
const DFKPowerUpManagerContract = new PowerUpManager(config.walletAddressAndPrivateKeyMappings[0])
const { enterRaffle } = require("./src/klay/enter_raffle");
const { runDFKAssignPowerUp } = require("./src/defikingdoms/powerUp")

const Valuator = require('./src/services/valuator');
const { airdropClaim } = require("./src/defikingdoms/airdrop_claim")


async function test() {  
  try {
    console.log(await DFKPowerUpManagerContract.getUserPowerUpDataForActivePowerUps())
    // console.log(await autils.getHeroesInfoByRestfulAPI(autils.getDFKOwningHeroIds()))
    // const owningHeroObjects = await autils.getHeroesInfoByIds(autils.getDFKOwningHeroIds());
  
    // await runDFKAssignPowerUp(owningHeroObjects, config.walletAddressAndPrivateKeyMappings[0])
  } catch(error) {
    console.log(`fail reason: ${error.reason}`)
    console.log(`error code: ${error.code}`)
    console.log(`error message: ${error.message}`)
    console.log(`raw error: ${error}`)
  }
}

test();
