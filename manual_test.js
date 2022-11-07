// 測試用
const config = require("~/config.js");
const ethers = require('ethers');
const HeroCore = require("~/src/defikingdoms/contracts/heroCore");
const heroCoreContract = new HeroCore(config.walletAddressAndPrivateKeyMappings[1]);

async function test() {  
    await heroCoreContract.transferFrom(config.walletAddressAndPrivateKeyMappings[0].walletAddress, "1000000001443")
}

test();
