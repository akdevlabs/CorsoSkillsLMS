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




  






  setGlobalFont(data.Font)
  setbodyColors()
  SetUserInfoColors()
  SetMainColors()
  sidebarcolors()
  Linecolors()







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
async function getClassroomContent() {
  try {
    const docRef = doc(db, "CorsoSkillsClassrooms", TBuInfo);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.error("No such Classroom document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching Classroom document:", error);
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
  const ClassroomData = await getClassroomContent();
  const businessData = await getCorsoSkillAppContent();

  if (!TeacherData && !businessData) {
    console.error("❌ Could not load teacher or business data");
    return;
  }

  console.log("✅ Teacher Data:", TeacherData);
  console.log("✅ Classroom Data:", ClassroomData);
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



    function createDropdown(containerId, options, placeholder = 'Selecciona una opción', onChange = null) {
      const container = document.getElementById(containerId);
      if (!container) return console.error('Container not found:', containerId);

      container.innerHTML = ''; // Clear old content

      const select = document.createElement('select');
      select.className = 'dropdown-select';

      // Placeholder
      const placeholderOption = document.createElement('option');
      placeholderOption.textContent = placeholder;
      placeholderOption.disabled = true;
      placeholderOption.selected = true;
      select.appendChild(placeholderOption);

      // Dynamic options
      options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        select.appendChild(opt);
      });

      container.appendChild(select);

      // 🔘 Change event handler
      select.addEventListener('change', e => {
        console.log(`${containerId} selected:`, e.target.value);
        if (typeof onChange === 'function') onChange(e.target.value);
      });

      // 🔁 Return helper to get value later
      return {
        getValue: () => select.value,
        element: select
      };
    }


    // 🌟 Create level dropdown (translated)
    function createLevelDropdown(containerId, options, placeholder = 'Selecciona una opción', onChange = null) {
      const container = document.getElementById(containerId);
      if (!container) return console.error('Container not found:', containerId);

      const translations = {
        'Beginner': 'Principiante',
        'Intermediate': 'Intermedio',
        'Advanced': 'Avanzado'
      };

      container.innerHTML = '';

      const select = document.createElement('select');
      select.className = 'dropdown-select';

      const placeholderOption = document.createElement('option');
      placeholderOption.textContent = placeholder;
      placeholderOption.disabled = true;
      placeholderOption.selected = true;
      select.appendChild(placeholderOption);

      options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = translations[option] || option;
        select.appendChild(opt);
      });

      container.appendChild(select);

      select.addEventListener('change', e => {
        console.log(`${containerId} selected:`, e.target.value);
        if (typeof onChange === 'function') onChange(e.target.value);
      });

      return {
        getValue: () => select.value,
        element: select
      };
    }


    // 🌟 Extract categories from courses
    function getAllCategories(courses) {
      const allCategories = [];

      Object.values(courses).forEach(course => {
        if (Array.isArray(course.categories)) {
          allCategories.push(...course.categories);
        }
      });

      return [...new Set(allCategories)]; // remove duplicates
    }


    // 🌟 Render student dropdowns
    function renderStudentInfoDropdowns() {
      const CatValues = TeacherData.Courses;
      const categories = getAllCategories(CatValues);
      console.log('Course Categories:', categories);

      // 🟢 Create each dropdown and store references
      const courseDropdown = createDropdown('coures-search', categories, 'Selecciona curso');
      const levelDropdown = createLevelDropdown('level-search', ['Beginner', 'Intermediate', 'Advanced']);
      const activeDropdown = createDropdown('Active-Student-search', ['Activo', 'Inactivo']);

      // 🧠 Example: Get values later
      document.addEventListener('click', () => {
        console.log('📘 Curso:', courseDropdown.getValue());
        console.log('🎯 Nivel:', levelDropdown.getValue());
        console.log('👥 Estado:', activeDropdown.getValue());
      });

      // ✅ Return all dropdowns for external use
      return { courseDropdown, levelDropdown, activeDropdown };
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

  function studentPortalNav() {
    const buttons = document.querySelectorAll(".Content-Btns");
    const blocks = document.querySelectorAll(".Content-Block");

    // 🗺️ Map button IDs to section IDs
    const sectionMap = {
      "Overview-Btn": "Student-Info",
      "Performance-Btn": "Performance",
      "Homework-Btn": "Homework",
      "Attendance-Btn": "Attendance",
      "Notes-Btn": "Notes"
    };

    // 🎨 Colors (replace with your actual color variables if needed)
    const activeColor = Prime;      // Active background
    const textColor = Prime5;       // Active text
    const inactiveColor = "transparent";
    const inactiveTextColor = Prime;

    // 🟢 Function to activate a specific section/button
    function activateSection(buttonId) {
      const targetId = sectionMap[buttonId];

      // Hide all content blocks
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

    // 🟣 Default active = Overview
    activateSection("Overview-Btn");
  }




function renderStudentInfoDropdowns() {
  const CatValues =  TeacherData.Courses;
  const categories = getAllCategories(CatValues);
  console.log('Course Categories:', categories);

  // 🟢 Create dropdowns
  const courseDropdown = createDropdown('coures-search', categories, 'Selecciona curso');
  const levelDropdown = createLevelDropdown('level-search', ['Beginner', 'Intermediate', 'Advanced']);
  const activeDropdown = createDropdown('Active-Student-search', ['Activo', 'Inactivo']);

  // ⚡ Validation Function
  function validateSelections() {
    const courseValue = courseDropdown.getValue();
    const levelValue = levelDropdown.getValue();
    const activeValue = activeDropdown.getValue(); // optional

    // Clear any old highlights
    document.querySelectorAll('.dropdown-select').forEach(el => el.classList.remove('error'));

    if (!courseValue || courseValue === 'Selecciona curso') {
      highlightError('coures-search');
      showInlineMessage('Por favor selecciona un curso.');
      return false;
    }

    if (!levelValue || levelValue === 'Selecciona una opción') {
      highlightError('level-search');
      showInlineMessage('Por favor selecciona un nivel.');
      return false;
    }

    console.log('✅ Selección válida:');
    console.log('📘 Curso:', courseValue);
    console.log('🎯 Nivel:', levelValue);
    console.log('👥 Estado (opcional):', activeValue || 'No seleccionado');

    // Update breadcrumb view
    updateNavView(courseValue, levelValue, activeValue);

    // 🔍 Filter classroom data
    filterCourses(courseValue, levelValue, activeValue);

    return { courseValue, levelValue, activeValue };
  }

  // 🧭 Update breadcrumb (student-nav-view)
  function updateNavView(course, level, active) {
    const navView = document.getElementById('student-nav-view');
    if (!navView) return;
    const parts = [course, level];
    if (active && active !== 'Selecciona una opción') parts.push(active);
    navView.textContent = parts.join(' › ');
    navView.classList.add('show');
  }

  // 🔎 Filter Logic
  function filterCourses(selectedCategory, selectedLevel, selectedActive) {
    const allCourses = ClassroomData.Courses;
    const filtered = Object.values(allCourses).filter(course => {
      const categoryMatch = course.categories.includes(selectedCategory);
      const levelMatch = course.level === selectedLevel;

      // If “Activo” or “Inactivo” filtering is needed by student data:
      if (selectedActive && selectedActive !== 'Selecciona una opción') {
        const isActive = selectedActive === 'Activo';
        return categoryMatch && levelMatch && course.active === isActive;
      }

      return categoryMatch && levelMatch;
    });

    console.log('🎯 Cursos filtrados:', filtered);

    // You can later render them to DOM here if needed
    // renderFilteredCourses(filtered);
  }

  // 🔴 Helper to show error highlight
  function highlightError(containerId) {
    const select = document.querySelector(`#${containerId} select`);
    if (select) select.classList.add('error');
  }

  // 🟡 Inline warning message
  function showInlineMessage(message) {
    let msg = document.getElementById('dropdown-warning');
    if (!msg) {
      msg = document.createElement('div');
      msg.id = 'dropdown-warning';
      msg.className = 'dropdown-warning';
      document.querySelector('.filter-block').appendChild(msg);
    }
    msg.textContent = message;
    msg.style.display = 'block';
  }

  // 🟢 Clear message
  function clearInlineMessage() {
    const msg = document.getElementById('dropdown-warning');
    if (msg) msg.style.display = 'none';
  }

  // 🧠 Search Button Handler
  const searchBtn = document.getElementById('Search-Student-Btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      clearInlineMessage();
      validateSelections();
    });
  }

  return { courseDropdown, levelDropdown, activeDropdown };

  // 🧩 Course Code Decoder (kept for consistency)
  function decodeCourseCode(code) {
    if (!code || code.length < 2) return "Invalid code";

    const levelMap = { B: "Beginner", I: "Intermediate", A: "Advanced" };
    const categoryMap = {
      A: "AI", B: "Business", D: "Design", F: "Finance", L: "Languages",
      LE: "Leadership", M: "Marketing", P: "Productivity", PR: "Programming",
      S: "Sales", T: "Technology", W: "Wellness"
    };

    const levelCode = code[0];
    let categoryCode = code.substring(1, 3);
    if (!categoryMap[categoryCode]) categoryCode = code[1];

    const level = levelMap[levelCode] || "Unknown Level";
    const category = categoryMap[categoryCode] || "Unknown Category";
    return `${level}, ${category}`;
  }
}










  function renderPerformanceInfoDropdowns(){
    createDropdown('Performance-coures-search', ['Matemáticas', 'Ciencias', 'Historia', 'Educación Física']);
    createDropdown('Performance-level-search', ['Matemáticas', 'Ciencias', 'Historia', 'Educación Física']);
    createDropdown('Performance-Date-search', ['Matemáticas', 'Ciencias', 'Historia', 'Educación Física']);
  }
  function renderHomeworkInfoDropdowns(){
    createDropdown('Homework-coures-search', ['Matemáticas', 'Ciencias', 'Historia', 'Educación Física']);
    createDropdown('Homework-level-search', ['Matemáticas', 'Ciencias', 'Historia', 'Educación Física']);
    createDropdown('Homework-Date-search', ['Matemáticas', 'Ciencias', 'Historia', 'Educación Física']);
  }
  function renderAttendanceInfoDropdowns(){
    createDropdown('Attendance-coures-search', ['Matemáticas', 'Ciencias', 'Historia', 'Educación Física']);
    createDropdown('Attendance-level-search', ['Matemáticas', 'Ciencias', 'Historia', 'Educación Física']);
    createDropdown('Attendance-Date-search', ['Matemáticas', 'Ciencias', 'Historia', 'Educación Física']);
  }
  function renderNotesInfoDropdowns(){
    createDropdown('Notes-coures-search', ['Matemáticas', 'Ciencias', 'Historia', 'Educación Física']);
    createDropdown('Notes-level-search', ['Matemáticas', 'Ciencias', 'Historia', 'Educación Física']);
    createDropdown('Notes-Date-search', ['Matemáticas', 'Ciencias', 'Historia', 'Educación Física']);
  }


















  renderWelcome()
  renderId()
  renderUserIcon()
  renderAlertIcons() 
  studentPortalNav()
  renderStudentInfoDropdowns()
  renderPerformanceInfoDropdowns()
  renderHomeworkInfoDropdowns()
  renderAttendanceInfoDropdowns()
  renderNotesInfoDropdowns()
  


}

fetchAllContent();





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
