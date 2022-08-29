module.exports = class RentValuator {
  constructor(hero) {
    this.hero = hero;
    this.valuation = 1;
  }

  execute() {
    const heroMainclassTier = this.hero.attributeTier("mainClass");

    if (heroMainclassTier === "Basic") {
      evaluateBasicClass()
    } else if (heroMainclassTier === "Advanced") {
      evaluateAdvancedClass()
    } else if (heroMainclassTier === "Elite") {
      evaluateEliteClass()
    } else if (heroMainclassTier === "Transcendant") {
      evaluateTranscendantClass()
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

    // to do
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

    // to do
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
      this.valuation += 300
    } else if (this.hero.summonsRemaining === 3) {
      this.valuation += 380
    }

    if (heroGreenStatBoost === "STR" && heroBlueStatBoost === "STR") {
      this.valuation += 50
    } else if (heroGreenStatBoost === "STR" || heroBlueStatBoost === "STR") {
      this.valuation += 10
    }

    if (heroHairTier === "Advanced") {
      this.valuation += 10
    } else if (heroHairTier === "Elite") {
      this.valuation += 30
    } else if (heroHairTier === "Transcendant") {
      this.valuation += 100
    }

    if (heroBackappendageTier === "Advanced") {
      this.valuation += 10
    } else if (heroBackappendageTier === "Elite") {
      this.valuation += 30
    } else if (heroBackappendageTier === "Transcendant") {
      this.valuation += 100
    }

    if (skillInfos.skillScore === 2) {
      this.valuation += 80
    } else if (skillInfos.skillScore === 3) {
      this.valuation += 200
    } else if (skillInfos.skillScore === 4) {
      this.valuation += 500
    } else if (skillInfos.skillScore >= 5) {
      this.valuation += 1000
    }

    if (heroSubClassTier === "Advanced") {
      this.valuation += 30
    } else if (heroSubClassTier === "Elite") {
      this.valuation += 150
    } else if (heroSubClassTier === "Transcendant") {
      this.valuation += 500
    }

    if (this.hero.mainClass === "Dragoon") {
      if (heroSubclass === "Paladin" || heroSubclass === "DarkKnight") {
        this.valuation += 30
      } else if (heroSubclass === "Dragoon") {
        this.valuation += 100
      }

      if (this.hero.profession === "mining") {
        this.valuation += 20
      }
    } else if (this.hero.mainClass === "Sage") {
      if (heroSubclass === "Summoner") {
        this.valuation += 30
      } else if (heroSubclass === "Sage") {
        this.valuation += 100
      }

      if (this.hero.profession === "mining") {
        this.valuation += 15
      }
    }

    if (heroRarity === "UnCommon") {
      this.valuation = this.valuation * 1.1
    } else if (heroRarity === "Rare") {
      this.valuation = this.valuation * 1.35
    } else if (heroRarity === "Legendary") {
      this.valuation = this.valuation * 2
    } else if (heroRarity === "Mythic") {
      this.valuation = this.valuation * 4
    }
  }

  evaluateTranscendantClass() {
    const heroSubclass = this.hero.subClass;
    const heroSubClassTier = this.hero.attributeTier("subClass")
    const heroRarity = this.hero.formatRarity();

    if (heroRarity === "Common") {
      this.valuation += 999

      if (heroSubClassTier === "Advanced") {
        this.valuation += 200
      } else if (heroSubClassTier === "Elite") {
        this.valuation += 1000
      } else if (heroSubClassTier === "Transcendant") {
        this.valuation += 3000
      }

      if (heroSubclass === "Paladin" || heroSubclass === "DarkKnight") {
        this.valuation += 100
      } else if (heroSubclass === "Dragoon") {
        this.valuation += 300
      }
    } else if (heroRarity === "UnCommon") {
      this.valuation += 1399

      if (heroSubClassTier === "Advanced") {
        this.valuation += 300
      } else if (heroSubClassTier === "Elite") {
        this.valuation += 1500
      } else if (heroSubClassTier === "Transcendant") {
        this.valuation += 3500
      }

      if (heroSubclass === "Paladin" || heroSubclass === "DarkKnight") {
        this.valuation += 150
      } else if (heroSubclass === "Dragoon") {
        this.valuation += 350
      }
    } else if (heroRarity === "Rare") {
      this.valuation += 2099

      if (heroSubClassTier === "Advanced") {
        this.valuation += 400
      } else if (heroSubClassTier === "Elite") {
        this.valuation += 1800
      } else if (heroSubClassTier === "Transcendant") {
        this.valuation += 4000
      }

      if (heroSubclass === "Paladin" || heroSubclass === "DarkKnight") {
        this.valuation += 200
      } else if (heroSubclass === "Dragoon") {
        this.valuation += 400
      }
    } else if (heroRarity === "Legendary") {
      this.valuation += 5999

      if (heroSubClassTier === "Advanced") {
        this.valuation += 450
      } else if (heroSubClassTier === "Elite") {
        this.valuation += 2000
      } else if (heroSubClassTier === "Transcendant") {
        this.valuation += 5000
      }

      if (heroSubclass === "Paladin" || heroSubclass === "DarkKnight") {
        this.valuation += 250
      } else if (heroSubclass === "Dragoon") {
        this.valuation += 500
      }
    } else if (heroRarity === "Mythic") {
      this.valuation += 10999;

      if (heroSubClassTier === "Advanced") {
        this.valuation += 500
      } else if (heroSubClassTier === "Elite") {
        this.valuation += 2500
      } else if (heroSubClassTier === "Transcendant") {
        this.valuation += 10000
      }

      if (heroSubclass === "Paladin" || heroSubclass === "DarkKnight") {
        this.valuation += 300
      } else if (heroSubclass === "Dragoon") {
        this.valuation += 500
      }
    }
  }
}
