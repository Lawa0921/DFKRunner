const QuestCoreV2 = require('~/src/defikingdoms/contracts/questCoreV2')
const autils = require('~/src/services/autils')

exports.CompleteQuests = async (heroesStruct) => {
  if (heroesStruct.completedQuesters.length > 0) {
    const questCoreV2Contract = new QuestCoreV2();

    for (let index = 0; index < heroesStruct.completedQuesters.length; index++) {
      const tx = await questCoreV2Contract.completeQuest(heroesStruct.completedQuesters[index])
      const res = await tx.wait();
  
      if (res.status === 1) {
        console.log(heroesStruct.completedQuesters[index] + " Quest completed")
      } else {
        autils.txnFailLog(heroesStruct.completedQuesters[index] + " Quest complete failed");
      }
    };
  } else {
    console.log("No quest should be complete.")
  }
}
