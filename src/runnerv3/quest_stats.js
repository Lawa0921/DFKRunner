/*
0x8a2da17b
0000000000000000000000000000000000000000000000000000000000000080
000000000000000000000000cb594a24d802cdf65000a84dc0059dde11c9d15f
0000000000000000000000000000000000000000000000000000000000000002
0000000000000000000000000000000000000000000000000000000000000001
0000000000000000000000000000000000000000000000000000000000000001
0000000000000000000000000000000000000000000000000000000000012cd4
*/
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
let questContract_21Apr2022 = hmy.contracts.createContract(
    questABI_21apr2022,
    config.questContract_21Apr2022,   
    {
        defaultGas: config.gasLimit,
        defaultGasPrice: config.gasPrice
    });

const LocalSignOn = true;

exports.CheckAndSendStatQuests = async (heroesStruct) => {

    let sentTx = 0;
    let counter = 0;
    while (counter < 8)
    {
        let questType = config.statQuests[counter]
        let minBatch = 1
        let maxBatch = 1;
        let minStam = questType.normMinStam

        let activeQuesters = heroesStruct.allQuesters;
        let questHeroes = questType.heroes;
        let possibleQuestHeroes = questHeroes.filter((e) => {
            return (activeQuesters.indexOf(e) < 0);
        });

        let statQuesterPromises = []
        possibleQuestHeroes.forEach(hero => {
            statQuesterPromises.push(questContract_21Apr2022.methods.getCurrentStamina(hero).call(undefined, autils.getLatestBlockNumber()))
        });

        let staminaValues = await Promise.allSettled(statQuesterPromises);
        staminaValues = staminaValues.map(res => res = res.value?.toNumber() || 0);

        // Batching heroes. we only take 6. -> next iteration then we go again
        LocalBatching = []
        for (let index = 0; index < possibleQuestHeroes.length; index++) {
            const stam = staminaValues[index];
            if ( stam >= minStam )
            {
                LocalBatching.push(possibleQuestHeroes[index]);
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

        console.log(questType.name + ': ' + LocalBatching)

        // be lazy only send 1 batch for now.. next minute can send another
        if (numHeroesToSend >= minBatch && minBatch > 0)
        {
            const txn = hmy.transactions.newTx({
                // quest contract address
                to: config.questContract_21Apr2022,
                // amount of one
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
                data: statQuestPattern(LocalBatching[0], questType.name, minStam / 5)
            });


            // sign the transaction use wallet;
            const signedTxn = await hmy.wallet.signTransaction(txn);
            if (LocalSignOn === true)
            {
                const txnHash = await hmy.blockchain.createObservedTransaction(signedTxn).promise;
                console.log("!!! sending the message on the wire !!!");
            }
            
            console.log("Sent " + LocalBatching + " on a " + questType.name)
            sentTx += 1;
        }
        counter += 1;
    }

    return sentTx;
}

const statQuestPattern = (hero, stat, attempts) => {
    if (hero === 0) {
        throw new Error("Tried to send create a stat pattern without heroes")
    }

    let rv = ""
    rv += "0x8a2da17b" // start Quest
    rv += "0000000000000000000000000000000000000000000000000000000000000080" // version i think
    rv += statAddress(stat) // questAddress
    let heroCount = 1;
    // if (hero1 > 0) { ++heroCount; }
    // if (hero2 > 0) { ++heroCount; }
    // if (hero3 > 0) { ++heroCount; }
    // if (hero4 > 0) { ++heroCount; }
    // if (hero5 > 0) { ++heroCount; }
    // if (hero6 > 0) { ++heroCount; }

    rv += autils.intToInput(attempts); // attempts
    rv += "0000000000000000000000000000000000000000000000000000000000000001" // level
    rv += autils.intToInput(heroCount); // hero count

    if (hero > 0) { rv += autils.intToInput(hero); }
    // if (hero1 > 0) { rv += autils.intToInput(hero1); }
    // if (hero2 > 0) { rv += autils.intToInput(hero2); }
    // if (hero3 > 0) { rv += autils.intToInput(hero3); }
    // if (hero4 > 0) { rv += autils.intToInput(hero4); }
    // if (hero5 > 0) { rv += autils.intToInput(hero5); }
    // if (hero6 > 0) { rv += autils.intToInput(hero6); }

    return rv;
}

/*
Str - 0xf60AF3a32Bb94e395E17C70aB695d968F37Bd2e4
Dex - 0xe03fd4e2F6421b1251297240cE5248508C9104eD
Agi - 0xFA20B218927B0f57a08196743488c7C790a5625B
Vit - 0x2174bBeFbEFBD766326a7C7538f93a78Db3eD449
End - 0xCb594A24D802cdF65000A84dC0059dde11c9d15f
Int - 0x6176EedE1AE9127D59266f197Ad598653E4F8c92
Wis - 0x347097454fA1931A4e80dcDebb31F29FC355CbCE
Luk - 0x13E74E4E64805E7fdA381C9BEF1e77cd16086E56
*/
const statAddress = (input) => {
    switch (input)
    {
    case 'StatQuest_Str':
        return '000000000000000000000000f60af3a32bb94e395e17c70ab695d968f37bd2e4'
    case 'StatQuest_Dex':
        return '000000000000000000000000e03fd4e2f6421b1251297240ce5248508c9104ed'
    case 'StatQuest_Agi':
        return '000000000000000000000000fa20b218927b0f57a08196743488c7c790a5625b'
    case 'StatQuest_Vit':
        return '0000000000000000000000002174bbefbefbd766326a7c7538f93a78db3ed449'
    case 'StatQuest_End':
        return '000000000000000000000000cb594a24d802cdf65000a84dc0059dde11c9d15f'
    case 'StatQuest_Int':
        return '0000000000000000000000006176eede1ae9127d59266f197ad598653e4f8c92'
    case 'StatQuest_Wis':
        return '000000000000000000000000347097454fa1931a4e80dcdebb31f29fc355cbce'
    case 'StatQuest_Luk':
        return '00000000000000000000000013e74e4e64805e7fda381c9bef1e77cd16086e56'
    default:
        throw new Error('Invalid Stat!');
    }
}

exports.SendHeroOnStatQuest = async (heroID, questName) =>{
    const id = parseInt(heroID,10);
    const txn = hmy.transactions.newTx({
        // quest contract address
        to: config.questContract_21Apr2022,
        // amount of one
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
        data: statQuestPattern(id, questName, 5)
    });


    // sign the transaction use wallet;
    const signedTxn = await hmy.wallet.signTransaction(txn);
    if (LocalSignOn === true)
    {
        console.log("!!! sending the message on the wire !!!");
        const txnHash = await hmy.blockchain.createObservedTransaction(signedTxn).promise;
    }
    console.log("Sent " + heroID + " on a " + questName)
    return 1;
}
