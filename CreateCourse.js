// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  collection, 
  addDoc, 
  setDoc, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2w5sXCGRBxne-23FRCTAXQrMwHt4nHTY",
  authDomain: "corsoskills-1ba50.firebaseapp.com",
  projectId: "corsoskills-1ba50",
  storageBucket: "corsoskills-1ba50.appspot.com", // must end in .com
  messagingSenderId: "813928863826",
  appId: "1:813928863826:web:771cd8ad820570441fa78b",
  measurementId: "G-MYT63ZNNCC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore instance
const db = getFirestore(app);

// Storage instance
const storage = getStorage(app);

// Get logged-in user ID from local storage
const UserUidInfo = localStorage.getItem("UserUidInfo");

// Optional: define your business unit
const TBuInfo = "CorsoSkills"; // could be used later to create dynamic paths


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
  const {Base, Prime, Prime1, Prime2, Prime3, Prime4, Prime5} = data.BuColors.Colors;
  
  function setBodyBackgroundColor(backgroundColor) {
    document.body.style.backgroundColor = backgroundColor;
  } 
  function renderImage(imageUrl, altUrl, UrlId) {
    const logoElement = document.getElementById(UrlId);
    if (logoElement) {
      logoElement.src = imageUrl;
      logoElement.alt = altUrl;
    } else {
      console.error("Element with ID 'logo' not found.");
    }
  }
  function setBackgroundColor(selector, backgroundColor) {
    if (!selector) return;

    // If selector starts with '.', treat it as a class
    if (selector.startsWith('.')) {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        elements.forEach(el => {
          el.style.backgroundColor = backgroundColor;
        });
      } else {
        console.error(`No elements found with class '${selector}'`);
      }
    }
    // If selector starts with '#', treat it as an ID
    else if (selector.startsWith('#')) {
      const element = document.querySelector(selector);
      if (element) {
        element.style.backgroundColor = backgroundColor;
      } else {
        console.error(`Element with ID '${selector}' not found.`);
      }
    }
    // If no prefix, assume ID (for backward compatibility)
    else {
      const element = document.getElementById(selector);
      if (element) {
        element.style.backgroundColor = backgroundColor;
      } else {
        console.error(`Element with ID '${selector}' not found.`);
      }
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

  function RenderUserInfoColors(){
    setBackgroundColor(".User-Info", Prime)
    setTextColors( ".User-Info", Prime5)
  }
  function RenderNavBlock(){
    renderImage(data.BuLogos.Icons[0], "BuLogo", "Bulogos")
    setBodyBackgroundColor(Prime4)
    setBackgroundColor("#sidebar", Prime5)
  }
  function sidebarcolors(){
    setTextColors(".Side-Btns", Base)
    setTextColors(".fa-solid", Base)
    document.querySelectorAll('.Side-Btns').forEach(button => {
      const icon = button.querySelector('i');
      const text = button.querySelector('.linkName');

      button.addEventListener('mouseenter', () => {
        icon.style.color = Prime2; // Hover color
        text.style.color = Prime2;
      });

      button.addEventListener('mouseleave', () => {
        icon.style.color = Base;// Original color
       text.style.color = ''; // Reset to default (inherited or original)
      });
    });
  }


  function SetCourseCreatorNav(){
    setBackgroundColor('.Course-Nav-block', Prime4)
   setTextColors('.Course-Nav-block', Prime5) 
     
    const style = document.createElement("style");
    style.textContent = `
      #Next-Btn {
        border: 2px solid  ${Prime2};
        color: ${Prime2};
      }
      .CCB.active {
        background-color: ${Base};
        color: ${Prime5};
      }
      .CCB.active {
        background-color: ${Base};
        color:${Prime5};
      }
      @keyframes borderGlow {
        0% { 
          box-shadow: 0 0 0px  ${Prime2};
          border-color:  ${Prime2};
        }
        50% { 
          box-shadow: 0 0 15px  ${Prime2};
          border-color:  ${Prime2};
        }
        100% { 
          box-shadow: 0 0 0px  ${Prime2};
          border-color:  ${Prime2};
        }
      }  
    `;
    document.head.appendChild(style);
 

  }
  function RenderBasicInfo(){
    function SetInputColors(){
      setBackgroundColor("#Title-Input", Prime3)
      const style = document.createElement("style");
      style.textContent = `
        #Title-Input::placeholder{
          color:${Prime5};
        }
        #Title-Input{
          color:${Prime5};
        }
        #Title-Input:focus {
          border-color:${Prime3};
        }
      `;
      document.head.appendChild(style);


    }
    function setPointsColors(){
      setTextColors(".Point",Prime2)
      setTextColors(".Point-Lable", Prime1)
    }
    function SetDropdownColors(){
      const style = document.createElement("style");
      style.textContent = `
        .dropdown {
          color: ${Prime};  
          background: ${Prime5};
          border: 2px solid ${Prime3};
        }
        .dropdown-option:hover {
          background-color:${Prime4};
        }
        .tag {
          background-color: ${Base};
          color: ${Prime5};
        }
        .tag button {
          color: ${Prime5};

        }
        .tag button:hover {
          color: ${Prime2};
        }
        .tag:hover {
          background-color:${Prime1};
        }
      `;
      document.head.appendChild(style);


    }
    function SetDurationColors(){
      const style = document.createElement("style");
      style.textContent = `
        .Duration-Block {
          background: ${Prime5}; 
          border: 1px solid ${Prime1}; 
        }
        .Duration-Block:focus-within {  
          box-shadow: 0 0 0 2px ${Prime3};  
        }
        .Duration-Block input[type="number"] {
          color: ${Prime}; 
        }
        .Duration-Block select {
          color:${Prime2}; 
        }
        .Duration-Block input::placeholder{
          color:${Prime}; 
        }
      `;
      document.head.appendChild(style);


    }
    function SetmultiselectColors(){
      const style = document.createElement("style");
      style.textContent = `
        .Duration-Block {
          background: ${Prime5}; 
          border: 1px solid ${Prime1}; 
        }
        .categoria-selector label {
          color: ${Prime3}; 
        }
        .multi-select {
          border: 1px solid  ${Prime1}; 
          background-color: ${Prime5}; 
        }
        .multi-select:hover {
          border-color: ${Prime3}; 
        }
        .placeholder-text {
          color: ${Prime1}; 
        }
      `;
      document.head.appendChild(style);


    }
    function SetLevelColors(){
      const style = document.createElement("style");
          style.textContent = `
        .Level-Block label {
          color: ${Prime3}; 
        }
        .level-option {
          background-color: ${Prime5}; 
        }
        .level-option:hover {
          background-color: ${Prime5};
          border-color: ${Prime3};
        }
        .level-option input[type="checkbox"] {
          border: 2px solid ${Prime3}; 
        }
        .level-option input[type="checkbox"]:checked {
          border-color:${Base};
          background-color: ${Base};
        }
        .level-option input[type="checkbox"]:checked::after {
          background-color: ${Prime5};
        }
        .level-option input[type="checkbox"]:checked + span {
          color: ${Base};
        }



      `;
          document.head.appendChild(style);
    }
    function SetTagsColors(){
      const style = document.createElement("style");
      style.textContent = `
        #tagInput{
          color: ${Prime3}; 
          background-color: ${Prime5}; 
          border: 2px solid ${Prime1}; 
        }
        #tagInput::placeholder{
          color:${Prime1}; 
        }
        #tagInput:hover {
          border: 1px solid ${Prime3}; 
        }
        #tagList:focus-within {
          background: ${Prime3}; 
          border-color: ${Prime3}; 
        }
        .tag-list div{
          background-color: ${Base}; 
          color: ${Prime5}; 
        }  
        .tag-list div:hover {
          color: ${Prime5}; 
          background-color: ${Prime1}; 
        }
        .tag-list div .remove-tag {
          color:${Prime5}; 
        }  

        .remove-tag {
          color:${Prime5}; 
        }
        .remove-tag:hover {
          color: ${Prime2}; 
        }


      `;
      document.head.appendChild(style);


    }
    function SetDescriptionColors(){
      const style = document.createElement("style");
      style.textContent = `
        #descriptionInput{
          color: ${Prime3}; 
          border: 2px solid ${Prime1}; 
        }
        #descriptionInput:focus {
          border-color:${Prime3}; 
        }

      `;
      document.head.appendChild(style);
    }
    function SetCICBlockColors(){
      const style = document.createElement("style");
      style.textContent = `
        #includeInput {
          color: ${Prime3}; 
          border: 2px solid ${Prime1}; 
        }
        #includeInput:focus {
          border-color:${Prime3}; 
        }
        .include-item {
          color: ${Prime5};
          background: ${Base}; 
        }
        .include-item:hover{
          color: ${Prime5};
          background: ${Prime1};
        }
      `;
      document.head.appendChild(style);
    }
    function SetFileuploadColors(){
      const style = document.createElement("style");
      style.textContent = `
        .upload-box h4 {
          color:${Prime2}; 
        }
        .drop-area {
          border: 2px dashed ${Prime3}; 
          background-color: ${Prime5}; 
        }
        .drop-area.dragover {
          border-color:${Prime2}; 
          background-color: ${Prime4}; 
        }
        .drop-area p {
          color: ${Prime1}; 
        }
        .browse {
          color: ${Prime3}; 
        }
        .drop-area small {
          color:${Prime4}; 
        }
      `;
      document.head.appendChild(style);


    }
    function SetVideoColors(){
      const style = document.createElement("style");
      style.textContent = `

        .video-drop-area {
          border: 2px dashed  ${Prime3}; 
          background-color: ${Prime5}; 
        }
        .video-drop-area:hover {
          border-color: #007bff;
          background-color: #f1f8ff;
        }
        .video-drop-area i {
          color: ${Base}; 
        }

        .video-drop-area p {
          color: ${Prime1}; 
        }

        .video-drop-area small {
          color:${Prime1}; 
        }

        .video-drop-area input {
          border: 1px solid${Prime1}; 
        }

        .video-drop-area input:focus {
          border-color:${Prime3}; 


      `;
      document.head.appendChild(style);


    }

    SetInputColors()
    setPointsColors()
    SetDropdownColors()
    SetDurationColors()
    SetmultiselectColors()
    SetLevelColors()
    SetTagsColors()
    SetDescriptionColors()
    SetCICBlockColors()
    SetFileuploadColors()
    SetVideoColors()
  }
  function RenderContentBlock(){
    function SetStarterPageColors(){
      const style = document.createElement("style");
      style.textContent = `       
        #Starter-Page-Block h1{
          color: ${Base}; 
        }
      #add-module{
          color: ${Prime5}; 
          background-color: ${Prime3}; 
        }
      #add-module:hover {
          background-color: ${Prime1}; 
        }
        #Tema-Title:focus{
          border-color:${Prime3}; 
        }




        .Line{
          background-color: ${Prime}; 
        }
        .Line2{
          background-color: ${Prime2}; 
        }
        .Line3{
          background-color: #b0572e;
        }


      `;
      document.head.appendChild(style);


    }
    function SetModulescontainerColors(){
      const style = document.createElement("style");
      style.textContent = `       
        /*-------- Added-input-Block --------*/
        .Added-input-Block h2{
          color: ${Prime3}; 
        }
        .remove-module{
          color: ${Prime3}; 
        }
        .remove-module:hover{
          color: ${Prime2}; 
        }
        /*-------- module-lesson-block --------*/
        .module-lesson-block input{
          border: 2px solid ${Prime1}; 
        }
        #Titulo-Tema-Input:focus{
          border-color:${Prime3}; 
        }
        .module-lesson-block button{
          color:${Prime5}; 
          background-color: ${Base}; 
        }
        .module-lesson-block button:hover{
          background-color:${Prime1}; 
        }
        /*-------- lessons --------*/
        .Lesson-Point{
          color: ${Prime2}; 
        }
        .Lesson-Point-Lable{
          color:${Prime1}; 
        }
        .input-block textarea{
          border: 2px solid${Prime1}; 
        }
        .input-block textarea:focus{
          border-color:${Prime3}; 
        }
        /*-------- add-btns --------*/
        .add-btns button{
          color: ${Prime5}; 
          background-color: ${Base}; 
        }
        .add-btns button:hover{
          background-color:${Prime3}; 
        }
        /*-------- Up-load-btn --------*/
        .Up-load-btn {
          color: ${Prime3}; 
        }
        .Up-load-btn::before {
          background-color: ${Base}; 
          color: ${Prime5}; 
        }
        .Up-load-btn:hover::before {
          background-color: ${Prime2}; 
        }
        /*-------- Up-load-btn --------*/
        .Added-input-Block button{
          color: ${Base}; 
        }
        .Added-input-Block button:hover{
          color: ${Prime2}; 
        }







      `;
      document.head.appendChild(style);
    }
    function SetHomeworkColors(){
      const style = document.createElement("style");
      style.textContent = `       
      .Tarea-Block a{
        color: ${Base}; 
      }
      #HW-Title{
        color:  ${Prime3};  
        border: 2px solid ${Prime1}; 
      }
      #HW-Title::placeholder{
        color:  ${Prime1};      
      }
      #HW-Title:focus{
        border-color:${Prime3}; 
      }
      #HW-Text{
        color:  ${Prime3};  
        border: 2px solid ${Prime1}; 
      }
      #HW-Text::placeholder{
        color:  ${Prime1};      
      }
      #HW-Text:focus{
        border-color:${Prime3}; 
      }
      .hw-date {
        background-color: ${Prime3};     
        border: 2px solid  ${Prime3};     
        color:${Prime3};  
      }
      .hw-date:hover {
        border-color: ${Prime2};  
      }
      .hw-date:focus {
        border-color: ${Prime2};  
      }
      .hw-date:valid {
        border-color: ${Prime1};  
        background-color: ${Prime5};  
        color: ${Prime1};  
      }
      .hw-files::before {
        color: ${Prime5};
        background-color: ${Prime3};     
      }
      .hw-files:hover::before {
        background-color:${Prime2};    
      }
      .hw-files:active::before {
        background-color: ${Prime4};
      }
      .add-file-input{
        color: ${Prime5};
        background-color: ${Prime3};
      }
      .add-file-input{
        color: ${Prime5};
        background-color: ${Base};
      }
      .add-file-input:hover { 
        background-color: ${Prime1};
      }
      `;
      document.head.appendChild(style);
    } 
    function SetExamColors(){
      const style = document.createElement("style");
      style.textContent = `       
        .exam-title{
          color:${Prime3}; 
          border: 2px solid ${Prime1}; 
        }
        #examTitle:focus {
          border-color:${Prime3}; 
        }
        .exam-buttons button{
          color:${Prime5}; 
          background-color: ${Base};
        }
        .exam-buttons button:hover { 
          background-color: ${Prime3};
        }





      `;
      document.head.appendChild(style);
    } 
    

























    function SetPreviewColors(){
      const style = document.createElement("style");
      style.textContent = `       
        .Preview-Blocks{
          background-color: ${Prime4}; 
        }
        .Preview-Blocks h3{
          color:${Base}; 
        }





      `;
      document.head.appendChild(style);
    } 
    




    SetModulescontainerColors()
    SetStarterPageColors()
    SetHomeworkColors()
SetExamColors()

SetPreviewColors()
  }






  function SetInputBlockColors(){
    setBackgroundColor("#Title-Input", Prime3)
    const style = document.createElement("style");
    style.textContent = `

      .Input-Blocks::-webkit-scrollbar-thumb {
        background-color: ${Prime1};
      }
      .Input-Blocks::-webkit-scrollbar-thumb:hover {
        background-color: ${Prime2};
      }
    `;
    document.head.appendChild(style);


  }

  function SetBIBPreviewColors(){
    setBackgroundColor("#Title-Input", Prime3)
    setTextColors(".fa-eye", Prime2)
    const style = document.createElement("style");
    style.textContent = `
      .Preview-Blocks{
        background-color: ${Prime4};
      }
      .PTB-Left h3{
        color: ${Prime};
      }
      .tool-Side-Btns{
        border: 2px solid ${Base};
        color:${Base};
        background-color:${Prime5};
      }
      .Preview-Title h1{
        color:${Base};
      }
      .Main-divide-left{
        background-color: ${Prime5};
      }
      .tabs-Btns{
        color: ${Prime5};
        background-color: ${Base};
      }
      .Main-divide-right{
        background-color: ${Prime5};
      }
      .Main-divide-right h3{
        color:${Base};
      }
      .instructor h4{
        color:${Prime3};
      }
      #Teacher-Name{
        color:${Prime};
      }
      #BIB-preview{
        color:${Prime2};
        border: 3px solid ${Prime2};
      }

    `;
    document.head.appendChild(style);


  }










 






  setGlobalFont(data.Font)
  RenderUserInfoColors()
  RenderNavBlock()
  sidebarcolors()
 

  SetCourseCreatorNav()
  RenderBasicInfo()
  RenderContentBlock()








});




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
async function getCorsoSkillsClassrooms() {
  try {
    const docRef = doc(db, "CorsoSkillsClassrooms", TBuInfo);
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
  const classroomData = await getCorsoSkillsClassrooms();


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

  if (classroomData) console.log("✅ Classroom Data:", classroomData);
  else console.warn("⚠️ No classroom data found.");

    // Extract business colors if needed
  const { Base, Prime1, Prime2, Prime3, Prime4, Prime5 } = businessData?.BuColors?.Colors || {};

  function renderText(text, elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = text;
    } else {
      console.error(`Element with ID "${elementId}" not found.`);
    }
  }

  function renderWelcome() {
    if (teacherData?.fullName) {
      renderText("Hola, " + teacherData.fullName, "User-Name");
    } else {
      renderText("Missing", "User-Name");
    }
  }
  function renderId() {
    const userIdElement = document.getElementById("User-Id");

    if (teacherData?.TeacherId) {
      const teacherId = teacherData.TeacherId;
      renderText("ID: " + teacherId, "User-Id");

      // Make the ID clickable
      userIdElement.style.cursor = "pointer";
      userIdElement.title = "Haz clic para copiar el ID";

      // Add click event to copy the ID
      userIdElement.addEventListener("click", () => {
        navigator.clipboard.writeText(teacherId).then(() => {
          // Show feedback to the user
          const originalText = userIdElement.textContent;
          userIdElement.textContent = "ID copiado ✅";

          // Restore after 1.5 seconds
          setTimeout(() => {
            userIdElement.textContent = originalText;
          }, 1500);
        });
      });
    } else {
      renderText("Falta ID", "User-Id");
    }
  }
  function renderUserIcon() {
    const container = document.getElementById("profile-Icon");
    if (!container) {
      console.error("Element with ID 'profile-Icon' not found.");
      return;
    }

    if (!teacherData?.profileImg) {
      container.innerHTML = `<i class="fa-solid fa-circle-user" style="font-size: 2rem;"></i>`;
    } else {
      container.innerHTML = `<img src="${teacherData.profileImg}" alt="User Icon" width="50" height="50" style="border-radius: 50%;" />`;
      
    }
  }



  function renderCourseSelector() {
    const AllCourses = businessData.Courses;
    const categorias = Object.keys(AllCourses);

    // Traducciones opcionales
    const traducciones = {
      AI: "Inteligencia Artificial",
      Business: "Negocios",
      Design: "Diseño",
      Finance: "Finanzas",
      Languages: "Idiomas",
      Leadership: "Liderazgo",
      Marketing: "Mercadotecnia",
      Productivity: "Productividad",
      Programming: "Programación",
      Sales: "Ventas",
      Technology: "Tecnología",
      Wellness: "Bienestar"
    };

    const container = document.getElementById("categoriaSelect");
    const selectedContainer = document.getElementById("selectedCategories");

    // Crear dropdown
    const dropdown = document.createElement("div");
    dropdown.classList.add("dropdown");

    // Agregar opciones
    categorias.forEach(cat => {
      const option = document.createElement("div");
      option.classList.add("dropdown-option");
      option.textContent = traducciones[cat] || cat;
      option.dataset.value = cat;
      dropdown.appendChild(option);
    });

    container.appendChild(dropdown);

    // 🔥 Make selected global so other functions (like saveCourseData) can access it
    window.selected = [];

    // Mostrar / ocultar dropdown
    container.addEventListener("click", () => {
      dropdown.classList.toggle("active");
    });

    // Seleccionar categoría
    dropdown.addEventListener("click", (e) => {
      if (e.target.classList.contains("dropdown-option")) {
        const value = e.target.dataset.value;

        // Evitar duplicados
        if (!window.selected.includes(value)) {
          window.selected.push(value);
          renderSelectedTags();
        }
      }
    });

    // Renderizar etiquetas debajo
    function renderSelectedTags() {
      selectedContainer.innerHTML = "";
      window.selected.forEach((value) => {
        const tag = document.createElement("div");
        tag.classList.add("tag");
        tag.textContent = traducciones[value] || value;

        const removeBtn = document.createElement("button");
        removeBtn.innerHTML = "&times;";
        removeBtn.addEventListener("click", () => {
          window.selected = window.selected.filter(v => v !== value);
          renderSelectedTags();
        });

        tag.appendChild(removeBtn);
        selectedContainer.appendChild(tag);
      });
    }

    // Cerrar dropdown al hacer clic fuera
    document.addEventListener("click", (e) => {
      if (!container.contains(e.target)) {
        dropdown.classList.remove("active");
      }
    });
  }
  function renderTeacherNameDescrip(){
    renderText(teacherData.fullName, "Teacher-Name")
    renderText(teacherData.Description, "About-Teacher")
  }
  function hiddeBtn(){
    const nextBtn = document.getElementById("Next-Btn");
    nextBtn.style.display = "none";
  }
  function courseCreateNav(){
    // --- Elements ---
    const navItems = document.querySelectorAll(".CCB-Left .CCB");
    const nextBtn = document.getElementById("Next-Btn");
    const blocks = [
      document.getElementById("Basic-Info-Block-1"),
      document.getElementById("Starter-Page-Block"),
      document.getElementById("Finalizar-Curso-Block"),

    ];

    let currentIndex = 0;

    // --- Activate section by index ---
    function activateSection(index) {
      // Update active nav item
      navItems.forEach((item, i) => {
        item.classList.toggle("active", i === index);
        hiddeBtn()
      });

      // Show corresponding content block
      blocks.forEach((block, i) => {
        block.classList.toggle("active-block", i === index);
        hiddeBtn()
      });

      currentIndex = index;
    }

    // --- Initialize first section ---
    activateSection(0);

    // --- Click on nav item ---
    navItems.forEach((item, index) => {
      item.addEventListener("click", () => activateSection(index));
    });

    // --- Next button ---
    nextBtn.addEventListener("click", () => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= blocks.length) nextIndex = 0; // Loop back to start
      activateSection(nextIndex);
    });


  }
  function renderTags() {
    const tagInput = document.getElementById("tagInput");
    const tagList = document.getElementById("tagList");
    let tags = [];

    // Function to render tags
    function updateTagList() {
      tagList.innerHTML = "";

      tags.forEach((tag, index) => {
        const tagElement = document.createElement("div");
        tagElement.classList.add("Input-Tags"); // ✅ your requested class

        // Optional unique class (for styling or tracking)
        tagElement.classList.add(`Input-Tags-${index + 1}`);

        // Insert tag content
        tagElement.innerHTML = `
          <span class="tag-text">${tag}</span>
          <button class="remove-tag" data-index="${index}" aria-label="Eliminar etiqueta">&times;</button>
        `;

        tagList.appendChild(tagElement);
      });
    }

    // Add tag when pressing Enter
    tagInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && tagInput.value.trim() !== "") {
        e.preventDefault();
        const newTag = tagInput.value.trim();
        if (!tags.includes(newTag)) {
          tags.push(newTag);
          updateTagList();
        }
        tagInput.value = "";
      }
    });

    // Remove tag when clicking ×
    tagList.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-tag")) {
        const index = e.target.getAttribute("data-index");
        tags.splice(index, 1);
        updateTagList();
      }
    });
  }



  function RenderallInputs() {
    // guard to avoid double initialization
    if (RenderallInputs._initialized) return;
    RenderallInputs._initialized = true;

    // ---------- Elements ----------
    const tagInput = document.getElementById("tagInput");
    const tagList = document.getElementById("tagList");
    const includeInput = document.getElementById("includeInput");
    const includeList = document.getElementById("includeList");
    const previewBtn = document.getElementById("BIB-preview");

    // preview targets
    const titleEl = document.getElementById("BIB-Course-Tittle");
    const notesSection = document.getElementById("description-block");
    const courseList = document.getElementById("Course-list");
    const skillLevelEl = document.getElementById("S-Level");
    const durationEl = document.getElementById("C-Durtation");
    const rightDiv = document.querySelector(".Main-divide-right");
    const videoPlayerContainer = document.getElementById("video-player");
    const imagePreviewContainer = document.getElementById("BIB-Course-Img");

    // ---------- State ----------
    let tags = [];

    // ---------- Helpers ----------
    function safeTextFromElement(el) {
      if (!el) return "";
      return Array.from(el.childNodes)
        .filter(n => n.nodeType === Node.TEXT_NODE)
        .map(n => n.textContent)
        .join("")
        .trim();
    }

    function renderTags() {
      if (!tagList) return;
      tagList.innerHTML = "";
      tags.forEach((tag, i) => {
        const tagEl = document.createElement("div");
        tagEl.className = "tag-item";
        const span = document.createElement("span");
        span.className = "tag-text";
        span.textContent = tag;
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "remove-tag";
        btn.dataset.index = String(i);
        btn.innerHTML = "&times;";
        tagEl.appendChild(span);
        tagEl.appendChild(btn);
        tagList.appendChild(tagEl);
      });
    }

    // ---------- Tag input ----------
    if (tagInput) {
      tagInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          const newTag = (tagInput.value || "").trim();
          if (!newTag) return;
          if (!tags.some(t => t.toLowerCase() === newTag.toLowerCase())) {
            tags.push(newTag);
            renderTags();
          }
          tagInput.value = "";
        }
      });
    }

    if (tagList) {
      tagList.addEventListener("click", (e) => {
        const btn = e.target.closest(".remove-tag");
        if (!btn) return;
        const idx = Number(btn.dataset.index);
        if (!Number.isNaN(idx)) {
          tags.splice(idx, 1);
          renderTags();
        }
      });
    }

    // ---------- Include input ----------
    if (includeInput && includeList) {
      includeInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          const val = includeInput.value.trim();
          if (!val) return;
          const div = document.createElement("div");
          div.className = "include-item";
          div.textContent = val;
          includeList.appendChild(div);
          includeInput.value = "";
        }
      });
    }

    // ---------- Categories ----------
    function getSelectedCategories() {
      const selectedContainer = document.getElementById("selectedCategories");
      if (!selectedContainer) return [];
      return Array.from(selectedContainer.querySelectorAll(".tag"))
        .map(n => safeTextFromElement(n))
        .filter(Boolean);
    }

    // ---------- Image input ----------
    const dropImage = document.getElementById("dropImage");
    const browseImage = document.getElementById("browseImage");
    const imageInput = document.getElementById("imageInput");

    if (dropImage && browseImage && imageInput) {
      ["dragenter", "dragover"].forEach(eventName => {
        dropImage.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropImage.classList.add("highlight");
        });
      });

      ["dragleave", "drop"].forEach(eventName => {
        dropImage.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropImage.classList.remove("highlight");
        });
      });

      browseImage.addEventListener("click", () => imageInput.click());

      dropImage.addEventListener("drop", (e) => {
        const file = e.dataTransfer.files[0];
        if (file) imageInput.files = e.dataTransfer.files;
      });
    }

    // ---------- Build preview ----------
    function updatePreview(showAlert = false) {
      const title = (document.getElementById("Title-Input")?.value || "").trim();
      const description = (document.getElementById("descriptionInput")?.value || "").trim();
      const levels = [...document.querySelectorAll('input[name="level"]:checked')]
        .map(el => el.nextElementSibling?.textContent?.trim() || "").filter(Boolean);
      const includes = [...document.querySelectorAll("#includeList .include-item")].map(i => i.textContent.trim());
      const categories = getSelectedCategories();
      const durationValue = (document.getElementById("Duration-Input")?.value || "").trim();
      const durationUnit = (document.getElementById("Duration-Unit")?.value || "").trim();
      const courseDuration = durationValue ? `${durationValue} ${durationUnit}` : "Sin duración";

      // ---------- Text info ----------
      if (titleEl) titleEl.textContent = title || "Sin título";
      if (skillLevelEl) skillLevelEl.textContent = levels.join(", ") || "Sin nivel";
      if (durationEl) durationEl.textContent = courseDuration;
      if (notesSection) notesSection.innerHTML = `<h3>Descripción del Curso</h3><p>${description || "Sin descripción"}</p>`;
      if (courseList) courseList.innerHTML = `
        <h4>Categorías:</h4>
        <ul>${categories.length ? categories.map(c => `<li>${c}</li>`).join("") : "<li>Sin categorías</li>"}</ul>
        <h4>Etiquetas:</h4>
        <ul>${tags.length ? tags.map(t => `<li>${t}</li>`).join("") : "<li>Sin etiquetas</li>"}</ul>
        <h4>Incluye:</h4>
        <ul>${includes.length ? includes.map(i => `<li>${i}</li>`).join("") : "<li>No se ha agregado contenido</li>"}</ul>
      `;

      // ---------- Render image inside #BIB-Course-Img ----------
      if (imageInput?.files?.[0] && imagePreviewContainer) {
        const file = imageInput.files[0];
        const reader = new FileReader();
        reader.onload = (ev) => {
          imagePreviewContainer.innerHTML = `<img src="${ev.target.result}" alt="Imagen del curso" class="preview-image">`;
        };
        reader.readAsDataURL(file);
      }

      // ---------- Render video link inside #video-player ----------
      const videoLink = (document.getElementById("videoLinkInput")?.value || "").trim();
      if (videoPlayerContainer) {
        videoPlayerContainer.innerHTML = "";
        if (videoLink) {
          let embedHTML = "";

          // YouTube link
          if (videoLink.includes("youtube.com") || videoLink.includes("youtu.be")) {
            const videoId = videoLink.split("v=")[1]?.split("&")[0] || videoLink.split("youtu.be/")[1];
            if (videoId) {
              embedHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" 
                frameborder="0" allowfullscreen></iframe>`;
            }
          }
          // Vimeo link
          else if (videoLink.includes("vimeo.com")) {
            const videoId = videoLink.split("vimeo.com/")[1];
            if (videoId) {
              embedHTML = `<iframe src="https://player.vimeo.com/video/${videoId}" width="560" height="315" 
                frameborder="0" allowfullscreen></iframe>`;
            }
          }
          // Generic fallback (non-embed link)
          else {
            embedHTML = `<p><a href="${videoLink}" target="_blank">Ver video promocional</a></p>`;
          }

          videoPlayerContainer.innerHTML = embedHTML;
        } else {
          videoPlayerContainer.innerHTML = "<p>No se ha agregado un video promocional.</p>";
        }
      }

      //if (showAlert) alert("Vista previa generada con éxito 🚀");
    }

    // ---------- Preview button ----------
    if (previewBtn) previewBtn.addEventListener("click", () => updatePreview(true));

    // ---------- Auto-update preview for categories ----------
    const selectedContainer = document.getElementById("selectedCategories");
    if (selectedContainer) {
      const mo = new MutationObserver(() => updatePreview(false));
      mo.observe(selectedContainer, { childList: true, subtree: true });
    }
  }





  
  function CreateCourseId(){
    const courseInfo = teacherData.Courses

    console.log(courseInfo)
    

    function CreateCourseCode( SelectedC, Activelevel) {
      const categori = SelectedC;
      const ALevel = Activelevel;

      if (categori === "AI") {
        if (ALevel === "Beginner") return "BA";
        else if (ALevel === "Intermediate") return "IA";
        else if (ALevel === "Advanced") return "AA";
      } else if (categori === "Business") {
        if (ALevel === "Beginner") return "BB";
        else if (ALevel === "Intermediate") return "IB";
        else if (ALevel === "Advanced") return "AB";
      } else if (categori === "Design") {
        if (ALevel === "Beginner") return "BD";
        else if (ALevel === "Intermediate") return "ID";
        else if (ALevel === "Advanced") return "AD";
      } else if (categori === "Finance") {
        if (ALevel === "Beginner") return "BF";
        else if (ALevel === "Intermediate") return "IF";
        else if (ALevel === "Advanced") return "AF";
      } else if (categori === "Languages") {
        if (ALevel === "Beginner") return "BL";
        else if (ALevel === "Intermediate") return "IL";
        else if (ALevel === "Advanced") return "AL";
      } else if (categori === "Leadership") {
        if (ALevel === "Beginner") return "BLE";
        else if (ALevel === "Intermediate") return "ILE";
        else if (ALevel === "Advanced") return "ALE";
      } else if (categori === "Marketing") {
        if (ALevel === "Beginner") return "BM";
        else if (ALevel === "Intermediate") return "IM";
        else if (ALevel === "Advanced") return "AM";
      } else if (categori === "Productivity") {
        if (ALevel === "Beginner") return "BP";
        else if (ALevel === "Intermediate") return "IP";
        else if (ALevel === "Advanced") return "AP";
      } else if (categori === "Programming") {
        if (ALevel === "Beginner") return "BPR";
        else if (ALevel === "Intermediate") return "IPR";
        else if (ALevel === "Advanced") return "APR";
      } else if (categori === "Sales") {
        if (ALevel === "Beginner") return "BS";
        else if (ALevel === "Intermediate") return "IS";
        else if (ALevel === "Advanced") return "AS";
      } else if (categori === "Technology") {
        if (ALevel === "Beginner") return "BT";
        else if (ALevel === "Intermediate") return "IT";
        else if (ALevel === "Advanced") return "AT";
      } else if (categori === "Wellness") {
        if (ALevel === "Beginner") return "BW";
        else if (ALevel === "Intermediate") return "IW";
        else if (ALevel === "Advanced") return "AW";
      }

        return ""; // fallback
    }

    function Activechecknumber(businessData, SelectedC, Activelevel) {
      const allCourses = businessData?.Courses || {};

          // Helper function
      function getCourseIdsAndNextNumber(coursesObject, prefix) {
        const ids = Object.values(coursesObject)
          .map(course => course.Id)
          .filter(id => id && id.startsWith(prefix));

        if (ids.length === 0) {
          return { ids: [], nextNumber: "01" };
        }

        const numbers = ids.map(id => parseInt(id.replace(/\D/g, ""), 10));
        const maxNum = Math.max(...numbers);
        const nextNumber = (maxNum + 1).toString().padStart(2, "0");

        return { ids, nextNumber };
      }

      const prefix = CreateCourseCode(SelectedC, Activelevel);
      const result = getCourseIdsAndNextNumber(allCourses, prefix);

      return result.nextNumber;
    }

  

    const selectedCategori = selectedCategories;
    const level = levels;
        
    const courseNum =  businessData.Courses
        



    const nextId =
      CreateCourseCode(selectedCategori, level) +
      Activechecknumber(courseNum, selectedCategori, level);

      console.log(nextId); // ✅ "BB03"


  }








  // -------------------- HELPERS (colocar antes de saveCourseData) --------------------
  function CreateCourseCode(SelectedC, Activelevel) {
    const categori = SelectedC;
    const ALevel = Activelevel;

    if (categori === "AI") {
      if (ALevel === "Beginner") return "BA";
      else if (ALevel === "Intermediate") return "IA";
      else if (ALevel === "Advanced") return "AA";
    } else if (categori === "Business") {
      if (ALevel === "Beginner") return "BB";
      else if (ALevel === "Intermediate") return "IB";
      else if (ALevel === "Advanced") return "AB";
    } else if (categori === "Design") {
      if (ALevel === "Beginner") return "BD";
      else if (ALevel === "Intermediate") return "ID";
      else if (ALevel === "Advanced") return "AD";
    } else if (categori === "Finance") {
      if (ALevel === "Beginner") return "BF";
      else if (ALevel === "Intermediate") return "IF";
      else if (ALevel === "Advanced") return "AF";
    } else if (categori === "Languages") {
      if (ALevel === "Beginner") return "BL";
      else if (ALevel === "Intermediate") return "IL";
      else if (ALevel === "Advanced") return "AL";
    } else if (categori === "Leadership") {
      if (ALevel === "Beginner") return "BLE";
      else if (ALevel === "Intermediate") return "ILE";
      else if (ALevel === "Advanced") return "ALE";
    } else if (categori === "Marketing") {
      if (ALevel === "Beginner") return "BM";
      else if (ALevel === "Intermediate") return "IM";
      else if (ALevel === "Advanced") return "AM";
    } else if (categori === "Productivity") {
      if (ALevel === "Beginner") return "BP";
      else if (ALevel === "Intermediate") return "IP";
      else if (ALevel === "Advanced") return "AP";
    } else if (categori === "Programming") {
      if (ALevel === "Beginner") return "BPR";
      else if (ALevel === "Intermediate") return "IPR";
      else if (ALevel === "Advanced") return "APR";
    } else if (categori === "Sales") {
      if (ALevel === "Beginner") return "BS";
      else if (ALevel === "Intermediate") return "IS";
      else if (ALevel === "Advanced") return "AS";
    } else if (categori === "Technology") {
      if (ALevel === "Beginner") return "BT";
      else if (ALevel === "Intermediate") return "IT";
      else if (ALevel === "Advanced") return "AT";
    } else if (categori === "Wellness") {
      if (ALevel === "Beginner") return "BW";
      else if (ALevel === "Intermediate") return "IW";
      else if (ALevel === "Advanced") return "AW";
    }

    return ""; // fallback
  }

  function Activechecknumber(businessData, SelectedC, Activelevel) {
    const allCourses = businessData?.Courses || {};

    const prefix = CreateCourseCode(SelectedC, Activelevel);

    // Buscar todos los IDs que empiecen con el prefijo
    const ids = Object.values(allCourses)
      .map(course => course?.Id || "")
      .filter(id => id && id.startsWith(prefix));

    // Si no hay IDs que empiecen con ese prefijo, regresamos "01"
    if (ids.length === 0) return "01";

    // Tomar el número al final del ID
    const numbers = ids.map(id => {
      const afterPrefix = id.slice(prefix.length);
      const onlyDigits = afterPrefix.replace(/\D/g, "");
      return parseInt(onlyDigits, 10) || 0;
    });

    const maxNum = Math.max(...numbers);
    const nextNumber = (maxNum + 1).toString().padStart(2, "0");
    return nextNumber;
  }
  window.CreateCourseCode = CreateCourseCode;
  window.Activechecknumber = Activechecknumber;


function SetModuleBlock() {
  let moduleCount = 0;

  const modulesContainer = document.getElementById("modules-container");
  const addModuleBtn = document.getElementById("add-module");
  const previewBlock = document.getElementById("modules-Prview-block");

  // ✅ Create first module automatically on load
  createModule(true);

  // Add new modules dynamically
  addModuleBtn.addEventListener("click", () => {
    createModule(true);
    renderPreview();
  });

  // === CREATE MODULE ===
function createModule(isAdded = false, isHidden = true) {
  const moduleDiv = document.createElement("div");
  moduleDiv.classList.add("module");

  moduleDiv.innerHTML = `
    <div class="module-header">
      <div>
        <div class="Added-input-Block">
          <h2 class="module-title"></h2>
          <div  class="Module-Action-Btns">
           <button class="hide-module">-</button>
            ${isAdded ? `<button class="remove-module">×</button>` : ""}
          </div>
        </div>
        <div class="module-lesson-block">
          <input id="Tema-Title" class="Titulo-Tema-Input" type="text" placeholder="Título del Tema" />    
          <button class="add-lesson">+ Agregar Lección</button> 
        </div>
      </div>
    </div>
    <div class="lessons"></div>
    <div class="Line"></div>
  `;

  modulesContainer.appendChild(moduleDiv);

  const addLessonBtn = moduleDiv.querySelector(".add-lesson");
  const lessonsContainer = moduleDiv.querySelector(".lessons");
  const titleInput = moduleDiv.querySelector(".Titulo-Tema-Input");
  const hideBtn = moduleDiv.querySelector(".hide-module");
  const block = moduleDiv.querySelector(".module-lesson-block");

  // === Collapse / Expand functionality ===
  hideBtn.addEventListener("click", () => {
    const isHidden = block.style.display === "none"; // check current state

    if (isHidden) {
      block.style.display = "flex"; // show lesson block
      lessonsContainer.style.display = "block"; // show lessons
      hideBtn.textContent = "-";
    } else {
      block.style.display = "none"; // hide lesson block
      lessonsContainer.style.display = "none"; // hide lessons
      hideBtn.textContent = "+";
    }
  });

  // === Live update on typing ===
  titleInput.addEventListener("input", renderPreview);


    // === Add lesson button ===
    addLessonBtn.addEventListener("click", () => {
      addLesson(lessonsContainer);
      renderPreview();
    })



  // === Remove module button ===
  if (isAdded) {
    const removeModuleBtn = moduleDiv.querySelector(".remove-module");
    removeModuleBtn.addEventListener("click", () => {
      moduleDiv.remove();
      renumberModules();
      renderPreview();
    });
  }

  renumberModules();
  renderPreview();
}

  // === RENUMBER MODULES ===
  function renumberModules() {
    const modules = modulesContainer.querySelectorAll(".module");
    moduleCount = modules.length;
    modules.forEach((mod, index) => {
      const title = mod.querySelector(".module-title");
      if (title) title.textContent = `Módulo ${index + 1}:`;
    });
  }

  // === ADD LESSON ===
  function addLesson(container) {
    const lessonDiv = document.createElement("div");
    lessonDiv.classList.add("lesson");

    lessonDiv.innerHTML = `
      <div class="input-block">
        <div class="Label-Block">
          <label class="Lesson-Point">*</label>
          <label class="Lesson-Point-Lable">Descripción</label>
        </div>
        <textarea rows="3" placeholder="Describe brevemente el tema..."></textarea>
      </div>

      <div class="upload-box">Arrastra y suelta o haz clic para subir archivo</div>
      <div class="upload-progress"></div>

      <div class="add-btns">
        <button class="add-Exam">+ Examen</button>
        <button class="add-video">+ Video</button>
        <button class="add-Subtema">+ Subtema</button>
        <button class="add-description">+ Descripción</button>
        <button class="add-Homework">+ Tarea</button>
        <button class="add-Archivos">+ Archivos</button>
        <button class="add-Live">+ Clase en Vivo</button>
      </div>
      <div class="Line2"></div>
      <div class="dynamic-inputs"></div>
    `;

    container.appendChild(lessonDiv);

    const uploadBox = lessonDiv.querySelector(".upload-box");
    const progressBar = lessonDiv.querySelector(".upload-progress");
    const dynamicContainer = lessonDiv.querySelector(".dynamic-inputs");
    const descArea = lessonDiv.querySelector("textarea");

    descArea.addEventListener("input", renderPreview);
    uploadBox.addEventListener("click", () => {
      simulateUpload(progressBar);
      renderPreview();
    });

    // === Dynamic buttons ===
    lessonDiv.querySelector(".add-Exam").addEventListener("click", () => { addExamInput(dynamicContainer); renderPreview(); });
    lessonDiv.querySelector(".add-video").addEventListener("click", () => { addDynamicInput(dynamicContainer, "Video", "URL del video o descripción"); renderPreview(); });
    lessonDiv.querySelector(".add-Subtema").addEventListener("click", () => { addDynamicInput(dynamicContainer, "Subtema", "Título del subtema"); renderPreview(); });
    lessonDiv.querySelector(".add-description").addEventListener("click", () => { addDynamicInput(dynamicContainer, "Descripción", "Texto descriptivo"); renderPreview(); });
    lessonDiv.querySelector(".add-Homework").addEventListener("click", () => { addHomeworkInput(dynamicContainer); renderPreview(); });
    lessonDiv.querySelector(".add-Archivos").addEventListener("click", () => { addFileInput(dynamicContainer); renderPreview(); });
    lessonDiv.querySelector(".add-Live").addEventListener("click", () => { addLiveInput(dynamicContainer); renderPreview(); });
  }

  // === SIMULATE UPLOAD ===
  function simulateUpload(progressBar) {
    let progress = 0;
    progressBar.style.width = "0";
    const interval = setInterval(() => {
      progress += 5;
      progressBar.style.width = `${progress}%`;
      if (progress >= 100) clearInterval(interval);
    }, 100);
  }

  // === DYNAMIC INPUTS (Homework, Exam, Live, Dynamic, Files) ===
  function addDynamicInput(container, type, placeholder) {
    const block = document.createElement("div");
    block.classList.add("input-block");
    block.innerHTML = `
      <div class="Added-input-Block">
        <div class="Label-Block">
          <label class="Lesson-Point">*</label>
          <label class="Lesson-Point-Lable">${type}</label>
        </div>        
        <button class="remove-btn">×</button>
      </div>
      <input type="text" placeholder="${placeholder}" />
      <div class="Line3"></div>
    `;
    container.appendChild(block);

    const input = block.querySelector("input");
    input.addEventListener("input", renderPreview);
    block.querySelector(".remove-btn").addEventListener("click", () => {
      block.remove();
      renderPreview();
    });
  }

  // === FILE INPUT ===
  function addFileInput(container) {
    const block = document.createElement("div");
    block.classList.add("input-block");
    block.innerHTML = `
      <div class="Added-input-Block">
        <div class="Label-Block">
          <label class="Lesson-Point">*</label>
          <label class="Lesson-Point-Lable">Archivos</label>
        </div>  
        <button class="remove-btn">×</button>
      </div>
      <input class="Up-load-btn" type="file" multiple />
      <div class="Line3"></div>
    `;
    container.appendChild(block);

    const input = block.querySelector("input[type='file']");
    input.addEventListener("change", renderPreview);

    block.querySelector(".remove-btn").addEventListener("click", () => {
      block.remove();
      renderPreview();
    });

    return block;
  }

  // === HOMEWORK INPUT ===
  function addHomeworkInput(container) {
    const block = document.createElement("div");
    block.classList.add("input-block");
    block.innerHTML = `
      <div class="Added-input-Block">
        <div class="Label-Block">
          <label class="Lesson-Point">*</label>
          <label class="Lesson-Point-Lable">Tarea</label>
        </div>  
        <button class="remove-btn">×</button>
      </div>

      <div class="Tarea-Block">
        <div class="Added-input-Block">
          <a>Título de la Tarea</a>
        </div>

        <input type="text" id="HW-Title" class="hw-title" placeholder="Ejemplo: Análisis de Caso - Semana 2" />

        <div class="Added-input-Block">
          <a>Descripción</a>
        </div>
        
        <textarea rows="3" id="HW-Text" class="hw-desc" placeholder="Describe las instrucciones de la tarea..."></textarea>

        <div class="HW-Bottom-Block">

          <div class="B">
            <div class="Added-input-Block">
              <a>Fecha de Entrega</a>
            </div>

            <input type="date" class="hw-date" />
          </div>

          <div class="B"
            <a>Recursos / Archivos Adjuntos</a>
       
            <div class="file-inputs">
              <input type="file" class="hw-files" multiple />
            </div>
          </div>
        </div>

        <button class="add-file-input">+ Agregar Archivo</button>
        <div class="Line3"></div>
      </div>
    `;
    container.appendChild(block);

    // wire events
    block.querySelector(".remove-btn").addEventListener("click", () => {
      block.remove();
      renderPreview();
    });

    const title = block.querySelector(".hw-title");
    const desc = block.querySelector(".hw-desc");
    const date = block.querySelector(".hw-date");
    const files = block.querySelector(".hw-files");
    const addFileBtn = block.querySelector(".add-file-input");
    const fileContainer = block.querySelector(".file-inputs");

    [title, desc, date].forEach(el => el.addEventListener("input", renderPreview));
    files.addEventListener("change", renderPreview);

    addFileBtn.addEventListener("click", () => {
      const newFileInput = document.createElement("input");
      newFileInput.type = "file";
      newFileInput.multiple = true;
      newFileInput.addEventListener("change", renderPreview);
      fileContainer.appendChild(newFileInput);
      renderPreview();
    });
  }

  // === EXAM INPUT ===
  function addExamInput(container) {
    const block = document.createElement("div");
    block.classList.add("input-block");
    block.innerHTML = `
      <div class="Added-input-Block">
        <div class="Label-Block">
          <label class="Lesson-Point">*</label>
          <label class="Lesson-Point-Lable">Título del Examen</label>
        </div>  
        <button class="remove-btn">×</button>
      </div>
      <input type="text" id="examTitle" class="exam-title" placeholder="Ejemplo: Evaluación Final del Módulo" />

      <div class="exam-buttons">
        <button class="exam-mc">Opción Múltiple</button>
        <button class="exam-tf">Verdadero / Falso</button>
        <button class="exam-cc">Examen de Emparejamiento</button>
        <button class="exam-oq">Pregunta Abierta</button>
      </div>
      <div class="exam-questions"></div>
    `;
    container.appendChild(block);

    const removeBtn = block.querySelector(".remove-btn");
    const questionsContainer = block.querySelector(".exam-questions");
    const examTitle = block.querySelector(".exam-title");

    removeBtn.addEventListener("click", () => { block.remove(); renderPreview(); });
    examTitle.addEventListener("input", renderPreview);

    // helper to add a generic question block with listeners
    function wireQuestion(qEl) {
      // add remove behavior to any inner remove buttons
      const rm = qEl.querySelector(".remove-btn");
      if (rm) rm.addEventListener("click", () => { qEl.remove(); renderPreview(); });

      // add input listeners on each input/textarea/select inside the question
      qEl.querySelectorAll("input, textarea, select").forEach(inp => inp.addEventListener("input", renderPreview));
      qEl.querySelectorAll("input[type='file']").forEach(f => f.addEventListener("change", renderPreview));
    }

    // multiple choice
    block.querySelector(".exam-mc").addEventListener("click", () => {
      const q = document.createElement("div");
      q.classList.add("input-block");
      q.innerHTML = `
        <div class="exam-question-block">
          <div class="Added-input-Block">
            <div class="Label-Block">
              <label class="Lesson-Point">*</label>
              <label class="Lesson-Point-Lable">Pregunta de Opción Múltiple</label>
            </div>  
            <button class="remove-btn">×</button>
          </div>

          <input type="text" class="Main-Question" placeholder="Escribe la pregunta..." />
          
          <input class="A1" type="text" placeholder="Opción A" />
          <input class="A2" type="text" placeholder="Opción B" />
          <input class="A3" type="text" placeholder="Opción C" />
          <input class="A4" type="text" placeholder="Opción D" />
        </div>
      `;
      questionsContainer.appendChild(q);
      wireQuestion(q);
      renderPreview();
    });

    // true/false
    block.querySelector(".exam-tf").addEventListener("click", () => {
      const q = document.createElement("div");
      q.classList.add("input-block");
      q.innerHTML = `
        <div class="Added-input-Block">
          <label>Pregunta Verdadero / Falso</label>
          <button class="remove-btn">×</button>
        </div>
        <input type="text" placeholder="Escribe la pregunta..." />
        <select>
          <option value="true">Verdadero</option>
          <option value="false">Falso</option>
        </select>
      `;
      questionsContainer.appendChild(q);
      wireQuestion(q);
      renderPreview();
    });

    // matching
    block.querySelector(".exam-cc").addEventListener("click", () => {
      const q = document.createElement("div");
      q.classList.add("input-block");
      q.innerHTML = `
        <div class="Added-input-Block">
          <label>Examen de Emparejamiento</label>
          <button class="remove-btn">×</button>
        </div>
        <input type="text" placeholder="Elemento Izquierda 1" />
        <input type="text" placeholder="Elemento Derecha 1" />
        <input type="text" placeholder="Elemento Izquierda 2" />
        <input type="text" placeholder="Elemento Derecha 2" />
        <input type="text" placeholder="Elemento Izquierda 3" />
        <input type="text" placeholder="Elemento Derecha 3" />
        <input type="text" placeholder="Elemento Izquierda 4" />
        <input type="text" placeholder="Elemento Derecha 4" />
      `;
      questionsContainer.appendChild(q);
      wireQuestion(q);
      renderPreview();
    });

    // open question
    block.querySelector(".exam-oq").addEventListener("click", () => {
      const q = document.createElement("div");
      q.classList.add("input-block");
      q.innerHTML = `
        <div class="Added-input-Block">
          <label>Pregunta Abierta</label>
          <button class="remove-btn">×</button>
        </div>
        <input type="text" placeholder="Escribe la pregunta..." />
        <textarea rows="2" placeholder="Respuesta esperada"></textarea>
      `;
      questionsContainer.appendChild(q);
      wireQuestion(q);
      renderPreview();
    });
  }

  // === LIVE CLASS INPUT ===
  function addLiveInput(container) {
    const block = document.createElement("div");
    block.classList.add("input-block");
    block.innerHTML = `
      <div class="Added-input-Block">
        <label>Clase en Vivo</label>
        <button class="remove-btn">×</button>
      </div>
      <div class="Added-input-Block"><label>Título de la Clase</label></div>
      <input type="text" class="live-title" placeholder="Ejemplo: Sesión en Vivo - Estrategias de Ventas" />
      <div class="Added-input-Block"><label>Fecha y Hora</label></div>
      <input type="datetime-local" class="live-datetime" />
      <div class="Added-input-Block"><label>Duración (minutos)</label></div>
      <input type="number" class="live-duration" placeholder="60" />
      <div class="Added-input-Block"><label>Descripción</label></div>
      <textarea rows="3" class="live-desc" placeholder="Describe brevemente la clase..."></textarea>
      <div class="Added-input-Block"><label>Recursos / Archivos</label></div>
      <div class="file-inputs"><input type="file" class="live-files" multiple /></div>
      <button class="add-file-input">+ Recursos / Archivo</button>
    `;
    container.appendChild(block);

    block.querySelector(".remove-btn").addEventListener("click", () => { block.remove(); renderPreview(); });

    const title = block.querySelector(".live-title");
    const datetime = block.querySelector(".live-datetime");
    const duration = block.querySelector(".live-duration");
    const desc = block.querySelector(".live-desc");
    const files = block.querySelector(".live-files");
    const addFileBtn = block.querySelector(".add-file-input");
    const fileContainer = block.querySelector(".file-inputs");

    [title, datetime, duration, desc].forEach(el => el.addEventListener("input", renderPreview));
    files.addEventListener("change", renderPreview);

    addFileBtn.addEventListener("click", () => {
      const newFileInput = document.createElement("input");
      newFileInput.type = "file";
      newFileInput.multiple = true;
      newFileInput.addEventListener("change", renderPreview);
      fileContainer.appendChild(newFileInput);
      renderPreview();
    });
  }

  // === RENDER PREVIEW ===
  function renderPreview() {
    previewBlock.innerHTML = "";
    const modules = document.querySelectorAll(".module");

    if (modules.length === 0) {
      previewBlock.innerHTML = `<p style="color:#999;">No hay módulos para mostrar.</p>`;
      return;
    }

    modules.forEach((module, i) => {
      const moduleTitle = module.querySelector(".Titulo-Tema-Input")?.value || `Módulo ${i + 1}`;
      const modulePreview = document.createElement("div");
      modulePreview.classList.add("preview-module");
      modulePreview.innerHTML = `<h2>${moduleTitle}</h2>`;

      const lessons = module.querySelectorAll(".lesson");
      lessons.forEach((lesson, index) => {
        const desc = lesson.querySelector("textarea")?.value || "";
        const lessonPreview = document.createElement("div");
        lessonPreview.classList.add("preview-lesson");
        lessonPreview.innerHTML = `
          <h3>Lección ${index + 1}</h3>
          ${desc ? `<p>${desc}</p>` : ""}
        `;

        const dynamicInputs = lesson.querySelectorAll(".dynamic-inputs .input-block");
        dynamicInputs.forEach((inputBlock) => {
          const label = inputBlock.querySelector("label")?.textContent || "";
          const input = inputBlock.querySelector("input, textarea, select");
          let value = "";

          // handle file lists (multiple inputs possible)
          const fileInputs = inputBlock.querySelectorAll("input[type='file']");
          if (fileInputs.length) {
            const names = [];
            fileInputs.forEach(fi => {
              if (fi.files && fi.files.length) {
                Array.from(fi.files).forEach(f => names.push(f.name));
              }
            });
            value = names.join(", ") || "No se seleccionaron archivos.";
          } else if (input) {
            value = input.value || "";
          } else {
            // fallback: collect textareas/selects inside
            const ta = inputBlock.querySelector("textarea");
            const sel = inputBlock.querySelector("select");
            if (ta) value = ta.value || "";
            else if (sel) value = sel.value || "";
          }

          if (value && value.toString().trim()) {
            lessonPreview.innerHTML += `<p><strong>${label}:</strong> ${value}</p>`;
          }
        });

        modulePreview.appendChild(lessonPreview);
      });

      previewBlock.appendChild(modulePreview);
    });

    // optionally scroll preview into view
    // previewBlock.scrollIntoView({ behavior: 'smooth' });
  }
}









  function RenderNOW() {
    // guard to avoid double initialization
    if (RenderallInputs._initialized) return;
    RenderallInputs._initialized = true;

    // ---------- Elements ----------
    const tagInput = document.getElementById("tagInput");
    const tagList = document.getElementById("tagList");
    const includeInput = document.getElementById("includeInput");
    const includeList = document.getElementById("includeList");
    const previewBtn = document.getElementById("BIB-preview");

    // preview targets
    const titleEl = document.getElementById("BIB-Course-Tittle");
    const notesSection = document.getElementById("description-block");
    const courseList = document.getElementById("Course-list");
    const skillLevelEl = document.getElementById("S-Level");
    const durationEl = document.getElementById("C-Durtation");
    const rightDiv = document.querySelector(".Main-divide-right");
    const videoPlayerContainer = document.getElementById("video-player");
    const imagePreviewContainer = document.getElementById("BIB-Course-Img");

    // ---------- State ----------
    let tags = [];

    // ---------- Helpers ----------
    function safeTextFromElement(el) {
      if (!el) return "";
      return Array.from(el.childNodes)
        .filter(n => n.nodeType === Node.TEXT_NODE)
        .map(n => n.textContent)
        .join("")
        .trim();
    }

    function renderTags() {
      if (!tagList) return;
      tagList.innerHTML = "";
      tags.forEach((tag, i) => {
        const tagEl = document.createElement("div");
        tagEl.className = "tag-item";
        const span = document.createElement("span");
        span.className = "tag-text";
        span.textContent = tag;
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "remove-tag";
        btn.dataset.index = String(i);
        btn.innerHTML = "&times;";
        tagEl.appendChild(span);
        tagEl.appendChild(btn);
        tagList.appendChild(tagEl);
      });
    }

    // ---------- Tag input ----------
    if (tagInput) {
      tagInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          const newTag = (tagInput.value || "").trim();
          if (!newTag) return;
          if (!tags.some(t => t.toLowerCase() === newTag.toLowerCase())) {
            tags.push(newTag);
            renderTags();
          }
          tagInput.value = "";
        }
      });
    }

    if (tagList) {
      tagList.addEventListener("click", (e) => {
        const btn = e.target.closest(".remove-tag");
        if (!btn) return;
        const idx = Number(btn.dataset.index);
        if (!Number.isNaN(idx)) {
          tags.splice(idx, 1);
          renderTags();
        }
      });
    }

    // ---------- Include input ----------
    if (includeInput && includeList) {
      includeInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          const val = includeInput.value.trim();
          if (!val) return;
          const div = document.createElement("div");
          div.className = "include-item";
          div.textContent = val;
          includeList.appendChild(div);
          includeInput.value = "";
        }
      });
    }

    // ---------- Categories ----------
    function getSelectedCategories() {
      const selectedContainer = document.getElementById("selectedCategories");
      if (!selectedContainer) return [];
      return Array.from(selectedContainer.querySelectorAll(".tag"))
        .map(n => safeTextFromElement(n))
        .filter(Boolean);
    }

    // ---------- Image input ----------
    const dropImage = document.getElementById("dropImage");
    const browseImage = document.getElementById("browseImage");
    const imageInput = document.getElementById("imageInput");

    if (dropImage && browseImage && imageInput) {
      ["dragenter", "dragover"].forEach(eventName => {
        dropImage.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropImage.classList.add("highlight");
        });
      });

      ["dragleave", "drop"].forEach(eventName => {
        dropImage.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropImage.classList.remove("highlight");
        });
      });

      browseImage.addEventListener("click", () => imageInput.click());

      dropImage.addEventListener("drop", (e) => {
        const file = e.dataTransfer.files[0];
        if (file) imageInput.files = e.dataTransfer.files;
      });
    }

    // ---------- Build preview ----------
    function updatePreview(showAlert = false) {
      const title = (document.getElementById("Title-Input")?.value || "").trim();
      const description = (document.getElementById("descriptionInput")?.value || "").trim();
      const levels = [...document.querySelectorAll('input[name="level"]:checked')]
        .map(el => el.nextElementSibling?.textContent?.trim() || "").filter(Boolean);
      const includes = [...document.querySelectorAll("#includeList .include-item")].map(i => i.textContent.trim());
      const categories = getSelectedCategories();
      const durationValue = (document.getElementById("Duration-Input")?.value || "").trim();
      const durationUnit = (document.getElementById("Duration-Unit")?.value || "").trim();
      const courseDuration = durationValue ? `${durationValue} ${durationUnit}` : "Sin duración";

      // ---------- Text info ----------
      if (titleEl) titleEl.textContent = title || "Sin título";
      if (skillLevelEl) skillLevelEl.textContent = levels.join(", ") || "Sin nivel";
      if (durationEl) durationEl.textContent = courseDuration;
      if (notesSection) notesSection.innerHTML = `<h3>Descripción del Curso</h3><p>${description || "Sin descripción"}</p>`;
      if (courseList) courseList.innerHTML = `
        <h4>Categorías:</h4>
        <ul>${categories.length ? categories.map(c => `<li>${c}</li>`).join("") : "<li>Sin categorías</li>"}</ul>
        <h4>Etiquetas:</h4>
        <ul>${tags.length ? tags.map(t => `<li>${t}</li>`).join("") : "<li>Sin etiquetas</li>"}</ul>
        <h4>Incluye:</h4>
        <ul>${includes.length ? includes.map(i => `<li>${i}</li>`).join("") : "<li>No se ha agregado contenido</li>"}</ul>
      `;

      // ---------- Render image inside #BIB-Course-Img ----------
      if (imageInput?.files?.[0] && imagePreviewContainer) {
        const file = imageInput.files[0];
        const reader = new FileReader();
        reader.onload = (ev) => {
          imagePreviewContainer.innerHTML = `<img src="${ev.target.result}" alt="Imagen del curso" class="preview-image">`;
        };
        reader.readAsDataURL(file);
      }

      // ---------- Render video link inside #video-player ----------
      const videoLink = (document.getElementById("videoLinkInput")?.value || "").trim();
      if (videoPlayerContainer) {
        videoPlayerContainer.innerHTML = "";
        if (videoLink) {
          let embedHTML = "";

          // YouTube link
          if (videoLink.includes("youtube.com") || videoLink.includes("youtu.be")) {
            const videoId = videoLink.split("v=")[1]?.split("&")[0] || videoLink.split("youtu.be/")[1];
            if (videoId) {
              embedHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" 
                frameborder="0" allowfullscreen></iframe>`;
            }
          }
          // Vimeo link
          else if (videoLink.includes("vimeo.com")) {
            const videoId = videoLink.split("vimeo.com/")[1];
            if (videoId) {
              embedHTML = `<iframe src="https://player.vimeo.com/video/${videoId}" width="560" height="315" 
                frameborder="0" allowfullscreen></iframe>`;
            }
          }
          // Generic fallback (non-embed link)
          else {
            embedHTML = `<p><a href="${videoLink}" target="_blank">Ver video promocional</a></p>`;
          }

          videoPlayerContainer.innerHTML = embedHTML;
        } else {
          videoPlayerContainer.innerHTML = "<p>No se ha agregado un video promocional.</p>";
        }
      }

      if (showAlert) alert("Vista previa generada con éxito 🚀");
    }

    // ---------- Preview button ----------
    if (previewBtn) previewBtn.addEventListener("click", () => updatePreview(true));

    // ---------- Auto-update preview for categories ----------
    const selectedContainer = document.getElementById("selectedCategories");
    if (selectedContainer) {
      const mo = new MutationObserver(() => updatePreview(false));
      mo.observe(selectedContainer, { childList: true, subtree: true });
    }
  }
