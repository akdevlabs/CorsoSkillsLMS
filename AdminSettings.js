// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";

import { 
  getFirestore, doc, getDoc, getDocs, runTransaction, collection, addDoc, setDoc, 
  Timestamp, deleteField, updateDoc, arrayUnion, serverTimestamp 
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

import { 
  getStorage, ref, uploadString, uploadBytes, getDownloadURL, listAll 
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
const UserUidInfo = localStorage.getItem("UserUidInfo");
 console.log(UserUidInfo);
// Initialize Auth
const TBuInfo =  "CorsoSkills";  // Example variable (not used in the current code)



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
  function setallBackgroundColor(selector, backgroundColor) {
    // First check if it's an ID
    if (selector.startsWith("#")) {
      const element = document.getElementById(selector.slice(1));
      if (element) {
        element.style.backgroundColor = backgroundColor;
      } else {
        console.error(`Element with ID '${selector}' not found.`);
      }
    } 
    // If it's a class
    else if (selector.startsWith(".")) {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        elements.forEach(el => el.style.backgroundColor = backgroundColor);
      } else {
        console.error(`No elements with class '${selector}' found.`);
      }
    } 
    // fallback: accept plain string (assume ID)
    else {
      const element = document.getElementById(selector);
      if (element) {
        element.style.backgroundColor = backgroundColor;
      } else {
        console.error(`Element with ID or class '${selector}' not found.`);
      }
    }
  }
  function setBorder(selector, borderStyle) {
    // If it's an ID
    if (selector.startsWith("#")) {
      const element = document.getElementById(selector.slice(1));
      if (element) {
        element.style.border = borderStyle;
      } else {
        console.error(`Element with ID '${selector}' not found.`);
      }
    } 
    // If it's a class
    else if (selector.startsWith(".")) {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        elements.forEach(el => el.style.border = borderStyle);
      } else {
        console.error(`No elements with class '${selector}' found.`);
      }
    } 
    // fallback: assume ID if no # or .
    else {
      const element = document.getElementById(selector);
      if (element) {
        element.style.border = borderStyle;
      } else {
        console.error(`Element with ID or class '${selector}' not found.`);
      }
    }
  }
  function SetMainColors(){
    renderImage(data.BuLogos.Icons[0], "BuLogo", "Bulogos")
    setBodyBackgroundColor(Prime4)
    setallBackgroundColor(".sidebar", Prime5)

  }
  function setSidebarColors() {
    const style = document.createElement("style");
    style.textContent = `
      .sidebar {
        border-right: 1px solid ${Prime3};
      }
      .menu li {
        color: ${Prime};
      }  
      .menu li:hover,
      .menu li.active {
        background-color: ${Base};
        color: ${Prime5};
        border-right: 3px solid ${Prime3};
      } 
    `;
    document.head.appendChild(style);
  }
    function setBodyColors() {
    const style = document.createElement("style");
    style.textContent = `
      /* === HEADER === */
      .header {
        background-color: ${Prime5};
      }
      .header input {
        border: 1px solid  ${Base};
      }
      .profile i {
        color: ${Base};
      }
      .profile .role {
        color: ${Prime3};
      }
      /* Content Section */
      .Content {
        background: ${Prime5};
      }
      .Content-header h2 {
        color: ${Base};
      }
      .Content-header p {
        color: ${Prime};
      }

      
      

    `;
    document.head.appendChild(style);
  }
  function setContentColors() {
    const style = document.createElement("style");
    style.textContent = `
      .Content-Btns{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
      .Content-Btn{
        width: 9rem;
        padding: .3rem 0;
        border-radius: .5rem;
        border: none;
        color: ${Prime5};
        background-color:${Prime3};
      }
      .Content-Btn:hover {
        background-color: ${Prime1};
      }
      .Content-Btn.active {
        background-color: ${Prime2};
        color: ${Prime5};
      }
      /* === Block-Content === */
      .Block-Content {
        background-color: ${Prime5};
      }
      .Block-Content h2{
        color: ${Base};
      }
      .Line{
        background-color:${Prime3};
      }
      /* === Blocks-Sections === */
      .Blocks div{
        border: 1px solid ${Prime};
      }
      .Block-Left label{
        color: ${Base};
      }
      .Result{
        color:${Prime3};
      }
      .UpdateBlock{
        color:${Prime3};
        border: 1px solid ${Prime3};
      }
      .UpdateBlock::placeholder{
        color:${Prime2};
      }
      #div17, #div18, #div19, #div20{
        color:${Prime5};
        background-color: ${Base};
      }
      #div17 label{
        color:${Prime5};
      }  
      .Block span{
        color: ${Prime3};
      }
      /* === Block-BTNS-Content === */
      .Block-BTNS i{
        color: ${Prime5};
        background-color: ${Prime3};
      }
      .Block-BTNS i:hover{
        color: ${Prime5};
        background-color: ${Prime1};
      }
      /* === Upload-btn-Content === */
      .Upload-btn {
        background-color: ${Prime4};
        color:${Prime2};
      }
      .Upload-btn:hover {
        color:${Prime};
        background-color:${Prime3};
      }
      .Upload-btn::before {
        color:${Prime5};
        background: ${Prime2};
      }
      .Upload-btn:hover::before {
        background: ${Prime2};
      }
      /* === help-Content === */
      .help-icon {
        color: #555;
      }
      .help-icon:hover {
        color: #007bff;
      }
      .help-popup {
        background: rgba(0,0,0,0.5);
      }
      .help-popup-content {
        background: #fff;
      }
      .help-popup-content p {
        color: #333;
      }
      .help-popup-content button {
        background: #007bff;
        color: white;
      }
      .help-popup-content button:hover {
        background: #0056b3;
      }









      .Blocks-facts div{
        border: 1px solid ${Prime};
      }
      .Security div{
        border: 1px solid ${Prime};
      }
      .Password-Title label{
        color: ${Base};
      }
      .Password-Result{
      color: ${Prime3};
      }



    `;
    document.head.appendChild(style);
  }

  SetMainColors()
  setSidebarColors()
  setBodyColors()
  setContentColors()

});






