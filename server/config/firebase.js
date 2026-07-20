const admin = require("firebase-admin");

let firebaseConfig;

if (process.env.NODE_ENV === "production") {
  // Render / Production
  firebaseConfig = {
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  };
} else {
  // Local Development
  const serviceAccount = require("../firebase/serviceAccount.json");

  firebaseConfig = {
    credential: admin.credential.cert(serviceAccount),
  };
}

admin.initializeApp(firebaseConfig);

module.exports = admin;