RenderNOW()

function Renderall() {
  if (RenderallInputs._initialized) return;
  RenderallInputs._initialized = true;

  const tagInput = document.getElementById("tagInput");
  const tagList = document.getElementById("tagList");
  const includeInput = document.getElementById("includeInput");
  const includeList = document.getElementById("includeList");
  const previewBtn = document.getElementById("Final-review-Btn");
  const finalReview = document.getElementById("Final-review");

  const modulesContainer = document.getElementById('modules-container');

  let tags = [];

  function safeTextFromElement(el) {
    if (!el) return "";
    return Array.from(el.childNodes)
      .filter(n => n.nodeType === Node.TEXT_NODE)
      .map(n => n.textContent)
      .join("")
      .trim();
  }

  function renderTags() {
    if (!tagList) return;
    tagList.innerHTML = "";
    tags.forEach((tag, i) => {
      const tagEl = document.createElement("div");
      tagEl.className = "tag-item";
      const span = document.createElement("span");
      span.className = "tag-text";
      span.textContent = tag;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "remove-tag";
      btn.dataset.index = String(i);
      btn.innerHTML = "&times;";
      tagEl.appendChild(span);
      tagEl.appendChild(btn);
      tagList.appendChild(tagEl);
    });
  }

  if (tagInput) {
    tagInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const newTag = (tagInput.value || "").trim();
        if (!newTag) return;
        if (!tags.some(t => t.toLowerCase() === newTag.toLowerCase())) {
          tags.push(newTag);
          renderTags();
        }
        tagInput.value = "";
      }
    });
  }

  if (tagList) {
    tagList.addEventListener("click", (e) => {
      const btn = e.target.closest(".remove-tag");
      if (!btn) return;
      const idx = Number(btn.dataset.index);
      if (!Number.isNaN(idx)) {
        tags.splice(idx, 1);
        renderTags();
      }
    });
  }

  if (includeInput && includeList) {
    includeInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const val = includeInput.value.trim();
        if (!val) return;
        const div = document.createElement('div');
        div.className = "include-item";
        div.textContent = val;
        includeList.appendChild(div);
        includeInput.value = "";
      }
    });
  }

  function getSelectedCategories() {
    const selectedContainer = document.getElementById("selectedCategories");
    if (!selectedContainer) return [];
    return Array.from(selectedContainer.querySelectorAll(".tag"))
      .map(n => safeTextFromElement(n))
      .filter(Boolean);
  }

  // ---------- RENDER PREVIEW ----------
  function updatePreview() {
    const title = (document.getElementById("Title-Input")?.value || "").trim();
    const description = (document.getElementById("descriptionInput")?.value || "").trim();
    const levels = [...document.querySelectorAll('input[name="level"]:checked')]
      .map(el => el.nextElementSibling?.textContent?.trim() || "").filter(Boolean);
    const includes = [...document.querySelectorAll("#includeList .include-item")].map(i => i.textContent.trim());
    const categories = getSelectedCategories();
    const durationValue = (document.getElementById("Duration-Input")?.value || "").trim();
    const durationUnit = (document.getElementById("Duration-Unit")?.value || "").trim();
    const courseDuration = durationValue ? `${durationValue} ${durationUnit}` : "Sin duración";

    let html = `
      <h1>${title || "Sin título"}</h1>
      <p><strong>Nivel:</strong> ${levels.join(", ") || "Sin nivel"}</p>
      <p><strong>Duración:</strong> ${courseDuration}</p>
      <h3>Descripción</h3>
      <p>${description || "Sin descripción"}</p>
      <h4>Categorías:</h4>
      <ul>${categories.length ? categories.map(c => `<li>${c}</li>`).join("") : "<li>Sin categorías</li>"}</ul>
      <h4>Etiquetas:</h4>
      <ul>${tags.length ? tags.map(t => `<li>${t}</li>`).join("") : "<li>Sin etiquetas</li>"}</ul>
      <h4>Incluye:</h4>
      <ul>${includes.length ? includes.map(i => `<li>${i}</li>`).join("") : "<li>No se ha agregado contenido</li>"}</ul>
      <h3>Módulos y Lecciones:</h3>
    `;

    // ---------- Render modules and lessons ----------
    const modules = modulesContainer?.querySelectorAll('.module') || [];
    if (modules.length === 0) {
      html += `<p>No hay módulos agregados.</p>`;
    } else {
      modules.forEach((mod, mi) => {
        const moduleTitle = mod.querySelector('.Titulo-Tema-Input')?.value || `Módulo ${mi + 1}`;
        html += `<div style="margin-left:10px;"><h4>${moduleTitle}</h4>`;
        const lessons = mod.querySelectorAll('.lesson');
        lessons.forEach((lesson, li) => {
          const lessonDesc = lesson.querySelector('textarea')?.value || '';
          html += `<div style="margin-left:20px;"><strong>Lección ${li+1}:</strong> ${lessonDesc}</div>`;

          const dynamicInputs = lesson.querySelectorAll('.dynamic-inputs .input-block');
          dynamicInputs.forEach(inputBlock => {
            const label = inputBlock.querySelector('label')?.textContent || '';
            const input = inputBlock.querySelector('input');
            let value = '';
            if (input?.type === 'file') {
              const files = Array.from(input.files).map(f => f.name).join(', ');
              value = files || 'No se seleccionaron archivos.';
            } else {
              value = input?.value || '';
            }
            if (value.trim()) html += `<div style="margin-left:40px;"><strong>${label}:</strong> ${value}</div>`;
          });
        });
        html += `</div>`;
      });
    }

    finalReview.innerHTML = html;
    finalReview.scrollIntoView({ behavior: "smooth" });
  }

  if (previewBtn) previewBtn.addEventListener("click", updatePreview);
}













