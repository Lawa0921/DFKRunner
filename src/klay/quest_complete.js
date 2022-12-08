const QuestCoreV2 = require('~/src/klay/contracts/questCoreV2')

exports.CompleteQuests = async (heroesStruct, accountInfo) => {
  const questCoreV2Contract = new QuestCoreV2(accountInfo)

  if (heroesStruct.completedLeadQuesters.length > 0) {
    let completeQuestPromises = heroesStruct.completedLeadQuesters.map((completedQuesterId) => {
      return completeQuest(completedQuesterId, questCoreV2Contract, accountInfo.accountName)
    })

    await Promise.allSettled(completeQuestPromises)
  } else {
    console.log(`${accountInfo.accountName} KLAY No quest should be complete.`)
  }
}

completeQuest = async (completedQuesterId, questCoreV2Contract, accountName) => {
  console.log(`${accountName} KLAY sending complete ${completedQuesterId} quest`)
  const tx = await questCoreV2Contract.completeQuest(completedQuesterId)
  const res = await tx.wait();

  if (res.status === 1) {
    console.log(`${accountName} KLAY ${completedQuesterId} Quest completed`)
  } else {
    console.log(`${accountName} KLAY ${completedQuesterId} Quest complete failed`);
  }
}
