  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
  import { getFirestore, doc, setDoc, getDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";

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


  const ActiveAcount =  "CorsoSkills"; 


  document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userRef = doc(db, "CorsoSkillsStudents", user.uid);

      const docSnap = await getDoc(userRef);

      const userData = {
        fullName,
        email,
        level:"Beginner",
        role: "Student",
        Uactive: true,
        StudentId: user.uid,
        createdAt: Timestamp.now()
      };

      if (docSnap.exists()) {
        await setDoc(userRef, userData, { merge: true });
      } else {
        await setDoc(userRef, userData);
      }

       alert("¡Registro exitoso!");
      document.getElementById("signupForm").reset();
      window.location.href = "index5.html";

    }catch (error) {
      console.error("Error al registrarse:", error);

      if (error.code === "auth/email-already-in-use") {
        alert("Este correo electrónico ya está en uso. Intenta iniciar sesión o usa otro correo.");
      } else {
        alert("Error: " + error.message);
      }
    }
  });






async function applyBranding() {
  try {
    const docRef = doc(db, "CorsoSkillBusiness", ActiveAcount); // Ensure db and transferredInfo are initialized
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
  if (!data || !data.BuColors || !data.BuColors.Colors) {
    console.error("Datos de branding incompletos o no disponibles.");
    return;
  }
  


  const { Base, Prime1, Prime2, Prime3, Prime4, Prime5 } = data.BuColors.Colors;

  function renderImage(imageUrl, altUrl, UrlId) {
    const logoElement = document.getElementById(UrlId);
    if (logoElement) {
      logoElement.src = imageUrl;
      logoElement.alt = altUrl;
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
    }
  }

  function setTextColors(elementId, Tcolor){
    const element = document.getElementById(elementId);
    if (element) {
      element.style.color = Tcolor;
    }
  }
  function setGlobalFont(fontFamily) {
    document.body.style.fontFamily = fontFamily;
  }
  setGlobalFont(data.Font)

  function renderSignupColors() {
    renderImage(data.BuLogos.Icons[0], "Buissnes Logo", "Bulogo")
    setBodyBackgroundColor(Prime4, Prime2)
    setBackgroundColor("container", Prime5)
    setTextColors("container", Base);
    setTextColors("signupForm-btn", Prime5);
    setBackgroundColor("signupForm-btn", Base)
    setTextColors("add", Prime2);
  }

  renderSignupColors();
});