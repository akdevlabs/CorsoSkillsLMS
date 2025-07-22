// Firebase SDK Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { 
  getFirestore, doc, getDoc, updateDoc, serverTimestamp 
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { 
  getAuth, onAuthStateChanged 
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
localStorage.setItem("UserRole", "teacher"); // or "Affiliate" or "student"
// Apply Branding
async function applyBranding() {
  try {
    const docRef = doc(db, "CorsoSkillBusiness", "CorsoSkills");
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return;
    const { Base, Prime4 } = docSnap.data().BuColors.Colors;
    document.body.style.backgroundColor = Prime4;
    document.getElementById("Terminal-text").style.color = Base;
    document.getElementById("Terminal-Img").src = docSnap.data().BuLogos.Icons[0];
  } catch (e) {
    console.error("Branding error:", e);
  }
}
applyBranding();

// Utility: Get user data by role
async function getUserData(uid, role) {
  const path = role === "teacher"
    ? "CorsoSkillsTeacher"
    : role === "Affiliate"
    ? "CorsoSkillsAffiliate"
    : "CorsoSkillsStudents";

  const docRef = doc(db, path, uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}

// Utility: Update login streak
function calculateLoginStreak(history) {
  if (!Array.isArray(history) || history.length === 0) return 0;

  const dates = history
    .map(ts => new Date(ts).toDateString())
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort((a, b) => new Date(b) - new Date(a));

  let streak = dates[0] === new Date().toDateString() ? 1 : 0;

  for (let i = 0; i < dates.length - 1; i++) {
    const curr = new Date(dates[i]);
    const next = new Date(dates[i + 1]);
    if ((curr - next) / (1000 * 60 * 60 * 24) === 1) streak++;
    else break;
  }
  return streak;
}

async function updateLoginStreak(uid, role, history) {
  const path = role === "teacher"
    ? "CorsoSkillsTeacher"
    : role === "Affiliate"
    ? "CorsoSkillsAffiliate"
    : "CorsoSkillsStudents";

  const streak = calculateLoginStreak(history);
  await updateDoc(doc(db, path, uid), { loginStreak: streak });
  return streak;
}

// MAIN: Wait for auth state


// Auth check
onAuthStateChanged(auth, (user) => {
  if (user) {
    const role = localStorage.getItem("UserRole");
    document.getElementById("welcome").innerText = `Bienvenido ${role}`;
    console.log("✅ Authenticated:", user.email);
  } else {
    console.warn("🔐 Not authenticated. Redirecting...");
   // window.location.href = "login.html";
  }
});
console.log(">> BEFORE onAuthStateChanged", auth.currentUser);

onAuthStateChanged(auth, user => {
  console.log("🔐 onAuthStateChanged user:", user);
});
console.log("UserRole in storage:", localStorage.getItem("UserRole"));