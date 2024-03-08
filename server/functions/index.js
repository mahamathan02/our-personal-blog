const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

admin.initializeApp();

exports.testingroute = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    return res.send({ message: "hii" });
  });
});
