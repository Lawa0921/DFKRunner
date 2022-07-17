require('dotenv').config();

const config = {
  "privateKey": process.env.PRIVATE_KEY,
  "walletAddress": process.env.WALLET_ADDRESS,
  "harmony": {
    "listStamina": 24,
    "unlistStamina": 24,
    "quests": [
        {
            "name": "Fishing",
            "professionHeroes": [
                "200501", "215972", "225816", "244783", "244669", "198747",
                "143228", "207779", "194486", "221301", "225412", "219723",
                "206487", "211172", "219722", "238435", "245862",
                "247349", "248625", "249397", "251427", "259201", "266063",
                "252703", "254829", "254994", "265329",
                "256447", "259744", "260951", "252166", "260505", "158263",
                "255178", "160537", "217824", "263119", "262570", "262471",
                "264299", "260921", "261253", "265760", "265852",
                "206540"
            ],
            "nonProfessionHeroes": [],
            "holding": [],
            "proMinStam": 25,
            "normMinStam": 21,
            "contractAddress": "one14hla9gj4kdujsuafs6y4cccjara6elyt0076c8"
        },
        {
            "name": "Foraging",
            "professionHeroes": [
                "220169", "200659", "231332", "189485", "238302", "236356",
                "231170", "243095", "196869", "230777", "194654", "30166",
                "195274", "197335", "188623", "206915", "197273", "197275",
                "200149", "196393", "239243", "34321", "169406", "256275",
                "246258", "235887", "225740", "222254", "235049", "256603",
                "248456", "247641", "250156", "251244", "247906", "252753",
                "253628", "246917", "243985", "1000000001103", "255801", "255175",
                "255996", "246344", "256980", "258169", "258171", "260383",
                "256251", "248600", "259015", "224008", "259371", "258855",
                "255690", "259528", "266919", "267179", "267909",
                "228728", "261618", "264147", "264398", "266866", "268298"
            ],
            "nonProfessionHeroes": [],
            "holdingArea": [],
            "proMinStam": 25,
            "normMinStam": 21,
            "contractAddress": "one1k3jlgkgqjhdd2rlwdmst03nsptptqn0cl226mx"
        },
        {
            "name": "WishingWell",
            "professionHeroes": [],
            "nonProfessionHeroes": [],
            "contractAddress": "0x0548214A0760a897aF53656F4b69DbAD688D8f29"
        },
        {
            "name": "GoldMining",
            "professionHeroes": [],
            "nonProfessionHeroes": [],
            "holdingArea": [],
            "proMinStam": 25,
            "normMinStam": 25,
            "contractAddress": "0x569e6a4c2e3af31b337be00657b4c040c828dd73"
        },
        {
            "name": "JewelMining",
            "professionHeroes": [],
            "nonProfessionHeroes": [],
            "proMinStam": 25,
            "normMinStam": 25,
            "contractAddress": "0x6ff019415ee105acf2ac52483a33f5b43eadb8d0"
        },
        {
            "name": "Gardening",
            "professionHeroes": [
                {"heroID": "220580", "gardenID": "0"},
                {"heroID": "239450", "gardenID": "0"},
                {"heroID": "263190", "gardenID": "0"},
                {"heroID": "239288", "gardenID": "1"},
                {"heroID": "251455", "gardenID": "1"},
                {"heroID": "256790", "gardenID": "1"},
                {"heroID": "247302", "gardenID": "2"},
                {"heroID": "263210", "gardenID": "2"},
                {"heroID": "191055", "gardenID": "2"},
                {"heroID": "232951", "gardenID": "3"},
                {"heroID": "246966", "gardenID": "3"},
                {"heroID": "260126", "gardenID": "3"},
                {"heroID": "239289", "gardenID": "4"},
                {"heroID": "245528", "gardenID": "4"},
                {"heroID": "252069", "gardenID": "4"},
                {"heroID": "261436", "gardenID": "5"},
                {"heroID": "261986", "gardenID": "5"},
                {"heroID": "264337", "gardenID": "5"},
                {"heroID": "257441", "gardenID": "6"},
                {"heroID": "239531", "gardenID": "6"},
                {"heroID": "264384", "gardenID": "6"},
                {"heroID": "258170", "gardenID": "7"},
                {"heroID": "265731", "gardenID": "7"},
                {"heroID": "267838", "gardenID": "7"},
                {"heroID": "253919", "gardenID": "8"},
                {"heroID": "258492", "gardenID": "8"},
                {"heroID": "266794", "gardenID": "8"},
                {"heroID": "244697", "gardenID": "9"},
                {"heroID": "247427", "gardenID": "9"},
                {"heroID": "221782", "gardenID": "9"},
                {"heroID": "247709", "gardenID": "10"},
                {"heroID": "266117", "gardenID": "10"},
                {"heroID": "261081", "gardenID": "10"},
                {"heroID": "123617", "gardenID": "11"},
                {"heroID": "249395", "gardenID": "11"},
                {"heroID": "266619", "gardenID": "11"},
                {"heroID": "257824", "gardenID": "12"},
                {"heroID": "264524", "gardenID": "12"},
                {"heroID": "268125", "gardenID": "12"},
                {"heroID": "251720", "gardenID": "13"},
                {"heroID": "258507", "gardenID": "13"},
                {"heroID": "246617", "gardenID": "13"},
                {"heroID": "25442", "gardenID": "14"},
                {"heroID": "255482", "gardenID": "14" },
                {"heroID": "266830", "gardenID": "14"},
                {"heroID": "227895", "gardenID": "15"},
                {"heroID": "259343", "gardenID": "15"},
                {"heroID": "240393", "gardenID": "15"},
                {"heroID": "210943", "gardenID": "16"},
                {"heroID": "265142", "gardenID": "16"},
                {"heroID": "267112", "gardenID": "16"},
                {"heroID": "262381", "gardenID": "17"},
                {"heroID": "255010", "gardenID": "17"},
                {"heroID": "267161", "gardenID": "17"},
                {"heroID": "97669", "gardenID": "18"},
                {"heroID": "250383", "gardenID": "18"},
                {"heroID": "266832", "gardenID": "18"},
                {"heroID": "244936", "gardenID": "18"}
            ],
            "nonProfessionHeroes": [],
            "proMinStam": 25,
            "normMinStam": 25,
            "poolID": 1,
            "holdingArea": [],
            "contractAddress": "0xe4154b6e5d240507f9699c730a496790a722df19"
        }        
    ],
    "statQuests": [
    {
        "name": "StatQuest_Str",
        "heroes": [
            "233167", "69246", "260433", "165274", "258421", "96964"
        ],
        "normMinStam": 25
    },
    {
        "name": "StatQuest_Dex",
        "heroes": [
            "177216"
        ],
        "normMinStam": 25
    },
    {
        "name": "StatQuest_Agi",
        "heroes": [
            "5207", "159753", "232647", "241915", "262984", "263406"
        ],
        "normMinStam": 25
    },
    {
        "name": "StatQuest_Vit",
        "heroes": [
            "238885"
        ],
        "normMinStam": 25
    },
    {
        "name": "StatQuest_End",
        "heroes": [
            "235300", "230478", "260519"
        ],
        "normMinStam": 25
    },
    {
        "name": "StatQuest_Int",
        "heroes": [
            "250199", "165529", "265856", "266926"
        ],
        "normMinStam": 25
    },
    {
        "name": "StatQuest_Wis",
        "heroes": [
            "165533", "171763", "229790", "264416", "261201"
        ],
        "normMinStam": 25
    },
    {
        "name": "StatQuest_Luk",
        "heroes": [
            "248921", "1565"
        ],
        "normMinStam": 25
    }],
    "heroForSale": [
        { "id": "1565", "price": 22500, "notes": "L2 R G0 thief"},
        { "id":"123617", "price": 350, "notes": "L6 UC 4/5 knight PJ" },
        { "id": "97669", "price": 350, "notes": "L6 UC 6/8 knight PJ" },
        { "id": "257824", "price": 55 },
        { "id": "245528", "price": 59 },
        { "id": "258170", "price": 55 },
        { "id": "263190", "price": 100 },
        { "id": "263210", "price": 120 },
        { "id": "262471", "price": 1800 },
        { "id": "256790", "price": 99 },
        { "id": "165274", "price": 200 },
        { "id": "252069", "price": 69 },
        { "id": "255482", "price": 55 },
        { "id": "239531", "price": 65 },
        { "id": "265856", "price": 55 },
        { "id": "255010", "price": 65 },
        { "id": "264524", "price": 65 },
        { "id": "266794", "price": 65 },
        { "id": "266830", "price": 65 },
        { "id": "267161", "price": 129 },
        { "id": "230777", "price": 55 },
        { "id": "221782", "price": 69 },
        { "id": "266832", "price": 125 },
        { "id": "267838", "price": 65 },
        { "id": "267909", "price": 65 },
        { "id": "232951", "price": 60 },
        { "id": "268125", "price": 55 },
        { "id": "268298", "price": 55 },
        { "id": "240393", "price": 65 }
    ],
    "questCoreV1": "0x5100Bd31b822371108A0f63DCFb6594b9919Eaf4",
    "questCoreV2": "0xAa9a289ce0565E4D6548e63a441e7C084E6B52F6",
    "heroCore": "0x5f753dcdf9b1ad9aabc1346614d1f4746fd6ce5c",
    "saleAuction": "0x13a65B9F8039E2c032Bc022171Dc05B30c3f2892",
    "useRpcIndex": 1,
    "rpcs": [
        "https://nd-918-448-543.p2pify.com/4b353b2b9c548ca58a7e6e01ce3bba7a",
        "https://harmony-mainnet.chainstacklabs.com",
        "https://api.harmony.one",
        "https://harmony-0-rpc.gateway.pokt.network",
        "https://api.0xvalidator.one",
        "https://rpc.hermesdefi.io",
        "https://api.fuzz.fi",
        "https://api.s0.t.hmny.io",
        "https://a.api.s0.t.hmny.io",
        "https://rpc.foxswap.fi",
        "https://iad.api.harmony.one",
        "https://rpc.heavenswail.one",
        "https://rpc.cosmicuniverse.one",
        "https://rpc.onechain.services"
    ],
    "webSocketsRpcs": [
        "wss://ws-nd-918-448-543.p2pify.com/4b353b2b9c548ca58a7e6e01ce3bba7a",
        "wss://ws-harmony-mainnet.chainstacklabs.com/",
        "wss://ws.s0.t.hmny.io/"
    ],
    "gasPrice": 110000000000,
    "bidGasPrice": 200100000000,
    "gasLimit":  3000000,
    "unconditionalPurchasePrice": 35,
    "g0ConditionsOfPurchase": 5000,
  },
  "defikingdoms": {},
  "queryHeroEndPoint": "https://us-central1-defi-kingdoms-api.cloudfunctions.net/query_heroes",
  "graphqlEndPoint": "https://defi-kingdoms-community-api-gateway-co06z8vi.uc.gateway.dev/graphql"
}

module.exports = config;
