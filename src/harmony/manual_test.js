const { Harmony } = require('@harmony-js/core');
const {
  ChainID,
  ChainType,
} = require('@harmony-js/utils');
const autils = require("./autils")
const config = require("~/config.js");
const date = require('date-and-time');
const questABI = require("~/abis/QuestCoreV2.json")
const axios = require('axios')

const hmy = new Harmony(
  autils.getRpc(config.harmony.useRpcIndex),
  {
      chainType: ChainType.Harmony,
      chainId: ChainID.HmyMainnet,
  },
);

hmy.wallet.addByPrivateKey(config.privateKey);

async function test() {
}

test();
