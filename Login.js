  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
  import {
    getFirestore,
    doc,
    getDoc
  } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
  import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signOut
  } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";

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

  const TBuInfo = "CorsoSkills";

  // Auto-logout on load (optional)
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Usuario autenticado previamente. Cerrando sesión...");
      signOut(auth);
    }
  });

  // Password reset function
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

  // Login handler with role detection
  async function loginWithEmailPassword(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const uid = user.uid;

      localStorage.setItem("ActiveLogedin", "true");
      localStorage.setItem("UserUidInfo", uid);

      // Check if the user is a student or a teacher
      const studentDoc = await getDoc(doc(db, "CorsoSkillsStudents", uid));
      const teacherDoc = await getDoc(doc(db, "CorsoSkillsTeacher", uid));
      const AffiliateDoc = await getDoc(doc(db, "CorsoSkillsAffiliate", uid));


      if (studentDoc.exists()) {
        localStorage.setItem("UserRole", "student");
        console.log("Logged in as Student");
         window.location.href = "index5.html";
      } else if (teacherDoc.exists()) {
        localStorage.setItem("UserRole", "teacher");
        console.log("Logged in as Teacher");
        window.location.href = "index5.html";
      } else if (AffiliateDoc.exists()) {
        localStorage.setItem("UserRole", "Affiliate");
        console.log("Logged in as Affiliate");
        window.location.href = "index5.html";
      } else {
        alert("Este usuario no está registrado como estudiante ni como profesor.");
      }

    } catch (error) {
      alert("Usuario o contraseña incorrectos");
      console.error("Login error:", error.message);
    }
  }

  
  // Form submit listener
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    await loginWithEmailPassword(email, password);
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
