const functions = require("firebase-functions");
const { async } = require("regenerator-runtime");
const utils = require("./utils/utils");
const solanaWeb3 = require("@solana/web3.js");

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.balance = functions.https.onRequest(async (req, res) => {
  let { userType, userId, denomination } = req.body;
  let userData = await utils.fetchUserObject(userType, userId);
  let pubkey = userData.pubkey;
  let balance = utils.getBalanceForAddress(pubkey, denomination);

  res.send({
    balance: balance,
    denom: denomination,
  });
});

exports.pubkey = functions.https.onRequest(async (req, res) => {
  let { userType, userId } = req.body;
  let data = await utils.fetchUserObject(userType, userId);
  let pubkey = data.pubkey;

  res.send({
    address: pubkey,
  });
});

exports.userobject = functions.https.onRequest(async (req, res) => {
  let { userType, userId } = req.body;
  let data = await utils.fetchUserObject(userType, userId);

  res.send(data);
});

exports.tip = functions.https.onRequest(async (req, res) => {
  let { userType, userId, receipientId, amount, denomination } = req.body;
  let accountsArray = [];

  let userPubkey = await utils.getUserPubkeyFromId(userType, userId);
  let recPubkey = await utils.getUserPubkeyFromId(userType, receipientId);

  accountsArray.push(await utils.returnAccountFromId(userType, userId));

  const toSend = 0;

  if (denomination == "lamports") {
    toSend = amount;
  } else {
    toSend = amount / 1000000000;
  }

  await utils
    .transferLamports(toSend, userPubkey, recPubkey, accountsArray)
    .then((_) =>
      res.send({
        status: true,
      })
    )
    .catch((err) => {
      res.send({
        status: false,
        error: err,
      });
    });
});

exports.transfer = functions.https.onRequest(async (req, res) => {
  let { userType, userId, receipientPubkey, amount, denomination } = req.body;
  let accountsArray = [];

  let userPubkey = await utils.getUserPubkeyFromId(userType, userId);
  accountsArray.push(await utils.returnAccountFromId(userType, userId));

  const toSend = 0;

  if (denomination == "lamports") {
    toSend = amount;
  } else {
    toSend = amount / 1000000000;
  }

  await utils
    .transferLamports(toSend, userPubkey, receipientPubkey, accountsArray)
    .then((_) =>
      res.send({
        status: true,
      })
    )
    .catch((err) => {
      res.send({
        status: false,
        error: err,
      });
    });
});

exports.donate = functions.https.onRequest(async (req, res) => {
  let { userType, userId, amount, denomination } = req.body;
  let accountsArray = [];

  let userPubkey = await utils.getUserPubkeyFromId(userType, userId);
  let recPubkey = "93MXbnWJfz54T3Jphv8KeEcoP7HaeUcYWjxKirnWzHDG";

  accountsArray.push(await utils.returnAccountFromId(userType, userId));

  const toSend = 0;

  if (denomination == "lamports") {
    toSend = amount;
  } else {
    toSend = amount / 1000000000;
  }

  await utils
    .transferLamports(toSend, userPubkey, recPubkey, accountsArray)
    .then((_) =>
      res.send({
        status: true,
      })
    )
    .catch((err) => {
      res.send({
        status: false,
        error: err,
      });
    });
});
