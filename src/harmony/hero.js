/*
{
  id: '247324',
  numberid: '247324',
  owner: '0x1302ff8f40277e7BdB766B6D36327180e6948eB8',
  creator: null,
  statgenes: '11222292080675751914747562226392191872943230313515548406775933065758982',
  visualgenes: '167426752098240479573916285536274993978187077690526212447991219735363686',
  rarity: 0,
  shiny: false,
  generation: 4,
  firstname: 740,
  lastname: 247,
  shinystyle: 10,
  mainclass: '4',
  subclass: '3',
  summonedtime: '1656215799',
  nextsummontime: '1656302199',
  summonerid: '246180',
  assistantid: '246086',
  summons: 0,
  maxsummons: 3,
  staminafullat: '1656298829',
  hpfullat: '0',
  mpfullat: '0',
  level: 1,
  xp: '215',
  currentquest: '0x0000000000000000000000000000000000000000',
  sp: 0,
  status: '0',
  strength: 5,
  intelligence: 10,
  wisdom: 13,
  luck: 7,
  agility: 6,
  vitality: 6,
  endurance: 9,
  dexterity: 6,
  hp: 110,
  mp: 65,
  stamina: 25,
  strengthgrowthp: 3200,
  intelligencegrowthp: 7000,
  wisdomgrowthp: 8000,
  luckgrowthp: 4000,
  agilitygrowthp: 4000,
  vitalitygrowthp: 5000,
  endurancegrowthp: 6000,
  dexteritygrowthp: 3000,
  strengthgrowths: 1775,
  intelligencegrowths: 1000,
  wisdomgrowths: 625,
  luckgrowths: 1000,
  agilitygrowths: 1250,
  vitalitygrowths: 1250,
  endurancegrowths: 1500,
  dexteritygrowths: 2000,
  hpsmgrowth: 3500,
  hprggrowth: 4000,
  hplggrowth: 2500,
  mpsmgrowth: 1500,
  mprggrowth: 3500,
  mplggrowth: 5000,
  mining: 0,
  gardening: 4,
  foraging: 0,
  fishing: 0,
  profession: 'gardening',
  passive1: 'Basic3',
  passive2: 'Basic2',
  active1: 'Basic1',
  active2: 'Basic2',
  statboost1: 'END',
  statboost2: 'STR',
  statsunknown1: '0',
  element: 'lightning',
  statsunknown2: '6',
  gender: 'female',
  headappendage: '7',
  backappendage: '2',
  background: 'city',
  hairstyle: '1',
  haircolor: '66489e',
  visualunknown1: '6',
  eyecolor: '8d7136',
  skincolor: 'aa5c38',
  appendagecolor: '58381e',
  backappendagecolor: '830e18',
  visualunknown2: '6',
  assistingauction: null,
  assistingprice: null,
  saleauction: null,
  saleprice: null,
  privateauctionprofile: null,
  previousowner: null,
  pjstatus: null,
  pjlevel: null,
  pjowner: null,
  pjclaimstamp: null,
  network: 'hmy',
  originrealm: 'SER',
  summoner_id: '246180',
  summoner_mainclass: '16',
  summoner_rarity: 2,
  summoner_generation: 3,
  summoner_visualgenes: '167530912434184022808686110171539088721676246557323005637248030745953376',
  assistant_id: '246086',
  assistant_mainclass: '17',
  assistant_rarity: 0,
  assistant_generation: 1,
  assistant_visualgenes: '170874051235737406742106402665618211559200841713836465906853862109839494',
  owner_name: 'Masternet',
  owner_picid: null,
  owner_address: '0x1302ff8f40277e7BdB766B6D36327180e6948eB8',
  owner_nftid: '234275',
  owner_collectionid: '1',
  assistauction_startingprice: null,
  assistauction_endingprice: null,
  assistauction_duration: null,
  assistauction_startedat: null,
  saleauction_startingprice: null,
  saleauction_endingprice: null,
  saleauction_duration: null,
  saleauction_startedat: null,
  firstname_string: 'Timinca',
  lastname_string: 'Twilightflare',
  summons_remaining: 3,
  current_stamina: '23.101779450834092621553',
  xp_progress: 0.1075
}
*/
const config = require("~/config.js");
module.exports = class Hero {
  constructor(heroInfo) {
    this.id = heroInfo.id;
    this.owner = heroInfo.owner.owner;
    this.rarity = heroInfo.rarity;
    this.summons_remaining = heroInfo.summonsRemaining;
    this.profession = heroInfo.profession;
    this.mainclass = heroInfo.mainClass;
    this.subclass = heroInfo.subClass;
    this.generation = heroInfo.generation;
    this.level = heroInfo.level;
    this.passive1 = heroInfo.passive1;
    this.passive2 = heroInfo.passive2;
    this.active1 = heroInfo.active1;
    this.active2 = heroInfo.active2;
    this.statboost1 = heroInfo.statBoost1;
    this.statboost2 = heroInfo.statBoost2;
    this.hairstyle = heroInfo.hairStyle;
    this.backappendage = heroInfo.backAppendage;
    this.maxsummons = heroInfo.maxSummons;
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
    const ClassList = ["backappendage", "hairstyle", "subclass", "mainclass"]
    const skillList = ["passive1", "passive2", "active1", "active2"]
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
    } else if (ClassList.includes(attributeName)) {
      if (parseInt(attribute) <= 15) {
        return "Basic"
      } else if (parseInt(attribute) >= 16 && parseInt(attribute) <= 23) {
        return "Advanced"
      } else if (parseInt(attribute) >= 24 && parseInt(attribute) <= 27) {
        return "Elite"
      } else if (parseInt(attribute) >= 28) {
        return "Transcendant"
      }
    } else {
      return "attributes without class concept"
    }
  }

  selfProfessionMatch() {    
    const profession = this.profession;

    switch(this.mainclass) {
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

    switch(this.mainclass) {
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
