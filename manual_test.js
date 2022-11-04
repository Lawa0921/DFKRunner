// 測試用
const config = require("~/config.js");
const ethers = require('ethers');
const HeroCore = require("~/src/defikingdoms/contracts/heroCore");
const heroCoreContract = new HeroCore(config.walletAddressAndPrivateKeyMappings[0]);

async function test() {  
    console.log(ethers.utils.isAddress())
}

test();
