const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // download from Firebase console
const fs = require("fs");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const backup = JSON.parse(fs.readFileSync("backup.json", "utf8"));

async function restore() {
  for (const [collectionName, documents] of Object.entries(backup)) {
    const collectionRef = db.collection(collectionName);
    for (const [docId, docData] of Object.entries(documents)) {
      await collectionRef.doc(docId).set(docData);
      console.log(`Restored doc ${docId} in collection ${collectionName}`);
    }
  }
}

restore().then(() => console.log("Restore completed!"));
