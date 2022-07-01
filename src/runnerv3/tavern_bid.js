require('dotenv').config();
const config = require("./config.json");
const autils = require("./autils")
const { Harmony } = require('@harmony-js/core');
const { ChainID, ChainType, hexToNumber } = require('@harmony-js/utils');

tavernBidPattern = (heroIdInt, jewelPriceInt) => {
  let rv = ""
  rv += "0x598647f8" // signature of bid
  rv += autils.intToInput(heroIdInt) // heroid
  rv += autils.intToInput(jewelPriceInt) // bid amount
  return rv;
}

exports.bidHero = async (heroId, price) => {
  try {
    const harmony = new Harmony(
      autils.getRpc(config.useRpcIndex),
      {
          chainType: ChainType.Harmony,
          chainId: ChainID.HmyMainnet,
      },
    );
    
    harmony.wallet.addByPrivateKey(process.env.PRIVATE_KEY);

    const unSignedTxn = harmony.transactions.newTx({
      to: config.tavernContract,
      value: 0,
      gasLimit: config.gasLimit,
      shardID: 0,
      toShardID: 0,
      gasPrice: config.bidGasPrice,
      data: tavernBidPattern(parseInt(heroId), parseInt(price))
    });
    console.log("!!! bid hero txn created !!!")

    const signedTxn = await harmony.wallet.signTransaction(unSignedTxn);
    console.log("!!! bid hero txn signed !!!");

    await harmony.blockchain.createObservedTransaction(signedTxn).promise;
    console.log("!!! bid hero txn confirmed !!!")

    autils.bidHeroLog(`Purchased hero: ${heroId} use ${parseInt(price) / Math.pow(10, 18)} Jewel`)
  } catch(error) {
    if (error.toString().includes('Maximum call stack size exceeded')) {
        autils.log(error.toString(), true);
    } else if (error.toString().includes('The transaction is still not confirmed after 20 attempts')) {
      autils.log(error.toString(), true);
    } else if (error.toString() === '[object Object]') {
      autils.log(JSON.stringify(error), true);
    } else {
      autils.log(error.toString(), true);
    }
  }
}
