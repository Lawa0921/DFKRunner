// 測試用
const config = require("~/config.js");
const HeroCore = require("~/src/defikingdoms/contracts/heroCore");
const heroCoreContract = new HeroCore(config.walletAddressAndPrivateKeyMappings[0]);

async function test() {  
    await heroCoreContract.transferFrom(config.walletAddressAndPrivateKeyMappings[1].walletAddress, "215102")
}

test();
