const config = require("~/config.js");
const autils = require("~/src/services/autils");
const MeditationCircle = require('~/src/harmony/contracts/meditationCircle');
const meditationCircleContract = new MeditationCircle();
module.exports = class Hero {
  constructor(heroInfo) {
    this.id = heroInfo.id;
    this.owner = heroInfo.owner.owner;
    this.rarity = heroInfo.rarity;
    this.summonsRemaining = heroInfo.summonsRemaining;
    this.profession = heroInfo.profession;
    this.mainClass = heroInfo.mainClass;
    this.subClass = heroInfo.subClass;
    this.generation = heroInfo.generation;
    this.level = heroInfo.level;
    this.passive1 = heroInfo.passive1;
    this.passive2 = heroInfo.passive2;
    this.active1 = heroInfo.active1;
    this.active2 = heroInfo.active2;
    this.statboost1 = heroInfo.statBoost1;
    this.statboost2 = heroInfo.statBoost2;
    this.hairStyle = heroInfo.hairStyle;
    this.backAppendage = heroInfo.backAppendage;
    this.maxSummons = heroInfo.maxSummons;
    this.network = heroInfo.network;
    this.xp = heroInfo.xp;
    this.maxXp = this.maxXp();
    this.isXpFull = this.xp >= this.maxXp;
    this.isOnQuesting = heroInfo.currentQuest !== autils.get0xAddress();
    this.isOnSale = heroInfo.saleAuction !== null ? true : false;
    this.isOnRent = heroInfo.assistingAuction !== null ? true : false;
    this.salePrice = heroInfo.saleAuction ? heroInfo.saleAuction.startingPrice : '0';
    this.rentPrice = heroInfo.assistingAuction ? heroInfo.assistingAuction.startingPrice : '0';
  }

  isOwning() {
    return this.owner.toLowerCase() === config.walletAddress.toLowerCase() ? true : false
  }

  formatRarity() {
    let returnValue;

    switch(this.rarity) {
      case 0: 
        returnValue = "Common";
        break;
      case 1: 
        returnValue = "UnCommon";
        break;
      case 2: 
        returnValue = "Rare";
        break;
      case 3: 
        returnValue = "Legendary";
        break;
      case 4:
        returnValue = "Mythic";
        break;
      default:
        returnValue = "Out of rarity";
    }

    return returnValue;
  }

  attributeTier(attributeName) {
    const integerList = ["backAppendage", "hairStyle"]
    const skillList = ["passive1", "passive2", "active1", "active2"]
    const classList = ["subClass", "mainClass"]

    let attribute = this[attributeName];

    if (skillList.includes(attributeName)) {
      if (attribute.startsWith("Basic")) {
        return "Basic"
      } else if (attribute.startsWith("Advanced")) {
        return "Advanced"
      } else if (attribute.startsWith("Elite")) {
        return "Elite"
      } else if (attribute.startsWith("Transcendant")) {
        return "Transcendant"
      }
    } else if (integerList.includes(attributeName)) {
      if (parseInt(attribute) <= 15) {
        return "Basic"
      } else if (parseInt(attribute) >= 16 && parseInt(attribute) <= 23) {
        return "Advanced"
      } else if (parseInt(attribute) >= 24 && parseInt(attribute) <= 27) {
        return "Elite"
      } else if (parseInt(attribute) >= 28) {
        return "Transcendant"
      }
    } else if (classList.includes(attributeName)) {
      if (["Archer", "Berserker", "Knight", "Monk", "Pirate", "Priest", "Seer", "Thief", "Warrior", "Wizard"].includes(attribute)) {
        return "Basic"
      } else if (["DarkKnight", "Paladin", "Ninja", "Summoner", "Shapeshifter"].includes(attribute)) {
        return "Advanced"
      } else if (["Dragoon", "Sage"].includes(attribute)) {
        return "Elite"
      } else if (attribute === "DreadKnight") {
        return "Transcendant"
      }
    } else {
      return "attributes without class concept"
    }
  }

  selfProfessionMatch() {    
    const profession = this.profession;

    switch(this.mainClass) {
      case "Warrior":
        return profession === "mining" ? true : false;
      case "Knight":
        return profession === "mining" ? true : false;
      case "Thief":
        return profession === "fishing" || profession === "mining" ? true : false;
      case "Archer":
        return profession === "foraging" || profession === "mining" ? true : false;
      case "Priest":
        return profession === "foraging" || profession === "gardening" ? true : false;
      case "Wizard":
        return profession === "foraging" || profession === "gardening" ? true : false;
      case "Monk":
        return profession === "fishing" ? true : false;
      case "Pirate":
        return profession === "fishing" ? true : false;
      case "Berserker":
        return profession === "mining" ? true : false;
      case "Seer":
        return profession === "foraging" ? true : false;
      case "Paladin":
        return profession === "mining" || profession === "gardening" ? true : false;
      case "DarkKnight":
        return profession === "mining" || profession === "foraging" ? true : false;
      case "Summoner":
        return profession === "foraging" || profession === "gardening" ? true : false;
      case "Ninja":
        return profession === "fishing" || profession === "foraging" ? true : false;
      case "Shapeshifter":
        return profession === "fishing" ? true : false;
      case "Dragoon":
        return profession === "mining" ? true : false;
      case "Sage":
        return profession === "foraging" || profession === "gardening" ? true : false;
      case "DreadKnight":
        return profession === "mining" ? true : false;
    }
  }

  summonProfessionMatch() {
    const profession = this.profession;

    switch(this.mainClass) {
      case "Warrior":
        return profession === "mining" || profession === "gardening" ? true : false;
      case "Knight":
        return profession === "mining" || profession === "gardening" ? true : false;
      case "Thief":
        return profession === "foraging" || profession === "mining" ? true : false;
      case "Archer":
        return profession === "foraging" || profession === "mining" ? true : false;
      case "Priest":
        return profession === "foraging" || profession === "gardening" ? true : false;
      case "Wizard":
        return profession === "foraging" || profession === "gardening" ? true : false;
      case "Monk":
        return profession === "fishing" || profession === "foraging" ? true : false;
      case "Pirate":
        return profession === "fishing" || profession === "foraging" ? true : false;
      case "Berserker":
        return profession === "fishing" ? true : false;
      case "Seer":
        return profession === "fishing" ? true : false;
      case "Paladin":
        return profession === "mining" ? true : false;
      case "DarkKnight":
        return profession === "mining" ? true : false;
      case "Summoner":
        return profession === "foraging" || profession === "gardening" ? true : false;
      case "Ninja":
        return profession === "foraging" || profession === "gardening" ? true : false;
      case "Shapeshifter":
        return false;
      case "Dragoon":
        return profession === "mining" ? true : false;
      case "Sage":
        return profession === "mining" ? true : false;
      case "DreadKnight":
        return false;
    }
  }

  maxXp() {
    const nextLevel = this.level + 1;
    
    if (this.level < 6) {
      return nextLevel * 1000;
    } else if (this.level < 9) {
      return 4000 + (nextLevel - 5) * 2000;
    } else if (this.level < 16) {
      return 12000 + (nextLevel - 9) * 4000;
    } else if (this.level < 36) {
      return 40000 + (nextLevel - 16) * 5000;
    } else if (this.level < 56) {
      return 140000 + (nextLevel - 36) * 7500;
    } else {
      return 290000 + (nextLevel - 56) * 10000;
    }
  }

  growthStats() {
    let mainGrowth;
    let subGrowth1;
    let subGrowth2;
    const profession = this.profession;

    switch(this.mainClass) {
      case "Warrior":
        mainGrowth = "STR";

        if (profession === "mining") {
          subGrowth1 = "END";
          subGrowth2 = "DEX";
        } else {
          subGrowth1 = "VIT";
          subGrowth2 = "DEX";
        }
        break;
      case "Knight":
        mainGrowth = "VIT";
        subGrowth1 = "END";
        subGrowth2 = "STR";
        break;
      case "Thief":
        mainGrowth = "AGI";
        subGrowth1 = "LCK";
        if (profession === "foraging") {
          subGrowth2 = "DEX";
        } else {
          subGrowth2 = "STR";
        }
        break;
      case "Archer":
        mainGrowth = "DEX";

        if (profession === "mining") {
          subGrowth1 = "END";
          subGrowth2 = "STR";
        } else if (profession === "foraging") {
          subGrowth1 = "INT";
          subGrowth2 = "STR";
        } else if (profession === "fishing") {
          subGrowth1 = "AGI";
          subGrowth2 = "LCK";
        } else if (profession === "gardening") {
          subGrowth1 = "VIT";
          subGrowth2 = "STR";
        }
        break;
      case "Priest":
        if (profession === "foraging") {
          mainGrowth = "INT";
          subGrowth1 = "WIS";
          subGrowth2 = "VIT";
        } else if (profession === "gardening") {
          mainGrowth = "WIS";
          subGrowth1 = "INT";
          subGrowth2 = "VIT";
        } else if (profession === "mining") {
          mainGrowth = "WIS";
          subGrowth1 = "INT";
          subGrowth2 = "END";
        } else if (profession === "fishing") {
          mainGrowth = "WIS";
          subGrowth1 = "INT";
          subGrowth2 = "AGI";
        }
        break;
      case "Wizard":
        if (profession === "foraging") {
          mainGrowth = "INT";
          subGrowth1 = "WIS";
          subGrowth2 = "VIT";
        } else if (profession === "gardening") {
          mainGrowth = "WIS";
          subGrowth1 = "INT";
          subGrowth2 = "VIT";
        } else if (profession === "mining") {
          mainGrowth = "INT";
          subGrowth1 = "WIS";
          subGrowth2 = "END";
        } else if (profession === "fishing") {
          mainGrowth = "INT";
          subGrowth1 = "WIS";
          subGrowth2 = "AGI";
        }
        break;
      case "Monk":
        if (profession === "foraging") {
          mainGrowth = "DEX";
          subGrowth1 = "INT";
          subGrowth2 = "VIT";
        } else if (profession === "gardening") {
          mainGrowth = "VIT";
          subGrowth1 = "WIS";
          subGrowth2 = "STR";
        } else if (profession === "mining") {
          mainGrowth = "STR";
          subGrowth1 = "END";
          subGrowth2 = "VIT";
        } else if (profession === "fishing") {
          mainGrowth = "AGI";
          subGrowth1 = "LCK";
          subGrowth2 = "VIT";
        }
        break;
      case "Pirate":
        if (profession === "foraging") {
          mainGrowth = "DEX";
          subGrowth1 = "STR";
          subGrowth2 = "VIT";
        } else if (profession === "gardening") {
          mainGrowth = "VIT";
          subGrowth1 = "STR";
          subGrowth2 = "DEX";
        } else if (profession === "mining") {
          mainGrowth = "STR";
          subGrowth1 = "END";
          subGrowth2 = "DEX";
        } else if (profession === "fishing") {
          mainGrowth = "DEX";
          subGrowth1 = "STR";
          subGrowth2 = "AGI";
        }
        break;
      case "Berserker":
        if (profession === "foraging") {
          mainGrowth = "STR";
          subGrowth1 = "DEX";
          subGrowth2 = "VIT";
        } else if (profession === "gardening") {
          mainGrowth = "STR";
          subGrowth1 = "VIT";
          subGrowth2 = "DEX";
        } else if (profession === "mining") {
          mainGrowth = "STR";
          subGrowth1 = "END";
          subGrowth2 = "DEX";
        } else if (profession === "fishing") {
          mainGrowth = "STR";
          subGrowth1 = "DEX";
          subGrowth2 = "AGI";
        }
        break;
      case "Seer":
        if (profession === "foraging") {
          mainGrowth = "INT";
          subGrowth1 = "WIS";
          subGrowth2 = "VIT";
        } else if (profession === "gardening") {
          mainGrowth = "WIS";
          subGrowth1 = "INT";
          subGrowth2 = "VIT";
        } else if (profession === "mining") {
          mainGrowth = "WIS";
          subGrowth1 = "INT";
          subGrowth2 = "END";
        } else if (profession === "fishing") {
          mainGrowth = "WIS";
          subGrowth1 = "INT";
          subGrowth2 = "AGI";
        }
        break;
      case "Paladin":
        if (profession === "foraging") {
          mainGrowth = "VIT";
          subGrowth1 = "STR";
          subGrowth2 = "END";
        } else if (profession === "gardening") {
          mainGrowth = "VIT";
          subGrowth1 = "WIS";
          subGrowth2 = "END";
        } else if (profession === "mining") {
          mainGrowth = "VIT";
          subGrowth1 = "STR";
          subGrowth2 = "END";
        } else if (profession === "fishing") {
          mainGrowth = "VIT";
          subGrowth1 = "STR";
          subGrowth2 = "END";
        }
        break;
      case "DarkKnight":
        if (profession === "foraging") {
          mainGrowth = "STR";
          subGrowth1 = "DEX";
          subGrowth2 = "INT";
        } else if (profession === "gardening") {
          mainGrowth = "STR";
          subGrowth1 = "VIT";
          subGrowth2 = "INT";
        } else if (profession === "mining") {
          mainGrowth = "STR";
          subGrowth1 = "VIT";
          subGrowth2 = "END";
        } else if (profession === "fishing") {
          mainGrowth = "STR";
          subGrowth1 = "VIT";
          subGrowth2 = "INT";
        }
        break;
      case "Summoner":
        if (profession === "foraging") {
          mainGrowth = "INT";
          subGrowth1 = "WIS";
          subGrowth2 = "VIT";
        } else if (profession === "gardening") {
          mainGrowth = "WIS";
          subGrowth1 = "INT";
          subGrowth2 = "VIT";
        } else if (profession === "mining") {
          mainGrowth = "INT";
          subGrowth1 = "WIS";
          subGrowth2 = "END";
        } else if (profession === "fishing") {
          mainGrowth = "INT";
          subGrowth1 = "WIS";
          subGrowth2 = "AGI";
        }
        break;
      case "Ninja":
        if (profession === "foraging") {
          mainGrowth = "DEX";
          subGrowth1 = "AGI";
          subGrowth2 = "INT";
        } else if (profession === "gardening") {
          mainGrowth = "AGI";
          subGrowth1 = "DEX";
          subGrowth2 = "VIT";
        } else if (profession === "mining") {
          mainGrowth = "AGI";
          subGrowth1 = "STR";
          subGrowth2 = "DEX";
        } else if (profession === "fishing") {
          mainGrowth = "AGI";
          subGrowth1 = "DEX";
          subGrowth2 = "LCK";
        }
        break;
      case "Shapeshifter":
        if (profession === "foraging") {
          mainGrowth = "DEX";
          subGrowth1 = "AGI";
          subGrowth2 = "STR";
        } else if (profession === "gardening") {
          mainGrowth = "AGI";
          subGrowth1 = "DEX";
          subGrowth2 = "VIT";
        } else if (profession === "mining") {
          mainGrowth = "STR";
          subGrowth1 = "END";
          subGrowth2 = "AGI";
        } else if (profession === "fishing") {
          mainGrowth = "AGI";
          subGrowth1 = "LCK";
          subGrowth2 = "DEX";
        }
        break;
      case "Dragoon":
        if (profession === "foraging") {
          mainGrowth = "DEX";
          subGrowth1 = "VIT";
          subGrowth2 = "STR";
        } else if (profession === "gardening") {
          mainGrowth = "VIT";
          subGrowth1 = "WIS";
          subGrowth2 = "STR";
        } else if (profession === "mining") {
          mainGrowth = "STR";
          subGrowth1 = "END";
          subGrowth2 = "DEX";
        } else if (profession === "fishing") {
          mainGrowth = "AGI";
          subGrowth1 = "LCK";
          subGrowth2 = "STR";
        }
        break;
      case "Sage":
        if (profession === "foraging") {
          mainGrowth = "INT";
          subGrowth1 = "WIS";
          subGrowth2 = "VIT";
        } else if (profession === "gardening") {
          mainGrowth = "WIS";
          subGrowth1 = "INT";
          subGrowth2 = "VIT";
        } else if (profession === "mining") {
          mainGrowth = "INT";
          subGrowth1 = "WIS";
          subGrowth2 = "END";
        } else if (profession === "fishing") {
          mainGrowth = "INT";
          subGrowth1 = "WIS";
          subGrowth2 = "AGI";
        }
        break;
      case "DreadKnight":
        if (profession === "foraging") {
          mainGrowth = "STR";
          subGrowth1 = "DEX";
          subGrowth2 = "INT";
        } else if (profession === "gardening") {
          mainGrowth = "STR";
          subGrowth1 = "VIT";
          subGrowth2 = "DEX";
        } else if (profession === "mining") {
          mainGrowth = "STR";
          subGrowth1 = "END";
          subGrowth2 = "DEX";
        } else if (profession === "fishing") {
          mainGrowth = "STR";
          subGrowth1 = "DEX";
          subGrowth2 = "AGI";
        }
        break;
    }

    return [mainGrowth, subGrowth1, subGrowth2]
  }

  levelUpable() {
    return (this.isXpFull && !this.isOnQuesting && !this.isOnSale) ? true : false;
  }

  async requireRunes() {
    const [requireShvasRuneCount, requireMokshaRuneCount, ...unknowRunes] = await meditationCircleContract.getRequiredRunes(this.level)

    return [requireShvasRuneCount, requireMokshaRuneCount];
  }
}
