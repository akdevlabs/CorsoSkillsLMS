// Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
  arrayUnion
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyD2w5sXCGRBxne-23FRCTAXQrMwHt4nHTY",
  authDomain: "corsoskills-1ba50.firebaseapp.com",
  projectId: "corsoskills-1ba50",
  storageBucket: "corsoskills-1ba50.appspot.com",
  messagingSenderId: "813928863826",
  appId: "1:813928863826:web:771cd8ad820570441fa78b",
  measurementId: "G-MYT63ZNNCC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const TBuInfo = "CorsoSkills";
// Persist login session
setPersistence(auth, browserLocalPersistence).catch(console.error);

// Auto-redirect if already logged in
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // Optional: Verify role again
    const uid = user.uid;
    const roles = [
      { name: "student", ref: doc(db, "CorsoSkillsStudents", uid) },
      { name: "teacher", ref: doc(db, "CorsoSkillsTeacher", uid) },
      { name: "affiliate", ref: doc(db, "CorsoSkillsAffiliate", uid) }
    ];

    for (const role of roles) {
      const snapshot = await getDoc(role.ref);
      if (snapshot.exists()) {
        localStorage.setItem("UserRole", role.name);
        localStorage.setItem("UserUidInfo", uid);
        window.location.href = "index5111111.html";
        return;
      }
    }

    // If no role matched, log out
    auth.signOut();
  }
});

// Login handler
async function loginWithEmailPassword(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;
    localStorage.setItem("UserUidInfo", uid);
    localStorage.setItem("ActiveLogedin", "true");

    const roles = [
      { name: "student", ref: doc(db, "CorsoSkillsStudents", uid) },
      { name: "teacher", ref: doc(db, "CorsoSkillsTeacher", uid) },
      { name: "affiliate", ref: doc(db, "CorsoSkillsAffiliate", uid) }
    ];

    for (const role of roles) {
      const snapshot = await getDoc(role.ref);
      if (snapshot.exists()) {
        localStorage.setItem("UserRole", role.name);

        await updateDoc(role.ref, {
          lastLogin: serverTimestamp(),
          loginHistory: arrayUnion(new Date().toISOString())
        });

        window.location.href = "index5111111.html";
        return;
      }
    }

    alert("Este usuario no tiene un rol válido.");
  } catch (error) {
    alert("Correo o contraseña incorrectos.");
    console.error("Login error:", error.message);
  }
}

// Login form
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  await loginWithEmailPassword(email, password);
});

// Password reset
document.getElementById("forgot").addEventListener("click", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  if (!email) return alert("Por favor ingresa tu correo electrónico.");
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Correo de restablecimiento enviado.");
  } catch (err) {
    alert("Error al enviar el correo: " + err.message);
  }
});


