const config = require("./config.js")
const ethers = require('ethers');
const DFKInventoryItem = require('./src/defikingdoms/contracts/inventoryItem')
const DFKItemGoldTraderV2 = require('./src/defikingdoms/contracts/ItemGoldTraderV2')
const KLAYInventoryItem = require('./src/klay/contracts/inventoryItem')
const KLAYItemGoldTraderV2 = require('./src/klay/contracts/ItemGoldTraderV2')

DFKItemSeller = async () => {
  for (let i = 0; i < config.walletAddressAndPrivateKeyMappings.length; i++) {
    for (let j = 0; j < config.defikingdoms.availableForSaleTokens.length; j++) {
      if (config.defikingdoms.availableForSaleTokens[j].sale) {
        const inventoryItemContract = new DFKInventoryItem(config.walletAddressAndPrivateKeyMappings[i], config.defikingdoms.availableForSaleTokens[j].contractAddress)

        const itemBalanceOf = await inventoryItemContract.balanceOf()

        if (itemBalanceOf > 0) {
          console.log(`${inventoryItemContract.accountName} DFK Sell ${parseInt(itemBalanceOf)} ${config.defikingdoms.availableForSaleTokens[j].name}`)
          const contractAllowance = await inventoryItemContract.allowance(new DFKItemGoldTraderV2(config.walletAddressAndPrivateKeyMappings[i]).contract.address)
  
          if (itemBalanceOf > contractAllowance) {
            await inventoryItemContract.approve(DFKItemGoldTraderV2.contract.address, ethers.constants.MaxUint256)
          }
  
          await new DFKItemGoldTraderV2(config.walletAddressAndPrivateKeyMappings[i]).sellItem(config.defikingdoms.availableForSaleTokens[j].contractAddress, itemBalanceOf)
        }
      }
    }
  }
}

KLAYItemSeller = async () => {
  for (let i = 0; i < config.walletAddressAndPrivateKeyMappings.length; i++) {
    for (let j = 0; j < config.klay.availableForSaleTokens.length; j++) {
      if (config.klay.availableForSaleTokens[j].sale) {
        const inventoryItemContract = new KLAYInventoryItem(config.walletAddressAndPrivateKeyMappings[i], config.klay.availableForSaleTokens[j].contractAddress)

        const itemBalanceOf = await inventoryItemContract.balanceOf()

        if (itemBalanceOf > 0) {
          console.log(`${inventoryItemContract.accountName} KLAY Sell ${parseInt(itemBalanceOf)} ${config.klay.availableForSaleTokens[j].name}`)
          const contractAllowance = await inventoryItemContract.allowance(new KLAYItemGoldTraderV2(config.walletAddressAndPrivateKeyMappings[i]).contract.address)
  
          if (itemBalanceOf > contractAllowance) {
            await inventoryItemContract.approve(new KLAYItemGoldTraderV2(config.walletAddressAndPrivateKeyMappings[i]).contract.address, ethers.constants.MaxUint256)
          }
  
          await new KLAYItemGoldTraderV2(config.walletAddressAndPrivateKeyMappings[i]).sellItem(config.klay.availableForSaleTokens[j].contractAddress, itemBalanceOf)
        }
      }
    }
  }
}

main = async() => {
  try {
    console.log("start sale items")

    await Promise.allSettled([DFKItemSeller(), KLAYItemSeller()])

    console.log("process complete")
  } catch(error) {
    console.log(`fail reason: ${error.reason}`)
    console.log(`error code: ${error.code}`)
    console.log(`error message: ${error.message}`)
    console.log(`raw error: ${error}`)
    main()
  }
}

main()
