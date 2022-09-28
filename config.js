require('dotenv').config();

const config = {
  "walletAddressAndPrivateKeyMappings": process.env.ADDRESS_AND_PRIVATE_KEY_MAPPINGS.split("/").map(accountInfo => JSON.parse(accountInfo)),
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
        "goldMining": {
            "singleBatchAmount": 2, // 單次送出的英雄數量
            "heroes": [
                "165529", "260433", "275599", "295461"
            ],
            "contractAddress": "0x75912145f5cFEfb980616FA47B2f103210FaAb94"
        },
        "crystalMining": {
            "singleBatchAmount": 1, // 單次送出的英雄數量
            "heroes": [
                "280117"
            ],
            "contractAddress": "0x98b3C85ac3cC3EF36Ff25A9229857AbACE3e7410"
        },
        "gardening": {
            "pairAddressMappings": [
                {
                    "tokenPair": "wJEWEL-xJEWEL",
                    "pairAddress": "0xd3d8ff8e42C2eD51FabE4BA34080C6ac79395f24",
                    "singleBatchAmount": 2,
                    "heroes": ["255984", "265843", "278642", "274368", "248925", "191055"],
                },
                {
                    "tokenPair": "CRYSTAL-AVAX",
                    "pairAddress": "0x8eDA0ceA7a90E794B33708Cc0768727A1A612f3d",
                    "singleBatchAmount": 2,
                    "heroes": ["1000000009694", "1000000013454", "304501", "1000000005579", "295023", "271693"],
                },                 {
                    "tokenPair": "CRYSTAL-wJEWEL",
                    "pairAddress": "0xC4839Fb9A5466878168EaE3fD58c647B71475b61",
                    "singleBatchAmount": 2,
                    "heroes": ["257441", "1000000011052", "1000000014451", "181573", "264337", "1000000005132"],
                },                 {
                    "tokenPair": "CRYSTAL-USDC",
                    "pairAddress": "0x6FEF23498877bC4c3940ebE121dd7D138BdA4e11",
                    "singleBatchAmount": 2,
                    "heroes": ["272143", "288479", "1000000009289", "238735", "231246", "1000000015231"],
                },                 {
                    "tokenPair": "ETH-USDC",
                    "pairAddress": "0xdeF7cBeE7d0B62037616ee26BCAc1C8364f53476",
                    "singleBatchAmount": 2,
                    "heroes": ["1000000014137", "224608", "244697", "210943"],
                },                 {
                    "tokenPair": "wJEWEL-USDC",
                    "pairAddress": "0xaac3933Faa3B668304C9276d10CA88853463BD42",
                    "singleBatchAmount": 2,
                    "heroes": ["245326", "258492", "246617", "262381"],
                },                 {
                    "tokenPair": "CRYSTAL-ETH",
                    "pairAddress": "0x810e1fF51fDd58c474c66A31013713D1A17BF458",
                    "singleBatchAmount": 2,
                    "heroes": ["1000000014478", "281297", "258253", "269798"],
                },                 {
                    "tokenPair": "CRYSTAL-BTC.b",
                    "pairAddress": "0x706916dbC3b66d89632708CC193080ea05E0534A",
                    "singleBatchAmount": 2,
                    "heroes": [],
                },                 {
                    "tokenPair": "CRYSTAL-KLAY",
                    "pairAddress": "0x1fCc67a01525fd715A67bCcbF73665Fb3dBE76c7",
                    "singleBatchAmount": 2,
                    "heroes": [],
                },                 {
                    "tokenPair": "JEWEL-KLAY",
                    "pairAddress": "0x2A70aA48f9dBF859239ae5E7f98fe95aE27A6CD4",
                    "singleBatchAmount": 2,
                    "heroes": [],
                },                 {
                    "tokenPair": "JEWEL-AVAX",
                    "pairAddress": "0xA0d17554F09047d65E0ae0e76CD8923A9525183c",
                    "singleBatchAmount": 2,
                    "heroes": [],
                },                 {
                    "tokenPair": "JEWEL-BTC.b",
                    "pairAddress": "0x3391B9384AC66C7Aa3BF4A75A4f441942B1dCf30",
                    "singleBatchAmount": 2,
                    "heroes": [],
                },                 {
                    "tokenPair": "JEWEL-ETH",
                    "pairAddress": "0xbaEc39Dd81b964B57bc5fa5f5421Cd82185409E6",
                    "singleBatchAmount": 2,
                    "heroes": [],
                },                 {
                    "tokenPair": "BTC.b-USDC",
                    "pairAddress": "0x045838dBfb8026520E872c8298F4Ed542B81Eaca",
                    "singleBatchAmount": 2,
                    "heroes": [],
                }
            ]
        },
        "statQuests": [
            {
                "name": "StatQuest_Str",
                "heroes": [
                    "280117", "279275"
                ],
                "contractAddress": "0xb8828c687Fb1C875D5acb4281C5CDf9F49fA4637"
            },
            {
                "name": "StatQuest_Dex",
                "heroes": [],
                "contractAddress": "0x9ec92963d0387bA57D5f2D505319b1c135C6f1D3"
            },
            {
                "name": "StatQuest_Agi",
                "heroes": [],
                "contractAddress": "0x801b7296f106d8818DA1D04Ed769e5a76e8911fe"
            },
            {
                "name": "StatQuest_Vit",
                "heroes": [],
                "contractAddress": "0xE3edf52D33F2BB05DBdA5BA73903E27a9B9b7e9d"
            },
            {
                "name": "StatQuest_End",
                "heroes": [],
                "contractAddress": "0xBD391e4641E1bce989a246602EcDC746efA9d845"
            },
            {
                "name": "StatQuest_Int",
                "heroes": [],
                "contractAddress": "0xD8cCf866959830a8E397442B5F7DDD790F230962"
            },
            {
                "name": "StatQuest_Wis",
                "heroes": [],
                "contractAddress": "0x0832A218c2202088A1800D424248fC689ae74600"
            },
            {
                "name": "StatQuest_Luk",
                "heroes": [],
                "contractAddress": "0x81fA8a2bfcd703dc83c5d4bEE1075899448A5CdE"
            }
        ],
    },
    "notForRentHeroIds": [],
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
    "maxGasPrice": 6000000000, // 6 Gwei
    "overBaseGasFeeWei": 510000000, // 0.51 Gwei
    "listStamina": 24,
  },
  "queryHeroEndPoint": "https://us-central1-defi-kingdoms-api.cloudfunctions.net/query_heroes",
  "graphqlEndPoint": "https://defi-kingdoms-community-api-gateway-co06z8vi.uc.gateway.dev/graphql",
  "rentalEstimateAdjustment": 1.2, // 出租估價完會在乘以這個數，如果覺得估價太低或太高可以調整這個數字
  "unconditionalPurchasePrice": 30,
  "g0ConditionsOfPurchase": 5000,
  "setQuestScriptTimeSecond": 120, // 設定你每次任務腳本執行的間隔秒數,
  "saleWatcherWalletIndex": 0
}

module.exports = config;
