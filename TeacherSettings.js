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
 // console.log(data.BuLogos.Icons[0])
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



  function setbodyColors(){
    setBodyBackgroundColor(Prime4)
  }
  function SetUserInfoColors(){
    setallBackgroundColor(".User-Info", Prime)
    setTextColors( ".User-Info", Prime5)
  }
  function Setmaincolors(){
    setallBackgroundColor(".Main-Blocks", Prime5)
  }







  function SetMainColors(){
    renderImage(data.BuLogos.Icons[0], "BuLogo", "Bulogos")
    setBodyBackgroundColor(Prime4)
    setBackgroundColor("sidebar", Prime5)

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
  function setSettingColors() {
    const style = document.createElement("style");
    style.textContent = `
    #Line{
      background-color: ${Prime3};
    }
    .Setting-Btns:hover {
      background:${Prime3};
    }
    .Config-Blocks {
      background:${Prime5};
    }
    .Config-Blocks h2 {
      color: ${Base};
    }
    .Content-block label {
      color:${Prime3};
    }
    .Content-block span{
      color: ${Base};
      border: 1px solid ${Base};
    }
    .Content-block input,
    .Content-block select,
    .Content-block textarea {
      border: 1px solid ${Prime4};
    }
    .Content-block input:focus,
    .Content-block select:focus,
    .Content-block textarea:focus {
      border-color:${Prime3};
    }
    button {
      background: ${Prime3};
      color: ${Prime5};
    }
    button:hover {
      background:${Base};
    }


    `;
    document.head.appendChild(style);
  }


  
 
  SetMainColors()
  setbodyColors()
  setGlobalFont(data.Font)
  SetUserInfoColors()
  Setmaincolors()
  sidebarcolors()
  setSettingColors()









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
async function fetchAllContent() {
  const TeacherData = await getTeacherContent();
  const businessData = await getCorsoSkillAppContent();

  if (!TeacherData && !businessData) {
    console.error("❌ Could not load teacher or business data");
    return;
  }

  console.log("✅ Teacher Data:", TeacherData);
  console.log("✅ Business Data:", businessData);

  // destructure colors if businessData exists
  let Base, Prime, Prime1, Prime2, Prime3, Prime4, Prime5;
  if (businessData?.BuColors?.Colors) {
    ({ Base, Prime, Prime1, Prime2, Prime3, Prime4, Prime5 } = businessData.BuColors.Colors);
  }


  function renderText(text, elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = text;
    } else {
      console.error(`Element with ID "${elementId}" not found.`);
    }
  }
  function convertFirestoreTimestampToDate(timestamp) {
    if (!timestamp || typeof timestamp.seconds !== "number") {
      console.error("Invalid Firestore timestamp:", timestamp);
      return null;
    }

    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);

    // Format as MM/DD/YYYY
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
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


  function renderWelcome() {
    if (TeacherData?.fullName) {
      renderText("Hola, " + TeacherData.fullName, "User-Name");
    } else {
      renderText("Missing", "User-Name");
    }
  }
  function renderId() {
    const userIdElement = document.getElementById("User-Id");

    if (TeacherData?.TeacherId) {
      const teacherId = TeacherData.TeacherId;
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

    if (!TeacherData?.profileImg) {
      container.innerHTML = `<i class="fa-solid fa-circle-user" style="font-size: 2rem;"></i>`;
    } else {
      container.innerHTML = `<img src="${TeacherData.profileImg}" alt="User Icon" width="50" height="50" style="border-radius: 50%;" />`;
      
    }
  }
  function renderAlertIcons() {
    const ActiveAlrts = 0; // change to 0 or null to test

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

    function checkValue(value) {
      return value ? "yes" : "no";
    }

    const Alert = checkValue(ActiveAlrts);
    console.log(Alert);

    const container = document.querySelector(".Active-Portal-Alerts");

    if (!container) {
      console.error("Element with class 'Active-Portal-Alerts' not found.");
      return;
    }

    if (Alert === "yes") {
      setTextColors("#APA", Prime2)
      setallBackgroundColor("#APA", Prime5)
      container.innerHTML = `<i class="fa-solid fa-bell"></i>`;
    }else if (Alert === "no")
      
      container.innerHTML = `<i class="fa-regular fa-bell"></i>`;
  }


  function NavBtnsSet() {
    const buttons = document.querySelectorAll(".Setting-Btns");
    const blocks = document.querySelectorAll(".Config-Blocks");

    // 🟣 Base & active color variables (you can define these globally or replace with HEX codes)
    const Base = Prime5;      
    const ActiveBg = Prime2; 
    const ActiveText =  Prime5;      
    const DefaultText = Prime;   

    // 🎨 Define background colors per button (can use Base for all)
    const buttonColors = {
      Details: Base,
      Profile: Base,
      Password: Base,
      Email: Base,
      Notifications: Base,
      Billing: Base
    };

    // 🟢 Function to show a specific block and style the active button
    function showBlock(activeId) {
      // Toggle visible block
      blocks.forEach(block => {
        block.style.display = block.id === `${activeId}-Block` ? "block" : "none";
      });

      // Toggle button styles
      buttons.forEach(btn => {
        if (btn.id === activeId) {
          btn.classList.add("active-setting");
          btn.style.backgroundColor = ActiveBg;
          btn.style.color = ActiveText;
        } else {
          btn.classList.remove("active-setting");
          btn.style.backgroundColor = buttonColors[btn.id] || Base;
          btn.style.color = DefaultText;
        }
      });
    }

    // 🟡 Attach click events
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        showBlock(button.id);
      });
    });

    // 🟢 Default view = Details
    showBlock("Details");
  }














  
  // ---------- Details-Block ----------//
  function renderDetialContent(){
    renderText(TeacherData.TeacherId, "TeacherId")
    renderText(TeacherData.role, "Teacher-Rol")
    function renderAccountstatus(statusValue) {
      const statusElement = document.getElementById("Status");

      if (!statusElement) {
        console.error("⚠️ Element with id 'Status' not found.");
        return;
      }

      if (statusValue === true) {
        statusElement.textContent = "Activo";
        statusElement.style.color = "green"; // Optional styling
      } else if (statusValue === false) {
        statusElement.textContent = "Desactivada";
        statusElement.style.color = "red"; // Optional styling
      } else {
        statusElement.textContent = "Desconocido";
        statusElement.style.color = "gray";
      }
    }
    function renderMembershipDate(createdAt) {
      const membershipElement = document.getElementById("MemberDuration");

      if (!membershipElement) {
        console.error("⚠️ Element with id 'MemberDuration' not found.");
        return;
      }

      // Convert Firestore Timestamp to JS Date
      let createdDate;
      if (createdAt && typeof createdAt.seconds === "number") {
        createdDate = new Date(createdAt.seconds * 1000 + createdAt.nanoseconds / 1e6);
      } else {
        createdDate = new Date(createdAt);
      }

      // Month names in Spanish
      const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];

      const month = monthNames[createdDate.getMonth()];
      const year = createdDate.getFullYear();

      membershipElement.textContent = `${month} ${year}`;
    }
    function GetTimestamp(){
      const Date = convertFirestoreTimestampToDate(TeacherData.createdAt)
      renderText(Date,"Reg-Date")
      renderMembershipDate(Date)
    }
    function lastLogin(){
      const Date = convertFirestoreTimestampToDate(TeacherData.lastLogin)
      renderText(Date,"lastLogin")

    }
    function RenderHzone(){
      renderText(TeacherData.timezone,"TTimezone")
    }




    GetTimestamp()
    renderAccountstatus(TeacherData.Uactive)
    lastLogin()
    RenderHzone()

  }
  // ---------- Image Preview Function ----------//
  function renderProfileContent(){
      function RenderProfileInfo(){
        renderTextById("TFN", TeacherData.fullName)
        renderTextById("TEmail", TeacherData.email)
        renderTextById("TelPhone",TeacherData?.Personal.telefono)
        renderTextById("TTimezone",TeacherData.timezone)
        renderTextById("Teacher-Bio",TeacherData.bio)
        renderTextById("TGender",TeacherData.Personal.sexo)
        renderTextById("TBirth",TeacherData.birthday)   
      }
    function renderProfileIcon() {
      const container = document.getElementById("Profile-Imgs")
      if (!container) {
        console.error("Element with ID 'profile-Icon' not found.");
        return;
      }

      if (!TeacherData?.profileImg) {
        container.innerHTML = `<i class="fa-solid fa-circle-user"></i>`;
      } else {
        container.innerHTML = `<img src="${TeacherData.profileImg}" alt="User Icon" width="50" height="50" style="border-radius: 50%;" />`;
        
      }
    }
    function SaveAndupdateProfileImg() {
      const fileInput = document.getElementById("Add-Profile-Img");
      const saveBtn = document.getElementById("Save-Profile-Img");

      if (!fileInput || !saveBtn) {
        console.warn("⚠️ No se encontraron los elementos de entrada o botón de guardar.");
        return;
      }

      saveBtn.addEventListener("click", async () => {
        const file = fileInput.files[0];
        if (!file) {
          alert("Por favor, selecciona una imagen antes de guardar.");
          return;
        }

        try {
          // 🔹 1. Obtener usuario actual
          const user = auth.currentUser;
          if (!user) throw new Error("Usuario no autenticado.");

          // 🔹 2. Subir imagen al almacenamiento (Firebase Storage)
          const filePath = `profileImages/${user.uid}-${file.name}`;
          const storageRef = ref(storage, filePath);
          await uploadBytes(storageRef, file);

          // 🔹 3. Obtener la URL de descarga
          const downloadURL = await getDownloadURL(storageRef);

          // 🔹 4. Actualizar documento del profesor en Firestore
          const teacherRef = doc(db, "CorsoSkillsTeacher", user.uid);
          await updateDoc(teacherRef, {
            profileImg: downloadURL,
          });

          // 🔹 5. Actualizar UI
          const imgElement = document.getElementById("Profile-Imgs");
          if (imgElement) imgElement.src = downloadURL;

          // 🔹 6. Guardar localmente (opcional)
          localStorage.setItem("profileImage", downloadURL);

          alert("✅ Imagen de perfil actualizada correctamente.");

        } catch (error) {
          console.error("❌ Error al guardar la imagen:", error);
          alert("Error al guardar la imagen. Inténtalo de nuevo.");
        }
      });
    }
    document.getElementById("Save-Profile-Img").addEventListener("click", async () => {
      const fileInput = document.getElementById("Add-Profile-Img");
      const file = fileInput.files[0];

      if (!file) {
        alert("⚠️ Por favor selecciona una imagen antes de guardar.");
        return;
      }

      const user = auth.currentUser;
      if (!user) {
        alert("Debes iniciar sesión para subir una imagen.");
        return;
      }

      try {
        // --- Create full path under BusinessUnits/CorsoSkills/Teachers/profileImages ---
        const extension = file.name.split(".").pop();

        const fileName = `profile.${extension}`;
        const imageRef = ref(
          storage,
          `BusinessUnits/CorsoSkills/Teachers/${user.uid}/${fileName}`
        );

        console.log("📤 Subiendo imagen...");
        const snapshot = await uploadBytes(imageRef, file);
        console.log("✅ Imagen subida:", snapshot.metadata.fullPath);

        // Get public download URL
        const downloadURL = await getDownloadURL(imageRef);
        console.log("🌐 URL pública:", downloadURL);

        // Reference to Firestore user document
        const userDocRef = doc(db, "Users", user.uid);

        // Check if document exists
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
          // ✅ Update existing document
          await updateDoc(userDocRef, {
            profileImage: downloadURL,
            updatedAt: serverTimestamp(),
          });
        } else {
          // 🆕 Create new document
          await setDoc(userDocRef, {
            uid: user.uid,
            email: user.email,
            profileImage: downloadURL,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        }

        alert("✅ Imagen guardada correctamente en Firebase Storage y Firestore.");
        showImagePreview(downloadURL);

      } catch (error) {
        console.error("❌ Error al subir la imagen:", error);
        alert("Error al subir la imagen: " + error.message);
      }
    });
    function showImagePreview(url) {
      let img = document.getElementById("Profile-Preview");
      if (!img) {
        img = document.createElement("img");
        img.id = "Profile-Preview";
        img.style.width = "150px";
        img.style.height = "150px";
        img.style.borderRadius = "50%";
        img.style.objectFit = "cover";
        img.style.marginTop = "10px";
        document.getElementById("PIB-Block").appendChild(img);
      }
      img.src = url;
    }
    function updateTeacherName() {
      const fullNameDisplay = document.getElementById("TFN");
      const fullNameInput = document.getElementById("Teacher-fullName");
      const saveBtn = document.getElementById("Save-Teacher-fullName");

      // --- Load teacher info into DOM ---
      async function loadTeacherInfo() {
        const teacherData = await getTeacherContent();
        if (teacherData) {
          fullNameDisplay.textContent = teacherData.fullName || "";
          fullNameInput.value = teacherData.fullName || "";
        }
      }

      // --- Save updated full name ---
      async function saveFullName() {
        const newFullName = fullNameInput.value.trim();
        if (!newFullName) return alert("El nombre no puede estar vacío.");

        try {
          const teacherRef = doc(db, "CorsoSkillsTeacher", UserUidInfo);
          await updateDoc(teacherRef, {
            fullName: newFullName,
            lastUpdated: serverTimestamp()
          });

          fullNameDisplay.textContent = newFullName;
          alert("Nombre actualizado correctamente ✅");
        } catch (error) {
          console.error("Error updating teacher info:", error);
          alert("Error al actualizar el nombre.");
        }
      }

      // --- Attach click event to the button ---
      saveBtn.addEventListener("click", saveFullName);

      // --- Load teacher info when function runs ---
      loadTeacherInfo();
    }

    async function updateTeacherPhone() {
      const phoneDisplay = document.getElementById("TelPhone"); // ✅ match HTML ID
      const phoneInput = document.getElementById("Teacher-Phone");
      const saveBtn = document.getElementById("Save-Teacher-Phone");

      // --- Load teacher phone into DOM ---
      async function loadTeacherPhone() {
        try {
          const teacherData = await getTeacherContent();
          if (teacherData) {
            phoneDisplay.textContent = teacherData.telefono || ""; // ✅ match Firestore field name
            phoneInput.value = teacherData.telefono || "";
          }
        } catch (error) {
          console.error("Error loading phone:", error);
        }
      }

      // --- Save updated phone number ---
      async function savePhone() {
        const newPhone = phoneInput.value.trim();
        if (!newPhone) return alert("⚠️ El número de teléfono no puede estar vacío.");

        try {
          const teacherRef = doc(db, "CorsoSkillsTeacher", UserUidInfo);
          await updateDoc(teacherRef, {
            telefono: newPhone,
            lastUpdated: serverTimestamp(),
          });

          phoneDisplay.textContent = newPhone;
          alert("✅ Número de teléfono actualizado correctamente");
        } catch (error) {
          console.error("Error updating phone:", error);
          alert("❌ Error al actualizar el número de teléfono.");
        }
      }

      // --- Attach event ---
      saveBtn.addEventListener("click", savePhone);

      // --- Load phone on init ---
      await loadTeacherPhone();
    }
    function updateTeacherTimezone() {
      const timezoneDisplay = document.getElementById("TTimezone");
      const timezoneSelect = document.getElementById("Teacher-Timezone");
      const saveBtn = document.getElementById("Save-Teacher-Timezone");

      // --- Load teacher timezone into DOM ---
      async function loadTeacherTimezone() {
        const teacherData = await getTeacherContent();
        if (teacherData) {
          timezoneDisplay.textContent = teacherData.timezone || "";
          timezoneSelect.value = teacherData.timezone || "";
        }
      }

      // --- Save updated timezone ---
      async function saveTimezone() {
        const newTimezone = timezoneSelect.value;
        if (!newTimezone) return alert("Por favor selecciona una zona horaria.");

        try {
          const teacherRef = doc(db, "CorsoSkillsTeacher", UserUidInfo);
          await updateDoc(teacherRef, {
            timezone: newTimezone,
            lastUpdated: serverTimestamp()
          });

          timezoneDisplay.textContent = newTimezone;
          alert("Zona horaria actualizada correctamente ✅");
        } catch (error) {
          console.error("Error updating timezone:", error);
          alert("Error al actualizar la zona horaria.");
        }
      }

      // --- Attach click event to the button ---
      saveBtn.addEventListener("click", saveTimezone);

      // --- Load teacher timezone when function runs ---
      loadTeacherTimezone();
    }
    function updateTeacherBio() {
      const bioDisplay = document.getElementById("Teacher-Bio");
      const bioTextarea = document.getElementById("Teacher-Bio-W");
      const saveBtn = document.getElementById("Save-Teacher-Bio");

      // --- Load teacher bio into DOM ---
      async function loadTeacherBio() {
        const teacherData = await getTeacherContent();
        if (teacherData) {
          bioDisplay.textContent = teacherData.bio || "";
          bioTextarea.value = teacherData.bio || "";
        }
      }

      // --- Save updated bio ---
      async function saveBio() {
        const newBio = bioTextarea.value.trim();
        if (!newBio) return alert("La biografía no puede estar vacía.");

        try {
          const teacherRef = doc(db, "CorsoSkillsTeacher", UserUidInfo);
          await updateDoc(teacherRef, {
            bio: newBio,
            lastUpdated: serverTimestamp()
          });

          bioDisplay.textContent = newBio;
          alert("Biografía actualizada correctamente ✅");
        } catch (error) {
          console.error("Error updating bio:", error);
          alert("Error al actualizar la biografía.");
        }
      }

      // --- Attach click event to the button ---
      saveBtn.addEventListener("click", saveBio);

      // --- Load teacher bio when function runs ---
      loadTeacherBio();
    }
    function updateTeacherBirthday() {
      const birthDisplay = document.getElementById("TBirth");
      const birthInput = document.getElementById("Teacher-Birthday");
      const saveBtn = document.getElementById("Save-Teacher-Birthday");

      // --- Load teacher info into DOM ---
      async function loadTeacherBirthday() {
        const teacherData = await getTeacherContent();
        if (teacherData && teacherData.birthday) {
          const birthday = teacherData.birthday.toDate ? teacherData.birthday.toDate() : new Date(teacherData.birthday);
          birthDisplay.textContent = birthday.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric"
          });
          birthInput.value = birthday.toISOString().split("T")[0];
        } else {
          birthDisplay.textContent = "No especificado";
        }
      }

      // --- Save updated birthday ---
      async function saveBirthday() {
        const newBirthday = birthInput.value;
        if (!newBirthday) return alert("Por favor, selecciona una fecha de nacimiento.");

        try {
          const teacherRef = doc(db, "CorsoSkillsTeacher", UserUidInfo);
          await updateDoc(teacherRef, {
            birthday: new Date(newBirthday),
            lastUpdated: serverTimestamp()
          });

          const formattedDate = new Date(newBirthday).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric"
          });

          birthDisplay.textContent = formattedDate;
          alert("Fecha de nacimiento actualizada correctamente ✅");
        } catch (error) {
          console.error("Error updating birthday:", error);
          alert("Error al actualizar la fecha de nacimiento.");
        }
      }

      // --- Attach click event to the button ---
      saveBtn.addEventListener("click", saveBirthday);

      // --- Load birthday when function runs ---
      loadTeacherBirthday();
    }
    function updateTeacherLinkedIn() {
      const linkedInDisplay = document.getElementById("LinkedIn");
      const linkedInInput = document.getElementById("Teacher-LinkedIn");
      const saveBtn = document.getElementById("Save-Teacher-LinkedIn");

      // --- Load teacher LinkedIn data ---
      async function loadTeacherLinkedIn() {
        const teacherData = await getTeacherContent();
        if (teacherData && teacherData.linkedIn) {
          linkedInDisplay.innerHTML = `<a href="${teacherData.linkedIn}" target="_blank">${teacherData.linkedIn}</a>`;
          linkedInInput.value = teacherData.linkedIn;
        } else {
          linkedInDisplay.textContent = "No especificado";
        }
      }

      // --- Save updated LinkedIn URL ---
      async function saveLinkedIn() {
        const newLinkedIn = linkedInInput.value.trim();
        if (!newLinkedIn) return alert("Por favor, ingresa tu perfil de LinkedIn.");
        if (!newLinkedIn.startsWith("https://")) {
          return alert("La URL debe comenzar con https://");
        }

        try {
          const teacherRef = doc(db, "CorsoSkillsTeacher", UserUidInfo);
          await updateDoc(teacherRef, {
            linkedIn: newLinkedIn,
            lastUpdated: serverTimestamp()
          });

          linkedInDisplay.innerHTML = `<a href="${newLinkedIn}" target="_blank">${newLinkedIn}</a>`;
          alert("Perfil de LinkedIn actualizado correctamente ✅");
        } catch (error) {
          console.error("Error updating LinkedIn:", error);
          alert("Error al actualizar el perfil de LinkedIn.");
        }
      }

      // --- Attach click event to save button ---
      saveBtn.addEventListener("click", saveLinkedIn);

      // --- Load data when function runs ---
      loadTeacherLinkedIn();
    }

    updateTeacherName()

    updateTeacherPhone();
    updateTeacherTimezone();
    updateTeacherBio();


    RenderProfileInfo()
    renderProfileIcon()
    SaveAndupdateProfileImg()
    updateTeacherBirthday() 
    updateTeacherLinkedIn()





  }
  

  function renderEmailCotent(){
    renderTextById("T-Current-Email", TeacherData.email)


  }

  function renderNotificationesContent(){
    function updateTeacherNotifications() {
        const saveBtn = document.getElementById("Save-Notifications");
        const notificationsBlock = document.getElementById("Notifications-Block");

        // --- Load teacher notifications & privacy settings ---
        async function loadTeacherNotifications() {
          const teacherData = await getTeacherContent();
          if (!teacherData) return;

          // Map checkbox labels to Firestore fields
          const prefsMapping = [
            "actualizacionesCursos",
            "nuevosEstudiantes",
            "avisosSistema",
            "promocionesNoticias",
            "mostrarPerfilPublico",
            "compartirActividad"
          ];

          const checkboxes = notificationsBlock.querySelectorAll("input[type=checkbox]");

          checkboxes.forEach((checkbox, i) => {
            if (teacherData.notifications && typeof teacherData.notifications[prefsMapping[i]] === "boolean") {
              checkbox.checked = teacherData.notifications[prefsMapping[i]];
            }
          });
        }

      // --- Save updated notification settings ---
      async function saveNotifications() {
        const checkboxes = notificationsBlock.querySelectorAll("input[type=checkbox]");

        // Map checkbox values to object
        const notificationsData = {
          actualizacionesCursos: checkboxes[0].checked,
          nuevosEstudiantes: checkboxes[1].checked,
          avisosSistema: checkboxes[2].checked,
          promocionesNoticias: checkboxes[3].checked,
          mostrarPerfilPublico: checkboxes[4].checked,
          compartirActividad: checkboxes[5].checked
        };

        try {
          const teacherRef = doc(db, "CorsoSkillsTeacher", UserUidInfo);
          await updateDoc(teacherRef, {
            notifications: notificationsData,
            lastUpdated: serverTimestamp()
          });

          alert("Preferencias guardadas correctamente ✅");
        } catch (error) {
          console.error("Error updating notifications:", error);
          alert("Error al guardar las preferencias.");
        }
      }

      // --- Attach click event ---
      saveBtn.addEventListener("click", saveNotifications);

      // --- Load data on function run ---
      loadTeacherNotifications();
    }
    updateTeacherNotifications()
  }

  function renderPaymentContent(){
    function updateTeacherPaymentInfo() {
      const fields = [
        { key: "fullName", input: "Teacher-fullName-Pagos", display: "PTFN", button: "Save-Teacher-fullName-Pagos" },
        { key: "email", input: "Teacher-email-Pagos", display: "PTEmail", button: "Save-Teacher-email-Pagos" },
        { key: "address", input: "Teacher-address-Pagos", display: "PTAddress", button: "Save-Teacher-address-Pagos" },
        { key: "phone", input: "Teacher-phone-Pagos", display: "PTPhone", button: "Save-Teacher-phone-Pagos" },
        { key: "idNumber", input: "Teacher-idNumber-Pagos", display: "PTIDNumber", button: "Save-Teacher-idNumber-Pagos" },
        { key: "idFile", input: "Teacher-idFile-Pagos", display: "PTIDFile", button: "Save-Teacher-idFile-Pagos", isFile: true },
        { key: "bankName", input: "Teacher-bankName-Pagos", display: "PTBankName", button: "Save-Teacher-bankName-Pagos" },
        { key: "accountHolder", input: "Teacher-accountHolder-Pagos", display: "PTAccountHolder", button: "Save-Teacher-accountHolder-Pagos" },
        { key: "accountNumber", input: "Teacher-accountNumber-Pagos", display: "PTAccountNumber", button: "Save-Teacher-accountNumber-Pagos" },
        { key: "CURP", input: "Teacher-CURP-Pagos", display: "PTCURP", button: "Save-Teacher-CURP-Pagos" },
        { key: "RFC", input: "Teacher-RFC-Pagos", display: "PTRFC", button: "Save-Teacher-RFC-Pagos" },
        { key: "invoice", input: "Teacher-invoice-Pagos", display: "PTInvoice", button: "Save-Teacher-invoice-Pagos", isFile: true }
      ];

      // --- Load existing payment info from Firestore ---
      async function loadTeacherPaymentData() {
        try {
          const teacherRef = doc(db, "CorsoSkillsTeacher", UserUidInfo);
          const teacherSnap = await getDoc(teacherRef);
          if (!teacherSnap.exists()) return;

          const data = teacherSnap.data().PaymentInfo || {};

          fields.forEach(({ key, display, input }) => {
            const displayEl = document.getElementById(display);
            const inputEl = document.getElementById(input);

            if (key === "idFile" || key === "invoice") {
              if (data[key]) {
                displayEl.innerHTML = `<a href="${data[key]}" target="_blank">Ver archivo</a>`;
              } else {
                displayEl.textContent = "";
              }
            } else {
              displayEl.textContent = data[key] || "";
              if (inputEl) inputEl.value = data[key] || "";
            }
          });
        } catch (error) {
          console.error("Error loading teacher payment data:", error);
        }
      }

      // --- Save a single field to Firestore inside PaymentInfo ---
      async function saveField({ key, input, display, isFile = false }) {
        try {
          const teacherRef = doc(db, "CorsoSkillsTeacher", UserUidInfo);
          const teacherSnap = await getDoc(teacherRef);
          const existingData = teacherSnap.exists() ? teacherSnap.data().PaymentInfo || {} : {};

          let updatedValue = "";

          if (isFile) {
            const fileInput = document.getElementById(input);
            const file = fileInput.files[0];
            if (!file) return alert("Por favor, selecciona un archivo.");

            // 📂 Upload file inside PaymentInfo folder
            const storageRef = ref(storage, `TeacherDocuments/${UserUidInfo}/PaymentInfo/${file.name}`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            updatedValue = downloadURL;

            document.getElementById(display).innerHTML = `<a href="${downloadURL}" target="_blank">Ver archivo</a>`;
          } else {
            updatedValue = document.getElementById(input).value.trim();
            if (!updatedValue) return alert("El campo no puede estar vacío.");
            document.getElementById(display).textContent = updatedValue;
          }

          // 🧾 Update nested PaymentInfo object
          const updatedPaymentInfo = { ...existingData, [key]: updatedValue };

          await updateDoc(teacherRef, {
            PaymentInfo: updatedPaymentInfo,
            lastUpdated: serverTimestamp()
          });

          alert("Información de pago actualizada correctamente ✅");
        } catch (error) {
          console.error(`Error updating ${key}:`, error);
          alert("Error al actualizar la información de pago.");
        }
      }

      // --- Add listeners for all save buttons ---
      fields.forEach((field) => {
        const btn = document.getElementById(field.button);
        if (btn) btn.addEventListener("click", () => saveField(field));
      });

      // --- Load payment data when initialized ---
      loadTeacherPaymentData();
    }
    updateTeacherPaymentInfo()

  }






  
  NavBtnsSet()
  renderWelcome();
  renderId()
  renderAlertIcons()
  renderUserIcon()

  renderDetialContent()
  renderProfileContent()
  renderEmailCotent()
  renderNotificationesContent()
  renderPaymentContent()
}

