const config = require("../../config");
const autils = require("~/src/services/autils");
const MeditationCircle = require('~/src/defikingdoms/contracts/meditationCircle');
const meditationCircleContract = new MeditationCircle(config.walletAddressAndPrivateKeyMappings[0]) // 在這邊只需要知道某個等級需要的符文數量，任何一個地址皆可以使用
const recoveryOneStaminaRequireSeconds = 1200;
module.exports = class Hero {
  constructor(heroInfo) {
    this.id = heroInfo.id;
    this.owner = heroInfo.owner.owner;
    this.rarity = heroInfo.rarity;
    this.summonsRemaining = heroInfo.summonsRemaining;
    this.profession = this.formatProfession(heroInfo.profession);
    this.mainClass = this.formatClass(heroInfo.mainClass);
    this.subClass = this.formatClass(heroInfo.subClass);
    this.generation = heroInfo.generation;
    this.level = heroInfo.level;
    this.passive1 = this.formatSkill(heroInfo.passive1);
    this.passive2 = this.formatSkill(heroInfo.passive2);
    this.active1 = this.formatSkill(heroInfo.active1);
    this.active2 = this.formatSkill(heroInfo.active2);
    this.statboost1 = this.formatStat(heroInfo.statBoost1);
    this.statboost2 = this.formatStat(heroInfo.statBoost2);
    this.hairStyle = heroInfo.hairStyle;
    this.background = this.formatBackground(heroInfo.background);
    this.backAppendage = heroInfo.backAppendage;
    this.maxSummons = heroInfo.maxSummons;
    this.network = heroInfo.network;
    this.strength = heroInfo.strength;
    this.intelligence = heroInfo.intelligence;
    this.wisdom = heroInfo.wisdom;
    this.luck = heroInfo.luck;
    this.agility = heroInfo.agility;
    this.vitality = heroInfo.vitality;
    this.endurance = heroInfo.endurance;
    this.dexterity = heroInfo.dexterity;
    this.nextSummonTime = heroInfo.nextSummonTime; 
    this.totalPoint = this.strength + this.intelligence + this.wisdom + this.luck + this.agility + this.vitality + this.endurance + this.dexterity;
    this.stamina = heroInfo.stamina;
    this.staminaFullAt = heroInfo.staminaFullAt;
    this.xp = heroInfo.xp;
    this.maxXp = this.maxXp();
    this.isXpFull = this.xp >= this.maxXp;
    this.isOnQuesting = heroInfo.currentQuest !== autils.get0xAddress();
    this.isOnSale = heroInfo.saleAuction !== null ? true : false;
    this.isOnRent = heroInfo.assistingAuction !== null ? true : false;
    this.salePrice = heroInfo.saleAuction ? BigInt(heroInfo.saleAuction.startingPrice) / BigInt(10 ** 18) : 0;
    this.rentPrice = heroInfo.assistingAuction ? BigInt(heroInfo.assistingAuction.startingPrice) / BigInt(10 ** 18) : 0;
  }

  isOwning() {
    return config.walletAddressAndPrivateKeyMappings.map(accountInfo => accountInfo.walletAddress).indexOf(this.owner) > -1 ? true : false
  }

  isAvailableQuest() {
    return (this.isOwning() && !this.isOnQuesting && !this.isOnSale) ? true : false;
  }

  formatClass(classInt) {
    let returnValue;

    switch(parseInt(classInt)) {
      case 0:
        returnValue = "Warrior"
        break;
      case 1:
        returnValue = "Knight"
        break;
      case 2:
        returnValue = "Thief"
        break;
      case 3:
        returnValue = "Archer"
        break;
      case 4:
        returnValue = "Priest"
        break;
      case 5:
        returnValue = "Wizard"
        break;
      case 6:
        returnValue = "Monk"
        break;
      case 7:
        returnValue = "Pirate"
        break;
      case 8:
        returnValue = "Berserker"
        break;
      case 9:
        returnValue = "Seer"
        break;
      case 10:
        returnValue = "Legionnaire"
        break;
      case 11:
        returnValue = "Scholar"
        break;
      case 16:
        returnValue = "Paladin"
        break;
      case 17:
        returnValue = "DarkKnight"
        break;
      case 18:
        returnValue = "Summoner"
        break;
      case 19:
        returnValue = "Ninja"
        break;
      case 20:
        returnValue = "Shapeshifter"
        break;
      case 21:
        returnValue = "Bard"
        break;
      case 24:
        returnValue = "Dragoon"
        break;
      case 25:
        returnValue = "Sage"
        break;
      case 26:
        returnValue = "SpellBow"
        break;
      case 28:
        returnValue = "DreadKnight"
        break;
    }

    return returnValue;
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

  formatProfession(professionInt) {
    let returnValue;

    switch(parseInt(professionInt)) {
      case 0:
        returnValue = "mining"
        break;
      case 2:
        returnValue = "gardening"
        break;
      case 4:
        returnValue = "fishing"
        break;
      case 6:
        returnValue = "foraging"
        break;
    }

    return returnValue;
  }

  formatBackground(backGroundStringInt) {
    let returnValue;

    switch(parseInt(backGroundStringInt)) {
      case 0:
        returnValue = "desert"
        break;
      case 2:
        returnValue = "forest"
        break;
      case 4:
        returnValue = "plains"
        break;
      case 6:
        returnValue = "island"
        break;
      case 8:
        returnValue = "swamp"
        break;
      case 10:
        returnValue = "mountains"
        break;
      case 12:
        returnValue = "city"
        break;
      case 14:
        returnValue = "arctic"
        break;
    }

    return returnValue;
  }

  formatStat(statInt) {
    let returnValue;

    switch(parseInt(statInt)) {
      case 0:
        returnValue = "STR"
        break;
      case 2:
        returnValue = "AGI"
        break;
      case 4:
        returnValue = "INT"
        break;
      case 6:
        returnValue = "WIS"
        break;
      case 8:
        returnValue = "LCK"
        break;
      case 10:
        returnValue = "VIT"
        break;
      case 12:
        returnValue = "END"
        break;
      case 14:
        returnValue = "DEX"
        break;
    }

    return returnValue;
  }

  formatSkill(skillInt) {
    let returnValue;

    switch(parseInt(skillInt)) {
      case 0:
        returnValue = "Basic1"
        break;
      case 1:
        returnValue = "Basic2"
        break;
      case 2:
        returnValue = "Basic3"
        break;
      case 3:
        returnValue = "Basic4"
        break;
      case 4:
        returnValue = "Basic5"
        break;
      case 5:
        returnValue = "Basic6"
        break;
      case 6:
        returnValue = "Basic7"
        break;
      case 7:
        returnValue = "Basic8"
        break;
      case 16:
        returnValue = "Advanced1"
        break;
      case 17:
        returnValue = "Advanced2"
        break;
      case 18:
        returnValue = "Advanced3"
        break;
      case 19:
        returnValue = "Advanced4"
        break;
      case 24:
        returnValue = "Elite1"
        break;
      case 25:
        returnValue = "Elite2"
        break;
      case 28:
        returnValue = "Exalted1"
        break;
    }

    return returnValue;
  }

  attributeTier(attributeName) {
    const skillList = ["passive1", "passive2", "active1", "active2"]
    const integerList = ["backAppendage", "hairStyle"]
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
      if (["Archer", "Berserker", "Knight", "Monk", "Pirate", "Priest", "Seer", "Thief", "Warrior", "Wizard", "Scholar", "Legionnaire"].includes(attribute)) {
        return "Basic"
      } else if (["DarkKnight", "Paladin", "Ninja", "Summoner", "Shapeshifter", "Bard"].includes(attribute)) {
        return "Advanced"
      } else if (["Dragoon", "Sage", "SpellBow"].includes(attribute)) {
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
      case "Scholar":
        return profession === "foraging" ? true : false;
      case "Legionnaire":
        return profession === "mining" ? true : false;
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
      case "Bard":
        return profession === "fishing" ? true : false;
      case "Dragoon":
        return profession === "mining" ? true : false;
      case "Sage":
        return profession === "foraging" || profession === "gardening" ? true : false;
      case "SpellBow":
        return profession === "foraging" ? true : false;
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
      case "Scholar":
        return profession === "fishing" ? true : false;
      case "Legionnaire":
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
        return profession === "foraging" ? true : false;
      case "Bard":
        return profession === "foraging" ? true : false;
      case "Dragoon":
        return profession === "mining" ? true : false;
      case "Sage":
        return profession === "mining" ? true : false;
      case "SpellBow":
        return false;
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
        subGrowth1 = "VIT";

        if (profession === "mining") {
          subGrowth2 = "END";
        } else if (profession === "foraging") {
          subGrowth2 = "DEX";
        } else if (profession === "fishing") {
          subGrowth2 = "AGI";
        } else if (profession === "gardening") {
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
      case "Scholar":
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
      case "Legionnaire":
        mainGrowth = "STR";
        subGrowth1 = "VIT";

        if (profession === "mining" || profession === "fishing" || profession === "gardening") {
          subGrowth2 = "END";
        } else if (profession === "foraging") {
          subGrowth2 = "DEX";
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
          subGrowth2 = "AGI";
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
      case "Bard":
        if (profession === "foraging") {
          mainGrowth = "DEX";
          subGrowth1 = "AGI";
          subGrowth2 = "INT";
        } else if (profession === "gardening") {
          mainGrowth = "DEX";
          subGrowth1 = "AGI";
          subGrowth2 = "LCK";
        } else if (profession === "mining") {
          mainGrowth = "STR";
          subGrowth1 = "DEX";
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
          subGrowth2 = "AGI";
        } else if (profession === "fishing") {
          mainGrowth = "INT";
          subGrowth1 = "WIS";
          subGrowth2 = "AGI";
        }
        break;
      case "SpellBow":
        if (profession === "foraging") {
          mainGrowth = "DEX";
          subGrowth1 = "INT";
          subGrowth2 = "AGI";
        } else if (profession === "gardening") {
          mainGrowth = "DEX";
          subGrowth1 = "INT";
          subGrowth2 = "VIT";
        } else if (profession === "mining") {
          mainGrowth = "DEX";
          subGrowth1 = "INT";
          subGrowth2 = "AGI";
        } else if (profession === "fishing") {
          mainGrowth = "DEX";
          subGrowth1 = "INT";
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

  summonable() {
    return this.nextSummonTime.valueOf() <= Math.floor(new Date().getTime() / 1000) && this.summonsRemaining > 0 ? true : false;
  }

  rentable() {
    return this.summonable() && !this.isOnSale && !this.isOnRent ? true : false;
  }

  currentStamina() {
    return this.staminaFullAt === 0 || this.staminaFullAt.valueOf() <= Math.floor(new Date().getTime() / 1000) ? this.stamina : this.stamina - Math.ceil((this.staminaFullAt.valueOf() - Math.floor(new Date().getTime() / 1000)) / recoveryOneStaminaRequireSeconds);
  }

  skillInfos() {
    let skillsInfo = {
      skillTiers: [
        this.attributeTier("active1"),
        this.attributeTier("active2"),
        this.attributeTier("passive1"),
        this.attributeTier("passive2")
      ],
      skillsString: this.active1[0] + this.active1[this.active1.length - 1] + "/" + this.active2[0] + this.active2[this.active2.length - 1] + "/"  + this.passive1[0] + this.passive1[this.passive1.length - 1] + "/" + this.passive2[0] + this.passive2[this.passive2.length - 1],
      skillCount: 0,
      skillScore: 0
    }

    skillsInfo.skillTiers.forEach((data) => {
      if (data === "Advanced") {
        skillsInfo.skillCount ++;
        skillsInfo.skillScore += 1;
      } else if (data === "Elite") {
        skillsInfo.skillCount ++;
        skillsInfo.skillScore += 2;
      } else if (data === "Transcendant") {
        skillsInfo.skillCount ++;
        skillsInfo.skillScore += 3;
      }
    })

    return skillsInfo
  }

  sortedStat() {
    const heroStat = {
      STR: this.strength,
      INT: this.intelligence,
      WIS: this.wisdom,
      LCK: this.luck,
      AGI: this.agility,
      VIT: this.vitality,
      END: this.endurance,
      DEX: this.dexterity,
    }

    const sortedStat = Object.fromEntries(Object.entries(heroStat).sort(([,a],[,b]) => b - a))

    return sortedStat
  }

  duelPickScore(duelers, bounsClass) {
    const averageLevelGrowthPoint = 2
    let statPower = this.totalPoint - ((this.level - 1) * averageLevelGrowthPoint)

    if (bounsClass.bounsMainclasses.indexOf(this.mainClass) > -1) {
      statPower += 30
    }

    if (bounsClass.bounsSubclasses.indexOf(this.subClass) > -1) {
      statPower += 15
    }

    for (let i = 0; i < duelers.length; i++) {
      if (duelers[i].background === this.background) {
        statPower += 5
      }

      if (Object.keys(duelers[i].sortedStat())[0] === Object.keys(this.sortedStat())[0]) {
        statPower += 3
      }
    }

    return statPower
  }

  async requireRunes() {
    const [requireShvasRuneCount, requireMokshaRuneCount, ...unknowRunes] = await meditationCircleContract.getRequiredRunes(this.level)

    return [requireShvasRuneCount, requireMokshaRuneCount];
  }
}
