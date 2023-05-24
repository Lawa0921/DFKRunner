const QuestCoreV3 = require('./contracts/questCoreV3')

exports.CompleteQuests = async (heroesStruct, accountInfo) => {
  const questCoreV3Contract = new QuestCoreV3(accountInfo)

  if (heroesStruct.completedLeadQuesters.length > 0) {
    let completeQuestPromises = heroesStruct.completedLeadQuesters.map((completedQuesterId) => {
      return completeQuest(completedQuesterId, questCoreV3Contract, accountInfo.accountName)
    })

    await Promise.allSettled(completeQuestPromises)
  } else {
    console.log(`${accountInfo.accountName} DFK No quest should be complete.`)
  }
}

completeQuest = async (completedQuesterId, questCoreV3Contract, accountName) => {
  console.log(`${accountName} DFK sending complete ${completedQuesterId} quest`)
  const tx = await questCoreV3Contract.completeQuest(completedQuesterId)
  const res = await tx.wait();

  if (res.status === 1) {
    console.log(`${accountName} DFK ${completedQuesterId} Quest completed`)
  } else {
    console.log(`${accountName} DFK ${completedQuesterId} Quest complete failed`);
  }
}
