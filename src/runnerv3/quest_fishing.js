require('dotenv').config()
const { Harmony } = require('@harmony-js/core');
const {
    ChainID,
    ChainType,
  } = require('@harmony-js/utils');

const config = require("./config.json");
const autils = require("./autils")

const hmy = new Harmony(
    autils.getRpc(config.useRpcIndex),
    {
        chainType: ChainType.Harmony,
        chainId: ChainID.HmyMainnet,
    },
);
hmy.wallet.addByPrivateKey(process.env.PRIVATE_KEY);

const questABI_21apr2022 = require('./abi/questABI_21apr2022.json');
let questContract = hmy.contracts.createContract(
    questABI_21apr2022,
    config.questContract_21Apr2022,   
    {
        defaultGas: config.gasLimit,
        defaultGasPrice: config.gasPrice
    });

const LocalSignOn = true;

function fishingPattern(hero1,hero2,hero3,hero4,hero5,hero6,attempts)
{
    if (hero1 === 0)
    {
        throw new Error("Tried to send create a fishing pattern without heroes")
    }

    let rv = ""
    rv += "0x8a2da17b" // start Quest
    rv += "0000000000000000000000000000000000000000000000000000000000000080" // version i think
    rv += "000000000000000000000000adffd2a255b3792873a986895c6312e8fbacfc8b" // quest
    let heroCount = 0;
    if (hero1 > 0) { ++heroCount; }
    if (hero2 > 0) { ++heroCount; }
    if (hero3 > 0) { ++heroCount; }
    if (hero4 > 0) { ++heroCount; }
    if (hero5 > 0) { ++heroCount; }
    if (hero6 > 0) { ++heroCount; }

    rv += autils.intToInput(attempts); // attempts
    rv += "0000000000000000000000000000000000000000000000000000000000000000" // level
    rv += autils.intToInput(heroCount); // hero count

    if (hero1 > 0) { rv += autils.intToInput(hero1); }
    if (hero2 > 0) { rv += autils.intToInput(hero2); }
    if (hero3 > 0) { rv += autils.intToInput(hero3); }
    if (hero4 > 0) { rv += autils.intToInput(hero4); }
    if (hero5 > 0) { rv += autils.intToInput(hero5); }
    if (hero6 > 0) { rv += autils.intToInput(hero6); }

    return rv;
}

exports.CheckAndSendFishers = async (heroesStruct, isPro) => {
    let questType = config.quests[0]
    if (questType.name !== "Fishing")
    {
        throw new Error("config index was changed");
    }

    let minBatch = isPro ? questType.professionHeroes.length : questType.nonProfessionHeroes.length;
    let maxBatch = 1;
    minBatch = minBatch > maxBatch ? maxBatch : minBatch;
    let proStamUsage = 5;
    let normStamUsage = 7;
    let minStam = isPro ? questType.proMinStam : questType.normMinStam;
    let proFishingTries = Math.round(minStam/proStamUsage);
    let normFishingTries = Math.round(minStam/normStamUsage);
    let fishingTries = isPro ? proFishingTries : normFishingTries;

    let activeQuesters = heroesStruct.allQuesters
    let configFishers = isPro ? questType.professionHeroes : questType.nonProfessionHeroes

    //console.log(activeQuesters);
    //console.log(configFishers);
    let possibleFishers = configFishers.filter((e) => {
        return (activeQuesters.indexOf(e) < 0);
      });

    let FisherPromises = []
    possibleFishers.forEach(fisher => {
        FisherPromises.push(questContract.methods.getCurrentStamina(fisher).call(undefined, autils.getLatestBlockNumber()))
    });

    let staminaValues = await Promise.allSettled(FisherPromises);
    staminaValues = staminaValues.map(res => res = res.value?.toNumber() || 0);
    
    // Batching fishers. we only take 6. -> next iteration then we go again
    LocalBatching = []
    for (let index = 0; index < possibleFishers.length; index++) {
        const stam = staminaValues[index];
        if ( stam >= minStam )
        {
            LocalBatching.push(possibleFishers[index]);
        }

        // list full
        if (LocalBatching.length === maxBatch)
        {
            break;
        }
    }

    let numHeroesToSend = LocalBatching.length;
    // fill the last batch up
    if (LocalBatching.length > 0)
    {
        while(LocalBatching.length < maxBatch)
        {
            LocalBatching.push(0)
        }
    }

    console.log("Fishing Batches" + (isPro ? " (P): " : " (N): ") + LocalBatching)

    // be lazy only send 1 batch for now.. next minute can send another
    if (numHeroesToSend >= minBatch && minBatch > 0)
    {
        const txn = hmy.transactions.newTx({
            to: config.questContract_21Apr2022,
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
            data: fishingPattern(LocalBatching[0],LocalBatching[1],LocalBatching[2],LocalBatching[3],LocalBatching[4],LocalBatching[5],fishingTries)
        });
          
        // sign the transaction use wallet;
        const signedTxn = await hmy.wallet.signTransaction(txn);
        //  console.log(signedTxn);
        if (LocalSignOn === true)
        {
            const txnHash = await hmy.blockchain.createObservedTransaction(signedTxn).promise;
            console.log("!!! sending the message on the wire !!!");
        }
        console.log("Sent " + LocalBatching + " on a Fishing Quest")
    }    
}

exports.SendFisherOnQuest = async (heroID, attempts) => {
    const txn = hmy.transactions.newTx({
        to: config.questContract_21Apr2022,
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
        data: fishingPattern(heroID,0,0,0,0,0,attempts)
    });
      
    // sign the transaction use wallet;
    const signedTxn = await hmy.wallet.signTransaction(txn);
    //  console.log(signedTxn);
    if (LocalSignOn === true)
    {
        console.log("!!! sending the message on the wire !!!");
        const txnHash = await hmy.blockchain.createObservedTransaction(signedTxn).promise;
    }
    console.log("Sent " + heroID + " on a Fishing Quest")
    return 1;
}
