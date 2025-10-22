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
  console.log(data.BuLogos.Icons[0])
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
  //  setallBackgroundColor(".Main-Blocks", Prime5)
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




  function Linecolors(){
    setallBackgroundColor("#Line", Prime3)
  }
  function summarycolors(){
    setTextColors(".summary-card", Prime5)
    setallBackgroundColor(".summary-card", Base)
    setallBackgroundColor(".main", Prime5)    
  }

  function setbankInfoCardColors() {
    const style = document.createElement("style");
    style.textContent = `
      .Payment-Blocks {
        background-color: ${Prime5};
      }
      .Tittle-Block h2{
        color: ${Base};
      }
      #bank-info-card a{
        color:${Base};
      }
      #bank-info-card span{
        color: ${Prime3};
      }
      #UpdateBankInfo{
        color: ${Prime5};
        background-color: ${Prime};
      }
      #salary-card .total {
        border-top: 2px solid ${Prime2};
      }
      #salary-card button {
        background-color: ${Prime2};
        color: white;
      }
      #salary-card button:hover {
        background-color:${Prime2};
      }
    `;
    document.head.appendChild(style);
  }
  function setIngresosColors() {
    const style = document.createElement("style");
    style.textContent = `
      .Payment-Blocks {
        background-color: ${Prime5};
      }
      .Alerts-Blocks{
        color: ${Prime5};
        background-color: ${Base};
      }
      .BD-Tittle{
        color: #3178fd;
        font-weight: bold;
        text-align: center;
      }
      .Total{
        color: ${Base};
      }  
      .Total-Sub{
        color: ${Prime3};
      }


    `;
    document.head.appendChild(style);
  }
  function setSupportColors() {
    const style = document.createElement("style");
    style.textContent = `
      .Payment-Blocks {
        background-color: ${Prime5};
      }
      .SS-Block p{
        color: ${Prime};
      }
      .SS-Block a{
        color: ${Prime1};
      }
      .SS-Block button{
        color: ${Prime5};
        background-color: ${Prime3};
      }
    `;
    document.head.appendChild(style);
  }
  






  setGlobalFont(data.Font)
  setbodyColors()
  SetUserInfoColors()
  SetMainColors()
  sidebarcolors()
  Linecolors()
  summarycolors()
  setbankInfoCardColors()
  setIngresosColors()




  setSupportColors()
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







  function paymentBtnfunc() {
    const buttons = document.querySelectorAll(".Payment-Btns");
    const blocks = document.querySelectorAll(".Payment-Blocks");

    // 🗺️ Map button IDs to section IDs
    const sectionMap = {
      "bank-info-Btn": "bank-info-card",
      "Salary-Btn": "chart-section",
      "History-Btn": "table-container",
      "Support-Btn": "support-section",
      "Download-Btn": "Download-section"
    };

    // 🎨 Colors
    const activeColor = Prime; // Active background
    const textColor = Prime5;   // Active text
    const inactiveColor = "transparent";
    const inactiveTextColor = Prime; // Optional

    // 🟢 Function to activate a specific section/button
    function activateSection(buttonId) {
      const targetId = sectionMap[buttonId];

      // Hide all sections
      blocks.forEach(block => block.classList.remove("show"));

      // Reset all buttons
      buttons.forEach(btn => {
        btn.style.backgroundColor = inactiveColor;
        btn.style.color = inactiveTextColor;
        btn.classList.remove("active");
      });

      // Show the target section
      if (targetId) {
        document.getElementById(targetId)?.classList.add("show");
      }

      // Highlight the active button
      const activeBtn = document.getElementById(buttonId);
      if (activeBtn) {
        activeBtn.classList.add("active");
        activeBtn.style.backgroundColor = activeColor;
        activeBtn.style.color = textColor;
      }
    }

    // 🔘 Attach click events
    buttons.forEach(btn => {
      btn.addEventListener("click", () => activateSection(btn.id));
    });

    // 🟣 Default active = bank-info-Btn
    activateSection("bank-info-Btn");
  }
  function renderBankInfo(){
    renderText(TeacherData.PaymentInfo.bankName, "BankName")
    renderText(TeacherData.PaymentInfo.accountHolder, "AccountHolder")
    renderText(TeacherData.PaymentInfo.accountNumber, "AccountNumber")






  }



