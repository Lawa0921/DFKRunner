// 測試用
const config = require("./config.js");
const autils = require('./src/services/autils');
const ethers = require('ethers');
const HeroCore = require("./src/defikingdoms/contracts/heroCore");
const KLAYQuestCore = require("./src/klay/contracts/questCoreV2");
const RaffleMaster = require("./src/defikingdoms/contracts/raffleMaster")
const DuelRaffleTicket = require("./src/defikingdoms/contracts/duelRaffeTicket")
const AirdropClaim = require("./src/defikingdoms/contracts/airdropClaim")
const Crystal = require("./src/defikingdoms/contracts/crystal")
const AssistingAuctionUpgradeable = require("./src/klay/contracts/assistingAuctionUpgradeable")
const DFKDuelS2 = require('./src/defikingdoms/contracts/DFKDuelS2')
const { BigNumber } = require("@ethersproject/bignumber")
const raffleMasterContract = new RaffleMaster(config.walletAddressAndPrivateKeyMappings[0])
const duelRaffleTicketContract = new DuelRaffleTicket(config.walletAddressAndPrivateKeyMappings[0])
const airdropClaimContract = new AirdropClaim(config.walletAddressAndPrivateKeyMappings[0])
const crystalContract = new Crystal(config.walletAddressAndPrivateKeyMappings[0])
const assistingAuctionUpgradeableContract = new AssistingAuctionUpgradeable(config.walletAddressAndPrivateKeyMappings[0])
const DFKDuelS2Contract = new DFKDuelS2(config.walletAddressAndPrivateKeyMappings[0])
const KLAYQuestCoreContract = new KLAYQuestCore(config.walletAddressAndPrivateKeyMappings[0])
const { enterRaffle } = require("./src/klay/enter_raffle");

const Valuator = require('~/src/services/valuator');
const { airdropClaim } = require("./src/defikingdoms/airdrop_claim")


async function test() {  
  // console.log(Math.floor(new Date().getTime() / 1000))
  // await enterRaffle(config.walletAddressAndPrivateKeyMappings[0]);
  console.log(await KLAYQuestCoreContract.cancelQuest("1000000028544"))
  // console.log(await assistingAuctionUpgradeableContract.userAuctions())
  // console.log(Math.round(8.5 * 100) / 100)
  // console.log(await crystalContract.allowance(config.defikingdoms.meditationCircle))
  // await crystalContract.approve(config.defikingdoms.meditationCircle, ethers.constants.MaxUint256)
  // console.log(ethers.constants.MaxUint256)
}

test();
