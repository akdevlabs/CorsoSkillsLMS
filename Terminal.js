// Import Firebase SDKs
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
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-storage.js";
import { 
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";




// Your Firebase config and initialization
const firebaseConfig = {
  apiKey: "AIzaSyD2w5sXCGRBxne-23FRCTAXQrMwHt4nHTY",
  authDomain: "corsoskills-1ba50.firebaseapp.com",
  projectId: "corsoskills-1ba50",
  storageBucket: "corsoskills-1ba50.appspot.com",
  messagingSenderId: "813928863826",
  appId: "1:813928863826:web:771cd8ad820570441fa78b",
  measurementId: "G-MYT63ZNNCC"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

console.log("🔄 Esperando autenticación de Firebase...");
console.log(auth);
// Get user info from localStorage
const TBuInfo = "CorsoSkills";
const UserUidInfo = localStorage.getItem("UserUidInfo");
const UserRole = localStorage.getItem("UserRole");




onAuthStateChanged(auth, async (user) => {
  console.log("Red");
  console.log(user);
  if (!user) {
    console.warn("❌ Usuario no autenticado. Redirigiendo al login...");
    // window.location.href = "login.html";
    return;
  }

  // 🧠 Leer LocalStorage
  const isLoggedIn = localStorage.getItem("ActiveLogedin");
  const userRole = localStorage.getItem("UserRole");
  const userUid = localStorage.getItem("UserUidInfo");
  const userEmail = localStorage.getItem("UserEmail");
console.log("What:", userUid);
  // 🧾 Mostrar info
  console.log("LocalStorage - ActiveLogedin:", isLoggedIn);
  console.log("LocalStorage - UserRole:", userRole);
  console.log("LocalStorage - UserUidInfo:", userUid);
  console.log("LocalStorage - UserEmail:", userEmail);
  console.log("✅ Usuario autenticado: ", user.email);

  // 🛑 Validación cruzada
  if (isLoggedIn !== "true" || user.uid !== userUid) {
    console.warn("⚠️ Mismatch entre sesión Firebase y localStorage.");
    // window.location.href = "login.html";
    return;
  }

  // 🔄 Cargar datos Firestore
  try {
    const docRef = doc(db, "CorsoSkillsTeacher", user.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.warn("⚠️ Usuario no encontrado en Firestore.");
      return;
    }

    const studentData = docSnap.data();
    console.log("User data for role student:", studentData);

    // 🔁 Login streak
    const loginHistory = studentData.loginHistory || [];
    const today = new Date().toISOString().split("T")[0];
    const lastLogin = loginHistory.at(-1)?.split("T")[0];

    if (lastLogin !== today) {
      loginHistory.push(new Date().toISOString());
      await updateDoc(docRef, {
        loginHistory: loginHistory,
        lastLogin: serverTimestamp(),
      });
      console.log("Login streak updated:", loginHistory.length);
    }
  } catch (err) {
    console.error("❌ Error al cargar datos:", err);
  }
});

async function checkUserRoleAndStoreSession(user) {
  const uid = user.uid;
  const email = user.email.toLowerCase();

  const studentDocRef = doc(db, "CorsoSkillsStudents", uid);
  const teacherDocRef = doc(db, "CorsoSkillsTeacher", uid);
  const affiliateDocRef = doc(db, "CorsoSkillsAffiliate", uid);
  const adminDocRef = doc(db, "CorsoSkillsAdmin", uid); // 🆕 Admin collection reference

  // Get all docs in parallel
  const [studentDoc, teacherDoc, affiliateDoc, adminDoc] = await Promise.all([
    getDoc(studentDocRef),
    getDoc(teacherDocRef),
    getDoc(affiliateDocRef),
    getDoc(adminDocRef) // 🆕 Fetch Admin document
  ]);

  let role = null;
  let roleRef = null;
  let userData = null;

  if (adminDoc.exists()) { // 🆕 Check admin first (highest priority)
    role = "admin";
    roleRef = adminDocRef;
    userData = adminDoc.data();
  } else if (teacherDoc.exists()) {
    role = "teacher";
    roleRef = teacherDocRef;
    userData = teacherDoc.data();
  } else if (affiliateDoc.exists()) {
    role = "affiliate";
    roleRef = affiliateDocRef;
    userData = affiliateDoc.data();
  } else if (studentDoc.exists()) {
    role = "student";
    roleRef = studentDocRef;
    userData = studentDoc.data();
  }

  if (!role) {
    console.warn("⚠️ Usuario no encontrado en Firestore en ninguna colección.");
    alert("Este usuario no está registrado como estudiante, profesor, afiliado o administrador.");
    return null;
  }

  console.log(`✅ Usuario encontrado como ${role}:`, userData);

  // Store session info in localStorage
  localStorage.setItem("ActiveLogedin", "true");
  localStorage.setItem("UserUidInfo", uid);
  localStorage.setItem("UserRole", role);
  localStorage.setItem("UserEmail", email);

  console.log("ActiveLogedin:", localStorage.getItem("ActiveLogedin"));
  console.log("UserUidInfo:", localStorage.getItem("UserUidInfo"));
  console.log("UserRole:", localStorage.getItem("UserRole"));
  console.log("UserEmail:", localStorage.getItem("UserEmail"));

  // Update login activity
  await updateDoc(roleRef, {
    lastLogin: serverTimestamp(),
    loginHistory: arrayUnion(new Date().toISOString())
  });

  return { role, userData };
}















// Branding and styling (your existing code)
async function applyBranding() {
  try {
    const docRef = doc(db, "CorsoSkillBusiness", TBuInfo);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
}
applyBranding().then(data => {
  if (!data) return;
  const { Base, Prime1, Prime2, Prime3, Prime4, Prime5 } = data.BuColors.Colors;

  function renderImage(imageUrl, altUrl, UrlId) {
    const logoElement = document.getElementById(UrlId);
    if (logoElement) {
      logoElement.src = imageUrl;
      logoElement.alt = altUrl;
    } else {
      console.error("Element with ID 'logo' not found.");
    }
  }
  function setBodyBackgroundColor(backgroundColor) {
    document.body.style.backgroundColor = backgroundColor;
  }
  function setTextColors(elementId, Tcolor) {
    const element = document.getElementById(elementId);
    if (element) {
      element.style.color = Tcolor;
    } else {
      console.error(`Element with ID '${elementId}' not found.`);
    }
  }
  function renderLoginColors() {
    renderImage(data.BuLogos.Icons[0], "Bu logo", "Terminal-Img");
    setTextColors("Terminal-text", Base);
    setBodyBackgroundColor(Prime4);
  }
  renderLoginColors();
});

// Data fetching functions for different user roles
async function getTeacherContent() {
  try {
    const docRef = doc(db, "CorsoSkillsTeacher", UserUidInfo);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error("Error fetching teacher document:", error);
    return null;
  }
}
async function getStudentContent() {
  try {
    const docRef = doc(db, "CorsoSkillsStudents", UserUidInfo);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error("Error fetching student document:", error);
    return null;
  }
}
async function getAffiliateContent() {
  try {
    const docRef = doc(db, "CorsoSkillsAffiliate", UserUidInfo);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error("Error fetching affiliate document:", error);
    return null;
  }
}
async function getAdminContent() {
  try {
    const docRef = doc(db, "CorsoSkillsAdmin", UserUidInfo);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error("Error fetching admin document:", error);
    return null;
  }
}

// Login streak calculation function
function calculateLoginStreak(loginHistory) {
  if (!Array.isArray(loginHistory) || loginHistory.length === 0) return 0;

  const dates = loginHistory
    .map(ts => new Date(ts).toDateString())
    .filter((v, i, arr) => arr.indexOf(v) === i)
    .sort((a, b) => new Date(b) - new Date(a));

  let streak = 1;
  const today = new Date().toDateString();

  if (dates[0] !== today) {
    streak = 0;
  }

  for (let i = 0; i < dates.length - 1; i++) {
    const current = new Date(dates[i]);
    const next = new Date(dates[i + 1]);
    const diffInDays = (current - next) / (1000 * 60 * 60 * 24);

    if (diffInDays === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

// Update login streak in Firestore
async function updateLoginStreakInFirestore(uid, roleCollection, loginHistory) {
  try {
    const streak = calculateLoginStreak(loginHistory);
    const userDocRef = doc(db, roleCollection, uid);

    await updateDoc(userDocRef, {
      loginStreak: streak
    });

    console.log("Login streak updated:", streak);
    return streak;
  } catch (error) {
    console.error("Error updating login streak:", error);
    return null;
  }
}

// Main function to fetch user data, update streak, and redirect accordingly
async function fetchUserDataAndRedirect() {
  const UserUidInfo = localStorage.getItem("UserUidInfo");
  const UserRole = localStorage.getItem("UserRole");

  if (!UserUidInfo || !UserRole) {
    console.error("User info missing in localStorage.");
    return;
  }

  try {
    // Fetch user data according to role
    let userData = null;

    if (UserRole === "Admin") {
      userData = await getAdminContent(); // 🆕 Admin content loader
    } else if (UserRole === "teacher") {
      userData = await getTeacherContent();
    } else if (UserRole === "affiliate") {
      userData = await getAffiliateContent();
    } else if (UserRole === "student") {
      userData = await getStudentContent();
    }

    if (!userData) {
      console.error("User data not found for role:", UserRole);
      return;
    }

    console.log(`User data for role ${UserRole}:`, userData);

    // Calculate and update login streak
    const loginHistory = userData.loginHistory || [];
    await updateLoginStreakInFirestore(
      UserUidInfo,
      UserRole === "admin"
        ? "CorsoSkillsAdmin"
        : UserRole === "teacher"
        ? "CorsoSkillsTeacher"
        : UserRole === "affiliate"
        ? "CorsoSkillsAffiliate"
        : "CorsoSkillsStudents",
      loginHistory
    );

    // Wait 3 seconds before redirect
    setTimeout(() => {
      const completed = userData.question;

      if (UserRole === "Admin") {
        // 🆕 Redirect admin
        window.location.href = "index13.html";
      } else if (UserRole === "teacher") {
        window.location.href = completed === true ? "index11.html" : "index5.4.html";
      } else if (UserRole === "affiliate") {
        window.location.href = completed === true ? "index12.html" : "index5.6.html";
      } else if (UserRole === "student") {
        window.location.href = completed === true ? "index10.html" : "index5.2.html";
      } else {
        window.location.href = "index.html";
      }
    }, 3000);

  } catch (error) {
    console.error("Error in fetchUserDataAndRedirect:", error);
  }
}



// Call the main function after page load or when ready
fetchUserDataAndRedirect();

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("✅ Usuario autenticado:", user.uid);
  } else {
    console.log("⚠️ No user session found");
  }
});