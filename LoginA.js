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
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { setPersistence, browserLocalPersistence} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";

// Firebase config
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
const auth = getAuth(app);
const TBuInfo =  "CorsoSkills"; 

function resetPassword(email) {
  sendPasswordResetEmail(auth, email)
    .then(() => alert("Correo de restablecimiento enviado."))
    .catch((error) => alert("Error: " + error.message));
}

// Forgot password click handler
document.getElementById("forgot").addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  if (email) {
    resetPassword(email);
  } else {
    alert("Por favor ingresa tu correo electrónico primero.");
  }
});



const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      return signInWithEmailAndPassword(auth, email, password);
    })
    .then((userCredential) => {
      const user = userCredential.user;

      // Guardar en localStorage
      localStorage.setItem("ActiveLogedin", "true");
      localStorage.setItem("UserRole", "Admin"); //student o admin, etc., según tu lógica
      localStorage.setItem("UserUidInfo", user.uid);
      localStorage.setItem("UserEmail", user.email.toLowerCase());

      console.log("✅ Login exitoso");
      console.log("UID:", user.uid);
      console.log("Email:", user.email);

      // Redirigir si quieres
          window.location.href = "index5.html";
    })
    .catch((error) => {
      console.error("❌ Error de login:", error.message);
    });
});











  
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
    function setBodyBackgroundColor(backgroundColor, textColor) {
      document.body.style.backgroundColor = backgroundColor;
      document.body.style.color = textColor;
    }
    function setBackgroundColor(elementId, backgroundColor) {
      const element = document.getElementById(elementId);
      if (element) {
        element.style.backgroundColor = backgroundColor;
      } else {
        console.error(`Element with ID '${elementId}' not found.`);
      }
    }
    function setTextColors(elementId, Tcolor){
      const element = document.getElementById(elementId);
      if (element) {
        element.style.color = Tcolor;
      } else {
        console.error(`Element with ID '${elementId}' not found.`);
      }
    }
    function setGlobalFont(fontFamily) {
      document.body.style.fontFamily = fontFamily;
    }
    setGlobalFont(data.Font)
    function renderLoginColors(){
      renderImage(data.BuLogos.Icons[0], "Bu logo" ,"Bulogo");
      setBodyBackgroundColor(Prime4, Prime2)
      setBackgroundColor("container", Prime5)
      setTextColors("container", Base)
      setTextColors("forgot", Prime2)
      setTextColors("add", Prime2)      
      setTextColors("loginForm", Base)
      setTextColors("add", Prime)
      setBackgroundColor("btn-primary", Base)
      setTextColors("btn-primary", Prime5)
    }
  renderLoginColors()
  });