fetchAllContent();













document.addEventListener("DOMContentLoaded", () => {
  const editBtn = document.getElementById("DD");
  const timezoneInput = document.getElementById("Teacher-Timezone");
  const saveBtn =  document.getElementById("Save-Teacher-Timezone")

  editBtn.addEventListener("click", () => {
    // Toggle visibility
    if (timezoneInput.style.display === "none" || timezoneInput.style.display === "") {
      timezoneInput.style.display = "block";
      saveBtn.style.display = "block";
    } else {
      timezoneInput.style.display = "none";
      saveBtn.style.display = "none";
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const editBtn = document.getElementById("FN");
  const PIB = document.getElementById("PIB-Block");
  const NIB = document.getElementById("Teacher-fullName");
  const saveBtn =  document.getElementById("Save-Teacher-fullName")

  const TP = document.getElementById("Teacher-Phone");
  const saveBtnP =  document.getElementById("Save-Teacher-Phone")

  const TB = document.getElementById("Teacher-Birthday");
  const saveBtnB =  document.getElementById("Save-Teacher-Birthday")

  const TLI = document.getElementById("Teacher-LinkedIn");
  const saveBtnLI =  document.getElementById("Save-Teacher-LinkedIn")

  const TBW = document.getElementById("Teacher-Bio-W");
  const saveBtnTB =  document.getElementById("Save-Teacher-Bio")

  const SC = document.getElementById("Teacher-Bio-W");
  const saveBtnSP =  document.getElementById("Save-Password")

  editBtn.addEventListener("click", () => {
    // Toggle visibility
    if (PIB.style.display === "none" || PIB.style.display === "") {
      PIB.style.display = "flex";
      NIB.style.display = "flex";
      saveBtn.style.display = "flex";

      TP.style.display = "flex";
      saveBtnP.style.display = "flex";

      TB.style.display = "flex";
      saveBtnB.style.display = "flex";

      TLI.style.display = "flex";
      saveBtnLI.style.display = "flex";

      TBW.style.display = "flex";
      saveBtnTB.style.display = "flex";     

    } else {
      PIB.style.display = "none";
      NIB.style.display = "none";
      saveBtn.style.display = "none";

      TB.style.display = "none";
      saveBtnB.style.display = "none";

      TP.style.display = "none";
      saveBtnP.style.display = "none";

      TLI.style.display = "none";
      saveBtnLI.style.display = "none";      

      TBW.style.display = "none";     
      saveBtnTB.style.display = "none";     

    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const editBtn = document.getElementById("PS");
  const timezoneInput = document.getElementById("New-Password-Block")
  const CPB =  document.getElementById("Confirm-Password-Block")
  const saveBtn =  document.getElementById("Save-Password")

  editBtn.addEventListener("click", () => {
    // Toggle visibility
    if (timezoneInput.style.display === "none" || timezoneInput.style.display === "") {
      timezoneInput.style.display = "flex";
      CPB.style.display = "flex";
      saveBtn.style.display = "flex";

    } else {
      timezoneInput.style.display = "none";
      CPB.style.display = "none";
      saveBtn.style.display = "none";
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const editBtn = document.getElementById("CE")
  const timezoneInput = document.getElementById("Email-Input-blocks")


  editBtn.addEventListener("click", () => {
    // Toggle visibility
    if (timezoneInput.style.display === "none" || timezoneInput.style.display === "") {
      timezoneInput.style.display = "block";
    } else {
      timezoneInput.style.display = "none";
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const editBtn = document.getElementById("NP")
  const timezoneInput = document.getElementById("Save-Notifications")


  editBtn.addEventListener("click", () => {
    // Toggle visibility
    if (timezoneInput.style.display === "none" || timezoneInput.style.display === "") {
      timezoneInput.style.display = "block";
    } else {
      timezoneInput.style.display = "none";
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const editBillingBtn = document.getElementById("PF"); // 🖊️ Pencil icon
  const hiddenInputs = document.querySelectorAll("#Billing-Block .Hidden-Input");

  let editMode = false;

  editBillingBtn.addEventListener("click", () => {
    editMode = !editMode;

    hiddenInputs.forEach(el => {
      el.style.display = editMode ? "inline-block" : "none";
    });

    // Optional: toggle icon color or rotation for visual feedback
    editBillingBtn.classList.toggle("active", editMode);
  });
});





// --- 📨 EMAIL UPDATE HANDLER ---
document.getElementById("Save-New-Email").addEventListener("click", async () => {
  const user = auth.currentUser;

  if (!user) {
    alert("Debes iniciar sesión para cambiar tu correo.");
    return;
  }

  const currentEmail = user.email;
  const newEmail = document.getElementById("New-Email").value.trim();
  const confirmEmail = document.getElementById("Confirm-Email").value.trim();

  if (!newEmail || !confirmEmail) return alert("Por favor completa todos los campos.");
  if (newEmail !== confirmEmail) return alert("Los correos no coinciden.");

  try {
    const password = prompt("Por seguridad, introduce tu contraseña actual:");
    if (!password) return alert("Debes ingresar tu contraseña para continuar.");

    const credential = EmailAuthProvider.credential(currentEmail, password);
    await reauthenticateWithCredential(user, credential);
    console.log("✅ Reautenticación exitosa");

    // ✅ Step 1: Send verification link to the new email
    await verifyBeforeUpdateEmail(user, newEmail);
    alert("📩 Se ha enviado un enlace de verificación a tu nuevo correo. Debes confirmarlo para finalizar el cambio.");

    // ✅ Step 2: Optionally update Firestore (pre-update)
    const userDocRef = doc(db, "Teachers", user.uid);
    await updateDoc(userDocRef, {
      pendingNewEmail: newEmail, // store it temporarily
      updatedAt: serverTimestamp()
    });

    console.log("⚙️ Esperando confirmación del nuevo correo...");

  } catch (error) {
    console.error("❌ Error al actualizar el correo:", error);
    alert("Error: " + error.message);
  }
});

// --- Auto-fill current email when logged in ---
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("T-Current-Email").textContent = user.email;
  }
});


document.getElementById("Save-Password").addEventListener("click", async () => {
  const user = auth.currentUser;

  if (!user) {
    alert("Debes iniciar sesión para cambiar tu contraseña.");
    return;
  }

  // Get field values
  const currentPassword = document.getElementById("Current-Password").value.trim();
  const newPassword = document.getElementById("New-Password").value.trim();
  const confirmPassword = document.getElementById("Confirm-Password").value.trim();

  // --- Validation ---
  if (!currentPassword || !newPassword || !confirmPassword) {
    alert("Por favor completa todos los campos.");
    return;
  }

  if (newPassword.length < 8) {
    alert("La nueva contraseña debe tener al menos 8 caracteres.");
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  try {
    // --- Step 1️⃣: Reauthenticate user ---
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    console.log("✅ Reautenticación exitosa");

    // --- Step 2️⃣: Update password ---
    await updatePassword(user, newPassword);
    console.log("✅ Contraseña actualizada exitosamente");

    alert("✅ Tu contraseña fue actualizada correctamente. Por seguridad, inicia sesión nuevamente.");

    // Optional: force logout after password change
    await signOut(auth);
    window.location.href = "index4.1.html";

  } catch (error) {
    console.error("❌ Error al actualizar la contraseña:", error);
    alert("Error: " + error.message);
  }
});






document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const toggle = document.getElementById("menuToggle");
  const closeBtn = document.getElementById("Mobile-closeBtn");

  const openSidebar = () => {
    sidebar.classList.add("active");
    overlay.classList.add("active");
  };

  const closeSidebar = () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  };

  toggle.addEventListener("click", openSidebar);
  closeBtn.addEventListener("click", closeSidebar);
  overlay.addEventListener("click", closeSidebar);
});
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
  menuToggle.addEventListener("click", toggleMobileSidebar);

  // Initial state
  hideSidebarText();
});





  document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const section = params.get("section");

    if (section === "Billing") {
      // Get all nav buttons and config blocks
      const buttons = document.querySelectorAll(".Setting-Btns");
      const blocks = document.querySelectorAll(".Config-Blocks");

      // Hide all blocks
      blocks.forEach(block => block.style.display = "none");

      // Remove active class from all buttons
      buttons.forEach(btn => btn.classList.remove("active"));

      // Activate the Billing section
      const billingBtn = document.getElementById("Billing");
      const billingBlock = document.getElementById("Billing-Block");

      if (billingBtn && billingBlock) {
        billingBlock.style.display = "block";
        billingBtn.classList.add("active");
      }
    }
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




