const Admin = require("firebase-admin");

const admin = Admin.initializeApp();
const db = admin.firestore();

module.exports = { db };