function RenderAllCourseInputs() {
  const title = document.getElementById("Title-Input")?.value || "";
  const description = document.getElementById("descriptionInput")?.value || "";
  const durationValue = document.getElementById("Duration-Input")?.value || "";
  const durationUnit = document.getElementById("Duration-Unit")?.value || "";
  const selectedLevel = document.querySelector('input[name="level"]:checked')?.value || "";
  const category = document.getElementById("categorySelect")?.value || "";
  const imagePreview = document.getElementById("courseImagePreview")?.src || "";
  const instructorName = document.getElementById("teacherName")?.value || "";
  const aboutTeacher = document.getElementById("aboutTeacher")?.value || "";

  const reviewSection = document.getElementById("Final-review");

  // 🧹 Clear previous preview
  reviewSection.innerHTML = "";

  // 🧩 Create layout dynamically
  const reviewHTML = `
    <div class="Final-Preview-Container">
      <div class="Preview-Header">
        <h2>${title || "Sin título"}</h2>
        <p><strong>Categoría:</strong> ${category || "No especificada"}</p>
        <p><strong>Nivel:</strong> ${selectedLevel || "No especificado"}</p>
      </div>

      <div class="Preview-Body">
        <div class="Preview-Image">
          <img src="${imagePreview || 'https://via.placeholder.com/300x200?text=Sin+Imagen'}" alt="Vista previa del curso">
        </div>
        <div class="Preview-Description">
          <h3>Descripción del Curso</h3>
          <p>${description || "Sin descripción disponible."}</p>
        </div>
      </div>

      <div class="Preview-Details">
        <p><strong>Duración:</strong> ${durationValue ? `${durationValue} ${durationUnit}` : "No especificada"}</p>
        <p><strong>Instructor:</strong> ${instructorName || "No asignado"}</p>
        <p><strong>Sobre el Instructor:</strong> ${aboutTeacher || "Sin información del instructor."}</p>
      </div>
    </div>
  `;

  reviewSection.innerHTML = reviewHTML;
}

