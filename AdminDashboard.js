// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";

import { 
  getFirestore, doc, getDoc,getDocs, collection, addDoc, setDoc, 
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
      .users-header h2 {
        color: ${Base};
      }
      .users-header p {
        color: ${Prime};
      }
      .card {
        background-color:${Prime5};
      }
      .card i {
        color: ${Base};
      }
      .card p {
        color:${Prime1};
      }
      .card h3 {
        color:${Prime3};
      }
      /* === CHART & TABLE SECTION === */
      .chart-section,
      .table-section {
        background-color: ${Prime5};
      }
      .chart-section h4,
      .table-section h4 {
        color: ${Base};
      }
      .chart-placeholder {
        border: 2px dashed ${Prime3};
        color: ${Prime1};
      }
      /* === TABLE === */
      .table-section thead {
        color: ${Prime};
        background-color: ${Prime4};
      }
      .table-section th,
      .table-section td {
      color: ${Prime};
        border-bottom: 1px solid ${Base};
      }
      .table-section tbody tr:hover {
        color: ${Prime5};
        background-color: ${Prime3};
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
  console.group("✅ All Firestore Data Loaded");
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


  renderId()
  renderWelcome()
  renderCardInfo()




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










function setupDashboardCards() {
  const teacherCard = document.querySelector('.card:nth-child(3)');
  const studentCard = document.querySelector('.card:nth-child(4)');
  const affiliateCard = document.querySelector('.card:nth-child(5)');

  const teacherBlock = document.getElementById('Teacher-Block');
  const studentBlock = document.getElementById('Students-Block');
  const affiliateBlock = document.getElementById('Affiliates-Block');

  const blocks = [teacherBlock, studentBlock, affiliateBlock];

  // Hide all blocks initially
  blocks.forEach(block => block.style.display = 'none');

  // Helper to show one and hide others
  function showBlock(blockToShow) {
    blocks.forEach(block => {
      block.style.display = (block === blockToShow) ? 'block' : 'none';
    });
  }

  // Add click listeners
  teacherCard.addEventListener('click', () => showBlock(teacherBlock));
  studentCard.addEventListener('click', () => showBlock(studentBlock));
  affiliateCard.addEventListener('click', () => showBlock(affiliateBlock));
}

// Run after DOM is loaded
document.addEventListener('DOMContentLoaded', setupDashboardCards);










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
document.getElementById("Logout").addEventListener("click", function () {
  window.location.href = "index4.2.html";
}); 