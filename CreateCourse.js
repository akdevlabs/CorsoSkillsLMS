// Import the functions you need from the SDKs
import { 
  getAuth, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  collection, 
  addDoc, 
  setDoc, 
  serverTimestamp,
   updateDoc, 
   arrayUnion 
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { 
  getStorage, 
  ref, 
  uploadBytes, 
uploadBytesResumable, 
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

const auth = getAuth(app);
// Get logged-in user ID from local storage
const UserUidInfo = localStorage.getItem("UserUidInfo");

// Optional: define your business unit
const TBuInfo = "CorsoSkills"; // could be used later to create dynamic paths


// ---------- AUTH STATE ----------
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("✅ Usuario autenticado:", user.email);
    localStorage.setItem("ActiveLogedin", "true");
    localStorage.setItem("UserUidInfo", user.uid);
  } else {
    console.warn("🚫 Usuario no autenticado. Redirigiendo...");
    localStorage.removeItem("ActiveLogedin");
    window.location.href = "login.html";
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

    `;
    document.head.appendChild(style);


  }
  function SetBIBPreviewColors(){
    setBackgroundColor("#Title-Input", Prime3)
    setTextColors(".fa-eye", Prime2)
    const style = document.createElement("style");
    style.textContent = `
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
        color: ${Prime3};
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








    `;
    document.head.appendChild(style);


  }









 






  setGlobalFont(data.Font)
  RenderUserInfoColors()
  RenderNavBlock()
  sidebarcolors()
  SetmodulesColors()
  SetCourseCreatorNav()
  RenderBasicInfo()
  RenderContentBlock()
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
  function renderUserIcon(ID) {
    const container = document.getElementById(ID);
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
  
  renderUserIcon("profile-Icon")
  renderUserIcon("Teacher-Img")

function renderCourseSelector() {
  const AllCourses = businessData.Courses;
  const categorias = Object.keys(AllCourses);

  // Traducciones (English → Spanish)
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

  // DOM references
  const container = document.getElementById("categoriaSelect");
  const selectedContainer = document.getElementById("selectedCategories");

  const dropdown = document.createElement("div");
  dropdown.classList.add("dropdown");

  // Crear opciones (mostrar español, guardar inglés)
  categorias.forEach(cat => {
    const option = document.createElement("div");
    option.classList.add("dropdown-option");
    option.textContent = traducciones[cat] || cat;
    option.dataset.value = cat; // store English
    dropdown.appendChild(option);
  });

  container.appendChild(dropdown);

  // Lista global (solo inglés)
  if (!window.selected) window.selected = [];

  // Mostrar / ocultar menú
  container.addEventListener("click", () => {
    dropdown.classList.toggle("active");
  });

  // Seleccionar categoría
  dropdown.addEventListener("click", (e) => {
    if (e.target.classList.contains("dropdown-option")) {
      const value = e.target.dataset.value; // English
      if (!window.selected.includes(value)) {
        window.selected.push(value);
        renderSelectedTags();
      }
    }
  });

  // Renderizar etiquetas (mostrar español)
  function renderSelectedTags() {
    selectedContainer.innerHTML = "";

    window.selected.forEach((value) => {
      const tag = document.createElement("div");
      tag.classList.add("tag");

      // Mostrar español
      const label = document.createElement("span");
      label.textContent = traducciones[value] || value;

      // Botón eliminar
      const removeBtn = document.createElement("button");
      removeBtn.classList.add("remove-btn");
      removeBtn.innerHTML = "&times;";
      removeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        window.selected = window.selected.filter(v => v !== value);
        renderSelectedTags();
      });

      tag.appendChild(label);
      tag.appendChild(removeBtn);
      selectedContainer.appendChild(tag);
    });

    console.log("✅ Categorías seleccionadas (EN):", window.selected);
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
    renderText(teacherData.bio, "Teacher-Creds")
  }




function courseCreateNav() {
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

    if (saveBtn) {
      saveBtn.style.display = blocks[index] === finalizeBlock ? "inline-flex" : "none";
    }

    if (nextBtn) {
      // Hide by default
      nextBtn.style.display = "none";
      // Show only on non-final blocks or if special logic needed
      if (blocks[index] !== finalizeBlock && blocks[index] === basicInfoBlock) {
        nextBtn.style.display = videoInput?.value.trim() ? "flex" : "none";
      } else if (blocks[index] === starterPageBlock) {
        nextBtn.style.display = "flex";
      }
    }

    currentIndex = index;
  }

  activateSection(0);

  navItems.forEach((item, index) => {
    item.addEventListener("click", () => activateSection(index));
  });

  nextBtn?.addEventListener("click", () => {
    const nextIndex = Math.min(currentIndex + 1, blocks.length - 1);
    activateSection(nextIndex);
  });

  videoInput?.addEventListener("input", () => {
    if (blocks[currentIndex] === basicInfoBlock) {
      nextBtn.style.display = videoInput.value.trim() ? "flex" : "none";
    }
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
      const isHidden = block.style.display === "none";

      if (isHidden) {
        block.style.display = "flex";
        lessonsContainer.style.display = "block";
        hideBtn.textContent = "-";
      } else {
        block.style.display = "none";
        lessonsContainer.style.display = "none";
        hideBtn.textContent = "+";
      }
    });

    // === Live update on typing ===
    titleInput.addEventListener("input", renderPreview);

    // === Add lesson button ===
    addLessonBtn.addEventListener("click", () => {
      addLesson(lessonsContainer);
      renderPreview();
    });

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
          <a class="Lesson-Point">*</a>
          <label class="Lesson-Point-Lable">${type}</label>
        </div>        
        <button class="remove-btn">×</button>
      </div>
      <input type="text" placeholder="${placeholder}" />
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
          <a class="Lesson-Point">*</a>
          <label class="Lesson-Point-Lable">Archivos</label>
        </div>  
        <button class="remove-btn">×</button>
      </div>
      <input class="Up-load-btn" type="file" multiple />
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
          <a class="Lesson-Point">*</a>
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
      </div>
    `;
    container.appendChild(block);

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
            <a class="Lesson-Point">*</a>
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
      block.querySelector(".exam-tf").addEventListener("click", () => {
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
      block.querySelector(".exam-cc").addEventListener("click", () => {
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
      block.querySelector(".exam-oq").addEventListener("click", () => {
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
            const label = inputBlock.querySelector("label")?.textContent || "";
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

    // === ALSO RENDER HIERARCHICAL COURSE STRUCTURE ===
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

    // === NEW: RENDER TASK/TAREAS TREE ===
    renderTareasTree();
    renderExamsTree();
    renderResourcesTree()
    renderLiveClassesTree()
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
          if (label.includes("Tarea") || label.includes("Homework")) {
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
    if(list) list.classList.toggle("collapsed");
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
      examsContainer.innerHTML = `<p style="color:#999;">No hay módulos o exámenes para mostrar.</p>`;
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
          if (label.includes("Examen") || label.includes("Exam")) {
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

    // Optional: collapsible module lists
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
          if (label.includes("Archivo") || label.includes("Archivos")) {
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

    // Optional: make module sections collapsible
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
// === RENDER LIVE CLASSES TREE ===
function renderLiveClassesTree() {
  const liveContainer = document.getElementById("PCBB-Live-Class");
  if (!liveContainer) return;

  liveContainer.innerHTML = ""; 

  const modules = document.querySelectorAll(".module");
  if (modules.length === 0) {
    liveContainer.innerHTML = `<p style="color:#999;">No hay módulos o clases en vivo para mostrar.</p>`;
    return;
  }

  modules.forEach((module, i) => {
    const moduleTitle = module.querySelector(".Titulo-Tema-Input")?.value.trim() || "Sin título";

    // Module container
    const moduleDiv = document.createElement("div");
    moduleDiv.classList.add("live-module");

    // Module header (clickable)
    const moduleHeader = document.createElement("h2");
    moduleHeader.textContent = `Módulo ${i + 1}: ${moduleTitle}`;
    moduleHeader.style.cursor = "pointer";
    moduleDiv.appendChild(moduleHeader);

    // Container for live classes
    const classList = document.createElement("div");
    classList.classList.add("live-class-list");
    moduleDiv.appendChild(classList);

    let classCount = 0;
    const lessons = module.querySelectorAll(".lesson");

    lessons.forEach((lesson) => {
      const liveBlocks = lesson.querySelectorAll(".dynamic-inputs .input-block");
      liveBlocks.forEach((block) => {
        const label = block.querySelector(".Lesson-Point-Lable")?.textContent.trim() || "";
        if (label.toLowerCase().includes("clase en vivo") || label.toLowerCase().includes("live")) {
          classCount++;
          const classTitle = block.querySelector(".live-title")?.value.trim() || "Clase sin título";

          const classItem = document.createElement("p");
          classItem.textContent = `Clase ${classCount}: ${classTitle}`;
          classList.appendChild(classItem);
        }
      });
    });

    // Message if no live classes
    if (classCount === 0) {
      const emptyMsg = document.createElement("p");
      emptyMsg.style.color = "#888";
      emptyMsg.textContent = "No hay clases en vivo en este módulo.";
      classList.appendChild(emptyMsg);
    }

    // Collapse/expand functionality
    moduleHeader.addEventListener("click", () => {
      classList.classList.toggle("collapsed");
    });

    liveContainer.appendChild(moduleDiv);
  });
}




}





















  function RenderPreviewBlock() {
    // --- Prevent double initialization ---
    if (RenderPreviewBlock._initialized) return;
    RenderPreviewBlock._initialized = true;

    // ---------- ELEMENTS ----------
    const TitleInput = document.getElementById("Title-Input");
    const CategoriesInput = document.getElementById("selectedCategories");
    const DurationInput = document.getElementById("Duration-Input");
    const DurationTimeInput = document.getElementById("Duration-Unit");
    const tagInput = document.getElementById("tagInput");
    const tagList = document.getElementById("tagList");
    const descriptionInput = document.getElementById("descriptionInput");
    const includeInput = document.getElementById("includeInput");
    const includeList = document.getElementById("includeList");
    const imageInput = document.getElementById("imageInput");
    const videoLinkInput = document.getElementById("videoLinkInput");

    // --- Preview Targets ---
    const titleEl = document.getElementById("Preview-Course-Title");
    const CategoríasList = document.querySelector(".Preview-Categorías-Block");
    const LevelList = document.getElementById("Preview-Level-Block");
    const TagsList = document.querySelector(".Preview-Active-Tags-Block");
    const courseList = document.getElementById("Course-content-List");
    const notesSection = document.getElementById("Course-Description");
    const skillLevelEl = document.getElementById("S-Level");
    const durationEl = document.getElementById("C-Durtation");
    const videoPlayerContainer = document.getElementById("Preview-Video-Intro");
    const imagePreviewContainer = document.getElementById("Preview-Course-Img");

    // ---------- STATE ----------
    let tags = [];
    let includes = [];

    // ---------- HELPERS ----------
    const safeTextFromElement = (el) => {
      if (!el) return "";
      return Array.from(el.childNodes)
        .filter(n => n.nodeType === Node.TEXT_NODE)
        .map(n => n.textContent)
        .join("")
        .trim();
    };

    const getSelectedCategories = () => {
      if (!CategoriesInput) return [];
      return Array.from(CategoriesInput.querySelectorAll(".tag"))
        .map(n => safeTextFromElement(n))
        .filter(Boolean);
    };

    // ---------- TAG INPUT ----------
    const renderTags = () => {
      if (!tagList) return;
      tagList.innerHTML = "";
      tags.forEach((tag, i) => {
        const tagEl = document.createElement("div");
        tagEl.className = "tag-item";
        tagEl.innerHTML = `
          <span class="tag-text">${tag}</span>
          <button type="button" class="remove-tag" data-index="${i}">&times;</button>
        `;
        tagList.appendChild(tagEl);
      });
      updatePreview(false);
    };

    if (tagInput) {
      tagInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          const newTag = tagInput.value.trim();
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

    // ---------- INCLUDE INPUT ----------
    const renderIncludes = () => {
      if (!includeList) return;
      includeList.innerHTML = "";
      includes.forEach((inc, i) => {
        const incEl = document.createElement("div");
        incEl.className = "include-item";
        incEl.innerHTML = `
          <span>${inc}</span>
          <button type="button" class="remove-include" data-index="${i}">&times;</button>
        `;
        includeList.appendChild(incEl);
      });
      updatePreview(false);
    };

    if (includeInput) {
      includeInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          const val = includeInput.value.trim();
          if (!val) return;
          includes.push(val);
          includeInput.value = "";
          renderIncludes();
        }
      });
    }

    if (includeList) {
      includeList.addEventListener("click", (e) => {
        const btn = e.target.closest(".remove-include");
        if (!btn) return;
        const idx = Number(btn.dataset.index);
        if (!Number.isNaN(idx)) {
          includes.splice(idx, 1);
          renderIncludes();
        }
      });
    }

    // ---------- IMAGE UPLOAD ----------
    const dropImage = document.getElementById("dropImage");
    const browseImage = document.getElementById("browseImage");
    const imageInputA = document.getElementById("imageInput"); // ✅ You were missing this line!

    if (dropImage && browseImage && imageInputA) {
      browseImage.addEventListener("click", () => imageInputA.click());

      dropImage.addEventListener("dragover", (e) => e.preventDefault()); // ✅ Prevent default to allow drop
      dropImage.addEventListener("drop", (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
          imageInputA.files = e.dataTransfer.files;
          updatePreview(false);
        } else {
          alert("Por favor selecciona un archivo de imagen válido (jpg o png).");
        }
      });

      imageInputA.addEventListener("change", () => updatePreview(false));
    }

    // ---------- PREVIEW RENDER ----------
    function updatePreview() {
      const title = TitleInput?.value.trim() || "Sin título";
      const description = descriptionInput?.value.trim() || "Sin descripción";
      const levels = [...document.querySelectorAll('input[name="level"]:checked')].map(
        el => el.nextElementSibling?.textContent?.trim() || ""
      ).filter(Boolean);
      const categories = getSelectedCategories();
      const durationValue = DurationInput?.value.trim();
      const durationUnit = DurationTimeInput?.value.trim();
      const courseDuration = durationValue ? `${durationValue} ${durationUnit}` : "Sin duración";

      // --- Basic Info ---
      if (titleEl) titleEl.textContent = title;
      if (skillLevelEl) skillLevelEl.textContent = levels.join(", ") || "Sin nivel";
      if (durationEl) durationEl.textContent = courseDuration;
      if (notesSection)
        notesSection.innerHTML = `<h3>Descripción del Curso</h3><p>${description}</p>`;

      // --- Categorías ---
      if (CategoríasList) {
        CategoríasList.innerHTML = categories.length
          ? categories.map(c => `<span class="preview-tag">${c}</span>`).join("")
          : `<span class="preview-tag">Sin categorías</span>`;
      }

      // --- Niveles ---
      if (LevelList) {
        LevelList.innerHTML = levels.length
          ? levels.map(l => `<span class="preview-tag">${l}</span>`).join("")
          : `<span class="preview-tag">Sin nivel seleccionado</span>`;
      }

      // --- Includes ---
      if (courseList) {
        courseList.innerHTML = includes.length
          ? includes.map(i => `<li>${i}</li>`).join("")
          : `<li>No se ha agregado contenido</li>`;
      }

      // --- Tags ---
      if (TagsList) {
        TagsList.innerHTML = tags.length
          ? tags.map(t => `<span class="preview-tag">${t}</span>`).join("")
          : `<span class="preview-tag">Sin etiquetas</span>`;
      }

      // --- Image ---
      if (imagePreviewContainer && imageInput?.files?.[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreviewContainer.innerHTML = `<img src="${e.target.result}" alt="Vista previa del curso" class="preview-course-image" />`;
        };
        reader.readAsDataURL(imageInput.files[0]);
      }

      // --- Video ---
      if (videoPlayerContainer && videoLinkInput) {
        const videoLink = videoLinkInput.value.trim();
        videoPlayerContainer.innerHTML = "";
        if (videoLink) {
          let embedHTML = "";

          if (videoLink.includes("youtube.com") || videoLink.includes("youtu.be")) {
            const id = videoLink.split("v=")[1]?.split("&")[0] || videoLink.split("youtu.be/")[1];
            embedHTML = `<iframe class="preview-video" src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen></iframe>`;
          } else if (videoLink.includes("vimeo.com")) {
            const id = videoLink.split("vimeo.com/")[1]?.split(/[?/]/)[0];
            embedHTML = `<iframe class="preview-video" src="https://player.vimeo.com/video/${id}" frameborder="0" allowfullscreen></iframe>`;
          } else if (videoLink.includes("bunnycdn.com") || videoLink.includes("bunny.net")) {
            embedHTML = `<video class="preview-video" controls><source src="${videoLink}" type="video/mp4"></video>`;
          } else if (videoLink.match(/\.(mp4|mov|webm|ogg)$/i)) {
            embedHTML = `<video class="preview-video" controls><source src="${videoLink}"></video>`;
          } else {
            embedHTML = `<a href="${videoLink}" target="_blank">Ver video</a>`;
          }

          videoPlayerContainer.innerHTML = embedHTML;
        } else {
          videoPlayerContainer.innerHTML = "<p>No se ha agregado un video promocional.</p>";
        }
      }
    }

    // --- Run preview once ---
    updatePreview();

    // Auto-update categories
    const mo = new MutationObserver(() => updatePreview());
    if (CategoriesInput) mo.observe(CategoriesInput, { childList: true, subtree: true });

    // Auto-update video preview
    if (videoLinkInput) videoLinkInput.addEventListener("input", () => updatePreview());
  }

  


    RenderPreviewBlock();









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






// ---------- INITIALIZE COURSE SAVE FEATURE ----------

async function courseSaveHandler() {
  const saveBtn = document.getElementById("Save-Btn");
  const imageInput = document.getElementById("imageInput");
  const videoInput = document.getElementById("videoInput");

  if (!saveBtn || !imageInput) {
    console.error("❌ Missing elements in DOM.");
    return;
  }

  saveBtn.addEventListener("click", async () => {
    const title = document.getElementById("Title-Input")?.value.trim() || "";
    const description = document.getElementById("descriptionInput")?.value.trim() || "";

    const selectedCategories = window.selected && window.selected.length > 0 ? [...window.selected] : [];
    const selectedLevels = Array.from(
      document.querySelectorAll(".level-checkboxes input[type='checkbox']:checked")
    ).map(chk => chk.value);

    const imageFile = imageInput.files && imageInput.files[0];
    const promoVideo = videoInput?.files?.[0] || null;

    if (!title || !description || !imageFile || selectedCategories.length === 0 || selectedLevels.length === 0) {
      alert("⚠️ Completa todos los campos obligatorios antes de continuar.");
      return;
    }

    try {
      saveBtn.textContent = "Guardando...";
      saveBtn.style.pointerEvents = "none";
      saveBtn.style.opacity = "0.6";

      // --- Upload Promo Video ---
      let videoURL = "";
      if (promoVideo) {
        const videoRef = ref(storage, `courses/${UserUidInfo}/${title}/promo.mp4`);
        await uploadBytes(videoRef, promoVideo);
        videoURL = await getDownloadURL(videoRef);
      }

      const imageURL = URL.createObjectURL(imageFile);

      // --- Collect Included Items ---
      const includeListEl = document.getElementById("includeList");
      const includes = includeListEl
        ? Array.from(includeListEl.querySelectorAll(".include-item"))
              .map(el => el.textContent.trim())
              .filter(Boolean)
        : [];
      if (includes.length === 0) console.warn("⚠️ El curso no tiene elementos 'Qué incluye'.");

      // --- Collect Tags ---
      const tagListEl = document.getElementById("tagList");
      const tags = tagListEl
        ? Array.from(tagListEl.querySelectorAll(".tag-text"))
              .map(el => el.textContent.trim())
              .filter(Boolean)
        : [];
      if (tags.length === 0) console.warn("⚠️ El curso no tiene etiquetas asignadas.");

      // --- Collect Course Modules and Lessons ---
      const modulesContainer = document.getElementById("modules-container");
      const moduleElements = modulesContainer.querySelectorAll(".module");
      const courseContent = {};

      moduleElements.forEach((modEl, modIndex) => {
        const lessonsEl = modEl.querySelectorAll(".lesson");
        const moduleData = {};

        lessonsEl.forEach((lessonEl, lessonIndex) => {
          const lessonData = {};
          lessonData.Tema = lessonEl.querySelector(".Titulo-Tema-Input")?.value.trim() || `Tema ${lessonIndex + 1}`;
          lessonData.Description = lessonEl.querySelector("textarea")?.value.trim() || "";

          const dynamicInputs = lessonEl.querySelectorAll(".dynamic-inputs .input-block");

          dynamicInputs.forEach(block => {
            const label = block.querySelector(".Lesson-Point-Lable")?.textContent.trim().toLowerCase() || "";
            if (!label) {
              console.warn(`⚠️ Skipping dynamic input with empty label in Lesson ${lessonIndex + 1}, Module ${modIndex + 1}`);
              return;
            }

            let value;

            // --- LIVE CLASS ---
            if (block.querySelector(".live-title")) {
              const liveTitle = block.querySelector(".live-title")?.value.trim();
              const datetime = block.querySelector(".live-datetime")?.value;
              const duration = parseInt(block.querySelector(".live-duration")?.value) || 0;
              const desc = block.querySelector(".live-desc")?.value.trim();
              const fileInputs = block.querySelectorAll(".live-files");
              const files = [];
              fileInputs.forEach(input => {
                if (input.files && input.files.length > 0) Array.from(input.files).forEach(f => files.push(f.name));
              });
              if (!liveTitle) console.warn(`⚠️ Missing Live class title in Lesson ${lessonIndex + 1}, Module ${modIndex + 1}`);
              value = { Title: liveTitle || "", DateTime: datetime || "", Duration: duration, Description: desc || "", Files: files };
              if (!lessonData.Live) lessonData.Live = [];
              lessonData.Live.push(value);

            // --- EXAM ---
            } else if (block.querySelector(".exam-title")) {
              const examTitle = block.querySelector(".exam-title")?.value.trim();
              if (!examTitle) console.warn(`⚠️ Missing Exam title in Lesson ${lessonIndex + 1}, Module ${modIndex + 1}`);

              const questionsContainer = block.querySelector(".exam-questions");
              const examQuestions = [];

              if (questionsContainer) {
                questionsContainer.querySelectorAll(".exam-question-block").forEach(qEl => {
                  const qData = {};
                  const mainQ = qEl.querySelector(".Main-Question");
                  if (mainQ) qData.Question = mainQ.value.trim();

                  const options = qEl.querySelectorAll(".QA");
                  if (options.length > 0) qData.Type = "MC", qData.Options = Array.from(options).map(o => o.value.trim());

                  const tfSelect = qEl.querySelector(".TFselector");
                  if (tfSelect) qData.Type = "TF", qData.Answer = tfSelect.value;

                  const elements = qEl.querySelectorAll(".Element-input");
                  if (elements.length > 0) {
                    qData.Type = "Matching";
                    qData.Pairs = [];
                    for (let i = 0; i < elements.length; i += 2) {
                      qData.Pairs.push({ Left: elements[i].value.trim(), Right: elements[i + 1]?.value.trim() || "" });
                    }
                  }

                  const openAns = qEl.querySelector("textarea");
                  if (openAns && !qData.Type) qData.Type = "Open", qData.ExpectedAnswer = openAns.value.trim();

                  if (Object.keys(qData).length > 0) examQuestions.push(qData);
                  else console.warn(`⚠️ Skipping empty question in Exam "${examTitle}" Lesson ${lessonIndex + 1}, Module ${modIndex + 1}`);
                });
              }

              value = { Title: examTitle || "", Questions: examQuestions };
              if (!lessonData.Examen) lessonData.Examen = [];
              lessonData.Examen.push(value);

            // --- OTHER INPUTS ---
            } else if (block.querySelector(".hw-title")) {
              const hwTitle = block.querySelector(".hw-title")?.value.trim();
              if (!hwTitle) console.warn(`⚠️ Missing Homework title in Lesson ${lessonIndex + 1}, Module ${modIndex + 1}`);
              if (!lessonData.Homework) lessonData.Homework = [];
              lessonData.Homework.push({ Title: hwTitle || "" });

            } else if (block.querySelector("input[type='file']")) {
              const files = block.querySelector("input[type='file']").files;
              const fileNames = files && files.length > 0 ? Array.from(files).map(f => f.name) : [];
              if (fileNames.length === 0) console.warn(`⚠️ Missing file input for "${label}" Lesson ${lessonIndex + 1}, Module ${modIndex + 1}`);
              lessonData.Files = fileNames;

            } else if (block.querySelector("input, textarea, select")) {
              const val = block.querySelector("input, textarea, select").value.trim();
              if (!val) console.warn(`⚠️ Missing value for label "${label}" in Lesson ${lessonIndex + 1}, Module ${modIndex + 1}`);
              lessonData[label] = val || "";
            }
          });

          moduleData[`Lesson ${lessonIndex + 1}`] = lessonData;
        });

        courseContent[`Module ${modIndex + 1}`] = moduleData;
      });

      // --- Firestore save ---
      const classroomsDocRef = doc(db, "CorsoSkillsClassrooms", "CorsoSkills");
      const docSnap = await getDoc(classroomsDocRef);

      const selectedCategory = selectedCategories[0];
      const selectedLevel = selectedLevels[0];
      const prefix = CreateCourseCode(selectedCategory, selectedLevel);

      // Generate new unique course ID
      let nextNumber = 1;
      if (docSnap.exists()) {
        const data = docSnap.data();
        const existingLevelCourses = data?.courses?.[selectedCategory]?.[selectedLevel] || {};
        const ids = Object.keys(existingLevelCourses)
          .map(key => parseInt(key.replace(prefix, "")))
          .filter(n => !isNaN(n));
        if (ids.length > 0) nextNumber = Math.max(...ids) + 1;
      }

      const numberPart = nextNumber.toString().padStart(2, "0");
      const generatedId = prefix + numberPart;

      const courseData = {
        Id: generatedId,
        title,
        description,
        videoLink: videoURL,
        imagePreviewURL: imageURL,
        includes,
        tags,
        createdAt: new Date().toISOString(),
        createdBy: {
          teacherId: UserUidInfo || "unknown",
          teacherName: teacherData.fullName || "unknown",
        },
        "Courses Content": courseContent
      };

      await setDoc(
        classroomsDocRef,
        {
          courses: {
            [selectedCategory]: {
              [selectedLevel]: {
                [generatedId]: courseData
              }
            }
          }
        },
        { merge: true } // ensures new course is added without overwriting
      );

      console.log(`✅ Course saved with ID: ${generatedId}`);
      alert("✅ Curso guardado correctamente con todos los módulos, lecciones, exámenes, clases en vivo, inclusiones y etiquetas.");

    } catch (error) {
      console.error("❌ Error al guardar:", error);
      alert("Ocurrió un error al guardar el curso.");
    } finally {
      saveBtn.textContent = "Subir Curso";
      saveBtn.style.pointerEvents = "auto";
      saveBtn.style.opacity = "1";
    }
  });
}






// ---------- INIT ON PAGE LOAD ----------

courseSaveHandler()












  SetModuleBlock()

  renderWelcome()
  renderId()

  renderCourseSelector()
  courseCreateNav()

  renderTeacherNameDescrip()
  renderTags()


















// --- Upload function ---
async function uploadFile(file, folder = "uploads") {
  if (!file) throw new Error("No file provided");

  const userId = UserUidInfo || "anonymous"; // from localStorage or fallback
  const filePath = `${folder}/${userId}/${file.name}`;

  try {
    const storageRef = ref(storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`🚀 Upload is ${progress.toFixed(2)}% done`);
        },
        (error) => {
          console.error("❌ Upload failed:", error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("✅ File uploaded successfully:", downloadURL);
          resolve(downloadURL);
        }
      );
    });
  } catch (error) {
    console.error("⚠️ Error uploading file:", error);
    throw error;
  }
}

// --- Elements ---
const testInput = document.getElementById("TestimageInput");
const saveBtn = document.getElementById("Testessaver");
const preview = document.getElementById("TestPreview");

// --- Handle button click ---
saveBtn.addEventListener("click", async () => {
  const file = testInput.files[0];
  if (!file) {
    alert("⚠️ Please select a file first!");
    return;
  }

  try {
    // Upload file
    const downloadURL = await uploadFile(file, "test-uploads"); // upload under test-uploads/<userId>

    // Show preview
    preview.src = downloadURL;
    preview.style.display = "block";

    alert("✅ File uploaded successfully!");
  } catch (err) {
    console.error("❌ Upload error:", err);
    alert("Upload failed. Check console for details.");
  }
});














  

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
  const addModuleBtn = document.getElementById("add-module");

  if (!nextBtn || !videoInput || !addModuleBtn) return;

  // === Shared function for showing/hiding next button ===
  function handleInputChange(input) {
    if (input.value.trim() !== "") {
      nextBtn.style.display = "inline-block";
      nextBtn.classList.add("glow-border");

      // Stop animation after 6 seconds
      setTimeout(() => {
        nextBtn.classList.remove("glow-border");
      }, 6000);
    } else {
      nextBtn.style.display = "none";
    }
  }

  // Listen for input changes on the first video input
  videoInput.addEventListener("input", () => handleInputChange(videoInput));

  // === When "Add Module" is clicked ===
  addModuleBtn.addEventListener("click", () => {
    // Wait a bit for the new module to be added to DOM
    setTimeout(() => {
      // Find the latest added module input
      const newVideoInput = document.querySelector(".module:last-child #videoLinkInput");
      if (newVideoInput) {
        newVideoInput.addEventListener("input", () => handleInputChange(newVideoInput));
      }
    }, 100);
  });
}
// === Initialize Both ===
document.addEventListener("DOMContentLoaded", () => {

  setupPreviewNotifications();
});
















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