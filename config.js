require('dotenv').config();

const config = {
  "walletAddressAndPrivateKeyMappings": process.env.ADDRESS_AND_PRIVATE_KEY_MAPPINGS.split("/").map(accountInfo => JSON.parse(accountInfo)), // 這是引入私鑰的，如果你的 .env 寫錯可能會拿不到值
  "defikingdoms": {
    "quest": {
        "fishing": {
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id
                "1000000001285", "264769", "1000000019670", "1000000030801",
                "221301", "269842", "1000000014477", "1000000030913",
                "225412", "1000000031003",
                "1000000001412", "1000000031708",
                "254829", "1000000002619", "1000000006002",
                "270338", "1000000011636", "1000000019366", "1000000018965",
                "270247", "265263", "292587", "295105", "1000000032565",
                "240170", "17049", "263373", "284245", "1000000073818",
                "238435", "245862", "264762", "276051", "296461", "1000000042496",
                "248625", "266063", "272671", "274892", "1000000034480",
                "254994", "278240", "185707", "197985", "1000000042559",
                "256447", "158263", "275612", "277968", "298151", "1000000042563",
                "262570", "276782", "279365", "280215", "218529", "1000000042854",
                "275690", "271813", "272487", "306585", "1000000039528",
                "276226", "285999", "1000000005991", "1000000041588",
                "286148", "287580", "288122", "291845", "295324",
                "284058", "1000000013721", "1000000042442", "1000000068859",
                "292069", "1000000004852", "169711", "294810", "1000000043741",
                "301253", "185795", "1000000013535", "1000000074849",
                "282928", "1000000022764", "1000000076100",
                "302516", "1000000011732", "288226", "1000000012524", "228252",
                "305517", "1000000015292", "232423", "1000000015992",
                "1000000015916", "270822", "306134", "1000000052279",
                "272686", "301639", "305852", "305635", "1000000022759",
                "1000000016637", "1000000018997", "253125", "1000000047143",
                "258640", "1000000021634", "1000000023115", "1000000047447",
                "197215", "1000000021312", "1000000022526", "1000000024102",
                "1000000026652", "1000000021632", "1000000027759", "1000000054083",
                "1000000027815", "1000000027762", "1000000025200", "1000000044846",
                "1000000029205", "1000000029707", "1000000029762", "1000000047111",
                "1000000047585", "1000000048766", "1000000049166", "1000000049957",
                "1000000051289", "1000000051294", "1000000051186", "1000000054937",
                "1000000053417", "1000000053737", "1000000055672", "1000000057102", "299980",
                "1000000059053", "1000000060309", "1000000058992", "1000000022993",
                "146883", "1000000064305", "1000000062116", "217657", "1000000063338",
                "1000000066026", "1000000070764", "1000000071159"
            ],
            "contractAddress": "0x407ab39B3675f29A719476af6eb3B9E5d93969E6"  //  合約的地址，你不會更改這個值
        },
        "foraging": {
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id
                "300803", "1000000031027", "1000000031167", "1000000073224",
                "257297", "1000000012665", "1000000031261", "1000000034323",
                "262265", "302481", "1000000039785", "1000000069438",
                "245919", "303103", "1000000025002", "1000000042867",
                "268896", "278579", "300295", "304598", "1000000072080",
                "218128", "287938", "1000000020401", "1000000043525",
                "273563", "238302", "240867", "277457", "293836", "1000000018502",
                "273379", "295054", "1000000010814", "1000000015214", "299123", "1000000058189",
                "274898", "234853", "281743", "270856",
                "196393", "239243", "169406", "273072", "1000000009224",
                "246258", "225740", "273663", "274245", "254782", "1000000009838",
                "276198", "273818", "277774", "182721", "114122", "283431", "1000000043522",
                "246344", "283480", "141989", "1000000036454", "1000000036806",
                "259371", "249208", "279895", "293588", "294228", "1000000036749",
                "284247", "197341", "290757", "298690", "1000000037557",
                "266866", "230218", "164343", "1000000001213", "1000000013684",
                "271251", "287332", "287103", "1000000010562", "1000000014517",
                "288177", "288436", "283539", "287552", "1000000017497", "1000000040065",
                "1000000004431", "1000000037439", "1000000040006", "1000000049843",
                "301174", "1000000017108", "1000000040198", "1000000054071",
                "264342", "1000000011969", "290898", "54615", "1000000042202",
                "171531", "170607", "301809", "1000000003534", "1000000012216",
                "1000000010037", "1000000011698", "1000000011527",
                "1000000015604", "271629", "1000000015216", "9371", "1000000073518",
                "203884", "281753", "1000000016958", "206456", "1000000030460",
                "221872", "183774", "1000000058203", "1000000055808", "1000000047652",
                "1000000019201", "1000000019288", "1000000004962", "1000000019447",
                "302582", "1000000019784", "1000000018930", "1000000017081", "294495",
                "193857", "1000000020648", "103823", "1000000030678", "305839", "1000000064538",
                "1000000021028", "228546", "1000000010242", "161308", "1000000041812", "141028",
                "1000000022615", "1000000022719", "1000000022203", "1000000024777", "1000000026278", "1000000026281",
                "1000000027116", "1000000025876", "1000000027440", "292136", "292255", "1000000051738",
                "1000000046811", "1000000051347", "1000000051357", "1000000068137", "1000000071597",
                "1000000060864", "1000000060323", "1000000052155", "1000000062345", "1000000065836"
            ],
            "contractAddress": "0xAd51199B453075C73FA106aFcAAD59f705EF7872" //  合約的地址，你不會更改這個值
        },
        "goldMining": {
            "singleBatchAmount": 6, // 單次送出的英雄數量
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id
                "275599", "233167", "235300", "1000000021036", "1000000029882", "1000000041659",
                "267606", "302782", "1000000033947", "1000000050447", "1000000046207",
                "272569", "290011", "96964", "243889", "305904", "1716", "1000000052725"
            ],
            "contractAddress": "0x75912145f5cFEfb980616FA47B2f103210FaAb94" // 合約的地址，你不會更改這個值
        },
        "crystalMining": {
            "singleBatchAmount": 1, // 單次送出的英雄數量
            "heroes": [ // 這裡面只會寫你自己擁有的 hero id
                "1000000022817", "276709", "1000000017580"
            ],
            "contractAddress": "0x98b3C85ac3cC3EF36Ff25A9229857AbACE3e7410" // 合約的地址，你不會更改這個值
        },
        "gardening": {
            "pairAddressMappings": [
                {
                    "tokenPair": "CRYSTAL-AVAX", // 沒有邏輯用到這個字串，單純是方便你辨識當前任務用的
                    "pairAddress": "0x8eDA0ceA7a90E794B33708Cc0768727A1A612f3d", // pair 的合約地址，你不會更改這個值
                    "singleBatchAmount": 2, // 單次送出的英雄數量
                    "heroes": [ // 這裡面只會寫你自己擁有的 hero id
                        "1000000009694", "306400", "1000000025572", "131880", "1000000053360", "1000000072530"
                    ],
                },                 {
                    "tokenPair": "CRYSTAL-wJEWEL", // 沒有邏輯用到這個字串，單純是方便你辨識當前任務用的
                    "pairAddress": "0xC4839Fb9A5466878168EaE3fD58c647B71475b61", // pair 的合約地址，你不會更改這個值
                    "singleBatchAmount": 2, // 單次送出的英雄數量
                    "heroes": [ // 這裡面只會寫你自己擁有的 hero id
                        "257441", "1000000011052", "1000000014451", "181573", "1000000005132", "1000000036507"
                    ],
                },                 {
                    "tokenPair": "CRYSTAL-USDC", // 沒有邏輯用到這個字串，單純是方便你辨識當前任務用的
                    "pairAddress": "0x6FEF23498877bC4c3940ebE121dd7D138BdA4e11", // pair 的合約地址，你不會更改這個值
                    "singleBatchAmount": 2, // 單次送出的英雄數量
                    "heroes": [ // 這裡面只會寫你自己擁有的 hero id
                        "272143", "1000000009289", "231246", "1000000038725", "1000000051702", "185417"
                    ],
                },                 {
                    "tokenPair": "ETH-USDC", // 沒有邏輯用到這個字串，單純是方便你辨識當前任務用的
                    "pairAddress": "0xdeF7cBeE7d0B62037616ee26BCAc1C8364f53476", // pair 的合約地址，你不會更改這個值
                    "singleBatchAmount": 2, // 單次送出的英雄數量
                    "heroes": [ // 這裡面只會寫你自己擁有的 hero id
                        "1000000014137", "224608", "210943", "205585", "299493", "1000000038381"
                    ],
                },                 {
                    "tokenPair": "wJEWEL-USDC", // 沒有邏輯用到這個字串，單純是方便你辨識當前任務用的
                    "pairAddress": "0xaac3933Faa3B668304C9276d10CA88853463BD42", // pair 的合約地址，你不會更改這個值
                    "singleBatchAmount": 2, // 單次送出的英雄數量
                    "heroes": [ // 這裡面只會寫你自己擁有的 hero id
                        "245326", "258492", "246617", "262381", "260126", "196194"
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
                        "1000000016650", "1000000015996", "1000000028544", "1000000029546", "1000000038324", "1000000027626"
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
                        "235467", "261081", "1000000019977", "1000000031894", "1000000055999", "1000000059047"
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
                        "298531", "296812", "287682", "1000000018919", "1000000037933", "1000000038061"
                    ],
                },                 {
                    "tokenPair": "JEWEL-ETH", // 沒有邏輯用到這個字串，單純是方便你辨識當前任務用的
                    "pairAddress": "0xbaEc39Dd81b964B57bc5fa5f5421Cd82185409E6", // pair 的合約地址，你不會更改這個值
                    "singleBatchAmount": 2, // 單次送出的英雄數量
                    "heroes": [ // 這裡面只會寫你自己擁有的 hero id
                        "291333", "236563", "1000000022107", "1000000038180", "1000000067657"
                    ],
                },                 {
                    "tokenPair": "BTC.b-USDC", // 沒有邏輯用到這個字串，單純是方便你辨識當前任務用的
                    "pairAddress": "0x045838dBfb8026520E872c8298F4Ed542B81Eaca", // pair 的合約地址，你不會更改這個值
                    "singleBatchAmount": 2, // 單次送出的英雄數量
                    "heroes": [ // 這裡面只會寫你自己擁有的 hero id
                        "288259", "289658", "265142", "185295", "274333", "1000000016290"
                    ],
                }
            ]
        },
        "statQuests": [
            {
                "name": "StatQuest_Str", // 有地方會用到這個值，不要更改它
                "heroes": [ // 這裡面只會寫你自己擁有的 hero id
                     "1000000019693", "1000000018159", "1000000029603", "1000000068348", "1000000074412",
                     "1000000017472", "1000000041503", "1000000041547", "1000000043706", "1000000026736",
                     "1000000013079", "1000000019603", "1000000021351", "1000000043720", "248925",
                     "1000000017145", "1000000044252", "1000000045142", "1000000041965", "1000000029772",
                     "1000000047075", "1000000047244", "1000000048340", "1000000048607",
                     "1000000051353", "1000000052246", "1000000024773", "1000000049724",
                     "1000000058157", "1000000059688", "1000000062264"
                ],
                "contractAddress": "0xb8828c687Fb1C875D5acb4281C5CDf9F49fA4637" // 合約的地址，你不會更改這個值
            },
            {
                "name": "StatQuest_Dex", // 有地方會用到這個值，不要更改它
                "heroes": [ // 這裡面只會寫你自己擁有的 hero id
                    "1000000019469", "1000000012231", "1000000021885", "1000000018216", "1000000041938",
                    "1000000049030", "1000000053034", "294416", "1000000068404", "1000000030073"
                ],
                "contractAddress": "0x9ec92963d0387bA57D5f2D505319b1c135C6f1D3" // 合約的地址，你不會更改這個值
            },
            {
                "name": "StatQuest_Agi", // 有地方會用到這個值，不要更改它
                "heroes": [ // 這裡面只會寫你自己擁有的 hero id
                    "298510", "300829", "1000000001443", "1000000061159",
                    "303804", "1000000028133", "1000000037174", "214463", "1000000068248",
                    "51278", "293129", "1000000052561", "285602", "1000000072014"
                ],
                "contractAddress": "0x801b7296f106d8818DA1D04Ed769e5a76e8911fe" // 合約的地址，你不會更改這個值
            },
            {
                "name": "StatQuest_Vit", // 有地方會用到這個值，不要更改它
                "heroes": [ // 這裡面只會寫你自己擁有的 hero id
                    "1000000038262", "1000000043531", "1000000047704", "1000000063769",
                    "1000000048648", "1000000051386", "1000000052634", "1000000052935", "1000000064160",
                    "1000000053380", "1000000055666"
                ],
                "contractAddress": "0xE3edf52D33F2BB05DBdA5BA73903E27a9B9b7e9d" // 合約的地址，你不會更改這個值
            },
            {
                "name": "StatQuest_End", // 有地方會用到這個值，不要更改它
                "heroes": [ // 這裡面只會寫你自己擁有的 hero id
                    "273716", "1000000042880", "1000000058161", "1000000058211", "1000000059559",
										"1000000072029", "1000000074522", "1000000075777"
                ],
                "contractAddress": "0xBD391e4641E1bce989a246602EcDC746efA9d845" // 合約的地址，你不會更改這個值
            },
            {
                "name": "StatQuest_Int", // 有地方會用到這個值，不要更改它
                "heroes": [ // 這裡面只會寫你自己擁有的 hero id
                    "1000000022549", "1000000027870", "1000000030734", "1000000068100",
                    "296669", "1000000047897", "1000000044536", "1000000072500", "1000000075439",
                ],
                "contractAddress": "0xD8cCf866959830a8E397442B5F7DDD790F230962" // 合約的地址，你不會更改這個值
            },
            {
                "name": "StatQuest_Wis", // 有地方會用到這個值，不要更改它
                "heroes": [ // 這裡面只會寫你自己擁有的 hero id
                    "165533", "271802", "272697", "1000000025803", "248208", "1000000040104", "1000000060859",
                    "271465", "285793", "294901", "1000000043421", "1000000066888",
                    "1000000017344", "1000000046668", "1000000047716", "1000000040088"
                ],
                "contractAddress": "0x0832A218c2202088A1800D424248fC689ae74600" // 合約的地址，你不會更改這個值
            },
            {
                "name": "StatQuest_Luk", // 有地方會用到這個值，不要更改它
                "heroes": [ // 這裡面只會寫你自己擁有的 hero id
                    "1000000014120", "208697", "1000000051941", "1000000003004", "62871", "252748",
                    "223260", "171666", "1000000064162", "1000000068214", "1000000069970",
                    "1000000052377"
                ],
                "contractAddress": "0x81fA8a2bfcd703dc83c5d4bEE1075899448A5CdE" // 合約的地址，你不會更改這個值
            }
        ],
    },
    "notForRentHeroIds": [
        // 把你不想出租的英雄 ID 寫在這裡，例如： "1565", "1234" 
    ],
    "notForLevelUpHeroIds": [
        "1716", "1000000064538"// 把你不想自動升級的英雄 ID 寫在這裡，例如： "1716", "123456"
    ],
    "heroForSale": [ // 你想要販售的英雄與價格，price 請填整數，否則會出錯
        // 格式範例 { "id": "1234", "price": 25000 }
        { "id": "1716", "price": 34999 },
        { "id": "221301", "price": 75 },
        { "id": "225412", "price": 75 },
        { "id": "254829", "price": 75 },
        { "id": "268896", "price": 89 },
        { "id": "278579", "price": 85 },
        { "id": "269842", "price": 79 },
        { "id": "218128", "price": 99 },
        { "id": "270338", "price": 85 },
        { "id": "273563", "price": 99 },
        { "id": "275599", "price": 459 },
        { "id": "300829", "price": 85 },
        { "id": "1000000003534", "price": 75 },
        { "id": "1000000011969", "price": 55 },
        { "id": "271802", "price": 85 },
        { "id": "271465", "price": 99 },
        { "id": "287938", "price": 69 },
        { "id": "295105", "price": 89 },
        { "id": "1000000013721", "price": 59 },
        { "id": "276051", "price": 85 },
        { "id": "1000000009224", "price": 75 },
        { "id": "1000000014517", "price": 99 },
        { "id": "295324", "price": 79 },
        { "id": "286148", "price": 79 },
        { "id": "284058", "price": 65 },
        { "id": "165533", "price": 169 },
        { "id": "298531", "price": 79 },
        { "id": "1000000017145", "price": 109 },
        { "id": "273818", "price": 125 },
        { "id": "290011", "price": 79 },
        { "id": "245919", "price": 169 },
        { "id": "1000000004852", "price": 99 },
        { "id": "1000000015992", "price": 79 },
        { "id": "298690", "price": 85 },
        { "id": "230218", "price": 95 },
        { "id": "1000000016958", "price": 139 },
        { "id": "1000000011636", "price": 89 },
        { "id": "303103", "price": 95 },
        { "id": "221872", "price": 89 },
        { "id": "1000000019366", "price": 75 },
        { "id": "302582", "price": 59 },
        { "id": "1000000018930", "price": 59 },
        { "id": "1000000019693", "price": 75 },
        { "id": "1000000018997", "price": 65 },
        { "id": "253125", "price": 65 },
        { "id": "258640", "price": 59 },
        { "id": "1000000017081", "price": 65 },
        { "id": "1000000018159", "price": 55 },
        { "id": "272143", "price": 105 },
        { "id": "263373", "price": 75 },
        { "id": "1000000010242", "price": 79 },
        { "id": "238435", "price": 119 },
        { "id": "271629", "price": 79 },
        { "id": "1000000009838", "price": 79 },
        { "id": "272697", "price": 109 },
        { "id": "1000000027116", "price": 69 },
        { "id": "203884", "price": 75 },
        { "id": "1000000013535", "price": 75 },
        { "id": "258492", "price": 75 },
        { "id": "1000000029762", "price": 65 },
        { "id": "1000000031027", "price": 55 },
        { "id": "1000000051289", "price": 99 },
        { "id": "299123", "price": 399 },
        { "id": "283431", "price": 289 },
        { "id": "293129", "price": 95 },
        { "id": "1000000027759", "price": 65 },
        { "id": "236563", "price": 69 },
        { "id": "1000000044252", "price": 65 },
        { "id": "131880", "price": 199 },
        { "id": "282928", "price": 55 },
        { "id": "1000000015996", "price": 49 },
        { "id": "1000000021634", "price": 59 },
				{ "id": "1000000022107", "price": 55 },
				{ "id": "292069", "price": 59 },
				{ "id": "1000000018965", "price": 65 },
				{ "id": "1000000042563", "price": 39 },
				{ "id": "276709", "price": 59 },
				{ "id": "1000000026652", "price": 55 },
				{ "id": "288226", "price": 109 },
				{ "id": "1000000046811", "price": 39 }
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
		"duelRaffleTicket": "0xBbd7c4Be2e54fF5e013471162e1ABAD7AB74c3C3",
    "availableForSaleTokens": [ // 可自由更改下方 "sale" 裡面的值成 true 或是 false，true 表示要賣，false 的則不會賣掉
        {
            "name": "Ambertaffy",
            "contractAddress": "0xB78d5580d6D897DE60E1A942A5C1dc07Bc716943",
            "sale": true
        },
        {
            "name": "Bluestem",
            "contractAddress": "0x0776b936344DE7bd58A4738306a6c76835ce5D3F",
            "sale": true
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
				"isActive": false, // 表示是否要執行該 type 的 duel，true 的情形就會自動執行
				"heroes": [
					["1716"],
					["233167"],
					["1000000051347"],
					["170607"]
				], // 在這邊寫你想要嘗試送去 duel 的英雄 id solo 範例: [["1234"], ["5678"], ["91011"]]
			},
			{
				"type": "squad", // duel 的類型，你不會更改這個值
				"fee": "low", // 花費幣的數量 low = 0.3 medium = 1.5 large = 3
				"isActive": true, // 表示是否要執行該 type 的 duel，true 的情形就會自動執行
				"heroes": [
					["1000000030460", "285602", "294416"],
					["1000000041659", "1000000064538", "1000000051353"],
					["1000000029707", "1000000038381", "1000000042202"]
				], // 在這邊寫你想要嘗試送去 duel 的英雄 id squad 範例: [["1234", "5678", "91011"], ["121314", "151617", "181920"]]
			},
			{
				"type": "war", // duel 的類型，你不會更改這個值
				"fee": "low", // 花費幣的數量 low = 1 medium = 5 large = 10
				"isActive": false, // 表示是否要執行該 type 的 duel，true 的情形就會自動執行
				"heroes": [], // 在這邊寫你想要嘗試送去 duel 的英雄 id war 範例: [["1234", "5678", "91011", "121314", "151617", "181920", "444", "555", "6666"]]
			}
    ],
		"raffleSetting": { // 會在每個獎池放入 enterAmount 輸入的值，如果抽獎券不夠會直接跳過
			"isActive": true, // 表示是否要執行自動抽獎，true 的情形就會自動執行
			"enterAmount": 50, // 每個獎池放入的券數量
		},
    "maxGasPrice": 8000000000, // 表示你可以接受的最大 baseFee 是多少，當 baseFee 超過這個值時任務腳本就會暫停，6000000000 表示 6 Gwei，請依你的需要調整
    "overBaseGasFeeWei": 550000000, // 表示你願意出高於 baseFee 多少的 gas，理論上這個數字越高你的交易速度就會越快， 110000000 表示 0.11 Gwei，請依你的需要調整
    "listStamina": 24, // 表示當你的英雄體力低於多少時要進行掛售，體力值高於這個設定的英雄如果是下架狀態會等做完任務才會再次上架
  },
  "sendHeroTo": null, // 可以填入一個地址，當完成任務時會把所有完成任務的英雄傳入這個地址，當你要換錢包的時候可以使用這個功能
  "queryHeroEndPoint": "https://us-central1-defi-kingdoms-api.cloudfunctions.net/query_heroes", // 這是 DFK 的資料庫網址，你不應該更改這個值
  "graphqlEndPoint": "https://defi-kingdoms-community-api-gateway-co06z8vi.uc.gateway.dev/graphql", // 這是 DFK 的 graphql 資料庫網址，你不應該更改這個值
  "rentalEstimateAdjustment": 1, // 出租估價完會在乘以這個數，如果覺得估價太低或太高可以調整這個數字
  "unconditionalPurchasePrice": 22, // 當上架的英雄價格低於這個值時會直接購買，不會進入估價邏輯
  "g0ConditionsOfPurchase": 5000, // 當上架的 Gen0 英雄價格低於這個值時會直接嘗試購買，不會進入估價邏輯
  "setQuestScriptTimeSecond": 360, // 設定你每次任務腳本執行的間隔秒數
  "setDuelScriptTimeSecond": 60, // 設定你每次執行 duel 腳本的間隔秒數
  "saleWatcherWalletIndex": 0, // 設定你用於自動購買的 account 是哪一個，如果是 0 就是你寫在 env 的第一個帳號， 1 就是第二個以此類推
	"autoDuelerWalletIndex": 0 // 設定你用於自動 duel 的 account 是哪一個，如果是 0 就是你寫在 env 的第一個帳號， 1 就是第二個以此類推
}

module.exports = config;
