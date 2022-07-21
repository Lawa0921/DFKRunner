const config = require("~/config.js");
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
    this.isOnSale = heroInfo.saleAuction !== null ? true : false;
    this.isOnRent = heroInfo.assistingAuction !== null ? true : false;
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

}
