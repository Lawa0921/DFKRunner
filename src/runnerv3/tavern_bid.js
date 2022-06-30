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

exports.bidHero = async (hero) => {
  try {
    const hmy = new Harmony(
      autils.getRpc(config.useRpcIndex),
      {
          chainType: ChainType.Harmony,
          chainId: ChainID.HmyMainnet,
      },
    );
  
    hmy.addByPrivateKey(process.env.PRIVATE_KEY);

    const unSignedTxn = hmy.transactions.newTx({
      to: config.tavernContract,
      value: 0,
      gasLimit: config.gasLimit,
      shardID: 0,
      toShardID: 0,
      gasPrice: config.bidGasPrice,
      data: tavernBidPattern(parseInt(hero.id), parseInt(hero.saleprice))
    });
    console.log("!!! bid hero txn created !!!")

    const signedTxn = await hmy.wallet.signTransaction(unSignedTxn);
    console.log("!!! bid hero txn signed !!!");

    await hmy.blockchain.createObservedTransaction(signedTxn).promise;
    console.log("!!! bid hero txn confirmed !!!")

    autils.bidHeroLog(`Purchased hero: ${hero.id} use ${parseInt(hero.saleprice) / Math.pow(10, 18)} Jewel`)
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
