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




  function setContentColors() {
    const style = document.createElement("style");
    style.textContent = `
    .Block{
      background-color: ${Prime5};
    }
    #div1 h3 {
      color: ${Base};
    }
    #div1 .task-count {
      color: ${Base};
    }
    #div1 .badge {
      color: ${Base};
      background-color: ${Prime4};
    }
    .progress-value {
      color: ${Base};
      background-color: ${Prime4};
    }






    #div3{
      background-color: ${Prime5};
    }
    #div3 h3 {
      color: ${Base};
    }
    #div3 p {
      color: ${Prime1};
    }
    .event-item {
      background-color: ${Prime4};
      border-left: 4px solid ${Prime3};
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.64);
    }
    .event-item:hover {
      box-shadow: 0 4px 12px ${Prime3};
    }
    .event-item strong {
      color: ${Prime};
    }
    .event-item span {
      color: ${Prime};
    }






    #div4 .Event-Block h1 {
      color:${Base};
    }
    #div4 .calendar-day {
      background: ${Prime4};
      border: 1px solid ${Prime};
    }
    #div4 .calendar-day:hover {
      color:${Prime5};
      background: ${Prime1};
    }
    #div4 .calendar-day-header {
      border-bottom: 1px solid ${Prime4};
    }
    #div4 .calendar-event {
      background: ${Prime2};
      color:${Prime5};
    }
    #div4 .calendar-event:hover {
      background: ${Base};
    }
    #div4 .no-events {
      color: ${Prime2};
    }
    #div4 .Event-Btns {
      background: ${Prime3};
      color: ${Prime5};
    }
    #div4 .Event-Btns:hover {
      background: ${Prime2};
    }
    #div4 .create-event-btn {
      background: ${Base};
      color: ${Prime5};
    }
    #div4 .create-event-btn:hover {
      background: ${Prime2};
    }
    #div4 .events-list {
      background-color: ${Prime4};
    }
    #div4 .event-card {
      background: ${Prime5};
      border: 1px solid ${Prime};
    }
    #div4 .event-card:hover {
      box-shadow: 0 4px 12px ${Prime3};
    }
    #div4 .event-header {
      color:${Base};
    }
    #div4 .delete-event-btn {
      background: ${Prime2};
      color: ${Prime5};
    }
    #div4 .delete-event-btn:hover {
      background: ${Base};
    }



    .calendar-header {
      color: ${Base};
    }
    .calendar-days-row {
      color: ${Prime2};
    }
    .calendar-day {
      background: ${Prime5};
      border: 1px solid ${Prime3};
      color: ${Base};
    }
    .calendar-day:hover {
      background: ${Prime4};
      border-color: ${Prime3};
    }
    .calendar-day.today {
      background: ${Prime2};
      color: ${Prime5};
    }


    .task-input {
      border: 1px solid ${Prime3};
    }
    .task-add-btn {
      background: ${Prime2};
      color: ${Prime5};
    }
    .task-add-btn:hover {
      background: ${Base};
    }
    .task-section {
      background: ${Prime5};
    }
    .task-section h4 {
      color: ${Base};
    }
    .task-item {
      color: ${Prime};
      border: 1px solid ${Prime};
    }
    .task-item.pending {
      background: ${Prime4};
    }
    .task-item.completed {
      background: ${Prime4};
      color: ${Prime};
    }
    .task-done-btn:hover {
      color:  ${Prime3};
    }
    .task-delete-btn{
      color:  ${Prime};
    }
    .task-delete-btn:hover {
      color: ${Base};
    }
    .empty-task {
      color: ${Prime};
    }




    .modal-overlay {
      background-color: rgba(0, 0, 0, 0.64); 
    }
    .modal-content {
      background-color: ${Prime5};
    }
    .modal-content .close-btn {
      color: ${Base};
    }
    .modal-content .close-btn:hover {
      color: ${Prime2};
    }
    .modal-content h3 {
      color: ${Base};
    }
    .modal-content label {
      color: ${Base};
    }
    .modal-content input[type="date"],
    .modal-content input[type="time"],
    .modal-content select,
    .modal-content textarea {
      border: 1px solid ${Prime3};
    }
    .modal-content input:focus,
    .modal-content select:focus,
    .modal-content textarea:focus {
      border-color: ${Prime2};
    }

    .modal-content button#save-event {
      color: ${Prime5};
      background-color: ${Base};
    }
    .modal-content button#save-event:hover {
      background-color:${Prime2};

    }








    `;
    document.head.appendChild(style);
  }
  setContentColors()



  
  setGlobalFont(data.Font)
  SetMainColors()
  sidebarcolors()
  Setmaincolors()
  SetUserInfoColors()

 


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
  const TeacherData = await getTeacherContent();
  const businessData = await getCorsoSkillAppContent();
  const classroomData = await getCorsoSkillsClassrooms();

  if (!TeacherData && !businessData) {
    console.error("❌ Could not load teacher or business data");
    return;
  }
  if (classroomData) console.log("✅ Classroom Data:", classroomData);
  else console.warn("⚠️ No classroom data found.");

  console.log("✅ Teacher Data:", TeacherData);
  console.log("✅ Business Data:", businessData);
  console.log("✅ Classroom Data:", classroomData);
  
  function renderText(text, elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = text;
    } else {
      console.error(`Element with ID "${elementId}" not found.`);
    }
  }

  async function renderHeaderinfo() {

    function renderWelcome() {
      const name = (TeacherData && TeacherData.fullName) || "Profesor";
      renderText(name, "User-Name");
    }
    function renderId() {
      const userIdElement = document.getElementById("User-Id");
      if (!userIdElement) return;

      const adminId = TeacherData?.TeacherId || TeacherData?.id || TeachersData?.[0]?.TeacherId || null;

      if (adminId) {
        renderText("ID: " + adminId, "User-Id");
        userIdElement.style.cursor = "pointer";
        userIdElement.title = "Haz clic para copiar el ID";

        // Remove previous listeners
        const newEl = userIdElement.cloneNode(true);
        userIdElement.parentNode.replaceChild(newEl, userIdElement);

        newEl.addEventListener("click", () => {
          navigator.clipboard.writeText(adminId).then(() => {
            const originalText = newEl.textContent;
            newEl.textContent = "ID copiado ✅";
            setTimeout(() => {
              newEl.textContent = originalText;
            }, 1500);
          }).catch(err => console.error("Clipboard write failed:", err));
        });
      } else {
        renderText("Falta ID", "User-Id");
      }
    }

    function renderUserIcon() {
      const container = document.getElementById("profile-img");
      if (!container) return;

      // Check if TeacherData and TeacherData.Personal exist and have profileImg
      const profileImg = TeacherData?.Personal?.profileImg;

      if (!profileImg) {
        container.innerHTML = `<i class="fa-solid fa-circle-user" style="font-size: 2rem;"></i>`;
      } else {
        container.innerHTML = `
          <img src="${profileImg}" 
              alt="User Icon" 
              style="border-radius: 50%;" />
        `;
      }
    }
 
    function renderAlertIcons() {
      const ActiveAlrts = 0; // adjust dynamically if needed
      const Prime2 = "#333";
      const Prime5 = "#eee";

      const container = document.querySelector(".Active-Portal-Alerts");
      if (!container) return;

      if (ActiveAlrts) {
        container.innerHTML = `<i class="fa-solid fa-bell"></i>`;
        container.style.color = Prime2;
        container.style.backgroundColor = Prime5;
      } else {
        container.innerHTML = `<i class="fa-regular fa-bell"></i>`;
      }
    }

    renderWelcome()
    renderId()
    renderAlertIcons()
    renderUserIcon()
  }
  renderHeaderinfo();



  function renderPendingTasks(){
    function renderTaskWidget() {
        const div1 = document.getElementById("div1");
        const tasks = TeacherData.Tasks.PendingTasks
        if (!div1) {
          console.error("❌ No se encontró el elemento con id='div1'");
          return;
        }

        div1.innerHTML = ""; // clear previous content

        const title = document.createElement("h3");
        title.textContent = "Tareas Pendientes";
        div1.appendChild(title);

        // No tasks
        if (!tasks || tasks.length === 0) {
          const noTasks = document.createElement("span");
          noTasks.textContent = "No hay tareas pendientes";
          noTasks.style.fontSize = "0.9rem";
          noTasks.style.color = "#777";
          div1.appendChild(noTasks);
          return;
        }

        const count = tasks.length;
        const content = document.createElement("div");
        content.className = "task-count";

        const countEl = document.createElement("span");
        countEl.textContent = count;

        let nivel = "", clase = "";
        if (count > 0 && count <= 5) { nivel = "Bajo"; clase = "bajo"; }
        else if (count > 5 && count <= 10) { nivel = "Medio"; clase = "medio"; }
        else { nivel = "Alto"; clase = "alto"; }

        const badge = document.createElement("span");
        badge.className = `badge ${clase}`;
        badge.textContent = nivel;

        content.appendChild(countEl);
        content.appendChild(badge);
        div1.appendChild(content);
    }
    function renderTaskProgress() {
      const div2 = document.getElementById("div2");
      if (!div2) return console.error("❌ No se encontró el elemento con id='div2'");

      div2.innerHTML = ""; // Clear previous content

      // ✅ Title
      const title = document.createElement("h3");
      title.textContent = "Progreso de Tareas";
      title.style.color = "#004a7c";
      title.style.fontWeight = "bold";
      div2.appendChild(title);

      // ✅ Extract data
      const completed = TeacherData.Tasks.CompletedTasks?.length || 0;
      const pending = TeacherData.Tasks.PendingTasks?.length || 0;
      const total = completed + pending;

      if (total === 0) {
        const noData = document.createElement("span");
        noData.textContent = "Sin datos de progreso";
        noData.style.color = "#777";
        div2.appendChild(noData);
        return;
      }

      // ✅ Calculate %
      const percentage = Math.round((completed / total) * 100);

      // ✅ Circular container
      const circleWrapper = document.createElement("div");
      circleWrapper.className = "circle-wrapper";

      // ✅ Circle background and progress
      const circle = document.createElement("div");
      circle.className = "circular-progress";
      circle.style.background = `conic-gradient(#007bff ${percentage * 3.6}deg, #dfe6ec ${percentage * 3.6}deg)`;

      // ✅ Inner text
      const progressText = document.createElement("div");
      progressText.className = "progress-value";
      progressText.textContent = `${percentage}%`;

      circle.appendChild(progressText);
      circleWrapper.appendChild(circle);
      div2.appendChild(circleWrapper);
    }

    function findKeyInArray(obj, targetKey) {
      const results = [];

      function recursiveSearch(o) {
        if (typeof o !== "object" || o === null) return;

        for (const key in o) {
          if (o.hasOwnProperty(key)) {
            if (key === targetKey) {
              results.push(o[key]); // store the value
            }
            if (typeof o[key] === "object" && o[key] !== null) {
              recursiveSearch(o[key]);
            }
          }
        }
      }

      recursiveSearch(obj);
      return results;
    }
    const Aevent = classroomData.Event;
    const events = findKeyInArray(Aevent, UserUidInfo);
    function renderCalendar() {
      const div4 = document.getElementById("div5");
      if (!div4) return console.error("❌ No se encontró el elemento con id='div5'");
      div4.innerHTML = "";

      const now = new Date();
      const month = now.getMonth();
      const year = now.getFullYear();

      const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];
      const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

      // 📅 Header
      const header = document.createElement("div");
      header.className = "calendar-header";
      header.textContent = `${monthNames[month]} ${year}`;
      div4.appendChild(header);

      // 🗓 Days of week
      const daysRow = document.createElement("div");
      daysRow.className = "calendar-days-row";
      daysOfWeek.forEach(day => {
        const d = document.createElement("div");
        d.className = "calendar-day-name";
        d.textContent = day;
        daysRow.appendChild(d);
      });
      div4.appendChild(daysRow);

      // 🗓 Dates grid
      const grid = document.createElement("div");
      grid.className = "calendar-grid";

      const firstDay = new Date(year, month, 1).getDay();
      const lastDate = new Date(year, month + 1, 0).getDate();
      const today = now.getDate();

      // Fill blanks
      for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement("div");
        empty.className = "calendar-day empty";
        grid.appendChild(empty);
      }

      // Fill days
      for (let d = 1; d <= lastDate; d++) {
        const dayCell = document.createElement("div");
        dayCell.className = "calendar-day";
        dayCell.textContent = d;

        if (d === today) dayCell.classList.add("today");

        // Click: show events
        dayCell.addEventListener("click", () => {
          const selectedDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
          showEventsForDate(selectedDate);
        });

        grid.appendChild(dayCell);
      }

      div4.appendChild(grid);

      // Section for events
      const eventsContainer = document.createElement("div");
      eventsContainer.id = "events-container";
      eventsContainer.className = "events-container";
      div4.appendChild(eventsContainer);

      // Show today's events by default
      const todayDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(today).padStart(2, "0")}`;
      showEventsForDate(todayDate);
    }
    function showEventsForDate(dateStr) {
      const container = document.getElementById("div3");
      container.innerHTML = "";

      const filtered = events.filter(ev => ev.date === dateStr);

      const title = document.createElement("h3");
      title.textContent = `Eventos del ${dateStr}`;
      container.appendChild(title);

      if (filtered.length === 0) {
        const none = document.createElement("p");
        none.textContent = "No hay eventos para este día.";
        container.appendChild(none);
        return;
      }

      filtered.forEach(ev => {
        const eventDiv = document.createElement("div");
        eventDiv.className = "event-item";
        eventDiv.innerHTML = `
          <strong>${ev.description || "Evento"}</strong> 
          <span>${ev.time || ""}</span>
        `;
        container.appendChild(eventDiv);
      });
    }
    renderCalendar();


    async function renderEventManager() {
      const div5 = document.getElementById("div4");
      if (!div5) return console.error("❌ No se encontró el elemento con id='div4'");
      div5.innerHTML = "";

      // Build UI container
      const { calendarDiv, eventsList } = buildEventManagerUI(div5);

      // Firestore ref
      const eventsDocRef = doc(db, "CorsoSkillsClassrooms", TBuInfo);

      // Load default events
      await loadEvents(eventsDocRef, "all", null, calendarDiv, eventsList);

      // Filter buttons listeners
      setupFilterButtons(eventsDocRef, calendarDiv, eventsList);

      // Create modal button
      document.querySelector(".create-event-btn").onclick = () =>
        renderEventModal(eventsDocRef, calendarDiv, eventsList);
    }
    function buildEventManagerUI(container) {
      const eventBlock = document.createElement("div");
      eventBlock.className = "Event-Block";

      const title = document.createElement("h1");
      title.textContent = "Gestor de Eventos";

      const calendarDiv = document.createElement("div");
      calendarDiv.className = "Active-Calander";
      calendarDiv.id = "Active-Calander";

      const btnContainer = document.createElement("div");
      btnContainer.className = "Active-Calander-Btns";
      btnContainer.innerHTML = `
      <div>
        <button class="Event-Btns" id="all-Events">Todos los Eventos</button>
        <button class="Event-Btns" id="todays-Events">Eventos de hoy</button>
        <button class="Event-Btns" id="Completed">Evento Anterior</button>
        <button class="Event-Btns" id="In-Progress">Próximo Evento</button>
      </div>
        <button class="create-event-btn" id="In-Progress">+ Crear Evento</button>
      `;

  

      const eventsList = document.createElement("div");
      eventsList.className = "events-list";

      eventBlock.append(title, calendarDiv, btnContainer, eventsList);
      container.appendChild(eventBlock);

      return { calendarDiv, eventsList };
    }
    function buildEventStructure(event) {
      const { category, level, teacherId, id, date, time, description, createdAt } = event;
      return {
        Event: {
          [category]: {
            [level]: {
              [teacherId]: { id, date, time, description, createdAt }
            }
          }
        }
      };
    }
    async function saveEvent(eventsDocRef, event) {
      const nested = buildEventStructure(event);
      await setDoc(eventsDocRef, nested, { merge: true });
    }
    async function getAllEvents(eventsDocRef) {
      const snap = await getDoc(eventsDocRef);
      if (!snap.exists()) return [];

      const data = snap.data().Event || {};
      const flat = [];

      for (const category in data) {
        for (const level in data[category]) {
          for (const teacherId in data[category][level]) {
            flat.push({
              category,
              level,
              teacherId,
              ...data[category][level][teacherId]
            });
          }
        }
      }

      return flat;
    }
    async function deleteEventById(eventsDocRef, id) {
      const snap = await getDoc(eventsDocRef);
      if (!snap.exists()) return;

      const data = snap.data().Event || {};
      let changed = false;

      for (const category in data) {
        for (const level in data[category]) {
          for (const teacherId in data[category][level]) {
            const ev = data[category][level][teacherId];
            if (ev.id === id) {
              delete data[category][level][teacherId];
              changed = true;

              // clean empty levels/categories
              if (Object.keys(data[category][level]).length === 0) delete data[category][level];
              if (Object.keys(data[category]).length === 0) delete data[category];
            }
          }
        }
      }

      if (changed) await updateDoc(eventsDocRef, { Event: data });
    }
    async function renderWeeklyCalendar(eventsDocRef, calendarDiv) {
      const flatEvents = await getAllEvents(eventsDocRef);
      calendarDiv.innerHTML = "";

      const today = new Date();
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());

      const weekDays = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(weekStart);
        d.setDate(weekStart.getDate() + i);
        return d;
      });

      const calendarGrid = document.createElement("div");
      calendarGrid.className = "calendar-grid";

      weekDays.forEach(day => {
        const dateStr = day.toISOString().split("T")[0];
        const dayName = day.toLocaleDateString("es-ES", { weekday: "short" });

        const dayBox = document.createElement("div");
        dayBox.className = "calendar-day";

        const header = document.createElement("div");
        header.className = "calendar-day-header";
        header.innerHTML = `<span>${dayName}</span><strong>${day.getDate()}</strong>`;

        const eventContainer = document.createElement("div");
        eventContainer.className = "calendar-events";

        const dayEvents = flatEvents.filter(ev => ev.date === dateStr);

        if (dayEvents.length === 0) {
          eventContainer.innerHTML = `<p class="no-events">—</p>`;
        } else {
          dayEvents.forEach(ev => {
            const evEl = document.createElement("div");
            evEl.className = "calendar-event";
            evEl.textContent = `${ev.time} • ${ev.category}`;
            eventContainer.appendChild(evEl);
          });
        }

        dayBox.onclick = () =>
          loadEvents(eventsDocRef, "date", dateStr, calendarDiv, document.querySelector(".events-list"));

        dayBox.append(header, eventContainer);
        calendarGrid.appendChild(dayBox);
      });

      calendarDiv.appendChild(calendarGrid);
    }
    async function loadEvents(eventsDocRef, filter, dateFilter, calendarDiv, eventsList) {
      eventsList.innerHTML = "<p>Cargando eventos...</p>";

      let events = await getAllEvents(eventsDocRef);
      const today = new Date().toISOString().split("T")[0];

      if (filter === "today") events = events.filter(e => e.date === today);
      else if (filter === "past") events = events.filter(e => e.date < today);
      else if (filter === "upcoming") events = events.filter(e => e.date > today);
      else if (filter === "date") events = events.filter(e => e.date === dateFilter);

      await renderWeeklyCalendar(eventsDocRef, calendarDiv);

      if (events.length === 0) {
        eventsList.innerHTML = "<p class='empty-msg'>No hay eventos disponibles.</p>";
        return;
      }

      events.sort((a, b) => a.date.localeCompare(b.date));

      eventsList.innerHTML = "";
      events.forEach(event => renderEventCard(event, eventsDocRef, eventsList));
    }
    function renderEventCard(event, eventsDocRef, eventsList) {
      // Level translation map
      const levelMap = {
        "Beginner": "Principiante",
        "Intermediate": "Intermedio",
        "Advanced": "Avanzado"
      };
      const translatedLevel = levelMap[event.level] || event.level;

      const card = document.createElement("div");
      card.className = "event-card";

      card.innerHTML = `
        <div class="event-header">
          <strong>${event.category}</strong>
          <span>${event.date} • ${event.time}</span>
        </div>
        <div class="event-body">
          <p><b>Nivel:</b> ${translatedLevel}</p>
          <p>${event.description}</p>
        </div>
        <div class="event-footer">
          <button class="delete-event-btn">🗑 Eliminar</button>
        </div>
      `;

      card.querySelector(".delete-event-btn").onclick = async () => {
        if (confirm("¿Eliminar este evento?")) {
          await deleteEventById(eventsDocRef, event.id);
          await loadEvents(eventsDocRef, "all", null, document.querySelector("#Active-Calander"), eventsList);
        }
      };

      eventsList.appendChild(card);
    }
    function setupFilterButtons(eventsDocRef, calendarDiv, eventsList) {
      document.getElementById("all-Events").onclick = () =>
        loadEvents(eventsDocRef, "all", null, calendarDiv, eventsList);

      document.getElementById("todays-Events").onclick = () =>
        loadEvents(eventsDocRef, "today", null, calendarDiv, eventsList);

      document.getElementById("Completed").onclick = () =>
        loadEvents(eventsDocRef, "past", null, calendarDiv, eventsList);

      document.getElementById("In-Progress").onclick = () =>
        loadEvents(eventsDocRef, "upcoming", null, calendarDiv, eventsList);
    }
    function renderEventModal(eventsDocRef, calendarDiv, eventsList) {
      const Cat = businessData.CourseCategory; // e.g., ["AI", "Marketing", "Programming", ...]
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

      const overlay = document.createElement("div");
      overlay.className = "modal-overlay";

      const modal = document.createElement("div");
      modal.className = "modal-content";

      // Build options with English value but Spanish label
      const categoryOptions = Cat.map(cat => {
        const label = traducciones[cat] || cat; // fallback to original if no translation
        return `<option value="${cat}">${label}</option>`;
      }).join("");

      modal.innerHTML = `
        <span class="close-btn">&times;</span>
        <h3>Crear Nuevo Evento</h3>

        <label>Fecha: <input type="date" id="event-date"></label>
        <label>Hora: <input type="time" id="event-time"></label>

        <label>Categoría:
          <select id="event-course">
            <option value="">Selecciona</option>
            ${categoryOptions}
          </select>
        </label>

        <label>Nivel:
          <select id="event-level">
            <option value="">Selecciona</option>
            <option value="Beginner">Principiante</option>
            <option value="Intermediate">Intermedio</option>
            <option value="Advanced">Avanzado</option>
          </select>
        </label>

        <label>Descripción:<br>
          <textarea id="event-description" rows="3"></textarea>
        </label>

        <button id="save-event">Guardar Evento</button>
      `;

      overlay.appendChild(modal);
      document.body.appendChild(overlay);

      modal.querySelector(".close-btn").onclick = () => overlay.remove();

      // Save event
      document.getElementById("save-event").onclick = async () => {
        const event = {
          id: crypto.randomUUID(),
          teacherId: TeacherData?.TeacherId || "Unknown",
          date: document.getElementById("event-date").value,
          time: document.getElementById("event-time").value,
          category: document.getElementById("event-course").value,
          level: document.getElementById("event-level").value,
          description: document.getElementById("event-description").value.trim(),
          createdAt: new Date().toISOString(),
        };

        if (!event.date || !event.time || !event.category || !event.level || !event.description) {
          alert("Completa todos los campos.");
          return;
        }

        await saveEvent(eventsDocRef, event);
        overlay.remove();
        await loadEvents(eventsDocRef, "all", null, calendarDiv, eventsList);
      };
    }

    async function renderTaskManager() {
      const div3 = document.getElementById("div6");
      if (!div3) return console.error("❌ No se encontró el elemento con id='div3'");
      div3.innerHTML = "";

      // 🟦 Firestore document reference
      const teacherRef = doc(db, "CorsoSkillsTeacher", UserUidInfo);

      // Initialize tasks if missing
      if (!TeacherData.Tasks) {
        TeacherData.Tasks = { PendingTasks: [], CompletedTasks: [] };
        await updateDoc(teacherRef, { Tasks: TeacherData.Tasks });
      }

      // --- Title ---
      const title = document.createElement("h3");
      title.textContent = "Gestor de Tareas";
      title.style.color = "#004a7c";
      title.style.fontWeight = "bold";
      div3.appendChild(title);

      // --- Input to create new task ---
      const inputContainer = document.createElement("div");
      inputContainer.className = "task-input-container";

      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Nueva tarea...";
      input.className = "task-input";

      const addBtn = document.createElement("button");
      addBtn.textContent = "Agregar";
      addBtn.className = "task-add-btn";

      inputContainer.appendChild(input);
      inputContainer.appendChild(addBtn);
      div3.appendChild(inputContainer);

      // --- Task sections ---
      const sections = document.createElement("div");
      sections.className = "task-sections";

      const pendingContainer = document.createElement("div");
      pendingContainer.className = "task-section";
      const completedContainer = document.createElement("div");
      completedContainer.className = "task-section";

      const pendingTitle = document.createElement("h4");
      pendingTitle.textContent = "Pendientes";
      const completedTitle = document.createElement("h4");
      completedTitle.textContent = "Completadas";

      pendingContainer.appendChild(pendingTitle);
      completedContainer.appendChild(completedTitle);

      const pendingList = document.createElement("ul");
      const completedList = document.createElement("ul");
      pendingList.className = "task-list";
      completedList.className = "task-list";

      // --- Render lists ---
      const renderLists = async () => {
        pendingList.innerHTML = "";
        completedList.innerHTML = "";

        const pendingTasks = TeacherData.Tasks.PendingTasks || [];
        const completedTasks = TeacherData.Tasks.CompletedTasks || [];

        // 🟡 Pending tasks
        if (pendingTasks.length === 0) {
          const noPending = document.createElement("li");
          noPending.textContent = "Sin tareas pendientes";
          noPending.className = "empty-task";
          pendingList.appendChild(noPending);
        } else {
          pendingTasks.forEach((t, i) => {
            const li = document.createElement("li");
            li.textContent = t;
            li.className = "task-item pending";

            const doneBtn = document.createElement("button");
            doneBtn.textContent = "✔";
            doneBtn.className = "task-done-btn";
            doneBtn.onclick = async () => {
              TeacherData.Tasks.CompletedTasks.push(t);
              TeacherData.Tasks.PendingTasks.splice(i, 1);

              await updateDoc(teacherRef, {
                "Tasks.PendingTasks": TeacherData.Tasks.PendingTasks,
                "Tasks.CompletedTasks": TeacherData.Tasks.CompletedTasks,
              });

              renderLists();
            };

            li.appendChild(doneBtn);
            pendingList.appendChild(li);
          });
        }

        // 🟢 Completed tasks
        if (completedTasks.length === 0) {
          const noCompleted = document.createElement("li");
          noCompleted.textContent = "Sin tareas completadas";
          noCompleted.className = "empty-task";
          completedList.appendChild(noCompleted);
        } else {
          completedTasks.forEach((t) => {
            const li = document.createElement("li");
            li.textContent = t;
            li.className = "task-item completed";

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "🗑";
            deleteBtn.className = "task-delete-btn";
            deleteBtn.onclick = async () => {
              TeacherData.Tasks.CompletedTasks = TeacherData.Tasks.CompletedTasks.filter(task => task !== t);

              await updateDoc(teacherRef, {
                "Tasks.CompletedTasks": TeacherData.Tasks.CompletedTasks,
              });

              renderLists();
            };

            li.appendChild(deleteBtn);
            completedList.appendChild(li);
          });
        }
      };

      renderLists();

      pendingContainer.appendChild(pendingList);
      completedContainer.appendChild(completedList);
      sections.appendChild(pendingContainer);
      sections.appendChild(completedContainer);
      div3.appendChild(sections);

      // --- Add new task handler ---
      addBtn.onclick = async () => {
        const newTask = input.value.trim();
        if (newTask) {
          TeacherData.Tasks.PendingTasks.push(newTask);
          input.value = "";

          await updateDoc(teacherRef, {
            "Tasks.PendingTasks": TeacherData.Tasks.PendingTasks,
          });

          renderLists();
        }
      };
    }




    renderTaskWidget()
    renderTaskProgress()
    renderTaskManager()
    renderCalendar()
    renderEventManager()
   
  }
  renderPendingTasks()


}
fetchAllContent()




document.addEventListener("DOMContentLoaded", function () {
  const openBtn = document.getElementById("open");
  const closeBtn = document.getElementById("close");
  const menuToggle = document.getElementById("menuToggle");
  const linkNames = document.querySelectorAll(".linkName");
 

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

