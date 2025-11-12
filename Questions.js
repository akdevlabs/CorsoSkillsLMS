// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";

import { 
  getFirestore, doc, getDoc,getDocs, collection, addDoc, setDoc, 
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
const UserUidInfo = localStorage.getItem("UserUidInfo");
 console.log(UserUidInfo);
// Initialize Auth



onAuthStateChanged(auth, (user) => {
  if (user) {
    //✅ Authenticated
    console.log("🔐 User is authenticated:");
    console.log("UID:", user.uid);
    console.log("Email:", user.email);

    // Optional: Store in localStorage if needed
    localStorage.setItem("ActiveLogedin", "true");
    localStorage.setItem("UserUidInfo", user.uid);
    localStorage.setItem("UserEmail", user.email);

  } else {
    // ❌ Not authenticated
    console.warn("🚫 Usuario no autenticado. Redirigiendo al login...");
    localStorage.removeItem("ActiveLogedin");
    window.location.href = "login.html"; // or your login route
  }
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
  const {Base,Prime, Prime1, Prime2, Prime3, Prime4, Prime5} = data.BuColors.Colors;
  
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
  function setBorderBottom(elementId, borderStyle) {
    const element = document.getElementById(elementId);
    if (element) {
      element.style.borderBottom = borderStyle;
    } else {
      console.error(`Element with ID '${elementId}' not found.`);
    }
  }
  function setBorder(elementId, borderStyle) {
    const element = document.getElementById(elementId);
    if (element) {
      element.style.border = borderStyle;
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
  





  function SetMainColors(){
    setBodyBackgroundColor(Prime4)
  }

  function headerColors(){
    renderImage(data.BuLogos.Simple[1], "BuLogo", "header-logo")
    setBackgroundColor("header", Prime5)
    setBorder("exit-link", `2px solid ${Prime2}`)
    setTextColors("exit-link", Prime2)

  }
  function settittleblockcolor(){
    renderImage(data.BuLogos.Icons[0], "BuLogo", "Bulogos")
    setTextColors("T1", Prime2)
    setTextColors("T2", Base)



  }

  function setQuestionsColors() {
    const style = document.createElement("style");
    style.textContent = `
      /* === HEADER === */
      .Question label {
        color:${Prime3};
      }
      .Question input,
      .Question select {
        border: 1px solid ${Prime3};
      }    
      .Question input:focus,
      .Question select:focus {
        border-color: ${Prime2};
      }

    `;
    document.head.appendChild(style);
  }
  function setCardsColors() {
    const style = document.createElement("style");
    style.textContent = `
    .Card{
      color: ${Prime5};
      background-color: ${Base};
    }
    .Card:hover{
      background-color: ${Prime1};
    }
    .Card i {
      color: ${Prime5};
    }
    .Card.selected {
      border-color:${Prime5};
      background-color: ${Prime2};
    }  
    #Save-Btn{
      color:${Prime5}
      background-color:${Prime};
    }
    #Save-Btn:hover{
      color: ${Prime5};
      background-color: ${Prime2};
    }
    `;
    document.head.appendChild(style);
  }

  SetMainColors()
  headerColors()
  settittleblockcolor()
  setQuestionsColors()
  setCardsColors()


});


// ==========================
// 🔹 Funciones de Firestore
// ==========================
async function getstudentContent() {
  try {
    const docRef = doc(db, "CorsoSkillsStudents", UserUidInfo);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.error("No such student document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching student document:", error);
    return null;
  }
}

async function getCorsoSkillAppContent() {
  try {
    const docRef = doc(db, "CorsoSkillBusiness", TBuInfo);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error("Error fetching business document:", error);
    return null;
  }
}

// ==========================
// 🔹 Función principal
// ==========================
async function fetchAllContent() {
  let studentData = await getstudentContent();
  let businessData = await getCorsoSkillAppContent();

  if (!studentData || !businessData) return;

  console.log("Student Data:", studentData);
  console.log("Business Data:", businessData);

  // ==========================
  // 🔹 Variables de selección
  // ==========================
  let selectedCard = null;
  let selectedCourse = null; // ✅ Evita el error ReferenceError

  // (Si usas selección visual de cards o cursos, puedes agregarla aquí)
  const cards = document.querySelectorAll(".Card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      cards.forEach((c) => c.classList.remove("selected"));
      card.classList.add("selected");
      selectedCard = card.dataset.value || card.textContent.trim();
    });
  });

  const courses = document.querySelectorAll(".Course");
  courses.forEach((course) => {
    course.addEventListener("click", () => {
      courses.forEach((c) => c.classList.remove("selected"));
      course.classList.add("selected");
      selectedCourse = course.dataset.course || course.textContent.trim();
    });
  });

  // ==========================
  // 🔹 Guardar formulario
  // ==========================
  const SaveBtn = document.getElementById("Save-Btn");
  if (!SaveBtn) {
    console.error("❌ No se encontró el botón con id='Save-Btn'");
    return;
  }

  SaveBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const edad = document.getElementById("edad")?.value.trim();
    const sexo = document.getElementById("sexo")?.value.trim();
    const telefono = document.getElementById("telefono")?.value.trim();
    const Profile = document.getElementById("imagen")?.files[0];
    const zonaHoraria = document.getElementById("zonaHoraria")?.value.trim();
    const puestoActual = document.getElementById("puestoActual")?.value.trim();
    const nivelDificultad = document.getElementById("nivelDificultad")?.value.trim();
    const carrera = document.getElementById("carrera")?.value.trim();

    // ✅ Validar campos obligatorios
    if (
      !edad ||
      !sexo ||
      !telefono ||
      !zonaHoraria ||
      !puestoActual ||
      !nivelDificultad ||
      !carrera
    ) {
      alert("Por favor completa todos los campos obligatorios del formulario.");
      return;
    }

    // ✅ Crear el objeto con los datos
    const formData = {
      edad: parseInt(edad),
      sexo: sexo,
      telefono: telefono,
      zonaHoraria: zonaHoraria,
      puestoActual: puestoActual,
      nivelDificultad: nivelDificultad,
      carrera: carrera,
      school: TBuInfo || null,
      objetivoCarrera: selectedCard || null,
      cursoSeleccionado: selectedCourse || null,
      question: true,
      filled: true,
    };

    try {
      // ✅ Guardar en Firestore
      const docRef = doc(db, "CorsoSkillsStudents", UserUidInfo);

      await setDoc(
        docRef,
        { Personal: formData },
        { merge: true }
      );

      // ✅ Subir imagen si existe
      if (Profile) {
        const storageRef = ref(storage, `studentImages/${UserUidInfo}.jpg`);
        await uploadBytes(storageRef, Profile);
        const imageURL = await getDownloadURL(storageRef);

        await setDoc(
          docRef,
          {
            Personal: { ...formData, Profile: imageURL },
            question: true,
          },
          { merge: true }
        );
      }

      alert("Información guardada correctamente.");
      window.location.href = "index10.html";
    } catch (error) {
      console.error("❌ Error al guardar los datos:", error);
      alert("Hubo un error al guardar la información. Intenta nuevamente.");
    }
  });
}

// Ejecutar todo
fetchAllContent();


document.getElementById("exit-link").addEventListener("click", function () {
  window.location.href = "index4.html";
});