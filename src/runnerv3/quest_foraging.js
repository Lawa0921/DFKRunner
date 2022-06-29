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

const questABI_21apr2022 = require('./abi/questABI_21apr2022.json')
let questContract = hmy.contracts.createContract(
    questABI_21apr2022,
    config.questContract_21Apr2022,   
    {
        defaultGas: config.gasLimit,
        defaultGasPrice: config.gasPrice
    });

const LocalSignOn = true;

function foragingPattern(hero1,hero2,hero3,hero4,hero5,hero6,attempts)
{
    if (hero1 === 0)
    {
        throw new Error("Tried to send create a foraging pattern without heroes")
        return ""
    }

    let rv = ""
    rv += "0x8a2da17b" // start Quest
    rv += "0000000000000000000000000000000000000000000000000000000000000080" // version
    rv += "000000000000000000000000b465f4590095dad50fee6ee0b7c6700ac2b04df8" // quest
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

exports.CheckAndSendForagers = async (heroesStruct, isPro) => {
    // too lazy to change struct in config
    let questType = config.quests[1]
    if (questType.name !== "Foraging")
    {
        throw new Error("config index was changed");
    }

    let minBatch = isPro ? questType.professionHeroes.length : questType.nonProfessionHeroes.length;
    let maxBatch = 1;
    minBatch = minBatch > maxBatch ? maxBatch : minBatch;
    let proStamUsage = 5;
    let normStamUsage = 7;
    let minStam = isPro ? questType.proMinStam : questType.normMinStam;
    let proForagingTries = Math.round(minStam/proStamUsage);
    let normForagingTries = Math.round(minStam/normStamUsage);
    let foragingTries = isPro ? proForagingTries : normForagingTries;

    let activeQuesters = heroesStruct.allQuesters
    let configForagers = isPro ? questType.professionHeroes : questType.nonProfessionHeroes
    //console.log(activeQuesters);
    //console.log(configForagers);
    let possibleForagers = configForagers.filter((e) => {
        return (activeQuesters.indexOf(e) < 0);
      });

    let ForagerPromises = []
    possibleForagers.forEach(hero => {
        ForagerPromises.push(questContract.methods.getCurrentStamina(hero).call(undefined, autils.getLatestBlockNumber()))
    });

    let staminaValues = await Promise.allSettled(ForagerPromises);
    staminaValues = staminaValues.map(res => res = res.value?.toNumber() || 0);

    // Batching foragers. we only take 6. -> next iteration then we go again
    LocalBatching = []
    for (let index = 0; index < possibleForagers.length; index++) {
        const stam = staminaValues[index];
        if ( stam >= minStam )
        {
            LocalBatching.push(possibleForagers[index]);
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

    console.log("Forager Batches" + (isPro ? " (P): " : " (N): ") + LocalBatching)

    // be lazy only send 1 batch for now.. next minute can send another
    
    if (numHeroesToSend >= minBatch && minBatch > 0)
    {
        // let GasLimit = await hmy.blockchain.estimateGas({ 
        //     to: config.questContract,
        //     shardID: 0,
        //     data: foragingPattern(LocalBatching[0],LocalBatching[1],LocalBatching[2],LocalBatching[3],LocalBatching[4],LocalBatching[5],foragingTries) })

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
            data: foragingPattern(LocalBatching[0],LocalBatching[1],LocalBatching[2],LocalBatching[3],LocalBatching[4],LocalBatching[5],foragingTries)
        });
          
        // sign the transaction use wallet;
        const signedTxn = await hmy.wallet.signTransaction(txn);
        //  console.log(signedTxn);
        if (LocalSignOn === true)
        {
            console.log("!!! sending the message on the wire !!!");
            const txnHash = await hmy.blockchain.createObservedTransaction(signedTxn).promise;
        }
        
        console.log("Sent " + LocalBatching + " on a " + (isPro ? "professional" : "normal") + "Foraging Quest")
        return 1;
    }
    
    return 0;
}

exports.SendForagerOnQuest = async (heroID, attempts) => {
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
        data: foragingPattern(heroID,0,0,0,0,0,attempts)
    });
      
    // sign the transaction use wallet;
    const signedTxn = await hmy.wallet.signTransaction(txn);
    //  console.log(signedTxn);
    if (LocalSignOn === true)
    {
        console.log("!!! sending the message on the wire !!!");
        const txnHash = await hmy.blockchain.createObservedTransaction(signedTxn).promise;
    }
    console.log("Sent " + heroID + " on a Foraging Quest")
    return 1;
}
