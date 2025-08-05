// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore, doc, getDoc, collection, addDoc, setDoc, Timestamp, deleteField, updateDoc   } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2w5sXCGRBxne-23FRCTAXQrMwHt4nHTY",
  authDomain: "corsoskills-1ba50.firebaseapp.com",
  projectId: "corsoskills-1ba50",
  storageBucket: "corsoskills-1ba50.appspot.com", // corrected to .com
  messagingSenderId: "813928863826",
  appId: "1:813928863826:web:771cd8ad820570441fa78b",
  measurementId: "G-MYT63ZNNCC"
};

// First, make sure you already have this part:
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();


const TBuInfo =  "CorsoSkills";  // Example variable (not used in the current code)
const UserUidInfo = localStorage.getItem("UserUidInfo");


  const isLoggedIn = localStorage.getItem("ActiveLogedin");
  const userRole = localStorage.getItem("UserRole");
  const userUid = localStorage.getItem("UserUidInfo");

onAuthStateChanged(auth, (user) => {

  if (user && isLoggedIn === "true") {
    console.log("Usuario autenticado:", user.email);
    console.log("Rol:", userRole);
    console.log("UID:", userUid);


  } else {
    console.log("Usuario no autenticado. Redirigiendo al login...");
    window.location.href = "index4.html";
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
  function setBackgroundColor(selector, backgroundColor) {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      elements.forEach(element => {
        element.style.backgroundColor = backgroundColor;
      });
    } else {
      console.error(`No elements found for selector '${selector}'.`);
    }
  }
  function setTextColors(selector, Tcolor) {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      elements.forEach(element => {
        element.style.color = Tcolor;
      });
    } else {
      console.error(`No elements found for selector '${selector}'.`);
    }
  }
  function setGlobalFont(fontFamily) {
    document.body.style.fontFamily = fontFamily;
  }
  setGlobalFont(data.Font)
  


  function SideBarColors(){
        const style = document.createElement('style');
    style.textContent = `
      .Side-Btns i{
        color: ${Base}
      }
      .linkName{
        color: ${Base}
      }

      .Side-Btns i:hover {
        color: ${Prime2}
      }
      .Side-caret i{
        color: ${Base}
      }

    `;
    document.head.appendChild(style);

  }




  function headerColors(){
    setTextColors("#Welcome", Prime5)
    setBackgroundColor("#Welcome", Prime3)
    setBackgroundColor("#C-Progress", Prime5)
    setBackgroundColor("#New-Course-Tittle", Prime5)
  }
  function SetMainColors(){
    renderImage(data.BuLogos.Icons[0], "BuLogo", "Bulogos")
    setBodyBackgroundColor(Prime4)
    setBackgroundColor("#sidebar", Prime5)
    setBackgroundColor("#calendar-container", Prime5)
  }
  function MaintopColors(){

    setTextColors("#Alert-Icons", Base)

  }
  function CalendarColors(){
    setTextColors("#Calander-Tittle", Base)
    const style = document.createElement('style');
    style.textContent = `
      .calendar-container {
        background: ${Prime5};
      }
      .calendar{ 
        background: ${Prime4};
      }
      .day-name {
        color: ${Prime3};
      }
      .day {
        background: ${Prime5};
        color: ${Prime1};
      }
      .day.active {
        background: ${Prime3};
        color:${Prime5};
      }
      .day.marked {
        background: ${Prime5};
        color:  ${Prime2};
        font-weight: bold;
        cursor: pointer;
      }
    `;
    document.head.appendChild(style);
  }
  function TasksColors(){
    const style = document.createElement('style');
    style.textContent = `
    .task-card {
      background-color: ${Prime5};
    }
    .task-card:hover {
      border-color:${Prime2};
    }
    .task-card h3 {
      color:${Base};
    }
    .task-card p {
      color: ${Prime};
    }
    .Task-Tittle{
      color:${Base};
    }
    .show-all-btn {
      color:${Prime5};
      background-color: ${Base};
    }
    .show-all-btn:hover {
      background-color:${Prime2};
    }
    .modal-content {
      background-color: ${Prime5};
    }
    `;
    document.head.appendChild(style);
  }
  function CoursesColors(){
    setTextColors("#C-Progress", Base)
    const style = document.createElement('style');
    style.textContent = `
      .slot-item {
        background: ${Prime5};
      }
      .slot-title {
        color:${Base};
      }
      .slot-prof {
        color:${Prime};
      }
      .progress-bar {
        background: ${Prime1};
      }
      .progress-bar-fill {
        background: ${Prime2};
      }
      .progress-info {
        color: ${Prime};
      }
      .course-Btns {
        color: ${Prime5};
        background: ${Base};
      }
      .course-Btns:hover { 
        color: ${Prime5};
        background: ${Prime2};
      }

    `;
    document.head.appendChild(style);
  }
  function NewCoursesColors(){
    setTextColors("#New-Course-Tittle", Base)
    const style = document.createElement('style');
    style.textContent = `
      .custom-carousel-btn {
        color: ${Prime5};
        background: ${Base};
      }
      .custom-carousel-btn:hover {
        color: ${Prime5};
        background: ${Prime2};
      }
      .custom-course-card {
        background-color:${Prime5};
      }
      .custom-course-title {
        color:${Base};
      }
      .custom-course-instructor {
       color:${Prime};
      }
      .custom-progress-bar {
       background: ${Prime1};
      }
      .custom-progress-fill {
        background: ${Prime2};
      }
      .custom-progress-info {
        color:${Prime};
      }
    `;
    document.head.appendChild(style); 
  }


  
 




  SideBarColors()
  SetMainColors()
  headerColors()
  MaintopColors()
  CalendarColors()
  TasksColors()
  CoursesColors()
  NewCoursesColors()


});




