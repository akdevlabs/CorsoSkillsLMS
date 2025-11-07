// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";

import { 
  getFirestore, doc, getDoc, getDocs, collection, addDoc, setDoc, 
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




  function renderWelcome() {
    if (AdminData?.fullName) {
      renderText("Hola, " + AdminData.fullName, "User-Name");
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



  function renderCardInfo(){
    function checkActiveStudents(students) {
      if (!Array.isArray(students)) {
        console.error("❌ Invalid students data");
        return;
      }

      const activeStudents = students.filter(student => student.Uactive === true);
      const inactiveStudents = students.filter(student => !student.Uactive);

      console.log(`✅ Active Students: ${activeStudents.length}`);
      console.log(`🛑 Inactive Students: ${inactiveStudents.length}`);

      // Update dashboard count
      renderText(activeStudents.length, "TotalStudents");

      // --- Render both active and inactive students ---
      const studentsBlock = document.getElementById("Students-Block");
      if (!studentsBlock) return;
      studentsBlock.innerHTML = ""; // clear previous

      // Helper: create table
      function createTable(title, studentsArray, color) {
        const section = document.createElement("div");
        section.style.marginBottom = "30px";

        const header = document.createElement("h3");
        header.textContent = title;
        header.style.color = color;
        header.style.marginBottom = "10px";
        section.appendChild(header);

        if (studentsArray.length === 0) {
          section.innerHTML += `<p>No hay estudiantes en esta categoría.</p>`;
          return section;
        }

        const table = document.createElement("table");
        table.innerHTML = `
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>ID</th>
              <th>Activo</th>
            </tr>
          </thead>
          <tbody>
            ${studentsArray
              .map(
                s => `
                <tr>
                  <td>${s.fullName || "N/A"}</td>
                  <td>${s.email || "N/A"}</td>
                  <td>${s.id || "—"}</td>
                  <td>${s.Uactive ? "✅" : "❌"}</td>
                </tr>
              `
              )
              .join("")}
          </tbody>
        `;

        // Minimal styling
        table.style.width = "100%";
        table.style.borderCollapse = "collapse";
        table.querySelectorAll("th, td").forEach(cell => {
          cell.style.border = "1px solid #ccc";
          cell.style.padding = "8px";
          cell.style.textAlign = "left";
        });
        table.querySelectorAll("th").forEach(th => {
          th.style.background = "#f4f4f4";
        });

        section.appendChild(table);
        return section;
      }

      // Append both sections
      studentsBlock.appendChild(
        createTable("✅ Estudiantes Activos", activeStudents, "green")
      );
      studentsBlock.appendChild(
        createTable("🛑 Estudiantes Inactivos", inactiveStudents, "red")
      );

      return { activeStudents, inactiveStudents };
    }
    function checkActiveTeachers(teachers) {
      if (!Array.isArray(teachers)) {
        console.error("❌ Invalid teachers data");
        return;
      }

      const activeTeachers = teachers.filter(t => t.Uactive === true);
      const inactiveTeachers = teachers.filter(t => !t.Uactive);

      console.log(`✅ Active Teachers: ${activeTeachers.length}`);
      console.log(`🛑 Inactive Teachers: ${inactiveTeachers.length}`);

      // Update dashboard count
      renderText(activeTeachers.length, "TotalTeachers");

      // --- Render both active and inactive teachers ---
      const teacherBlock = document.getElementById("Teacher-Block");
      if (!teacherBlock) return;
      teacherBlock.innerHTML = ""; // clear previous content

      // Helper: create table for each group
      function createTable(title, data, color) {
        const section = document.createElement("div");
        section.style.marginBottom = "30px";

        const header = document.createElement("h3");
        header.textContent = title;
        header.style.color = color;
        header.style.marginBottom = "10px";
        section.appendChild(header);

        if (data.length === 0) {
          section.innerHTML += `<p>No hay docentes en esta categoría.</p>`;
          return section;
        }

        const table = document.createElement("table");
        table.innerHTML = `
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>ID</th>
              <th>Activo</th>
            </tr>
          </thead>
          <tbody>
            ${data
              .map(
                t => `
                <tr>
                  <td>${t.fullName || "N/A"}</td>
                  <td>${t.email || "N/A"}</td>
                  <td>${t.id || "—"}</td>
                  <td>${t.Uactive ? "✅" : "❌"}</td>
                </tr>
              `
              )
              .join("")}
          </tbody>
        `;

        // Basic inline table styles
        table.style.width = "100%";
        table.style.borderCollapse = "collapse";
        table.querySelectorAll("th, td").forEach(cell => {
          cell.style.border = "1px solid #ccc";
          cell.style.padding = "8px";
          cell.style.textAlign = "left";
        });
        table.querySelectorAll("th").forEach(th => {
          th.style.background = "#f4f4f4";
        });

        section.appendChild(table);
        return section;
      }

      // Append both tables
      teacherBlock.appendChild(
        createTable("✅ Docentes Activos", activeTeachers, "green")
      );
      teacherBlock.appendChild(
        createTable("🛑 Docentes Inactivos", inactiveTeachers, "red")
      );

      return { activeTeachers, inactiveTeachers };
    }



    function renderTotalActive(activeStudentsCount, activeTeachersCount) {
      const totalActive = (activeStudentsCount || 0) + (activeTeachersCount || 0);
      console.log(`📊 Total Active (Students + Teachers): ${totalActive}`);
      renderText(totalActive, "TotalAll");
    }


    function checkActiveAffiliates(affiliates) {
      if (!Array.isArray(affiliates)) {
        console.error("❌ Invalid affiliates data");
        return;
      }

      const activeAffiliates = affiliates.filter(a => a.Uactive === true);
      const inactiveAffiliates = affiliates.filter(a => !a.Uactive);

      console.log(`✅ Active Affiliates: ${activeAffiliates.length}`);
      console.log(`🛑 Inactive Affiliates: ${inactiveAffiliates.length}`);

      // Update total count in dashboard
      renderText(activeAffiliates.length, "Totalaffiliates");

      // --- Render active and inactive affiliates ---
      const affiliatesBlock = document.getElementById("Affiliates-Block");
      if (!affiliatesBlock) return;
      affiliatesBlock.innerHTML = ""; // clear previous render

      // Helper function to build each table
      function createTable(title, data, color) {
        const section = document.createElement("div");
        section.style.marginBottom = "30px";

        const header = document.createElement("h3");
        header.textContent = title;
        header.style.color = color;
        header.style.marginBottom = "10px";
        section.appendChild(header);

        if (data.length === 0) {
          section.innerHTML += `<p>No hay afiliados en esta categoría.</p>`;
          return section;
        }

        const table = document.createElement("table");
        table.innerHTML = `
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>ID</th>
              <th>Activo</th>
            </tr>
          </thead>
          <tbody>
            ${data
              .map(
                a => `
                <tr>
                  <td>${a.fullName || "N/A"}</td>
                  <td>${a.email || "N/A"}</td>
                  <td>${a.id || "—"}</td>
                  <td>${a.Uactive ? "✅" : "❌"}</td>
                </tr>
              `
              )
              .join("")}
          </tbody>
        `;

        // Inline table styles (same as others)
        table.style.width = "100%";
        table.style.borderCollapse = "collapse";
        table.querySelectorAll("th, td").forEach(cell => {
          cell.style.border = "1px solid #ccc";
          cell.style.padding = "8px";
          cell.style.textAlign = "left";
        });
        table.querySelectorAll("th").forEach(th => {
          th.style.background = "#f4f4f4";
        });

        section.appendChild(table);
        return section;
      }

      // Append both tables
      affiliatesBlock.appendChild(
        createTable("✅ Afiliados Activos", activeAffiliates, "green")
      );
      affiliatesBlock.appendChild(
        createTable("🛑 Afiliados Inactivos", inactiveAffiliates, "red")
      );

      return { activeAffiliates, inactiveAffiliates };
    }

    function checkActiveCourses(coursesData) {
      if (!coursesData || typeof coursesData !== "object") {
        console.error("❌ Invalid courses data");
        return;
      }

      let totalActiveCourses = 0;

      for (const category of Object.values(coursesData)) {
        for (const levelData of Object.values(category)) {
          // Count only if the level is an object with data (not an empty string)
          if (levelData && typeof levelData === "object" && Object.keys(levelData).length > 0) {
            totalActiveCourses++;
          }
        }
      }

      console.log(`🎓 Total Active Courses: ${totalActiveCourses}`);
      renderText(totalActiveCourses, "TotalCourse");

      return totalActiveCourses;
    }

    


    const { activeStudents, inactiveStudents } = checkActiveStudents(StudentsData);
    const { activeTeachers, inactiveTeachers } = checkActiveTeachers(TeachersData);
    renderTotalActive(activeStudents.length, activeTeachers.length);
    const { activeAffiliates, inactiveAffiliates } = checkActiveAffiliates(AffiliatesData);
    //renderText(MessagesData?.length, "TotalMensajes")


    const Courses = BusinessData.Courses;
    const totalActiveCourses = checkActiveCourses(Courses);


    console.log(Courses)


    console.log("Students:", StudentsData?.length || 0, "students loaded");
    //console.log("Teachers:", TeachersData?.length || 0, "teachers loaded");
    //console.log("Affiliates:", AffiliatesData?.length || 0, "affiliates loaded");
    //console.log("Messages:", MessagesData?.length || 0, "messages loaded");
    //console.log("Website:", WebsiteData?.length || 0, "website docs loaded");
    //console.groupEnd();



    




  }






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
      createImageInDiv("AdminProfilePicPreview", AdminData.Profile, "Placeholder Image", "sampleImg", "img-style");
      renderText(AdminData.fullName, "Admin-Name")
      renderText(AdminData.email, "Admin-Email")
      renderText(AdminData.Phone, "Admin-Phone")
      renderText(AdminData.Position, "Admin-Position")
      renderText(AdminData.Timezone, "Admin-Timezonen")
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
            
              Profile:  downloadURL
              
            
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
              Phone: phoneValue
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
              Position: positionValue
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
              Timezone: timezoneValue
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
   // ToggleColorInput("Edit-Btn-AdminEmail", "AdminEmail")
   // ToggleColorInput("Edit-Btn-AdminPosition", "AdminPosition")


    function remderAdimnProfile(){
      renderText(AdminData.AdminId, "AdminUserId")
      renderText(AdminData.email, "Admin-Passwordn")
      renderText(AdminData.Phone, "RAdmin-Passwordn")
      renderText(AdminData.Position, "Admin-Position")

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
            
              Profile:  downloadURL
              
            
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
              Phone: phoneValue
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
              Position: positionValue
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
              Timezone: timezoneValue
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

    remderAdimnProfile()
  }
  function RenderNotificacionesInfo(){
    ToggleColorInput("Edit-Btn-NewUser", "NotifEmailNewUser")
    ToggleColorInput("Edit-Btn-NewCourse", "NotifEmailNewCourse")
    ToggleColorInput("Edit-Btn-NewEnrollment", "NotifEmailEnrollment")
    ToggleColorInput("Edit-Btn-Certificate", "NotifEmailCertificate")
    ToggleColorInput("Edit-Btn-AppMessages", "NotifAppMessages")
    ToggleColorInput("Edit-Btn-PushReminders", "NotifPushReminders")
 
    function SaveAllNotifications() {
      const saveBtnNotifications = document.getElementById("Notifications");
      if (!saveBtnNotifications) {
        console.error("❌ No se encontró el botón con id='Notifications'.");
        return;
      }

      saveBtnNotifications.addEventListener("click", async () => {
        try {
          // 🔹 Fuerza todas las notificaciones a true por defecto
          const notifData = {
            NotifEmailNewUser: true,
            NotifEmailNewCourse: true,
            NotifEmailEnrollment: true,
            NotifEmailCertificate: true,
            NotifAppMessages: true,
            NotifPushReminders: true,
          };

          // 🔹 Guarda en Firestore
          const docRef = doc(db, "CorsoSkillsAdmin", UserUidInfo);
          await setDoc(
            docRef,
            {
              Notifications: notifData,
            },
            { merge: true }
          );

          console.log("✅ Todas las preferencias de notificación se guardaron como TRUE.");
          alert("✅ Todas las notificaciones activadas por defecto y guardadas correctamente.");
        } catch (error) {
          console.error("❌ Error al guardar las preferencias de notificación:", error);
          alert("❌ Hubo un error al guardar las preferencias de notificación.");
        }
      });
    }
    SaveAllNotifications()
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




  renderSettingInfo()
  RenderPersonalInfo()
  RenderSecurityInfo()
  RenderNotificacionesInfo()
  RenderBillingInfo()
















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