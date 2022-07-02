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

exports.watchHeroLog = (hero, price, valuator) => {
    str = `${new Date().toLocaleTimeString()} id: ${hero.id}, ${hero.formatRarity()} LV${hero.level} ${hero.profession} G${hero.generation} ${hero.summons_remaining}/${hero.maxsummons} ${hero.formatMainclass()}/${hero.formatSubclass()}, ${hero.statboost1} ${hero.statboost2} listed ${parseInt(price) / Math.pow(10, 18)} J, valuate: ${valuator} J `
    console.log(str);
}

exports.bidHeroLog = (message) => {
    console.log(message);
    fs.appendFileSync("bid_heros", message + "\n");
}

exports.logSimulation = (myString) => {
    console.log(myString);
    // fs.appendFileSync("simulation", myString + "\n");
}
