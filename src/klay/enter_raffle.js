const config = require("~/config.js")
const RaffleMaster = require("~/src/klay/contracts/raffleMaster")
const DuelRaffleTicket = require("~/src/klay/contracts/duelRaffeTicket")

exports.enterRaffle = async (accountInfo) => {
  if (config.klay.raffleSetting.isActive) {
    const duelRaffleTicketContract = new DuelRaffleTicket(accountInfo)
    const raffleMasterContract = new RaffleMaster(accountInfo)
    const currentRaffleData = await raffleMasterContract.getCurrentRaffleData()
    const duelRaffleTicketBalance = await duelRaffleTicketContract.balanceOf()

    for (let i = 0; i < currentRaffleData.length; i++) {
      if (currentRaffleData[i].status === 1 && currentRaffleData[i].playerEntryAmount === 0 && duelRaffleTicketBalance - config.klay.raffleSetting.enterAmount > config.klay.raffleSetting.enterAmount) {
        await raffleMasterContract.enterRaffle(currentRaffleData[i].raffleId, config.klay.raffleSetting.enterAmount)
      }
    }
  }
}