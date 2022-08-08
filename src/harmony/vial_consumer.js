const config = require("~/config.js");
const autils = require('~/src/services/autils')
const QuestCoreV2 = require('~/src/harmony/contracts/questCoreV2');
const questCoreV2Contract = new QuestCoreV2();
const StaminaVial = require('~/src/harmony/contracts/staminaVial');
const staminaVialContract = new StaminaVial();
const staminaVialRegenerateAmount = 25;

exports.runVialLogic = async () => {
  if ((await staminaVialContract.balanceOf()).toNumber() === 0) {
    console.log("not have stamina vial")
  } else {
    const heroDatas = await autils.getHerosInfo(config.harmony.useStaminaVialHeroIds);

    for (let i = 0; i < heroDatas.length; i++) {
      const heroStaminaRemaining = await questCoreV2Contract.getCurrentStamina(heroDatas[i].id)

      if (heroDatas[i].stamina - heroStaminaRemaining >= staminaVialRegenerateAmount) {
        await staminaVialContract.consumeItem(heroDatas[i].id)
      } else {
        console.log(heroDatas[i].id + " stamina remaining value is too high")
      }
    }
  }
}
