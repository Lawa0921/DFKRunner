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
                "225816", "244783", "270247", "267834", "265263",
                "143228", "207779", "194486", "221301", "225412", "219723",
                "211172", "238435", "245862", "270338", "264762",
                "248625", "249397", "251427", "259201", "266063",
                "252703", "254829", "254994", "265329", "266766", "269842",
                "256447", "259744", "260951", "252166", "260505", "158263",
                "255178", "263119", "262570",
                "264299", "260921", "261253", "265760", "269405"
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
                "220169", "231332", "238302", "236356", "240867", "272347",
                "196869", "194654", "30166", "270676",
                "188623", "206915", "197273", "197275", "270806", "259286",
                "196393", "239243", "169406", "256275", "270549",
                "246258", "225740", "222254", "235049", "270992",
                "248456", "250156", "247906", "252753",
                "243985", "255801", "255175",
                "255996", "246344", "260383",
                "256251", "248600", "259015", "224008", "259371", "258855",
                "255690", "259528", "266919", "267179", "268896", "266997",
                "228728", "261618", "264147", "264398", "266866", "230218",
                "270517", "269212", "271251", "266603"
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
                {"heroID": "263210", "gardenID": "2"},
                {"heroID": "191055", "gardenID": "2"},
                {"heroID": "266105", "gardenID": "2"},
                {"heroID": "246966", "gardenID": "3"},
                {"heroID": "260126", "gardenID": "3"},
                {"heroID": "270678", "gardenID": "3"},
                {"heroID": "239289", "gardenID": "4"},
                {"heroID": "261427", "gardenID": "4"}, 
                {"heroID": "266832", "gardenID": "4"},
                {"heroID": "261436", "gardenID": "5"},
                {"heroID": "261986", "gardenID": "5"},
                {"heroID": "264337", "gardenID": "5"},
                {"heroID": "257441", "gardenID": "6"},
                {"heroID": "264384", "gardenID": "6"},
                {"heroID": "271009", "gardenID": "6"},
                {"heroID": "258170", "gardenID": "7"},
                {"heroID": "265731", "gardenID": "7"},
                {"heroID": "267838", "gardenID": "7"},
                {"heroID": "253919", "gardenID": "8"},
                {"heroID": "258492", "gardenID": "8"},
                {"heroID": "266794", "gardenID": "8"},
                {"heroID": "213334", "gardenID": "9"},
                {"heroID": "244697", "gardenID": "9"},
                {"heroID": "247427", "gardenID": "9"},
                {"heroID": "266117", "gardenID": "10"},
                {"heroID": "261081", "gardenID": "10"},
                {"heroID": "258253", "gardenID": "10"},
                {"heroID": "123617", "gardenID": "11"},
                {"heroID": "249395", "gardenID": "11"},
                {"heroID": "266619", "gardenID": "11"},
                {"heroID": "257824", "gardenID": "12"},
                {"heroID": "268898", "gardenID": "12"},
                {"heroID": "272143", "gardenID": "12"},
                {"heroID": "251720", "gardenID": "13"},
                {"heroID": "258507", "gardenID": "13"},
                {"heroID": "246617", "gardenID": "13"},
                {"heroID": "25442", "gardenID": "14"},
                {"heroID": "255482", "gardenID": "14"},
                {"heroID": "266830", "gardenID": "14"},
                {"heroID": "227895", "gardenID": "15"},
                {"heroID": "259343", "gardenID": "15"},
                {"heroID": "240393", "gardenID": "15"},
                {"heroID": "210943", "gardenID": "16"},
                {"heroID": "265142", "gardenID": "16"},
                {"heroID": "267112", "gardenID": "16"},
                {"heroID": "262381", "gardenID": "17"},
                {"heroID": "261087", "gardenID": "17"},
                {"heroID": "268320", "gardenID": "17"},
                {"heroID": "97669", "gardenID": "18"},
                {"heroID": "250383", "gardenID": "18"},
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
            "233167", "260433", "165274", "258421", "96964", "263160",
            "271084", "266227", "261117", "270480", "272401", "273242"
        ],
        "normMinStam": 25,
        "contractAddress": "one17c908geth98rjhshcu9td9wedrehh5hympjq6z"
    },
    {
        "name": "StatQuest_Dex",
        "heroes": [],
        "normMinStam": 25,
        "contractAddress": "one1uqlafchkggd3y5ffwfqvu5jg2zxfzp8dnqra8p"
    },
    {
        "name": "StatQuest_Agi",
        "heroes": [
            "5207", "159753", "232647", "241915", "262984", "263406",
            "268852", "272421"
        ],
        "normMinStam": 25,
        "contractAddress": "one1lgstyxyj0v840gypje6rfzx8c7g22cjm9eyzqt"
    },
    {
        "name": "StatQuest_Vit",
        "heroes": [
            "238885"
        ],
        "normMinStam": 25,
        "contractAddress": "one1y96thma7l0tkvvn2036n37f60rdna4zfslzqnn"
    },
    {
        "name": "StatQuest_End",
        "heroes": [
            "235300", "230478"
        ],
        "normMinStam": 25,
        "contractAddress": "one1edv55fxcqtxlv5qq4pxuqpvamcgun52lmzylq0"
    },
    {
        "name": "StatQuest_Int",
        "heroes": [
            "250199", "165529", "265856", "266926", "267311", "269326",
            "248505", "272084", "272783"
        ],
        "normMinStam": 25,
        "contractAddress": "one1v9mwahs6ayf86kfxduvh44vcv5lylryjm2n8xh"
    },
    {
        "name": "StatQuest_Wis",
        "heroes": [
            "165533", "171763", "229790", "264416", "261201", "265843",
            "267606", "271465", "271802"
        ],
        "normMinStam": 25,
        "contractAddress": "one1x3cfw3205xf35n5qmn0tkv0jnlp4tj7wgxkz8r"
    },
    {
        "name": "StatQuest_Luk",
        "heroes": [
            "248921", "1565", "269082"
        ],
        "normMinStam": 25,
        "contractAddress": "one1z0n5unnysp08lk3crjd778nhe5tqsmjktctwgy"
    }],
    "heroForSale": [
        { "id": "1565", "price": 22500, "notes": "L2 R G0 thief"},
        { "id":"123617", "price": 350, "notes": "L6 UC 4/5 knight PJ" },
        { "id": "97669", "price": 350, "notes": "L6 UC 6/8 knight PJ" },
        { "id": "257824", "price": 55 },
        { "id": "258170", "price": 55 },
        { "id": "263190", "price": 100 },
        { "id": "263210", "price": 120 },
        { "id": "256790", "price": 99 },
        { "id": "165274", "price": 200 },
        { "id": "255482", "price": 55 },
        { "id": "265856", "price": 55 },
        { "id": "266794", "price": 65 },
        { "id": "266830", "price": 65 },
        { "id": "266832", "price": 125 },
        { "id": "267838", "price": 65 },
        { "id": "240393", "price": 65 },
        { "id": "268852", "price": 69 },
        { "id": "268898", "price": 55 },
        { "id": "269082", "price": 75 },
        { "id": "267311", "price": 55 },
        { "id": "269326", "price": 60 },
        { "id": "263160", "price": 59 },
        { "id": "261986", "price": 52 },
        { "id": "261427", "price": 55 },
        { "id": "270678", "price": 345 },
        { "id": "261253", "price": 75 },
        { "id": "260951", "price": 60 },
        { "id": "262984", "price": 65 },
        { "id": "250199", "price": 65 },
        { "id": "270992", "price": 65 },
        { "id": "271251", "price": 499 },
        { "id": "261117", "price": 55 },
        { "id": "270480", "price": 85 },
        { "id": "263406", "price": 55 },
        { "id": "267112", "price": 55 },
        { "id": "261087", "price": 59 },
        { "id": "248505", "price": 125 },
        { "id": "272401", "price": 55 },
        { "id": "260951", "price": 59 },
        { "id": "247906", "price": 80 },
        { "id": "268320", "price": 55 },
        { "id": "261201", "price": 55 },
        { "id": "272421", "price": 55 },
        { "id": "272783", "price": 59 },
        { "id": "273242", "price": 650 }
    ],
    "useStaminaVialHeroIds": [
        "240170"
    ],
    "questCoreV1": "0x5100Bd31b822371108A0f63DCFb6594b9919Eaf4",
    "questCoreV2": "0xAa9a289ce0565E4D6548e63a441e7C084E6B52F6",
    "heroCore": "0x5f753dcdf9b1ad9aabc1346614d1f4746fd6ce5c",
    "saleAuction": "0x13a65B9F8039E2c032Bc022171Dc05B30c3f2892",
    "heroBridge": "0x573e407Be90a50EAbA28748cbb62Ff9d6038A3e9",
    "meditationCircle": "0x0594D86b2923076a2316EaEA4E1Ca286dAA142C1",
    "shvasRune": "0x66F5BfD910cd83d3766c4B39d13730C911b2D286",
    "mokshaRune": "0x8F655142104478724bbC72664042EA09EBbF7B38",
    "uniswapV2Factory": "0x9014B937069918bd319f80e8B3BB4A2cf6FAA5F7",
    "uniswapV2Router02": "0x24ad62502d1C652Cc7684081169D04896aC20f30",
    "staminaVial": "0x959ba19508827d1ed2333B1b503Bd5ab006C710e",
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
    "bidGasPrice": 200100000000,
    "gasPrice": 110000000000,
    "gasLimit":  3000000,
    "unconditionalPurchasePrice": 35,
    "g0ConditionsOfPurchase": 5000,
  },
  "defikingdoms": {
    "quest": {
        "fishing": {
            "professionHeroes": [
                "206487", "200501", "198747", "244669", "215972", "247349",
                "219722", "272408", "265852"
            ],
            "nonProfessionHeroes": [],
            "proMinStam": 25,
            "normMinStam": 21,
            "contractAddress": "0x407ab39B3675f29A719476af6eb3B9E5d93969E6"
        },
        "foraging": {
            "professionHeroes": [
                "197335", "200659", "195274", "34321", "258169", "189485",
                "200149", "253628", "251244", "256980", "256603", "243095",
                "258171", "231170", "246917", "247641", "1000000001103"
            ],
            "nonProfessionHeroes": [],
            "proMinStam": 25,
            "normMinStam": 21,
            "contractAddress": "0xAd51199B453075C73FA106aFcAAD59f705EF7872"
        }
    },
    "heroForSale": [
        { "id": "206487", "price": 55 },
        { "id": "197335", "price": 60 },
        { "id": "34321", "price": 90 },
        { "id": "256603", "price": 75 },
        { "id": "258169", "price": 60 },
        { "id": "198747", "price": 52 },
        { "id": "256980", "price": 52 },
        { "id": "195274", "price": 55 },
        { "id": "251244", "price": 55 },
        { "id": "253628", "price": 55 },
        { "id": "200149", "price": 70 },
        { "id": "219722", "price": 75 },
        { "id": "200501", "price": 65 },
        { "id": "200659", "price": 60 },
        { "id": "189485", "price": 65 },
        { "id": "215972", "price": 65 },
        { "id": "244669", "price": 75 },
        { "id": "272408", "price": 70 },
        { "id": "265852", "price": 70 },
        { "id": "258171", "price": 80 },
        { "id": "1000000001103", "price": 75 },
        { "id": "243095", "price": 80 },
        { "id": "247349", "price": 75 },
        { "id": "231170", "price": 80 },
        { "id": "247641", "price": 70 },
        { "id": "246917", "price": 80 }
    ],
    "listStamina": 24,
    "unlistStamina": 24,
    "useRpcIndex": 0,
    "rpcs": [
      "https://subnets.avax.network/defi-kingdoms/dfk-chain/rpc",
      "https://avax-dfk.gateway.pokt.network/v1/lb/6244818c00b9f0003ad1b619/ext/bc/q2aTwKuyzgs8pynF7UXBZCU7DejbZbZ6EUyHr3JQzYgwNPUPi/rpc"
    ],
    "questCoreV2": "0xE9AbfBC143d7cef74b5b793ec5907fa62ca53154",
    "heroCore": "0xEb9B61B145D6489Be575D3603F4a704810e143dF",
    "saleAuction": "0xc390fAA4C7f66E4D62E59C231D5beD32Ff77BEf0",
    "meditationCircle": "0xD507b6b299d9FC835a0Df92f718920D13fA49B47",
    "shvasRune": "0x75E8D8676d774C9429FbB148b30E304b5542aC3d",
    "mokshaRune": "0xCd2192521BD8e33559b0CA24f3260fE6A26C28e4",
    "heroBridge": "0x739B1666c2956f601f095298132773074c3E184b",
    "uniswapV2Factory": "0x794C07912474351b3134E6D6B3B7b3b4A07cbAAa",
    "uniswapV2Router02": "0x3C351E1afdd1b1BC44e931E12D4E05D6125eaeCa",
    "staminaVial": "0x242078edFDca25ef2A497C8D9f256Fd641472E5F",
  },
  "queryHeroEndPoint": "https://us-central1-defi-kingdoms-api.cloudfunctions.net/query_heroes",
  "graphqlEndPoint": "https://defi-kingdoms-community-api-gateway-co06z8vi.uc.gateway.dev/graphql"
}

module.exports = config;
