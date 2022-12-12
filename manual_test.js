// 測試用
const config = require("~/config.js");
const autils = require('~/src/services/autils');
const ethers = require('ethers');
const HeroCore = require("~/src/defikingdoms/contracts/heroCore");
const DFKDuelS1 = require("~/src/defikingdoms/contracts/DFKDuelS1")
const RaffleMaster = require("~/src/defikingdoms/contracts/raffleMaster")
const DuelRaffleTicket = require("~/src/defikingdoms/contracts/duelRaffeTicket")
const AirdropClaim = require("~/src/defikingdoms/contracts/airdropClaim")
const Crystal = require("~/src/defikingdoms/contracts/crystal")
const AssistingAuctionUpgradeable = require("~/src/klay/contracts/assistingAuctionUpgradeable")
const { BigNumber } = require("@ethersproject/bignumber")
const DFKDuelS1Contract = new DFKDuelS1(config.walletAddressAndPrivateKeyMappings[0])
const raffleMasterContract = new RaffleMaster(config.walletAddressAndPrivateKeyMappings[0])
const duelRaffleTicketContract = new DuelRaffleTicket(config.walletAddressAndPrivateKeyMappings[0])
const airdropClaimContract = new AirdropClaim(config.walletAddressAndPrivateKeyMappings[0])
const crystalContract = new Crystal(config.walletAddressAndPrivateKeyMappings[0])
const assistingAuctionUpgradeableContract = new AssistingAuctionUpgradeable(config.walletAddressAndPrivateKeyMappings[0])

const { enterRaffle } = require("~/src/defikingdoms/enter_raffle")
const { airdropClaim } = require("~/src/defikingdoms/airdrop_claim")


async function test() {  
  // await assistingAuctionUpgradeableContract.unlistHero("")

  // console.log(Math.round(8.5 * 100) / 100)
  // console.log(await crystalContract.allowance(config.defikingdoms.meditationCircle))
  // await crystalContract.approve(config.defikingdoms.meditationCircle, ethers.constants.MaxUint256)
  // console.log(ethers.constants.MaxUint256)
}

test();
