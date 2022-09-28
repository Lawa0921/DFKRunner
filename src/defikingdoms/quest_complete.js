const QuestCoreV2 = require('~/src/defikingdoms/contracts/questCoreV2')

exports.CompleteQuests = async (heroesStruct, accountInfo) => {
  if (heroesStruct.completedQuesters.length > 0) {
    let completeQuestPromises = heroesStruct.completedQuesters.map((completedQuesterId) => {
      return completeQuest(completedQuesterId, accountInfo)
    })

    await Promise.allSettled(completeQuestPromises)
  } else {
    console.log("No quest should be complete.")
  }
}

completeQuest = async (completedQuesterId, accountInfo) => {
  const questCoreV2Contract = new QuestCoreV2(accountInfo)

  console.log(`sending complete ${completedQuesterId} quest`)
  const tx = await questCoreV2Contract.completeQuest(completedQuesterId)
  const res = await tx.wait();

  if (res.status === 1) {
    console.log(completedQuesterId + " Quest completed")
  } else {
    console.log(completedQuesterId + " Quest complete failed");
  }
}