async function getstudentContent() {
  try {
    const docRef = doc(db, "CorsoSkillsStudents", UserUidInfo);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.error("No such student document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching student document:", error);
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
  const studentData = await getstudentContent();
  const businessData = await getCorsoSkillAppContent();

  if (studentData) {
    console.log("Student Document Data:", studentData);
  } else {
    console.log("No student data found.");
    return;
  }

  if (businessData) {
    console.log("Business Document Data:", businessData);
  } else {
    console.log("No business data found.");
  }
 const ref = doc(db, "CorsoSkillsStudents", UserUidInfo);

  const tasksToDelete = {};
  for (const taskKey in studentData.Tasks) {
    if (studentData.Tasks[taskKey].Status === true) {
      tasksToDelete[`Tasks.${taskKey}`] = deleteField();
    }
  }

  if (Object.keys(tasksToDelete).length > 0) {
    await updateDoc(ref, tasksToDelete);
    console.log("Tareas con status true eliminadas.");
    // ⚠️ Recargar datos actualizados
    const updatedStudentData = await getstudentContent();
    renderTasks(updatedStudentData.Tasks);
  } else {
    renderTasks(studentData.Tasks);
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
  function renderText(text, elementId) {
    const element = document.getElementById(elementId);

    if (element) {
      element.textContent = text;
    } else {
      console.error(`Element with ID "${elementId}" not found.`);
    }
  }
  function setBackgroundColor(elementId, backgroundColor) {
    const element = document.getElementById(elementId);
    if (element) {
      element.style.backgroundColor = backgroundColor;
    } else {
      console.error(`Element with ID '${elementId}' not found.`);
    }
  }
  function renderTodayInSpanish() {
    const today = new Date();

    const days = [
      "domingo", "lunes", "martes", "miércoles",
      "jueves", "viernes", "sábado"
    ];

    const months = [
      "enero", "febrero", "marzo", "abril",
      "mayo", "junio", "julio", "agosto",
      "septiembre", "octubre", "noviembre", "diciembre"
    ];

    const dayName = days[today.getDay()];
    const day = today.getDate();
    const month = months[today.getMonth()];

    return `${day} de ${month}, ${dayName}`;
  }
  function countObjectItems(obj) {
    if (typeof obj !== 'object' || obj === null) {
      console.warn('Input is not a valid object.');
      return 0;
    }
    return Object.keys(obj).length;
  }
  function getHighestProgress(coursesObj) {
    if (typeof coursesObj !== 'object' || coursesObj === null) {
      console.warn('Courses is not a valid object.');
      return 0;
    }

    let highestProgress = 0;

    Object.keys(coursesObj).forEach(key => {
      const slot = coursesObj[key];
      if (slot && typeof slot.progress === 'number') {
        if (slot.progress > highestProgress) {
          highestProgress = slot.progress;
        }
      }
    });

    return highestProgress;
  }
  function renderTasks(tasksObject) {
    const tasksArray = Object.entries(tasksObject);

    // Ordenar por número (T1, T2, ...)
    tasksArray.sort((a, b) => {
      const numA = parseInt(a[0].replace("T", ""));
      const numB = parseInt(b[0].replace("T", ""));
      return numA - numB;
    });

    const selectedTasks = tasksArray.slice(-2); // Últimas 4

    const container = document.getElementById("taskContainer");
    container.innerHTML = "";

    selectedTasks.forEach(([key, task]) => {
      const taskCard = document.createElement("div");
      taskCard.className = "task-card";
      taskCard.innerHTML = `
        <h3>${task.Tittle}</h3>
        <p><strong>Descripción:</strong> ${task.Description}</p>
        <p><strong>Reglas:</strong> ${task.Rules}</p>
      `;
      container.appendChild(taskCard);
    });

    const showAllBtn = document.createElement("button");
    showAllBtn.textContent = "Ver todas las tareas";
    showAllBtn.className = "show-all-btn";
    showAllBtn.onclick = () => renderAllTasksInModal(tasksObject);
    container.appendChild(showAllBtn);
  }
  function renderAllTasksInModal(tasksObject) {
    const tasksArray = Object.entries(tasksObject);

    tasksArray.sort((a, b) => {
      const numA = parseInt(a[0].replace("T", ""));
      const numB = parseInt(b[0].replace("T", ""));
      return numA - numB;
    });

    const modalContent = document.getElementById("modalContent");
    modalContent.innerHTML = "";

    tasksArray.forEach(([key, task]) => {
      const taskCard = document.createElement("div");
      taskCard.className = "task-card";
      taskCard.innerHTML = `
        <h3>${task.Tittle}</h3>
        <p><strong>Descripción:</strong> ${task.Description}</p>
        <p><strong>Reglas:</strong> ${task.Rules}</p>
      `;
      modalContent.appendChild(taskCard);
    });

    document.getElementById("taskModal").style.display = "block";
  }
  function getNewestValue(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
      console.warn('studentData.Streak is not a valid non-empty array.');
      return 0; // Valor por defecto si no hay streak
    }
    return arr[arr.length - 1];
  }








renderStreak()








  function renderStudentinfo(){
    let date = renderTodayInSpanish()
    renderImage(studentData.profileImage, "User image", "user-Img")
    renderText(date, "Date")
  }
  function renderStreak() {
    const Streak =studentData?.Streak;
    const totalCourses = countObjectItems(studentData?.Courses);
    const progress = getHighestProgress(studentData?.Courses);

    const name = studentData?.ShortName || "Estudiante";
    const status = businessData?.Status || {};

    // Asegúrate que cada categoría tenga al menos 2 elementos
    const safeText = (section) => {
      const messages = status?.[section];
      return Array.isArray(messages) && messages.length >= 2 ? messages : ["¡Hola!", "Sigue aprendiendo."];
    };

    if (totalCourses === 0) {
      if (Streak === 1) {
        const [title, update] = safeText("Start");
        renderText(`${title}, ${name}`, "Name");
        renderText(update, "Updates");
      } else if (Streak === 2) {
        const [title, update] = safeText("Beginner");
        renderText(`${title}, ${name}`, "Name");
        renderText(update, "Updates");
      } else if (Streak === 3) {
        const [title, update] = safeText("Intro");
        renderText(`${title}, ${name}`, "Name");
        renderText(update, "Updates");
      }
    } else {
      if (totalCourses <=13) {
        if (progress <= 10) {
          const [title, update] = safeText("Review");
          renderText(`${title}, ${name}`, "Name");
          renderText(update, "Updates");
        } else if (progress <= 20) {
          const [title, update] = safeText("Twenty");
          renderText(`${title}, ${name}`, "Name");
          renderText(update, "Updates");
        } else if (progress <= 50) {
          const [title, update] = safeText("Fifty");
          renderText(`${title}, ${name}`, "Name");
          renderText(update, "Updates");
        } else if (progress <= 80) {
          const [title, update] = safeText("Eighty");
          renderText(`${title}, ${name}`, "Name");
          renderText(update, "Updates");
        } else {
          const [title, update] = safeText("End1");
          renderText(`${title}, ${name}`, "Name");
          renderText(update, "Updates");
        }
      }
    }
  }
  function renderClander() {
    if (!studentData || !studentData.Calendar) {
      console.error("studentData.Calendar is not defined");
      return;
    }

    const calendarEvents = studentData.Calendar;

    const monthNames = {
      enero: 0, febrero: 1, marzo: 2, abril: 3,
      mayo: 4, junio: 5, julio: 6, agosto: 7,
      septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11
    };

    const weekdays = ['L', 'M', 'X', 'J', 'V', 'S', 'D']; // Start on Monday

    const monthNameEl = document.getElementById('month-name');
    const calendarGrid = document.getElementById('calendar-grid');
    const prevBtn = document.getElementById('prev-month');
    const nextBtn = document.getElementById('next-month');

    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    function parseSpanishDate(dateStr) {
      const parts = dateStr.toLowerCase().split(' de ');
      if (parts.length !== 3) return null;
      const [dayStr, monthName, yearStr] = parts;
      const day = parseInt(dayStr);
      const year = parseInt(yearStr);
      const month = monthNames[monthName];
      if (isNaN(day) || isNaN(year) || month === undefined) return null;
      return new Date(year, month, day);
    }

    function getEventsByMonth(month, year) {
      const events = {};
      for (const key in calendarEvents) {
        const event = calendarEvents[key];
        const date = parseSpanishDate(event.Date);
        if (date && date.getMonth() === month && date.getFullYear() === year) {
          const keyStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
          events[keyStr] = event;
        }
      }
      return events;
    }

    function renderCalendar(month, year) {
      calendarGrid.innerHTML = '';
      const events = getEventsByMonth(month, year);

      weekdays.forEach(day => {
        const el = document.createElement('div');
        el.className = 'day-name';
        el.textContent = day;
        calendarGrid.appendChild(el);
      });

      const firstDay = new Date(year, month, 1).getDay();
      const firstWeekday = (firstDay + 6) % 7; // Adjust so Monday = 0

      const daysInMonth = new Date(year, month + 1, 0).getDate();

      for (let i = 0; i < firstWeekday; i++) {
        const blank = document.createElement('div');
        blank.className = 'day';
        calendarGrid.appendChild(blank);
      }

      for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayEl = document.createElement('div');
        dayEl.className = 'day';
        dayEl.textContent = day;

        if (
          day === today.getDate() &&
          month === today.getMonth() &&
          year === today.getFullYear()
        ) {
          dayEl.classList.add('active');
        }

        if (events[dateStr]) {
          dayEl.classList.add('marked');
          dayEl.title = events[dateStr].Tittle;
          dayEl.addEventListener('click', () => {
            alert(
              `📌 ${events[dateStr].Tittle}\n📅 ${events[dateStr].Date}\n📂 ${events[dateStr].Tipo}\n🎯 ${events[dateStr].Objetivo || "—"}\n📝 ${events[dateStr].Descripción}`
            );
          });
        }

        calendarGrid.appendChild(dayEl);
      }

      monthNameEl.textContent = new Date(year, month).toLocaleString('es-MX', {
        month: 'long',
        year: 'numeric'
      });
    }

    prevBtn.addEventListener('click', () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderCalendar(currentMonth, currentYear);
    });

    nextBtn.addEventListener('click', () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      renderCalendar(currentMonth, currentYear);
    });

    renderCalendar(currentMonth, currentYear);
  }
  function renderTask(){
    const Tasks = studentData.Tasks
    renderTasks(Tasks)
  }
  function renderCourses() {
    let limit = 4; // Default
    let currentStart = 0;
    let allResults = [];

    // ✅ Responsive limit based on screen width
    if (window.innerWidth <= 825) {
      limit = 2;
    } else if (window.innerWidth <= 1208) {
      limit = 3;
    } else {
      limit = 4;
    }

    function getAllIds(data) {
      const ids = [];
      if (typeof data !== 'object' || data === null) {
        console.warn('Input is not a valid object.');
        return ids;
      }

      for (const key in data) {
        if (data[key] && typeof data[key] === 'object' && 'Id' in data[key]) {
          ids.push({ id: data[key].Id, slotName: key, progress: data[key].progress });
        }
      }
      return ids;
    }

    function findCourseById(data, targetId) {
      if (typeof data !== 'object' || data === null) {
        console.warn('Input is not a valid object.');
        return null;
      }

      for (const categoryKey in data) {
        const category = data[categoryKey];
        if (typeof category === 'object') {
          for (const levelKey in category) {
            const level = category[levelKey];
            if (typeof level === 'object') {
              for (const courseKey in level) {
                const course = level[courseKey];
                if (
                  typeof course === 'object' &&
                  course !== null &&
                  'Id' in course &&
                  course.Id === targetId
                ) {
                  return {
                    category: categoryKey,
                    level: levelKey,
                    courseKey: courseKey,
                    ...course
                  };
                }
              }
            }
          }
        }
      }

      return null;
    }

    function renderSlots(slots) {
      const container = document.getElementById("results");
      if (!container) return;
      container.innerHTML = '';

      const end = Math.min(currentStart + limit, slots.length);
      const visibleSlots = slots.slice(currentStart, end);

      visibleSlots.forEach(slot => {
        const div = document.createElement("div");
        div.className = "slot-item";
        div.style.cursor = "pointer";

        div.onclick = () => {
  
          localStorage.setItem("selectedCourseId", (slot.Id));
          localStorage.setItem("selectedCourse", JSON.stringify(slot));
          console.log(slot)
        window.location.href = "index10.7.html";
        };

        div.innerHTML = `
          <img src="${slot.CImg}" alt="${slot.Tittle || 'Curso'}" />
          <div class="slot-title">${slot.Tittle || 'Sin título'}</div>
          <div class="slot-prof">Prof. CorsoSkills</div>
          <div class="progress-container">
            <div class="progress-bar">
              <div class="progress-bar-fill" style="width: ${slot.progress}%"></div>
            </div>
            <div class="progress-info">
              <span>Lecciones: 3</span>
              <span>${slot.progress}%</span>
            </div>
          </div>
        `;
        container.appendChild(div);
      });

      updateNavigationButtons(slots.length);
    }

    function updateNavigationButtons(total) {
      const leftBtn = document.getElementById("Course-left-btn");
      const rightBtn = document.getElementById("Course-right-btn");

      if (leftBtn) {
        leftBtn.style.display = currentStart > 0 ? "flex" : "none";
        leftBtn.onclick = () => {
          currentStart = Math.max(0, currentStart - limit);
          renderSlots(allResults);
        };
      }

      if (rightBtn) {
        rightBtn.style.display = (currentStart + limit) < total ? "flex" : "none";
        rightBtn.onclick = () => {
          if ((currentStart + limit) < total) {
            currentStart += limit;
            renderSlots(allResults);
          }
        };
      }
    }

    function getAllSlotsByIds() {
      const slotsWithIds = getAllIds(studentData.Courses);
      allResults = [];

      slotsWithIds.forEach(slot => {
        const foundCourse = findCourseById(businessData.Courses, slot.id);
        if (foundCourse) {
          allResults.push({
            ...slot,
            ...foundCourse
          });
        }
      });

      allResults.sort((a, b) => b.progress - a.progress);

      renderSlots(allResults);
      return allResults;
    }

    // Start rendering
    getAllSlotsByIds();
  }






