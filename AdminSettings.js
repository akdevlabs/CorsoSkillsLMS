// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";

import { 
  getFirestore, doc, getDoc, collection, addDoc, setDoc, 
  Timestamp, deleteField, updateDoc, arrayUnion, serverTimestamp 
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

import { 
  getStorage, ref, uploadBytes, getDownloadURL, listAll 
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-storage.js";

import { 
  getAuth, EmailAuthProvider, reauthenticateWithCredential, 
  updateEmail, verifyBeforeUpdateEmail, signInWithEmailAndPassword,  
  sendPasswordResetEmail, confirmPasswordReset, applyActionCode, 
  onAuthStateChanged, signOut, updatePassword   
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";

// Configuración Firebase (tuya)
const firebaseConfig = {
  apiKey: "AIzaSyD2w5sXCGRBxne-23FRCTAXQrMwHt4nHTY",
  authDomain: "corsoskills-1ba50.firebaseapp.com",
  projectId: "corsoskills-1ba50",
  storageBucket: "corsoskills-1ba50.appspot.com",
  messagingSenderId: "813928863826",
  appId: "1:813928863826:web:771cd8ad820570441fa78b",
  measurementId: "G-MYT63ZNNCC"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app, 'gs://corsoskills-1ba50.firebasestorage.app');
const auth = getAuth(app);

//console.log(auth)

const TBuInfo =  "CorsoSkills";  // Example variable (not used in the current code)



async function applyBranding() {
  try {
    const docRef = doc(db, "CorsoSkillBusiness", TBuInfo); // Ensure db and transferredInfo are initialized
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const documentData = docSnap.data();
      return documentData; // Return the document data
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
}
applyBranding().then((data) => {  
  const {Base, Prime, Prime1, Prime2, Prime3, Prime4, Prime5} = data.BuColors.Colors;

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
  function setBackgroundColor(elementId, backgroundColor) {
    const element = document.getElementById(elementId);
    if (element) {
      element.style.backgroundColor = backgroundColor;
    } else {
      console.error(`Element with ID '${elementId}' not found.`);
    }
  }
  function setTextColors(selector, Tcolor) {
  if (selector.startsWith('#')) {
    const element = document.getElementById(selector.slice(1));
    if (element) {
      element.style.color = Tcolor;
    } else {
      console.error(`Element with ID '${selector}' not found.`);
    }
  } else if (selector.startsWith('.')) {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      elements.forEach(el => el.style.color = Tcolor);
    } else {
      console.error(`No elements found with class '${selector}'.`);
    }
  } else {
    console.error("Selector must start with '#' for ID or '.' for class.");
  }
  }
  function setGlobalFont(fontFamily) {
    document.body.style.fontFamily = fontFamily;
  }
  function setallBackgroundColor(selector, backgroundColor) {
    // First check if it's an ID
    if (selector.startsWith("#")) {
      const element = document.getElementById(selector.slice(1));
      if (element) {
        element.style.backgroundColor = backgroundColor;
      } else {
        console.error(`Element with ID '${selector}' not found.`);
      }
    } 
    // If it's a class
    else if (selector.startsWith(".")) {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        elements.forEach(el => el.style.backgroundColor = backgroundColor);
      } else {
        console.error(`No elements with class '${selector}' found.`);
      }
    } 
    // fallback: accept plain string (assume ID)
    else {
      const element = document.getElementById(selector);
      if (element) {
        element.style.backgroundColor = backgroundColor;
      } else {
        console.error(`Element with ID or class '${selector}' not found.`);
      }
    }
  }
  function setBorder(selector, borderStyle) {
    // If it's an ID
    if (selector.startsWith("#")) {
      const element = document.getElementById(selector.slice(1));
      if (element) {
        element.style.border = borderStyle;
      } else {
        console.error(`Element with ID '${selector}' not found.`);
      }
    } 
    // If it's a class
    else if (selector.startsWith(".")) {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        elements.forEach(el => el.style.border = borderStyle);
      } else {
        console.error(`No elements with class '${selector}' found.`);
      }
    } 
    // fallback: assume ID if no # or .
    else {
      const element = document.getElementById(selector);
      if (element) {
        element.style.border = borderStyle;
      } else {
        console.error(`Element with ID or class '${selector}' not found.`);
      }
    }
  }


  function SetMainColors(){
    renderImage(data.BuLogos.Icons[0], "BuLogo", "Bulogos")
    setBodyBackgroundColor(Prime4)
    setallBackgroundColor(".sidebar", Prime5)

  }
  function setSidebarColors() {
    const style = document.createElement("style");
    style.textContent = `
      .sidebar {
        border-right: 1px solid ${Prime3};
      }
      .menu li {
        color: ${Prime};
      }  
      .menu li:hover,
      .menu li.active {
        background-color: ${Base};
        color: ${Prime5};
        border-right: 3px solid ${Prime3};
      } 
    `;
    document.head.appendChild(style);
  }
    function setBodyColors() {
    const style = document.createElement("style");
    style.textContent = `
      /* === HEADER === */
      .header {
        background-color: ${Prime5};
      }
      .header input {
        border: 1px solid  ${Base};
      }
      .profile i {
        color: ${Base};
      }
      .profile .role {
        color: ${Prime3};
      }
      /* Users Section */
      .users {
        background: ${Prime5};
      }
      .users-header h2 {
        color: ${Base};
      }
      .users-header p {
        color: ${Prime};
      }

      
      

    `;
    document.head.appendChild(style);
  }

  SetMainColors()
  setSidebarColors()
  setBodyColors()


});


  for (let i = 1; i <= 7; i++) {
      const colorInput = document.getElementById(`color${i}`);
      const hexInput = document.getElementById(`hex${i}`);

      colorInput.addEventListener("input", () => hexInput.value = colorInput.value);
      hexInput.addEventListener("input", () => {
        if(/^#([0-9A-F]{3}){1,2}$/i.test(hexInput.value)){
          colorInput.value = hexInput.value;
        }
      });
    }
async function getTeacherContent() {
  try {
    const docRef = doc(db, "CorsoSkillsTeacher", UserUidInfo);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.error("No such teacher document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching teacher document:", error);
    return null;
  }
}
async function getCorsoSkillAppContent() {
  try {
    const docRef = doc(db, "CorsoSkillBusiness", TBuInfo);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.error("No such business document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching business document:", error);
    return null;
  }
}
async function fetchAllContent() {
  const TeacherData = await getTeacherContent();
  const businessData = await getCorsoSkillAppContent();

  if (!TeacherData && !businessData) {
    console.error("❌ Could not load teacher or business data");
    return;
  }

  console.log("✅ Teacher Data:", TeacherData);
  console.log("✅ Business Data:", businessData);

  // destructure colors if businessData exists
  let Base, Prime, Prime1, Prime2, Prime3, Prime4, Prime5;
  if (businessData?.BuColors?.Colors) {
    ({ Base, Prime, Prime1, Prime2, Prime3, Prime4, Prime5 } = businessData.BuColors.Colors);
  }

  
  function renderText(text, elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = text;
    } else {
      console.error(`Element with ID "${elementId}" not found.`);
    }
  }







}

