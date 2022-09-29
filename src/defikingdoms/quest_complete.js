const QuestCoreV2 = require('~/src/defikingdoms/contracts/questCoreV2')

exports.CompleteQuests = async (heroesStruct, accountInfo) => {
  const questCoreV2Contract = new QuestCoreV2(accountInfo)

  if (heroesStruct.completedQuesters.length > 0) {
    let completeQuestPromises = heroesStruct.completedQuesters.map((completedQuesterId) => {
      return completeQuest(completedQuesterId, questCoreV2Contract, accountInfo.accountName)
    })

    await Promise.allSettled(completeQuestPromises)
  } else {
    console.log(`${accountInfo.accountName} No quest should be complete.`)
  }
}

completeQuest = async (completedQuesterId, questCoreV2Contract, accountName) => {
  console.log(`${accountName} sending complete ${completedQuesterId} quest`)
  const tx = await questCoreV2Contract.completeQuest(completedQuesterId)
  const res = await tx.wait();

  if (res.status === 1) {
    console.log(`${accountName} ${completedQuesterId} Quest completed`)
  } else {
    console.log(`${accountName} ${completedQuesterId} Quest complete failed`);
  }
}
