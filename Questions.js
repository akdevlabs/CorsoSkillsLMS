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
  function setcontainercolor(){
    renderImage(data.BuLogos.Icons[0], "BuLogo", "Bulogos")
    setTextColors("container", Base)
    setBackgroundColor("next-button", Prime2)
    setTextColors("next-button", Prime5)

    setBackgroundColor("Icon-Start", Prime3)
    setBackgroundColor("Icon-Change", Prime3)
    setBackgroundColor("Icon-Grow", Prime3)
    setBackgroundColor("Icon-New", Prime3)


    setBackgroundColor("Start-Carer", Prime5)
    setBackgroundColor("Rol-Change", Prime5)
    setBackgroundColor("Grow-Carer", Prime5)
    setBackgroundColor("New-Carer", Prime5)

    setTextColors("Start-Carer",Base)
    setTextColors("Rol-Change", Base)
    setTextColors("Grow-Carer", Base)
    setTextColors("New-Carer", Base)
  }




  SetMainColors()
  headerColors()
  setcontainercolor()

});

 // Optional: toggle 'active' class on card click
  document.querySelectorAll(".toggle-btn").forEach(card => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".toggle-btn").forEach(c => c.classList.remove("active"));
      card.classList.add("active");
    });
  });






document.addEventListener("DOMContentLoaded", () => {
  let businessData = null;
  let studentData = null;
  let selectedCard = "";
  let selectedCourse = "";
  let currentIndex = 0;
  const itemsPerPage = 10;

  // 🔁 Firebase getters
  async function getstudentContent() {
    try {
      const docRef = doc(db, "CorsoSkillsStudents", UserUidInfo);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data() : null;
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

  // 🔁 Fetch all
  async function fetchAllContent() {
    studentData = await getstudentContent();
    businessData = await getCorsoSkillAppContent();

    if (!studentData || !businessData) return;

    console.log("Student Data:", studentData);
    console.log("Business Data:", businessData);

    const { Base, Prime1, Prime2, Prime3, Prime4, Prime5 } = businessData.BuColors.Colors;

    function renderText(text, elementId) {
      const element = document.getElementById(elementId);
      if (element) element.textContent = text;
    }

    function renderWelcome() {
      renderText("¡Hola, " + studentData.fullName + "!", "wecome-banner-tittle");
    }

    function setupToggleButtons() {
      const toggleCards = document.querySelectorAll(".toggle-btn");

      toggleCards.forEach((card) => {
        card.addEventListener("click", () => {
          toggleCards.forEach((c) => {
            c.classList.remove("active");
            c.style.backgroundColor = "#f1f1f1";
            c.style.border = "2px solid transparent";
            c.style.color = Base;
            const icon = c.querySelector("i");
            if (icon) icon.style.color = Prime5;
          });

          card.classList.add("active");
          card.style.backgroundColor = Prime2;
          card.style.border = `2px solid ${Prime2}`;
          card.style.color = "#ffffff";
          const selectedIcon = card.querySelector("i");
          if (selectedIcon) selectedIcon.style.color = Prime5;

          selectedCard = card.id;
        });
      });
    }

    function renderAllcourses() {
      const all = businessData.Courses.All;
      const container = document.getElementById("coures-List");
      container.innerHTML = "";
      currentIndex = 0;
      renderBatch(all, container);
    }

    function renderBatch(all, container) {
      const endIndex = Math.min(currentIndex + itemsPerPage, all.length);

      for (let i = currentIndex; i < endIndex; i++) {
        const btn = document.createElement("button");
        btn.textContent = all[i];
        btn.className = "course-btn";
        btn.type = "button"; // Prevent form submission

        // 🟩 Handle course selection
        btn.addEventListener("click", (e) => {
          e.preventDefault();

          const allButtons = container.querySelectorAll(".course-btn");
          allButtons.forEach((b) => {
            b.classList.remove("selected");
            b.style.backgroundColor = "";
            b.style.color = "";
          });

          btn.classList.add("selected");
          btn.style.backgroundColor = Prime2;
          btn.style.color = "#fff";
          selectedCourse = btn.textContent;
        });

        container.appendChild(btn);
      }

      currentIndex = endIndex;

      if (currentIndex < all.length) {
        const seeMoreBtn = document.createElement("button");
        seeMoreBtn.textContent = "See More";
        seeMoreBtn.className = "see-more-btn";
        seeMoreBtn.type = "button"; // Prevent form submission
        seeMoreBtn.onclick = () => {
          seeMoreBtn.remove();
          renderBatch(all, container);
        };
        container.appendChild(seeMoreBtn);
      }
    }

   
    setupToggleButtons();
    renderAllcourses();
    checkIfCompleted();
  }

  // 🟩 Handle form step and submission
  const nextQuestionBtn = document.getElementById("next-question-block");
  const nextButton = document.getElementById("next-button");
  const infoBlock1 = document.getElementById("Info-block-1");
  const infoBlock2 = document.getElementById("Info-block-2");

  nextQuestionBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const requiredInputs = infoBlock1.querySelectorAll("input[required], select[required]");
    let allFilled = true;

    requiredInputs.forEach((input) => {
      if (!input.value.trim()) allFilled = false;
    });

    if (!allFilled) {
      alert("Por favor completa todos los campos requeridos.");
      return;
    }

    infoBlock1.style.display = "none";
    infoBlock2.style.display = "flex";
    nextQuestionBtn.style.display = "none";
  });

  nextButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const edad = document.getElementById("edad").value;
    const sexo = document.getElementById("sexo").value;
    const carrera = document.getElementById("carrera").value;
    const puesto = document.getElementById("puesto").value;

    if (!selectedCard || !selectedCourse) {
      alert("Selecciona un objetivo de carrera y un curso.");
      return;
    }

    const formData = {
      edad: parseInt(edad),
      sexo: sexo,
      carrera: carrera,
      puesto: puesto,
      school: TBuInfo,
      objetivoCarrera: selectedCard,
      cursoSeleccionado: selectedCourse,
      question: true,
      filled: true,
    };

    try {
      const docRef = doc(db, "CorsoSkillsStudents", UserUidInfo);
      await setDoc(docRef, formData, { merge: true });
      alert("Información guardada correctamente.");
       window.location.href = "index10.html";
    } catch (error) {
      console.error("Error al guardar los datos:", error);
      alert("Hubo un error al guardar la información.");
    }
  });

  // 🚀 Start
  fetchAllContent();
});