function createPaymentHistoryTable() {
  const container = document.getElementById("PaymentHistoryContainer");
  container.innerHTML = "";

  const table = document.createElement("table");
  table.classList.add("payment-history-table");

  table.innerHTML = `
    <thead>
      <tr>
        <th>Fecha</th>
        <th>Curso</th>
        <th>Tipo</th>
        <th>Monto</th>
        <th>Método</th>
        <th>Estado</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>05/05/2025</td>
        <td>Yoga Intermedio</td>
        <td>Clases</td>
        <td>$300.00</td>
        <td>Transferencia</td>
        <td class="paid">Pagado</td>
        <td>
          <button class="details-btn">Ver Detalle</button>
          <button class="download-btn"><i class="fas fa-file-invoice"></i> Descargar Recibo</button>
        </td>
      </tr>
      <tr>
        <td>12/05/2025</td>
        <td>Pilates Básico</td>
        <td>Clases</td>
        <td>$250.00</td>
        <td>Transferencia</td>
        <td class="pending">Pendiente</td>
        <td>
          <button class="details-btn">Ver Detalle</button>
          <button class="download-btn"><i class="fas fa-file-invoice"></i> Descargar Recibo</button>
        </td>
      </tr>
      <tr>
        <td>20/05/2025</td>
        <td>Stretch Avanzado</td>
        <td>Bonificación</td>
        <td>$100.00</td>
        <td>Transferencia</td>
        <td class="paid">Pagado</td>
        <td>
          <button class="details-btn">Ver Detalle</button>
          <button class="download-btn"><i class="fas fa-file-invoice"></i> Descargar Recibo</button>
        </td>
      </tr>
    </tbody>
  `;

  container.appendChild(table);
}

  createPaymentHistoryTable()










  document.getElementById("UpdateBankInfo").addEventListener("click", () => {
    window.location.href = "/index11.6.html?section=Billing";
  });










  renderWelcome()
  renderId()
  renderUserIcon()
  renderAlertIcons() 
  paymentBtnfunc()

  renderBankInfo()






  


}

fetchAllContent();






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

function setupBreakDownToggle() {
    const monthlyBtn = document.getElementById("Ingresos Mensuales");
    const fortnightBtn = document.getElementById("Ingresos Quincenal");

    const monthlyBreak = document.getElementById("Break-Down");
    const fortnightBreak = document.getElementById("Break-Down-Quincenal");

    // 🔹 Helper: hide all breakdowns first
    function hideAllBreakdowns() {
      monthlyBreak.style.display = "none";
      fortnightBreak.style.display = "none";
    }

    // 🔹 Click handlers
    monthlyBtn.addEventListener("click", () => {
      hideAllBreakdowns();
      monthlyBreak.style.display = "flex";
    });

    fortnightBtn.addEventListener("click", () => {
      hideAllBreakdowns();
      fortnightBreak.style.display = "flex";
    });

    // 🔹 Start with both hidden
    hideAllBreakdowns();
}
function setupEmailCopy() {
  const emailElement = document.getElementById("SupportEmail");
  const notice = document.getElementById("CopyNotice");

  emailElement.addEventListener("click", async () => {
    const email = "soporte@corsoskills.com";
      try {
      await navigator.clipboard.writeText(email);

      // ✅ Show temporary "copied" message
      notice.style.display = "inline";
      setTimeout(() => {
        notice.style.display = "none";
      }, 1500);
    } catch (err) {
      console.error("Error al copiar el correo:", err);
      alert("No se pudo copiar el correo. Intenta manualmente.");
    }
  });
}





document.addEventListener("DOMContentLoaded", setupBreakDownToggle);
// 🟢 Initialize when page loads
document.addEventListener("DOMContentLoaded", setupEmailCopy);










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

 


