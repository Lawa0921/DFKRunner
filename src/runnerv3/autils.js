const config = require("./config.json");
const date = require('date-and-time');
const fs = require('fs');

exports.getRpc = function getRpc(index) {
    return config.rpcs[index];
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

// latest block number
let _localLatest = 0;
exports.getLatestBlockNumber = () => {
    return _localLatest;
}

exports.setLatestBlockNumber = (latestBlock) => {
    _localLatest = latestBlock;
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

exports.logSimulation = (myString) => {
    console.log(myString);
    // fs.appendFileSync("simulation", myString + "\n");
}

exports.txnFailLog = (txn) => {
    str = `${new Date().toLocaleTimeString()} txn fail, detail: ${JSON.stringify(txn)}`
    console.log(str);
}

exports.gasSettingFormater = () => {
    return { gasPrice: config.gasPrice, gasLimit: config.gasLimit };
}

exports.watchHeroLog = async (hero, price, valuator) => {
    let idAndRarity = `${hero.id} ${hero.formatRarity()}`;
    let info = `\x1b[3m LV${hero.level} ${hero.profession} G${hero.generation} ${hero.summons_remaining}/${hero.maxsummons} \x1b[0m`;
    let mainClass = hero.formatMainclass();
    let subClass =  hero.formatSubclass();
    let skillInfo = `${heroSkillDyer(hero, "active1")}/${heroSkillDyer(hero, "active2")}/${heroSkillDyer(hero, "passive1")}/${heroSkillDyer(hero, "passive2")}`
    let listInfo = `${strToAnsiRed(parseInt(price) / Math.pow(10, 18))} J, valuate: ${strToAnsiRed(valuator)} J`

    if (hero.formatRarity()=== "UnCommon") {
        idAndRarity = strToAnsiGreen(idAndRarity);
    } else if (hero.formatRarity() === "Rare") {
        idAndRarity = strToAnsiBlue(idAndRarity);
    } else if (hero.formatRarity() === "Legendary") {
        idAndRarity = strToAnsiOrange(idAndRarity);
    } else if (hero.formatRarity() === "Mythic") {
        idAndRarity = strToAnsiPurple(idAndRarity);
    }

    if (hero.attributeTier("mainclass") === "Advanced") {
        mainClass = strToAnsiGreen(mainClass);
    } else if (hero.attributeTier("mainclass") === "Elite") {
        mainClass = strToAnsiBrown(mainClass);
    } else if (hero.attributeTier("mainclass") === "Transcendant") {
        mainClass = strToAnsiRed(mainClass);
    }

    if (hero.attributeTier("subclass") === "Advanced") {
        subClass = strToAnsiGreen(subClass);
    } else if (hero.attributeTier("subclass") === "Elite") {
        subClass = strToAnsiBrown(subClass);
    } else if (hero.attributeTier("subclass") === "Transcendant") {
        subClass = strToAnsiRed(subClass);
    }

    str = idAndRarity + ", " + mainClass + "/" + subClass + " " + info + " +" + strToAnsiGreen(hero.statboost1) + "/" + strToAnsiBlue(hero.statboost2) + " " + skillInfo + " " + listInfo
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
