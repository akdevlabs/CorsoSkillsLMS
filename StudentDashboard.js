// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore, doc, getDoc, collection, addDoc, setDoc, Timestamp, deleteField, updateDoc   } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

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

const TBuInfo =  "CorsoSkills";  // Example variable (not used in the current code)
const UserUidInfo = localStorage.getItem("UserUidInfo");

console.log(UserUidInfo)



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




  function SetMainColors(){
    renderImage(data.BuLogos.Icons[0], "BuLogo", "Bulogos")
    setBodyBackgroundColor(Base)
    setBackgroundColor("#sidebar", Prime4)

  }
  function headerColors(){
    setTextColors("#Welcome", Prime5)
    setBackgroundColor("#Welcome", Prime3)
  }
  function SetMainColors(){
    renderImage(data.BuLogos.Icons[0], "BuLogo", "Bulogos")
    setBodyBackgroundColor(Prime4)
    setBackgroundColor("#sidebar", Prime5)

  }
  function MaintopColors(){
    setTextColors("#search-btn", Prime5)
    setBackgroundColor("#search-btn", Base)
    setTextColors("#Alert-Icons", Base)

  }
  function CalendarColors(){
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

 




  SideBarColors()
  SetMainColors()
  headerColors()
  MaintopColors()
  CalendarColors()
  TasksColors()




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
  function getNewestValue(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
      console.warn('Input is not a valid non-empty array.');
      return null;
    }
    return arr[arr.length - 1];
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

    return null; // Not found
  }

  function renderSlots(slots, limit = 5) {
    const container = document.getElementById("results");
    if (!container) return;
    container.innerHTML = '';

    const showMoreBtn = document.getElementById("show-more");
    const visibleSlots = slots.slice(0, limit);

    visibleSlots.forEach(slot => {
      const div = document.createElement("div");
      div.className = "slot-item";
      div.innerHTML = `
        <img src="${slot.CImg || 'https://via.placeholder.com/150'}" alt="${slot.Tittle || 'Curso'}" />
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

    // Show or hide the "Show More" button safely
    if (slots.length > limit) {
      if (showMoreBtn) {
        showMoreBtn.style.display = "flex";
        showMoreBtn.onclick = () => renderSlots(slots, slots.length);
      }
    } else {
      if (showMoreBtn) {
        showMoreBtn.style.display = "none";
        showMoreBtn.onclick = null;
      }
    }
  }

  function getAllSlotsByIds() {
    const slotsWithIds = getAllIds(studentData.Courses);
    const allResults = [];

    slotsWithIds.forEach(slot => {
      const foundCourse = findCourseById(businessData.Courses, slot.id);
      if (foundCourse) {
        allResults.push({
          ...slot,
          ...foundCourse
        });
      }
    });

    renderSlots(allResults);
    return allResults;
  }

  // Initial call to render slots
  getAllSlotsByIds();







  function renderStudentinfo(){
    let date = renderTodayInSpanish()
    renderImage(studentData.profileImg, "User image", "user-Img")
    renderText(date, "Date")
  }
  function renderStreak() {
    const Streak = getNewestValue(studentData.Streak); // Replace with dynamic logic later
    const totalCourses = countObjectItems(studentData.Courses);
    const progress = getHighestProgress(studentData.Courses);

    if (totalCourses === 0) {
      if (Streak === 1) {
        const welcome = `${businessData.Status.Start[0]}, ${studentData.ShortName}`;
        renderText(welcome, "Name");
        renderText(businessData.Status.Start[1], "Updates");
      } else if (Streak === 2) {
        const welcome = `${businessData.Status.Beginner[0]}, ${studentData.ShortName}`;
        renderText(welcome, "Name");
        renderText(businessData.Status.Beginner[1], "Updates");
      } else if (Streak === 3) {
        const welcome = `${businessData.Status.Intro[0]}, ${studentData.ShortName}`;
        renderText(welcome, "Name");
        renderText(businessData.Status.Intro[1], "Updates");
      }
    } else {
      if (totalCourses <= 3) {
        if (progress <= 10) {
          const welcome = `${businessData.Status.Review[0]}, ${studentData.ShortName}`;
          renderText(welcome, "Name");
          renderText(businessData.Status.Review[1], "Updates");
        } else if (progress <= 20) {
          const welcome = `${businessData.Status.Twenty[0]}, ${studentData.ShortName}`;
          renderText(welcome, "Name");
          renderText(businessData.Status.Twenty[1], "Updates");
        } else if (progress <= 50) {
          const welcome = `${businessData.Status.Fifty[0]}, ${studentData.ShortName}`;
          renderText(welcome, "Name");
          renderText(businessData.Status.Fifty[1], "Updates");
        } else if (progress <= 80) {
          const welcome = `${businessData.Status.Eighty[0]}, ${studentData.ShortName}`;
          renderText(welcome, "Name");
          renderText(businessData.Status.Eighty[1], "Updates");
        }else{
          const welcome = `${businessData.Status.End1[0]}, ${studentData.ShortName}`;
          renderText(welcome, "Name");
          renderText(businessData.Status.End1[1], "Updates");          
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




  renderClander();
  renderStudentinfo()
  renderStreak()
  renderTask()




}

// Run the fetch
fetchAllContent()


document.addEventListener("DOMContentLoaded", () => {
  const closeBtn = document.querySelector(".close-btn");
  const modal = document.getElementById("taskModal");

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }
});
document.getElementById("Home").addEventListener("click", function () {
  window.location.href = "index10.html";
});
document.getElementById("Books").addEventListener("click", function () {
  window.location.href = "index10.1.html";
});
document.getElementById("Videos").addEventListener("click", function () {
  window.location.href = "index10.2.html";
});
document.getElementById("Trophy").addEventListener("click", function () {
  window.location.href = "index10.3.html";
});
document.getElementById("profile").addEventListener("click", function () {
  window.location.href = "index10.4.html";
});   
document.getElementById("carrer").addEventListener("click", function () {
  window.location.href = "index10.5.html";
});
document.getElementById("Settings").addEventListener("click", function () {
  window.location.href = "index10.6.html";
}); 
document.getElementById("Logout").addEventListener("click", function () {
  window.location.href = "index4.html";
});  





















 document.addEventListener("DOMContentLoaded", function () {
    const openBtn = document.getElementById("open");
    const closeBtn = document.getElementById("close");
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

    openBtn.addEventListener("click", showSidebarText);
    closeBtn.addEventListener("click", hideSidebarText);

    // Initial state: hide all link names, show open button only
    hideSidebarText();
 });