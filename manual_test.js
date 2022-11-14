// 測試用
const config = require("~/config.js");
const autils = require('~/src/services/autils');
const ethers = require('ethers');
const HeroCore = require("~/src/defikingdoms/contracts/heroCore");
const DFKDuelS1 = require("~/src/defikingdoms/contracts/DFKDuelS1")
const RaffleMaster = require("~/src/defikingdoms/contracts/raffleMaster")
const DuelRaffleTicket = require("~/src/defikingdoms/contracts/DuelRaffeTicket")
const DFKDuelS1Contract = new DFKDuelS1(config.walletAddressAndPrivateKeyMappings[0])
const raffleMasterContract = new RaffleMaster(config.walletAddressAndPrivateKeyMappings[0])
const duelRaffleTicketContract = new DuelRaffleTicket(config.walletAddressAndPrivateKeyMappings[0])
const { enterRaffle } = require("~/src/defikingdoms/enter_raffle")


async function test() {  
  await enterRaffle(config.walletAddressAndPrivateKeyMappings[0])
}

test();
