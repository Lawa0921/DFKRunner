require('dotenv').config();

const config = {
  "privateKey": process.env.PRIVATE_KEY,
  "walletAddress": process.env.WALLET_ADDRESS,
  "harmony": {
    "listStamina": 24,
    "unlistStamina": 24,
    "quest": {
        "fishing": {
            "heroes": [
                "244783", "270247", "265263", "277704", "292587",
                "240170", "17049", "263373", "277691", "284245", "287661",
                "238435", "245862", "264762", "276051", "284017",
                "248625", "266063", "272671", "274892", "278390",
                "254994", "275285", "275140", "278240", "185707", "197985",
                "256447", "158263", "275612", "278033", "277968",
                "262570", "276386", "276782", "279365", "280215",
                "264299", "260921", "269405", "275690", "271813", "272487",
                "271447", "276226", "285999", "286436", "287450",
                "286148", "287580", "288122", "291845",
                "55794", "288910", "284058", "286003", "290211", "290178",
                "286871", "290790", "285939", "292069", "290284"
            ],
            "contractAddress": "one14hla9gj4kdujsuafs6y4cccjara6elyt0076c8"
        },
        "foraging": {
            "heroes": [
                "238302", "236356", "240867", "272347", "277457", "293836",
                "196869", "30166", "270676", "273379",
                "274898", "265269", "234853", "265602", "281743", "1000000001718",
                "196393", "239243", "169406", "270549", "273072", "176671",
                "246258", "225740", "235049", "273663", "274245",
                "276198", "273818", "277774", "182721", "114122", "283431",
                "255996", "246344", "274998", "281816", "283480", "290237",
                "256251", "259371", "258855", "249208", "279895", "283873",
                "255690", "267179", "284247", "279526", "197341", "290757",
                "266866", "230218", "285832", "247930",
                "269212", "271251", "266603", "287332", "287103", "114117",
                "283946", "288177", "288436", "283539", "170651", "287552",
                "286161", "292523", "279164"
            ],
            "contractAddress": "one1k3jlgkgqjhdd2rlwdmst03nsptptqn0cl226mx"
        },
        "goldMining": {
            "professionHeroes": [],
            "nonProfessionHeroes": [],
            "proMinStam": 25,
            "normMinStam": 25,
            "contractAddress": "0x569e6a4c2e3af31b337be00657b4c040c828dd73"
        },
        "jewelMining": {
            "professionHeroes": [],
            "nonProfessionHeroes": [],
            "proMinStam": 25,
            "normMinStam": 25,
            "contractAddress": "0x6ff019415ee105acf2ac52483a33f5b43eadb8d0"
        },
        "gardening": {
            "professionHeroes": [
                {"heroID": "239450", "gardenID": "0"},
                {"heroID": "263190", "gardenID": "0"},
                {"heroID": "273720", "gardenID": "0"},
                {"heroID": "239288", "gardenID": "1"},
                {"heroID": "251455", "gardenID": "1"},
                {"heroID": "256790", "gardenID": "1"},
                {"heroID": "263210", "gardenID": "2"},
                {"heroID": "191055", "gardenID": "2"},
                {"heroID": "266105", "gardenID": "2"},
                {"heroID": "246966", "gardenID": "3"},
                {"heroID": "260126", "gardenID": "3"},
                {"heroID": "277280", "gardenID": "3"},
                {"heroID": "239289", "gardenID": "4"},
                {"heroID": "265757", "gardenID": "4"},
                {"heroID": "281328", "gardenID": "4"},
                {"heroID": "264337", "gardenID": "5"},
                {"heroID": "245326", "gardenID": "5"},
                {"heroID": "280166", "gardenID": "5"},
                {"heroID": "257441", "gardenID": "6"},
                {"heroID": "271009", "gardenID": "6"},
                {"heroID": "273451", "gardenID": "6"}, 
                {"heroID": "265731", "gardenID": "7"},
                {"heroID": "185295", "gardenID": "7"},
                {"heroID": "181573", "gardenID": "7"},
                {"heroID": "258492", "gardenID": "8"},
                {"heroID": "278642", "gardenID": "8"},
                {"heroID": "277612", "gardenID": "8"},
                {"heroID": "244697", "gardenID": "9"},
                {"heroID": "285346", "gardenID": "9"},
                {"heroID": "289841", "gardenID": "9"},
                {"heroID": "266117", "gardenID": "10"},
                {"heroID": "261081", "gardenID": "10"},
                {"heroID": "258253", "gardenID": "10"},
                {"heroID": "249395", "gardenID": "11"},
                {"heroID": "285715", "gardenID": "11"},
                {"heroID": "288479", "gardenID": "11"},
                {"heroID": "272143", "gardenID": "12"},
                {"heroID": "278572", "gardenID": "12"},
                {"heroID": "281297", "gardenID": "12"},
                {"heroID": "251720", "gardenID": "13"},
                {"heroID": "246617", "gardenID": "13"},
                {"heroID": "292187", "gardenID": "13"},
                {"heroID": "275177", "gardenID": "14"},
                {"heroID": "284626", "gardenID": "14"},
                {"heroID": "289908", "gardenID": '14'},
                {"heroID": "123617", "gardenID": "15"},
                {"heroID": "25442", "gardenID": "15"},
                {"heroID": "284717", "gardenID": "15"},
                {"heroID": "210943", "gardenID": "16"},
                {"heroID": "265142", "gardenID": "16"},
                {"heroID": "272590", "gardenID": "16"},
                {"heroID": "262381", "gardenID": "17"},
                {"heroID": "268320", "gardenID": "17"},
                {"heroID": "274368", "gardenID": "17"},
                {"heroID": "97669", "gardenID": "18"},
                {"heroID": "238988", "gardenID": "18"},
                {"heroID": "291333", "gardenID": "18"}
            ],
            "nonProfessionHeroes": [],
            "proMinStam": 25,
            "normMinStam": 25,
            "contractAddress": "0xe4154b6e5d240507f9699c730a496790a722df19"
        },
        "statQuests": [
            {
                "name": "StatQuest_Str",
                "heroes": [
                    "233167", "260433", "96964", "281563", "1565",
                    "271084", "270480", "273242", "260998", "275734", "255984",
                    "238735", "246739", "235300", "79678", "289658", "282128",
                    "290749", "280111", "291670", "290301"
                ],
                "minStam": 25,
                "contractAddress": "one17c908geth98rjhshcu9td9wedrehh5hympjq6z"
            },
            {
                "name": "StatQuest_Dex",
                "heroes": [
                    "232306", "282840"
                ],
                "minStam": 25,
                "contractAddress": "one1uqlafchkggd3y5ffwfqvu5jg2zxfzp8dnqra8p"
            },
            {
                "name": "StatQuest_Agi",
                "heroes": [
                    "159753", "232647", "286379", "284716", "282496", "281291",
                    "288259", "224608", "275885", "293448", "243727", "269798"
                ],
                "minStam": 25,
                "contractAddress": "one1lgstyxyj0v840gypje6rfzx8c7g22cjm9eyzqt"
            },
            {
                "name": "StatQuest_Vit",
                "heroes": [],
                "minStam": 25,
                "contractAddress": "one1y96thma7l0tkvvn2036n37f60rdna4zfslzqnn"
            },
            {
                "name": "StatQuest_End",
                "heroes": [],
                "minStam": 25,
                "contractAddress": "one1edv55fxcqtxlv5qq4pxuqpvamcgun52lmzylq0"
            },
            {
                "name": "StatQuest_Int",
                "heroes": [
                    "165529", "272569", "147830", "287460", "275725",
                    "272084", "274423", "165234"
                ],
                "minStam": 25,
                "contractAddress": "one1v9mwahs6ayf86kfxduvh44vcv5lylryjm2n8xh"
            },
            {
                "name": "StatQuest_Wis",
                "heroes": [
                    "165533", "171763", "265843", "283137", "283353", "290011",
                    "267606", "271465", "271802", "273845", "273716", "275599",
                    "285793"
                ],
                "minStam": 25,
                "contractAddress": "one1x3cfw3205xf35n5qmn0tkv0jnlp4tj7wgxkz8r"
            },
            {
                "name": "StatQuest_Luk",
                "heroes": [
                    "293948"
                ],
                "minStam": 25,
                "contractAddress": "one1z0n5unnysp08lk3crjd778nhe5tqsmjktctwgy"
            }
        ],
    },
    "heroForSale": [
        { "id": "1565", "price": 22500, "notes": "L2 R G0 thief"},
        { "id":"123617", "price": 350, "notes": "L6 UC 4/5 knight PJ" },
        { "id": "97669", "price": 350, "notes": "L6 UC 6/8 knight PJ" },
        { "id": "263210", "price": 120 },
        { "id": "256790", "price": 99 },
        { "id": "270480", "price": 85 },
        { "id": "268320", "price": 55 },
        { "id": "165529", "price": 150 },
        { "id": "275177", "price": 99 },
        { "id": "239288", "price": 75 },
        { "id": "265757", "price": 85 },
        { "id": "251720", "price": 75 },
        { "id": "239289", "price": 79 },
        { "id": "277612", "price": 59 },
        { "id": "281328", "price": 59 },
        { "id": "271009", "price": 69 },
        { "id": "239450", "price": 60 },
        { "id": "275599", "price": 399 },
        { "id": "273451", "price": 69 },
        { "id": "285346", "price": 65 },
        { "id": "285715", "price": 65 },
        { "id": "285832", "price": 69 },
        { "id": "284717", "price": 55 },
        { "id": "286379", "price": 59 },
        { "id": "284716", "price": 55 },
        { "id": "246966", "price": 69 },
        { "id": "287332", "price": 75 },
        { "id": "269212", "price": 69 },
        { "id": "249395", "price": 59 },
        { "id": "282496", "price": 55 },
        { "id": "265602", "price": 59 },
        { "id": "292523", "price": 59 },
        { "id": "232647", "price": 109 },
        { "id": "279164", "price": 65 },
        { "id": "293948", "price": 139 }
    ],
    "useStaminaVialHeroIds": [],
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
    "useRpcIndex": 2,
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
    "gasPrice": 100000000000,
    "gasLimit": 2800001,
    "unconditionalPurchasePrice": 32,
    "g0ConditionsOfPurchase": 5000,
  },
  "defikingdoms": {
    "quest": {
        "fishing": {
            "heroes": [
                "215972", "1000000001285", "247349", "252703", "262591",
                "219722", "272408", "194486", "221301", "269842", "274762",
                "261253", "219723", "265760", "211172", "225412", "265329",
                "1000000001412", "267834", "251427", "252166", "276375",
                "254829", "255178", "259201", "259744", "263119", "272458",
                "285688", "270338", "271701", "273173", "286044", "260505",
                "286853"
            ],
            "contractAddress": "0x407ab39B3675f29A719476af6eb3B9E5d93969E6"
        },
        "foraging": {
            "heroes": [
                "256980", "256603", "243095", "252753", "253628", "275358",
                "258171", "231170", "246917", "247641", "1000000001103", "258169",
                "194654", "248456", "256275", "255175", "259528", "206915",
                "197275", "224008", "250156", "259015", "264147", "228728",
                "264398", "266919", "270517", "268896", "270802", "278579",
                "270806", "272624", "218128", "261618", "273461", "274360"
            ],
            "contractAddress": "0xAd51199B453075C73FA106aFcAAD59f705EF7872"
        },
        "statQuests": [
            {
                "name": "StatQuest_Str",
                "heroes": [
                    "280117", "279275"
                ],
                "minStam": 25,
                "contractAddress": "0xb8828c687Fb1C875D5acb4281C5CDf9F49fA4637"
            },
            {
                "name": "StatQuest_Dex",
                "heroes": [],
                "minStam": 25,
                "contractAddress": "0x9ec92963d0387bA57D5f2D505319b1c135C6f1D3"
            },
            {
                "name": "StatQuest_Agi",
                "heroes": [],
                "minStam": 25,
                "contractAddress": "0x801b7296f106d8818DA1D04Ed769e5a76e8911fe"
            },
            {
                "name": "StatQuest_Vit",
                "heroes": [],
                "minStam": 25,
                "contractAddress": "0xE3edf52D33F2BB05DBdA5BA73903E27a9B9b7e9d"
            },
            {
                "name": "StatQuest_End",
                "heroes": [],
                "minStam": 25,
                "contractAddress": "0xBD391e4641E1bce989a246602EcDC746efA9d845"
            },
            {
                "name": "StatQuest_Int",
                "heroes": [],
                "minStam": 25,
                "contractAddress": "0xD8cCf866959830a8E397442B5F7DDD790F230962"
            },
            {
                "name": "StatQuest_Wis",
                "heroes": [],
                "minStam": 25,
                "contractAddress": "0x0832A218c2202088A1800D424248fC689ae74600"
            },
            {
                "name": "StatQuest_Luk",
                "heroes": [],
                "minStam": 25,
                "contractAddress": "0x81fA8a2bfcd703dc83c5d4bEE1075899448A5CdE"
            }
        ],
    },
    "heroForSale": [
        { "id": "256603", "price": 55 },
        { "id": "256980", "price": 32 },
        { "id": "219722", "price": 55 },
        { "id": "215972", "price": 45 },
        { "id": "272408", "price": 50 },
        { "id": "258171", "price": 60 },
        { "id": "1000000001103", "price": 55 },
        { "id": "243095", "price": 60 },
        { "id": "231170", "price": 60 },
        { "id": "247641", "price": 50 },
        { "id": "246917", "price": 60 },
        { "id": "256275", "price": 60 },
        { "id": "265760", "price": 50 },
        { "id": "219723", "price": 55 },
        { "id": "194654", "price": 50 },
        { "id": "248456", "price": 55 },
        { "id": "261253", "price": 60 },
        { "id": "247349", "price": 60 },
        { "id": "252703", "price": 60 },
        { "id": "253628", "price": 45 },
        { "id": "258169", "price": 55 },
        { "id": "194486", "price": 59 },
        { "id": "221301", "price": 59 },
        { "id": "211172", "price": 59 },
        { "id": "252753", "price": 49 },
        { "id": "255175", "price": 55 },
        { "id": "225412", "price": 65 },
        { "id": "267834", "price": 50 },
        { "id": "206915", "price": 60 },
        { "id": "197275", "price": 55 },
        { "id": "251427", "price": 55 },
        { "id": "259201", "price": 60 },
        { "id": "254829", "price": 69 },
        { "id": "265329", "price": 55 },
        { "id": "250156", "price": 50 },
        { "id": "252166", "price": 50 },
        { "id": "224008", "price": 75 },
        { "id": "259744", "price": 60 },
        { "id": "255178", "price": 55 },
        { "id": "263119", "price": 55 },
        { "id": "259015", "price": 65 },
        { "id": "259528", "price": 55 },
        { "id": "266919", "price": 50 },
        { "id": "264147", "price": 55 },
        { "id": "264398", "price": 50 },
        { "id": "270517", "price": 49 },
        { "id": "262591", "price": 45 },
        { "id": "270802", "price": 45 },
        { "id": "272624", "price": 55 },
        { "id": "268896", "price": 45 },
        { "id": "270806", "price": 55 },
        { "id": "278579", "price": 49 },
        { "id": "269842", "price": 45 },
        { "id": "276375", "price": 39 },
        { "id": "275358", "price": 55 },
        { "id": "218128", "price": 59 },
        { "id": "272458", "price": 39 },
        { "id": "261618", "price": 49 },
        { "id": "280117", "price": 55 },
        { "id": "274762", "price": 59 },
        { "id": "285688", "price": 49 },
        { "id": "270338", "price": 49 },
        { "id": "271701", "price": 49 },
        { "id": "273173", "price": 49 },
        { "id": "286044", "price": 59 },
        { "id": "279275", "price": 45 },
        { "id": "260505", "price": 59 },
        { "id": "228728", "price": 59 },
        { "id": "286853", "price": 39 },
        { "id": "273461", "price": 39 },
        { "id": "274360", "price": 39 }
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
