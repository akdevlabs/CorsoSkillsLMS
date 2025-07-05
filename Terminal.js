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

// Get user info from localStorage
const TBuInfo = "CorsoSkills";
const UserUidInfo = localStorage.getItem("UserUidInfo");
const UserRole = localStorage.getItem("UserRole");

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
  if (!UserUidInfo || !UserRole) {
    console.error("User info missing in localStorage.");
    return;
  }

  try {
    // Fetch user data according to role
    let userData = null;
    if (UserRole === "teacher") {
      userData = await getTeacherContent();
    } else if (UserRole === "Affiliate") {
      userData = await getAffiliateContent();
    } else {
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
      UserRole === "teacher"
        ? "CorsoSkillsTeacher"
        : UserRole === "Affiliate"
        ? "CorsoSkillsAffiliate"
        : "CorsoSkillsStudents",
      loginHistory
    );

    // Wait 3 seconds before redirect
    setTimeout(() => {
      const completed = userData.question;
      if (UserRole === "teacher") {
        if (completed === true) {
          window.location.href = "index11.html";
        } else {
          window.location.href = "index5.4.html";
        }
      } else if (UserRole === "Affiliate") {
        if (completed === true) {
          window.location.href = "index12.html";
        } else {
          window.location.href = "index5.6.html";
        }
      } else {
        if (completed === true) {
          window.location.href = "index10.html";
        } else {
          window.location.href = "index6.1.html";
        }
      }
    }, 3000);

  } catch (error) {
    console.error("Error in fetchUserDataAndRedirect:", error);
  }
}


// Call the main function after page load or when ready
fetchUserDataAndRedirect();
