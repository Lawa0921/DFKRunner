const config = require("../../config");

module.exports = class RentValuator {
  constructor(hero) {
    this.hero = hero;
    this.valuation = 0;
  }

  execute() {
    const heroMainclassTier = this.hero.attributeTier("mainClass");

    if (heroMainclassTier === "Basic") {
      this.evaluateBasicClass()
    } else if (heroMainclassTier === "Advanced") {
      this.evaluateAdvancedClass()
    } else if (heroMainclassTier === "Elite") {
      this.evaluateEliteClass()
    } else if (heroMainclassTier === "Transcendant") {
      this.evaluateTranscendantClass()
    }

    this.evaluateLevelPrice()
    this.evaluateProfession()
    this.priceLogicAdjustment()
  }

  evaluateLevelPrice() {
    if (this.hero.level >= 15) {
      this.valuation = this.valuation * 2
    } else if (this.hero.level >= 10) {
      this.valuation = this.valuation * 1.25
    } else if (this.hero.level >= 5) {
      this.valuation = this.valuation * 1.05
    }
  }

  evaluateBasicClass() {
    const heroSubclass = this.hero.subClass
    const heroSubClassTier = this.hero.attributeTier("subClass")
    const heroRarity = this.hero.formatRarity()
    const skillInfos = this.hero.skillInfos()
    const heroHairTier = this.hero.attributeTier("hairStyle");
    const heroBackappendageTier = this.hero.attributeTier("backAppendage");
    const heroGreenStatBoost = this.hero.statboost1;
    const heroBlueStatBoost = this.hero.statboost2;

    if (this.hero.generation === 3) {
      if (this.hero.summonsRemaining === 7) {
        this.valuation += 5
      } else if (this.hero.summonsRemaining === 8) {
        this.valuation += 8
      }
    } else if (this.hero.generation === 2) {
      if (this.hero.summonsRemaining === 6) {
        this.valuation += 8

        if (this.hero.maxSummons === 6) {
          this.valuation += 2
        } else if (this.hero.maxSummons === 7) {
          this.valuation += 1
        }
      } else if (this.hero.summonsRemaining === 7) {
        this.valuation += 10

        if (this.hero.maxSummons === 7) {
          this.valuation += 3
        } else if (this.hero.maxSummons === 8) {
          this.valuation += 1.5
        }
      } else if (this.hero.summonsRemaining === 8) {
        this.valuation += 12

        if (this.hero.maxSummons === 8) {
          this.valuation += 2
        }
      } else if (this.hero.summonsRemaining === 9) {
        this.valuation += 14
      }
    } else if (this.hero.generation === 1) {
      if (this.hero.summonsRemaining === 6) {
        this.valuation += 15
      } else if (this.hero.summonsRemaining === 7) {
        this.valuation += 18
      } else if (this.hero.summonsRemaining === 8) {
        this.valuation += 22
      } else if (this.hero.summonsRemaining === 9) {
        this.valuation += 25
      } else if (this.hero.summonsRemaining === 10) {
        this.valuation += 30
      }
    } else if (this.hero.generation === 0) {
      this.valuation += 80
    }

    if (this.hero.mainClass === "Warrior" || this.hero.mainClass === "Knight") {
      if (heroSubclass === "Paladin" || heroSubclass === "DarkKnight") {
        this.valuation *= 2
      } else if (heroSubclass === "Warrior" || heroSubclass === "Knight") {
        this.valuation *= 1.2
      } else if (heroSubclass === "Dragoon") {
        this.valuation *= 3
      } 

      if (this.hero.profession === "mining") {
        this.valuation *= 1.2 
      }

      if ((heroGreenStatBoost === "STR" || heroGreenStatBoost === "VIT") && (heroBlueStatBoost === "STR" || heroBlueStatBoost === "VIT")) {
        this.valuation *= 1.2
      } else if ((heroGreenStatBoost === "STR" || heroGreenStatBoost === "VIT") || (heroBlueStatBoost === "STR" || heroBlueStatBoost === "VIT")) {
        this.valuation *= 1.03
      }
    } else if (this.hero.mainClass === "Archer" || this.hero.mainClass === "Thief") {
      if (heroSubclass === "Paladin" || heroSubclass === "DarkKnight") {
        this.valuation *= 2
      } else if (heroSubclass === "Archer" || heroSubclass === "Thief") {
        this.valuation *= 1.2
      } else if (heroSubclass === "Dragoon") {
        this.valuation *= 3
      }

      if (this.hero.profession === "mining") {
        this.valuation *= 1.1
      } else if (this.hero.profession === "foraging") {
        this.valuation *= 1.03
      }

      if (heroGreenStatBoost === "STR" && heroBlueStatBoost === "STR") {
        this.valuation *= 1.2
      } else if (heroGreenStatBoost === "STR" || heroBlueStatBoost === "STR") {
        this.valuation *= 1.03
      }
    } else if (this.hero.mainClass === "Wizard" || this.hero.mainClass === "Priest") {
      if (heroSubclass === "Summoner") {
        this.valuation *= 2
      } else if (heroSubclass === "Wizard" || heroSubclass === "Priest") {
        this.valuation *= 1.2
      } else if (heroSubclass === "Ninja") {
        this.valuation *= 1.5
      } else if (heroSubclass === "Sage") {
        this.valuation *= 3
      }

      if (this.hero.profession === "foraging") {
        this.valuation *= 1.03
      }

      if ((heroGreenStatBoost === "INT" || heroGreenStatBoost === "WIS") && (heroBlueStatBoost === "INT" || heroBlueStatBoost === "WIS")) {
        this.valuation *= 1.2
      } else if ((heroGreenStatBoost === "INT" || heroGreenStatBoost === "WIS") || (heroBlueStatBoost === "INT" || heroBlueStatBoost === "WIS")) {
        this.valuation *= 1.03
      }
    } else if (this.hero.mainClass === "Monk" || this.hero.mainClass === "Pirate") {
      if (heroSubclass === "Ninja") {
        this.valuation *= 2
      } else if (heroSubclass === "Summoner") {
        this.valuation *= 1.5
      } else if (heroSubclass === "Monk" || heroSubclass === "Pirate") {
        this.valuation *= 1.2
      } else if (heroSubclass === "Sage") {
        this.valuation *= 3
      }

      if (this.hero.profession === "fishing") {
        this.valuation *= 1.1
      }

      if ((heroGreenStatBoost === "AGI" || heroGreenStatBoost === "LCK") && (heroBlueStatBoost === "AGI" || heroBlueStatBoost === "LCK")) {
        this.valuation *= 1.2
      } else if ((heroGreenStatBoost === "AGI" || heroGreenStatBoost === "LCK") || (heroBlueStatBoost === "AGI" || heroBlueStatBoost === "LCK")) {
        this.valuation *= 1.03
      }
    } else if (this.hero.mainClass === "Seer" || this.hero.mainClass === "Berserker") {
      if (heroSubclass === "Shapeshifter" || heroSubclass === "Bard") {
        this.valuation *= 2
      } else if (heroSubclass === "Seer" || heroSubclass === "Berserker") {
        this.valuation *= 1.2
      }

      if (this.hero.profession === "fishing") {
        this.valuation *= 1.1
      }

      if ((heroGreenStatBoost === "AGI" || heroGreenStatBoost === "LCK") && (heroBlueStatBoost === "AGI" || heroBlueStatBoost === "LCK")) {
        this.valuation *= 1.05
      } else if ((heroGreenStatBoost === "AGI" || heroGreenStatBoost === "LCK") || (heroBlueStatBoost === "AGI" || heroBlueStatBoost === "LCK")) {
        this.valuation *= 1.02
      }
    } else if (this.hero.mainClass === "Scholar" || this.hero.mainClass === "Legionnaire") {
      if (heroSubclass === "Shapeshifter" || heroSubclass === "Bard") {
        this.valuation *= 2
      } else if (heroSubclass === "Scholar" || heroSubclass === "Legionnaire") {
        this.valuation *= 1.2
      }

      if (this.hero.profession === "fishing") {
        this.valuation *= 1.05
      }

      if ((heroGreenStatBoost === "AGI" || heroGreenStatBoost === "LCK") && (heroBlueStatBoost === "AGI" || heroBlueStatBoost === "LCK")) {
        this.valuation *= 1.05
      } else if ((heroGreenStatBoost === "AGI" || heroGreenStatBoost === "LCK") || (heroBlueStatBoost === "AGI" || heroBlueStatBoost === "LCK")) {
        this.valuation *= 1.02
      }
    }

    if (heroHairTier === "Advanced") {
      this.valuation *= 1.15
    } else if (heroHairTier === "Elite") {
      this.valuation *= 1.75
    } else if (heroHairTier === "Transcendant") {
      this.valuation *= 3.5
    }

    if (heroBackappendageTier === "Advanced") {
      this.valuation *= 1.15
    } else if (heroBackappendageTier === "Elite") {
      this.valuation *= 1.75
    } else if (heroBackappendageTier === "Transcendant") {
      this.valuation *= 3.5
    }

    if (heroSubClassTier === "Advanced") {
      this.valuation *= 1.5
    } else if (heroSubClassTier === "Elite") {
      this.valuation *= 3
    } else if (heroSubClassTier === "Transcendant") {
      this.valuation *= 15
    }

    if (skillInfos.skillScore === 1) {
      this.valuation *= 1.05
    } else if (skillInfos.skillScore === 2) {
      this.valuation *= 1.4
    } else if (skillInfos.skillScore === 3) {
      this.valuation *= 2.5
    } else if (skillInfos.skillScore === 4) {
      this.valuation *= 5
    } else if (skillInfos.skillScore >= 5) {
      this.valuation *= (5 + skillInfos.skillScore)
    }

    if (heroRarity === "UnCommon") {
      this.valuation = this.valuation * 1.05
    } else if (heroRarity === "Rare") {
      this.valuation = this.valuation * 1.25
    } else if (heroRarity === "Legendary") {
      this.valuation = this.valuation * 2.2
    } else if (heroRarity === "Mythic") {
      this.valuation = this.valuation * 3
    }
  }

  evaluateAdvancedClass() {
    const heroSubclass = this.hero.subClass
    const heroSubClassTier = this.hero.attributeTier("subClass")
    const heroRarity = this.hero.formatRarity()
    const skillInfos = this.hero.skillInfos()
    const heroHairTier = this.hero.attributeTier("hairStyle");
    const heroBackappendageTier = this.hero.attributeTier("backAppendage");
    const heroGreenStatBoost = this.hero.statboost1;
    const heroBlueStatBoost = this.hero.statboost2;

    if (this.hero.generation >= 5) {
      if (this.hero.summonsRemaining === 5) {
        this.valuation += 40
      } else if (this.hero.summonsRemaining === 4) {
        this.valuation += 25
      } else if (this.hero.summonsRemaining === 3) {
        this.valuation += 12
      }
    } else if (this.hero.generation === 4) {
      if (this.hero.summonsRemaining === 5) {
        this.valuation += 60
      } else if (this.hero.summonsRemaining === 4) {
        this.valuation += 45
      } else if (this.hero.summonsRemaining === 3) {
        this.valuation += 25
      } else if (this.hero.summonsRemaining === 2) {
        this.valuation += 10
      }
    } else if (this.hero.generation === 3) {
      if (this.hero.summonsRemaining === 5) {
        this.valuation += 75
      } else if (this.hero.summonsRemaining === 4) {
        this.valuation += 55
      } else if (this.hero.summonsRemaining === 3) {
        this.valuation += 35
      } else if (this.hero.summonsRemaining === 2) {
        this.valuation += 25
      } else if (this.hero.summonsRemaining === 1) {
        this.valuation += 15
      }
    } else if (this.hero.generation === 2) {
      if (this.hero.summonsRemaining === 5) {
        this.valuation += 90
      } else if (this.hero.summonsRemaining === 4) {
        this.valuation += 75
      } else if (this.hero.summonsRemaining === 3) {
        this.valuation += 45
      } else if (this.hero.summonsRemaining === 2) {
        this.valuation += 35
      } else if (this.hero.summonsRemaining === 1) {
        this.valuation += 20
      }
    } else if (this.hero.generation === 1) {
      if (this.hero.summonsRemaining === 5) {
        this.valuation += 100
      } else if (this.hero.summonsRemaining === 4) {
        this.valuation += 85
      } else if (this.hero.summonsRemaining === 3) {
        this.valuation += 60
      } else if (this.hero.summonsRemaining === 2) {
        this.valuation += 40
      } else if (this.hero.summonsRemaining === 1) {
        this.valuation += 25
      }
    }

    if (this.hero.mainClass === "Paladin" || this.hero.mainClass === "DarkKnight") {
      if (heroSubclass === "Paladin" || heroSubclass === "DarkKnight") {
        this.valuation *= 1.5
      } else if (heroSubclass === "Dragoon") {
        this.valuation *= 4
      }

      if (this.hero.profession === "mining") {
        this.valuation *= 1.25
      }

      if (heroGreenStatBoost === "STR" && heroBlueStatBoost === "STR") {
        this.valuation *= 1.25
      } else if (heroGreenStatBoost === "STR" || heroBlueStatBoost === "STR") {
        this.valuation *= 1.05
      }
    } else if (this.hero.mainClass === "Ninja" || this.hero.mainClass === "Summoner") {
      if (heroSubclass === "Summoner" || heroSubclass === "Ninja") {
        this.valuation *= 1.5
      } else if (heroSubclass === "Sage") {
        this.valuation *= 4
      }

      if (this.hero.profession === "foraging") {
        this.valuation *= 1.05
      }

      if ((heroGreenStatBoost === "INT" || heroGreenStatBoost === "WIS") && (heroBlueStatBoost === "STR" || heroBlueStatBoost === "WIS")) {
        this.valuation *= 1.15
      } else if ((heroGreenStatBoost === "INT" || heroGreenStatBoost === "WIS") || (heroBlueStatBoost === "STR" || heroBlueStatBoost === "WIS")) {
        this.valuation *= 1.02
      }
    } else if (this.hero.mainClass === "Shapeshifter" || this.hero.mainClass === "Bard") {
      if (heroSubclass === "Shapeshifter" || this.hero.mainClass === "Bard") {
        this.valuation *= 1.5
      } else if (heroSubclass === "Spellbow") {
        this.valuation *= 4
      }

      if (this.hero.profession === "foraging") {
        this.valuation *= 1.05
      }

      if ((heroGreenStatBoost === "INT" || heroGreenStatBoost === "DEX") && (heroBlueStatBoost === "STR" || heroBlueStatBoost === "DEX")) {
        this.valuation *= 1.15
      } else if ((heroGreenStatBoost === "INT" || heroGreenStatBoost === "DEX") || (heroBlueStatBoost === "STR" || heroBlueStatBoost === "DEX")) {
        this.valuation *= 1.02
      }
    }

    if (heroHairTier === "Advanced") {
      this.valuation *= 1.15
    } else if (heroHairTier === "Elite") {
      this.valuation *= 2
    } else if (heroHairTier === "Transcendant") {
      this.valuation *= 4
    }

    if (heroBackappendageTier === "Advanced") {
      this.valuation *= 1.15
    } else if (heroBackappendageTier === "Elite") {
      this.valuation *= 2
    } else if (heroBackappendageTier === "Transcendant") {
      this.valuation *= 4
    }

    if (heroSubClassTier === "Advanced") {
      this.valuation *= 1.15
    } else if (heroSubClassTier === "Elite") {
      this.valuation *= 3.5
    } else if (heroSubClassTier === "Transcendant") {
      this.valuation *= 15
    }

    if (skillInfos.skillScore === 1) {
      this.valuation *= 1.05
    } else if (skillInfos.skillScore === 2) {
      this.valuation *= 1.4
    } else if (skillInfos.skillScore === 3) {
      this.valuation *= 2.5
    } else if (skillInfos.skillScore === 4) {
      this.valuation *= 5
    } else if (skillInfos.skillScore >= 5) {
      this.valuation *= (5 + skillInfos.skillScore)
    }

    if (heroRarity === "UnCommon") {
      this.valuation = this.valuation * 1.1
    } else if (heroRarity === "Rare") {
      this.valuation = this.valuation * 1.35
    } else if (heroRarity === "Legendary") {
      this.valuation = this.valuation * 2
    } else if (heroRarity === "Mythic") {
      this.valuation = this.valuation * 3
    }
  }

  evaluateEliteClass() {
    const heroSubclass = this.hero.subClass
    const heroSubClassTier = this.hero.attributeTier("subClass")
    const heroRarity = this.hero.formatRarity()
    const skillInfos = this.hero.skillInfos()
    const heroHairTier = this.hero.attributeTier("hairStyle");
    const heroBackappendageTier = this.hero.attributeTier("backAppendage");
    const heroGreenStatBoost = this.hero.statboost1;
    const heroBlueStatBoost = this.hero.statboost2;

    if (this.hero.summonsRemaining === 1) {
      this.valuation += 170
    } else if (this.hero.summonsRemaining === 2) {
      this.valuation += 250
    } else if (this.hero.summonsRemaining === 3) {
      this.valuation += 300
    }

    if (heroGreenStatBoost === "STR" && heroBlueStatBoost === "STR") {
      this.valuation *= 1.5
    } else if (heroGreenStatBoost === "STR" || heroBlueStatBoost === "STR") {
      this.valuation *= 1.05
    }

    if (heroHairTier === "Advanced") {
      this.valuation *= 1.15
    } else if (heroHairTier === "Elite") {
      this.valuation *= 1.75
    } else if (heroHairTier === "Transcendant") {
      this.valuation *= 3.5
    }

    if (heroBackappendageTier === "Advanced") {
      this.valuation *= 1.15
    } else if (heroBackappendageTier === "Elite") {
      this.valuation *= 1.75
    } else if (heroBackappendageTier === "Transcendant") {
      this.valuation *= 3.5
    }

    if (heroSubClassTier === "Advanced") {
      this.valuation *= 1.5
    } else if (heroSubClassTier === "Elite") {
      this.valuation *= 5
    } else if (heroSubClassTier === "Transcendant") {
      this.valuation *= 20
    }

    if (skillInfos.skillScore === 1) {
      this.valuation *= 1.05
    } else if (skillInfos.skillScore === 2) {
      this.valuation *= 1.5
    } else if (skillInfos.skillScore === 3) {
      this.valuation *= 2.5
    } else if (skillInfos.skillScore === 4) {
      this.valuation *= 5
    } else if (skillInfos.skillScore >= 5) {
      this.valuation *= (5 + skillInfos.skillScore)
    }

    if (this.hero.mainClass === "Dragoon") {
      if (heroSubclass === "Paladin" || heroSubclass === "DarkKnight") {
        this.valuation *= 1.5
      } else if (heroSubclass === "Dragoon") {
        this.valuation *= 3
      }

      if (this.hero.profession === "mining") {
        this.valuation *= 1.2
      }
    } else if (this.hero.mainClass === "Sage") {
      if (heroSubclass === "Summoner") {
        this.valuation *= 1.5
      } else if (heroSubclass === "Sage") {
        this.valuation *= 3
      }

      if (this.hero.profession === "mining") {
        this.valuation *= 1.05
      }
    } else if (this.hero.mainClass === "Spellbow") {
      if (heroSubclass === "Summoner" || heroSubclass === "Ninja") {
        this.valuation *= 1.5
      } else if (heroSubclass === "Sage" || heroSubclass === "Spellbow") {
        this.valuation *= 3
      }
    }

    if (heroRarity === "UnCommon") {
      this.valuation = this.valuation * 1.1
    } else if (heroRarity === "Rare") {
      this.valuation = this.valuation * 1.5
    } else if (heroRarity === "Legendary") {
      this.valuation = this.valuation * 2
    } else if (heroRarity === "Mythic") {
      this.valuation = this.valuation * 4
    }
  }

  evaluateTranscendantClass() {
    const heroSubclass = this.hero.subClass
    const heroSubClassTier = this.hero.attributeTier("subClass")
    const heroRarity = this.hero.formatRarity()
    const skillInfos = this.hero.skillInfos()
    const heroHairTier = this.hero.attributeTier("hairStyle");
    const heroBackappendageTier = this.hero.attributeTier("backAppendage");
    const heroGreenStatBoost = this.hero.statboost1;
    const heroBlueStatBoost = this.hero.statboost2;

    if (heroRarity === "Common") {
      this.valuation += 1500
    } else if (heroRarity === "UnCommon") {
      this.valuation += 2499
    } else if (heroRarity === "Rare") {
      this.valuation += 4999
    } else if (heroRarity === "Legendary") {
      this.valuation += 9999
    } else if (heroRarity === "Mythic") {
      this.valuation += 29999
    }

    if (heroGreenStatBoost === "STR" && heroBlueStatBoost === "STR") {
      this.valuation *= 1.5
    } else if (heroGreenStatBoost === "STR" || heroBlueStatBoost === "STR") {
      this.valuation *= 1.05
    }

    if (heroHairTier === "Advanced") {
      this.valuation *= 1.1
    } else if (heroHairTier === "Elite") {
      this.valuation *= 1.75
    } else if (heroHairTier === "Transcendant") {
      this.valuation *= 3.5
    }

    if (heroBackappendageTier === "Advanced") {
      this.valuation *= 1.1
    } else if (heroBackappendageTier === "Elite") {
      this.valuation *= 1.75
    } else if (heroBackappendageTier === "Transcendant") {
      this.valuation *= 3.5
    }

    if (heroSubClassTier === "Advanced") {
      this.valuation *= 1.5
    } else if (heroSubClassTier === "Elite") {
      this.valuation *= 5
    } else if (heroSubClassTier === "Transcendant") {
      this.valuation *= 20
    }

    if (skillInfos.skillScore === 1) {
      this.valuation *= 1.05
    } else if (skillInfos.skillScore === 2) {
      this.valuation *= 1.5
    } else if (skillInfos.skillScore === 3) {
      this.valuation *= 2.5
    } else if (skillInfos.skillScore === 4) {
      this.valuation *= 5
    } else if (skillInfos.skillScore >= 5) {
      this.valuation *= (5 + skillInfos.skillScore)
    }

    if (heroSubclass === "Paladin" || heroSubclass === "DarkKnight") {
      this.valuation *= 1.2
    } else if (heroSubclass === "Dragoon") {
      this.valuation *= 3
    }
  }

  evaluateProfession() {
    const profession = this.hero.profession

    if (profession == "fishing" || profession == "foraging") {
      this.valuation = this.valuation * 1.35
    }
  }

  priceLogicAdjustment() {
    if (this.valuation === 0 && config.autoRenterSetting.rentFloorSwitch) {
      this.valuation = config.autoRenterSetting.rentFloorPrice
    }

    this.valuation *= config.autoRenterSetting.rentalEstimateAdjustment

    if (this.hero.network === "dfk") {
      this.valuation *= config.autoRenterSetting.DFKNetworkRentalEstimateAdjustment
    } else if (this.hero.network === "kla") {
      this.valuation *= config.autoRenterSetting.KLAYNetworkRentalEstimateAdjustment
    }

    this.valuation = Math.round(this.valuation * 100) / 100
  }
}