// 🎯 Event Listener
const finalReviewBtn = document.getElementById("PTB-Left");
if (finalReviewBtn) {
  finalReviewBtn.addEventListener("click", RenderAllCourseInputs);
}















  SetModuleBlock()

  renderWelcome()
  renderId()
  renderUserIcon()
  renderCourseSelector()
  courseCreateNav()

  renderTeacherNameDescrip()
  renderTags()







  

}
fetchAllContent()








document.addEventListener("DOMContentLoaded", () => {
  const fileInputs = document.querySelectorAll(".file-input");

  fileInputs.forEach((input) => {
    input.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        //alert(`File selected: ${file.name}`);
      }
    });
  });

  document.querySelectorAll(".remove-file").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.target.closest(".upload-progress").remove();
    });
  });

  document.querySelectorAll(".add-module").forEach((btn) => {
    btn.addEventListener("click", () => {
      //alert("Add Module clicked");
      // You can dynamically clone a module block here
    });
  });

  document.querySelectorAll(".add-lesson").forEach((btn) => {
    btn.addEventListener("click", () => {
      //alert("Add Lesson clicked");
      // Add new lesson dynamically
    });
  });
});



function setupPreviewNotifications() {
  const nextBtn = document.getElementById("Next-Btn");
  const videoInput = document.getElementById("videoLinkInput");

  if (!nextBtn || !videoInput) return;

  // Listen for input changes
  videoInput.addEventListener("input", () => {
    // Check if there is a value
    if (videoInput.value.trim() !== "") {
      // Show the Next Step button
      nextBtn.style.display = "inline-block";

      // Add glowing animation
      nextBtn.classList.add("glow-border");

      // Stop animation after 6 seconds (optional)
      setTimeout(() => {
        nextBtn.classList.remove("glow-border");
      }, 6000);
    } else {
      // Hide the button again if input is cleared
      nextBtn.style.display = "none";
    }
  });
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", setupPreviewNotifications);


















const includeInput = document.getElementById("includeInput");
const includeList = document.getElementById("includeList");

includeInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter" && includeInput.value.trim() !== "") {
    e.preventDefault();

    const item = document.createElement("span");
    item.classList.add("include-item");
    item.textContent = includeInput.value;

    const removeBtn = document.createElement("i");
    removeBtn.classList.add("fa-solid", "fa-xmark", "remove-include");
    removeBtn.addEventListener("click", () => item.remove());

    item.appendChild(removeBtn);
    includeList.appendChild(item);
    includeInput.value = "";
  }
});







