const config = require("~/config.js")
const RaffleMaster = require("~/src/defikingdoms/contracts/raffleMaster")
const DuelRaffleTicket = require("~/src/defikingdoms/contracts/duelRaffeTicket")

exports.enterRaffle = async (accountInfo) => {
  if (config.defikingdoms.raffleSetting.isActive) {
    const duelRaffleTicketContract = new DuelRaffleTicket(accountInfo)
    const raffleMasterContract = new RaffleMaster(accountInfo)
    const currentRaffleData = await raffleMasterContract.getCurrentRaffleData()
    const duelRaffleTicketBalance = await duelRaffleTicketContract.balanceOf()
    const enterRafflePromise = []
  
    currentRaffleData.forEach((raffleData, index) => {
      if (raffleData.playerEntryAmount === 0 && duelRaffleTicketBalance - (config.defikingdoms.raffleSetting.enterAmount * index) > config.defikingdoms.raffleSetting.enterAmount) {
        enterRafflePromise.push(raffleMasterContract.enterRaffle(raffleData.raffleId, config.defikingdoms.raffleSetting.enterAmount))
      }
    })

    await Promise.allSettled(enterRafflePromise)
  }
}