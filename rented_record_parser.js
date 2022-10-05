const config = require("~/config.js");
const autils = require('~/src/services/autils');

async function main() {
  for (let i = 0; i < config.walletAddressAndPrivateKeyMappings.length; i++) {
    const rentedRecords = await autils.getPurchasedAssistingAuctions(config.walletAddressAndPrivateKeyMappings[i])

    rentedRecords.forEach((rentedRecord) => {
      console.log(`${config.walletAddressAndPrivateKeyMappings[i].accountName} ${new Date(rentedRecord.endedAt * 1000).toLocaleString()} rented ${rentedRecord.tokenId.id} ${BigInt(rentedRecord.purchasePrice) / BigInt(10 ** 18)} C`)
    })
  }  
}

main()