// === IMAGE UPLOAD ===
const dropImage = document.getElementById("dropImage");
const imageInput = document.getElementById("imageInput");
const browseImage = document.getElementById("browseImage");

browseImage.addEventListener("click", () => imageInput.click());

dropImage.addEventListener("dragover", e => {
  e.preventDefault();
  dropImage.classList.add("dragover");
});
dropImage.addEventListener("dragleave", () => dropImage.classList.remove("dragover"));

dropImage.addEventListener("drop", e => {
  e.preventDefault();
  dropImage.classList.remove("dragover");
  handleFile(e.dataTransfer.files[0], "image");
});

imageInput.addEventListener("change", e => {
  handleFile(e.target.files[0], "image");
});

document.addEventListener("DOMContentLoaded", () => {
  const dropVideo = document.getElementById("dropVideo");
  const videoInput = document.getElementById("videoInput");
  const browseVideo = document.getElementById("browseVideo");

  if (!dropVideo || !videoInput || !browseVideo) {
    console.warn("⚠️ Video upload elements not found in DOM.");
    return;
  }

  browseVideo.addEventListener("click", () => videoInput.click());

  dropVideo.addEventListener("dragover", e => {
    e.preventDefault();
    dropVideo.classList.add("dragover");
  });

  dropVideo.addEventListener("dragleave", () => dropVideo.classList.remove("dragover"));

  dropVideo.addEventListener("drop", e => {
    e.preventDefault();
    dropVideo.classList.remove("dragover");
    handleFile(e.dataTransfer.files[0], "video");
  });

  videoInput.addEventListener("change", e => {
    handleFile(e.target.files[0], "video");
  });
});


