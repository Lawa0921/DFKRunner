const config = require("~/config.js");
const date = require('date-and-time');
const fs = require('fs');
const axios = require('axios');
const ethers = require('ethers');
const axiosRetry = require('axios-retry');
const Hero = require('~/src/services/hero');

axiosRetry(axios, {
    retries: 5, // number of retries
    retryDelay: (retryCount) => {
      console.log(`retry attempt: ${retryCount}`);
      return retryCount * 2000; // time interval between retries
    },
    retryCondition: (error) => {
      return error.response.status === 500 || error.response.status === 504;
    },
});

exports.getRpc = function getRpc(index) {
    return config.harmony.rpcs[index];
}

exports.displayTime = function displayTime(timestamp) {
    var a = new Date(timestamp * 1000);
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    return hour + ":" + min + ":" + sec;
}

exports.log = function log(mystring, isError)
{
    console.log(mystring);
    if (isError)
    {
        fs.appendFileSync("logs", (new Date()).toLocaleTimeString() + ": " + mystring+"\n");
    }
}

exports.logRewards = (txnHash) => {
    fs.appendFileSync("logs", (new Date()).toLocaleTimeString() + ": " + JSON.stringify(txnHash)+"\n");
}

exports.intToInput = function intToInput(myint)
{
    return parseInt(myint).toString(16).padStart(64,"0");
}

// rewards parsing
let _localRewardsTxns = [];
exports.addRewardTx = (txnHash) => {
    _localRewardsTxns.push(txnHash);
}

exports.getRewardTxns = () => {
    return _localRewardsTxns;
}

exports.resetRewardTxns = () =>{
    _localRewardsTxns = [];
}

exports.rewardLog = (myString) => {
    console.log(myString);
    fs.appendFileSync("rewards", myString + "\n");
}

exports.bidHeroLog = (message) => {
    console.log(message);
    fs.appendFileSync("bid_heros", message + "\n");
}

exports.txnFailLog = (txn) => {
    str = `${new Date().toLocaleTimeString()} txn fail, detail: ${JSON.stringify(txn)}`
    console.log(str);
}

exports.getCurrentDateTime = () => {
    return date.addMinutes(new Date(Date.now()), 0);
}

exports.isAPIv6Owner = async (heroId) => {
    let returnValue = false;
    await axios.post(config.queryHeroEndPoint,
        {"limit":1,"params":[{"field":"id","operator":"=","value":heroId.toString()}],"offset":0}
    ).then((reply) => {
        if (reply.data[0].owner_address.toLowerCase() === config.walletAddress.toLowerCase()) {
            returnValue = true;
        }
    }).catch((_err) => {
        returnValue = false;
    })
    return returnValue;
}

exports.formatPrice = (price) => {
    return (BigInt(price) * BigInt(10 ** 18)).toString();
}

exports.ethersFormatNumberToWei = (price) => {
    return ethers.utils.parseUnits(price.toString(), 18)
}

exports.getBaseGasFee = async () => {
    const provider = new ethers.providers.JsonRpcProvider(config.defikingdoms.rpcs[config.defikingdoms.useRpcIndex])
    const gasInfo = await provider.getFeeData()

    return parseInt(gasInfo.lastBaseFeePerGas) + 1000
}

exports.getHerosInfo = async (heroIds) => {
    if (heroIds.length === 0) {
        return []
    }

    let heroObjects;
    queryStr = `{
        heroes(where: {id_in: ${JSON.stringify(heroIds)}}) {
            id
            owner {
                owner
            }
            rarity
            network
            mainClass
            subClass
            summonsRemaining
            profession
            generation
            level
            passive1
            passive2
            active1
            active2
            statBoost1
            statBoost2
            hairStyle
            backAppendage
            maxSummons
            currentQuest
            xp
            strength
            intelligence
            wisdom
            luck
            agility
            vitality
            endurance
            dexterity
            stamina
            staminaFullAt
            nextSummonTime
            saleAuction {
                startingPrice
                open
            }
            assistingAuction {
                startingPrice
                open
            }
        }
      }`

    await axios.post(config.graphqlEndPoint, { query: queryStr }).then((res) => {
        heroObjects = res.data.data.heroes.map((heroData) => { return new Hero(heroData) });
    }).catch((err) => {
        console.log(err);
    })

    return heroObjects;
}

exports.getOnAuctionHeroInfos = async () => {
    let skipCount = 0;
    let heroObjects = [];

    while(skipCount === 0 || skipCount % 1000 === 0) {
        const queryStr = `{
            saleAuctions (where: {open: true}, skip: ${JSON.stringify(skipCount)}) {
            id
            tokenId {
                id
                owner {
                    owner
                }
                rarity
                network
                mainClass
                subClass
                summonsRemaining
                profession
                generation
                level
                passive1
                passive2
                active1
                active2
                statBoost1
                statBoost2
                hairStyle
                backAppendage
                maxSummons
                currentQuest
                xp
                strength
                intelligence
                wisdom
                luck
                agility
                vitality
                endurance
                dexterity
            }
            startingPrice
            open
          }
        }`

        await axios.post(config.graphqlEndPoint, { query: queryStr }).then((res) => {
            heroObjects = heroObjects.concat(res.data.data.saleAuctions.map((onAuctionHeroInfo) => { return { price: onAuctionHeroInfo.startingPrice, hero: new Hero(onAuctionHeroInfo.tokenId) }}))
            skipCount += res.data.data.saleAuctions.length;
        }).catch((err) => {
            console.log(err);
        })
    }

    return heroObjects;
}

exports.get0xAddress = () => {
    return "0x0000000000000000000000000000000000000000"
}

