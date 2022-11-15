const AirdropClaim = require("~/src/defikingdoms/contracts/airdropClaim")

exports.airdropClaim = async (accountInfo) => {
  const airdropClaimContract = new AirdropClaim(accountInfo)
  const airdrops = await airdropClaimContract.viewAirdrops()

  if (airdrops.length > 0) {
    for (let i = 0; i < airdrops.length; i++) {
      await airdropClaimContract.claimAirdrop(airdrops[i].id)
    }
  }
}