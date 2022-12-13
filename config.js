require('dotenv').config();

const config = {
  "walletAddressAndPrivateKeyMappings": process.env.ADDRESS_AND_PRIVATE_KEY_MAPPINGS.split("/").map(accountInfo => JSON.parse(accountInfo)), // 這是引入私鑰的，如果你的 .env 寫錯可能會拿不到值
  "defikingdoms": {
    "quest": {
      "fishing": {
        "heroes": [ // 這裡面只會寫你自己擁有的 hero id

        ],
        "minStamina": 25, // 執行任務的最低體力值
        "contractAddress": "0x407ab39B3675f29A719476af6eb3B9E5d93969E6"  //  合約的地址，你不會更改這個值
      },
      "foraging": {
        "heroes": [ // 這裡面只會寫你自己擁有的 hero id

        ],
        "minStamina": 25, // 執行任務的最低體力值
        "contractAddress": "0xAd51199B453075C73FA106aFcAAD59f705EF7872" //  合約的地址，你不會更改這個值
      },
      "goldMining": {
        "singleBatchAmount": 4, // 單次送出的英雄數量
        "heroes": [ // 這裡面只會寫你自己擁有的 hero id
          "1000000029882", "295922", "1000000075777", "302782", "1000000033947", "1000000050447", 
          "1000000043706", "1000000055666"
        ],
        "minStamina": 25, // 執行任務的最低體力值
        "contractAddress": "0x75912145f5cFEfb980616FA47B2f103210FaAb94" // 合約的地址，你不會更改這個值
      },
      "crystalMining": {
        "singleBatchAmount": 4, // 單次送出的英雄數量
        "heroes": [ // 這裡面只會寫你自己擁有的 hero id
          "1000000022817", "1000000017580", "1000000049724", "233167", "235300", "1000000021036",
          "272569", "96964", "243889", "305904", "1000000052725", "273716",
        ],
        "minStamina": 15, // 執行任務的最低體力值
        "contractAddress": "0x98b3C85ac3cC3EF36Ff25A9229857AbACE3e7410" // 合約的地址，你不會更改這個值
      },
      "gardening": {
        "pairAddressMappings": [
          {
            "tokenPair": "CRYSTAL-AVAX", // 沒有邏輯用到這個字串，單純是方便你辨識當前任務用的
            "pairAddress": "0x8eDA0ceA7a90E794B33708Cc0768727A1A612f3d", // pair 的合約地址，你不會更改這個值
            "singleBatchAmount": 2, // 單次送出的英雄數量
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id
              "1000000009694", "306400", "1000000053360", "1000000072530", "1000000051702"
            ],
          },                 {
            "tokenPair": "CRYSTAL-wJEWEL", // 沒有邏輯用到這個字串，單純是方便你辨識當前任務用的
            "pairAddress": "0xC4839Fb9A5466878168EaE3fD58c647B71475b61", // pair 的合約地址，你不會更改這個值
            "singleBatchAmount": 2, // 單次送出的英雄數量
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id
              "257441", "1000000011052", "1000000014451", "1000000036507"
            ],
          },                 {
            "tokenPair": "CRYSTAL-USDC", // 沒有邏輯用到這個字串，單純是方便你辨識當前任務用的
            "pairAddress": "0x6FEF23498877bC4c3940ebE121dd7D138BdA4e11", // pair 的合約地址，你不會更改這個值
            "singleBatchAmount": 1, // 單次送出的英雄數量
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id
              "1000000009289", "231246", "185417", "181573"
            ],
          },                 {
            "tokenPair": "ETH-USDC", // 沒有邏輯用到這個字串，單純是方便你辨識當前任務用的
            "pairAddress": "0xdeF7cBeE7d0B62037616ee26BCAc1C8364f53476", // pair 的合約地址，你不會更改這個值
            "singleBatchAmount": 2, // 單次送出的英雄數量
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id
              "224608", "210943", "205585", "299493", "1000000038381", "1000000027626"
            ],
          },                 {
            "tokenPair": "wJEWEL-USDC", // 沒有邏輯用到這個字串，單純是方便你辨識當前任務用的
            "pairAddress": "0xaac3933Faa3B668304C9276d10CA88853463BD42", // pair 的合約地址，你不會更改這個值
            "singleBatchAmount": 2, // 單次送出的英雄數量
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id
              "245326", "246617", "262381", "260126", "196194"
            ],
          },                 {
            "tokenPair": "CRYSTAL-ETH", // 沒有邏輯用到這個字串，單純是方便你辨識當前任務用的
            "pairAddress": "0x810e1fF51fDd58c474c66A31013713D1A17BF458", // pair 的合約地址，你不會更改這個值
            "singleBatchAmount": 2, // 單次送出的英雄數量
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id
              "1000000014478", "258253", "269798", "277280", "1000000057512", "1000000058765"
            ],
          },                 {
            "tokenPair": "CRYSTAL-BTC.b", // 沒有邏輯用到這個字串，單純是方便你辨識當前任務用的
            "pairAddress": "0x706916dbC3b66d89632708CC193080ea05E0534A", // pair 的合約地址，你不會更改這個值
            "singleBatchAmount": 2, // 單次送出的英雄數量
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id
              "1000000016650", "1000000028544", "1000000029546", "1000000038324", "1000000091089", "1000000091097"
            ],
          },                 {
            "tokenPair": "CRYSTAL-KLAY", // 沒有邏輯用到這個字串，單純是方便你辨識當前任務用的
            "pairAddress": "0x1fCc67a01525fd715A67bCcbF73665Fb3dBE76c7", // pair 的合約地址，你不會更改這個值
            "singleBatchAmount": 2, // 單次送出的英雄數量
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id
              "1000000003941", "290196", "295657", "303812", "1000000031133", "1000000032435"
            ],
          },                 {
            "tokenPair": "JEWEL-KLAY", // 沒有邏輯用到這個字串，單純是方便你辨識當前任務用的
            "pairAddress": "0x2A70aA48f9dBF859239ae5E7f98fe95aE27A6CD4", // pair 的合約地址，你不會更改這個值
            "singleBatchAmount": 2, // 單次送出的英雄數量
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id
              "235467", "261081", "1000000031894", "1000000055999", "1000000059047", "1000000081074"
            ],
          },                 {
            "tokenPair": "JEWEL-AVAX", // 沒有邏輯用到這個字串，單純是方便你辨識當前任務用的
            "pairAddress": "0xA0d17554F09047d65E0ae0e76CD8923A9525183c", // pair 的合約地址，你不會更改這個值
            "singleBatchAmount": 2, // 單次送出的英雄數量
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id
              "304918", "280166", "1000000021796", "1000000030876", "249058", "252348"
            ],
          },                 {
            "tokenPair": "JEWEL-BTC.b", // 沒有邏輯用到這個字串，單純是方便你辨識當前任務用的
            "pairAddress": "0x3391B9384AC66C7Aa3BF4A75A4f441942B1dCf30", // pair 的合約地址，你不會更改這個值
            "singleBatchAmount": 2, // 單次送出的英雄數量
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id
              "296812", "287682", "1000000018919", "1000000037933", "1000000038061"
            ],
          },                 {
            "tokenPair": "JEWEL-ETH", // 沒有邏輯用到這個字串，單純是方便你辨識當前任務用的
            "pairAddress": "0xbaEc39Dd81b964B57bc5fa5f5421Cd82185409E6", // pair 的合約地址，你不會更改這個值
            "singleBatchAmount": 2, // 單次送出的英雄數量
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id
              "291333", "1000000038180", "1000000067657", "1000000079362", "1000000026987", "1000000046841"
            ],
          },                 {
            "tokenPair": "BTC.b-USDC", // 沒有邏輯用到這個字串，單純是方便你辨識當前任務用的
            "pairAddress": "0x045838dBfb8026520E872c8298F4Ed542B81Eaca", // pair 的合約地址，你不會更改這個值
            "singleBatchAmount": 2, // 單次送出的英雄數量
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id
              "288259", "289658", "265142", "185295", "274333", "1000000016290"
            ],
          }
        ],
        "minStamina": 15, // 執行任務的最低體力值
      },
      "statQuest": {
        "minStamina": 25,
        "quests": [
          {
            "name": "StatQuest_Str", // 有地方會用到這個值，不要更改它
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id
              "1000000029603", "1000000048607"
            ],
            "contractAddress": "0xb8828c687Fb1C875D5acb4281C5CDf9F49fA4637" // 合約的地址，你不會更改這個值
          },
          {
            "name": "StatQuest_Dex", // 有地方會用到這個值，不要更改它
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id
              "1000000019469"
            ],
            "contractAddress": "0x9ec92963d0387bA57D5f2D505319b1c135C6f1D3" // 合約的地址，你不會更改這個值
          },
          {
            "name": "StatQuest_Agi", // 有地方會用到這個值，不要更改它
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id

            ],
            "contractAddress": "0x801b7296f106d8818DA1D04Ed769e5a76e8911fe" // 合約的地址，你不會更改這個值
          },
          {
            "name": "StatQuest_Vit", // 有地方會用到這個值，不要更改它
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id
  
            ],
            "contractAddress": "0xE3edf52D33F2BB05DBdA5BA73903E27a9B9b7e9d" // 合約的地址，你不會更改這個值
          },
          {
            "name": "StatQuest_End", // 有地方會用到這個值，不要更改它
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id

            ],
            "contractAddress": "0xBD391e4641E1bce989a246602EcDC746efA9d845" // 合約的地址，你不會更改這個值
          },
          {
            "name": "StatQuest_Int", // 有地方會用到這個值，不要更改它
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id
              "1000000022549", "1000000030734",
              "296669", "1000000047897", "1000000044536", "1000000072500",
              "1000000091831", "1000000093700"
            ],
            "contractAddress": "0xD8cCf866959830a8E397442B5F7DDD790F230962" // 合約的地址，你不會更改這個值
          },
          {
            "name": "StatQuest_Wis", // 有地方會用到這個值，不要更改它
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id
              "1000000092704"
            ],
            "contractAddress": "0x0832A218c2202088A1800D424248fC689ae74600" // 合約的地址，你不會更改這個值
          },
          {
            "name": "StatQuest_Luk", // 有地方會用到這個值，不要更改它
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id

            ],
            "contractAddress": "0x81fA8a2bfcd703dc83c5d4bEE1075899448A5CdE" // 合約的地址，你不會更改這個值
          }
        ]
      }
    },
    "notForRentHeroIds": [
       // 把你不想出租的英雄 ID 寫在這裡，例如： "1565", "1234" 
    ],
    "notForLevelUpHeroIds": [
      // 把你不想自動升級的英雄 ID 寫在這裡，例如： "1716", "123456"
    ],
    "useStaminaVialHeroIds": [ // 把你想要自動使用耐力藥水的英雄 ID 寫在這裡，例如 "1000000064538"
      
    ],
    "heroForSale": [ // 你想要販售的英雄與價格，price 請填整數，否則會出錯
      // 格式範例 { "id": "1234", "price": 25000 }
    ],
    "useRpcIndex": 0, // 表示你想要使用的 rpc ，0 是 下方 rpcs 的第一個，1 是第二個以次類推，網路卡頓的時候可以嘗試換個 rpc
    "rpcs": [
      "https://subnets.avax.network/defi-kingdoms/dfk-chain/rpc",
      "https://avax-dfk.gateway.pokt.network/v1/lb/6244818c00b9f0003ad1b619/ext/bc/q2aTwKuyzgs8pynF7UXBZCU7DejbZbZ6EUyHr3JQzYgwNPUPi/rpc"
    ],
    "questCoreV2": "0xE9AbfBC143d7cef74b5b793ec5907fa62ca53154", // 合約的地址，你不會更改這個值
    "heroCore": "0xEb9B61B145D6489Be575D3603F4a704810e143dF", // 合約的地址，你不會更改這個值
    "saleAuction": "0xc390fAA4C7f66E4D62E59C231D5beD32Ff77BEf0", // 合約的地址，你不會更改這個值
    "meditationCircle": "0xD507b6b299d9FC835a0Df92f718920D13fA49B47", // 合約的地址，你不會更改這個值
    "shvasRune": "0x75E8D8676d774C9429FbB148b30E304b5542aC3d", // 合約的地址，你不會更改這個值
    "mokshaRune": "0xCd2192521BD8e33559b0CA24f3260fE6A26C28e4", // 合約的地址，你不會更改這個值
    "heroBridge": "0x739B1666c2956f601f095298132773074c3E184b", // 合約的地址，你不會更改這個值
    "uniswapV2Factory": "0x794C07912474351b3134E6D6B3B7b3b4A07cbAAa", // 合約的地址，你不會更改這個值
    "uniswapV2Router02": "0x3C351E1afdd1b1BC44e931E12D4E05D6125eaeCa", // 合約的地址，你不會更改這個值
    "staminaVial": "0x242078edFDca25ef2A497C8D9f256Fd641472E5F", // 合約的地址，你不會更改這個值
    "itemGoldTraderV2": "0x0f85fdf6c561C42d6b46d0E27ea6Aa9Bf9476B3f", // 合約的地址，你不會更改這個值
    "DFKDuelS1": "0xf724FE22b45D519D149477aA2eC5348Cee08Cae3", // 合約的地址，你不會更改這個值
    "raffleMaster": "0xd8D7CE8921490b75EC489bd076AD0f27DC765675", // 合約的地址，你不會更改這個值
    "duelRaffleTicket": "0xBbd7c4Be2e54fF5e013471162e1ABAD7AB74c3C3", // 合約的地址，你不會更改這個值
    "airdropClaim": "0x947873092dc57C1A70704033c41cB110f4462a8B", // 合約的地址，你不會更改這個值
    "itemConsumer": "0xc9A9F352Aa188f422A8f8902B547FB3E59D37210", // 合約的地址，你不會更改這個值
    "crystal": "0x04b9dA42306B023f3572e106B11D82aAd9D32EBb", // 合約的地址，你不會更改這個值
    "assistingAuctionUpgradable": "0x8101CfFBec8E045c3FAdC3877a1D30f97d301209", // 合約的地址，你不會更改這個值
    "availableForSaleTokens": [ // 可自由更改下方 "sale" 裡面的值成 true 或是 false，true 表示要賣，false 的則不會賣掉
      {
        "name": "Ambertaffy",
        "contractAddress": "0xB78d5580d6D897DE60E1A942A5C1dc07Bc716943",
        "sale": true
      },
      {
        "name": "Bluestem",
        "contractAddress": "0x0776b936344DE7bd58A4738306a6c76835ce5D3F",
        "sale": false
      },
      {
        "name": "Darkweed",
        "contractAddress": "0x848Ac8ddC199221Be3dD4e4124c462B806B6C4Fd",
        "sale": true
      },
      {
        "name": "Ironscale",
        "contractAddress": "0x04B43D632F34ba4D4D72B0Dc2DC4B30402e5Cf88",
        "sale": true
      },
      {
        "name": "Lanterneye",
        "contractAddress": "0xc2Ff93228441Ff4DD904c60Ecbc1CfA2886C76eB",
        "sale": true
      },
      {
        "name": "Milkweed",
        "contractAddress": "0xA2cef1763e59198025259d76Ce8F9E60d27B17B5",
        "sale": false
      },
      {
        "name": "Rockroot",
        "contractAddress": "0x60170664b52c035Fcb32CF5c9694b22b47882e5F",
        "sale": true
      },
      {
        "name": "Sailfish",
        "contractAddress": "0x7f46E45f6e0361e7B9304f338404DA85CB94E33D",
        "sale": false
      },
      {
        "name": "Shimmerskin",
        "contractAddress": "0xd44ee492889C078934662cfeEc790883DCe245f3",
        "sale": false
      },
      {
        "name": "Skunk Shade",
        "contractAddress": "0xc6030Afa09EDec1fd8e63a1dE10fC00E0146DaF3",
        "sale": true
      },
      {
        "name": "Spiderfruit",
        "contractAddress": "0x3E022D84D397F18743a90155934aBAC421D5FA4C",
        "sale": true
      },
      {
        "name": "Swift-Thistle",
        "contractAddress": "0x97b25DE9F61BBBA2aD51F1b706D4D7C04257f33A",
        "sale": false
      },
      {
        "name": "Three-Eyed Eel",
        "contractAddress": "0x6513757978E89e822772c16B60AE033781A29A4F",
        "sale": true
      },
      {
        "name": "Bloater",
        "contractAddress": "0x268CC8248FFB72Cd5F3e73A9a20Fa2FF40EfbA61",
        "sale": true
      },
      {
        "name": "Frost Bloater",
        "contractAddress": "0x3bcb9A3DaB194C6D8D44B424AF383E7Db51C82BD",
        "sale": true
      },
      {
        "name": "Frost Drum",
        "contractAddress": "0xe7a1B580942148451E47b92e95aEB8d31B0acA37",
        "sale": true
      },
      {
        "name": "Goldvein",
        "contractAddress": "0x0096ffda7A8f8E00e9F8Bbd1cF082c14FA9d642e",
        "sale": true
      },
      {
        "name": "King Pincer",
        "contractAddress": "0x60A3810a3963f23Fa70591435bbe93BF8786E202",
        "sale": true
      },
      {
        "name": "Knaproot",
        "contractAddress": "0xBcdD90034eB73e7Aec2598ea9082d381a285f63b",
        "sale": true
      },
      {
        "name": "Ragweed",
        "contractAddress": "0x137995beEEec688296B0118131C1052546475fF3",
        "sale": true
      },
      {
        "name": "Redgill",
        "contractAddress": "0x68eE50dD7F1573423EE0Ed9c66Fc1A696f937e81",
        "sale": true
      },
      {
        "name": "Redleaf",
        "contractAddress": "0x473A41e71618dD0709Ba56518256793371427d79",
        "sale": true
      },
      {
        "name": "Shaggy Caps",
        "contractAddress": "0x80A42Dc2909C0873294c5E359e8DF49cf21c74E4",
        "sale": true
      },
      {
        "name": "Silverfin",
        "contractAddress": "0xA7CFd21223151700FB82684Cd9c693596267375D",
        "sale": true
      },
      {
        "name": "Speckle Tail",
        "contractAddress": "0xE7CB27ad646C49dC1671Cb9207176D864922C431",
        "sale": true
      },
    ],
    "duelSetting": [ // 注意: 同一時間只能有一個進行中的 duel，這表示你只能將一種類型開啟為 true
			{
				"type": "solo", // duel 的類型，你不會更改這個值
				"fee": "low", // 花費幣的數量 low = 0.1 medium = 0.5 large = 1
				"isActive": true, // 表示是否要執行該 type 的 duel，true 的情形就會自動執行
				"heroes": [
					["1000000030460"],
				], // 在這邊寫你想要嘗試送去 duel 的英雄 id solo 範例: [["1234"], ["5678"], ["91011"]]
			},
			{
				"type": "squad", // duel 的類型，你不會更改這個值
				"fee": "low", // 花費幣的數量 low = 0.3 medium = 1.5 large = 3
				"isActive": false, // 表示是否要執行該 type 的 duel，true 的情形就會自動執行
				"heroes": [
				  ["1000000029707", "1000000038381", "1000000021312"],
          ["1000000064538", "1000000051353", "1000000073976"]
				], // 在這邊寫你想要嘗試送去 duel 的英雄 id squad 範例: [["1234", "5678", "91011"], ["121314", "151617", "181920"]]
			},
			{
				"type": "war", // duel 的類型，你不會更改這個值
				"fee": "low", // 花費幣的數量 low = 1 medium = 5 large = 10
				"isActive": false, // 表示是否要執行該 type 的 duel，true 的情形就會自動執行
				"heroes": [
          
        ], // 在這邊寫你想要嘗試送去 duel 的英雄 id war 範例: [["1234", "5678", "91011", "121314", "151617", "181920", "444", "555", "6666"]]
			}
    ],
    "raffleSetting": { // 會在每個獎池放入 enterAmount 輸入的值，如果抽獎券不夠會直接跳過
      "isActive": true, // 表示是否要執行自動抽獎，true 的情形就會自動執行
      "enterAmount": 50, // 每個獎池放入的券數量
    },
    "maxGasPrice": 10000000000, // 表示你可以接受的最大 baseFee 是多少，當 baseFee 超過這個值時任務腳本就會暫停，6000000000 表示 6 Gwei，請依你的需要調整
    "overBaseGasFeeWei": 550000000, // 表示你願意出高於 baseFee 多少的 gas，理論上這個數字越高你的交易速度就會越快， 110000000 表示 0.11 Gwei，請依你的需要調整
    "listStamina": 24, // 表示當你的英雄體力低於多少時要進行掛售，體力值高於這個設定的英雄如果是下架狀態會等做完任務才會再次上架
    "networkRentalEstimateAdjustment": 1.1, // DFK 鏈的出租估價完會在乘以這個數，如果覺得 DFK 鏈估價太低或太高可以調整這個數字
    "networkBuyerEstimateAdjustment": 1 // DFK 鏈的購買估價會再乘以這個數，如果覺得 DFK 鏈估價太低或太高可以調整這個數字
  },
  "klay": {
    "quest": {
      "fishing": {
        "heroes": [ // 這裡面只會寫你自己擁有的 hero id
          "1000000001285", "264769", "1000000019670", "1000000030801", "1000000088518",
          "221301", "269842", "1000000014477", "1000000030913", "1000000091827",
          "225412", "1000000031003", "1000000087829","1000000091834",
          "1000000001412", "1000000031708", "1000000092703",
          "1000000002619", "1000000006002", "1000000091077", "1000000093053",
          "270338", "1000000011636", "1000000091087", "1000000091200",
          "270247", "265263", "292587", "295105", "1000000032565",
          "240170", "17049", "263373", "284245", "1000000073818",
          "245862", "276051", "296461", "1000000042496", "1000000091342",
          "248625", "266063", "272671", "274892", "1000000034480",
          "254994", "278240", "185707", "197985", "1000000042559",
          "256447", "158263", "275612", "277968", "1000000082209",
          "262570", "276782", "279365", "280215", "218529", "1000000042854",
          "275690", "271813", "272487", "306585", "1000000068962",
          "276226", "285999", "1000000005991", "1000000041588",
          "286148", "287580", "288122", "291845", "1000000070345",
          "284058", "1000000013721", "1000000042442",
          "292069", "294810", "1000000043741", "1000000087664",
          "301253", "185795", "1000000074849", "1000000091082",
          "1000000074719", "1000000051186", "1000000052279",
          "302516", "1000000011732", "288226", "1000000012524", "228252",
          "305517", "1000000015292", "232423", "1000000015992",
          "1000000015916", "270822", "306134",
          "272686", "301639", "305852", "305635", "1000000022759",
          "1000000016637", "253125", "1000000047143", "1000000091824",
          "1000000023115", "1000000047447", "1000000091103",
          "197215", "1000000021312", "1000000022526", "1000000024102",
          "1000000026652", "1000000021632", "1000000027759", "1000000054083",
          "1000000027815", "1000000027762", "1000000025200", "1000000044846",
          "1000000029205", "1000000029707", "1000000047111", "1000000091333",
          "1000000047585", "1000000048766", "1000000049957", "1000000091425",
          "1000000051294", "1000000054937", "1000000091920",
          "1000000053417", "1000000053737", "1000000055672", "1000000057102", "299980",
          "1000000059053", "1000000060309", "1000000058992", "1000000022993",
          "146883", "1000000064305", "1000000062116", "217657", "1000000063338",
          "1000000066026", "1000000070764", "1000000071159", "1000000070361"
        ],
        "minStamina": 25, // 執行任務的最低體力值
        "contractAddress": "0x0E7a8b035eF2FA0183a2680458818256424Bd60B"  //  合約的地址，你不會更改這個值
      },
      "foraging": {
        "heroes": [ // 這裡面只會寫你自己擁有的 hero id
          "300803", "1000000031167", "1000000073224", "221884", "1000000087219",
          "257297", "1000000012665", "1000000034323", "1000000082034", "1000000093697",
          "302481", "1000000039785", "1000000069438", "1000000080914", "2000000003160",
          "245919", "303103", "1000000025002", "1000000091332", "1000000094914",
          "268896", "300295", "304598", "1000000072080", "1000000081279",
          "218128", "1000000020401", "1000000043525", "1000000081555",
          "273563", "238302", "240867", "1000000082262", "1000000086884",
          "273379", "295054", "1000000010814", "1000000015214", "1000000058189",
          "274898", "281743", "270856", "1000000066747", "1000000087026",
          "196393", "239243", "169406", "273072", "2000000001175", "1000000095474",
          "246258", "225740", "273663", "274245", "254782", "1000000009838",
          "276198", "273818", "277774", "182721", "114122", "1000000043522",
          "246344", "283480", "141989", "1000000036454", "1000000036806",
          "259371", "249208", "279895", "293588", "1000000036749",
          "284247", "197341", "290757", "298690", "1000000037557",
          "266866", "230218", "164343", "1000000001213", "1000000013684",
          "271251", "287332", "287103", "1000000010562", "1000000014517",
          "288177", "288436", "283539", "287552", "1000000017497", "1000000040065",
          "1000000004431", "1000000049843", "1000000083536", "1000000087956",
          "301174", "1000000017108", "1000000054071",
          "264342", "290898", "54615", "1000000079906", "1000000086890",
          "171531", "170607", "301809", "1000000012216", "1000000085578",
          "1000000010037", "1000000011698", "1000000011527", "1000000088741",
          "1000000015604", "271629", "1000000015216", "9371", "1000000073518",
          "203884", "281753", "206456", "1000000030460", "2000000001367",
          "221872", "183774", "1000000058203", "1000000055808", "1000000047652",
          "1000000019201", "1000000019288", "1000000004962", "1000000019447",
          "1000000019784", "294495", "1000000083984", "1000000088328",
          "1000000020648", "103823", "305839", "1000000064538", "1000000090795",
          "228546", "1000000010242", "161308", "1000000041812", "141028",
          "1000000022615", "1000000022719", "1000000022203", "1000000024777", "1000000026278", "1000000026281",
          "1000000027116", "1000000025876", "1000000027440", "292136", "292255", "1000000051738",
          "1000000051357", "1000000068137", "1000000071597", "1000000091353",
          "1000000060323", "1000000052155", "1000000062345", "1000000065836"
        ],
        "minStamina": 25, // 執行任務的最低體力值
        "contractAddress": "0x54DaD24dDc2cC6E7616438816DE0EeFCad79B625" //  合約的地址，你不會更改這個值
      },
      "goldMining": {
        "singleBatchAmount": 6, // 單次送出的英雄數量
        "heroes": [ // 這裡面只會寫你自己擁有的 hero id
          "1000000089287", "1000000091078", "1000000097425", "1000000001443", "1000000061159", "303804",
          "1000000028133", "1000000037174", "1000000068248", "1000000052561", "1000000091832", "1000000092705",
          "1000000058211", "1000000059559", "1000000074522", "1000000088397", "1000000091334", "1000000074412"
        ],
        "minStamina": 25, // 執行任務的最低體力值
        "contractAddress": "0x46F036B26870188aD69877621815238D2b81bef1" // 合約的地址，你不會更改這個值
      },
      "jadeMining": {
        "singleBatchAmount": 3, // 單次送出的英雄數量
        "heroes": [ // 這裡面只會寫你自己擁有的 hero id
          "1000000038262", "1000000047704", "1000000073976", "1000000064160", "1000000072758", "1000000087945",
          "1000000025803", "248208", "1000000060859"
        ],
        "minStamina": 15, // 執行任務的最低體力值
        "contractAddress": "0x20B274262FA6da57B5Ff90498EC373c0266eF901" // 合約的地址，你不會更改這個值
      },
      "gardening": {
        "pairAddressMappings": [
          {
            "tokenPair": "JADE-JEWEL", // 沒有邏輯用到這個字串，單純是方便你辨識當前任務用的
            "pairAddress": "0x3837612f3A14C92Da8E0186AB398A753fe169dc1", // pair 的合約地址，你不會更改這個值
            "singleBatchAmount": 2, // 單次送出的英雄數量
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id

            ],
          },                 {
            "tokenPair": "JADE-wKLAY", // 沒有邏輯用到這個字串，單純是方便你辨識當前任務用的
            "pairAddress": "0xc1C01a860B841F47f8191026D9Ca8eE2F1f37ab3", // pair 的合約地址，你不會更改這個值
            "singleBatchAmount": 2, // 單次送出的英雄數量
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id

            ],
          },                 {
            "tokenPair": "JADE-AVAX", // 沒有邏輯用到這個字串，單純是方便你辨識當前任務用的
            "pairAddress": "0x7643ADB5AaF129A424390CB055d6e23231fFd690", // pair 的合約地址，你不會更改這個值
            "singleBatchAmount": 2, // 單次送出的英雄數量
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id

            ],
          },                 {
            "tokenPair": "JADE-oUSDT", // 沒有邏輯用到這個字串，單純是方便你辨識當前任務用的
            "pairAddress": "0x177D9F3A92630CB8C46F169b1F99a12A7a326c45", // pair 的合約地址，你不會更改這個值
            "singleBatchAmount": 2, // 單次送出的英雄數量
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id

            ],
          },                 {
            "tokenPair": "JADE-oBTC", // 沒有邏輯用到這個字串，單純是方便你辨識當前任務用的
            "pairAddress": "0x05305c97e9A2FDC0F5Ea23824c1348DEeD9Aff04", // pair 的合約地址，你不會更改這個值
            "singleBatchAmount": 2, // 單次送出的英雄數量
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id

            ],
          },                 {
            "tokenPair": "JADE-oETH", // 沒有邏輯用到這個字串，單純是方便你辨識當前任務用的
            "pairAddress": "0xb911F5D6F9129365d1a415DD3CBa17F0240CFA70", // pair 的合約地址，你不會更改這個值
            "singleBatchAmount": 2, // 單次送出的英雄數量
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id
              
            ],
          },                 {
            "tokenPair": "JEWEL-wKLAY", // 沒有邏輯用到這個字串，單純是方便你辨識當前任務用的
            "pairAddress": "0x3198f51A1c8cFC5f1FeaD58feaa19E6dFc8e9737", // pair 的合約地址，你不會更改這個值
            "singleBatchAmount": 2, // 單次送出的英雄數量
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id
              "1000000052377", "1000000086968", "1000000040104"
            ],
          },                 {
            "tokenPair": "JEWEL-AVAX", // 沒有邏輯用到這個字串，單純是方便你辨識當前任務用的
            "pairAddress": "0xDAd93871e42a11aD577E4DCa02c7C426800A47D5", // pair 的合約地址，你不會更改這個值
            "singleBatchAmount": 2, // 單次送出的英雄數量
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id
              "1000000003004", "62871", "252748", "171666", "1000000068214", "1000000069970"
            ],
          },                 {
            "tokenPair": "JEWEL-oUSDT", // 沒有邏輯用到這個字串，單純是方便你辨識當前任務用的
            "pairAddress": "0x0831f733870e847263907F32B3367De2f47CeAf0", // pair 的合約地址，你不會更改這個值
            "singleBatchAmount": 2, // 單次送出的英雄數量
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id
              "1000000072014", "1000000042880", "1000000058161", "1000000087759", "1000000072029", "1000000090424"
            ],
          },                 {
            "tokenPair": "JEWEL-oBTC", // 沒有邏輯用到這個字串，單純是方便你辨識當前任務用的
            "pairAddress": "0x85106b1aF8B0337CB39a9aacDa87849B882a3170", // pair 的合約地址，你不會更改這個值
            "singleBatchAmount": 2, // 單次送出的英雄數量
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id
              "1000000043531", "1000000063769", "294416", "1000000085708", "214463", "285602"
            ],
          },                 {
            "tokenPair": "JEWEL-oETH", // 沒有邏輯用到這個字串，單純是方便你辨識當前任務用的
            "pairAddress": "0x7038F49cAA6e2f26677D237A2A40EC6354bA1eA5", // pair 的合約地址，你不會更改這個值
            "singleBatchAmount": 2, // 單次送出的英雄數量
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id
              "1000000053380", "1000000093057", "1000000048648", "1000000052634", "1000000052935", "1000000091826"
            ], 
          }
        ],
        "minStamina": 15, // 執行任務的最低體力值
      },
      "statQuest": {
        "minStamina": 25, // 執行任務的最低體力值
        "quests": [
          {
            "name": "StatQuest_Str", // 有地方會用到這個值，不要更改它
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id
              "2000000000175",
              "1000000017472", "1000000041503", "1000000041547", "1000000026736", "1000000085774",
              "1000000013079", "1000000021351", "248925",
              "1000000045142", "1000000041965", "1000000029772", "1000000082849",
              "1000000047075", "162779", "162538",
              "1000000051353", "1000000052246", "1000000024773", "1000000087935", "1000000088622",
              "1000000058157", "1000000059688", "1000000062264", "1000000086998", "1000000087038",
              "1000000091083", "1000000091343"
            ],
            "contractAddress": "0xF2143c7c8Dfca976415bDf7d37dfa63aed8Ef741" // 合約的地址，你不會更改這個值
          },
          {
            "name": "StatQuest_Dex", // 有地方會用到這個值，不要更改它
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id
              "1000000092583", "1000000012231", "1000000021885", "1000000018216", "1000000041938",
              "1000000053034", "1000000068404", "1000000030073",
              "1000000073168", "1000000086639", "1000000088471",
              "1000000088633", "1000000088850",
              "1000000093060"
            ],
            "contractAddress": "0x8F3acf63fd09ceCD1F387B7bC45bc245f43D4B5e" // 合約的地址，你不會更改這個值
          },
          {
            "name": "StatQuest_Agi", // 有地方會用到這個值，不要更改它
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id

            ],
            "contractAddress": "0x378052bbc8D2E1819194802b8A990E7Ae43655bA" // 合約的地址，你不會更改這個值
          },
          {
            "name": "StatQuest_Vit", // 有地方會用到這個值，不要更改它
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id
              "1000000091096"
            ],
            "contractAddress": "0x89a60d8B332ce2Dd3bE8b170c6391F98a03a665F" // 合約的地址，你不會更改這個值
          },
          {
            "name": "StatQuest_End", // 有地方會用到這個值，不要更改它
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id

            ],
            "contractAddress": "0x058282847F1C8E893edcdfea5df6eb203ECA7832" // 合約的地址，你不會更改這個值
          },
          {
            "name": "StatQuest_Int", // 有地方會用到這個值，不要更改它
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id
  
            ],
            "contractAddress": "0xe606f6548Ae34DA9065B4fee88990F239b445403" // 合約的地址，你不會更改這個值
          },
          {
            "name": "StatQuest_Wis", // 有地方會用到這個值，不要更改它
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id
              "285793", "294901", "1000000066888", "1000000091094",
              "1000000017344", "1000000046668", "1000000047716", "1000000040088"
            ],
            "contractAddress": "0x80F93836811a9A7721A21D7d8751aFd6A8fC9308" // 合約的地址，你不會更改這個值
          },
          {
            "name": "StatQuest_Luk", // 有地方會用到這個值，不要更改它
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id
              "1000000014120", "208697", "1000000051941", "1000000064162",
              "1000000080531", "1000000087216", "1000000089072"
            ],
            "contractAddress": "0x5C01d797d0Cc3D79c01ef98f7ffAe25E4dCEB400" // 合約的地址，你不會更改這個值
          }
        ]
      }
    },
    "notForRentHeroIds": [
       // 把你不想出租的英雄 ID 寫在這裡，例如： "1565", "1234" 
    ],
    "notForLevelUpHeroIds": [
      // 把你不想自動升級的英雄 ID 寫在這裡，例如： "1716", "123456"
    ],
    "useStaminaVialHeroIds": [ // 把你想要自動使用耐力藥水的英雄 ID 寫在這裡，例如 "1000000064538"
      
    ],
    "heroForSale": [ // 你想要販售的英雄與價格，price 請填整數，否則會出錯
      // 格式範例 { "id": "1234", "price": 25000 }
      { "id": "2000000000175", "price": 34999 },
      { "id": "203884", "price": 105 },
      { "id": "1000000019201", "price": 85 },
      { "id": "1000000086890", "price": 59 },
      { "id": "169406", "price": 149 },
      { "id": "1000000004962", "price": 79 },
      { "id": "245919", "price": 139 },
      { "id": "230218", "price": 95 },
      { "id": "259371", "price": 85 },
      { "id": "254782", "price": 85 },
      { "id": "246344", "price": 85 },
      { "id": "276198", "price": 75 },
      { "id": "273818", "price": 105 },
      { "id": "271629", "price": 69 },
      { "id": "1000000009838", "price": 75 },
      { "id": "288177", "price": 85 },
      { "id": "1000000010242", "price": 69 },
      { "id": "1000000027116", "price": 65 },
      { "id": "295105", "price": 79 },
      { "id": "284058", "price": 65 },
      { "id": "292587", "price": 89 },
      { "id": "292069", "price": 59 },
      { "id": "1000000088518", "price": 59 },
      { "id": "288226", "price": 99 },
      { "id": "1000000026652", "price": 65 },
      { "id": "276051", "price": 85 },
      { "id": "1000000027759", "price": 69 },
      { "id": "1000000011636", "price": 85 },
      { "id": "1000000013721", "price": 59 },
      { "id": "296461", "price": 59 },
      { "id": "286148", "price": 65 },
      { "id": "1000000015992", "price": 65 },
      { "id": "1000000087829", "price": 55 },
      { "id": "221301", "price": 65 },
      { "id": "225412", "price": 65 },
      { "id": "1000000087026", "price": 49 },
      { "id": "273563", "price": 89 },
      { "id": "1000000086884", "price": 49 },
      { "id": "1000000026736", "price": 59 },
      { "id": "1000000047075", "price": 79 },
      { "id": "1000000074412", "price": 65 },
      { "id": "1000000059688", "price": 59 },
      { "id": "1000000064305", "price": 55 },
      { "id": "1000000091343", "price": 69 },
      { "id": "1000000091078", "price": 199 },
      { "id": "1000000091096", "price": 69 },
      { "id": "303103", "price": 95 },
      { "id": "221872", "price": 89 },
      { "id": "253125", "price": 65 },
      { "id": "263373", "price": 65 },
      { "id": "1000000010037", "price": 65 },
      { "id": "254994", "price": 69 },
      { "id": "1000000013079", "price": 79 },
      { "id": "1000000092705", "price": 85 },
      { "id": "1000000017108", "price": 45 }
    ],
    "useRpcIndex": 0, // 表示你想要使用的 rpc ，0 是 下方 rpcs 的第一個，1 是第二個以次類推，網路卡頓的時候可以嘗試換個 rpc
    "rpcs": [
      "https://klaytn.rpc.defikingdoms.com",
      "https://klaytn-rpc.gateway.pokt.network"
    ],
    "questCoreV2": "0x8dc58d6327E1f65b18B82EDFb01A361f3AAEf624", // 合約的地址，你不會更改這個值
    "heroCore": "0x268CC8248FFB72Cd5F3e73A9a20Fa2FF40EfbA61", // 合約的地址，你不會更改這個值
    "saleAuction": "0x7F2B66DB2D02f642a9eb8d13Bc998d441DDe17A8", // 合約的地址，你不會更改這個值
    "meditationCircle": "0xdbEE8C336B06f2d30a6d2bB3817a3Ae0E34f4900", // 合約的地址，你不會更改這個值
    "shvasRune": "0x907a98319AEB249e387246637149f4B2e7D21dB7", // 合約的地址，你不會更改這個值
    "mokshaRune": "0xd0223143057Eb44065e789b202E03A5869a6006C", // 合約的地址，你不會更改這個值
    "heroBridge": "0xEE258eF5F4338B37E9BA9dE6a56382AdB32056E2", // 合約的地址，你不會更改這個值
    "uniswapV2Factory": "0x36fAE766e51f17F8218C735f58426E293498Db2B", // 合約的地址，你不會更改這個值
    "uniswapV2Router02": "0x9e987E5E9aB872598f601BE4aCC5ac23F484845E", // 合約的地址，你不會更改這個值
    "staminaVial": "0x4546DBaAb48Bf1BF2ad7B56d04952d946Ab6e2a7", // 合約的地址，你不會更改這個值
    "itemGoldTraderV2": "0x3Eab8a8F71dDA3e6c907C74302B734805C4f3278", // 合約的地址，你不會更改這個值
    "DFKDuelS1": "", // 合約的地址，你不會更改這個值
    "raffleMaster": "", // 合約的地址，你不會更改這個值
    "duelRaffleTicket": "", // 合約的地址，你不會更改這個值
    "airdropClaim": "", // 合約的地址，你不會更改這個值
    "itemConsumer": "0xF78cA21d7Da3227457138714F5bEd08D2604A156", // 合約的地址，你不會更改這個值
    "jade": "0xB3F5867E277798b50ba7A71C0b24FDcA03045eDF", // 合約的地址，你不會更改這個值
    "assistingAuctionUpgradable": "0xA2cef1763e59198025259d76Ce8F9E60d27B17B5", // 合約的地址，你不會更改這個值
    "availableForSaleTokens": [ // 可自由更改下方 "sale" 裡面的值成 true 或是 false，true 表示要賣，false 的則不會賣掉
      {
        "name": "Ambertaffy",
        "contractAddress": "0x75E8D8676d774C9429FbB148b30E304b5542aC3d",
        "sale": true
      },
      {
        "name": "Bluestem",
        "contractAddress": "0xDbd4fA2D2C62C6c60957a126970e412Ed6AC1bD6",
        "sale": false
      },
      {
        "name": "Darkweed",
        "contractAddress": "0xEDFBe9EEf42FfAf8909EC9Ce0d79850BA0C232FE",
        "sale": true
      },
      {
        "name": "Ironscale",
        "contractAddress": "0xBcdD90034eB73e7Aec2598ea9082d381a285f63b",
        "sale": true
      },
      {
        "name": "Lanterneye",
        "contractAddress": "0x80A42Dc2909C0873294c5E359e8DF49cf21c74E4",
        "sale": true
      },
      {
        "name": "Milkweed",
        "contractAddress": "0xE408814828f2b51649473c1a05B861495516B920",
        "sale": false
      },
      {
        "name": "Rockroot",
        "contractAddress": "0xf2D479DaEdE7F9e270a90615F8b1C52F3C487bC7",
        "sale": true
      },
      {
        "name": "Sailfish",
        "contractAddress": "0xc6030Afa09EDec1fd8e63a1dE10fC00E0146DaF3",
        "sale": false
      },
      {
        "name": "Shimmerskin",
        "contractAddress": "0xa61Bac689AD6867a605633520D70C49e1dCce853",
        "sale": false
      },
      {
        "name": "Skunk Shade",
        "contractAddress": "0x874FC0015ece1d77ba3D5668F16c46ba72913239",
        "sale": true
      },
      {
        "name": "Spiderfruit",
        "contractAddress": "0x08D93Db24B783F8eBb68D7604bF358F5027330A6",
        "sale": true
      },
      {
        "name": "Swift-Thistle",
        "contractAddress": "0xCd2192521BD8e33559b0CA24f3260fE6A26C28e4",
        "sale": false
      },
      {
        "name": "Three-Eyed Eel",
        "contractAddress": "0x7E1298EBF3a8B259561df6E797Ff8561756E50EA",
        "sale": true
      },
      {
        "name": "Bloater",
        "contractAddress": "0x72F860bF73ffa3FC42B97BbcF43Ae80280CFcdc3",
        "sale": true
      },
      {
        "name": "Frost Bloater",
        "contractAddress": "0x18cB286EeCE992f79f601E49acde1D1F5dE32a30",
        "sale": true
      },
      {
        "name": "Frost Drum",
        "contractAddress": "0xD69542aBE74413242e387Efb9e55BE6A4863ca10",
        "sale": true
      },
      {
        "name": "Goldvein",
        "contractAddress": "0xeaF833A0Ae97897f6F69a728C9c17916296cecCA",
        "sale": true
      },
      {
        "name": "King Pincer",
        "contractAddress": "0xB4A516bf36e44c0CE9E3E6769D3BA87341Cd9959",
        "sale": true
      },
      {
        "name": "Knaproot",
        "contractAddress": "0xFceFA4Abcb18a7053393526f75Ad33fac5F25dc9",
        "sale": true
      },
      {
        "name": "Ragweed",
        "contractAddress": "0x4cD7025BD6e1b77105b90928362e6715101d0b5a",
        "sale": true
      },
      {
        "name": "Redgill",
        "contractAddress": "0x8D2bC53106063A37bb3DDFCa8CfC1D262a9BDCeB",
        "sale": true
      },
      {
        "name": "Redleaf",
        "contractAddress": "0xadbF23Fe3B47857614940dF31B28179685aE9B0c",
        "sale": true
      },
      {
        "name": "Shaggy Caps",
        "contractAddress": "0xCe370D379f0CCf746B3426E3BD3923f3aDF0DC1a",
        "sale": true
      },
      {
        "name": "Silverfin",
        "contractAddress": "0x7E121418cC5080C96d967cf6A033B0E541935097",
        "sale": true
      },
      {
        "name": "Speckle Tail",
        "contractAddress": "0x48d9fC80A47cee2d52DE950898Bc6aBF54223F81",
        "sale": true
      },
    ],
    "maxGasPrice": 30000000000, // 表示你可以接受的最大 baseFee 是多少，當 baseFee 超過這個值時任務腳本就會暫停，6000000000 表示 6 Gwei，請依你的需要調整
    "overBaseGasFeeWei": 550000000, // 表示你願意出高於 baseFee 多少的 gas，理論上這個數字越高你的交易速度就會越快， 110000000 表示 0.11 Gwei，請依你的需要調整
    "listStamina": 24, // 表示當你的英雄體力低於多少時要進行掛售，體力值高於這個設定的英雄如果是下架狀態會等做完任務才會再次上架
    "networkRentalEstimateAdjustment": 0.9, // KLAY 鏈的出租估價完會在乘以這個數，如果覺得 KLAY 鏈估價太低或太高可以調整這個數字
    "networkBuyerEstimateAdjustment": 0.7 // KLAY 鏈的購買估價會再乘以這個數，如果覺得 KLAY 鏈估價太低或太高可以調整這個數字
  },
  "autoBuyerSetting": {
    "autoBuyerFloorPrice": 25, // 所有你沒有寫的組合都是用這個價格當作最低價
    "priceSetting": {
      "basic10/10G1": 65,
      "basic9/10G1": 55,
      "basic8/10G1": 45,
      "basic7/10G1": 35,
      "basic6/10G1": 27,
      "basic9/9G2": 35,
      "basic8/9G2": 34,
      "basic7/9G2": 30,
      "basic8/8G2": 33,
      "basic7/8G2": 30,
      "basic7/7G2": 32,
      "advance5/5G1": 105,
      "advance4/5G1": 85,
      "advance3/5G1": 60,
      "advance2/5G1": 45,
      "advance1/5G1": 35,
      "advance5/5G2": 95,
      "advance4/5G2": 75,
      "advance3/5G2": 50,
      "advance2/5G2": 40,
      "advance1/5G2": 30,
      "advance5/5G3": 85,
      "advance4/5G3": 65,
      "advance3/5G3": 40,
      "advance2/5G3": 35,
      "advance1/5G3": 28,
    }
  },
  "sendHeroTo": null, // 可以填入一個地址，當完成任務時會把所有完成任務的英雄傳入這個地址，當你要換錢包的時候可以使用這個功能
  "rentalEstimateAdjustment": 1, // 出租估價完會在乘以這個數，如果覺得估價太低或太高可以調整這個數字
  "buyerEstimateAdjustment": 1, // 購買估價會再乘以這個數，如果覺得估價太低或太高可以調整這個數字
  "unconditionalPurchasePrice": 22, // 當上架的英雄價格低於這個值時會直接購買，不會進入估價邏輯
  "g0ConditionsOfPurchase": 5000, // 當上架的 Gen0 英雄價格低於這個值時會直接嘗試購買，不會進入估價邏輯
  "setQuestScriptTimeSecond": 360, // 設定你每次任務腳本執行的間隔秒數
  "setDuelScriptTimeSecond": 1, // 設定你每次執行 duel 腳本的間隔秒數
  "saleWatcherWalletIndex": 0, // 設定你用於自動購買的 account 是哪一個，如果是 0 就是你寫在 env 的第一個帳號， 1 就是第二個以此類推
  "autoBuyerSwitch": true, // 自動購買的開關，設定為 false 時將不會自動購買，只會列出上架的英雄
  "autoDuelerWalletIndex": 0 // 設定你用於自動 duel 的 account 是哪一個，如果是 0 就是你寫在 env 的第一個帳號， 1 就是第二個以此類推
}

module.exports = config;
