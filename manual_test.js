// 測試用
const config = require("~/config.js");
const ethers = require('ethers');
const HeroCore = require("~/src/defikingdoms/contracts/heroCore");
const DFKDuelS1 = require("~/src/defikingdoms/contracts/DFKDuelS1")
const DFKDuelS1Contract = new DFKDuelS1(config.walletAddressAndPrivateKeyMappings[0])

async function test() {  
    // console.log(await DFKDuelS1Contract.enterDuelLobby("solo", ["1000000030460"], "low", "desert", "VIT"))
    console.log(await DFKDuelS1Contract.getDuelHistory())
}

test();
