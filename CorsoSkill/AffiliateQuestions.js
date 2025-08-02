// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore, doc, getDoc, collection, addDoc, setDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2w5sXCGRBxne-23FRCTAXQrMwHt4nHTY",
  authDomain: "corsoskills-1ba50.firebaseapp.com",
  projectId: "corsoskills-1ba50",
  storageBucket: "corsoskills-1ba50.appspot.com", // corrected to .com
  messagingSenderId: "813928863826",
  appId: "1:813928863826:web:771cd8ad820570441fa78b",
  measurementId: "G-MYT63ZNNCC"
};

// First, make sure you already have this part:
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const TBuInfo =  "CorsoSkills";  // Example variable (not used in the current code)
const UserUidInfo = localStorage.getItem("UserUidInfo");

console.log(UserUidInfo)

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
  console.log(data.BuLogos.Icons[0])
  const {Base, Prime1, Prime2, Prime3, Prime4, Prime5} = data.BuColors.Colors;
  function setGlobalFont(fontFamily) {
    document.body.style.fontFamily = fontFamily;
  }
  setGlobalFont(data.Font)
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
  function setTextColors(elementId, Tcolor){
    const element = document.getElementById(elementId);
    if (element) {
      element.style.color = Tcolor;
    } else {
      console.error(`Element with ID '${elementId}' not found.`);
    }
  }

  





  function SetMainColors(){
    setBodyBackgroundColor(Prime4)
  }
  function headerColors(){
    renderImage(data.BuLogos.Simple[1], "BuLogo", "header-logo")
    setBackgroundColor("header", Prime5)
    
    

  }
  function setcontainercolor(){
    setTextColors("container", Base)
    setBackgroundColor("next-button", Prime2)
    setTextColors("next-button", Prime5)
  }




  SetMainColors()
  headerColors()
  setcontainercolor()

});


document.addEventListener("DOMContentLoaded", () => {
  const selectComunidad = document.getElementById("comunidad_activa");
  const hiddenBlock = document.getElementById("Following-block");

  selectComunidad.addEventListener("change", (e) => {
    const value = e.target.value;
    if (value === "yes") {
      hiddenBlock.style.display = "block"; // <-- Aquí las comillas
    } else if (value === "no") {
      hiddenBlock.style.display = "none"; // Ocultar si selecciona "no"
    } else {
      console.log("Por favor selecciona una opción válida.");
      hiddenBlock.style.display = "none"; // También ocultar en opción vacía
    }
  });  
});
















async function getTeacherContent() {
  try {
    const docRef = doc(db, "CorsoSkillsTeacher", UserUidInfo);
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
  const teacherData = await getTeacherContent();
  const businessData = await getCorsoSkillAppContent();

  if (teacherData) {
    console.log("Teacher Document Data:", teacherData);
  } else {
    console.log("No teacher data found.");
  }

  if (businessData) {
    console.log("Business Document Data:", businessData);
  } else {
    console.log("No business data found.");
  }

  const { Base, Prime1, Prime2, Prime3, Prime4, Prime5 } = businessData.BuColors.Colors;

}  




document.addEventListener("DOMContentLoaded", () => {
  const comunidadSelect = document.getElementById("comunidad_activa");
  const followingBlock = document.getElementById("Following-block");

  if (comunidadSelect && followingBlock) {
    followingBlock.style.display = "none";

    comunidadSelect.addEventListener("change", (e) => {
      const value = e.target.value;
      if (value === "yes") {
        console.log("red");
        followingBlock.style.display = "block";
      } else {
        console.log("blue");
        followingBlock.style.display = "none";
      }
    });
  }

  // Mostrar inputs personalizados si el checkbox está activado
  const canalCheckboxes = document.querySelectorAll(".checkbox-group .input-wrapper input[type='checkbox']");
  canalCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const input = checkbox.parentElement.nextElementSibling;
      if (input && input.classList.contains("canal-input")) {
        input.style.display = checkbox.checked ? "block" : "none";
        if (!checkbox.checked) input.value = "";
      }
    });
  });

  // Enviar formulario a Firebase
  document.querySelector(".info-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const canales = {};
    document.querySelectorAll(".input-wrapper").forEach(wrapper => {
      const checkbox = wrapper.querySelector("input[type='checkbox']");
      const input = wrapper.querySelector("input[type='text']");
      if (checkbox?.checked && input?.value.trim()) {
        canales[checkbox.value] = input.value.trim();
      }
    });

    // 🔄 Preparar el objeto final
    const data = {
      edad: parseInt(formData.get("edad")) || null,
      telefono: formData.get("telefono") || "",
      ubicacion: formData.get("ubicacion") || "",
      marca: formData.get("marca") || "",
      comunidad_activa: formData.get("comunidad_activa") || "",
      canales_comunidad: formData.get("canales_comunidad") || "",
      seguidores: parseInt(formData.get("seguidores")) || 0,
      nicho: formData.get("nicho") || "",
      objetivo: formData.get("objetivo") || "",
      experiencia: formData.get("experiencia") || "",
      marcas: formData.get("marcas") || "",
      pago: formData.get("pago") || "",
      datos_pago: formData.get("datos_pago") || "",
      terminos: formData.get("terminos") === "on",
      comunicacion: formData.get("comunicacion") === "on",
      canales: canales,
      filled: true,
      updatedAt: Timestamp.now()
    };

    try {
      const userDocRef = doc(db, "CorsoSkillsAffiliate", UserUidInfo); // <-- Asegúrate que UserUidInfo está definido
      await setDoc(userDocRef, data, { merge: true });
      alert("Información guardada correctamente.");
      window.location.href = "index12.html"; // Redirección opcional
    } catch (error) {
      console.error("❌ Error al guardar los datos:", error);
      alert("Hubo un error al guardar la información.");
    }
  });
});