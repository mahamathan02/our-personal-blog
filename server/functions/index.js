const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const { v4: uuidv4 } = require("uuid");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// database instance
const db = getFirestore();

exports.testingroute = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    return res.send({ message: "hii" });
  });
});

// create a blog
// POST - title, short_description, content, cover_img, author -> {id, name, profile, email}
exports.createBlog = functions.https.onRequest(async (req, res) => {
  // enable the cross origin
  cors(req, res, async () => {
    const id = uuidv4();
    const timestamp = FieldValue.serverTimestamp();
    const data = {
      id,
      timestamp,
      ...req.body,
    };
    try {
      // adding doc ref to store the data into the firestore
      const collectionRef = db.collection("blogs");
      await collectionRef.doc(id).set(data);

      return res
        .status(200)
        .json({ msg: `${id} has been saved on the cloud`, data });
    } catch (error) {
      return res.status(500).json(error);
    }
  });
});

// getall blogs
exports.blogs = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const collectionRef = db.collection("blogs");
      const query = await collectionRef.orderBy("timestamp", "desc").get();
      const blogs = query.docs.map((doc) => ({ ...doc.data() }));

      return res.status(200).json(blogs);
    } catch (error) {
      return res.status(500).json(error);
    }
  });
});

// get a blog document by its id
exports.getBlogById = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const id = req.query.id;
      if (!id) {
        return res.status(500).json({ msg: "Id Parameter is missing" });
      }

      const docRef = db.collection("blogs").doc(id);
      const snapShot = await docRef.get();

      if (snapShot.exists) {
        return res.status(200).json({ id, blog: snapShot.data() });
      } else {
        return res.status(200).json({ id, msg: "Node Data Found" });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  });
});

// update the blog
exports.updateBlogId = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const id = req.query.id;
      const timestamp = FieldValue.serverTimestamp();
      const data = {
        timestamp,
        ...req.body,
      };
      if (!id) {
        return res.status(500).json({ msg: "Id Parameter is missing" });
      }

      const docRef = db.collection("blogs").doc(id);
      const snapShot = await docRef.get();

      if (snapShot.exists) {
        await docRef.update(data);
        return res.status(200).json("Blog updated successfully");
      } else {
        return res.status(200).json({ id, msg: "Node Data Found" });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  });
});