async function getAdminContent() {
  try {
    const docRef = doc(db, "CorsoSkillsAdmin", UserUidInfo);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error("⚠️ Error fetching Admin document:", error);
    return null;
  }
}
async function getCorsoSkillAppContent() {
  try {
    const docRef = doc(db, "CorsoSkillBusiness", TBuInfo);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error("⚠️ Error fetching Business document:", error);
    return null;
  }
}
async function getStudentsContent() {
  try {
    const querySnapshot = await getDocs(collection(db, "CorsoSkillsStudents"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("⚠️ Error fetching Students:", error);
    return [];
  }
}
async function getTeachersContent() {
  try {
    const querySnapshot = await getDocs(collection(db, "CorsoSkillsTeacher"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("⚠️ Error fetching Teachers:", error);
    return [];
  }
}
async function getClassroomsContent() {
  try {
    const querySnapshot = await getDocs(collection(db, "CorsoSkillsClassrooms"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("⚠️ Error fetching Classrooms:", error);
    return [];
  }
}
async function getAffiliateContent() {
  try {
    const querySnapshot = await getDocs(collection(db, "CorsoSkillsAffiliate"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("⚠️ Error fetching Affiliates:", error);
    return [];
  }
}
async function getMessagesContent() {
  try {
    const querySnapshot = await getDocs(collection(db, "CorsoSkillMessages"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("⚠️ Error fetching Messages:", error);
    return [];
  }
}
async function getWebsiteContent() {
  try {
    const querySnapshot = await getDocs(collection(db, "CorsoSkillsWebsite"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("⚠️ Error fetching Website data:", error);
    return [];
  }
}

async function fetchAllContent() {
  console.log("🔄 Fetching all Corso Skills data...");

  // Fetch all in parallel for speed ⚡
  const [
    AdminData,
    BusinessData,
    StudentsData,
    TeachersData,
    ClassroomsData,
    AffiliatesData,
    MessagesData,
    WebsiteData
  ] = await Promise.all([
    getAdminContent(),
    getCorsoSkillAppContent(),
    getStudentsContent(),
    getTeachersContent(),
    getClassroomsContent(),
    getAffiliateContent(),
    getMessagesContent(),
    getWebsiteContent()
  ]);

  // ✅ Logging summary
 // console.group("✅ All Firestore Data Loaded");
  console.log("Admin:", AdminData);
  console.log("Business:", BusinessData);
  console.log("Students:", StudentsData);
  console.log("Teachers:", TeachersData);
  console.log("Classrooms:", ClassroomsData);
  console.log("Affiliates:", AffiliatesData);
  console.log("Messages:", MessagesData);
  console.log("Website:", WebsiteData);






  function renderText(text, elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = text;
    } else {
      console.error(`Element with ID "${elementId}" not found.`);
    }
  }

  function renderTextById(id, text, append = false) {
    const element = document.getElementById(id);
    if (!element) {
      console.warn(`⚠️ No element found with ID: ${id}`);
      return;
    }

    if (append) {
      element.textContent += text;
    } else {
      element.textContent = text;
    }
  }

  function convertFirestoreTimestampToDate(timestamp) {
    if (!timestamp || typeof timestamp.seconds !== "number") {
      console.error("Invalid Firestore timestamp:", timestamp);
      return null;
    }

    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);

    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  }

  function renderInfo(value, fallbackId, targetId,actionId) {
    const fallback = document.getElementById(fallbackId);
    const target = document.getElementById(targetId);
    const actionBtn = document.getElementById(actionId);

    if (!fallback || !target) {
      console.error(`❌ Missing element(s) for IDs: ${fallbackId}, ${targetId}`);
      return;
    }

    const nameValue = value?.trim?.() || value || "";
    const hasValue = nameValue !== "";

    // Set display text
    target.textContent = hasValue ? nameValue : fallback.textContent;

    // Toggle visibility of fallback
    fallback.classList.toggle("hidden", hasValue);

    // 👇 Add click event to show fallback again
    actionBtn.addEventListener("click", () => {
      if (fallback.classList.contains("hidden")) {
        fallback.classList.remove("hidden");  // show input or element again
        fallback.focus?.();                   // focus it if it’s an input
      }
    });
  }
  async function SaveColorBase(SaveBtnId, ColorId, CatId, HexId) {
    const saveBtn = document.getElementById(SaveBtnId);
    const input = document.getElementById(ColorId);
    const hexDisplay = document.getElementById(HexId);
    const colorRef = doc(db, "CorsoSkillBusiness", TBuInfo);

    // 🟦 1️⃣ Load and render the color from Firestore
    try {
      const docSnap = await getDoc(colorRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const colorValue = data?.BuColors?.Colors?.[CatId] || "#ffffff";
        input.value = colorValue;
        if (hexDisplay) hexDisplay.textContent = colorValue;
       // console.log(`🎨 Color '${CatId}' cargado: ${colorValue}`);
      } else {
        console.warn("⚠️ No se encontró el documento para cargar colores.");
      }
    } catch (error) {
      console.error("❌ Error al cargar color:", error);
    }

    // 🟨 2️⃣ Update hex text live when color input changes
    if (hexDisplay) {
      input.addEventListener("input", () => {
        hexDisplay.textContent = input.value.trim();
      });
    }

    // 🟩 3️⃣ Save color on button click
    saveBtn.addEventListener("click", async () => {
      const colorValue = input.value.trim();

      if (!colorValue) {
        alert("⚠️ Selecciona un color antes de guardar.");
        return;
      }

      try {
        // 🔹 Save to Firestore dynamically
        await setDoc(
          colorRef,
          {
            BuColors: {
              Colors: {
                [CatId]: colorValue
              }
            }
          },
          { merge: true }
        );

        // 🔹 Create placeholder folder in Storage
        const folderRef = ref(
          storage,
          `CorsoSkillsClassrooms/CorsoSkills/BuColors/Colors/${CatId}/${colorValue.replace('#', '')}/.keep`
        );
        await uploadString(folderRef, "placeholder file");

        if (hexDisplay) hexDisplay.textContent = colorValue;

        console.log(`✅ Color '${CatId}' (${colorValue}) guardado correctamente en BuColors.Colors.${CatId}`);
        alert(`✅ Color '${CatId}' guardado correctamente.`);
      } catch (error) {
        console.error(`❌ Error al guardar el color '${CatId}':`, error);
        alert(`❌ Hubo un error al guardar el color '${CatId}'.`);
      }
    });
  }
  function ToggleColorInput(EditBtnId, ColorId) {
    const editBtn = document.getElementById(EditBtnId);
    const colorInput = document.getElementById(ColorId);

    if (!editBtn || !colorInput) {
      console.error(`❌ Elementos no encontrados: ${EditBtnId} o ${ColorId}`);
      return;
    }

    // Hide by default
    colorInput.style.display = "none";

    editBtn.addEventListener("click", () => {
      if (colorInput.style.display === "none") {
        colorInput.style.display = "inline-block"; // or "flex" if needed
        editBtn.classList.add("active"); // optional: to change icon or color
        console.log(`🎨 Mostrando el selector de color: ${ColorId}`);
      } else {
        colorInput.style.display = "none";
        editBtn.classList.remove("active");
        console.log(`👁️ Ocultando el selector de color: ${ColorId}`);
      }
    });
  }
  function createImageInDiv(divId, imgSrc, altText = "", imgId = "", imgClass = "") {
    const container = document.getElementById(divId);

    if (!container) {
      console.error(`❌ No div found with ID "${divId}"`);
      return;
    }

    // Remove previous image if any (optional)
    container.innerHTML = "";

    // Create <img> element
    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = altText;

    // Optionally assign ID or class
    if (imgId) img.id = imgId;
    if (imgClass) img.classList.add(imgClass);

    // Append image to the div
    container.appendChild(img);
  }
  function renderLink(url, text, linkContainer) {
    const container = document.getElementById(linkContainer);

    // Clear previous content
    container.innerHTML = "";

    // Create the <a> element
    const link = document.createElement("a");
    link.href = url;
    link.textContent = text;
    link.target = "_blank"; // opens in new tab
    link.style.color = "#007BFF";
    link.style.textDecoration = "none";
    link.style.cursor = "pointer";

    // Optional: hover effect
    link.addEventListener("mouseover", () => link.style.textDecoration = "underline");
    link.addEventListener("mouseout", () => link.style.textDecoration = "none");

    // Add to container
    container.appendChild(link);
  }













  function renderEmailLink(email, subject = "", body = "",emailContainer) {
    const container = document.getElementById(emailContainer);
    container.innerHTML = "";

    // Encode parameters for safety
    const mailto = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Create link element
    const link = document.createElement("a");
    link.href = mailto;
    link.textContent = `${email}`;
    link.style.color = "#007BFF";
    link.style.textDecoration = "none";
    link.style.cursor = "pointer";

    // Hover effect
    link.addEventListener("mouseover", () => link.style.textDecoration = "underline");
    link.addEventListener("mouseout", () => link.style.textDecoration = "none");

    container.appendChild(link);
  }
  function renderList(array, containerId) {
    const container = document.getElementById(containerId);

    if (!container) {
      console.error(`❌ No se encontró el contenedor con id "${containerId}"`);
      return;
    }

    if (!Array.isArray(array)) {
      console.error("⚠️ El parámetro proporcionado no es un arreglo.");
      return;
    }

    // Limpia el contenido anterior
    container.innerHTML = "";

    // Crea una lista (ul)
    const list = document.createElement("ul");

    // Rellena la lista con los elementos del arreglo
    array.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });

    // Agrega la lista al contenedor
    container.appendChild(list);
  }



function renderCList(array, containerId, fieldName = "CourseCategory") {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`❌ No se encontró el contenedor con id "${containerId}"`);
    return;
  }

  if (!Array.isArray(array)) {
    console.error("⚠️ El parámetro proporcionado no es un arreglo.");
    return;
  }

  // 🔥 Firestore reference built here
  const docRef = doc(db, "CorsoSkillBusiness", TBuInfo);

  container.innerHTML = "";
  const list = document.createElement("ul");

  array.forEach((item, index) => {
    const key = Object.keys(item)[0];
    const currentValue = item[key];

    const li = document.createElement("li");
    li.style.cursor = "pointer";
    li.style.userSelect = "none";
    li.textContent = `${key}: ${currentValue}`;

    // 🔥 CLICK → toggle true/false
    li.addEventListener("click", async () => {
      try {
        const newValue = !array[index][key];
        array[index][key] = newValue;

        // Clone array to avoid Firestore reference issues
        const clonedArray = array.map(obj => ({ ...obj }));

        // Save to Firestore
        await updateDoc(docRef, {
          [fieldName]: clonedArray
        });

        console.log(`🔄 ${key} cambiado a: ${newValue}`);

        // Re-render list
        renderCList(clonedArray, containerId, fieldName);

      } catch (err) {
        console.error("❌ Error actualizando Firestore:", err);
      }
    });

    list.appendChild(li);
  });

  container.appendChild(list);
}





















  function renderUserImg(){
    createImageInDiv("AdimImgUser", AdminData.Personal.Profile, "Placeholder Image", "sampleImg", "img-style");
  }
  function renderWelcome() {
    if (AdminData?.Personal?.FullName) {
      renderText( AdminData.Personal.FullName, "User-Name");
    } else {
      renderText("Hola, Administrador", "User-Name");
    }
  }
  function renderId() {
    const userIdElement = document.getElementById("User-Id");

    if (AdminData?.AdminId) {
      const adminId = AdminData.AdminId;
      renderText("ID: " + adminId, "User-Id");

      userIdElement.style.cursor = "pointer";
      userIdElement.title = "Haz clic para copiar el ID";

      userIdElement.addEventListener("click", () => {
        navigator.clipboard.writeText(adminId).then(() => {
          const originalText = userIdElement.textContent;
          userIdElement.textContent = "ID copiado ✅";

          setTimeout(() => {
            userIdElement.textContent = originalText;
          }, 1500);
        });
      });
    } else {
      renderText("Falta ID", "User-Id");
    }
  }

  renderId()
  renderUserImg()
  renderWelcome()




  function renderSettingInfo(){
    function NameDescription(){
      function renderNameDescription(){
        const CBN = BusinessData.BuLogos.LogoText.Name
        const CBD = BusinessData.BuLogos.LogoText.Description

        renderInfo(CBN, "platformName", "CompanyName", "Edit-Btn-PNB");
        renderInfo(CBD, "platformDescription", "CompanyLogoDescription", "Edit-Btn-PDB");
      }
      function saveNameDescription(){
        function SaveNAme(){
          const saveBtn = document.getElementById("Save-Btn-PNB");
          const input = document.getElementById("platformName");

          saveBtn.addEventListener("click", async () => {
            const platformName = input.value.trim();

            if (!platformName) {
              alert("⚠️ Ingresa un nombre para la plataforma.");
              return;
            }

            try {
              // 🔹 Firestore Path:
              // CorsoSkillsClassrooms / CorsoSkills
              const logoTextRef = doc(db, "CorsoSkillBusiness", TBuInfo);

              // 🔹 Save the Name field inside the BuLogos object
              await setDoc(logoTextRef, {
                BuLogos: {
                  LogoText: {
                    Name: platformName
                  }
                }
              }, { merge: true });

              // 🔹 Create a virtual folder in Firebase Storage
              // Path: CorsoSkillsClassrooms/CorsoSkills/BuLogos/LogoText/
              const folderRef = ref(storage, `CorsoSkillsClassrooms/CorsoSkills/BuLogos/LogoText/${platformName}/.keep`);
              await uploadString(folderRef, "placeholder file");

              console.log(`✅ Name '${platformName}' saved successfully inside BuLogos.LogoText.Name`);
              alert(`✅ Nombre '${platformName}' guardado correctamente.`);
            } catch (error) {
              console.error("❌ Error saving name:", error);
              alert("❌ Hubo un error al guardar el nombre.");
            }
          });
        }
        function SaveDescription(){
          const saveBtn = document.getElementById("Save-Btn-PD");
          const input = document.getElementById("platformDescription");

          saveBtn.addEventListener("click", async () => {
            const platformName = input.value.trim();

            if (!platformName) {
              alert("⚠️ Ingresa un nombre para la plataforma.");
              return;
            }

            try {
              // 🔹 Firestore Path:
              // CorsoSkillsClassrooms / CorsoSkills
              const logoTextRef = doc(db, "CorsoSkillBusiness", TBuInfo);

              // 🔹 Save the Name field inside the BuLogos object
              await setDoc(logoTextRef, {
                BuLogos: {
                  LogoText: {
                    Description: platformName
                  }
                }
              }, { merge: true });

              // 🔹 Create a virtual folder in Firebase Storage
              // Path: CorsoSkillsClassrooms/CorsoSkills/BuLogos/LogoText/
              const folderRef = ref(storage, `CorsoSkillsClassrooms/CorsoSkills/BuLogos/LogoText/${platformName}/.keep`);
              await uploadString(folderRef, "placeholder file");

              console.log(`✅ Name '${platformName}' saved successfully inside BuLogos.LogoText.Name`);
              alert(`✅ Nombre '${platformName}' guardado correctamente.`);
            } catch (error) {
              console.error("❌ Error saving name:", error);
              alert("❌ Hubo un error al guardar el nombre.");
            }
          });
        }

        SaveNAme()
        SaveDescription()
      }
      renderNameDescription()
      saveNameDescription()
    }
    function Logos(){
      ToggleColorInput("Edit-Btn-PL", "platformLogo")
      ToggleColorInput("Edit-Btn-PSL", "platformIcon")
      async function renderFLI() {
        const logoContainer = document.getElementById("CompanyLogo");
        if (!logoContainer) {
          console.error("❌ Element with id='CompanyLogo' not found.");
          return;
        }

        // 🔹 Reference to your document
        const docRef = doc(db, "BusinessUnits", "CorsoSkills"); // ✅ match your upload path
        const docSnap = await getDoc(docRef);

        // 🔹 Clear existing content
        logoContainer.innerHTML = "";

        if (docSnap.exists()) {
          const data = docSnap.data();
          const fullLogos = data?.BuLogos?.FullLogo || []; // ✅ now an array

          if (fullLogos.length > 0) {
            fullLogos.forEach((url, index) => {
              const img = document.createElement("img");
              img.src = url;
              img.alt = `Company Full Logo ${index + 1}`;
              img.classList.add("company-logo-img"); // ✅ use your CSS styling class

              // optional: clickable open in new tab
              img.addEventListener("click", () => window.open(url, "_blank"));

              logoContainer.appendChild(img);
            });

            console.log(`✅ ${fullLogos.length} logos renderizados correctamente.`);
            return;
          }
        }

        // If no logos exist
        const placeholder = document.createElement("p");
        placeholder.textContent = "⚠️ No se encontraron logos en la base de datos.";
        logoContainer.appendChild(placeholder);

        console.warn("⚠️ No se encontró ningún logo en la base de datos.");
      }
      
      async function renderIconLogo() {
        const logoContainer = document.getElementById("CompanySimpleLogo");
        const iconURL = BusinessData.BuLogos.Icon || null;

        if (!logoContainer) {
          console.error("❌ Element with id='CompanySimpleLogo' not found.");
          return;
        }

        try {
            if (iconURL) {
              const img = document.createElement("img");
              img.src = iconURL;
              img.alt = "Company Icon Logo";
              img.classList.add("company-icon-img");

              // Optional: open in new tab
              img.addEventListener("click", () => window.open(iconURL, "_blank"));

              logoContainer.appendChild(img);

              console.log("✅ Ícono renderizado correctamente.");
              return;
            }

          // 🔸 If no logo found
          const placeholder = document.createElement("p");
          placeholder.textContent = "⚠️ No se encontró el ícono en la base de datos.";
          logoContainer.appendChild(placeholder);

          console.warn("⚠️ No se encontró ningún ícono en la base de datos.");
        } catch (error) {
          console.error("❌ Error al renderizar el ícono:", error);
          const placeholder = document.createElement("p");
          placeholder.textContent = "❌ Error al cargar el ícono.";
          logoContainer.appendChild(placeholder);
        }
      }

      function UploadFLI() {
        async function uploadFullLogo(file) {
          if (!file) {
            alert("⚠️ Selecciona una imagen antes de guardar.");
            return null;
          }

          try {
            // 🔹 Path in Firebase Storage
            const filePath = `BusinessUnits/CorsoSkills/Logos/FullLogo/${file.name}`;
            const fileRef = ref(storage, filePath);

            // 🔹 Upload file
            const snapshot = await uploadBytes(fileRef, file);
            console.log(`✅ Archivo subido: ${file.name}`);

            // 🔹 Get public download URL
            const downloadURL = await getDownloadURL(snapshot.ref);
            console.log(`📎 URL del archivo: ${downloadURL}`);

            alert("✅ Logo subido correctamente.");
            return downloadURL;
          } catch (error) {
            console.error("❌ Error al subir el logo:", error);
            alert("❌ Hubo un error al subir el logo.");
            return null;
          }
        }

        // ---------------------------
        // Save Button Handler
        // ---------------------------
        const saveBtnPL = document.getElementById("Save-Btn-PL");
        const fileInput = document.getElementById("platformLogo");

        saveBtnPL.addEventListener("click", async () => {
          const file = fileInput.files[0];

          if (!file) {
            alert("⚠️ Selecciona un archivo antes de guardar.");
            return;
          }

          const downloadURL = await uploadFullLogo(file);

          if (downloadURL) {
            try {
              const docRef = doc(db, "CorsoSkillBusiness", TBuInfo);
              const docSnap = await getDoc(docRef);

              let existingLogos = [];

              // 🔹 If document and array exist, load it
              if (docSnap.exists()) {
                const data = docSnap.data();
                existingLogos = data?.BuLogos?.FullLogo || [];
              }

              // 🔹 Add the new logo URL to the array
              existingLogos.push(downloadURL);

              // 🔹 Save the updated array back to Firestore
              await setDoc(
                docRef,
                {
                  BuLogos: {
                    FullLogo: existingLogos
                  }
                },
                { merge: true }
              );

              console.log("✅ URL agregado correctamente al array en Firestore.");
              alert("✅ Nuevo logo agregado correctamente.");
            } catch (error) {
              console.error("❌ Error al guardar el URL en Firestore:", error);
              alert("❌ Error al guardar el URL en Firestore.");
            }
          }
        });
      }
      function UploadIconLogo() {
        // ---------------------------
        // Upload Icon Logo to Storage
        // ---------------------------
        async function uploadIconLogo(file) {
          if (!file) {
            alert("⚠️ Selecciona una imagen antes de guardar.");
            return null;
          }

          try {
            // 🔹 Path in Firebase Storage
            const filePath = `BusinessUnits/CorsoSkills/Logos/Icons/${file.name}`;
            const fileRef = ref(storage, filePath);

            // 🔹 Upload file
            const snapshot = await uploadBytes(fileRef, file);
            console.log(`✅ Archivo subido: ${file.name}`);

            // 🔹 Get public download URL
            const downloadURL = await getDownloadURL(snapshot.ref);
            console.log(`📎 URL del archivo: ${downloadURL}`);

            alert("✅ Ícono subido correctamente.");
            return downloadURL;
          } catch (error) {
            console.error("❌ Error al subir el ícono:", error);
            alert("❌ Hubo un error al subir el ícono.");
            return null;
          }
        }

        // ---------------------------
        // Save Button Handler
        // ---------------------------
        const saveBtnPI = document.getElementById("Save-Btn-PI");
        const fileInput = document.getElementById("platformIcon");

        if (!saveBtnPI || !fileInput) {
          console.error("❌ No se encontraron los elementos de entrada o botón para el ícono.");
          return;
        }

        saveBtnPI.addEventListener("click", async () => {
          const file = fileInput.files[0];

          if (!file) {
            alert("⚠️ Selecciona un archivo antes de guardar.");
            return;
          }

          const downloadURL = await uploadIconLogo(file);

          if (downloadURL) {
            try {
              // 🔹 Save Icon URL to Firestore
              const docRef = doc(db, "BusinessUnits", TBuInfo);
              await setDoc(docRef, {
                Logos: {
                  Icons: {
                    LogoURL: downloadURL
                  }
                }
              }, { merge: true });

              console.log("✅ URL del ícono guardada correctamente en Firestore.");
              alert("✅ Ícono guardado en la base de datos.");
            } catch (error) {
              console.error("❌ Error al guardar el URL del ícono en Firestore:", error);
              alert("❌ Error al guardar el URL del ícono en Firestore.");
            }
          }
        });
      }


      UploadFLI()
      renderFLI()
      renderIconLogo()
      UploadIconLogo()
    }
    function Colors(){
      function RenderAddBase(){
        ToggleColorInput("Edit-Btn-Base", "Base-Color")
        SaveColorBase("Save-Btn-Base", "Base-Color", "Base","Base-Hex");
      }
      function RenderAddPrime(){
        ToggleColorInput("Edit-Btn-Prime", "Prime-Color")
        SaveColorBase("Save-Btn-Prime", "Prime-Color", "Prime", "Prime-Hex");
      }
      function RenderAddPrime1(){
        ToggleColorInput("Edit-Btn-Prime1", "Prime1-Color")
        SaveColorBase("Save-Btn-Prime1", "Prime1-Color", "Prime1", "Prime1-Hex");
      }
      function RenderAddPrime2(){
        ToggleColorInput("Edit-Btn-Prime2", "Prime2-Color")
        SaveColorBase("Save-Btn-Prime2", "Prime2-Color", "Prime2", "Prime2-Hex");
      }
      function RenderAddPrime3(){
        ToggleColorInput("Edit-Btn-Prime3", "Prime3-Color")
        SaveColorBase("Save-Btn-Prime3", "Prime3-Color", "Prime3", "Prime3-Hex");
      }
      function RenderAddPrime4(){
        ToggleColorInput("Edit-Btn-Prime4", "Prime4-Color")
        SaveColorBase("Save-Btn-Prime4", "Prime4-Color", "Prime4", "Prime4-Hex");
      }
      function RenderAddPrime5(){
        ToggleColorInput("Edit-Btn-Prime5", "Prime5-Color")
        SaveColorBase("Save-Btn-Prime5", "Prime5-Color", "Prime5", "Prime5-Hex");
      }

       RenderAddBase()
       RenderAddPrime()
       RenderAddPrime1()
       RenderAddPrime2()
       RenderAddPrime3()
       RenderAddPrime4()
       RenderAddPrime5()
    }








    NameDescription()
    Logos()
    Colors()

  }
  function RenderPersonalInfo(){
    ToggleColorInput("Edit-Btn-AdminPic", "AdminProfilePic")
    ToggleColorInput("Edit-Btn-AdminName", "Admin-Full-Name")
    ToggleColorInput("Edit-Btn-AdminEmail", "AdminEmail")
    ToggleColorInput("Edit-Btn-AdminPhone", "AdminPhone")
    ToggleColorInput("Edit-Btn-AdminPosition", "AdminPosition")
    ToggleColorInput("Edit-Btn-ZonaHoraria", "AdminTimezone")

    function remderAdimnProfile(){
      createImageInDiv("AdminProfilePicPreview", AdminData.Personal.Profile, "Placeholder Image", "sampleImg", "img-style");
      renderText(AdminData.Personal.FullName, "Admin-Name")
      renderText(AdminData.email, "Admin-Email")
      renderText(AdminData.Personal.Phone, "Admin-Phone")
      renderText(AdminData.Personal.Position, "Admin-Active-Position")
      renderText(AdminData.Personal.Timezone, "Admin-Timezonen")
    }    
    function UploadAdminProfilePic() {
      // ---------------------------
      // Upload Admin Profile Picture to Storage
      // ---------------------------
      async function uploadAdminProfilePic(file) {
        if (!file) {
          alert("⚠️ Selecciona una imagen antes de guardar.");
          return null;
        }

        try {
          // 🔹 Path in Firebase Storage
          const filePath = `BusinessUnits/CorsoSkills/Admins/Profile/${file.name}`;
          const fileRef = ref(storage, filePath);

          // 🔹 Upload file
          const snapshot = await uploadBytes(fileRef, file);
          console.log(`✅ Archivo subido: ${file.name}`);

          // 🔹 Get public download URL
          const downloadURL = await getDownloadURL(snapshot.ref);
          console.log(`📎 URL del archivo: ${downloadURL}`);

          alert("✅ Foto de perfil subida correctamente.");
          return downloadURL;
        } catch (error) {
          console.error("❌ Error al subir la foto de perfil:", error);
          alert("❌ Hubo un error al subir la foto de perfil.");
          return null;
        }
      }

      // ---------------------------
      // Save Button Handler
      // ---------------------------
      const saveBtnAPP = document.getElementById("Save-Btn-AdminPic");
      const fileInput = document.getElementById("AdminProfilePic");

      if (!saveBtnAPP || !fileInput) {
        console.error("❌ No se encontraron los elementos de entrada o botón para la foto de perfil.");
        return;
      }

      saveBtnAPP.addEventListener("click", async () => {
        const file = fileInput.files[0];

        if (!file) {
          alert("⚠️ Selecciona un archivo antes de guardar.");
          return;
        }

        const downloadURL = await uploadAdminProfilePic(file);

        if (downloadURL) {
          try {
            // 🔹 Save Photo URL to Firestore
            const docRef = doc(db, "CorsoSkillsAdmin", UserUidInfo);
            await setDoc(docRef, {
            
              
              Personal: {
                Profile:  downloadURL
              }
            
            }, { merge: true });

            console.log("✅ URL de la foto de perfil guardada correctamente en Firestore.");
            alert("✅ Foto de perfil guardada en la base de datos.");
          } catch (error) {
            console.error("❌ Error al guardar el URL de la foto de perfil en Firestore:", error);
            alert("❌ Error al guardar el URL de la foto de perfil en Firestore.");
          }
        }
      });
    }
    function SaveAdminName() {
      // ---------------------------
      // Save Admin Full Name to Firestore
      // ---------------------------

      const saveBtnName = document.getElementById("Save-Btn-AdminName");
      const nameInput = document.getElementById("Admin-Full-Name");

      if (!saveBtnName || !nameInput) {
        console.error("❌ No se encontraron los elementos de entrada o botón para el nombre completo del administrador.");
        return;
      }

      saveBtnName.addEventListener("click", async () => {
        const fullNameValue = nameInput.value.trim();

        if (!fullNameValue) {
          alert("⚠️ Ingresa el nombre completo antes de guardar.");
          return;
        }

        try {
          // 🔹 Save Admin Full Name to Firestore
          const docRef = doc(db, "CorsoSkillsAdmin", UserUidInfo);
          await setDoc(
            docRef,
            {
              Personal: {
                FullName: fullNameValue
              }
            },
            { merge: true }
          );

          console.log("✅ Nombre completo del administrador guardado correctamente en Firestore.");
          alert("✅ Nombre completo guardado en la base de datos.");
        } catch (error) {
          console.error("❌ Error al guardar el nombre completo del administrador en Firestore:", error);
          alert("❌ Hubo un error al guardar el nombre completo.");
        }
      });
    }
    function SaveAdminEmail() {
      const saveBtnEmail = document.getElementById("Save-Btn-AdminEmail");
      const emailInput = document.getElementById("AdminEmail");

      if (!saveBtnEmail || !emailInput) {
        console.error("❌ No se encontraron los elementos de entrada o botón para el correo electrónico del administrador.");
        return;
      }

      saveBtnEmail.addEventListener("click", async () => {
        const emailValue = emailInput.value.trim();

        if (!emailValue) {
          alert("⚠️ Ingresa un correo electrónico antes de guardar.");
          return;
        }

        // 🔹 Validación básica de correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
          alert("⚠️ Ingresa un correo electrónico válido.");
          return;
        }

        try {
          // 🔹 Save Admin Email to Firestore
          const docRef = doc(db, "CorsoSkillsAdmin", UserUidInfo);
          await setDoc(
            docRef,
            {
    
              email: emailValue
      
            },
            { merge: true }
          );

          console.log("✅ Correo electrónico del administrador guardado correctamente en Firestore.");
          alert("✅ Correo electrónico guardado en la base de datos.");
        } catch (error) {
          console.error("❌ Error al guardar el correo electrónico del administrador en Firestore:", error);
          alert("❌ Hubo un error al guardar el correo electrónico.");
        }
      });
    }
    function SaveAdminPhone() {
      // ---------------------------
      // Save Admin Phone Number to Firestore
      // ---------------------------

      const saveBtnPhone = document.getElementById("Save-Btn-AdminPhone");
      const phoneInput = document.getElementById("AdminPhone");

      if (!saveBtnPhone || !phoneInput) {
        console.error("❌ No se encontraron los elementos de entrada o botón para el número de teléfono del administrador.");
        return;
      }

      saveBtnPhone.addEventListener("click", async () => {
        const phoneValue = phoneInput.value.trim();

        if (!phoneValue) {
          alert("⚠️ Ingresa un número de teléfono antes de guardar.");
          return;
        }

        try {
          // 🔹 Save Phone Number to Firestore
          const docRef = doc(db, "CorsoSkillsAdmin", UserUidInfo);
          await setDoc(
            docRef,
            {

              Personal: {
                Phone: phoneValue
              }

             
            },
            { merge: true }
          );

          console.log("✅ Número de teléfono del administrador guardado correctamente en Firestore.");
          alert("✅ Número de teléfono guardado en la base de datos.");
        } catch (error) {
          console.error("❌ Error al guardar el número de teléfono en Firestore:", error);
          alert("❌ Hubo un error al guardar el número de teléfono.");
        }
      });
    }
    function SaveAdminPosition() {
      // ---------------------------
      // Save Admin Position to Firestore
      // ---------------------------

      const saveBtnPosition = document.getElementById("Save-Btn-AdminPosition");
      const positionInput = document.getElementById("AdminPosition");

      if (!saveBtnPosition || !positionInput) {
        console.error("❌ No se encontraron los elementos de entrada o botón para el puesto del administrador.");
        return;
      }

      saveBtnPosition.addEventListener("click", async () => {
        const positionValue = positionInput.value.trim();

        if (!positionValue) {
          alert("⚠️ Ingresa el puesto del administrador antes de guardar.");
          return;
        }

        try {
          // 🔹 Save Admin Position to Firestore
          const docRef = doc(db, "CorsoSkillsAdmin", UserUidInfo);
          await setDoc(
            docRef,
            {
              Personal: {
                Position: positionValue
              }
              
            },
            { merge: true }
          );

          console.log("✅ Puesto del administrador guardado correctamente en Firestore.");
          alert("✅ Puesto del administrador guardado en la base de datos.");
        } catch (error) {
          console.error("❌ Error al guardar el puesto del administrador en Firestore:", error);
          alert("❌ Hubo un error al guardar el puesto del administrador.");
        }
      });
    }
    function SaveAdminTimezone() {
      // ---------------------------
      // Save Admin Timezone to Firestore
      // ---------------------------

      const saveBtnTimezone = document.getElementById("Save-Btn-ZonaHoraria");
      const timezoneSelect = document.getElementById("AdminTimezone");

      if (!saveBtnTimezone || !timezoneSelect) {
        console.error("❌ No se encontraron los elementos de entrada o botón para la zona horaria del administrador.");
        return;
      }

      saveBtnTimezone.addEventListener("click", async () => {
        const timezoneValue = timezoneSelect.value;

        if (!timezoneValue) {
          alert("⚠️ Selecciona una zona horaria antes de guardar.");
          return;
        }

        try {
          // 🔹 Save Admin Timezone to Firestore
          const docRef = doc(db, "CorsoSkillsAdmin", UserUidInfo);
          await setDoc(
            docRef,
            {
              Personal: {
                Timezone: timezoneValue
              }
              
            },
            { merge: true }
          );

          console.log("✅ Zona horaria del administrador guardada correctamente en Firestore.");
          alert("✅ Zona horaria guardada en la base de datos.");
        } catch (error) {
          console.error("❌ Error al guardar la zona horaria en Firestore:", error);
          alert("❌ Hubo un error al guardar la zona horaria.");
        }
      });
    }

    UploadAdminProfilePic()
    SaveAdminName()
    SaveAdminEmail()
    remderAdimnProfile()
    SaveAdminPhone()
    SaveAdminPosition()
    SaveAdminTimezone()  
  }
  function RenderSecurityInfo(){
    ToggleColorInput("Edit-Btn-AdminPassword", "AdminPassword")
    ToggleColorInput("Edit-Btn-AdminPassword", "AdminConfirmPassword")
    ToggleColorInput("Edit-Btn-AdminPassword", "Show1")
    ToggleColorInput("Edit-Btn-AdminPassword", "Show2")

    function remderAdimnProfile(){
      function getNewestValue(arr) {
        if (!Array.isArray(arr) || arr.length === 0) {
          return null; // or throw an error if you prefer
        }
        return arr[arr.length - 1];
      }
      function renderDevices(){
        function getAllDeviceTypes(DevicesUsed) {
          if (!Array.isArray(DevicesUsed) || DevicesUsed.length === 0) {
            console.warn("⚠️ DevicesUsed is empty or not an array");
            return [];
          }

          return DevicesUsed
            .map(device => device.DeviceType)
            .filter(type => typeof type === "string" && type.trim() !== "");
        }

         const AD = getAllDeviceTypes(AdminData.DevicesUsed)
         return(AD)
      }

    

      const DevicesUsed = getNewestValue(AdminData.DevicesUsed);
      const Device = DevicesUsed.DeviceType
      const  Browser =  DevicesUsed.Browser
      
      const LAD = DevicesUsed.OS +"/"+ Device+"/"+Browser


      renderText(AdminData.AdminId, "AdminUserId")
      renderText(LAD, "Last-Active-Device")
      renderText(renderDevices(), "Last-Devices")

    }    
    function SaveDeviceInfo() {
      const saveBtnDevice = document.getElementById("Logout");

      if (!saveBtnDevice) {
        console.error("❌ No se encontró el botón con id='Logout'.");
        return;
      }

      saveBtnDevice.addEventListener("click", async () => {
        try {
          const ua = navigator.userAgent.toLowerCase();

          // 🔹 Detect device type
          let deviceType = "Desktop";
          if (/mobile|iphone|ipod|android|blackberry|iemobile|kindle|silk-accelerated|opera mini/.test(ua)) {
            deviceType = "Mobile";
          } else if (/ipad|tablet|playbook|silk/.test(ua)) {
            deviceType = "Tablet";
          }

          // 🔹 Detect browser
          let browser = "Unknown";
          if (ua.includes("chrome") && !ua.includes("edge")) browser = "Chrome";
          else if (ua.includes("safari") && !ua.includes("chrome")) browser = "Safari";
          else if (ua.includes("firefox")) browser = "Firefox";
          else if (ua.includes("edg")) browser = "Edge";
          else if (ua.includes("opera") || ua.includes("opr")) browser = "Opera";
          else if (ua.includes("msie") || ua.includes("trident")) browser = "Internet Explorer";

          // 🔹 Detect OS
          let os = "Unknown";
          if (ua.includes("win")) {
            if (ua.includes("windows nt 10.0")) os = "Windows 10/11";
            else if (ua.includes("windows nt 6.3")) os = "Windows 8.1";
            else if (ua.includes("windows nt 6.2")) os = "Windows 8";
            else if (ua.includes("windows nt 6.1")) os = "Windows 7";
            else os = "Windows (Unknown Version)";
          } else if (ua.includes("mac")) os = "MacOS";
          else if (ua.includes("linux")) os = "Linux";
          else if (ua.includes("android")) os = "Android";
          else if (/iphone|ipad|ipod/.test(ua)) os = "iOS";

          // 🔹 Timestamp
          const timestamp = new Date().toLocaleString();

          // 🔹 Create a new entry for this exact event
          const newDeviceEntry = {
            DeviceType: deviceType,
            Browser: browser,
            OS: os,
            LastUsed: timestamp
          };

          // 🔹 Reference to user doc
          const docRef = doc(db, "CorsoSkillsAdmin", UserUidInfo);

          // 🔹 Ensure array exists
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            await updateDoc(docRef, {
              DevicesUsed: arrayUnion(newDeviceEntry)
            });
            console.log("✅ Nuevo dispositivo agregado a la lista DevicesUsed.");
          } else {
            await setDoc(docRef, {
              DevicesUsed: [newDeviceEntry]
            });
            console.log("✅ Documento creado con el primer dispositivo.");
          }

          alert("✅ Dispositivo guardado correctamente en la base de datos.");
        } catch (error) {
          console.error("❌ Error al guardar la información del dispositivo en Firestore:", error);
          alert("❌ Hubo un error al guardar la información del dispositivo.");
        }
      });
    }

    function SaveAdminPassword() {
      const saveBtn = document.getElementById("Save-Btn-AdminPassword");
      const passwordInput = document.getElementById("AdminPassword");
      const confirmInput = document.getElementById("AdminConfirmPassword");
      const resultSpan = document.getElementById("Password-Result");

      if (!saveBtn || !passwordInput || !confirmInput) {
        console.error("❌ No se encontraron los elementos necesarios para la contraseña.");
        return;
      }

      saveBtn.addEventListener("click", async () => {
        const newPassword = passwordInput.value.trim();
        const confirmPassword = confirmInput.value.trim();

        // 🔍 Validate inputs
        if (!newPassword || !confirmPassword) {
          resultSpan.textContent = "⚠️ Ambos campos son obligatorios.";
          resultSpan.style.color = "orange";
          return;
        }

        if (newPassword !== confirmPassword) {
          resultSpan.textContent = "❌ Las contraseñas no coinciden.";
          resultSpan.style.color = "red";
          return;
        }

        // 🔒 Password strength check
        const strongPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&.,;:])[A-Za-z\d@$!%*?&.,;:]{8,}$/;
        if (!strongPassword.test(newPassword)) {
          resultSpan.textContent = "⚠️ La contraseña debe tener 8+ caracteres, letras, números y símbolos.";
          resultSpan.style.color = "orange";
          return;
        }

        try {
          const user = auth.currentUser;
          if (!user) {
            resultSpan.textContent = "❌ No hay un usuario autenticado.";
            resultSpan.style.color = "red";
            return;
          }

          // 🔄 Update password in Firebase Auth
          await updatePassword(user, newPassword);

          // (Optional) Update Firestore record
          const adminRef = doc(db, "AdminData", user.uid);
          await updateDoc(adminRef, {
            "Security.LastPasswordChange": new Date().toISOString(),
          });

          resultSpan.textContent = "✅ Contraseña actualizada correctamente.";
          resultSpan.style.color = "green";

          // Clear inputs
          passwordInput.value = "";
          confirmInput.value = "";

        } catch (error) {
          console.error("❌ Error al actualizar la contraseña:", error);
          if (error.code === "auth/requires-recent-login") {
            resultSpan.textContent = "⚠️ Por seguridad, vuelve a iniciar sesión para cambiar la contraseña.";
          } else {
            resultSpan.textContent = "❌ No se pudo cambiar la contraseña.";
          }
          resultSpan.style.color = "red";
        }
      });
    }

    // Initialize the function
    SaveAdminPassword();

    SaveDeviceInfo()
    remderAdimnProfile()
  }




  function RenderNotificacionesInfo(){
    ToggleColorInput("Edit-Btn-NewUser", "Notif-New-Email")
    ToggleColorInput("Edit-Btn-NewCourse", "Notif-New-Course")
    ToggleColorInput("Edit-Btn-NewEnrollment", "Notif-New-Enrollment")
    ToggleColorInput("Edit-Btn-Certificate", "Notif-New-Certificate")
    ToggleColorInput("Edit-Btn-AppMessages", "Notif-New-AppMessages")
    ToggleColorInput("Edit-Btn-PushReminders", "Notif-New-PushReminders")
 
    function renderNotificacionesvalues(){

      function getStatus(value) {
        if(value === true) {
          return "Activo"

        }else if(value === false){
          return "Desactivado"
        }
      }  

      const notif = AdminData.Notifications;
      renderText(getStatus(notif.NotifEmailNewUser), "NewUser-Status")
      renderText(getStatus(notif.NotifNewCourse), "Notif-NewCourse-Status")
      renderText(getStatus(notif.NotifNewCertificate), "Notif-NewEnrollment-Status")
      renderText(getStatus(notif.NotifNewCourse), "Notif-Certificate-Status")
      renderText(getStatus(notif.NotifNewEnrollment), "Notif-AppMessages-Status")
      renderText(getStatus(notif.NotifPushReminders), "Notif-PushReminders-Status")
    }


    function SaveNotifEmailNewUser() {
      const saveBtnNewUser = document.getElementById("Save-Btn-NewUser");
      const notifEmailNewUserCheckbox = document.getElementById("Notif-New-Email");

      if (!saveBtnNewUser || !notifEmailNewUserCheckbox) {
        console.error("❌ No se encontraron los elementos: #Save-Btn-NewUser o #NotifEmailNewUser.");
        return;
      }

      const docRef = doc(db, "CorsoSkillsAdmin", UserUidInfo);

      // Carga el valor actual desde Firestore. Si no existe, establece y guarda true.
      async function loadNotifSetting() {
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            const currentValue = data.Notifications?.NotifEmailNewUser;
            // Si existe, aplica el valor; si no, usa true por defecto (pero no sobrescribe aún)
            notifEmailNewUserCheckbox.checked = currentValue !== undefined ? currentValue : true;

            // Si el campo no existía, guarda el valor por defecto (true) para inicializar el documento.
            if (currentValue === undefined) {
              await setDoc(docRef, { Notifications: { NotifEmailNewUser: true } }, { merge: true });
              console.log("✅ Valor por defecto (true) guardado en Firestore.");
            }
          } else {
            // Documento no existe: marca checkbox como true y crea el documento con valor por defecto
            notifEmailNewUserCheckbox.checked = true;
            await setDoc(docRef, { Notifications: { NotifEmailNewUser: true } }, { merge: true });
            console.log("✅ Documento creado con valor por defecto (true).");
          }
        } catch (error) {
          console.error("❌ Error al cargar la preferencia de notificación:", error);
        }
      }

      // Guardar sólo cuando se hace click en el botón
      saveBtnNewUser.addEventListener("click", async () => {
        const newValue = notifEmailNewUserCheckbox.checked;
        try {
          await setDoc(docRef, { Notifications: { NotifEmailNewUser: newValue } }, { merge: true });
          console.log("✅ Preferencia de notificación guardada:", newValue);
          alert("✅ Preferencia de notificación guardada en la base de datos.");
        } catch (error) {
          console.error("❌ Error al guardar la preferencia de notificación:", error);
          alert("❌ Hubo un error al guardar la preferencia de notificación.");
        }
      });

      // Inicializa el estado del checkbox
      loadNotifSetting();
    }
    function SaveNotifNewCourse() {
      const saveBtn = document.getElementById("Save-Btn-NewCourse");
      const notifCheckbox = document.getElementById("Notif-New-Course");

      if (!saveBtn || !notifCheckbox) {
        console.error("❌ No se encontraron los elementos #Save-Btn-NotifNewCourse o #NotifNewCourse.");
        return;
      }

      const docRef = doc(db, "CorsoSkillsAdmin", UserUidInfo);

      // 🔹 Cargar valor actual o establecer por defecto (true)
      async function loadNotifSetting() {
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            const currentValue = data.Notifications?.NotifNewCourse;

            if (currentValue === undefined) {
              // Si no existe el campo, se inicializa con true
              notifCheckbox.checked = true;
              await setDoc(
                docRef,
                { Notifications: { NotifNewCourse: true } },
                { merge: true }
              );
              console.log("✅ Preferencia inicializada en Firestore con valor true.");
            } else {
              notifCheckbox.checked = currentValue;
            }
          } else {
            // Si no existe el documento, lo crea con valor por defecto
            notifCheckbox.checked = true;
            await setDoc(
              docRef,
              { Notifications: { NotifNewCourse: true } },
              { merge: true }
            );
            console.log("✅ Documento creado con valor por defecto (true).");
          }
        } catch (error) {
          console.error("❌ Error al cargar la preferencia de notificación:", error);
        }
      }

      // 🔹 Guardar valor cuando se hace click en el botón
      saveBtn.addEventListener("click", async () => {
        const newValue = notifCheckbox.checked;
        try {
          await setDoc(
            docRef,
            { Notifications: { NotifNewCourse: newValue } },
            { merge: true }
          );
          console.log("✅ Preferencia de notificación (nuevo curso) guardada:", newValue);
          alert("✅ Preferencia de notificación guardada en la base de datos.");
        } catch (error) {
          console.error("❌ Error al guardar la preferencia de notificación:", error);
          alert("❌ Hubo un error al guardar la preferencia de notificación.");
        }
      });

      // Inicializa el estado
      loadNotifSetting();
    }
    function SaveNotifNewEnrollment() {
      const saveBtnNewEnrollment = document.getElementById("Save-Btn-NewEnrollment");
      const notifNewEnrollmentCheckbox = document.getElementById("Notif-New-Enrollment");

      if (!saveBtnNewEnrollment || !notifNewEnrollmentCheckbox) {
        console.error("❌ No se encontraron los elementos: #Save-Btn-NewEnrollment o #Notif-New-Enrollment.");
        return;
      }

      const docRef = doc(db, "CorsoSkillsAdmin", UserUidInfo);

      // 🔹 Cargar el valor actual o establecer el valor por defecto (true)
      async function loadNotifSetting() {
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            const currentValue = data.Notifications?.NotifNewEnrollment;
            notifNewEnrollmentCheckbox.checked = currentValue !== undefined ? currentValue : true;

            if (currentValue === undefined) {
              await setDoc(docRef, { Notifications: { NotifNewEnrollment: true } }, { merge: true });
              console.log("✅ Valor por defecto (true) guardado en Firestore para NewEnrollment.");
            }
          } else {
            notifNewEnrollmentCheckbox.checked = true;
            await setDoc(docRef, { Notifications: { NotifNewEnrollment: true } }, { merge: true });
            console.log("✅ Documento creado con valor por defecto (true) para NewEnrollment.");
          }
        } catch (error) {
          console.error("❌ Error al cargar la preferencia de notificación (NewEnrollment):", error);
        }
      }

      // 🔹 Guardar cuando se hace click en el botón
      saveBtnNewEnrollment.addEventListener("click", async () => {
        const newValue = notifNewEnrollmentCheckbox.checked;
        try {
          await setDoc(docRef, { Notifications: { NotifNewEnrollment: newValue } }, { merge: true });
          console.log("✅ Preferencia NewEnrollment guardada:", newValue);
          alert("✅ Preferencia de notificación NewEnrollment guardada en la base de datos.");
        } catch (error) {
          console.error("❌ Error al guardar la preferencia NewEnrollment:", error);
          alert("❌ Hubo un error al guardar la preferencia NewEnrollment.");
        }
      });

      // 🔹 Inicializar checkbox
      loadNotifSetting();
    }
    function SaveNotifNewCertificate() {
      const saveBtnNewCertificate = document.getElementById("Save-Btn-Certificate");
      const notifNewCertificateCheckbox = document.getElementById("Notif-New-Certificate");

      if (!saveBtnNewCertificate || !notifNewCertificateCheckbox) {
        console.error("❌ No se encontraron los elementos: #Save-Btn-Certificate o #Notif-New-Certificate.");
        return;
      }

      const docRef = doc(db, "CorsoSkillsAdmin", UserUidInfo);

      // 🔹 Cargar el valor actual o establecer true por defecto
      async function loadNotifSetting() {
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            const currentValue = data.Notifications?.NotifNewCertificate;
            notifNewCertificateCheckbox.checked = currentValue !== undefined ? currentValue : true;

            if (currentValue === undefined) {
              await setDoc(docRef, { Notifications: { NotifNewCertificate: true } }, { merge: true });
              console.log("✅ Valor por defecto (true) guardado en Firestore para NotifNewCertificate.");
            }
          } else {
            notifNewCertificateCheckbox.checked = true;
            await setDoc(docRef, { Notifications: { NotifNewCertificate: true } }, { merge: true });
            console.log("✅ Documento creado con valor por defecto (true) para NotifNewCertificate.");
          }
        } catch (error) {
          console.error("❌ Error al cargar la preferencia de notificación (NotifNewCertificate):", error);
        }
      }

      // 🔹 Guardar valor cuando se hace click en el botón
      saveBtnNewCertificate.addEventListener("click", async () => {
        const newValue = notifNewCertificateCheckbox.checked;
        try {
          await setDoc(docRef, { Notifications: { NotifNewCertificate: newValue } }, { merge: true });
          console.log("✅ Preferencia NotifNewCertificate guardada:", newValue);
          alert("✅ Preferencia de notificación NotifNewCertificate guardada en la base de datos.");
        } catch (error) {
          console.error("❌ Error al guardar la preferencia NotifNewCertificate:", error);
          alert("❌ Hubo un error al guardar la preferencia NotifNewCertificate.");
        }
      });

      // 🔹 Inicializar checkbox
      loadNotifSetting();
    }
    function SaveNotifAppMessages() {
      const saveBtnAppMessages = document.getElementById("Save-Btn-AppMessages");
      const notifAppMessagesCheckbox = document.getElementById("Notif-New-AppMessages");

      if (!saveBtnAppMessages || !notifAppMessagesCheckbox) {
        console.error("❌ No se encontraron los elementos: #Save-Btn-AppMessages o #Notif-New-AppMessages.");
        return;
      }

      const docRef = doc(db, "CorsoSkillsAdmin", UserUidInfo);

      // 🔹 Cargar el valor actual o establecer por defecto (true)
      async function loadNotifSetting() {
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            const currentValue = data.Notifications?.NotifAppMessages;
            notifAppMessagesCheckbox.checked = currentValue !== undefined ? currentValue : true;

            if (currentValue === undefined) {
              await setDoc(docRef, { Notifications: { NotifAppMessages: true } }, { merge: true });
              console.log("✅ Valor por defecto (true) guardado en Firestore para NotifAppMessages.");
            }
          } else {
            notifAppMessagesCheckbox.checked = true;
            await setDoc(docRef, { Notifications: { NotifAppMessages: true } }, { merge: true });
            console.log("✅ Documento creado con valor por defecto (true) para NotifAppMessages.");
          }
        } catch (error) {
          console.error("❌ Error al cargar la preferencia de notificación (NotifAppMessages):", error);
        }
      }

      // 🔹 Guardar valor al hacer click en el botón
      saveBtnAppMessages.addEventListener("click", async () => {
        const newValue = notifAppMessagesCheckbox.checked;
        try {
          await setDoc(docRef, { Notifications: { NotifAppMessages: newValue } }, { merge: true });
          console.log("✅ Preferencia NotifAppMessages guardada:", newValue);
          alert("✅ Preferencia de notificación NotifAppMessages guardada en la base de datos.");
        } catch (error) {
          console.error("❌ Error al guardar la preferencia NotifAppMessages:", error);
          alert("❌ Hubo un error al guardar la preferencia NotifAppMessages.");
        }
      });

      // 🔹 Inicializar checkbox
      loadNotifSetting();
    }
    function SaveNotifPushReminders() {
      const saveBtnPushReminders = document.getElementById("Save-Btn-PushReminders");
      const notifPushRemindersCheckbox = document.getElementById("Notif-New-PushReminders");

      if (!saveBtnPushReminders || !notifPushRemindersCheckbox) {
        console.error("❌ No se encontraron los elementos: #Save-Btn-PushReminders o #Notif-New-PushReminders.");
        return;
      }

      const docRef = doc(db, "CorsoSkillsAdmin", UserUidInfo);

      // 🔹 Cargar el valor actual o establecer por defecto
      async function loadNotifSetting() {
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            const currentValue = data.Notifications?.NotifPushReminders;
            notifPushRemindersCheckbox.checked = currentValue !== undefined ? currentValue : true;

            if (currentValue === undefined) {
              await setDoc(docRef, { Notifications: { NotifPushReminders: true } }, { merge: true });
              console.log("✅ Valor por defecto (true) guardado en Firestore para PushReminders.");
            }
          } else {
            notifPushRemindersCheckbox.checked = true;
            await setDoc(docRef, { Notifications: { NotifPushReminders: true } }, { merge: true });
            console.log("✅ Documento creado con valor por defecto (true) para PushReminders.");
          }
        } catch (error) {
          console.error("❌ Error al cargar la preferencia de notificación (PushReminders):", error);
        }
      }

      // 🔹 Guardar valor cuando se presiona el botón
      saveBtnPushReminders.addEventListener("click", async () => {
        const newValue = notifPushRemindersCheckbox.checked;
        try {
          await setDoc(docRef, { Notifications: { NotifPushReminders: newValue } }, { merge: true });
          console.log("✅ Preferencia PushReminders guardada:", newValue);
          alert("✅ Preferencia de notificación PushReminders guardada en la base de datos.");
        } catch (error) {
          console.error("❌ Error al guardar la preferencia PushReminders:", error);
          alert("❌ Hubo un error al guardar la preferencia PushReminders.");
        }
      });

      // 🔹 Inicializar el estado del checkbox
      loadNotifSetting();
    }
  
    SaveNotifEmailNewUser()
    SaveNotifNewCourse() 
    SaveNotifNewEnrollment()
    SaveNotifNewCertificate()
    SaveNotifAppMessages()
    SaveNotifPushReminders()
    renderNotificacionesvalues()
  }
  function RenderBillingInfo(){
    ToggleColorInput("Edit-Btn-BillingName", "BillingName")
    ToggleColorInput("Edit-Btn-BillingRFC", "BillingRFC")
    ToggleColorInput("Edit-Btn-BillingAddress", "BillingAddress")
    ToggleColorInput("Edit-Btn-BillingEmail", "BillingEmail")
    ToggleColorInput("Edit-Btn-BillingPhone", "BillingPhone")
    ToggleColorInput("Edit-Btn-BillingPaymentMethod", "BillingPaymentMethod")
    ToggleColorInput("Edit-Btn-BillingCurrency", "BillingCurrency")
    function renderBilingvalues(){
      renderText(AdminData.BillingInfo.BillingName, "Billing-Name")
      renderText(AdminData.BillingInfo.BillingRFC, "Billing-RFC")
      renderText(AdminData.BillingInfo.BillingAddress, "Billing-Address")
      renderText(AdminData.BillingInfo.BillingEmail, "Billing-Email")
      renderText(AdminData.BillingInfo.BillingPhone, "Billing-Phone")
      renderText(AdminData.BillingInfo.BillingPaymentMethod, "Billing-PaymentMethod")
      renderText(AdminData.BillingInfo.BillingCurrency, "Billing-Currency")

    }
    function SaveBillingName() {
      // ---------------------------
      // Save Billing Name to Firestore
      // ---------------------------

      const saveBtnBillingName = document.getElementById("Save-Btn-BillingName");
      const billingNameInput = document.getElementById("BillingName");

      if (!saveBtnBillingName || !billingNameInput) {
        console.error("❌ No se encontraron los elementos de entrada o botón para el nombre de facturación.");
        return;
      }

      saveBtnBillingName.addEventListener("click", async () => {
        const billingNameValue = billingNameInput.value.trim();

        if (!billingNameValue) {
          alert("⚠️ Ingresa el nombre de facturación antes de guardar.");
          return;
        }

        try {
          // 🔹 Save Billing Name to Firestore
          const docRef = doc(db, "CorsoSkillsAdmin", UserUidInfo);
          await setDoc(
            docRef,
            { 
              BillingInfo:{
                BillingName: billingNameValue
              }
              
            },
            { merge: true }
          );

          console.log("✅ Nombre de facturación guardado correctamente en Firestore.");
          alert("✅ Nombre de facturación guardado en la base de datos.");
        } catch (error) {
          console.error("❌ Error al guardar el nombre de facturación en Firestore:", error);
          alert("❌ Hubo un error al guardar el nombre de facturación.");
        }
      });
    }
    function SaveBillingRFC() {
      // ---------------------------
      // Save Billing RFC to Firestore
      // ---------------------------

      const saveBtnBillingRFC = document.getElementById("Save-Btn-BillingRFC");
      const billingRFCInput = document.getElementById("BillingRFC");

      if (!saveBtnBillingRFC || !billingRFCInput) {
        console.error("❌ No se encontraron los elementos de entrada o botón para el RFC de facturación.");
        return;
      }

      saveBtnBillingRFC.addEventListener("click", async () => {
        const billingRFCValue = billingRFCInput.value.trim();

        if (!billingRFCValue) {
          alert("⚠️ Ingresa el RFC de facturación antes de guardar.");
          return;
        }

        try {
          // 🔹 Save Billing RFC to Firestore
          const docRef = doc(db, "CorsoSkillsAdmin", UserUidInfo);
          await setDoc(
            docRef,
            {
              BillingInfo: {
                BillingRFC: billingRFCValue
              }
            },
            { merge: true }
          );

          console.log("✅ RFC de facturación guardado correctamente en Firestore.");
          alert("✅ RFC de facturación guardado en la base de datos.");
        } catch (error) {
          console.error("❌ Error al guardar el RFC de facturación en Firestore:", error);
          alert("❌ Hubo un error al guardar el RFC de facturación.");
        }
      });
    }
    function SaveBillingAddress() {
      // ---------------------------
      // Save Billing Address to Firestore
      // ---------------------------

      const saveBtnBillingAddress = document.getElementById("Save-Btn-BillingAddress");
      const billingAddressInput = document.getElementById("BillingAddress");

      if (!saveBtnBillingAddress || !billingAddressInput) {
        console.error("❌ No se encontraron los elementos de entrada o botón para la dirección de facturación.");
        return;
      }

      saveBtnBillingAddress.addEventListener("click", async () => {
        const billingAddressValue = billingAddressInput.value.trim();

        if (!billingAddressValue) {
          alert("⚠️ Ingresa la dirección de facturación antes de guardar.");
          return;
        }

        try {
          // 🔹 Save Billing Address to Firestore
          const docRef = doc(db, "CorsoSkillsAdmin", UserUidInfo);
          await setDoc(
            docRef,
            {
              BillingInfo: {
                BillingAddress: billingAddressValue
              }
            },
            { merge: true }
          );

          console.log("✅ Dirección de facturación guardada correctamente en Firestore.");
          alert("✅ Dirección de facturación guardada en la base de datos.");
        } catch (error) {
          console.error("❌ Error al guardar la dirección de facturación en Firestore:", error);
          alert("❌ Hubo un error al guardar la dirección de facturación.");
        }
      });
    }
    function SaveBillingEmail() {
      // ---------------------------
      // Save Billing Email to Firestore
      // ---------------------------

      const saveBtnBillingEmail = document.getElementById("Save-Btn-BillingEmail");
      const billingEmailInput = document.getElementById("BillingEmail");

      if (!saveBtnBillingEmail || !billingEmailInput) {
        console.error("❌ No se encontraron los elementos de entrada o botón para el correo de facturación.");
        return;
      }

      saveBtnBillingEmail.addEventListener("click", async () => {
        const billingEmailValue = billingEmailInput.value.trim();

        if (!billingEmailValue) {
          alert("⚠️ Ingresa el correo electrónico de facturación antes de guardar.");
          return;
        }

        // 🔹 Validación básica de formato de correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(billingEmailValue)) {
          alert("⚠️ Ingresa un correo electrónico válido.");
          return;
        }

        try {
          // 🔹 Save Billing Email to Firestore
          const docRef = doc(db, "CorsoSkillsAdmin", UserUidInfo);
          await setDoc(
            docRef,
            {
              BillingInfo: {
                BillingEmail: billingEmailValue
              }
            },
            { merge: true }
          );

          console.log("✅ Correo de facturación guardado correctamente en Firestore.");
          alert("✅ Correo de facturación guardado en la base de datos.");
        } catch (error) {
          console.error("❌ Error al guardar el correo de facturación en Firestore:", error);
          alert("❌ Hubo un error al guardar el correo de facturación.");
        }
      });
    }
    function SaveBillingPhone() {
      // ---------------------------
      // Save Billing Phone to Firestore
      // ---------------------------

      const saveBtnBillingPhone = document.getElementById("Save-Btn-BillingPhone");
      const billingPhoneInput = document.getElementById("BillingPhone");

      if (!saveBtnBillingPhone || !billingPhoneInput) {
        console.error("❌ No se encontraron los elementos de entrada o botón para el teléfono de facturación.");
        return;
      }

      saveBtnBillingPhone.addEventListener("click", async () => {
        const billingPhoneValue = billingPhoneInput.value.trim();

        if (!billingPhoneValue) {
          alert("⚠️ Ingresa el teléfono de facturación antes de guardar.");
          return;
        }

        // 🔹 Validación básica de número de teléfono
        const phoneRegex = /^[0-9+\-\s()]{7,20}$/;
        if (!phoneRegex.test(billingPhoneValue)) {
          alert("⚠️ Ingresa un número de teléfono válido.");
          return;
        }

        try {
          // 🔹 Save Billing Phone to Firestore
          const docRef = doc(db, "CorsoSkillsAdmin", UserUidInfo);
          await setDoc(
            docRef,
            {
              BillingInfo: {
                BillingPhone: billingPhoneValue
              }
            },
            { merge: true }
          );

          console.log("✅ Teléfono de facturación guardado correctamente en Firestore.");
          alert("✅ Teléfono de facturación guardado en la base de datos.");
        } catch (error) {
          console.error("❌ Error al guardar el teléfono de facturación en Firestore:", error);
          alert("❌ Hubo un error al guardar el teléfono de facturación.");
        }
      });
    }
    function SaveBillingPaymentMethod() {
      // ---------------------------
      // Save Billing Payment Method to Firestore
      // ---------------------------

      const saveBtnBillingPaymentMethod = document.getElementById("Save-Btn-BillingPaymentMethod");
      const billingPaymentMethodSelect = document.getElementById("BillingPaymentMethod");

      if (!saveBtnBillingPaymentMethod || !billingPaymentMethodSelect) {
        console.error("❌ No se encontraron los elementos de entrada o botón para el método de pago de facturación.");
        return;
      }

      saveBtnBillingPaymentMethod.addEventListener("click", async () => {
        const billingPaymentMethodValue = billingPaymentMethodSelect.value;

        if (!billingPaymentMethodValue) {
          alert("⚠️ Selecciona un método de pago antes de guardar.");
          return;
        }

        try {
          // 🔹 Save Billing Payment Method to Firestore
          const docRef = doc(db, "CorsoSkillsAdmin", UserUidInfo);
          await setDoc(
            docRef,
            {
              BillingInfo: {
                BillingPaymentMethod: billingPaymentMethodValue
              }
            },
            { merge: true }
          );

          console.log("✅ Método de pago de facturación guardado correctamente en Firestore.");
          alert("✅ Método de pago de facturación guardado en la base de datos.");
        } catch (error) {
          console.error("❌ Error al guardar el método de pago de facturación en Firestore:", error);
          alert("❌ Hubo un error al guardar el método de pago de facturación.");
        }
      });
    }
    function SaveBillingCurrency() {
      // ---------------------------
      // Save Billing Currency (MXN) to Firestore
      // ---------------------------

      const saveBtnBillingCurrency = document.getElementById("Billing");

      if (!saveBtnBillingCurrency) {
        console.error("❌ No se encontró el botón para guardar la moneda de facturación.");
        return;
      }

      saveBtnBillingCurrency.addEventListener("click", async () => {
        const billingCurrencyValue = "MXN"; // Valor fijo de la moneda

        try {
          // 🔹 Save Billing Currency to Firestore
          const docRef = doc(db, "CorsoSkillsAdmin", UserUidInfo);
          await setDoc(
            docRef,
            {
              BillingInfo: {
                BillingCurrency: billingCurrencyValue
              }
            },
            { merge: true }
          );

          console.log("✅ Moneda de facturación guardada correctamente en Firestore (MXN).");
         // alert("✅ Moneda de facturación (MXN) guardada en la base de datos.");
        } catch (error) {
          console.error("❌ Error al guardar la moneda de facturación en Firestore:", error);
          alert("❌ Hubo un error al guardar la moneda de facturación.");
        }
      });
    }
    SaveBillingName()
    SaveBillingRFC()
    SaveBillingAddress()
    SaveBillingEmail()
    SaveBillingPhone()
    SaveBillingPaymentMethod()
    SaveBillingCurrency()
    renderBilingvalues()

  }
  function renderConfiguraciónInfo(){
    ToggleColorInput("Edit-Btn-CertificateOrientation", "CertificateOrientation")
    ToggleColorInput("Edit-Btn-CertificateMessage", "CertificateMessage")
    ToggleColorInput("Edit-Btn-CertificateBorderStyle", "CertificateBorderStyle")
    ToggleColorInput("Edit-Btn-CertificateBackgroundImage", "CertificateBackgroundImage")
    ToggleColorInput("Edit-Btn-CertificateFontFamily", "CertificateFontFamily")
    ToggleColorInput("Edit-Btn-CertificateAccentColor", "CertificateAccentColor")
    ToggleColorInput("Edit-Btn-CertificateFontColor", "CertificateFontColor")
    ToggleColorInput("Edit-Btn-CertificateSignatureFile", "CertificateSignatureFile")
    ToggleColorInput("Edit-Btn-CertificateSignatureFile", "link-Tag")


    function renderConfiguraciónvalues(){
      renderText(AdminData.CertificateSettings.CertificateOrientation, "Certificate-Orientation")
      renderText(AdminData.CertificateSettings.CertificateMessage, "Certificate-Message")
      renderText(AdminData.CertificateSettings.CertificateBorderStyle, "Certificate-BorderStyle")
      createImageInDiv("Certificate-BackgroundImage",AdminData.CertificateSettings.CertificateBackgroundImage, "Certificate Background Image", "sampleImg", "img-style")
      renderText(AdminData.CertificateSettings.CertificateFontFamily, "Certificate-FontFamily")
      renderText(AdminData.CertificateSettings.CertificateFontColor, "Certificate-FontColor")
      renderText(AdminData.CertificateSettings.CertificateAccentColor, "Certificate-AccentColor")
      createImageInDiv("Certificate-SignaturePreview",AdminData.CertificateSettings.CertificateSignatureFile, "Certificate Signature", "sampleImg", "img-style")



    }

    function SaveCertificateOrientation() {

      const saveBtnOrientation = document.getElementById("Save-Btn-CertificateOrientation");
      const selectOrientation = document.getElementById("CertificateOrientation");

      if (!saveBtnOrientation || !selectOrientation) {
        console.error("❌ No se encontraron los elementos de entrada o botón para la orientación del certificado.");
        return;
      }

      saveBtnOrientation.addEventListener("click", async () => {
        const selectedOrientation = selectOrientation.value;

        if (!selectedOrientation) {
          alert("⚠️ Selecciona una orientación antes de guardar.");
          return;
        }

        try {
          // 🔹 Save Certificate Orientation to Firestore
          const docRef = doc(db, "CorsoSkillsAdmin", UserUidInfo);
          await setDoc(
            docRef,
            {
              CertificateSettings: {
                CertificateOrientation: selectedOrientation
              }
            },
            { merge: true }
          );

          console.log("✅ Orientación del certificado guardada correctamente en Firestore.");
          alert("✅ Orientación del certificado guardada en la base de datos.");
        } catch (error) {
          console.error("❌ Error al guardar la orientación del certificado en Firestore:", error);
          alert("❌ Hubo un error al guardar la orientación del certificado.");
        }
      });
    }
    function SaveCertificateMessage() {
      const saveBtnMessage = document.getElementById("Save-Btn-CertificateMessage");
      const messageInput = document.getElementById("CertificateMessage");

      if (!saveBtnMessage || !messageInput) {
        console.error("❌ No se encontraron los elementos de entrada o botón para el mensaje del certificado.");
        return;
      }

      saveBtnMessage.addEventListener("click", async () => {
        const certificateMessageValue = messageInput.value.trim();

        if (!certificateMessageValue) {
          alert("⚠️ Ingresa un mensaje antes de guardar.");
          return;
        }

        try {
          // 🔹 Save Certificate Message to Firestore
          const docRef = doc(db, "CorsoSkillsAdmin", UserUidInfo);
          await setDoc(
            docRef,
            {
              CertificateSettings: {
                CertificateMessage: certificateMessageValue
              }
            },
            { merge: true }
          );

          console.log("✅ Mensaje del certificado guardado correctamente en Firestore.");
          alert("✅ Mensaje del certificado guardado en la base de datos.");
        } catch (error) {
          console.error("❌ Error al guardar el mensaje del certificado en Firestore:", error);
          alert("❌ Hubo un error al guardar el mensaje del certificado.");
        }
      });
    }
    function SaveCertificateBorderStyle() {
      const saveBtnBorderStyle = document.getElementById("Save-Btn-CertificateBorderStyle");
      const selectBorderStyle = document.getElementById("CertificateBorderStyle");

      if (!saveBtnBorderStyle || !selectBorderStyle) {
        console.error("❌ No se encontraron los elementos de entrada o botón para el estilo de borde del certificado.");
        return;
      }

      saveBtnBorderStyle.addEventListener("click", async () => {
        const selectedBorderStyle = selectBorderStyle.value;

        if (!selectedBorderStyle) {
          alert("⚠️ Selecciona un tipo de borde antes de guardar.");
          return;
        }

        try {
          // 🔹 Save Certificate Border Style to Firestore
          const docRef = doc(db, "CorsoSkillsAdmin", UserUidInfo);
          await setDoc(
            docRef,
            {
              CertificateSettings: {
                CertificateBorderStyle: selectedBorderStyle
              }
            },
            { merge: true }
          );

          console.log("✅ Estilo de borde del certificado guardado correctamente en Firestore.");
          alert("✅ Estilo de borde del certificado guardado en la base de datos.");
        } catch (error) {
          console.error("❌ Error al guardar el estilo de borde del certificado en Firestore:", error);
          alert("❌ Hubo un error al guardar el estilo de borde del certificado.");
        }
      });
    }
    function SaveCertificateBackgroundImage() {
      const saveBtnBackground = document.getElementById("Save-Btn-CertificateBackgroundImage");
      const backgroundInput = document.getElementById("CertificateBackgroundImage");

      if (!saveBtnBackground || !backgroundInput) {
        console.error("❌ No se encontraron los elementos de entrada o botón para la imagen de fondo del certificado.");
        return;
      }

      saveBtnBackground.addEventListener("click", async () => {
        const file = backgroundInput.files[0];

        if (!file) {
          alert("⚠️ Selecciona una imagen antes de guardar.");
          return;
        }

        try {
          // 🔹 Path in Firebase Storage
          const storagePath = `CertificateSettings/BackgroundImages/${UserUidInfo}/${file.name}`;
          const storageRef = ref(storage, storagePath);

          console.log("⬆️ Subiendo imagen de fondo a Firebase Storage...");

          // 🔹 Upload file
          await uploadBytes(storageRef, file);

          // 🔹 Get public URL
          const downloadURL = await getDownloadURL(storageRef);

          // 🔹 Save URL to Firestore
          const docRef = doc(db, "CorsoSkillsAdmin", UserUidInfo);
          await setDoc(
            docRef,
            {
              CertificateSettings: {
                CertificateBackgroundImage: downloadURL
              }
            },
            { merge: true }
          );

          console.log("✅ Imagen de fondo del certificado guardada correctamente.");
          alert("✅ Imagen de fondo guardada y registrada en la base de datos.");

        } catch (error) {
          console.error("❌ Error al subir o guardar la imagen de fondo del certificado:", error);
          alert("❌ Hubo un error al guardar la imagen de fondo.");
        }
      });
    }
    function SaveCertificateFontFamily() {

      const saveBtnFont = document.getElementById("Save-Btn-CertificateFontFamily");
      const selectFont = document.getElementById("CertificateFontFamily");

      if (!saveBtnFont || !selectFont) {
        console.error("❌ No se encontraron los elementos de entrada o botón para la fuente del certificado.");
        return;
      }

      saveBtnFont.addEventListener("click", async () => {
        const selectedFont = selectFont.value;

        if (!selectedFont) {
          alert("⚠️ Selecciona una fuente antes de guardar.");
          return;
        }

        try {
          // 🔹 Save Certificate Font Family to Firestore
          const docRef = doc(db, "CorsoSkillsAdmin", UserUidInfo);
          await setDoc(
            docRef,
            {
              CertificateSettings: {
                CertificateFontFamily: selectedFont
              }
            },
            { merge: true }
          );

          console.log("✅ Fuente del certificado guardada correctamente en Firestore.");
          alert("✅ Fuente del certificado guardada en la base de datos.");
        } catch (error) {
          console.error("❌ Error al guardar la fuente del certificado en Firestore:", error);
          alert("❌ Hubo un error al guardar la fuente del certificado.");
        }
      });
    }
    function SaveCertificateFontColor() {
      // ---------------------------
      // Save Certificate Font Color to Firestore
      // ---------------------------

      const saveBtnFontColor = document.getElementById("Save-Btn-CertificateFontColor");
      const colorInput = document.getElementById("CertificateFontColor");

      if (!saveBtnFontColor || !colorInput) {
        console.error("❌ No se encontraron los elementos de entrada o botón para el color de fuente del certificado.");
        return;
      }

      saveBtnFontColor.addEventListener("click", async () => {
        const selectedColor = colorInput.value;

        if (!selectedColor) {
          alert("⚠️ Selecciona un color antes de guardar.");
          return;
        }

        try {
          // 🔹 Save Certificate Font Color to Firestore
          const docRef = doc(db, "CorsoSkillsAdmin", UserUidInfo);
          await setDoc(
            docRef,
            {
              CertificateSettings: {
                CertificateFontColor: selectedColor
              }
            },
            { merge: true }
          );

          console.log("✅ Color de fuente del certificado guardado correctamente en Firestore.");
          alert("✅ Color de fuente del certificado guardado en la base de datos.");
        } catch (error) {
          console.error("❌ Error al guardar el color de fuente del certificado en Firestore:", error);
          alert("❌ Hubo un error al guardar el color de fuente del certificado.");
        }
      });
    }
    function SaveCertificateAccentColor() {
      const saveBtnAccentColor = document.getElementById("Save-Btn-CertificateAccentColor");
      const accentColorInput = document.getElementById("CertificateAccentColor");

      if (!saveBtnAccentColor || !accentColorInput) {
        console.error("❌ No se encontraron los elementos de entrada o botón para el color de acento del certificado.");
        return;
      }

      saveBtnAccentColor.addEventListener("click", async () => {
        const selectedAccentColor = accentColorInput.value;

        if (!selectedAccentColor) {
          alert("⚠️ Selecciona un color antes de guardar.");
          return;
        }

        try {
          // 🔹 Save Certificate Accent Color to Firestore
          const docRef = doc(db, "CorsoSkillsAdmin", UserUidInfo);
          await setDoc(
            docRef,
            {
              CertificateSettings: {
                CertificateAccentColor: selectedAccentColor
              }
            },
            { merge: true }
          );

          console.log("✅ Color de acento del certificado guardado correctamente en Firestore.");
          alert("✅ Color de acento del certificado guardado en la base de datos.");
        } catch (error) {
          console.error("❌ Error al guardar el color de acento del certificado en Firestore:", error);
          alert("❌ Hubo un error al guardar el color de acento del certificado.");
        }
      });
    }
    function SaveCertificateSignatureFile() {
      const saveBtnSignature = document.getElementById("Save-Btn-CertificateSignatureFile");
      const signatureInput = document.getElementById("CertificateSignatureFile");

      if (!saveBtnSignature || !signatureInput) {
        console.error("❌ No se encontraron los elementos de entrada o botón para la firma del certificado.");
        return;
      }

      saveBtnSignature.addEventListener("click", async () => {
        const file = signatureInput.files[0];

        if (!file) {
          alert("⚠️ Selecciona un archivo de firma antes de guardar.");
          return;
        }

        try {
          // 🔹 Path in Firebase Storage
          const storagePath = `CertificateSettings/Signatures/${UserUidInfo}/${file.name}`;
          const storageRef = ref(storage, storagePath);

          console.log("⬆️ Subiendo archivo de firma a Firebase Storage...");

          // 🔹 Upload the file
          await uploadBytes(storageRef, file);

          // 🔹 Get public URL
          const downloadURL = await getDownloadURL(storageRef);

          // 🔹 Save URL to Firestore
          const docRef = doc(db, "CorsoSkillsAdmin", UserUidInfo);
          await setDoc(
            docRef,
            {
              CertificateSettings: {
                CertificateSignatureFile: downloadURL
              }
            },
            { merge: true }
          );

          console.log("✅ Archivo de firma guardado correctamente en Firestore.");
          alert("✅ Archivo de firma del certificado guardado en la base de datos.");

        } catch (error) {
          console.error("❌ Error al subir o guardar el archivo de firma del certificado:", error);
          alert("❌ Hubo un error al guardar el archivo de firma.");
        }
      });
    }



     
    renderConfiguraciónvalues()
    SaveCertificateOrientation()
    SaveCertificateMessage()
    SaveCertificateBorderStyle()
    SaveCertificateBackgroundImage()
    SaveCertificateFontFamily()
    SaveCertificateFontColor()
    SaveCertificateAccentColor()
    SaveCertificateSignatureFile()


  }



  function RenderPersonalizaciónInfo(){
    ToggleColorInput("Edit-Btn-QuoteText", "quoteText")
    ToggleColorInput("Edit-Btn-Font-Category", "MainFont")
    ToggleColorInput("Edit-Btn-CourseCategory", "courseCategory")



    ToggleColorInput("Edit-Btn-Trophy", "trophyBanner")
    ToggleColorInput("Edit-Btn-Trophy", "trophyTitle")
    ToggleColorInput("Edit-Btn-Trophy", "trophyIcon")
    ToggleColorInput("Edit-Btn-Trophy", "trophyTrigger")

    function renderPersonalizaciónvalues(){
      renderList(BusinessData.Quotes, "Quote-Text")
      function setupFontPreview() {
        const fontSelect = document.getElementById("MainFont");
        const preview = document.getElementById("Main-Font");

        if (!fontSelect || !preview) {
          console.error("❌ No se encontraron los elementos de fuente o vista previa.");
          return;
        }

        // Load Google Fonts dynamically if needed
        const loadFont = (fontName) => {
          if (!fontName || ["sans-serif", "serif", "monospace"].includes(fontName)) return;

          const linkId = "font-link-" + fontName.replace(/\s+/g, "-");
          if (!document.getElementById(linkId)) {
            const link = document.createElement("link");
            link.id = linkId;
            link.rel = "stylesheet";
            link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, "+")}&display=swap`;
            document.head.appendChild(link);
          }
        };

        // Change preview font on selection
        fontSelect.addEventListener("change", (e) => {
          const selectedFont = e.target.value;
          if (!selectedFont) return;

          loadFont(selectedFont);
          preview.style.fontFamily = `'${selectedFont}', sans-serif`;
          preview.textContent = `Vista previa: ${selectedFont}`;
        });
      }
      setupFontPreview()
      renderText(BusinessData.Font, "Main-Font")
      renderCList(BusinessData.CourseCategory, "Course-Category")
    }




    function SaveQuoteText() {
      const saveBtnQuote = document.getElementById("Save-Btn-QuoteText");
      const quoteInput = document.getElementById("quoteText");

      if (!saveBtnQuote || !quoteInput) {
        console.error("❌ No se encontraron los elementos de entrada o botón para la cita motivacional.");
        return;
      }

      saveBtnQuote.addEventListener("click", async () => {
        const quoteValue = quoteInput.value.trim();

        if (!quoteValue) {
          alert("⚠️ Escribe una frase o cita antes de guardar.");
          return;
        }

        try {
          const docRef = doc(db, "CorsoSkillBusiness", TBuInfo);

          // 🔹 Try to append to the Quotes array
          await updateDoc(docRef, {
            Quotes: arrayUnion(quoteValue)
          }).catch(async (error) => {
            // If doc or field doesn’t exist yet, create it
            if (error.code === "not-found") {
              await setDoc(
                docRef,
                { Quotes: [quoteValue] },
                { merge: true }
              );
            } else {
              throw error;
            }
          });

          console.log("✅ Cita motivacional agregada correctamente al array Quotes en Firestore.");
          alert("✅ Cita guardada correctamente en la base de datos.");

          // Optional: clear textarea
          quoteInput.value = "";

        } catch (error) {
          console.error("❌ Error al guardar la cita motivacional en Firestore:", error);
          alert("❌ Hubo un error al guardar la cita.");
        }
      });
    }
    function SaveMainFont() {
      const saveBtnFont = document.getElementById("Save-Btn-Font-Category");
      const selectFont = document.getElementById("MainFont");

      if (!saveBtnFont || !selectFont) {
        console.error("❌ No se encontraron los elementos de entrada o botón para la fuente principal.");
        return;
      }

      saveBtnFont.addEventListener("click", async () => {
        const selectedFont = selectFont.value.trim();

        if (!selectedFont) {
          alert("⚠️ Selecciona una fuente antes de guardar.");
          return;
        }

        try {
          const docRef = doc(db, "CorsoSkillBusiness", TBuInfo);

          // 🔹 Guardar o actualizar el campo "MainFont"
          await updateDoc(docRef, {
            Font: selectedFont
          }).catch(async (error) => {
            // Si el documento no existe, lo crea
            if (error.code === "not-found") {
              await setDoc(
                docRef,
                { Font: selectedFont },
                { merge: true }
              );
            } else {
              throw error;
            }
          });

          console.log("✅ Fuente principal guardada correctamente en Firestore:", selectedFont);
          alert("✅ Fuente principal guardada correctamente en la base de datos.");

        } catch (error) {
          console.error("❌ Error al guardar la fuente principal en Firestore:", error);
          alert("❌ Hubo un error al guardar la fuente.");
        }
      });
    }
    function SaveCourseCategory() {
      const saveBtnCategory = document.getElementById("Save-Btn-CourseCategory");
      const inputCategory = document.getElementById("courseCategory");

      if (!saveBtnCategory || !inputCategory) {
        console.error("❌ No se encontraron los elementos de entrada o botón para Course Category.");
        return;
      }

      saveBtnCategory.addEventListener("click", async () => {
        const categoryValue = inputCategory.value.trim();

        if (!categoryValue) {
          alert("⚠️ Por favor ingresa una categoría de curso.");
          return;
        }

        try {
          const docRef = doc(db, "CorsoSkillBusiness", TBuInfo);

          // Create the array object entry
          const newCategoryObj = {};
          newCategoryObj[categoryValue] = true;

          // Push into array using arrayUnion
          await updateDoc(docRef, {
            CourseCategory: arrayUnion(newCategoryObj)
          }).catch(async (error) => {
            // Document not found → create it
            if (error.code === "not-found") {
              await setDoc(
                docRef,
                { CourseCategory: [newCategoryObj] },
                { merge: true }
              );
            } else {
              throw error;
            }
          });

          console.log("✅ Categoría agregada al array:", newCategoryObj);
          alert(`✅ Categoría agregada: ${categoryValue}`);

          inputCategory.value = "";

        } catch (error) {
          console.error("❌ Error al guardar la categoría en Firestore:", error);
          alert("❌ Hubo un error al guardar la categoría.");
        }
      });
    }



    async function SaveTrophyBanner() {
      const saveBtnBanner = document.getElementById("Save-Btn-Trophy");
      const bannerInput = document.getElementById("trophyBanner");
      const titleInput = document.getElementById("trophyTitle");
      const triggerInput = document.getElementById("trophyTrigger");
      const iconsInput = document.getElementById("trophyIcon");

      if (!saveBtnBanner || !bannerInput || !titleInput || !triggerInput || !iconsInput) {
        console.error("❌ No se encontraron los elementos de entrada o botón para el trofeo.");
        return;
      }

      saveBtnBanner.addEventListener("click", async () => {
        const bannerValue = bannerInput.value.trim();
        const titleValue = titleInput.value.trim();
        const triggerValue = triggerInput.value.trim();
        const files = iconsInput.files;

        if (!bannerValue || !titleValue || !triggerValue) {
          alert("⚠️ Completa todos los campos (Banner, Título y Trigger) antes de guardar.");
          return;
        }

        try {
          const docRef = doc(db, "CorsoSkillBusiness", TBuInfo);

          // 🔹 Obtener los trofeos existentes
          const docSnap = await getDoc(docRef);
          let currentData = docSnap.exists() ? docSnap.data() : {};
          let trophies = currentData.Trophies || {};

          // 🔹 Calcular nuevo ID (T1, T2, T3…)
          const newTrophyId = "T" + (Object.keys(trophies).length + 1);

          // 🔹 Subir los iconos al Storage y obtener URLs
          let iconURLs = [];
          if (files.length > 0) {
            const uploadPromises = Array.from(files).map(async (file, index) => {
              const storagePath = `BusinessUnits/${TBuInfo}/Trophys/${newTrophyId}_Icon_${index + 1}_${file.name}`;
              const storageReference = ref(storage, storagePath);

              await uploadBytes(storageReference, file);
              const downloadURL = await getDownloadURL(storageReference);
              return downloadURL;
            });

            iconURLs = await Promise.all(uploadPromises);
          }

          // 🔹 Crear el objeto del nuevo trofeo
          const newTrophy = {
            Banner: bannerValue,
            Tittle: titleValue,
            Trigger: triggerValue,
            Icons: iconURLs.length > 0 ? iconURLs : []
          };

          // 🔹 Agregar el trofeo sin eliminar los anteriores
          trophies[newTrophyId] = newTrophy;

          // 🔹 Guardar en Firestore
          await setDoc(docRef, { Trophies: trophies }, { merge: true });

          console.log("🏆 Nuevo trofeo guardado correctamente:", newTrophy);
          alert("✅ Nuevo trofeo guardado correctamente en la base de datos.");

          // 🔹 Limpiar inputs después de guardar
          bannerInput.value = "";
          titleInput.value = "";
          triggerInput.value = "";
          iconsInput.value = "";

        } catch (error) {
          console.error("❌ Error al guardar el trofeo en Firestore:", error);
          alert("❌ Hubo un error al guardar el trofeo.");
        }
      });
    }







    renderPersonalizaciónvalues()
    SaveQuoteText()
    SaveMainFont()
    SaveCourseCategory()
    SaveTrophyBanner()
  }







  function RenderSystemInfo(){

    renderText(BusinessData.System.Comapny, "System-Name")   
    renderText(BusinessData.System.Version, "System-Version")   

    renderText(BusinessData.System.Phone, "Support-Phone") 
    
    renderEmailLink(BusinessData.System.Email, "Solicitud de soporte", "Hola, necesito ayuda con mi cuenta.", "Support-Email") 

    renderLink(BusinessData.System.URL, BusinessData.System.URL, "System-URL")

    const date = new Date(BusinessData.System.Date.seconds * 1000 + BusinessData.System.Date.nanoseconds / 1000000);
      
    renderText(date , "System-ImplementationDate")
  }






  renderSettingInfo()
  RenderPersonalInfo()
  RenderSecurityInfo()
  RenderNotificacionesInfo()
  RenderBillingInfo()
  renderConfiguraciónInfo()



  RenderPersonalizaciónInfo()

  RenderSystemInfo()









  // Optionally return all for later use
  return {
    AdminData,
    BusinessData,
    StudentsData,
    TeachersData,
    ClassroomsData,
    AffiliatesData,
    MessagesData,
    WebsiteData
  };

 

}


fetchAllContent();

  


  document.querySelectorAll(".toggle-password").forEach(icon => {
    icon.addEventListener("click", () => {
      const input = document.getElementById(icon.getAttribute("data-target"));
      if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
      } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      }
    });
  });

document.querySelectorAll(".MOL-Btn").forEach(btn => {
  btn.addEventListener("click", () => {
    // Find the .UpdateBlock inside the same .Action-block

    const updateBlock = parentBlock.querySelector(".UpdateBlock");
    const isVisible = updateBlock.style.display === "block";

    if (isVisible) {
      updateBlock.style.display = "none";
     ;
    } else {
      updateBlock.style.display = "block";
    
    }
  });
});

function initHelpPopups() {
  const helpIcons = document.querySelectorAll(".help-icon");
  const popup = document.getElementById("helpPopup");
  const helpText = document.getElementById("helpText");
  const closeBtn = document.getElementById("closePopup");

  if (!popup || !helpText || !closeBtn) {
    console.error("❌ Missing popup elements in DOM");
    return;
  }

  helpIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      const message = icon.getAttribute("data-message") || "Sin información disponible.";
      helpText.textContent = message;
      popup.classList.add("show");
    });
  });

  closeBtn.addEventListener("click", () => {
    popup.classList.remove("show");
  });

  // Optional: close by clicking outside
  popup.addEventListener("click", e => {
    if (e.target === popup) popup.classList.remove("show");
  });
}

initHelpPopups()


document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".Content-Btn");
  const sections = document.querySelectorAll(".Block-Content");

  console.log("✅ Buttons found:", buttons.length);
  console.log("✅ Sections found:", sections.length);

  if (!buttons.length || !sections.length) {
    console.error("❌ Buttons or sections missing from DOM");
    return;
  }

  sections.forEach(section => (section.style.display = "none"));
  const defaultSection = document.getElementById("Platform-Content");
  if (defaultSection) defaultSection.style.display = "flex";

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const targetId = `${button.id}-Content`;
      const targetSection = document.getElementById(targetId);
      if (!targetSection) {
        console.warn(`⚠️ Section not found: ${targetId}`);
        return;
      }

      sections.forEach(section => (section.style.display = "none"));
      targetSection.style.display = "flex";

      buttons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });
});





document.getElementById("Dashboard").addEventListener("click", function () {
  window.location.href = "index13.html";
});
document.getElementById("UserManagement").addEventListener("click", function () {
  window.location.href = "index13.1.html";
});
document.getElementById("CourseManagement").addEventListener("click", function () {
  window.location.href = "index13.2.html";
});
document.getElementById("Categories").addEventListener("click", function () {
  window.location.href = "index13.3.html";
});
document.getElementById("Groups").addEventListener("click", function () {
  window.location.href = "index13.4.html";
});
document.getElementById("Branches").addEventListener("click", function () {
  window.location.href = "index13.5.html";
});
document.getElementById("Assessment").addEventListener("click", function () {
  window.location.href = "index13.6.html";
});
document.getElementById("QuestionBank").addEventListener("click", function () {
  window.location.href = "index13.7.html";
});
document.getElementById("TrainingManagement").addEventListener("click", function () {
  window.location.href = "index13.8.html";
});
document.getElementById("Files").addEventListener("click", function () {
  window.location.href = "index13.9.html";
});
document.getElementById("Library").addEventListener("click", function () {
  window.location.href = "index13.10.html";
});
document.getElementById("Reports").addEventListener("click", function () {
  window.location.href = "index13.11.html";
});
document.getElementById("Announcements").addEventListener("click", function () {
  window.location.href = "index13.12.html";
});
document.getElementById("Settings").addEventListener("click", function () {
  window.location.href = "index13.13.html";
});