function newCourses() {
  let currentStart = 0;
  let limit = 4; // Default
  let currentSlots = [];

  function getActiveCourses(coursesObj) {
    const activeCourses = [];

    if (typeof coursesObj !== 'object' || coursesObj === null) {
      console.warn('Courses object is not valid:', coursesObj);
      return activeCourses;
    }

    for (const category in coursesObj) {
      const categoryData = coursesObj[category];
      if (typeof categoryData !== 'object') continue;

      for (const sub in categoryData) {
        const subCategoryData = categoryData[sub];
        if (typeof subCategoryData === 'object') {
          for (const courseKey in subCategoryData) {
            const course = subCategoryData[courseKey];
            if (
              course &&
              typeof course === 'object' &&
              course.Status === true &&
              course.Id
            ) {
              if (!course.progress) course.progress = 0;
              activeCourses.push(course);
            }
          }
        }
      }
    }

    return activeCourses;
  }





  
  function renderSlots(slots) {
    const container = document.getElementById("custom-course-carousel");
    if (!container) return;

    container.innerHTML = '';
    const end = Math.min(currentStart + limit, slots.length);
    const visibleSlots = slots.slice(currentStart, end);

    visibleSlots.forEach(slot => {
      const div = document.createElement("div");
      div.className = "custom-course-card";
      div.style.cursor = "pointer";

      div.onclick = () => {
        localStorage.setItem("selectedCourse", JSON.stringify(slot));
        localStorage.setItem("selectedCourseId", (slot.Id));
        window.location.href = "index10.7.html";
      };

      div.innerHTML = `
        <img src="${slot.CImg || ''}" alt="${slot.Tittle || 'Curso'}" />
        <div class="custom-course-title">${slot.Tittle || 'Sin título'}</div>
        <div class="custom-course-instructor">Prof. CorsoSkills</div>
        <div class="custom-progress-container">
          <div class="custom-progress-bar">
            <div class="custom-progress-fill" style="width: ${slot.progress || 0}%"></div>
          </div>
          <div class="custom-progress-info">
            <span>Lecciones: 3</span>
            <span>${slot.progress || 0}%</span>
          </div>
        </div>
      `;
      container.appendChild(div);
    });

    updateNavigationButtons(slots.length);
  }





  function updateNavigationButtons(totalSlots) {
    const leftBtn = document.getElementById("custom-carousel-left");
    const rightBtn = document.getElementById("custom-carousel-right");

    if (!leftBtn || !rightBtn) return;

    leftBtn.style.visibility = currentStart > 0 ? "visible" : "hidden";
    rightBtn.style.visibility = currentStart + limit < totalSlots ? "visible" : "hidden";
  }

  function setupNavigationButtons() {
    const leftBtn = document.getElementById("custom-carousel-left");
    const rightBtn = document.getElementById("custom-carousel-right");

    if (leftBtn) {
      leftBtn.addEventListener("click", () => {
        if (currentStart - limit >= 0) {
          currentStart -= limit;
          renderSlots(currentSlots);
        }
      });
    }

    if (rightBtn) {
      rightBtn.addEventListener("click", () => {
        if (currentStart + limit < currentSlots.length) {
          currentStart += limit;
          renderSlots(currentSlots);
        }
      });
    }
  }

  function init() {
    // ✅ Responsive limit based on screen width
    if (window.innerWidth <= 825) {
      limit = 2;
    } else if (window.innerWidth <= 1208) {
      limit = 3;
    } else {
      limit = 4;
    }

    if (typeof businessData === 'object' && businessData?.Courses) {
      currentSlots = getActiveCourses(businessData.Courses);
      currentStart = 0;
      setupNavigationButtons();
      renderSlots(currentSlots);
    } else {
      console.warn("⚠️ businessData.Courses is not defined or invalid.");
    }
  }

  init();
}


