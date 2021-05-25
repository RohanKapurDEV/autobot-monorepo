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
  let balance = await utils.getBalanceForAddress(pubkey, denomination);

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

exports.tip = functions.https.onRequest(async (req, res) => {
  let { userType, userId, recipientId, amount, denomination } = req.body;
  let accountsArray = [];

  let userObj = await utils.fetchUserObject(userType, userId);
  let userPubkey = userObj.pubkey;
  let recObj = await utils.fetchUserObject(userType, recipientId);
  let recPubkey = recObj.pubkey;

  let signerAcct = await utils.returnAccountFromId(userType, userId);
  accountsArray.push(signerAcct);

  let toSend = 0;

  if (denomination == "lamports") {
    toSend = amount;
  } else {
    toSend = amount * 1000000000;
  }

  console.log(toSend);

  await utils
    .transferLamports(toSend, userPubkey, recPubkey, accountsArray)
    .then((response) => {
      if (response == undefined) {
        res.send({
          status: true,
        });
      }
    })
    .catch((err) => {
      res.send({
        status: false,
        error: err,
      });
    });
});

// exports.tipToken = functions.https.onRequest(async (req, res) => {});

exports.transfer = functions.https.onRequest(async (req, res) => {
  let { userType, userId, recipientPubkey, amount, denomination } = req.body;
  let accountsArray = [];

  let userObject = await utils.fetchUserObject(userType, userId);
  let userPubkey = userObject.pubkey;
  let signerAcct = await utils.returnAccountFromId(userType, userId);
  accountsArray.push(signerAcct);

  let toSend = 0;

  if (denomination == "lamports") {
    toSend = amount;
  } else {
    toSend = amount * 1000000000;
  }

  await utils
    .transferLamports(toSend, userPubkey, recipientPubkey, accountsArray)
    .then((response) => {
      if (response == undefined) {
        res.send({
          status: true,
        });
      }
    })
    .catch((err) => {
      res.send({
        status: false,
        error: err,
      });
    });
});

// exports.transferToken = functions.https.onRequest(async (req, res) => {});

exports.donate = functions.https.onRequest(async (req, res) => {
  let { userType, userId, amount, denomination } = req.body;
  let accountsArray = [];

  let userPubkey = await utils.getUserPubkeyFromId(userType, userId);
  let recPubkey = "93MXbnWJfz54T3Jphv8KeEcoP7HaeUcYWjxKirnWzHDG";

  accountsArray.push(await utils.returnAccountFromId(userType, userId));

  let toSend = 0;

  if (denomination == "lamports") {
    toSend = amount;
  } else {
    toSend = amount / 1000000000;
  }

  await utils
    .transferLamports(toSend, userPubkey, recPubkey, accountsArray)
    .then((_) => {
      if (res == undefined) {
        res.send({
          status: true,
        });
      }
    })
    .catch((err) => {
      res.send({
        status: false,
        error: err,
      });
    });
});
