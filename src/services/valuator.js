const config = require("~/config.js");

module.exports = class Valuator {
  constructor(price, hero) {
    this.price = parseInt(price) / Math.pow(10, 18);
    this.hero = hero;
    this.valuation = config.unconditionalPurchasePrice;
  }

  execute() {
    this.getConfigPrice();
    this.evaluateRarityPrice()
    this.evaluateProfessionPrice()
    this.evaluateLevelPrice()
    this.evaluateHairPrice()
    this.evaluateBackAppendagePrice()
    this.evaluateSubclassPrice();
    this.evaluateSkillPrice();
    this.networkPriceAdjustment();
  }

  getConfigPrice() {
    const heroMainclassTier = this.hero.attributeTier("mainClass");
    const heroGens = [this.hero.generation.toString(), "?"]
    const heroSummonsRemainings = [this.hero.summonsRemaining.toString(), "?"]
    const heroSummons = [this.hero.maxSummons.toString(), "?"]

    heroGens.forEach((gen) => {
      heroSummonsRemainings.forEach((summonsRemaining) => {
        heroSummons.forEach((summon) => {
          const configString = heroMainclassTier + summonsRemaining + "/" + summon + "G" + gen

          if (typeof(config.autoBuyerSetting.priceSetting[configString]) !== "undefined") {
            this.valuation = config.autoBuyerSetting.priceSetting[configString]
          }
        })
      })
    })

    if (this.valuation === 0) {
      this.valuation = config.autoBuyerSetting.autoBuyerFloorPrice
    }
  }

  evaluateRarityPrice() {
    const heroMainclassTier = this.hero.attributeTier("mainClass");
    const heroRarity = this.hero.formatRarity();
    const rarityString = heroMainclassTier + heroRarity
    const rarityPrice = config.autoBuyerSetting.raritySetting[rarityString]

    if (typeof(rarityPrice) !== "undefined") {
      this.valuation *= rarityPrice;
    }
  }

  evaluateProfessionPrice() {
    const heroMainclass = this.hero.mainClass
    const heroProfession = this.hero.profession[0].toUpperCase() + this.hero.profession.slice(1)
    const professionString = heroMainclass + heroProfession
    const professionPrice = config.autoBuyerSetting.professionSetting[professionString]

    if (typeof(professionPrice) !== "undefined") {
      this.valuation *= professionPrice;
    }
  }

  evaluateLevelPrice() {
    const heroMainclassTier = this.hero.attributeTier("mainClass")
    const heroLevel = this.hero.level
    const levelString = heroMainclassTier + "LV" + Math.floor(heroLevel / 5).toString()
    const levelPrice = config.autoBuyerSetting.levelSetting[levelString]

    if (typeof(levelPrice) !== "undefined") {
      this.valuation *= professionPrice;
    }
  }

  evaluateHairPrice() {
    const heroMainclassTier = this.hero.attributeTier("mainClass")
    const heroHairTier = this.hero.attributeTier("hairStyle");
    const hairString = heroMainclassTier + heroHairTier
    const hairPrice = config.autoBuyerSetting.hairSetting[hairString]

    if (typeof(hairPrice) !== "undefined") {
      this.valuation *= hairPrice;
    }
  }

  evaluateBackAppendagePrice() {
    const heroMainclassTier = this.hero.attributeTier("mainClass")
    const herobackAppendage = this.hero.attributeTier("backAppendage");
    const backAppendageString = heroMainclassTier + herobackAppendage
    const backAppendagePrice = config.autoBuyerSetting.backAppendageSetting[backAppendageString]

    if (typeof(backAppendagePrice) !== "undefined") {
      this.valuation *= backAppendagePrice;
    }
  }

  evaluateSubclassPrice() {
    const heroMainclass = this.hero.mainClass
    const heroSubclasses = [this.hero.subClass, this.hero.attributeTier("subClass")]

    heroSubclasses.forEach((subclass) => {
      const subclassConfigString = heroMainclass + subclass

      if (typeof(config.autoBuyerSetting.subclassSetting[subclassConfigString]) !== "undefined") {
        this.valuation *= config.autoBuyerSetting.subclassSetting[subclassConfigString]

        return
      }
    })

  }

  evaluateSkillPrice() {
    const heroMainclass = this.hero.mainClass
    const heroMainclassTier = this.hero.attributeTier("mainClass")
    const skillInfos = this.hero.skillInfos()
    const skillSetTargetPrice = config.autoBuyerSetting.skillSetting[heroMainclass + skillInfos.skillsString]
    const skillPrice = config.autoBuyerSetting.skillSetting[heroMainclassTier + skillInfos.skillScore.toString()]

    if (typeof(skillSetTargetPrice) !== "undefined") {
      this.valuation *= skillSetTargetPrice
    } else if (typeof(skillPrice) !== "undefined") {
      this.valuation *= skillPrice
    }
  }

  networkPriceAdjustment() {
    this.valuation = this.valuation * config.buyerEstimateAdjustment

    if (this.hero.network === "dfk") {
      this.valuation = this.valuation * config.autoBuyerSetting.DFKnetworkBuyerEstimateAdjustment
    } else if (this.hero.network === "kla") {
      this.valuation = this.valuation * config.autoBuyerSetting.KLAYnetworkBuyerEstimateAdjustment
    }

    this.valuation = Math.round(this.valuation * 100) / 100
  }
}
