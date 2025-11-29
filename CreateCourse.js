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



function renderText(text, elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = text;
  } else {
    console.error(`Element with ID "${elementId}" not found.`);
  }
}

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


  function CourseNavBlock(){
    setBackgroundColor('.Course-Nav-block', Prime4)
    setTextColors('.Course-Nav-block', Prime5) 
     
    const style = document.createElement("style");
    style.textContent = `
      #Next-Btn {
        border: 2px solid  ${Prime2};
        color: ${Prime2};
      }
      #Save-Btn{
        color: ${Prime2};
        border: 2px solid ${Prime2};
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

  function BasicInfoBlock(){
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
        .CIC-item {
          color: ${Prime5};
          background: ${Base}; 
        }
        .CIC-item:hover{
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
  function StarterPageBlock(){
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
        /*-------- TFselector --------*/
        .QA{
          color: ${Prime3};
          border: 2px solid ${Prime1}; 
        }
        .QA:focus {
          border-color: ${Prime3};
        }
        /*-------- TFselector --------*/
        .TFselector {
          color:${Prime1}; 
          background-color:${Prime5}; 
          border: 2px solid ${Prime1}; 
        }
        .TFselector:hover {
          border-color: ${Prime4}; 
        }
        .TFselector:focus {
          border-color: ${Prime3};
        }
        .TFselector option {
          background: ${Prime5}; 
          color: ${Prime}; 
        }        
        /*-------- Cross-Sector --------*/
        .Element-input{
          color: ${Prime3};
          border: 2px solid ${Prime1}; 

        }
        .Element-input:focus {
          border-color: ${Prime3};
        }
        /* ------------   Dynamic Input ------------- */
        .input-block label {
          color: ${Prime1};
        }
        .input-block input[type="text"],
        .input-block input[type="file"],
        .input-block textarea,
        .input-block select {
          border: 2px solid ${Prime1};
          background-color: ${Prime5}; 
        }
        .input-block input[type="text"]:focus,
        .input-block textarea:focus,
        .input-block select:focus {
          border-color: ${Prime3};
        }
        .input-block input[type="file"] {
          color: ${Prime3};
        }
      `;
      document.head.appendChild(style);
    } 
    function SetPreviewColors(){
      const style = document.createElement("style");
      style.textContent = `       
        .SPB-Preview-Blocks{
          background-color: ${Prime4}; 
        }
        .SPB-Preview-Blocks h3{
          color:${Base}; 
        }
        .module-title{
          color: ${Prime2}; 
        }
        .module-subtitle{
          color:${Prime2}; 
        }
        .R-Blocks h3{
          color: ${Prime1}; 
        }
        .preview-lesson p.red {
          color: ${Prime}; 
        }
        #modules-Prview-block {
          background:${Prime5}; 
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.52);
        }
        .preview-lesson p {
          color: ${Base}; 
        }
        .preview-lesson p strong {
          color: ${Prime3}; 
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
        .Course-Creator-Block {
          background: ${Prime5}; 
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
        /*-------- TFselector --------*/
        .QA{
          color: ${Prime3};
          border: 2px solid ${Prime1}; 
        }
        .QA:focus {
          border-color: ${Prime3};
        }
        /*-------- TFselector --------*/
        .TFselector {
          color:${Prime1}; 
          background-color:${Prime5}; 
          border: 2px solid ${Prime1}; 
        }
        .TFselector:hover {
          border-color: ${Prime4}; 
        }
        .TFselector:focus {
          border-color: ${Prime3};
        }
        .TFselector option {
          background: ${Prime5}; 
          color: ${Prime}; 
        }        
        /*-------- Cross-Sector --------*/
        .Element-input{
          color: ${Prime3};
          border: 2px solid ${Prime1}; 

        }
        .Element-input:focus {
          border-color: ${Prime3};
        }
        /* ------------   Dynamic Input ------------- */
        .input-block label {
          color: ${Prime1};
        }
        .input-block input[type="text"],
        .input-block input[type="file"],
        .input-block textarea,
        .input-block select {
          border: 2px solid ${Prime1};
          background-color: ${Prime5}; 
        }
        .input-block input[type="text"]:focus,
        .input-block textarea:focus,
        .input-block select:focus {
          border-color: ${Prime3};
        }
        .input-block input[type="file"] {
          color: ${Prime3};
        }
      `;
      document.head.appendChild(style);
    } 
    function SetPreviewColors(){
      const style = document.createElement("style");
      style.textContent = `       
        .SPB-Preview-Blocks{
          background-color: ${Prime4}; 
        }
        .SPB-Preview-Blocks h3{
          color:${Base}; 
        }
        .module-title{
          color: ${Prime2}; 
        }
        .module-subtitle{
          color:${Prime2}; 
        }
        .R-Blocks h3{
          color: ${Prime1}; 
        }
        .preview-lesson p.red {
          color: ${Prime}; 
        }
        #modules-Prview-block {
          background:${Prime5}; 
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.52);
        }
        .preview-lesson p {
          color: ${Base}; 
        }
        .preview-lesson p strong {
          color: ${Prime3}; 
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
  function SetmodulesColors(){
    setBackgroundColor("#Title-Input", Prime3)
    const style = document.createElement("style");
    style.textContent = `
      #modules-Prview-block {
        background: ${Prime5}; 
      }
      .preview-module {
        background: ${Prime5}; 
        border: 1px solid ${Prime3}; 
        border-left: 5px solid ${Prime3}; 
      }
      .preview-module h2 {
        color: ${Prime3}; 
        border-bottom: 1px solid ${Prime2}; 
      }
      .preview-lesson {
        color: ${Prime};   
        border: 1px solid ${Prime1}; 
      }
      .preview-lesson:hover {
        color: ${Prime};  
        background: ${Prime4}; 
      }
      .preview-lesson h3 {
        color: ${Prime3};
      }
      .preview-lesson .description-section {
        background: ${Prime5};
        border: 1px solid ${Prime};
      }
      .preview-lesson .description-section p {
        color: ${Prime};
      }
      .preview-lesson p {
        color:${Prime};
      }
      .preview-lesson p strong {
        color:${Prime};
      }
      #modules-Prview-block p[style*="color:#999"] {
        background: ${Prime5}; 
        border: 1px dashed ${Prime};
      }
      .Tema-Description{
        background-color: ${Prime3};
      }
      .Main-Question{
        color:${Base};
      }
      .Main-Question::placeholder{
        color: ${Base};
      }


    `;
    document.head.appendChild(style);


  }
  function SetBIBPreviewColors(){
    setBackgroundColor("#Title-Input", Prime3)
    setTextColors(".fa-eye", Prime2)
    const style = document.createElement("style");
    style.textContent = `
      .Preview-Video-block{
        background-color: ${Prime1};
      }

      /*-------- Preview-Blocks  --------*/
      .Preview-Title-Block{
        border: 3px solid ${Prime1};
      }
      #Preview-Course-Img img {       
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.44); 
      }
      .Preview-Title-Block h1{
        color: ${Base};
      }  
      /*-------- PCBBL-Teacher-Block  --------*/
      .PCBBL-Teacher-Block span{
        color: ${Prime3};
      }
      .PCBBL-Teacher-Block p{
        color:${Base};
      }
      /*-------- Preview-Content-BTN-Block  --------*/
      .Preview-Content-BTN-Block{
        background-color: ${Prime4};
      }    
      /*-------- tabs-Block  --------*/
      .tabs-Btns{
        color: ${Prime5};
        background-color: ${Base};
      }
      .tabs-Btns:hover{
        background-color: ${Prime1};
      }
      .tabs .tabs-Btns.active {
        background-color: ${Prime3};
        color: ${Prime5};
      }
      /*-------- PCBBL-Bottom --------*/
      .PCBBL-Bottom h2{
        color: ${Base};
      }
      .PCBBL-Bottom h3{
        color: ${Prime};
      }
      #Course-content-List{
        background-color:${Prime5};
      }
      #Course-content-List::-webkit-scrollbar-thumb {
        background-color:${Prime1};
      }
      #Course-content-List li {
        color: ${Prime3};
      }
      /*-------- Course-Description  --------*/
      #Course-Description{
        background-color:${Prime5};
      }
      #Course-Description h3 {
      color: ${Base};
      }
      #Course-Description p {
      color:  ${Prime};
      }
      /*-------- Preview-Right-Block  --------*/
      .Preview-Right-Block{
        border: 2px solid ${Prime1};
      }
      .Preview-Right-Block h1{
        color: ${Base};
      }
      /*-------- Course-Detials  --------*/
      .Course-Detials{
        border: 2px solid ${Prime1};
      }
      .Course-Detials-Blocks h3{
        color: ${Prime2};
      }
      .Preview-Categorías-Block{
        color: ${Prime3};
      }
      /*-------- Avtive-Course-Tags  --------*/
      .Avtive-Course-Tags h3{
        color: ${Base};
      }
      .Preview-Active-Tags-Block{
        color: ${Prime3};
      }
      .Preview-lines{
        background-color: ${Base};
      }
      #Teacher-Name{
        color: ${Base};
      }
      #Teacher-About{
        color: ${Prime1};
      }
      .PCB1{
        background-color: ${Prime5};
      }
      .PCBBB1 .PC-Block{
        background-color: ${Prime5};
      }
      .PC-Block h3{
        color: ${Base};
      }
      /*-------- PCBB-Bottom --------*/
      #PCBB-Resources {
        background-color: ${Prime5};
        border: 1px solid ${Prime3};
      }
      #PCBB-Resources .resources-module {
        background-color: ${Prime5};
        border: 1px solid ${Prime3};
      }
      #PCBB-Resources .resources-module h2 {
        color: ${Base};
      }
      #PCBB-Resources .resources-module h2::before {
        color: ${Prime2};
      }
      #PCBB-Resources .resource-list li {
        color: ${Prime3};
      }
      #PCBB-Resources .resources-module p {
        color: ${Prime3};
      }
      /* -------------------------
        HOMEWORK (Matches Resources)
      --------------------------*/
      #PCBB-HW {
        background-color: ${Prime5};
        border: 1px solid ${Prime3};
      }
      #PCBB-HW .tareas-module {
        background-color: ${Prime5};
        border: 1px solid ${Prime3};
      }
      #PCBB-HW .tareas-module h2 {
        color: ${Base};
      }
      #PCBB-HW .tareas-module h2::before {
        color: ${Prime2};
      }
      #PCBB-HW .tarea-list li {
        color: ${Prime3};
      }
      #PCBB-HW .tareas-module p {
        color: ${Prime3};
      }
      /* -------------------------
        EXAMS (Matches Resources & Homework)
      --------------------------*/
        #PCBB-Exams {
        background-color: ${Prime5};
        border: 1px solid ${Prime3};
      }

      #PCBB-Exams  h2 {
        color: ${Base};
      }
      #PCBB-Exams h2::before {
        color: ${Prime2};
      }
      #PCBB-Exams  li {
        color: ${Prime3};
      }
      #PCBB-Exams  p {
        color: ${Prime3};
      }
      /* =========================
        LIVE CLASSES TREE
        ========================= */
      #PCBB-Live-Class {
        background-color: ${Prime5};
        border: 1px solid ${Prime3};
      }
      #PCBB-Live-Class .live-module {
        background-color: ${Prime5};
        border: 1px solid ${Prime3};
      }
      #PCBB-Live-Class .live-module h2 {
        color: ${Base};
      }
      #PCBB-Live-Class .live-module h2::before {
        color: ${Prime2};
      }
      #PCBB-Live-Class .live-list li {
        color: ${Prime3};
      }
      #PCBB-Live-Class .live-module p {
        color: ${Prime3};
      }
      #PCBB-Live-Class .live-module:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
      }
      #PCBB-Live-Class .live-list li.empty {
        color: ${Prime3};
      }
      /*-------- Avtive-Course-Tags  --------*/
      .Avtive-Course-Tags h3{
        color: ${Base};
      }
      .Preview-Active-Tags-Block{
        color: ${Prime};
      }
      /* ==============================
        CORSOSKILLS COURSE STRUCTURE
        ============================== */
      #module-curse-coontent {
        color: ${Prime};
        background: ${Prime5};
        border: 1px solid ${Prime1};
      }
      #module-curse-coontent::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, ${Base}, ${Prime3});
      }
      #module-curse-coontent::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, ${Base}, ${Prime3});
      }
      #module-curse-coontent .structure-module {
        background: ${Prime4};
        border-image: linear-gradient(180deg,${Base}, ${Prime3});
      }
      #module-curse-coontent .structure-module:hover {
        background: ${Prime3};
      }
      #module-curse-coontent .structure-module h2 {
        background: linear-gradient(90deg, ${Base}, ${Prime3});
        color: ${Prime5};
      }
      #module-curse-coontent .tema-list li {
        color: ${Prime};
      }
      #module-curse-coontent .tema-list li:hover {
        color: ${Prime5};
      }
      #module-curse-coontent .subtema-list {
        border-left: 2px dashed ${Prime2};
      }
      #module-curse-coontent .subtema-list li {
        color: ${Prime};
      }
      #module-curse-coontent .subtema-list li::before {
        background: linear-gradient(90deg,${Base}, ${Prime3});
      }
      #module-curse-coontent .subtema-list li:hover {
        color: ${Prime2};
      }






    `;
    document.head.appendChild(style);


  }
  function setLoadingColors(){
    const style = document.createElement("style");
    style.textContent = `
      #loading-popup {
        background: rgba(0, 0, 0, 0.712);
      }
      #loading-popup .loading-box {
        background:  ${Prime5};
      }
      #loading-popup .loading-box h3 {
        color:  ${Base};
      }

      #loading-popup .loading-box p {
        color:  ${Prime2};
      }
    `;
    document.head.appendChild(style);
  }



  setGlobalFont(data.Font)
  RenderUserInfoColors()
  RenderNavBlock()
  sidebarcolors()
  CourseNavBlock()
  BasicInfoBlock()
  StarterPageBlock()
  RenderContentBlock()
  setLoadingColors()
  SetmodulesColors()
  SetBIBPreviewColors()
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

  function renderheadercont(){
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
    function renderUserIcon(ID) {
      const container = document.getElementById(ID);
      if (!container) {
        console.error("Element with ID 'profile-Icon' not found.");
        return;
      }

      if (!teacherData?.profileImg) {
        container.innerHTML = `<i class="fa-solid fa-circle-user" style="font-size: 2rem;"></i>`;
      } else {
        container.innerHTML = `<img src="${teacherData.profileImg}" alt="User Icon" width="40" height="40" style="border-radius: 50%;" />`;
          
      }
    }
  
    renderWelcome()
    renderId()
    renderUserIcon("profile-Icon")
    renderUserIcon("Teacher-Img")
  }
  function courseCreateNav() {
    const DEV_SKIP_VALIDATION = true; // ← turn this OFF when you're done coding

    const navItems = document.querySelectorAll(".CCB-Left .CCB");
    const nextBtn = document.getElementById("Next-Btn");
    const saveBtn = document.getElementById("Save-Btn");
    const videoInput = document.getElementById("videoLinkInput");

    const basicInfoBlock = document.getElementById("Basic-Info-Block-1");
    const starterPageBlock = document.getElementById("Starter-Page-Block");
    const finalizeBlock = document.getElementById("Finalizar-Curso-Block");

    const blocks = [basicInfoBlock, starterPageBlock, finalizeBlock];
    let currentIndex = 0;

    function activateSection(index) {
      navItems.forEach((item, i) => item.classList.toggle("active", i === index));
      blocks.forEach((block, i) => block.classList.toggle("active-block", i === index));
      saveBtn.style.display = index === blocks.length - 1 ? "inline-flex" : "none";
      nextBtn.style.display = "none";
      if (blocks[index] === basicInfoBlock) nextBtn.style.display = videoInput.value.trim() ? "flex" : "none";
      if (blocks[index] === starterPageBlock) nextBtn.style.display = "flex";
      currentIndex = index;
    }

    activateSection(0);

    navItems.forEach((item, index) => {
      item.addEventListener("click", () => {
        if (!DEV_SKIP_VALIDATION) {
          if (currentIndex === 0 && index > 0) {
            if (!validateBasicCourseInfo()) return;
          }
        }
        activateSection(index);
      });
    });

    nextBtn.addEventListener("click", () => {
      if (!DEV_SKIP_VALIDATION) {
        if (blocks[currentIndex] === basicInfoBlock) {
          if (!validateBasicCourseInfo()) return;
        }
      }
      const nextIndex = Math.min(currentIndex + 1, blocks.length - 1);
      activateSection(nextIndex);
    });

    videoInput.addEventListener("input", () => {
      if (blocks[currentIndex] === basicInfoBlock) {
        nextBtn.style.display = videoInput.value.trim() ? "flex" : "none";
      }
    });
  }
  function validateBasicCourseInfo() {
    const title = document.getElementById("Title-Input").value.trim();
    const selectedCategory = window.selected && window.selected[0];
    const levels = document.querySelectorAll("input[name='level']:checked");
    const duration = document.getElementById("Duration-Input").value.trim();
    const description = document.getElementById("descriptionInput").value.trim();
    const includes = document.querySelectorAll("#includeList .CIC-item");
    const imageFile = document.getElementById("imageInput").files;
    const videoLink = document.getElementById("videoLinkInput").value.trim();

    // === TITLE ===
    if (!title) {
      alert("El título del curso es obligatorio.");
      return false;
    }

    // === CATEGORY ===
    if (!selectedCategory) {
      alert("Selecciona una categoría.");
      return false;
    }

    // === LEVEL ===
    if (levels.length === 0) {
      alert("Selecciona el nivel del curso.");
      return false;
    }

    // === DURATION ===
    if (!duration || duration <= 0) {
      alert("La duración debe ser mayor que cero.");
      return false;
    }

    // === DESCRIPTION ===
    if (!description) {
      alert("La descripción no puede estar vacía.");
      return false;
    }

    // === INCLUDES ===
    if (includes.length === 0) {
      alert("Agrega al menos un elemento en '¿Qué incluye el curso?'");
      return false;
    }

    // === IMAGE === (fixed)
    if (!imageFile || imageFile.length === 0) {
      alert("Debes subir una imagen de portada.");
      return false;
    }

    // === VIDEO LINK ===
    if (!videoLink) {
      alert("Debes ingresar el video promocional.");
      return false;
    }

    return true;
  }
  function CourseBasicInfo(){
    function renderCourseSelector() {
      const categoriasRaw = businessData.CourseCategory; // array of objects

      // 🔥 Convert [{Bienestar: true}, {Diseño: true}] → ["Bienestar", "Diseño"]
      const categorias = categoriasRaw
        .filter(obj => Object.values(obj)[0] === true) // only TRUE categories
        .map(obj => Object.keys(obj)[0]);              // extract key

      // DOM references
      const container = document.getElementById("categoriaSelect");
      const selectedContainer = document.getElementById("selectedCategories");

      const dropdown = document.createElement("div");
      dropdown.classList.add("dropdown");

      // Create dropdown options
      categorias.forEach(cat => {
        const option = document.createElement("div");
        option.classList.add("dropdown-option");
        option.textContent = cat;
        option.dataset.value = cat;
        dropdown.appendChild(option);
      });

      container.appendChild(dropdown);

      // Global selected list
      if (!window.selected) window.selected = [];

      // Dropdown open/close
      container.addEventListener("click", (e) => {
        if (!e.target.classList.contains("dropdown-option")) {
          dropdown.classList.toggle("active");
        }
      });

      // Select category (single select)
      dropdown.addEventListener("click", (e) => {
        if (e.target.classList.contains("dropdown-option")) {
          const value = e.target.dataset.value;

          window.selected = [value];
          renderSelectedTags();

          dropdown.classList.remove("active");
        }
      });

      // Render selected category as a tag
      function renderSelectedTags() {
        selectedContainer.innerHTML = "";

        if (window.selected.length === 0) return;

        const value = window.selected[0];

        const tag = document.createElement("div");
        tag.classList.add("tag");

        const label = document.createElement("span");
        label.textContent = value;

        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-btn");
        removeBtn.innerHTML = "&times;";

        // Remove category
        removeBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          window.selected = [];
          renderSelectedTags();
        });

        tag.appendChild(label);
        tag.appendChild(removeBtn);
        selectedContainer.appendChild(tag);

        console.log("Categoría seleccionada:", window.selected[0]);
      }

      // Close dropdown when clicking outside
      document.addEventListener("click", (e) => {
        if (!container.contains(e.target)) {
          dropdown.classList.remove("active");
        }
      });
    }

    function initImageUpload() {
      const imageInput = document.getElementById("imageInput");
      const imagePreview = document.getElementById("imagePreview");

      if (!imageInput || !imagePreview) return;

      imageInput.addEventListener("change", () => {
        const file = imageInput.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
          alert("El archivo debe ser una imagen válida.");
          imageInput.value = "";
          return;
        }

        // Show preview
        imagePreview.innerHTML = `<img src="${URL.createObjectURL(file)}" class="preview-image">`;
      });
    }



















    renderCourseSelector()
    initImageUpload() 
  }
  function SetModuleBlock() {
    let moduleCount = 0;

    const modulesContainer = document.getElementById("modules-container");
    const addModuleBtn = document.getElementById("add-module");
    const previewBlock = document.getElementById("modules-Prview-block");

    // Create first module automatically on load (not removable)
  //  createModule(false);

    // Add new modules dynamically (these are removable)
    if (addModuleBtn) {
      addModuleBtn.addEventListener("click", () => {
        createModule(true);
        renderPreview();
      });
    }

    // === CREATE MODULE ===
    function createModule(isAdded = false, isHidden = true) {
      const moduleDiv = document.createElement("div");
      moduleDiv.classList.add("module", "Module-Block");

      moduleDiv.innerHTML = `
        <div class="module-header">
          <div>
            <div class="Added-input-Block">
              <h2 class="module-title"></h2>
              <div class="Module-Action-Btns">
                <button class="hide-module">-</button>
                ${isAdded ? `<button class="remove-module">×</button>` : ""}
              </div>
            </div>
            <div class="module-lesson-block">
              <input class="Titulo-Tema-Input" type="text" placeholder="Título del Tema" />    
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

      // Collapse / Expand functionality
      hideBtn.addEventListener("click", () => {
        const isHiddenNow = block.style.display === "none";
        if (isHiddenNow) {
          block.style.display = "flex";
          lessonsContainer.style.display = "block";
          hideBtn.textContent = "-";
        } else {
          block.style.display = "none";
          lessonsContainer.style.display = "none";
          hideBtn.textContent = "+";
        }
      });

      // Live update on typing
      if (titleInput) titleInput.addEventListener("input", renderPreview);

      // Add lesson button
      if (addLessonBtn) {
        addLessonBtn.addEventListener("click", () => {
          addLesson(lessonsContainer);
          renderPreview();
        });
      }

      // Remove module button
      if (isAdded) {
        const removeModuleBtn = moduleDiv.querySelector(".remove-module");
        if (removeModuleBtn) {
          removeModuleBtn.addEventListener("click", () => {
            moduleDiv.remove();
            renumberModules();
            renderPreview();
          });
        }
      }

      renumberModules();
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

      const dynamicContainer = lessonDiv.querySelector(".dynamic-inputs");
      const descArea = lessonDiv.querySelector("textarea");

      if (descArea) descArea.addEventListener("input", renderPreview);

      // Dynamic buttons
      lessonDiv.querySelector(".add-Exam")?.addEventListener("click", () => { addExamInput(dynamicContainer); renderPreview(); });
      lessonDiv.querySelector(".add-video")?.addEventListener("click", () => { addDynamicInput(dynamicContainer, "Video", "URL del video o descripción"); renderPreview(); });
      lessonDiv.querySelector(".add-Subtema")?.addEventListener("click", () => { addDynamicInput(dynamicContainer, "Subtema", "Título del subtema"); renderPreview(); });
      lessonDiv.querySelector(".add-description")?.addEventListener("click", () => { addDynamicInput(dynamicContainer, "Descripción", "Texto descriptivo"); renderPreview(); });
      lessonDiv.querySelector(".add-Homework")?.addEventListener("click", () => { addHomeworkInput(dynamicContainer); renderPreview(); });
      lessonDiv.querySelector(".add-Archivos")?.addEventListener("click", () => { addFileInput(dynamicContainer); renderPreview(); });
      lessonDiv.querySelector(".add-Live")?.addEventListener("click", () => { addLiveInput(dynamicContainer); renderPreview(); });
    }

    // === DYNAMIC INPUT (Generic) ===
    function addDynamicInput(container, type, placeholder) {
      const block = document.createElement("div");
      block.classList.add("input-block");
      // store dataset.type to help extraction later
      block.dataset.type = type.toLowerCase();
      block.innerHTML = `
        <div class="Added-input-Block">
          <div class="Label-Block">
            <a class="Lesson-Point">*</a>
            <label class="Lesson-Point-Lable">${type}</label>
          </div>        
          <button class="remove-btn">×</button>
        </div>
        <input type="text" placeholder="${placeholder}" />
      `;
      container.appendChild(block);

      const input = block.querySelector("input");
      input?.addEventListener("input", renderPreview);
      block.querySelector(".remove-btn")?.addEventListener("click", () => {
        block.remove();
        renderPreview();
      });
    }

    // === FILE INPUT ===
    function addFileInput(container) {
      const block = document.createElement("div");
      block.classList.add("input-block");
      block.dataset.type = "archivos";
      block.innerHTML = `
        <div class="Added-input-Block">
          <div class="Label-Block">
            <a class="Lesson-Point">*</a>
            <label class="Lesson-Point-Lable">Archivos</label>
          </div>  
          <button class="remove-btn">×</button>
        </div>
        <input class="Up-load-btn" type="file" multiple />
      `;
      container.appendChild(block);

      const input = block.querySelector("input[type='file']");
      input?.addEventListener("change", renderPreview);

      block.querySelector(".remove-btn")?.addEventListener("click", () => {
        block.remove();
        renderPreview();
      });

      return block;
    }

    // === HOMEWORK INPUT ===
    function addHomeworkInput(container) {
      const block = document.createElement("div");
      block.classList.add("input-block");
      block.dataset.type = "tarea";
      block.innerHTML = `
        <div class="Added-input-Block">
          <div class="Label-Block">
            <a class="Lesson-Point">*</a>
            <label class="Lesson-Point-Lable">Tarea</label>
          </div>  
          <button class="remove-btn">×</button>
        </div>

        <div class="Tarea-Block">
          <div class="Added-input-Block"><a>Título de la Tarea</a></div>
          <input type="text" class="hw-title" placeholder="Ejemplo: Análisis de Caso - Semana 2" />

          <div class="Added-input-Block"><a>Descripción</a></div>
          <textarea rows="3" class="hw-desc" placeholder="Describe las instrucciones de la tarea..."></textarea>

          <div class="HW-Bottom-Block">
            <div class="B">
              <div class="Added-input-Block"><a>Fecha de Entrega</a></div>
              <input type="date" class="hw-date" />
            </div>

            <div class="B">
              <div class="Added-input-Block"><a>Recursos / Archivos Adjuntos</a></div>
              <div class="file-inputs">
                <input type="file" class="hw-files" multiple />
              </div>
            </div>
          </div>

          <button class="add-file-input">+ Agregar Archivo</button>
        </div>
      `;
      container.appendChild(block);

      block.querySelector(".remove-btn")?.addEventListener("click", () => {
        block.remove();
        renderPreview();
      });

      const title = block.querySelector(".hw-title");
      const desc = block.querySelector(".hw-desc");
      const date = block.querySelector(".hw-date");
      const files = block.querySelector(".hw-files");
      const addFileBtn = block.querySelector(".add-file-input");
      const fileContainer = block.querySelector(".file-inputs");

      [title, desc, date].forEach(el => el?.addEventListener("input", renderPreview));
      files?.addEventListener("change", renderPreview);

      addFileBtn?.addEventListener("click", (e) => {
        e.preventDefault();
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
      block.dataset.type = "examen";
      block.innerHTML = `
        <div class="Added-input-Block">
          <div class="Label-Block">
            <a class="Lesson-Point">*</a>
            <label class="Lesson-Point-Lable">Título del Examen</label>
          </div>  
          <button class="remove-btn">×</button>
        </div>
        <input type="text" class="exam-title" placeholder="Ejemplo: Evaluación Final del Módulo" />

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

      removeBtn?.addEventListener("click", () => { block.remove(); renderPreview(); });
      examTitle?.addEventListener("input", renderPreview);

      function wireQuestion(qEl) {
        const rm = qEl.querySelector(".remove-btn");
        if (rm) rm.addEventListener("click", () => { qEl.remove(); renderPreview(); });

        qEl.querySelectorAll("input, textarea, select").forEach(inp => inp.addEventListener("input", renderPreview));
        qEl.querySelectorAll("input[type='file']").forEach(f => f.addEventListener("change", renderPreview));
      }

      // multiple choice
      block.querySelector(".exam-mc")?.addEventListener("click", () => {
        const q = document.createElement("div");
        q.classList.add("input-block");
        q.innerHTML = `
          <div class="exam-question-block">
            <div class="Added-input-Block">
              <div class="Label-Block">
                <a class="Lesson-Point">*</a>
                <label class="Lesson-Point-Lable">Pregunta de Opción Múltiple</label>
              </div>  
              <button class="remove-btn">×</button>
            </div>

            <input type="text" class="Main-Question" placeholder="Escribe la pregunta..." />
            
            <input class="QA" type="text" placeholder="Opción A" />
            <input class="QA" type="text" placeholder="Opción B" />
            <input class="QA" type="text" placeholder="Opción C" />
            <input class="QA" type="text" placeholder="Opción D" />
          </div>
        `;
        questionsContainer.appendChild(q);
        wireQuestion(q);
        renderPreview();
      });

      // true/false
      block.querySelector(".exam-tf")?.addEventListener("click", () => {
        const q = document.createElement("div");
        q.classList.add("input-block");
        q.innerHTML = `
        <div class="exam-question-block">
          <div class="Added-input-Block">
            <label>Pregunta Verdadero / Falso</label>
            <button class="remove-btn">×</button>
          </div>
          <input class="Main-Question"  type="text" placeholder="Escribe la pregunta..." />
          <select class="TFselector">
            <option value="true">Verdadero</option>
            <option value="false">Falso</option>
          </select>
        </div>  
        `;
        questionsContainer.appendChild(q);
        wireQuestion(q);
        renderPreview();
      });

      // matching
      block.querySelector(".exam-cc")?.addEventListener("click", () => {
        const q = document.createElement("div");
        q.classList.add("input-block");
        q.innerHTML = `
        <div class="exam-question-block">
          <div class="Added-input-Block">
            <label>Examen de Emparejamiento</label>
            <button class="remove-btn">×</button>
          </div>
          <input class="Element-input" type="text" placeholder="Elemento Izquierda 1" />
          <input class="Element-input" type="text" placeholder="Elemento Derecha 1" />
          <input class="Element-input" type="text" placeholder="Elemento Izquierda 2" />
          <input class="Element-input" type="text" placeholder="Elemento Derecha 2" />
          <input class="Element-input" type="text" placeholder="Elemento Izquierda 3" />
          <input class="Element-input" type="text" placeholder="Elemento Derecha 3" />
          <input class="Element-input" type="text" placeholder="Elemento Izquierda 4" />
          <input class="Element-input" type="text" placeholder="Elemento Derecha 4" />
        </div>    
        `;
        questionsContainer.appendChild(q);
        wireQuestion(q);
        renderPreview();
      });

      // open question
      block.querySelector(".exam-oq")?.addEventListener("click", () => {
        const q = document.createElement("div");
        q.classList.add("input-block");
        q.innerHTML = `
        <div class="exam-question-block">
          <div class="Added-input-Block">
            <label>Pregunta Abierta</label>
            <button class="remove-btn">×</button>
          </div>
          <input class="Main-Question" type="text" placeholder="Escribe la pregunta..." />
          <textarea rows="2" placeholder="Respuesta esperada"></textarea>
        </div>  
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
      block.dataset.type = "clase-en-vivo";
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

      block.querySelector(".remove-btn")?.addEventListener("click", () => { block.remove(); renderPreview(); });

      const title = block.querySelector(".live-title");
      const datetime = block.querySelector(".live-datetime");
      const duration = block.querySelector(".live-duration");
      const desc = block.querySelector(".live-desc");
      const files = block.querySelector(".live-files");
      const addFileBtn = block.querySelector(".add-file-input");
      const fileContainer = block.querySelector(".file-inputs");

      [title, datetime, duration, desc].forEach(el => el?.addEventListener("input", renderPreview));
      files?.addEventListener("change", renderPreview);

      addFileBtn?.addEventListener("click", (e) => {
        e.preventDefault();
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
      } else {
        modules.forEach((module, i) => {
          const moduleInputValue = module.querySelector(".Titulo-Tema-Input")?.value.trim();
          const moduleTitle = `Módulo ${i + 1}`;
          const moduleSubtitle = moduleInputValue || "Sin título";

          const modulePreview = document.createElement("div");
          modulePreview.classList.add("preview-module");

          modulePreview.innerHTML = `
            <div class="module-header">
              <h2 class="module-title">${moduleTitle}</h2>
              <h3 class="module-subtitle">${moduleSubtitle}</h3>
            </div>
          `;

          const lessons = module.querySelectorAll(".lesson");
          lessons.forEach((lesson, index) => {
            const desc = lesson.querySelector("textarea")?.value || "";
            const lessonPreview = document.createElement("div");
            lessonPreview.classList.add("preview-lesson");
            lessonPreview.innerHTML = `
              <div class="MR-Block">
                <h3>Lección ${index + 1}</h3>
                <div class="R-Blocks">
                  <h3>Descripción</h3>
                  ${desc ? `<p class="red">${desc}</p>` : ""}
                </div>
              </div>
            `;

            const dynamicInputs = lesson.querySelectorAll(".dynamic-inputs .input-block");
            dynamicInputs.forEach((inputBlock) => {
              const label = inputBlock.querySelector(".Lesson-Point-Lable")?.textContent || "";
              const input = inputBlock.querySelector("input, textarea, select");
              let value = "";

              if (inputBlock.querySelector(".hw-title")) {
                value = inputBlock.querySelector(".hw-title").value || "Título no asignado";
              } else if (inputBlock.querySelector(".live-title")) {
                value = inputBlock.querySelector(".live-title").value || "Título de clase no asignado";
              } else if (inputBlock.querySelectorAll("input[type='file']").length) {
                const fileInputs = inputBlock.querySelectorAll("input[type='file']");
                const names = [];
                fileInputs.forEach((fi) => {
                  if (fi.files && fi.files.length) {
                    Array.from(fi.files).forEach((f) => names.push(f.name));
                  }
                });
                value = names.join(", ") || "No se seleccionaron archivos.";
              } else if (input) {
                value = input.value || "";
              } else {
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
      }

      // ALSO RENDER HIERARCHICAL COURSE STRUCTURE
      const structureContainer = document.getElementById("module-curse-coontent");
      if (structureContainer) {
        structureContainer.innerHTML = "";
        modules.forEach((module, i) => {
          const moduleTitle = module.querySelector(".Titulo-Tema-Input")?.value.trim() || "Sin título";
          const moduleDiv = document.createElement("div");
          moduleDiv.classList.add("structure-module");
          moduleDiv.innerHTML = `<h2>Módulo ${i + 1}: ${moduleTitle}</h2>`;

          const lessons = module.querySelectorAll(".lesson");
          if (lessons.length > 0) {
            const temaList = document.createElement("ul");
            temaList.classList.add("tema-list");

            lessons.forEach((lesson, j) => {
              const desc = lesson.querySelector("textarea")?.value.trim() || "Sin descripción";
              const temaItem = document.createElement("li");
              temaItem.innerHTML = `<strong>Tema ${j + 1}:</strong> ${desc}`;

              const subtemas = lesson.querySelectorAll(".dynamic-inputs .input-block");
              const subList = document.createElement("ul");
              subList.classList.add("subtema-list");

              subtemas.forEach((block, k) => {
                const label = block.querySelector(".Lesson-Point-Lable")?.textContent.trim();
                if (label === "Subtema") {
                  const subValue = block.querySelector("input")?.value.trim() || "Subtema sin título";
                  const subItem = document.createElement("li");
                  subItem.textContent = `Subtema ${j + 1}.${k + 1}: ${subValue}`;
                  subList.appendChild(subItem);
                }
              });

              if (subList.children.length > 0) {
                temaItem.appendChild(subList);
              }

              temaList.appendChild(temaItem);
            });

            moduleDiv.appendChild(temaList);
          }

          structureContainer.appendChild(moduleDiv);
        });
      }

      // RENDER auxiliary trees
      renderTareasTree();
      renderExamsTree();
      renderResourcesTree();
      renderLiveClassesTree();
    }

    // === RENDER TAREAS TREE ===
    function renderTareasTree() {
      const tareasContainer = document.getElementById("PCBB-HW");
      if (!tareasContainer) return;

      tareasContainer.innerHTML = "";

      const modules = document.querySelectorAll(".module");
      if (modules.length === 0) {
        tareasContainer.innerHTML = `<p style="color:#999;">No hay módulos o tareas para mostrar.</p>`;
        return;
      }

      modules.forEach((module, i) => {
        const moduleTitle = module.querySelector(".Titulo-Tema-Input")?.value.trim() || "Sin título";
        const moduleDiv = document.createElement("div");
        moduleDiv.classList.add("tareas-module");
        moduleDiv.innerHTML = `<h2>Módulo ${i + 1}: ${moduleTitle}</h2>`;

        const lessons = module.querySelectorAll(".lesson");
        const tareaList = document.createElement("ul");
        tareaList.classList.add("tarea-list");

        let tareaCount = 0;

        lessons.forEach((lesson) => {
          const hwBlocks = lesson.querySelectorAll(".dynamic-inputs .input-block");
          hwBlocks.forEach((block) => {
            const label = block.querySelector(".Lesson-Point-Lable")?.textContent.trim() || "";
            if (label.includes("Tarea") || label.toLowerCase().includes("homework")) {
              tareaCount++;
              const hwTitle =
                block.querySelector(".hw-title")?.value.trim() ||
                block.querySelector("input")?.value.trim() ||
                "Tarea sin título";

              const li = document.createElement("li");
              li.innerHTML = `<strong>Tarea ${tareaCount}:</strong> ${hwTitle}`;
              tareaList.appendChild(li);
            }
          });
        });

        if (tareaList.children.length > 0) {
          moduleDiv.appendChild(tareaList);
        } else {
          moduleDiv.innerHTML += `<p style="color:#888; font-size:0.9rem;">No hay tareas en este módulo.</p>`;
        }

        tareasContainer.appendChild(moduleDiv);
      });

      document.querySelectorAll("#PCBB-HW .tareas-module h2").forEach((title) => {
        title.addEventListener("click", () => {
          const module = title.parentElement;
          module.classList.toggle("collapsed");
          const list = module.querySelector(".tarea-list");
          if (list) list.classList.toggle("collapsed");
        });
      });
    }

    // === RENDER EXAMS TREE ===
    function renderExamsTree() {
      const examsContainer = document.getElementById("PCBB-Exams");
      if (!examsContainer) return;

      examsContainer.innerHTML = "";

      const modules = document.querySelectorAll(".module");
      if (modules.length === 0) {
        examsContainer.innerHTML = `<p>No hay módulos o exámenes para mostrar.</p>`;
        return;
      }

      modules.forEach((module, i) => {
        const moduleTitle = module.querySelector(".Titulo-Tema-Input")?.value.trim() || "Sin título";
        const moduleDiv = document.createElement("div");
        moduleDiv.classList.add("exams-module");
        moduleDiv.innerHTML = `<h2>Módulo ${i + 1}: ${moduleTitle}</h2>`;

        const lessons = module.querySelectorAll(".lesson");
        const examList = document.createElement("ul");
        examList.classList.add("exam-list");

        let examCount = 0;

        lessons.forEach((lesson) => {
          const examBlocks = lesson.querySelectorAll(".dynamic-inputs .input-block");
          examBlocks.forEach((block) => {
            const label = block.querySelector(".Lesson-Point-Lable")?.textContent.trim() || "";
            if (label.includes("Examen") || label.toLowerCase().includes("exam")) {
              examCount++;
              const examTitle =
                block.querySelector(".exam-title")?.value.trim() ||
                block.querySelector("input")?.value.trim() ||
                "Examen sin título";

              const li = document.createElement("li");
              li.innerHTML = `<strong>Examen ${examCount}:</strong> ${examTitle}`;
              examList.appendChild(li);
            }
          });
        });

        if (examList.children.length > 0) {
          moduleDiv.appendChild(examList);
        } else {
          moduleDiv.innerHTML += `<p style="color:#888; font-size:0.9rem;">No hay exámenes en este módulo.</p>`;
        }

        examsContainer.appendChild(moduleDiv);
      });

      document.querySelectorAll("#PCBB-Exams .exams-module h2").forEach((title) => {
        title.addEventListener("click", () => {
          const module = title.parentElement;
          module.classList.toggle("collapsed");
          const list = module.querySelector(".exam-list");
          if (list) list.classList.toggle("collapsed");
        });
      });
    }

    // === RENDER RESOURCES TREE ===
    function renderResourcesTree() {
      const resourcesContainer = document.getElementById("PCBB-Resources");
      if (!resourcesContainer) return;

      resourcesContainer.innerHTML = "";

      const modules = document.querySelectorAll(".module");
      if (modules.length === 0) {
        resourcesContainer.innerHTML = `<p style="color:#999;">No hay módulos o archivos para mostrar.</p>`;
        return;
      }

      modules.forEach((module, i) => {
        const moduleTitle = module.querySelector(".Titulo-Tema-Input")?.value.trim() || "Sin título";
        const moduleDiv = document.createElement("div");
        moduleDiv.classList.add("resources-module");
        moduleDiv.innerHTML = `<h2>Módulo ${i + 1}: ${moduleTitle}</h2>`;

        const lessons = module.querySelectorAll(".lesson");
        const resourceList = document.createElement("ul");
        resourceList.classList.add("resource-list");

        let fileCount = 0;

        lessons.forEach((lesson) => {
          const fileBlocks = lesson.querySelectorAll(".dynamic-inputs .input-block");
          fileBlocks.forEach((block) => {
            const label = block.querySelector(".Lesson-Point-Lable")?.textContent.trim() || "";
            if (label.includes("Archivo") || label.includes("Archivos") || label.toLowerCase().includes("file")) {
              const fileInputs = block.querySelectorAll("input[type='file']");
              fileInputs.forEach((fi) => {
                if (fi.files && fi.files.length) {
                  Array.from(fi.files).forEach((file) => {
                    fileCount++;
                    const li = document.createElement("li");
                    li.innerHTML = `<strong>Archivo ${fileCount}:</strong> ${file.name}`;
                    resourceList.appendChild(li);
                  });
                }
              });
            }
          });
        });

        if (resourceList.children.length > 0) {
          moduleDiv.appendChild(resourceList);
        } else {
          moduleDiv.innerHTML += `<p style="color:#888; font-size:0.9rem;">No hay archivos en este módulo.</p>`;
        }

        resourcesContainer.appendChild(moduleDiv);
      });

      document.querySelectorAll("#PCBB-Resources .resources-module h2").forEach((title) => {
        title.addEventListener("click", () => {
          const module = title.parentElement;
          module.classList.toggle("collapsed");
          const list = module.querySelector(".resource-list");
          if (list) list.classList.toggle("collapsed");
        });
      });
    }

    // === RENDER LIVE CLASSES TREE ===
    function renderLiveClassesTree() {
      const liveContainer = document.getElementById("PCBB-Live-Class");
      if (!liveContainer) return;

      liveContainer.innerHTML = ""; // clear previous content

      const modules = document.querySelectorAll(".module");
      if (!modules.length) {
        liveContainer.innerHTML = `<p style="color:#999;">No hay módulos o clases en vivo para mostrar.</p>`;
        return;
      }

      modules.forEach((module, i) => {
        const moduleTitle = module.querySelector(".Titulo-Tema-Input")?.value.trim() || "Sin título";

        const moduleDiv = document.createElement("div");
        moduleDiv.classList.add("live-module");

        const moduleHeader = document.createElement("h2");
        moduleHeader.textContent = `Módulo ${i + 1}: ${moduleTitle}`;
        moduleHeader.style.cursor = "pointer";
        moduleDiv.appendChild(moduleHeader);

        const classList = document.createElement("div");
        classList.classList.add("live-class-list");
        moduleDiv.appendChild(classList);

        let classCount = 0;

        module.querySelectorAll(".lesson").forEach((lesson) => {
          lesson.querySelectorAll(".dynamic-inputs .input-block").forEach((block) => {
            const isLiveClass =
              block.dataset.type === "clase-en-vivo" ||
              (block.querySelector(".Lesson-Point-Lable")?.textContent.toLowerCase() || "").includes("clase en vivo");

            if (isLiveClass) {
              classCount++;
              const classTitle = block.querySelector(".live-title")?.value.trim() || "Clase sin título";

              const classItem = document.createElement("p");
              classItem.textContent = `Clase ${classCount}: ${classTitle}`;
              classList.appendChild(classItem);
            }
          });
        });

        if (!classCount) {
          const emptyMsg = document.createElement("p");
          emptyMsg.style.color = "#888";
          emptyMsg.textContent = "No hay clases en vivo en este módulo.";
          classList.appendChild(emptyMsg);
        }

        moduleHeader.addEventListener("click", () => {
          classList.classList.toggle("collapsed");
        });

        liveContainer.appendChild(moduleDiv);
      });
    }


    // === EXTRACT MODULE DATA ===
    function extractModuleData() {
      const modules = document.querySelectorAll(".module");
      const moduleData = [];

      modules.forEach((moduleDiv, index) => {
        const moduleObj = {
          title: moduleDiv.querySelector(".Titulo-Tema-Input")?.value.trim() || "",
          sections: {}
        };

        // Process each lesson in this module
        const lessons = moduleDiv.querySelectorAll(".lesson");
        lessons.forEach((lesson, lessonIndex) => {
          // Process dynamic input blocks in this lesson
          const dynamicBlocks = lesson.querySelectorAll(".dynamic-inputs .input-block");

          dynamicBlocks.forEach(block => {
            let sectionType = block.dataset.type || (block.querySelector(".Lesson-Point-Lable")?.textContent || "").trim().toLowerCase();
            if (!sectionType) sectionType = "unknown";

            if (!moduleObj.sections[sectionType]) moduleObj.sections[sectionType] = [];

            const values = {};

            // Collect inputs, textareas, selects
            block.querySelectorAll("input, textarea, select").forEach(input => {
              if (input.type === "file") {
                const names = [];
                if (input.files && input.files.length) Array.from(input.files).forEach(f => names.push(f.name));
                values[input.className || input.name || input.type] = names;
              } else {
                values[input.className || input.name || input.type] = input.value;
              }
            });

            // Always include _label
            values._label = block.querySelector(".Lesson-Point-Lable")?.textContent?.trim() || sectionType;

            moduleObj.sections[sectionType].push(values);
          });
        });

        moduleData.push(moduleObj);
      });

      return moduleData;
    }


    // Expose moduleData via a global helper if you want to use it elsewhere
    window.getCourseModuleData = extractModuleData;

    // Initial render
    renderPreview();
  }












// === Helpers ===
function normalizeString(s = "") {
  // remove accents, normalize case and trim
  return s
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // strip diacritics
    .toLowerCase()
    .trim();
}




function getCategoryCode(categoryName, levelName) {
  if (!businessData || !categoryName || !levelName) return null;

  // --- Extract category names from CourseCategory array ---
  const catObjs = businessData.CourseCategory || [];
  const categoryList = catObjs.map(obj => Object.keys(obj)[0]);  
  // Example: ["Inteligencia Artificial", "Negocios", "Diseño", ...]

  // --- Normalize ---
  const normalizedList = categoryList.map(c => normalizeString(c));
  const target = normalizeString(categoryName);

  // --- Find index of category ---
  const categoryIndex = normalizedList.indexOf(target);
  if (categoryIndex === -1) {
    console.warn("Category not found:", categoryName, normalizedList);
    return null;
  }

  // --- Level mapping ---
  const levelMap = {
    Beginner: "B",
    Intermediate: "I",
    Advanced: "A"
  };

  const levelKey = Object.keys(levelMap)
    .find(k => normalizeString(k) === normalizeString(levelName));

  if (!levelKey) {
    console.warn("Level not recognized:", levelName);
    return null;
  }

  const levelCode = levelMap[levelKey];

  // --- Return CODE (like "0B") ---
  return `${categoryIndex}${levelCode}`;
}
function Activechecknumber(categoryName, levelName) {
  const allCategories = classroomData?.courses || {};

  // Category → Level → Courses
  const levelObj = allCategories?.[categoryName]?.[levelName] ?? null;

  // If nothing exists yet → start at "01"
  if (!levelObj || Object.keys(levelObj).length === 0) {
    return "01";
  }

  // Example keys inside levelObj:
  // { "0B01": {...}, "0B02": {...} }
  const keys = Object.keys(levelObj);

  // Extract the numeric part (last 2 digits)
  const numbers = keys.map(key => {
    const num = key.slice(-2);   // "01", "02", "15"
    return parseInt(num, 10);
  });

  // Find highest number
  const max = Math.max(...numbers);

  // Next number + zero padded to always be 2 digits
  const nextNum = String(max + 1).padStart(2, "0");

  return nextNum;   // ex: "03"
}
function CreateFullCourseID(categoryName, levelName) {

  const data = getCategoryCode(categoryName, levelName)
  const prefix = Activechecknumber(categoryName,levelName)

  const id = data + prefix
  return id;
}



























  function renderTeacherInfo() {
    const teacherName = teacherData?.fullName || "Nombre del Instructor";
    const teacherBio = teacherData?.bio || "Biografía del instructor no disponible.";
    renderText(teacherName, "Teacher-Name")
    renderText(teacherBio, "Teacher-Creds")


  }







function renderCoursePreview() {
  // ---------- Grab basic inputs safely ----------
  const title = document.getElementById("Title-Input")?.value || "";
  const durationValue = document.getElementById("Duration-Input")?.value || "";
  const durationUnit = document.getElementById("Duration-Unit")?.value || "";

  const levelCheckboxes = document.querySelectorAll('input[name="level"]:checked') || [];
  const levels = Array.from(levelCheckboxes)
    .map(cb => cb.nextElementSibling?.textContent?.trim() || cb.value || "")
    .filter(Boolean)
    .join(", ");

  const selectedCategoriesDiv = document.getElementById("selectedCategories");
  const categories = selectedCategoriesDiv
    ? Array.from(selectedCategoriesDiv.children).map(el => el.textContent.trim()).filter(Boolean).join(", ")
    : "";

  const includeListDiv = document.getElementById("includeList");
  const inclusions = includeListDiv
    ? Array.from(includeListDiv.children).map(el => el.textContent.trim()).filter(Boolean)
    : [];

  const description = document.getElementById("descriptionInput")?.value || "";
  const videoLink = document.getElementById("videoLinkInput")?.value || "";

  const imagePreviewDiv = document.getElementById("imagePreview");
  const imageElement = imagePreviewDiv?.querySelector("img");
  const imageSrc = imageElement?.src || "https://placehold.co/600x400?text=Preview+Image";


  // ---------- Render main info safely ----------
  const previewTitleEl = document.getElementById("Preview-Course-Title");
  if (previewTitleEl) previewTitleEl.textContent = title;

  const cDurationEl = document.getElementById("C-Durtation");
  if (cDurationEl) cDurationEl.textContent = `${durationValue} ${durationUnit}`.trim();

  const sLevelEl = document.getElementById("S-Level");
  if (sLevelEl) sLevelEl.textContent = levels;

  const previewCategoriesBlock = document.querySelector(".Preview-Categorías-Block");
  if (previewCategoriesBlock) previewCategoriesBlock.textContent = categories;

  const previewTagsDiv = document.querySelector(".Preview-Active-Tags-Block");
  if (previewTagsDiv) {
    previewTagsDiv.innerHTML = "";
    inclusions.forEach(item => {
      const span = document.createElement("span");
      span.textContent = item;
      previewTagsDiv.appendChild(span);
    });
  }

  const courseDescEl = document.getElementById("Course-Description");
  if (courseDescEl) courseDescEl.textContent = description;

  // ---------- Video preview ----------
  const previewVideo = document.getElementById("Preview-Video-Intro");
  if (previewVideo) {
    previewVideo.innerHTML = "";
    if (videoLink) {
      let embedHTML = "";
      if (videoLink.includes("youtube.com") || videoLink.includes("youtu.be")) {
        const id = videoLink.split("v=")[1]?.split("&")[0] || videoLink.split("youtu.be/")[1];
        if (id) embedHTML = `<iframe class="preview-video" src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen></iframe>`;
        else embedHTML = `<a href="${videoLink}" target="_blank">Ver video</a>`;
      } else if (videoLink.includes("vimeo.com")) {
        const id = videoLink.split("vimeo.com/")[1]?.split(/[?/]/)[0];
        embedHTML = id ? `<iframe class="preview-video" src="https://player.vimeo.com/video/${id}" frameborder="0" allowfullscreen></iframe>` : `<a href="${videoLink}" target="_blank">Ver video</a>`;
      } else if (videoLink.match(/\.(mp4|mov|webm|ogg)$/i)) {
        embedHTML = `<video class="preview-video" controls><source src="${videoLink}"></video>`;
      } else {
        embedHTML = `<a href="${videoLink}" target="_blank">Ver video</a>`;
      }
      previewVideo.innerHTML = embedHTML;
    } else {
      previewVideo.innerHTML = "<p>No se ha agregado un video promocional.</p>";
    }
  }

  const previewImgEl = document.getElementById("Preview-Course-Img");
  if (previewImgEl) previewImgEl.innerHTML = `<img src="${imageSrc}" alt="Course Image" style="max-width:100%;">`;

  // ---------- Render modules + lessons safely ----------
  let modules = [];
  try {
    modules = window.getCourseModuleData ? window.getCourseModuleData() : [];
    if (!Array.isArray(modules)) modules = [];
  } catch (err) {
    modules = [];
  }

  const previewBlock = document.getElementById("modules-Prview-block");
  if (!previewBlock) {
    // If preview block is missing, avoid throwing — silently return
    return;
  }
  previewBlock.innerHTML = "";

  modules.forEach((mod, i) => {
    const moduleDiv = document.createElement("div");
    moduleDiv.classList.add("preview-module");
    moduleDiv.innerHTML = `<h2>Módulo ${i + 1}: ${mod?.title || "Sin título"}</h2>`;

    const lessons = Array.isArray(mod?.lessons) ? mod.lessons : [];
    lessons.forEach((lesson, j) => {
      const lessonDiv = document.createElement("div");
      lessonDiv.classList.add("preview-lesson");
      lessonDiv.innerHTML = `<h3>Lección ${j + 1}</h3><p>${lesson?.description || ""}</p>`;

      const dynamicArray = Array.isArray(lesson?.dynamic) ? lesson.dynamic : [];
      dynamicArray.forEach(dyn => {
        if (dyn && typeof dyn === "object") {
          Object.keys(dyn).forEach(key => {
            if (key !== "_label" && dyn[key] != null && !(Array.isArray(dyn[key]) && dyn[key].length === 0)) {
              const label = dyn._label || key;
              const value = Array.isArray(dyn[key]) ? dyn[key].join(", ") : dyn[key];
              lessonDiv.innerHTML += `<p><strong>${label}:</strong> ${value}</p>`;
            }
          });
        }
      });

      moduleDiv.appendChild(lessonDiv);
    });

    previewBlock.appendChild(moduleDiv);
  });
}


  // Update preview on main input changes
  ["Title-Input", "Duration-Input", "Duration-Unit", "descriptionInput", "videoLinkInput"].forEach(id => {
    document.getElementById(id)?.addEventListener("input", renderCoursePreview);
  });

  // Initial preview
  renderCoursePreview();

  // Attach to button
  document.getElementById("Show-Btn").addEventListener("click", renderCoursePreview);


function getAllHomeworkData() {
  const homeworkBlocks = document.querySelectorAll(".input-block[data-type='tarea']");
  const tareas = [];

  homeworkBlocks.forEach(block => {
    const title = block.querySelector(".hw-title")?.value.trim() || "";
    const desc = block.querySelector(".hw-desc")?.value.trim() || "";
    const date = block.querySelector(".hw-date")?.value || "";

    // collect ALL file inputs inside this homework
    const fileInputs = block.querySelectorAll(".file-inputs input[type='file']");
    const files = [];

    fileInputs.forEach(input => {
      if (!input.files) return;
      for (const file of input.files) files.push(file);
    });

    tareas.push({
      title,
      desc,
      date,
      files  // actual file objects
    });
  });

  return tareas;
}
function getAllLiveClassData() {
  const liveBlocks = document.querySelectorAll(".input-block[data-type='clase-en-vivo']");
  const clases = [];

  liveBlocks.forEach(block => {
    const title = block.querySelector(".live-title")?.value.trim() || "";
    const datetime = block.querySelector(".live-datetime")?.value || "";
    const duration = block.querySelector(".live-duration")?.value || "";
    const desc = block.querySelector(".live-desc")?.value.trim() || "";

    const fileInputs = block.querySelectorAll(".file-inputs input[type='file']");
    const files = [];

    fileInputs.forEach(input => {
      if (!input.files) return;
      for (const f of input.files) files.push(f);
    });

    clases.push({
      title,
      datetime,
      duration,
      desc,
      files
    });
  });

  return clases;
}


  function getAllCourseFiles() {
    const fileBlocks = document.querySelectorAll(".input-block[data-type='archivos']");
    const result = [];

    fileBlocks.forEach(block => {
      const input = block.querySelector("input[type='file']");
      if (!input || input.files.length === 0) return;

      for (const file of input.files) {
        result.push(file);
      }
    });

    return result;
  }
async function uploadCourseFilesToStorage(courseId) {
  const files = getAllCourseFiles();
  if (files.length === 0) return [];

  const uploaded = [];

  for (const file of files) {
    const ext = file.name.split(".").pop().toLowerCase();
    const safeName = file.name.replace(/[^\w\s.-]/g, "_");

    const filePath = `CorsoSkillsClassrooms/${TBuInfo}/Courses/${courseId}/Archivos/${safeName}`;
    const storageRefFile = ref(storage, filePath);

    await uploadBytes(storageRefFile, file);
    const url = await getDownloadURL(storageRefFile);

    // 🔥 THIS IS WHAT YOU WERE MISSING
    uploaded.push({
      name: file.name,
      type: ext,
      url: url
    });
  }

  return uploaded;
}
async function uploadHomeworkFilesToStorage(courseId, tareas) {
  const result = [];

  for (const tarea of tareas) {
    const uploadedFiles = [];

    for (const file of tarea.files) {
      const ext = file.name.split(".").pop().toLowerCase();
      const safeName = file.name.replace(/[^\w\s.-]/g, "_");

      const filePath = `CorsoSkillsClassrooms/${TBuInfo}/Courses/${courseId}/Tareas/${safeName}`;
      const storageRefFile = ref(storage, filePath);

      await uploadBytes(storageRefFile, file);
      const url = await getDownloadURL(storageRefFile);

      uploadedFiles.push({
        name: file.name,
        type: ext,
        url
      });
    }

    result.push({
      title: tarea.title,
      desc: tarea.desc,
      date: tarea.date,
      files: uploadedFiles
    });
  }

  return result;
}
async function uploadLiveClassFilesToStorage(courseId, clases) {
  const result = [];

  for (const clase of clases) {
    const uploadedFiles = [];

    for (const file of clase.files) {
      const ext = file.name.split(".").pop().toLowerCase();
      const safeName = file.name.replace(/[^\w\s.-]/g, "_");

      const filePath = `CorsoSkillsClassrooms/${TBuInfo}/Courses/${courseId}/ClasesEnVivo/${safeName}`;
      const storageRefFile = ref(storage, filePath);

      await uploadBytes(storageRefFile, file);
      const url = await getDownloadURL(storageRefFile);

      uploadedFiles.push({
        name: file.name,
        type: ext,
        url
      });
    }

    result.push({
      title: clase.title,
      datetime: clase.datetime,
      duration: clase.duration,
      desc: clase.desc,
      files: uploadedFiles
    });
  }

  return result;
}


// --- SHOW LOADING POPUP ---
function showLoadingPopup() {
  const popup = document.getElementById("loading-popup");
  if (popup) popup.style.display = "flex";
}
// --- HIDE LOADING POPUP ---
function hideLoadingPopup() {
  const popup = document.getElementById("loading-popup");
  if (popup) popup.style.display = "none";
}

function initNextStepHandler() {
  const nextBtn = document.getElementById("Save-Btn");
  if (!nextBtn) {
    console.warn("Next button (#Next-Btn) not found.");
    return;
  }

  nextBtn.addEventListener("click", async () => {
    const originalText = "Próximo Paso";

    try {
      // INPUTS
      const title = document.getElementById("Title-Input")?.value.trim() || "";
      const description = document.getElementById("descriptionInput")?.value.trim() || "";
      const duration = document.getElementById("Duration-Input")?.value.trim() || "";
      const durationUnit = document.getElementById("Duration-Unit")?.value || "horas";
      const videoLink = document.getElementById("videoLinkInput")?.value.trim() || "";
      const imageFile = document.getElementById("imageInput")?.files?.[0] || null;

      const selectedCategories = window.selected || [];
      const selectedLevelEl = document.querySelector(".level-checkboxes input:checked");
      const selectedLevel = selectedLevelEl ? selectedLevelEl.value : "";

      const includeListEl = document.getElementById("includeList");
      const includes = includeListEl
        ? Array.from(includeListEl.querySelectorAll(".CIC-item")).map(el =>
            el.textContent.replace("×", "").trim()
          )
        : [];

      // VALIDATION
      if (!title || !description || !imageFile || selectedCategories.length === 0 || !selectedLevel || !duration) {
        alert("⚠️ Completa todos los campos obligatorios antes de continuar.");
        return;
      }

      nextBtn.textContent = "Guardando...";
      nextBtn.style.opacity = "0.6";
      nextBtn.style.pointerEvents = "none";

      showLoadingPopup();   // ⬅️⬅️ START LOADING POPUP

      // =======================================================
      // GENERATE COURSE ID
      // =======================================================
      let courseId = null;
      const selectedCategory = selectedCategories[0];

      if (typeof CreateFullCourseID === "function") {
        try {
          courseId = CreateFullCourseID(selectedCategory, selectedLevel);
        } catch (err) {}
      }

      if (!courseId) {
        const fallback = title.replace(/[^\w\s-]/g, "").replace(/\s+/g, "_").toLowerCase();
        courseId = `${fallback}_${Date.now()}`;
      }

      // =======================================================
      // IMAGE UPLOAD
      // =======================================================
      let imageURL = "";

      try {
        const safeName = title.replace(/[^\w\s-]/g, "").replace(/\s+/g, "_").slice(0, 60);
        const ext = (imageFile.name || "jpg").split(".").pop();

        const filePath = `CorsoSkillsClassrooms/${TBuInfo}/Courses/${courseId}/${safeName}.${ext}`;
        const storageRefFile = ref(storage, filePath);

        await uploadBytes(storageRefFile, imageFile);
        imageURL = await getDownloadURL(storageRefFile);

      } catch (err) {
        console.error("❌ Error uploading course image:", err);
        hideLoadingPopup();
        alert("Error al subir la imagen del curso.");
        return;
      }

      // =======================================================
      // FILE UPLOADS
      // =======================================================
      let uploadedFiles = [];
      let archivosContentBlock = { type: "archivos", fileURLs: [] };

      try {
        uploadedFiles = await uploadCourseFilesToStorage(courseId);

        archivosContentBlock = {
          type: "archivos",
          fileURLs: uploadedFiles
        };

      } catch (err) {
        console.error("❌ Error uploading files:", err);
        hideLoadingPopup();
        alert("Error al subir archivos adjuntos.");
      }

      // HOMEWORK
      let homeworkContentBlock = null;
      try {
        const tareas = getAllHomeworkData();
        const uploadedHomework = await uploadHomeworkFilesToStorage(courseId, tareas);

        homeworkContentBlock = {
          type: "tarea",
          tareas: uploadedHomework
        };
      } catch (err) {
        console.error("❌ Error uploading homework files:", err);
      }

      // LIVE CLASSES
      let liveClassContentBlock = null;
      try {
        const clases = getAllLiveClassData();
        const uploadedLiveClasses = await uploadLiveClassFilesToStorage(courseId, clases);

        liveClassContentBlock = {
          type: "clase-en-vivo",
          clases: uploadedLiveClasses
        };
      } catch (err) {
        console.error("❌ Error uploading live class files:", err);
      }

      // =======================================================
      // FINAL COURSE OBJECT
      // =======================================================
      const courseData = {
        Id: courseId,
        title,
        description,
        duration: {
          value: Number(duration),
          unit: durationUnit
        },
        videoLink,
        imagePreviewURL: imageURL,
        includes,
        createdAt: new Date().toISOString(),
        createdBy: {
          teacherId: UserUidInfo || null,
          teacherName: (teacherData && teacherData.fullName) || null
        },
        "Courses Content": [
          ...(window.getCourseModuleData ? window.getCourseModuleData() : []),
          archivosContentBlock,
          homeworkContentBlock,
          liveClassContentBlock
        ]
      };

      // =======================================================
      // SAVE TO FIRESTORE
      // =======================================================
      const classroomsDocRef = doc(db, "CorsoSkillsClassrooms", TBuInfo);

      const patch = {
        courses: {
          [selectedCategory]: {
            [selectedLevel]: {
              [courseId]: courseData
            }
          }
        }
      };

      await setDoc(classroomsDocRef, patch, { merge: true });

      localStorage.setItem("CorsoSkills_CurrentCourseID", courseId);
      localStorage.setItem("CorsoSkills_CurrentCourseData", JSON.stringify(courseData));

      window.courseBasicInfo = { id: courseId, ...courseData };

      hideLoadingPopup();    // ⬅️ CLOSE POPUP BEFORE SUCCESS ALERT
      alert("✅ Información básica guardada con éxito.");
      setTimeout(() => location.reload(), 2000);
      // NAVIGATION
      const basicBlock = document.getElementById("Basic-Info-Block-1");
      const starterBlock = document.getElementById("Starter-Page-Block-2");

      if (basicBlock) basicBlock.style.display = "none";
      if (starterBlock) starterBlock.style.display = "block";

    } catch (err) {
      console.error(err);
      hideLoadingPopup();   // ⬅️ CLOSE POPUP ON ERROR
      alert("❌ Ocurrió un error al guardar.");
    } finally {
      nextBtn.textContent = originalText;
      nextBtn.style.opacity = "1";
      nextBtn.style.pointerEvents = "auto";
    }
  });

  // ===========================================================
  // Include List Handler
  // ===========================================================
  const includeInput = document.getElementById("includeInput");
  const includeList = document.getElementById("includeList");

  if (includeInput && includeList) {
    includeInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter" && includeInput.value.trim() !== "") {
        e.preventDefault();

        const item = document.createElement("span");
        item.classList.add("CIC-item");
        item.textContent = includeInput.value;

        const removeBtn = document.createElement("i");
        removeBtn.classList.add("fa-solid", "fa-xmark", "remove-include");
        removeBtn.addEventListener("click", () => item.remove());

        item.appendChild(removeBtn);
        includeList.appendChild(item);

        includeInput.value = "";
      }
    });
  }
}





function setLoadingGif() {
  const img = document.querySelector('#Loading-Icon');
  if (!img) {
    console.warn("Loading GIF image not found.");
    return;
  }

  img.setAttribute("src", businessData.BuLogos.Icon);

  // Add rotation animation class
  img.classList.add("rotate-loading");
}

setLoadingGif();





  











  renderTeacherInfo()
  initNextStepHandler()
  SetModuleBlock()
  renderheadercont()
  courseCreateNav()
  CourseBasicInfo()
}
fetchAllContent()








  function courseTabNav() {
    // --- Elements ---
    const navItems = document.querySelectorAll(".tabs .tabs-Btns");
    const blocks = [
      document.getElementById("PCBB-Bottom-1"),
      document.getElementById("PCBB-Bottom-2"),
      document.getElementById("PCBB-Bottom-3"),
      document.getElementById("PCBB-Bottom-4"),
      document.getElementById("PCBB-Bottom-5"),
    ];

    // If nothing found, stop
    if (!navItems.length || !blocks.length) return;

    let currentIndex = 0;

    // --- Activate section by index ---
    function activateSection(index) {
      // Update active nav item
      navItems.forEach((item, i) => {
        item.classList.toggle("active", i === index);
      });

      // Show corresponding content block
      blocks.forEach((block, i) => {
        if (block) block.classList.toggle("active-block", i === index);
      });

      currentIndex = index;
    }

    // --- Initialize first section ---
    activateSection(0);

    // --- Click on nav item ---
    navItems.forEach((item, index) => {
      item.addEventListener("click", () => activateSection(index));
    });
  }

  courseTabNav()









document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("sidebar");
  const openBtn = document.getElementById("open");
  const closeBtn = document.getElementById("close");
  const menuToggle = document.getElementById("menuToggle");
  const linkNames = document.querySelectorAll(".linkName");
  const mobileSidebar = document.getElementById("Mobile-sidebar"); // Make sure this ID exists

  function showSidebarText() {
    linkNames.forEach(el => el.style.display = "inline");
    openBtn.style.display = "none";
    closeBtn.style.display = "flex";
    navbar.style.width = "10rem";
  }

  function hideSidebarText() {
    linkNames.forEach(el => el.style.display = "none");
    closeBtn.style.display = "none";
    openBtn.style.display = "flex";
    navbar.style.width = "5rem";
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



