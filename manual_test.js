// 測試用
const config = require("~/config.js");
const autils = require('~/src/services/autils');
const ethers = require('ethers');
const HeroCore = require("~/src/defikingdoms/contracts/heroCore");
const DFKDuelS1 = require("~/src/defikingdoms/contracts/DFKDuelS1")
const RaffleMaster = require("~/src/defikingdoms/contracts/RaffleMaster")
const DFKDuelS1Contract = new DFKDuelS1(config.walletAddressAndPrivateKeyMappings[0])
const RaffleMasterContract = new RaffleMaster(config.walletAddressAndPrivateKeyMappings[0])

async function test() {  
  console.log(await RaffleMasterContract.getCurrentRaffleData())
}

test();
