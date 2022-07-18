const config = require("~/config.js");
const autils = require('~/src/services/autils');
module.exports = class Valuator {
  constructor(price, hero) {
    this.price = parseInt(price) / Math.pow(10, 18);
    this.hero = hero;
    this.valuation = config.harmony.unconditionalPurchasePrice;
    this.mainclassPrice = 0;
    this.rarityPrice = 0;
    this.professionPrice = 0;
    this.summonPrice = 0;
    this.levelPrice = 0;
    this.stylePrice = 0;
    this.skillPrice = 0;
    this.statPrice = 0;
    this.subclassPrice = 0;
  }

  execute() {
    this.evaluateMainclassPrice();
    this.evaluateRarityPrice();
    this.evaluateProfessionPrice();
    this.evaluateSummonPrice();
    this.evaluateLevelPrice();
    this.evaluateStylePrice();
    this.evaluateSkillPrice();
    this.evaluateStatPrice();
    this.evaluateSubclassPrice();
  }

  evaluateMainclassPrice() {
    const heroMainclassTier = this.hero.attributeTier("mainclass");
    const heroRarity = this.hero.formatRarity();

    if (heroMainclassTier === "Basic") {
      this.mainclassPrice += 0;
    } else if (heroMainclassTier === "Advanced") {
      this.mainclassPrice += 5;
    } else if (heroMainclassTier === "Elite") {
      this.mainclassPrice += 30;
    } else if (heroMainclassTier === "Transcendant") {
      this.mainclassPrice += 800;
    }

    if (heroRarity === "UnCommon") {
      this.mainclassPrice = this.mainclassPrice * 1.05;
    } else if (heroRarity === "Rare") {
      this.mainclassPrice = this.mainclassPrice * 1.1;
    } else if (heroRarity === "Legendary") {
      this.mainclassPrice = this.mainclassPrice * 1.2;
    } else if (heroRarity === "Mythic") {
      this.mainclassPrice = this.mainclassPrice * 1.3;
    }

    this.valuation += this.mainclassPrice;
  }

  evaluateRarityPrice() {
    const heroMainclassTier = this.hero.attributeTier("mainclass");
    const heroRarity = this.hero.formatRarity();

    if (heroMainclassTier === "Basic") {
      if (heroRarity === "Rare") {
        this.rarityPrice += 10;
      } else if (heroRarity === "Legendary") {
        this.rarityPrice += 80;
      } else if (heroRarity === "Mythic") {
        this.rarityPrice += 300;
      }
    } else if (heroMainclassTier === "Advanced") {
      if (heroRarity === "UnCommon") {
        this.rarityPrice += 5;
      } else if (heroRarity === "Rare") {
        this.rarityPrice += 25;
      } else if (heroRarity === "Legendary") {
        this.rarityPrice += 200;
      } else if (heroRarity === "Mythic") {
        this.rarityPrice += 650;
      }
    } else if (heroMainclassTier === "Elite") {
      if (heroRarity === "UnCommon") {
        this.rarityPrice += 20;
      } else if (heroRarity === "Rare") {
        this.rarityPrice += 150;
      } else if (heroRarity === "Legendary") {
        this.rarityPrice += 1000;
      } else if (heroRarity === "Mythic") {
        this.rarityPrice += 2500;
      }
    } else if (heroMainclassTier === "Transcendant") {
      if (heroRarity === "UnCommon") {
        this.rarityPrice += 100;
      } else if (heroRarity === "Rare") {
        this.rarityPrice += 300;
      } else if (heroRarity === "Legendary") {
        this.rarityPrice += 1500;
      } else if (heroRarity === "Mythic") {
        this.rarityPrice += 5000;
      }
    }

    this.valuation += this.rarityPrice;
  }

  evaluateProfessionPrice() {
    const heroMainclass = this.hero.formatMainclass();
    
    switch(heroMainclass) {
      case "Warrior":
        if (this.hero.profession === "mining") {
          this.professionPrice += 5;
        }
        break;
      case "Knight":
        if (this.hero.profession === "mining") {
          this.professionPrice += 5;
        }
        break;
      case "Thief":
        if (this.hero.profession === "fishing") {
          this.professionPrice += 15;
        }
        break;
      case "Archer":
        if (this.hero.profession === "foraging") {
          this.professionPrice += 8;
        }
        break;
      case "Priest":
        if (this.hero.profession === "foraging") {
          this.professionPrice += 5;
        }
        break;
      case "Wizard":
        if (this.hero.profession === "foraging") {
          this.professionPrice += 5;
        }
        break;
      case "Monk":
        break;
      case "Pirate":
        break;
      case "Berserker":
        if (this.hero.profession === "mining") {
          this.professionPrice += 5;
        }
        break;
      case "Seer":
        if (this.hero.profession === "foraging") {
          this.professionPrice += 5;
        }
        break;
      case "Paladin":
        if (this.hero.profession === "mining") {
          this.professionPrice += 15;
        }
        break;
      case "DarkKnight":
        if (this.hero.profession === "mining") {
          this.professionPrice += 15;
        }
        break;
      case "Summoner":
        if (this.hero.profession === "foraging") {
          this.professionPrice += 5;
        }
        break;
      case "Ninja":
        if (this.hero.profession === "fishing") {
          this.professionPrice += 15;
        } else if (this.hero.profession === "foraging") {
          this.professionPrice += 5;
        }
        break;
      case "Shapeshifter":
        if (this.hero.profession === "fishing") {
          this.professionPrice += 15;
        } else if (this.hero.profession === "foraging") {
          this.professionPrice += 5;
        }
        break;
      case "Dragoon":
        if (this.hero.profession === "mining") {
          this.professionPrice += 10;
        }
        break;
      case "Sage":
        if (this.hero.profession === "foraging") {
          this.professionPrice += 10;
        }
        break;
      case "DreadKnight":
        if (this.hero.profession === "mining") {
          this.professionPrice += 100;
        }
        break;
    }

    this.valuation += this.professionPrice;
  }

  evaluateSummonPrice() {
    const heroMainclass = this.hero.formatMainclass();
    const heroMainclassTier = this.hero.attributeTier("mainclass");
    const heroRarity = this.hero.formatRarity();

    if (heroMainclassTier === "Basic") {
      if (this.hero.generation >= 3) {
        return;
      } else if (this.hero.generation === 2) {
        if (this.hero.summons_remaining >= 7) {
          this.summonPrice += 2;
        }
      } else if (this.hero.generation === 1) {
        if (this.hero.summons_remaining === 7) {
          this.summonPrice += 5;
        } else if (this.hero.summons_remaining === 8) {
          this.summonPrice += 10;
        } else if (this.hero.summons_remaining === 9) {
          this.summonPrice += 30;
        } else if (this.hero.summons_remaining === 10) {
          this.summonPrice += 50;
        }
      } else if (this.hero.generation === 0) {
        this.summonPrice += config.harmony.g0ConditionsOfPurchase;
      }
    } else if (heroMainclassTier === "Advanced") {
      if (this.hero.generation >= 5) {
        if (this.hero.summons_remaining === 4) {
          this.summonPrice += 5;
        } else if (this.hero.summons_remaining === 5) {
          this.summonPrice += 20;
        }
      } else if (this.hero.generation === 4) {
        if (this.hero.summons_remaining === 3) {
          this.summonPrice += 5;
        } else if (this.hero.summons_remaining === 4) {
          this.summonPrice += 20;
        } else if (this.hero.summons_remaining === 5) {
          this.summonPrice += 40;
        }
      } else if (this.hero.generation === 3) {
        if (this.hero.summons_remaining === 2) {
          this.summonPrice += 8;
        } else if (this.hero.summons_remaining === 3) {
          this.summonPrice += 20;
        } else if (this.hero.summons_remaining === 4) {
          this.summonPrice += 40;
        } else if (this.hero.summons_remaining === 5) {
          this.summonPrice += 75;
        }
      } else if (this.hero.generation === 2) {
        if (this.hero.summons_remaining === 2) {
          this.summonPrice += 15;
        } else if (this.hero.summons_remaining === 3) {
          this.summonPrice += 35;
        } else if (this.hero.summons_remaining === 4) {
          this.summonPrice += 55;
        } else if (this.hero.summons_remaining === 5) {
          this.summonPrice += 100;
        }
      } else if (this.hero.generation === 1) {
        if (this.hero.summons_remaining === 1) {
          this.summonPrice += 10;
        } else if (this.hero.summons_remaining === 2) {
          this.summonPrice += 20;
        } else if (this.hero.summons_remaining === 3) {
          this.summonPrice += 60;
        } else if (this.hero.summons_remaining === 4) {
          this.summonPrice += 90;
        } else if (this.hero.summons_remaining === 5) {
          this.summonPrice += 125;
        }
      }

      if (heroMainclass === "Shapeshifter") {
        this.summonPrice = this.summonPrice * 0.55;
      }
    } else if (heroMainclassTier === "Elite") {
      if (this.hero.generation >= 5) {
        if (this.hero.summons_remaining === 1) {
          this.summonPrice += 100;
        } else if (this.hero.summons_remaining === 2) {
          this.summonPrice += 250;
        } else if (this.hero.summons_remaining === 3) {
          this.summonPrice += 450;
        }
      } else if (this.hero.generation <= 4) {
        if (this.hero.summons_remaining === 1) {
          this.summonPrice += 120;
        } else if (this.hero.summons_remaining === 2) {
          this.summonPrice += 300;
        } else if (this.hero.summons_remaining === 3) {
          this.summonPrice += 500;
        }
      }
    } else if (heroMainclassTier === "Transcendant") {
      if (this.hero.summons_remaining === 1) {
        this.summonPrice += 500;
      }
    }

    if (heroRarity === "UnCommon") {
      this.summonPrice = this.summonPrice * 1.1;
    } else if (heroRarity === "Rare") {
      this.summonPrice = this.summonPrice * 1.2;
    } else if (heroRarity === "Legendary") {
      this.summonPrice = this.summonPrice * 1.5;
    } else if (heroRarity === "Mythic") {
      this.summonPrice = this.summonPrice * 2.25;
    }

    this.valuation += this.summonPrice;
  }

  evaluateLevelPrice() {
    const heroMainclassTier = this.hero.attributeTier("mainclass");
    const heroRarity = this.hero.formatRarity();

    if (heroMainclassTier === "Basic") {
      this.levelPrice += (this.hero.level - 1)
    } else if (heroMainclassTier === "Advanced") {
      this.levelPrice += ((this.hero.level - 1) * 1.5)
    } else if (heroMainclassTier === "Elite") {
      this.levelPrice += ((this.hero.level - 1) * 3)
    } else if (heroMainclassTier === "Transcendant") {
      this.levelPrice += ((this.hero.level - 1) * 10)
    }

    if (heroRarity === "UnCommon") {
      this.levelPrice = this.levelPrice * 1.2;
    } else if (heroRarity === "Rare") {
      this.levelPrice = this.levelPrice * 1.5;
    } else if (heroRarity === "Legendary") {
      this.levelPrice = this.levelPrice * 3;
    } else if (heroRarity === "Mythic") {
      this.levelPrice = this.levelPrice * 5;
    }

    this.valuation += this.levelPrice;
  }

  evaluateStylePrice() {
    const heroHairTier = this.hero.attributeTier("hairstyle");
    const heroBackappendageTier = this.hero.attributeTier("backappendage");
    const heroRarity = this.hero.formatRarity();

    if (heroHairTier === "Elite") {
      this.stylePrice += 20;
    } else if (heroHairTier === "Transcendant") {
      this.stylePrice += 50;
    }

    if (heroBackappendageTier === "Elite") {
      this.stylePrice += 20;
    } else if (heroBackappendageTier === "Transcendant") {
      this.stylePrice += 50;
    }

    if (heroRarity === "UnCommon") {
      this.stylePrice = this.stylePrice * 1.05;
    } else if (heroRarity === "Rare") {
      this.stylePrice = this.stylePrice * 1.1;
    } else if (heroRarity === "Legendary") {
      this.stylePrice = this.stylePrice * 1.2;
    } else if (heroRarity === "Mythic") {
      this.stylePrice = this.stylePrice * 1.3;
    }

    if (this.summonPrice === 0) {
      this.stylePrice = this.stylePrice * 0.3;
    }

    this.valuation += this.stylePrice;
  }

  evaluateSkillPrice() {
    const heroRarity = this.hero.formatRarity();
    const heroSkillsTier = [
      this.hero.attributeTier("active1"),
      this.hero.attributeTier("active2"),
      this.hero.attributeTier("passive1"),
      this.hero.attributeTier("passive2")
    ]
    let skillCount = 0;
    let skillScore = 0;

    heroSkillsTier.forEach((data) => {
      if (data === "Advanced") {
        skillCount ++;
        skillScore += 1;
      } else if (data === "Elite") {
        skillCount ++;
        skillScore += 2;
      } else if (data === "Transcendant") {
        skillCount ++;
        skillScore += 3;
      }
    })

    if (skillScore === 1) {
      this.skillPrice += 1;
    } else if (skillScore === 2) {
      if (skillCount === 1) {
        this.skillPrice += 30;
      } else if (skillCount === 2) {
        this.skillPrice += 50;
      }
    } else if (skillScore === 3) {
      if (skillCount === 1) {
        this.skillPrice += 20;
      } else if (skillCount === 2) {
        this.skillPrice += 80;
      } else if (skillCount === 3) {
        this.skillPrice += 100;
      }
    } else if (skillScore === 4) {
      if (skillCount === 2) {
        this.skillPrice += 80;
      } else if (skillCount === 3) {
        this.skillPrice += 150;
      } else if (skillCount === 4) {
        this.skillPrice += 220;
      }
    } else if (skillScore === 5) {
      if (skillCount === 2) {
        this.skillPrice += 120;
      } else if (skillCount === 3) {
        this.skillPrice += 200;
      } else if (skillCount === 4) {
        this.skillPrice += 400;
      }
    } else if (skillScore === 6) {
      if (skillCount === 2) {
        this.skillPrice += 130;
      } else if (skillCount === 3) {
        this.skillPrice += 250;
      } else if (skillCount === 4) {
        this.skillPrice += 500;
      }
    } else if (skillScore >= 7) {
      this.skillPrice += 600;
    }

    if (this.summonPrice === 0) {
      this.skillPrice = this.skillPrice * 0.1;
    } else if (this.summonPrice <= 10) {
      this.skillPrice = this.skillPrice * 0.5;
    }

    if (heroRarity === "UnCommon") {
      this.skillPrice = this.skillPrice * 1.05;
    } else if (heroRarity === "Rare") {
      this.skillPrice = this.skillPrice * 1.1;
    } else if (heroRarity === "Legendary") {
      this.skillPrice = this.skillPrice * 1.15;
    } else if (heroRarity === "Mythic") {
      this.skillPrice = this.skillPrice * 1.2;
    }

    this.valuation += this.skillPrice;
  }

  evaluateStatPrice() {
    const heroMainclass = this.hero.formatMainclass();
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

  evaluateSubclassPrice() {
    const heroMainclass = this.hero.formatMainclass();
    const heroSubclass = this.hero.formatSubclass();
    const heroRarity = this.hero.formatRarity();

    switch(heroMainclass) {
      case "Warrior":
        if (heroSubclass === "Warrior" || heroSubclass === "Knight" || heroSubclass === "Summoner" || heroSubclass === "Ninja" || heroSubclass === "Shapeshifter") {
          this.subclassPrice += 1;
        } else if (heroSubclass === "Paladin" || heroSubclass === "DarkKnight") {
          this.subclassPrice += 3;
        } else if (heroSubclass === "Dragoon" || heroSubclass === "Sage") {
          this.subclassPrice += 10;
        } else if (heroSubclass === "DreadKnight") {
          this.subclassPrice += 30;
        }
        break;
      case "Knight":
        if (heroSubclass === "Warrior" || heroSubclass === "Knight" || heroSubclass === "Summoner" || heroSubclass === "Ninja" || heroSubclass === "Shapeshifter") {
          this.subclassPrice += 1;
        } else if (heroSubclass === "Paladin" || heroSubclass === "DarkKnight") {
          this.subclassPrice += 3;
        } else if (heroSubclass === "Dragoon" || heroSubclass === "Sage") {
          this.subclassPrice += 10;
        } else if (heroSubclass === "DreadKnight") {
          this.subclassPrice += 30;
        }
        break;
      case "Thief":
        if (heroSubclass === "Thief" || heroSubclass === "Summoner" || heroSubclass === "Ninja" || heroSubclass === "Shapeshifter") {
          this.subclassPrice += 1;
        } else if (heroSubclass === "Paladin" || heroSubclass === "DarkKnight") {
          this.subclassPrice += 3;
        } else if (heroSubclass === "Dragoon" || heroSubclass === "Sage") {
          this.subclassPrice += 10;
        } else if (heroSubclass === "DreadKnight") {
          this.subclassPrice += 30;
        }
        break;
      case "Archer":
        if (heroSubclass === "Archer" || heroSubclass === "Summoner" || heroSubclass === "Ninja" || heroSubclass === "Shapeshifter") {
          this.subclassPrice += 1;
        } else if (heroSubclass === "Paladin" || heroSubclass === "DarkKnight") {
          this.subclassPrice += 3;
        } else if (heroSubclass === "Dragoon" || heroSubclass === "Sage") {
          this.subclassPrice += 10;
        } else if (heroSubclass === "DreadKnight") {
          this.subclassPrice += 30;
        }
        break;
      case "Priest":
        if (heroSubclass === "Priest" || heroSubclass === "Wizard" || heroSubclass === "Paladin" || heroSubclass === "DarkKnight" || heroSubclass === "Shapeshifter") {
          this.subclassPrice += 1;
        } else if (heroSubclass === "Summoner" || heroSubclass === "Ninja") {
          this.subclassPrice += 3;
        } else if (heroSubclass === "Dragoon" || heroSubclass === "Sage") {
          this.subclassPrice += 10;
        } else if (heroSubclass === "DreadKnight") {
          this.subclassPrice += 30;
        }
        break;
      case "Wizard":
        if (heroSubclass === "Priest" || heroSubclass === "Wizard" || heroSubclass === "Paladin" || heroSubclass === "DarkKnight" || heroSubclass === "Shapeshifter") {
          this.subclassPrice += 1;
        } else if (heroSubclass === "Summoner" || heroSubclass === "Ninja") {
          this.subclassPrice += 3;
        } else if (heroSubclass === "Dragoon" || heroSubclass === "Sage") {
          this.subclassPrice += 10;
        } else if (heroSubclass === "DreadKnight") {
          this.subclassPrice += 30;
        }
        break;
      case "Monk":
        if (heroSubclass === "Monk" || heroSubclass === "Paladin" || heroSubclass === "DarkKnight" || heroSubclass === "Shapeshifter") {
          this.subclassPrice += 1;
        } else if (heroSubclass === "Summoner" || heroSubclass === "Ninja") {
          this.subclassPrice += 3;
        } else if (heroSubclass === "Dragoon" || heroSubclass === "Sage") {
          this.subclassPrice += 10;
        } else if (heroSubclass === "DreadKnight") {
          this.subclassPrice += 30;
        }
        break;
      case "Pirate":
        if (heroSubclass === "Pirate" || heroSubclass === "Paladin" || heroSubclass === "DarkKnight" || heroSubclass === "Shapeshifter") {
          this.subclassPrice += 1;
        } else if (heroSubclass === "Summoner" || heroSubclass === "Ninja") {
          this.subclassPrice += 3;
        } else if (heroSubclass === "Dragoon" || heroSubclass === "Sage") {
          this.subclassPrice += 10;
        } else if (heroSubclass === "DreadKnight") {
          this.subclassPrice += 30;
        }
        break;
      case "Berserker":
        if (heroSubclass === "Berserker" || heroSubclass === "Summoner" || heroSubclass === "Ninja") {
          this.subclassPrice += 1;
        } else if (heroSubclass === "Paladin" || heroSubclass === "DarkKnight" || heroSubclass === "Shapeshifter") {
          this.subclassPrice += 3;
        } else if (heroSubclass === "Dragoon" || heroSubclass === "Sage") {
          this.subclassPrice += 10;
        } else if (heroSubclass === "DreadKnight") {
          this.subclassPrice += 30;
        }
        break;
      case "Seer":
        if (heroSubclass === "Seer" || heroSubclass === "Paladin" || heroSubclass === "DarkKnight" || heroSubclass === "Ninja") {
          this.subclassPrice += 1;
        } else if (heroSubclass === "Summoner" || heroSubclass === "Shapeshifter") {
          this.subclassPrice += 3;
        } else if (heroSubclass === "Dragoon" || heroSubclass === "Sage") {
          this.subclassPrice += 10;
        } else if (heroSubclass === "DreadKnight") {
          this.subclassPrice += 30;
        }
        break;
      case "Paladin":
        if (heroSubclass === "Warrior" || heroSubclass === "Knight" || heroSubclass === "Berserker") {
          this.subclassPrice += 1;
        } else if (heroSubclass === "Summoner" || heroSubclass === "Ninja" || heroSubclass === "Shapeshifter") {
          this.subclassPrice += 3;
        } else if (heroSubclass === "Paladin" || heroSubclass === "DarkKnight") {
          this.subclassPrice += 10;
        } else if (heroSubclass === "Dragoon" || heroSubclass === "Sage") {
          this.subclassPrice += 30;
        } else if (heroSubclass === "DreadKnight") {
          this.subclassPrice += 80;
        }
        break;
      case "DarkKnight":
        if (heroSubclass === "Warrior" || heroSubclass === "Knight" || heroSubclass === "Berserker") {
          this.subclassPrice += 1;
        } else if (heroSubclass === "Summoner" || heroSubclass === "Ninja" || heroSubclass === "Shapeshifter") {
          this.subclassPrice += 3;
        } else if (heroSubclass === "Paladin" || heroSubclass === "DarkKnight") {
          this.subclassPrice += 10;
        } else if (heroSubclass === "Dragoon" || heroSubclass === "Sage") {
          this.subclassPrice += 30;
        } else if (heroSubclass === "DreadKnight") {
          this.subclassPrice += 80;
        }
        break;
      case "Summoner":
        if (heroSubclass === "Wizard" || heroSubclass === "Priest" || heroSubclass === "Seer") {
          this.subclassPrice += 1;
        } else if (heroSubclass === "Paladin" || heroSubclass === "DarkKnight" || heroSubclass === "Shapeshifter" || heroSubclass === "Ninja") {
          this.subclassPrice += 3;
        } else if (heroSubclass === "Summoner") {
          this.subclassPrice += 10;
        } else if (heroSubclass === "Dragoon" || heroSubclass === "Sage") {
          this.subclassPrice += 30;
        } else if (heroSubclass === "DreadKnight") {
          this.subclassPrice += 80;
        }
        break;
      case "Ninja":
        if (heroSubclass === "Thief") {
          this.subclassPrice += 1;
        } else if (heroSubclass === "Paladin" || heroSubclass === "DarkKnight" || heroSubclass === "Summoner") {
          this.subclassPrice += 3;
        } else if (heroSubclass === "Shapeshifter" || heroSubclass === "Ninja") {
          this.subclassPrice += 10;
        } else if (heroSubclass === "Dragoon" || heroSubclass === "Sage") {
          this.subclassPrice += 30;
        } else if (heroSubclass === "DreadKnight") {
          this.subclassPrice += 80;
        }
        break;
      case "Shapeshifter":
        if (heroSubclass === "Thief" || heroSubclass === "Pirate") {
          this.subclassPrice += 1;
        } else if (heroSubclass === "Paladin" || heroSubclass === "DarkKnight" || heroSubclass === "Summoner") {
          this.subclassPrice += 3;
        } else if (heroSubclass === "Shapeshifter" || heroSubclass === "Ninja") {
          this.subclassPrice += 10;
        } else if (heroSubclass === "Dragoon" || heroSubclass === "Sage") {
          this.subclassPrice += 30;
        } else if (heroSubclass === "DreadKnight") {
          this.subclassPrice += 80;
        }
        break;
      case "Dragoon":
        if (heroSubclass === "Warrior" || heroSubclass === "Knight" || heroSubclass === "Berserker") {
          this.subclassPrice += 1;
        } else if (heroSubclass === "Summoner") {
          this.subclassPrice += 5;
        } else if (heroSubclass === "Paladin" || heroSubclass === "DarkKnight" || heroSubclass === "Ninja" || heroSubclass === "Shapeshifter") {
          this.subclassPrice += 15;
        } else if (heroSubclass === "Dragoon" || heroSubclass === "Sage") {
          this.subclassPrice += 50;
        } else if (heroSubclass === "DreadKnight") {
          this.subclassPrice += 100;
        }
        break;
      case "Sage":
        if (heroSubclass === "Wizard" || heroSubclass === "Priest" || heroSubclass === "Seer") {
          this.subclassPrice += 3;
        } else if (heroSubclass === "Paladin" || heroSubclass === "DarkKnight") {
          this.subclassPrice += 5;
        } else if (heroSubclass === "Ninja" || heroSubclass === "Shapeshifter") {
          this.subclassPrice += 10;
        } else if (heroSubclass === "Summoner") {
          this.subclassPrice += 25;
        } else if (heroSubclass === "Dragoon" || heroSubclass === "Sage") {
          this.subclassPrice += 50;
        } else if (heroSubclass === "DreadKnight") {
          this.subclassPrice += 100;
        }
        break;
      case "DreadKnight":
        if (heroSubclass === "Warrior" || heroSubclass === "Knight" || heroSubclass === "Berserker") {
          this.subclassPrice += 10;
        } else if (heroSubclass === "Paladin" || heroSubclass === "DarkKnight" || heroSubclass === "Ninja" || heroSubclass === "Shapeshifter") {
          this.subclassPrice += 50;
        } else if (heroSubclass === "Summoner") {
          this.subclassPrice += 25;
        } else if (heroSubclass === "Dragoon" || heroSubclass === "Sage") {
          this.subclassPrice += 100;
        } else if (heroSubclass === "DreadKnight") {
          this.subclassPrice += 500;
        }
        break;
    }

    if (heroRarity === "UnCommon") {
      this.subclassPrice = this.subclassPrice * 1.1;
    } else if (heroRarity === "Rare") {
      this.subclassPrice = this.subclassPrice * 1.2;
    } else if (heroRarity === "Legendary") {
      this.subclassPrice = this.subclassPrice * 1.3;
    } else if (heroRarity === "Mythic") {
      this.subclassPrice = this.subclassPrice * 1.4;
    }

    this.valuation += this.subclassPrice;
  }
}
