const config = require("~/config.js")
const InventoryItem = require('~/src/defikingdoms/contracts/inventoryItem')
const ItemGoldTraderV2 = require('~/src/defikingdoms/contracts/ItemGoldTraderV2')
const approveAmount = 1000000;

main = async() => {
  console.log("start sale items")

  for (let i = 0; i < config.walletAddressAndPrivateKeyMappings.length; i++) {
    const itemGoldTraderV2Contract = new ItemGoldTraderV2(config.walletAddressAndPrivateKeyMappings[i])

    for (let j = 0; j < config.defikingdoms.availableForSaleTokens.length; j++) {
      if (config.defikingdoms.availableForSaleTokens[j].sale) {
        const inventoryItemContract = new InventoryItem(config.walletAddressAndPrivateKeyMappings[i], config.defikingdoms.availableForSaleTokens[j].contractAddress)

        const itemBalanceOf = await inventoryItemContract.balanceOf()

        if (itemBalanceOf > 0) {
          console.log(`${inventoryItemContract.accountName} Sell ${parseInt(itemBalanceOf)} ${config.defikingdoms.availableForSaleTokens[j].name}`)
          const contractAllowance = await inventoryItemContract.allowance(itemGoldTraderV2Contract.contract.address)
  
          if (itemBalanceOf > contractAllowance) {
            await inventoryItemContract.approve(itemGoldTraderV2Contract.contract.address, approveAmount)
          }
  
          await itemGoldTraderV2Contract.sellItem(config.defikingdoms.availableForSaleTokens[j].contractAddress, itemBalanceOf)
        }
      }
    }
  }

  console.log("process complete")
}

main()