function renderWeekCalendar() {
  if (!studentData || !studentData.Calendar) {
    console.error("studentData.Calendar is not defined");
    return;
  }

  const calendarEvents = studentData.Calendar;
  const monthNames = {
    enero: 0, febrero: 1, marzo: 2, abril: 3,
    mayo: 4, junio: 5, julio: 6, agosto: 7,
    septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11
  };

  const weekdaysShort = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  const weekGrid = document.getElementById('week-grid');
  const weekRangeEl = document.getElementById('week-range');
  const prevBtn = document.getElementById('prev-week');
  const nextBtn = document.getElementById('next-week');

  function parseSpanishDate(dateStr) {
    const parts = dateStr.toLowerCase().split(' de ');
    if (parts.length !== 3) return null;
    const [dayStr, monthName, yearStr] = parts;
    const day = parseInt(dayStr);
    const year = parseInt(yearStr);
    const month = monthNames[monthName];
    if (isNaN(day) || isNaN(year) || month === undefined) return null;
    return new Date(year, month, day);
  }

  const allEvents = {};
  for (const key in calendarEvents) {
    const event = calendarEvents[key];
    const date = parseSpanishDate(event.Date);
    if (date) {
      const keyStr = date.toISOString().split('T')[0];
      allEvents[keyStr] = event;
    }
  }

  let baseDate = new Date();

  function getStartOfWeek(date) {
    const day = (date.getDay() + 6) % 7; // make Monday = 0
    const start = new Date(date);
    start.setDate(date.getDate() - day);
    return start;
  }

  function renderWeek(date) {
    weekGrid.innerHTML = '';
    const startOfWeek = getStartOfWeek(date);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);

    const rangeText = `${startOfWeek.getDate()} ${startOfWeek.toLocaleString('es-MX', { month: 'short' })} - ${endOfWeek.getDate()} ${endOfWeek.toLocaleString('es-MX', { month: 'short' })}`;
    weekRangeEl.textContent = `Semana: ${rangeText}`;

    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(startOfWeek);
      dayDate.setDate(startOfWeek.getDate() + i);
      const dayStr = dayDate.toISOString().split('T')[0];

      const dayBox = document.createElement('div');
      dayBox.className = 'day-box';
      dayBox.textContent = `${weekdaysShort[i]}\n${dayDate.getDate()}`;

      if (
        dayDate.toDateString() === new Date().toDateString()
      ) {
        dayBox.classList.add('active');
      }

      if (allEvents[dayStr]) {
        dayBox.classList.add('marked');
        dayBox.title = allEvents[dayStr].Tittle;
        dayBox.addEventListener('click', () => {
          alert(
            `📌 ${allEvents[dayStr].Tittle}\n📅 ${allEvents[dayStr].Date}\n📂 ${allEvents[dayStr].Tipo}\n🎯 ${allEvents[dayStr].Objetivo || "—"}\n📝 ${allEvents[dayStr].Descripción}`
          );
        });
      }

      weekGrid.appendChild(dayBox);
    }
  }

  prevBtn.addEventListener('click', () => {
    baseDate.setDate(baseDate.getDate() - 7);
    renderWeek(baseDate);
  });

  nextBtn.addEventListener('click', () => {
    baseDate.setDate(baseDate.getDate() + 7);
    renderWeek(baseDate);
  });

  renderWeek(baseDate);
}


