require('dotenv').config()
const { Harmony } = require('@harmony-js/core');
const {
    ChainID,
    ChainType,
  } = require('@harmony-js/utils');

const config = require("./config.json");
const autils = require("./autils")

const { REWARD_ADDRESS_TO_NAME, REWARD_ADDRESS_TO_DECIMAL } = require('./quest_rewards');

const hmy = new Harmony(
    autils.getRpc(config.useRpcIndex),
    {
        chainType: ChainType.Harmony,
        chainId: ChainID.HmyMainnet,
    },
);
hmy.wallet.addByPrivateKey(process.env.PRIVATE_KEY);

const LocalSignOn = true;

function completeQuestPattern(heroID)
{
    let rv = ""
    rv += "0x528be0a9" // Complete Quest
    rv += autils.intToInput(heroID) // hero id
    return rv
}

const BigIntWithDecimalToString = (amount, decimals) => {
    const amountBN = BigInt(amount);
    if (decimals > 0n)
    {
        return `${amount/10n ** decimals}.${number.toString().slice(-Number(decimals))}`;
    }
    return `${amountBN.toString(10)}`;
}

exports.CompleteQuests = async (heroesStruct, _questContract) => {

    if (heroesStruct.completedQuesters.length > 0)
    {
        const completedHeroId = heroesStruct.completedQuesters[0];
        const txn = hmy.transactions.newTx({
            // contract address
            to: _questContract,
            // amount of one to send
            value: 0,
            // gas limit, you can use string
            gasLimit: config.gasLimit,
            // send token from shardID
            shardID: 0,
            // send token to toShardID
            toShardID: 0,
            // gas Price, you can use Unit class, and use Gwei, then remember to use toWei(), which will be transformed to BN
            gasPrice: config.gasPrice,
            // tx data
            data: completeQuestPattern(completedHeroId)
        });
          
        // sign the transaction use wallet;
        const signedTxn = await hmy.wallet.signTransaction(txn);
        //  console.log(signedTxn);
        if (LocalSignOn === true)
        {
            const txnHash = await hmy.blockchain.createObservedTransaction(signedTxn).promise;
            console.log("!!! sending the message on the wire !!!");
            console.log("Completed Quest for heroid:" + completedHeroId);
            //console.log(txnHash); // this is the txn hash object
            // printing out rewards
            if (txnHash.txStatus === 'CONFIRMED') {
                autils.rewardLog(txnHash.id);
                txnHash.receipt.logs.forEach((log) => {
                    if (log.topics[0] === '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef')
                    {
                        const rewardName = REWARD_ADDRESS_TO_NAME[log.address] || log.address;
                        const rewardAmount = BigIntWithDecimalToString(log.data, REWARD_ADDRESS_TO_DECIMAL[log.address] || 0n);
                        autils.rewardLog(`${rewardName}: ${rewardAmount}`);
                    }
                });
            }
            
            return 1;
        }
    }
    return 0;
}
