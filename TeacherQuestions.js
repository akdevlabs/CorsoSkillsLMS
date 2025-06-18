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
  function setBackgroundColorWithTransparency(elementId, colorName, alpha) {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element with ID '${elementId}' not found.`);
      return;
    }
  
    // Create temporary element to compute RGB value
    const temp = document.createElement('div');
    temp.style.color = colorName;
    document.body.appendChild(temp);
  
    // Get computed RGB color
    const computedColor = window.getComputedStyle(temp).color;
    document.body.removeChild(temp);
  
    // Extract RGB values from string like "rgb(255, 0, 0)"
    const rgbMatch = computedColor.match(/\d+/g);
    if (rgbMatch && rgbMatch.length === 3) {
      const [r, g, b] = rgbMatch;
      element.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    } else {
      console.error(`Could not parse color: ${computedColor}`);
    }
  }
  





  function SetMainColors(){
    setBodyBackgroundColor(Prime4)
  }

  function headerColors(){
    renderImage(data.BuLogos.Simple[1], "BuLogo", "header-logo")
    setBackgroundColor("header", Prime5)
    setBorder("exit-link", `2px solid ${Prime2}`)
    setTextColors("exit-link", Prime2)

  }
  function setcontainercolor(){
    renderImage(data.BuLogos.Icons[0], "BuLogo", "Bulogos")
    setTextColors("container", Base)
    setBackgroundColor("next-button", Prime2)
    setTextColors("next-button", Prime5)




  }




  SetMainColors()
  headerColors()
  setcontainercolor()

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

  
  function renderText(text, elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = text;
    } else {
      console.error(`Element with ID "${elementId}" not found.`);
    }
  }
  function renderWelcome() {
    renderText("¡Hola, " + teacherData.fullName + "!", "wecome-banner-tittle");
  }
  function setupToggleButtons() {
    const toggleCards = document.querySelectorAll('.toggle-btn');

    toggleCards.forEach(card => {
      card.addEventListener('click', () => {
        // Clear styles from all cards
        toggleCards.forEach(c => {
          c.style.backgroundColor = "#f1f1f1";
          c.style.border = "2px solid transparent";
          c.style.color = Base;
          const icon = c.querySelector("i");
          if (icon) icon.style.color = Prime5;
        });

        // Apply active styles to selected card
        card.style.backgroundColor = Prime2;
        card.style.border = `2px solid ${Prime2}`;
        card.style.color = "#ffffff";
        const selectedIcon = card.querySelector("i");
        if (selectedIcon) selectedIcon.style.color = Prime5;
      });
    });
  }

  // Call rendering functions
  renderWelcome();
  setupToggleButtons();
}


const selectedLevels = new Set();

function setupLevelToggleButtons() {
  const buttons = document.querySelectorAll('.level-btn');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const value = button.getAttribute('data-value');

      if (selectedLevels.has(value)) {
        selectedLevels.delete(value);
        button.classList.remove('active');
      } else {
        selectedLevels.add(value);
        button.classList.add('active');
      }

      console.log('Selected Levels:', Array.from(selectedLevels));
    });
  });
}

document.addEventListener("DOMContentLoaded", setupLevelToggleButtons);

document.querySelector(".info-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  // 📝 Get form values
  const edad = document.getElementById("edad").value;
  const sexo = document.getElementById("sexo").value;
  const carrera = document.getElementById("career").value;
  const telefono = document.getElementById("telefono").value;
  const cuenta = document.getElementById("cuenta").value;

  // 🎯 Get selected course level
  let selectedLevel = "";
  document.querySelectorAll(".level-btn").forEach(button => {
    if (button.classList.contains("active")) {
      selectedLevel = button.getAttribute("data-value");
    }
  });

  // 📦 Prepare data to update
  const formData = {
    edad: parseInt(edad),
    sexo: sexo,
    carrera: carrera,
    telefono: telefono,
    cuenta: cuenta,
    nivelCursos: selectedLevel || "No seleccionado",
    question: true,
    school: TBuInfo,
    filled: true,
    updatedAt: Timestamp.now()
  };

  try {
    const docRef = doc(db, "CorsoSkillsTeacher", UserUidInfo);
    await setDoc(docRef, formData, { merge: true });
    alert("Información guardada correctamente.");
     window.location.href = "index11.html"; // Uncomment if needed
  } catch (error) {
    console.error("Error al guardar los datos:", error);
    alert("Hubo un error al guardar la información.");
  }
});



fetchAllContent();