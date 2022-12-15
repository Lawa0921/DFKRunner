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
    // this.evaluateStatPrice();
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

  evaluateStatPrice() {
    const heroMainclass = this.hero.mainClass;
    const heroGreenStatBoost = this.hero.statboost1;
    const heroBlueStatBoost = this.hero.statboost2;
    const heroRarity = this.hero.formatRarity();
    const heroProfession = this.hero.profession;
    
    switch(heroMainclass) {
      case "Warrior":
        if (heroProfession === "mining") {
          if (heroGreenStatBoost === "STR" || heroGreenStatBoost === "END") {
            this.statPrice += 3;
          } else if (heroGreenStatBoost === "VIT") {
            this.statPrice += 1;
          }
          if (heroBlueStatBoost === "STR" || heroBlueStatBoost === "END") {
            this.statPrice += 3;
          } else if (heroGreenStatBoost === "VIT") {
            this.statPrice += 1;
          }
        } else {
          if (heroGreenStatBoost === "STR" || heroGreenStatBoost === "VIT") {
            this.statPrice += 1;
          }
          if (heroBlueStatBoost === "STR" || heroBlueStatBoost === "VIT") {
            this.statPrice += 1;
          }
        }
        break;
      case "Knight":
        if (heroProfession === "mining") {
          if (heroGreenStatBoost === "STR" || heroGreenStatBoost === "END") {
            this.statPrice += 3;
          } else if (heroGreenStatBoost === "VIT") {
            this.statPrice += 1;
          }
          if (heroBlueStatBoost === "STR" || heroBlueStatBoost === "END") {
            this.statPrice += 3;
          } else if (heroGreenStatBoost === "VIT") {
            this.statPrice += 1;
          }
        } else {
          if (heroGreenStatBoost === "VIT") {
            this.statPrice += 1;
          }
          if (heroBlueStatBoost === "VIT") {
            this.statPrice += 1;
          }
        }
        break;
      case "Thief":
        if (heroProfession === "mining") {
          if (heroGreenStatBoost === "STR") {
            this.statPrice += 3;
          } else if (heroGreenStatBoost === "END") {
            this.statPrice += 1.5;
          }
          if (heroBlueStatBoost === "STR") {
            this.statPrice += 3;
          } else if (heroBlueStatBoost === "END") {
            this.statPrice += 1.5;
          }
        } else if (heroProfession === "fishing") {
          if (heroGreenStatBoost === "AGI" || heroGreenStatBoost === "LCK") {
            this.statPrice += 3;
          } else if (heroGreenStatBoost === "STR") {
            this.statPrice += 0.75;
          }
          if (heroBlueStatBoost === "AGI" || heroBlueStatBoost === "LCK") {
            this.statPrice += 3;
          } else if (heroBlueStatBoost === "STR") {
            this.statPrice += 0.75;
          }
        } else if (heroProfession === "foraging") {
          if (heroGreenStatBoost === "DEX" || heroGreenStatBoost === "INT" || heroGreenStatBoost === "STR") {
            this.statPrice += 0.75;
          }
          if (heroBlueStatBoost === "DEX" || heroBlueStatBoost === "INT" || heroBlueStatBoost === "STR") {
            this.statPrice += 0.75;
          }
        } else if (heroProfession === "gardening") {
          if (heroGreenStatBoost === "STR" || heroGreenStatBoost === "VIT") {
            this.statPrice += 1;
          }
          if (heroBlueStatBoost === "STR" || heroGreenStatBoost === "VIT") {
            this.statPrice += 1;
          }
        }
        break; 
      case "Archer":
        if (heroProfession === "mining") {
          if (heroGreenStatBoost === "STR") {
            this.statPrice += 3;
          } else if (heroGreenStatBoost === "END") {
            this.statPrice += 1.5;
          }
          if (heroBlueStatBoost === "STR") {
            this.statPrice += 3;
          } else if (heroBlueStatBoost === "END") {
            this.statPrice += 1.5;
          }
        } else if (heroProfession === "foraging") {
          if (heroGreenStatBoost === "DEX") {
            this.statPrice += 3;
          } else if (heroGreenStatBoost === "INT") {
            this.statPrice += 0.75;
          }
          if (heroBlueStatBoost === "DEX") {
            this.statPrice += 3;
          } else if (heroBlueStatBoost === "INT") {
            this.statPrice += 0.75;
          }
        } else {
          if (heroGreenStatBoost === "DEX") {
            this.statPrice += 0.5;
          }
          if (heroBlueStatBoost === "DEX") {
            this.statPrice += 0.5;
          }
        }
        break;
      case "Priest":
        if (heroProfession === "gardening") {
          if (heroGreenStatBoost === "WIS") {
            this.statPrice += 1.5;
          } else if (heroGreenStatBoost === "VIT") {
            this.statPrice += 0.75;
          } else if (heroGreenStatBoost === "INT") {
            this.statPrice += 0.5;
          }
          if (heroBlueStatBoost === "WIS") {
            this.statPrice += 1.5;
          } else if (heroBlueStatBoost === "VIT") {
            this.statPrice += 0.75;
          } else if (heroBlueStatBoost === "INT") {
            this.statPrice += 0.5;
          }
        } else if (heroProfession === "foraging") {
          if (heroGreenStatBoost === "INT") {
            this.statPrice += 1.5;
          } else if (heroGreenStatBoost === "WIS") {
            this.statPrice += 0.5;
          }
          if (heroBlueStatBoost === "INT") {
            this.statPrice += 1.5;
          } else if (heroBlueStatBoost === "WIS") {
            this.statPrice += 0.5;
          }
        } else {
          if (heroGreenStatBoost === "INT" || heroGreenStatBoost === "WIS") {
            this.statPrice += 0.5;
          }
          if (heroBlueStatBoost === "INT" || heroBlueStatBoost === "WIS") {
            this.statPrice += 0.5;
          }
        }
        break;
      case "Wizard":
        if (heroProfession === "gardening") {
          if (heroGreenStatBoost === "WIS") {
            this.statPrice += 1.5;
          } else if (heroGreenStatBoost === "VIT") {
            this.statPrice += 0.75;
          } else if (heroGreenStatBoost === "INT") {
            this.statPrice += 0.5;
          }
          if (heroBlueStatBoost === "WIS") {
            this.statPrice += 1.5;
          } else if (heroBlueStatBoost === "VIT") {
            this.statPrice += 0.75;
          } else if (heroBlueStatBoost === "INT") {
            this.statPrice += 0.5;
          }
        } else if (heroProfession === "foraging") {
          if (heroGreenStatBoost === "INT") {
            this.statPrice += 1.5;
          } else if (heroGreenStatBoost === "WIS") {
            this.statPrice += 0.5;
          }
          if (heroBlueStatBoost === "INT") {
            this.statPrice += 1.5;
          } else if (heroBlueStatBoost === "WIS") {
            this.statPrice += 0.5;
          }
        } else {
          if (heroGreenStatBoost === "INT" || heroGreenStatBoost === "WIS") {
            this.statPrice += 0.5;
          }
          if (heroBlueStatBoost === "INT" || heroBlueStatBoost === "WIS") {
            this.statPrice += 0.5;
          }
        }
        break;
      case "Monk":
        if (heroProfession === "fishing") {
          if (heroGreenStatBoost === "AGI" || heroBlueStatBoost === "LCK") {
            this.statPrice += 0.5;
          }
          if (heroBlueStatBoost === "AGI" || heroBlueStatBoost === "LCK") {
            this.statPrice += 0.5;
          }
        } else if (heroProfession === "foraging") {
          if (heroGreenStatBoost === "DEX") {
            this.statPrice += 0.5;
          }
          if (heroBlueStatBoost === "DEX") {
            this.statPrice += 0.5;
          }
        }
        break;
      case "Pirate":
        if (heroProfession === "fishing") {
          if (heroGreenStatBoost === "AGI" || heroBlueStatBoost === "LCK") {
            this.statPrice += 0.5;
          }
          if (heroBlueStatBoost === "AGI" || heroBlueStatBoost === "LCK") {
            this.statPrice += 0.5;
          }
        } else if (heroProfession === "foraging") {
          if (heroGreenStatBoost === "DEX") {
            this.statPrice += 0.75;
          }
          if (heroBlueStatBoost === "DEX") {
            this.statPrice += 0.75;
          }
        }
        break;
      case "Berserker":
        if (heroProfession === "mining") {
          if (heroGreenStatBoost === "STR" || heroGreenStatBoost === "END") {
            this.statPrice += 3;
          } else if (heroGreenStatBoost === "VIT") {
            this.statPrice += 1;
          }
          if (heroBlueStatBoost === "STR" || heroBlueStatBoost === "END") {
            this.statPrice += 3;
          } else if (heroGreenStatBoost === "VIT") {
            this.statPrice += 1;
          }
        } else {
          if (heroGreenStatBoost === "STR" || heroGreenStatBoost === "VIT") {
            this.statPrice += 1;
          }
          if (heroBlueStatBoost === "STR" || heroBlueStatBoost === "VIT") {
            this.statPrice += 1;
          }
        }
        break;
      case "Seer":
        if (heroProfession === "gardening") {
          if (heroGreenStatBoost === "WIS") {
            this.statPrice += 1.5;
          } else if (heroGreenStatBoost === "VIT") {
            this.statPrice += 0.75;
          } else if (heroGreenStatBoost === "INT") {
            this.statPrice += 0.5;
          }
          if (heroBlueStatBoost === "WIS") {
            this.statPrice += 1.5;
          } else if (heroBlueStatBoost === "VIT") {
            this.statPrice += 0.75;
          } else if (heroBlueStatBoost === "INT") {
            this.statPrice += 0.5;
          }
        } else if (heroProfession === "foraging") {
          if (heroGreenStatBoost === "INT") {
            this.statPrice += 1.5;
          } else if (heroGreenStatBoost === "WIS") {
            this.statPrice += 0.5;
          }
          if (heroBlueStatBoost === "INT") {
            this.statPrice += 1.5;
          } else if (heroBlueStatBoost === "WIS") {
            this.statPrice += 0.5;
          }
        } else {
          if (heroGreenStatBoost === "INT" || heroGreenStatBoost === "WIS") {
            this.statPrice += 0.5;
          }
          if (heroBlueStatBoost === "INT" || heroBlueStatBoost === "WIS") {
            this.statPrice += 0.5;
          }
        }
        break;
      case "Paladin":
        if (heroProfession === "mining") {
          if (heroGreenStatBoost === "STR" || heroGreenStatBoost === "END") {
            this.statPrice += 5;
          } else if (heroGreenStatBoost === "VIT") {
            this.statPrice += 2;
          }
          if (heroBlueStatBoost === "STR" || heroBlueStatBoost === "END") {
            this.statPrice += 5;
          } else if (heroGreenStatBoost === "VIT") {
            this.statPrice += 2;
          }
        } else if (heroProfession === "gardening") {
          if (heroGreenStatBoost === "WIS" || heroGreenStatBoost === "VIT") {
            this.statPrice += 3;
          }
          if (heroBlueStatBoost === "WIS" || heroBlueStatBoost === "VIT") {
            this.statPrice += 3;
          }
        } else {
          if (heroGreenStatBoost === "VIT") {
            this.statPrice += 1.5;
          }
          if (heroBlueStatBoost === "VIT") {
            this.statPrice += 1.5;
          }
        }
        break;
      case "DarkKnight":
        if (heroProfession === "mining") {
          if (heroGreenStatBoost === "STR" || heroGreenStatBoost === "END") {
            this.statPrice += 5;
          } else if (heroGreenStatBoost === "VIT") {
            this.statPrice += 2;
          }
          if (heroBlueStatBoost === "STR" || heroBlueStatBoost === "END") {
            this.statPrice += 5;
          } else if (heroGreenStatBoost === "VIT") {
            this.statPrice += 2;
          }
        } else if (heroProfession === "foraging") {
          if (heroGreenStatBoost === "DEX" || heroGreenStatBoost === "INT" || heroGreenStatBoost === "STR") {
            this.statPrice += 3;
          } 
          if (heroBlueStatBoost === "DEX" || heroBlueStatBoost === "INT" || heroBlueStatBoost === "STR") {
            this.statPrice += 3;
          }
        } else {
          if (heroGreenStatBoost === "STR") {
            this.statPrice += 3;
          }
          if (heroBlueStatBoost === "STR") {
            this.statPrice += 3;
          }
        }
        break;
      case "Summoner":
        if (heroProfession === "gardening") {
          if (heroGreenStatBoost === "WIS") {
            this.statPrice += 3;
          } else if (heroGreenStatBoost === "VIT" || heroGreenStatBoost === "INT") {
            this.statPrice += 1.5;
          }
          if (heroBlueStatBoost === "WIS") {
            this.statPrice += 3;
          } else if (heroBlueStatBoost === "VIT" || heroBlueStatBoost === "INT") {
            this.statPrice += 1.5;
          }
        } else if (heroProfession === "foraging") {
          if (heroGreenStatBoost === "INT") {
            this.statPrice += 4;
          } else if (heroGreenStatBoost === "WIS") {
            this.statPrice += 1.5;
          }
          if (heroBlueStatBoost === "INT") {
            this.statPrice += 4;
          } else if (heroBlueStatBoost === "WIS") {
            this.statPrice += 1.5;
          }
        } else {
          if (heroGreenStatBoost === "INT" || heroGreenStatBoost === "WIS") {
            this.statPrice += 1.5;
          }
          if (heroBlueStatBoost === "INT" || heroBlueStatBoost === "WIS") {
            this.statPrice += 1.5;
          }
        }
        break;
      case "Ninja":
        if (heroProfession === "fishing") {
          if (heroGreenStatBoost === "AGI" || heroGreenStatBoost === "LCK") {
            this.statPrice += 5;
          } else if (heroGreenStatBoost === "DEX") {
            this.statPrice += 1;
          }
          if (heroBlueStatBoost === "AGI" || heroBlueStatBoost === "LCK") {
            this.statPrice += 5;
          } else if (heroGreenStatBoost === "DEX") {
            this.statPrice += 1;
          }
        } else if (heroProfession === "foraging") {
          if (heroGreenStatBoost === "DEX") {
            this.statPrice += 3;
          } else if (heroGreenStatBoost === "AGI" || heroGreenStatBoost === "LCK") {
            this.statPrice += 1;
          }
          if (heroBlueStatBoost === "DEX") {
            this.statPrice += 3;
          } else if (heroBlueStatBoost === "AGI" || heroBlueStatBoost === "LCK") {
            this.statPrice += 1;
          }
        } else {
          if (heroGreenStatBoost === "AGI" || heroGreenStatBoost === "LCK" || heroGreenStatBoost === "DEX") {
            this.statPrice += 1.5;
          }
          if (heroBlueStatBoost === "AGI" || heroBlueStatBoost === "LCK" || heroBlueStatBoost === "DEX") {
            this.statPrice += 1.5;
          }
        }
        break;
      case "Shapeshifter":
        if (heroProfession === "fishing") {
          if (heroGreenStatBoost === "AGI" || heroGreenStatBoost === "LCK") {
            this.statPrice += 3;
          } else if (heroGreenStatBoost === "DEX") {
            this.statPrice += 1;
          }
          if (heroBlueStatBoost === "AGI" || heroBlueStatBoost === "LCK") {
            this.statPrice += 3;
          } else if (heroGreenStatBoost === "DEX") {
            this.statPrice += 1;
          }
        } else if (heroProfession === "foraging") {
          if (heroGreenStatBoost === "DEX") {
            this.statPrice += 3;
          } else if (heroGreenStatBoost === "DEX") {
            this.statPrice += 3;
          }
          if (heroBlueStatBoost === "DEX") {
            this.statPrice += 3;
          } else if (heroBlueStatBoost === "DEX") {
            this.statPrice += 1;
          }
        } else {
          if (heroGreenStatBoost === "AGI" || heroGreenStatBoost === "DEX") {
            this.statPrice += 1.5;
          }
          if (heroBlueStatBoost === "AGI" || heroBlueStatBoost === "DEX") {
            this.statPrice += 1.5;
          }
        }
        break;
      case "Dragoon":
        if (heroProfession === "mining") {
          if (heroGreenStatBoost === "STR" || heroGreenStatBoost === "END") {
            this.statPrice += 5;
          } else if (heroGreenStatBoost === "VIT") {
            this.statPrice += 2;
          }
          if (heroBlueStatBoost === "STR" || heroBlueStatBoost === "END") {
            this.statPrice += 5;
          } else if (heroGreenStatBoost === "VIT") {
            this.statPrice += 2;
          }
        } else if (heroProfession === "gardening") {
          if (heroGreenStatBoost === "WIS" || heroGreenStatBoost === "VIT") {
            this.statPrice += 3;
          }
          if (heroBlueStatBoost === "WIS" || heroBlueStatBoost === "VIT") {
            this.statPrice += 3;
          }
        } else if (heroProfession === "fishing") {
          if (heroGreenStatBoost === "AGI" || heroGreenStatBoost === "LCK") {
            this.statPrice += 2;
          }
          if (heroGreenStatBoost === "AGI" || heroGreenStatBoost === "LCK") {
            this.statPrice += 2;
          }
        } else if (heroProfession === "foraging") {
          if (heroGreenStatBoost === "DEX") {
            this.statPrice += 3;
          } else if (heroGreenStatBoost === "INT") {
            this.stylePrice += 1;
          }
          if (heroBlueStatBoost === "DEX") {
            this.statPrice += 3;
          } else if (heroBlueStatBoost === "INT") {
            this.stylePrice += 1;
          }
        }
        break;
      case "Sage":
        if (heroProfession === "gardening") {
          if (heroGreenStatBoost === "WIS") {
            this.statPrice += 5;
          } else if (heroGreenStatBoost === "VIT" || heroGreenStatBoost === "INT") {
            this.statPrice += 2.5;
          }
          if (heroBlueStatBoost === "WIS") {
            this.statPrice += 5;
          } else if (heroBlueStatBoost === "VIT" || heroBlueStatBoost === "INT") {
            this.statPrice += 2.5;
          }
        } else if (heroProfession === "foraging") {
          if (heroGreenStatBoost === "INT") {
            this.statPrice += 5;
          } else if (heroGreenStatBoost === "WIS") {
            this.statPrice += 2.5;
          }
          if (heroBlueStatBoost === "INT") {
            this.statPrice += 5;
          } else if (heroBlueStatBoost === "WIS") {
            this.statPrice += 2.5;
          }
        } else if (heroProfession === "fishing") {
          if (heroGreenStatBoost === "INT" || heroGreenStatBoost === "WIS" || heroGreenStatBoost === "AGI" || heroGreenStatBoost === "LCK") {
            this.statPrice += 1.5;
          }
          if (heroBlueStatBoost === "INT" || heroBlueStatBoost === "WIS" || heroGreenStatBoost === "AGI" || heroGreenStatBoost === "LCK") {
            this.statPrice += 1.5;
          }
        } else {
          if (heroGreenStatBoost === "WIS" || heroGreenStatBoost === "INT") {
            this.statPrice += 1.5;
          }
          if (heroBlueStatBoost === "WIS" || heroBlueStatBoost === "INT") {
            this.statPrice += 1.5;
          }
        }
        break;
      case "DreadKnight":
        if (heroProfession === "mining") {
          if (heroGreenStatBoost === "STR") {
            this.statPrice += 25;
          } else if (heroGreenStatBoost === "END" || heroGreenStatBoost === "VIT") {
            this.statPrice += 5;
          }
          if (heroBlueStatBoost === "STR") {
            this.statPrice += 15;
          } else if (heroGreenStatBoost === "END" || heroGreenStatBoost === "VIT") {
            this.statPrice += 5;
          }
        } else if (heroProfession === "gardening") {
          if (heroGreenStatBoost === "WIS" || heroGreenStatBoost === "VIT" || heroGreenStatBoost === "STR") {
            this.statPrice += 5;
          }
          if (heroBlueStatBoost === "WIS" || heroBlueStatBoost === "VIT" || heroBlueStatBoost === "STR") {
            this.statPrice += 5;
          }
        } else if (heroProfession === "fishing") {
          if (heroGreenStatBoost === "AGI" || heroGreenStatBoost === "LCK" || heroGreenStatBoost === "STR") {
            this.statPrice += 5;
          }
          if (heroBlueStatBoost === "AGI" || heroBlueStatBoost === "LCK" || heroBlueStatBoost === "STR") {
            this.statPrice += 5;
          }
        } else if (heroProfession === "foraging") {
          if (heroGreenStatBoost === "DEX" || heroGreenStatBoost === "STR") {
            this.statPrice += 5;
          } else if (heroGreenStatBoost === "INT") {
            this.stylePrice += 3;
          }
          if (heroBlueStatBoost === "DEX" || heroBlueStatBoost === "STR") {
            this.statPrice += 5;
          } else if (heroBlueStatBoost === "INT") {
            this.stylePrice += 3;
          }
        }
        break;
    }

    if (heroRarity === "UnCommon") {
      this.statPrice = this.statPrice * 1.1;
    } else if (heroRarity === "Rare") {
      this.statPrice = this.statPrice * 1.2;
    } else if (heroRarity === "Legendary") {
      this.statPrice = this.statPrice * 1.3;
    } else if (heroRarity === "Mythic") {
      this.statPrice = this.statPrice * 1.4;
    }

    this.valuation += this.statPrice;
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
