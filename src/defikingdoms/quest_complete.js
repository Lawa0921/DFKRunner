const QuestCoreV2 = require('~/src/defikingdoms/contracts/questCoreV2')
const questCoreV2Contract = new QuestCoreV2();

exports.CompleteQuests = async (heroesStruct) => {
  if (heroesStruct.completedQuesters.length > 0) {
    let completeQuestPromises = heroesStruct.completedQuesters.map((completedQuesterId) => {
      return completeQuest(completedQuesterId)
    })

    await Promise.allSettled(completeQuestPromises)
  } else {
    console.log("No quest should be complete.")
  }
}

completeQuest = async (completedQuesterId) => {
  const tx = await questCoreV2Contract.completeQuest(completedQuesterId)
  const res = await tx.wait();

  if (res.status === 1) {
    console.log(completedQuesterId + " Quest completed")
  } else {
    console.log(completedQuesterId + " Quest complete failed");
  }
}
