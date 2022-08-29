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

    if (this.hero.generation === 3) {
      if (this.hero.summonsRemaining === 7) {
        this.valuation += 1
      } else if (this.hero.summonsRemaining === 8) {
        this.valuation += 2
      }
    } else if (this.hero.generation === 2) {
      if (this.hero.summonsRemaining === 6) {
        this.valuation += 5
      } else if (this.hero.summonsRemaining === 7) {
        this.valuation += 7
      } else if (this.hero.summonsRemaining === 8) {
        this.valuation += 9
      } else if (this.hero.summonsRemaining === 9) {
        this.valuation += 11
      }
    } else if (this.hero.generation === 1) {
      if (this.hero.summonsRemaining === 6) {
        this.valuation += 9
      } else if (this.hero.summonsRemaining === 7) {
        this.valuation += 12
      } else if (this.hero.summonsRemaining === 8) {
        this.valuation += 15
      } else if (this.hero.summonsRemaining === 9) {
        this.valuation += 17
      } else if (this.hero.summonsRemaining === 10) {
        this.valuation += 20
      }
    }

    if (this.hero.mainClass === "Warrior" || this.hero.mainClass === "Knight") {
      if (heroSubclass === "Paladin" || heroSubclass === "DarkKnight") {
        this.valuation += 10
      } else if (heroSubclass === "Dragoon") {
        this.valuation += 50
      } 

      if (this.hero.profession === "mining") {
        this.valuation += 15
      }

      if ((heroGreenStatBoost === "STR" || heroGreenStatBoost === "VIT") && (heroBlueStatBoost === "STR" || heroBlueStatBoost === "VIT")) {
        this.valuation += 15
      } else if ((heroGreenStatBoost === "STR" || heroGreenStatBoost === "VIT") || (heroBlueStatBoost === "STR" || heroBlueStatBoost === "VIT")) {
        this.valuation += 3
      }
    } else if (this.hero.mainClass === "Archer" || this.hero.mainClass === "Thief") {
      if (heroSubclass === "Paladin" || heroSubclass === "DarkKnight") {
        this.valuation += 10
      } else if (heroSubclass === "Dragoon") {
        this.valuation += 50
      }

      if (this.hero.profession === "mining") {
        this.valuation += 12
      } else if (this.hero.profession === "foraging") {
        this.valuation += 5
      }

      if (heroGreenStatBoost === "STR" && heroBlueStatBoost === "STR") {
        this.valuation += 15
      } else if (heroGreenStatBoost === "STR" || heroBlueStatBoost === "STR") {
        this.valuation += 3
      }
    } else if (this.hero.mainClass === "Wizard" || this.hero.mainClass === "Priest") {
      if (heroSubclass === "Summoner") {
        this.valuation += 15
      } else if (heroSubclass === "Ninja") {
        this.valuation += 5
      }else if (heroSubclass === "Sage") {
        this.valuation += 50
      }

      if (this.hero.profession === "foraging") {
        this.valuation += 8
      }

      if ((heroGreenStatBoost === "INT" || heroGreenStatBoost === "WIS") && (heroBlueStatBoost === "INT" || heroBlueStatBoost === "WIS")) {
        this.valuation += 10
      } else if ((heroGreenStatBoost === "INT" || heroGreenStatBoost === "WIS") || (heroBlueStatBoost === "INT" || heroBlueStatBoost === "WIS")) {
        this.valuation += 3
      }
    } else if (this.hero.mainClass === "Monk" || this.hero.mainClass === "Pirate") {
      if (heroSubclass === "Ninja") {
        this.valuation += 10
      } else if (heroSubclass === "Summoner") {
        this.valuation += 5
      } else if (heroSubclass === "Sage") {
        this.valuation += 50
      }

      if (this.hero.profession === "fishing") {
        this.valuation += 8
      }

      if ((heroGreenStatBoost === "AGI" || heroGreenStatBoost === "LCK") && (heroBlueStatBoost === "AGI" || heroBlueStatBoost === "LCK")) {
        this.valuation += 8
      } else if ((heroGreenStatBoost === "AGI" || heroGreenStatBoost === "LCK") || (heroBlueStatBoost === "AGI" || heroBlueStatBoost === "LCK")) {
        this.valuation += 3
      }
    } else if (this.hero.mainClass === "Seer" || this.hero.mainClass === "Berserker") {
      if (heroSubclass === "Shapeshifter" || heroSubclass === "Ninja") {
        this.valuation += 8
      }

      if (this.hero.profession === "fishing") {
        this.valuation += 3
      }

      if ((heroGreenStatBoost === "AGI" || heroGreenStatBoost === "LCK") && (heroBlueStatBoost === "AGI" || heroBlueStatBoost === "LCK")) {
        this.valuation += 5
      } else if ((heroGreenStatBoost === "AGI" || heroGreenStatBoost === "LCK") || (heroBlueStatBoost === "AGI" || heroBlueStatBoost === "LCK")) {
        this.valuation += 2
      }
    } 

    if (heroHairTier === "Advanced") {
      this.valuation += 3
    } else if (heroHairTier === "Elite") {
      this.valuation += 15
    } else if (heroHairTier === "Transcendant") {
      this.valuation += 25
    }

    if (heroBackappendageTier === "Advanced") {
      this.valuation += 3
    } else if (heroBackappendageTier === "Elite") {
      this.valuation += 15
    } else if (heroBackappendageTier === "Transcendant") {
      this.valuation += 25
    }

    if (heroSubClassTier === "Advanced") {
      this.valuation += 10
    } else if (heroSubClassTier === "Elite") {
      this.valuation += 30
    } else if (heroSubClassTier === "Transcendant") {
      this.valuation += 150
    }

    if (skillInfos.skillScore === 2) {
      this.valuation += 15
    } else if (skillInfos.skillScore === 3) {
      this.valuation += 40
    } else if (skillInfos.skillScore === 4) {
      this.valuation += 80
    } else if (skillInfos.skillScore >= 5) {
      this.valuation += 150
    }

    if (heroRarity === "UnCommon") {
      this.valuation = this.valuation * 1.05
    } else if (heroRarity === "Rare") {
      this.valuation = this.valuation * 1.15
    } else if (heroRarity === "Legendary") {
      this.valuation = this.valuation * 1.3
    } else if (heroRarity === "Mythic") {
      this.valuation = this.valuation * 2
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
        this.valuation += 30
      } else if (this.hero.summonsRemaining === 4) {
        this.valuation += 20
      } else if (this.hero.summonsRemaining === 3) {
        this.valuation += 8
      }
    } else if (this.hero.generation === 4) {
      if (this.hero.summonsRemaining === 5) {
        this.valuation += 50
      } else if (this.hero.summonsRemaining === 4) {
        this.valuation += 35
      } else if (this.hero.summonsRemaining === 3) {
        this.valuation += 15
      } else if (this.hero.summonsRemaining === 2) {
        this.valuation += 8
      }
    } else if (this.hero.generation === 3) {
      if (this.hero.summonsRemaining === 5) {
        this.valuation += 75
      } else if (this.hero.summonsRemaining === 4) {
        this.valuation += 55
      } else if (this.hero.summonsRemaining === 3) {
        this.valuation += 39
      } else if (this.hero.summonsRemaining === 2) {
        this.valuation += 15
      } else if (this.hero.summonsRemaining === 1) {
        this.valuation += 8
      }
    } else if (this.hero.generation === 2) {
      if (this.hero.summonsRemaining === 5) {
        this.valuation += 85
      } else if (this.hero.summonsRemaining === 4) {
        this.valuation += 69
      } else if (this.hero.summonsRemaining === 3) {
        this.valuation += 45
      } else if (this.hero.summonsRemaining === 2) {
        this.valuation += 25
      } else if (this.hero.summonsRemaining === 1) {
        this.valuation += 15
      }
    } else if (this.hero.generation === 1) {
      if (this.hero.summonsRemaining === 5) {
        this.valuation += 99
      } else if (this.hero.summonsRemaining === 4) {
        this.valuation += 79
      } else if (this.hero.summonsRemaining === 3) {
        this.valuation += 65
      } else if (this.hero.summonsRemaining === 2) {
        this.valuation += 35
      } else if (this.hero.summonsRemaining === 1) {
        this.valuation += 19
      }
    }

    if (this.hero.mainClass === "Paladin" || this.hero.mainClass === "DarkKnight") {
      if (heroSubclass === "Paladin" || heroSubclass === "DarkKnight") {
        this.valuation += 15
      } else if (heroSubclass === "Dragoon") {
        this.valuation += 30
      }

      if (this.hero.profession === "mining") {
        this.valuation += 20
      }

      if (heroGreenStatBoost === "STR" && heroBlueStatBoost === "STR") {
        this.valuation += 20
      } else if (heroGreenStatBoost === "STR" || heroBlueStatBoost === "STR") {
        this.valuation += 5
      }
    } else if (this.hero.mainClass === "Ninja" || this.hero.mainClass === "Summoner") {
      if (heroSubclass === "Summoner") {
        this.valuation += 15
      } else if (heroSubclass === "Sage") {
        this.valuation += 30
      }

      if (this.hero.profession === "foraging") {
        this.valuation += 10
      }

      if ((heroGreenStatBoost === "INT" || heroGreenStatBoost === "WIS") && (heroBlueStatBoost === "STR" || heroBlueStatBoost === "WIS")) {
        this.valuation += 20
      } else if ((heroGreenStatBoost === "INT" || heroGreenStatBoost === "WIS") || (heroBlueStatBoost === "STR" || heroBlueStatBoost === "WIS")) {
        this.valuation += 5
      }
    } else if (this.hero.mainClass === "Shapeshifter") {
      if (heroSubclass === "Shapeshifter" || heroSubclass === "Ninja") {
        this.valuation += 10
      }
    }

    if (heroHairTier === "Advanced") {
      this.valuation += 5
    } else if (heroHairTier === "Elite") {
      this.valuation += 20
    } else if (heroHairTier === "Transcendant") {
      this.valuation += 50
    }

    if (heroBackappendageTier === "Advanced") {
      this.valuation += 5
    } else if (heroBackappendageTier === "Elite") {
      this.valuation += 20
    } else if (heroBackappendageTier === "Transcendant") {
      this.valuation += 50
    }

    if (heroSubClassTier === "Advanced") {
      this.valuation += 10
    } else if (heroSubClassTier === "Elite") {
      this.valuation += 50
    } else if (heroSubClassTier === "Transcendant") {
      this.valuation += 150
    }

    if (skillInfos.skillScore === 2) {
      this.valuation += 39
    } else if (skillInfos.skillScore === 3) {
      this.valuation += 89
    } else if (skillInfos.skillScore === 4) {
      this.valuation += 199
    } else if (skillInfos.skillScore >= 5) {
      this.valuation += 450
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
