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


async function getTeacherContent() {
  try {
    const docRef = doc(db, "CorsoSkillsTeacher", UserUidInfo);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.error("❌ No existe el documento del profesor.");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el documento del profesor:", error);
    return null;
  }
}

// ==========================
// 🔹 Obtener información del negocio (empresa)
// ==========================
async function getCorsoSkillAppContent() {
  try {
    const docRef = doc(db, "CorsoSkillBusiness", TBuInfo);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.error("❌ No existe el documento del negocio.");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el documento del negocio:", error);
    return null;
  }
}

// ==========================
// 🔹 Cargar todo el contenido
// ==========================
async function fetchAllContent() {
  const teacherData = await getTeacherContent();
  const businessData = await getCorsoSkillAppContent();

  if (teacherData) {
    console.log("📘 Datos del Profesor:", teacherData);
  } else {
    console.log("No se encontró información del profesor.");
  }

  if (businessData) {
    console.log("🏢 Datos del Negocio:", businessData);
  } else {
    console.log("No se encontró información del negocio.");
  }

  // ==========================
  // 🔹 Manejar el formulario
  // ==========================
  const saveBtn = document.getElementById("Save-Btn");

  saveBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    // Obtener valores del formulario
    const edad = document.getElementById("edad")?.value.trim();
    const sexo = document.getElementById("sexo")?.value.trim();
    const telefono = document.getElementById("telefono")?.value.trim();
    const imagen = document.getElementById("imagen")?.files[0];
    const zonaHoraria = document.getElementById("zonaHoraria")?.value.trim();
    const puestoActual = document.getElementById("puestoActual")?.value.trim();
    const nivelDificultad = document.getElementById("nivelDificultad")?.value.trim();
    const cuenta = document.getElementById("cuenta")?.value.trim();
    const carrera = document.getElementById("career")?.value.trim();

    // Validar campos requeridos
    if (
      !edad ||
      !sexo ||
      !telefono ||
      !zonaHoraria ||
      !puestoActual ||
      !nivelDificultad ||
      !cuenta ||
      !carrera
    ) {
      alert("⚠️ Por favor completa todos los campos obligatorios del formulario.");
      return;
    }

    // Crear objeto con los datos del formulario
    const formData = {
      edad: parseInt(edad),
      sexo,
      telefono,
      zonaHoraria,
      puestoActual,
      nivelDificultad,
      cuenta,
      carrera,
      school: TBuInfo,
      
      filled: true,
      updatedAt: Timestamp.now(),
    };

    try {
      const docRef = doc(db, "CorsoSkillsTeacher", UserUidInfo);

      // Guardar información principal
      await setDoc(docRef, { 
        
        Personal: formData,
        question: true,
      
      }, { merge: true });

      // Subir imagen si existe
      if (imagen) {
        const storageRef = ref(storage, `teacherImages/${UserUidInfo}.jpg`);
        await uploadBytes(storageRef, imagen);
        const imageURL = await getDownloadURL(storageRef);

        await setDoc(
          docRef,
          { Personal: { imagen: imageURL } },
          { merge: true }
        );
      }

      alert("✅ Información guardada correctamente.");
      window.location.href = "index11.html";
    } catch (error) {
      console.error("❌ Error al guardar los datos:", error);
      alert("Hubo un error al guardar la información. Intenta nuevamente.");
    }
  });
}

// Ejecutar al cargar
fetchAllContent();
document.getElementById("exit-link").addEventListener("click", function () {
  window.location.href = "index4.1.html";
});