exports.getDFKOwningHeroIds = () => {
    let heroIds = [];

    heroIds = heroIds.concat(config.defikingdoms.quest.fishing.heroes);
    heroIds = heroIds.concat(config.defikingdoms.quest.foraging.heroes);
    heroIds = heroIds.concat(config.defikingdoms.quest.goldMining.heroes);
    heroIds = heroIds.concat(config.defikingdoms.quest.crystalMining.heroes);

    for (let i = 0; i < config.defikingdoms.quest.statQuests.length; i++ ) {
        heroIds = heroIds.concat(config.defikingdoms.quest.statQuests[i].heroes);
    }

    for (let i = 0; i < config.defikingdoms.quest.gardening.pairAddressMappings.length; i++) {
        heroIds = heroIds.concat(config.defikingdoms.quest.gardening.pairAddressMappings[i].heroes);
    }
  
    return heroIds;
}

exports.getAllConfigHeroIds = () => {
    return this.getDFKOwningHeroIds();
}

exports.watchHeroLog = async (hero, price, valuator, network) => {
    const networkCurrencies = {
        hmy: "J",
        dfk: "C"
    }
    let idAndRarity = `${hero.id} ${hero.formatRarity()}`;
    let profession = `${hero.profession}`
    let info = `\x1b[3m LV${hero.level} G${hero.generation} ${hero.summonsRemaining}/${hero.maxSummons} \x1b[0m`;
    let mainClass = hero.mainClass;
    let subClass =  hero.subClass;
    let skillInfo = `${heroSkillDyer(hero, "active1")}/${heroSkillDyer(hero, "active2")}/${heroSkillDyer(hero, "passive1")}/${heroSkillDyer(hero, "passive2")}`
    let hair = "hair";
    let backappendage = "back";
    let listInfo = `${strToAnsiRed(parseInt(price) / Math.pow(10, 18))} ${networkCurrencies[network]}, valuate: ${strToAnsiRed(valuator)} ${networkCurrencies[network]}`

    if (hero.formatRarity()=== "UnCommon") {
        idAndRarity = strToAnsiGreen(idAndRarity);
    } else if (hero.formatRarity() === "Rare") {
        idAndRarity = strToAnsiBlue(idAndRarity);
    } else if (hero.formatRarity() === "Legendary") {
        idAndRarity = strToAnsiOrange(idAndRarity);
    } else if (hero.formatRarity() === "Mythic") {
        idAndRarity = strToAnsiPurple(idAndRarity);
    }

    if (hero.attributeTier("mainClass") === "Advanced") {
        mainClass = strToAnsiGreen(mainClass);
    } else if (hero.attributeTier("mainClass") === "Elite") {
        mainClass = strToAnsiCyan(mainClass);
    } else if (hero.attributeTier("mainClass") === "Transcendant") {
        mainClass = strToAnsiRed(mainClass);
    }

    if (hero.attributeTier("subClass") === "Advanced") {
        subClass = strToAnsiGreen(subClass);
    } else if (hero.attributeTier("subClass") === "Elite") {
        subClass = strToAnsiCyan(subClass);
    } else if (hero.attributeTier("subClass") === "Transcendant") {
        subClass = strToAnsiRed(subClass);
    }

    if (hero.attributeTier("hairStyle") === "Advanced") {
        hair = strToAnsiGreen(hair);
    } else if (hero.attributeTier("hairStyle") === "Elite") {
        hair = strToAnsiCyan(hair);
    } else if (hero.attributeTier("hairStyle") === "Transcendant") {
        hair = strToAnsiRed(hair);
    }

    if (hero.attributeTier("backAppendage") === "Advanced") {
        backappendage = strToAnsiGreen(backappendage);
    } else if (hero.attributeTier("backAppendage") === "Elite") {
        backappendage = strToAnsiCyan(backappendage);
    } else if (hero.attributeTier("backAppendage") === "Transcendant") {
        backappendage = strToAnsiRed(backappendage);
    }

    if (hero.selfProfessionMatch() && hero.summonProfessionMatch()) {
        profession = strToAnsiRed(profession);
    } else if (hero.selfProfessionMatch()) {
        profession = strToAnsiCyan(profession);
    } else if (hero.summonProfessionMatch()) {
        profession = strToAnsiGreen(profession);
    }

    str = idAndRarity + ", " + mainClass + "/" + subClass + " " + profession + " " + info + " +" + strToAnsiGreen(hero.statboost1) + "/" + strToAnsiBlue(hero.statboost2) + " " + skillInfo + " " + hair + "/" + backappendage + " " + listInfo
    console.log(str);
}

const strToAnsiRed = (str) => {
    return "\x1b[31m" + str + "\x1b[0m"
}

const strToAnsiGreen = (str) => {
    return "\x1b[32m" + str + "\x1b[0m"
}

const strToAnsiOrange = (str) => {
    return "\x1b[33m" + str + "\x1b[0m"
}

const strToAnsiBlue = (str) => {
    return "\x1b[34m" + str + "\x1b[0m"
}

const strToAnsiPurple = (str) => {
    return "\x1b[35m" + str + "\x1b[0m"
}

const strToAnsiCyan = (str) => {
    return "\x1b[36m" + str + "\x1b[0m"
}

const strToAnsiBrown = (str) => {
    return "\x1b[93m" + str + "\x1b[0m"
}

const heroSkillDyer = (hero, attributeName) => {
    let skill = hero[attributeName];
    let attributeTier = hero.attributeTier(attributeName);
    let returnValue;

    returnValue = skill[0] + skill[skill.length - 1];

    if (attributeTier === "Advanced") {
        returnValue = strToAnsiGreen(returnValue)
    } else if (attributeTier === "Elite") {
        returnValue = strToAnsiCyan(returnValue)
    } else if (attributeTier === "Transcendant") {
        returnValue = strToAnsiPurple(returnValue)
    }

    return returnValue;
}