renderWeekCalendar()
newCourses();







  renderClander();
  renderStudentinfo()

  renderTask()
  renderCourses()


}

// Run the fetch
fetchAllContent()

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
  const closeBtn = document.querySelector(".close-btn");
  const modal = document.getElementById("taskModal");

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }
});



document.getElementById("Books").addEventListener("click", function () {
  window.location.href = "index10.1.html";
});
document.getElementById("Videos").addEventListener("click", function () {
  window.location.href = "index10.2.html";
});
document.getElementById("Classroom").addEventListener("click", function () {
  window.location.href = "index10.7.html";
});
document.getElementById("Trophy").addEventListener("click", function () {
  window.location.href = "index10.3.html";
});
document.getElementById("Multi-User").addEventListener("click", function () {
  window.location.href = "index10.4.html";
});
document.getElementById("carrer").addEventListener("click", function () {
  window.location.href = "index10.5.html";
});


document.getElementById("Settings").addEventListener("click", function () {
  window.location.href = "index10.6.html";
}); 
document.getElementById("profile").addEventListener("click", function () {
  window.location.href = "index10.4.html";
});   
document.getElementById("Logout").addEventListener("click", function () {
  // Clear localStorage (optional: also clear sessionStorage if used)
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "index4.html";
});




document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const toggle = document.getElementById("menuToggle");
  const closeBtn = document.getElementById("Mobile-closeBtn");
  const linkNames = document.querySelectorAll(".linkName");
  const openCBtn = document.getElementById("open");
  const closeCBtn = document.getElementById("close");

  const openSidebar = () => {
    sidebar.classList.add("active");
    overlay.classList.add("active");
    toggle.style.display = "none"; // Hide toggle button
    linkNames.forEach(el => el.style.display = "inline");
    openCBtn.style.display = "none";
    closeCBtn.style.display = "none";
  };

  const closeSidebar = () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    toggle.style.display = "block"; // Show toggle button again
  };

  toggle.addEventListener("click", openSidebar);
  closeBtn.addEventListener("click", closeSidebar);
  overlay.addEventListener("click", closeSidebar);
});

