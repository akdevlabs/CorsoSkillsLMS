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
      /* Users Section */
      .users {
        background: ${Prime5};

      }
      .users-header h2 {
        color: ${Base};
      }
      .users-header p {
        color: ${Prime};
      }
      .btn-gray {
        background: ${Base};
        color: ${Prime5};
      }
      .btn-gray:hover {
        background: ${Prime3};
      }
      .btn-green {
        background: ${Base};
        color: ${Prime5};
      }
      .btn-green:hover {
        background: ${Prime3};
      }
      .filters select,
      .filters input {
        border: 1px solid ${Base};
      }
      thead {
        background: ${Prime4};
      }
      th, td {
        color: ${Prime};
      }
      .user-email {
        color: ${Prime3};
      }
      .status {
        color: #16a34a;
      }
      .actions-cell i {
        color: ${Prime3};
      }
      .actions-cell i:hover.fa-eye { 
        color:${Prime2}; 
      }
      .actions-cell i:hover.fa-pen-to-square { 
        color: ${Prime2}; 
      }
      .actions-cell i:hover.fa-trash-can { 
        color: ${Prime2}; 
      }
      .pages button {
        border: 1px solid ${Base};
        background: ${Prime5};
      }
      .pages button.active {
        background: ${Base};
        color: ${Prime5};
        border-color:${Prime3};
      }
      

    `;
    document.head.appendChild(style);
  }

  SetMainColors()
  setSidebarColors()
  setBodyColors()

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
  console.log("Admin:", AdminData);
  console.log("Business:", BusinessData);
  console.log("Students:", StudentsData);
  console.log("Teachers:", TeachersData);
  console.log("Classrooms:", ClassroomsData);
  console.log("Affiliates:", AffiliatesData);
  console.log("Messages:", MessagesData);
  console.log("Website:", WebsiteData);

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
  function renderText(text, elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = text;
    } else {
      console.error(`Element with ID "${elementId}" not found.`);
    }
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


function renderUsersTable(AdminData = null, TeachersData = [], StudentsData = [], selectedType = "Todos los Usuarios") {
  const tbody = document.getElementById("usersTableBody");
  tbody.innerHTML = "";

  let users = [];

  // 🔹 Armar lista de usuarios
  if (selectedType === "Administrador" || selectedType === "Todos los Usuarios") {
    if (AdminData) {
      users.push({
        id: AdminData.AdminId || AdminData.id || "N/A",
        fullName: AdminData?.Personal?.FullName || "Administrador",
        email: AdminData.email || "Sin correo",
        phone: AdminData?.Personal?.Phone || "Sin teléfono",
        sexo: AdminData?.Personal?.Sexo || "No especificado",
        PhotoURL: AdminData?.Personal?.Profile || null,
        Uactive: true,
        levels: AdminData?.Personal?.Level || "-",
        lastLogin: AdminData?.Activity?.LastLogin || "-",
        loginHistory: AdminData?.Activity?.LoginHistory || [],
        createdAt: AdminData?.Activity?.CreatedAt || "-",
        role: "Administrador",
        collection: "CorsoSkillsAdmin"
      });
    }
  }

  if (selectedType === "Profesor" || selectedType === "Todos los Usuarios") {
    users.push(...TeachersData.map(t => ({
      id: t.id,
      fullName: t?.Personal?.FullName || "Sin nombre",
      email: t?.Personal?.Email || "Sin correo",
      phone: t?.Personal?.Phone || "Sin teléfono",
      sexo: t?.Personal?.Sexo || "No especificado",
      PhotoURL: t?.Personal?.PhotoURL || null,
      Uactive: t?.Uactive ?? false,
      levels: t?.Personal?.Level || "-",
      lastLogin: t?.Activity?.LastLogin || "-",
      loginHistory: t?.Activity?.LoginHistory || [],
      createdAt: t?.Activity?.CreatedAt || "-",
      role: "Profesor",
      collection: "CorsoSkillsTeacher"
    })));
  }

  if (selectedType === "Estudiante" || selectedType === "Todos los Usuarios") {
    users.push(...StudentsData.map(s => ({
      id: s.id,
      fullName: s?.fullName || "Sin nombre",
      email: s?.email || "Sin correo",
      phone: s?.Personal?.Phone || "Sin teléfono",
      sexo: s?.Personal?.Sexo || "No especificado",
      PhotoURL: s?.Personal?.PhotoURL || null,
      Uactive: s?.Uactive ?? false,
      levels: s?.Personal?.Level || "-",
      lastLogin: s?.Activity?.LastLogin || "-",
      loginHistory: s?.Activity?.LoginHistory || [],
      createdAt: s?.Activity?.CreatedAt || "-",
      role: "Estudiante",
      collection: "CorsoSkillsStudents"
    })));
  }

  if (users.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;">No hay usuarios registrados</td></tr>`;
    return;
  }

  users.forEach((user, index) => {
    const statusColor = user.Uactive ? "green" : "red";
    const statusText = user.Uactive ? "Activo" : "Desactivado";

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><input type="checkbox" data-id="${user.id}"></td>
      <td>
        <div class="user-info">
          <img src="${user.PhotoURL || 'https://cdn-icons-png.flaticon.com/512/847/847969.png'}" alt="User">

          <div>
            <p class="user-name">${user.fullName}</p>
            <p class="user-email">${user.email}</p>
          </div>
        </div>
      </td>
      <td>${user.id}</td>
      <td><p class="status" style="color:${statusColor}">${statusText}</p></td>
      <td>${user.levels || "-"}</td>
      <td>${user.role}</td>
      <td>${user.lastLogin || "-"}</td>
      <td class="actions-cell">
        <i class="fa-regular fa-eye view-user" data-index="${index}" title="Ver"></i>
        <i class="fa-regular fa-pen-to-square edit-user" data-index="${index}" title="Editar"></i>
        <i class="fa-regular fa-trash-can" title="Eliminar"></i>
      </td>
    `;
    tbody.appendChild(row);
  });

  // 👁️ Modal Ver Usuario
  document.querySelectorAll(".view-user").forEach(icon => {
    icon.addEventListener("click", e => openUserModal(users[e.target.dataset.index]));
  });

  // ✏️ Modal Editar Usuario
  document.querySelectorAll(".edit-user").forEach(icon => {
    icon.addEventListener("click", e => openEditUserModal(users[e.target.dataset.index]));
  });
}

// 🟢 Mostrar información completa
function openUserModal(user) {
  const modal = document.getElementById("userInfoModal");
  modal.style.display = "flex";
  document.getElementById("modalUserPhoto").src = user.PhotoURL || "https://i.pravatar.cc/80";
  document.getElementById("modalUserName").textContent = user.fullName;
  document.getElementById("modalUserEmail").textContent = user.email;
  document.getElementById("modalUserPhone").textContent = user.phone;
  document.getElementById("modalUserGender").textContent = user.sexo;
  document.getElementById("modalUserRole").textContent = user.role;
  document.getElementById("modalUserStatus").textContent = user.Uactive ? "Activo" : "Desactivado";
  document.getElementById("modalUserLevel").textContent = user.levels;
  document.getElementById("modalUserLastLogin").textContent = user.lastLogin;
  document.getElementById("modalUserCreatedAt").textContent = user.createdAt;

  const historyList = document.getElementById("modalUserLoginHistory");
  historyList.innerHTML = "";
  if (Array.isArray(user.loginHistory) && user.loginHistory.length > 0) {
    user.loginHistory.forEach(h => {
      const li = document.createElement("li");
      li.textContent = h;
      historyList.appendChild(li);
    });
  } else {
    historyList.innerHTML = "<li>No hay registros</li>";
  }

  document.getElementById("closeModal").onclick = () => modal.style.display = "none";
  modal.onclick = e => { if (e.target === modal) modal.style.display = "none"; };
}

// ✏️ Editar usuario y guardar en Firebase
function openEditUserModal(user) {
  const modal = document.getElementById("editUserModal");
  modal.style.display = "flex";

  document.getElementById("editUserName").value = user.fullName;
  document.getElementById("editUserEmail").value = user.email;
  document.getElementById("editUserPhone").value = user.phone;
  document.getElementById("editUserGender").value = user.sexo;
  document.getElementById("editUserLevel").value = user.levels;
  document.getElementById("editUserStatus").value = user.Uactive ? "true" : "false";

  document.getElementById("saveUserChanges").onclick = async () => {
    const updated = {
      FullName: document.getElementById("editUserName").value,
      Email: document.getElementById("editUserEmail").value,
      Phone: document.getElementById("editUserPhone").value,
      Sexo: document.getElementById("editUserGender").value,
      Level: document.getElementById("editUserLevel").value,
      Uactive: document.getElementById("editUserStatus").value === "true"
    };

    try {
      await updateDoc(doc(db, user.collection, user.id), {
        "Personal.FullName": updated.FullName,
        "Personal.Email": updated.Email,
        "Personal.Phone": updated.Phone,
        "Personal.Sexo": updated.Sexo,
        "Personal.Level": updated.Level,
        Uactive: updated.Uactive
      });
      alert("✅ Usuario actualizado correctamente");
      modal.style.display = "none";
      location.reload();
    } catch (err) {
      console.error("❌ Error al actualizar:", err);
      alert("Error al actualizar usuario");
    }
  };

  document.getElementById("closeEditModal").onclick = () => modal.style.display = "none";
  modal.onclick = e => { if (e.target === modal) modal.style.display = "none"; };
}



  // 🔸 Render default view
  renderUsersTable(AdminData, TeachersData, StudentsData, "All User");

  // 🔸 Dropdown change listener
  const userTypeSelect = document.querySelector(".right select");
  if (userTypeSelect) {
    userTypeSelect.addEventListener("change", (e) => {
      const selectedType = e.target.value;
      renderUsersTable(AdminData, TeachersData, StudentsData, selectedType);
    });
  }



}








fetchAllContent();













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