const admin = require("./admin");
const solanaWeb3 = require("@solana/web3.js");
const { v4 } = require("uuid");

const db = admin.db;
const rpc_mainnet = "https://solana-api.projectserum.com";
const rpc_devnet = "https://devnet.solana.com";
/**
 * This function will try to fetch a user object from the users collection. If none is found,
 * then it will create one with the information passed into it.
 *
 * @param {number} userType
 * @param {string} userId
 */
const fetchUserObject = async (userType, userId) => {
  if (userType == 0) {
    const docSnapshot = await db.collection("users").where("discordId", "==", userId).get();

    if (docSnapshot.empty) {
      let keypair = solanaWeb3.Keypair.generate();

      let userObject = {
        id: v4(),
        discordId: userId,
        telegramId: "",
        privateKey: keypair.secretKey,
        pubkey: keypair.publicKey.toString(),
      };

      await db
        .collection("users")
        .add(userObject)
        .catch((err) => console.error(err));

      return (await db.collection("users").where("discordId", "==", userId).get()).docs[0].data();
    } else {
      return docSnapshot.docs[0].data();
    }
  } else {
    // Handle for telegram
  }
};

/**
 *
 * @param {string} address
 * @param {string} denomination
 * @returns {number}
 */
const getBalanceForAddress = async (address, denomination) => {
  let rpc = new solanaWeb3.Connection(rpc_devnet);
  if (denomination == "SOL") {
    return (await rpc.getBalance(new solanaWeb3.PublicKey(address))) / solanaWeb3.LAMPORTS_PER_SOL;
  } else if (denomination == "lamports" || denomination == "lamps") {
    return await rpc.getBalance(new solanaWeb3.PublicKey(address));
  }
};

const transferLamports = async (lamports, senderPubkey, recipientPubkey, accountsArray) => {
  let rpc = new solanaWeb3.Connection(rpc_devnet);
  let sendPubkey = new solanaWeb3.PublicKey(senderPubkey);
  let receivePubkey = new solanaWeb3.PublicKey(recipientPubkey);
  let transferIx = solanaWeb3.SystemProgram.transfer({
    fromPubkey: sendPubkey,
    toPubkey: receivePubkey,
    lamports: lamports,
  });

  let tx = new solanaWeb3.Transaction().add(transferIx);
  await rpc.sendTransaction(tx, accountsArray, { skipPreflight: false, preflightCommitment: "finalized" });
};

const returnAccountFromId = async (accountType, accountId) => {
  if (accountType == 0) {
    // Discord
    const docref = await db.collection("users").where("discordId", "==", accountId).get();
    console.log("disc check");

    if (docref.empty) {
      return false;
    } else {
      let privatekey = docref.docs[0].data().privateKey.toJSON().data;
      return solanaWeb3.Keypair.fromSecretKey(Uint8Array.from(privatekey));
    }
  } else {
    // Telegram
    let docref = await db.collection("users").where("telegramId", "==", accountId).get();
    console.log("tele check");

    if (docref.empty) {
      return false;
    } else {
      let privatekey = docref.docs[0].data().privateKey.toJSON().data;
      return solanaWeb3.Keypair.fromSecretKey(Uint8Array.from(privatekey));
    }
  }
};

const getUserPubkeyFromId = async (userType, userId) => {
  let data = await fetchUserObject(userType, userId);
  return data.pubkey;
};

module.exports = { fetchUserObject, getBalanceForAddress, transferLamports, returnAccountFromId, getUserPubkeyFromId };