fetchAllContent()




  
















document.getElementById("Dashboard").addEventListener("click", function () {
  window.location.href = "index13.html";
});
document.getElementById("UserManagement").addEventListener("click", function () {
  window.location.href = "index13.1.html";
});
document.getElementById("CourseManagement").addEventListener("click", function () {
  window.location.href = "index13.2.html";
});
document.getElementById("Categories").addEventListener("click", function () {
  window.location.href = "index13.3.html";
});
document.getElementById("Groups").addEventListener("click", function () {
  window.location.href = "index13.4.html";
});
document.getElementById("Branches").addEventListener("click", function () {
  window.location.href = "index13.5.html";
});
document.getElementById("Assessment").addEventListener("click", function () {
  window.location.href = "index13.6.html";
});
document.getElementById("QuestionBank").addEventListener("click", function () {
  window.location.href = "index13.7.html";
});
document.getElementById("TrainingManagement").addEventListener("click", function () {
  window.location.href = "index13.8.html";
});
document.getElementById("Files").addEventListener("click", function () {
  window.location.href = "index13.9.html";
});
document.getElementById("Library").addEventListener("click", function () {
  window.location.href = "index13.10.html";
});
document.getElementById("Reports").addEventListener("click", function () {
  window.location.href = "index13.11.html";
});
document.getElementById("Announcements").addEventListener("click", function () {
  window.location.href = "index13.12.html";
});
document.getElementById("Settings").addEventListener("click", function () {
  window.location.href = "index13.13.html";
});