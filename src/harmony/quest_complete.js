const { Harmony } = require('@harmony-js/core');
const {
    ChainID,
    ChainType,
  } = require('@harmony-js/utils');

const config = require("~/config.js");
const autils = require('~/src/services/autils')

const { REWARD_ADDRESS_TO_NAME, REWARD_ADDRESS_TO_DECIMAL } = require('./quest_rewards');

const hmy = new Harmony(
    autils.getRpc(config.harmony.useRpcIndex),
    {
        chainType: ChainType.Harmony,
        chainId: ChainID.HmyMainnet,
    },
);
hmy.wallet.addByPrivateKey(config.privateKey);

const BigIntWithDecimalToString = (amount, decimals) => {
    const amountBN = BigInt(amount);
    if (decimals > 0n)
    {
        return `${amountBN/10n ** decimals}.${amountBN.toString().slice(-Number(decimals)).toString().padStart(Number(decimals),'0')}`;
    }
    return `${amountBN.toString(10)}`;
}

exports.CompleteQuests = async (heroesStruct, contractAddress, contractAbi) => {
  if (heroesStruct.completedQuesters.length > 0) {
    const questContract = hmy.contracts.createContract(
      contractAbi,
      contractAddress,
      {
        defaultGas: config.harmony.gasLimit,
        defaultGasPrice: config.harmony.gasPrice
      }
    )

    for (let index = 0; index < heroesStruct.completedQuesters.length; index++) {
      await questContract.methods.completeQuest(heroesStruct.completedQuesters[index]).send(autils.gasSettingFormater()).then((result) => {
        if (result.transaction.txStatus === 'CONFIRMED') {
          autils.rewardLog(result.transaction.id);
          result.transaction.receipt.logs.forEach((log) => {
            if (log.topics[0] === '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef') {
              const rewardName = REWARD_ADDRESS_TO_NAME[log.address] || log.address;
              const rewardAmount = BigIntWithDecimalToString(log.data, REWARD_ADDRESS_TO_DECIMAL[log.address] || 0n);
              autils.rewardLog(`${rewardName}: ${rewardAmount}`);
            } else if (log.topics[0] === '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62') {
              autils.rewardLog(`TransferSingle: ${log.topics} ${log.data}`);
            }
          });
        } else {
          autils.txnFailLog(result);
        }
      }).catch((error) => {
        console.log(error);
      });
    };
  } else {
    console.log("No quest should be complete.")
  }
}