// === FILE HANDLER ===
function handleFile(file, type) {
  const validImageTypes = ["image/png", "image/jpeg"];
  const validVideoTypes = ["video/mp4"];

  if (type === "image" && validImageTypes.includes(file.type)) {
    const reader = new FileReader();
    reader.onload = e => {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.className = "preview";
      dropImage.innerHTML = "";
      dropImage.appendChild(img);
    };
    reader.readAsDataURL(file);
  }

  if (type === "video" && validVideoTypes.includes(file.type)) {
    const reader = new FileReader();
    reader.onload = e => {
      const video = document.createElement("video");
      video.src = e.target.result;
      video.controls = true;
      video.className = "preview";
      dropVideo.innerHTML = "";
      dropVideo.appendChild(video);
    };
    reader.readAsDataURL(file);
  }
}



document.addEventListener("DOMContentLoaded", function () {
  const openBtn = document.getElementById("open");
  const closeBtn = document.getElementById("close");
  const menuToggle = document.getElementById("menuToggle");
  const linkNames = document.querySelectorAll(".linkName");
  const mobileSidebar = document.getElementById("Mobile-sidebar"); // Make sure this ID exists

  function showSidebarText() {
    linkNames.forEach(el => el.style.display = "inline");
    openBtn.style.display = "none";
    closeBtn.style.display = "flex";
  }

  function hideSidebarText() {
    linkNames.forEach(el => el.style.display = "none");
    closeBtn.style.display = "none";
    openBtn.style.display = "flex";
  }

  function toggleMobileSidebar() {
    mobileSidebar.classList.toggle("show"); // Add a class like .show to handle visibility in CSS
  }

  // Attach event listeners
  openBtn.addEventListener("click", showSidebarText);
  closeBtn.addEventListener("click", hideSidebarText);


  // Initial state
  hideSidebarText();
});


document.getElementById("Home").addEventListener("click", function () {
  window.location.href = "index11.html";
});
document.getElementById("Calander").addEventListener("click", function () {
  window.location.href = "index11.1.html";
});

document.getElementById("invocie").addEventListener("click", function () {
  window.location.href = "index11.2.html";
});
document.getElementById("Students").addEventListener("click", function () {
  window.location.href = "index11.3.html";
});
document.getElementById("Assignments").addEventListener("click", function () {
  window.location.href = "index11.4.html";
});
document.getElementById("BCourse").addEventListener("click", function () {
  window.location.href = "index11.5.html";
});

document.getElementById("Lessons").addEventListener("click", function () {
  window.location.href = "index11.6.html";
}); 
document.getElementById("Mensajes").addEventListener("click", function () {
  window.location.href = "index11.7.html";
});






document.getElementById("Settings").addEventListener("click", function () {
  window.location.href = "index11.8.html";
});   
document.getElementById("Logout").addEventListener("click", function () {
  window.location.href = "index4.1.html";
}); 