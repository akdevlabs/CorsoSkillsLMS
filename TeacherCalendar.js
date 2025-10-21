// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore, doc, getDoc, collection, addDoc, setDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

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
  const {Base, Prime,Prime1, Prime2, Prime3, Prime4, Prime5} = data.BuColors.Colors;
  
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
  function setPendingTasksBlock(){
    setallBackgroundColor(".Pending-Tasks-Block", Prime5)
    setTextColors( ".PTB-Tittle", Base) 
    setTextColors( "#Pending-Tasks", Base) 
    setallBackgroundColor(".Alerts", Prime4)
    setTextColors( ".Alerts", Prime) 
  }
  function setProgressBlock(){
    setallBackgroundColor(".Progress-Block", Prime5)
    setTextColors( ".Progress-Block", Base)
  }
  function setcircularprogressColors() {
    const style = document.createElement("style");
    style.textContent = `
      .circular-progress {
        background: conic-gradient(
          ${Base} 0deg,
          ${Prime3} var(--progress),
          ${Prime5} var(--progress)
        );
        color:${Base};

      }  
      .circular-progress::before {
        background: ${Prime5};
      }
    `;
    document.head.appendChild(style);
  }
  function setcalendarColors() {
    const style = document.createElement("style");
    style.textContent = `
      .calendar {
        color:${Prime};
        background: ${Prime5};

      }
      .day-name {
        color: ${Base};
      }
      .day {
        border: 1px solid ${Prime1};
      }
      .attendance {
        color:${Base};
      }
      .today {
        background: ${Prime2};
        color: ${Prime5};
      }

    `;
    document.head.appendChild(style);
  }
  function setTaskBlock(){
    setallBackgroundColor(".Tasks-Block", Prime5)
    setTextColors(".Tasks-Block", Base)
   
  }
  function setActiveCalanderColors() {
    const style = document.createElement("style");
    style.textContent = `
      .calendar-day {
        background: ${Prime4};
        color: ${Prime};
      }
      .calendar-day .day-name {
        color: ${Prime};
      }
      .calendar-day.today {
        border: 4px solid ${Prime2};
        color: ${Prime2};
      }
    `;
    document.head.appendChild(style);
  }
  function setTaskBtnsColors(){
    setTextColors(".Calander-Btns", Prime5)
    setallBackgroundColor(".Calander-Btns", Base)
  }
  function setAEBColors() {
    setTextColors("#Plus", Prime2)
    const style = document.createElement("style");
    style.textContent = `
      .calendar-day {
        background: ${Prime4};
        color: ${Prime};
      }
      #time-box{
        color: ${Prime5};
        background-color:${Prime2};
      }
      .Add-Btn{
        color: ${Prime2};
        border: 6px solid ${Prime2};
      }
      .fa-square-plus{
        color: ${Prime5};
      }
    `;
    document.head.appendChild(style);
  }







  
  setGlobalFont(data.Font)
  SetUserInfoColors()
  SetMainColors()
  sidebarcolors()
  setPendingTasksBlock()
  setProgressBlock()
  setcircularprogressColors()
  setcalendarColors()
  setTaskBlock()
  setActiveCalanderColors()
  setTaskBtnsColors()
  setAEBColors()








});












function renderWeeklyCalendar() {
    const container = document.getElementById("Active-Calander");
    container.innerHTML = ""; // clear old content

    const today = new Date();
    const todayDay = today.getDay(); // 0=Sunday, 1=Monday...
    const startOfWeek = new Date(today);

    // Adjust start to current week's Monday
    const diff = (todayDay === 0 ? -6 : 1) - todayDay;
    startOfWeek.setDate(today.getDate() + diff);

    const daysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);

      const dayDiv = document.createElement("div");
      dayDiv.className = "calendar-day";

      const dayName = daysShort[i];
      const dayNum = day.getDate();

      dayDiv.innerHTML = `
        <div class="day-name">${dayName}</div>
        <div class="day-num">${dayNum}</div>
      `;

      // Highlight today
      if (
        day.getDate() === today.getDate() &&
        day.getMonth() === today.getMonth() &&
        day.getFullYear() === today.getFullYear()
      ) {
        dayDiv.classList.add("today");
      }

      container.appendChild(dayDiv);
    }
}
const attendanceData = {
    "2025-09-01": "5/6",
    "2025-09-02": "6/6",
    "2025-09-03": "4/6",
    "2025-09-05": "Asistencia: 3/6",
    "2025-09-10": "6/6"
};
function renderCalendar() {
    const grid = document.getElementById("calendar-grid");
    const header = document.getElementById("calendar-header");

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const currentDay = today.getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const monthNames = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

    // Mostrar cabecera
    header.textContent = `${monthNames[month]} ${year}`;

    // Nombres de días
    grid.innerHTML = "";
    dayNames.forEach(day => {
      const div = document.createElement("div");
      div.classList.add("day-name");
      div.textContent = day;
      grid.appendChild(div);
    });

    // Espacios vacíos antes del primer día
    for (let i = 0; i < firstDay; i++) {
      grid.appendChild(document.createElement("div"));
    }

    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const div = document.createElement("div");
      div.classList.add("day");

      const number = document.createElement("span");
      number.textContent = day;
      div.appendChild(number);

      if (attendanceData[dateKey]) {
        const att = document.createElement("div");
        att.classList.add("attendance");
        att.textContent = attendanceData[dateKey];
        div.appendChild(att);
      }

      // Resaltar hoy
      if (day === currentDay) {
        div.classList.add("today");
        div.addEventListener("click", () => {
          alert(`📅 Hoy es ${day} de ${monthNames[month]} ${year}`);
        });
      }

      grid.appendChild(div);
    }
}
function renderTimeBox() {
    const now = new Date();
    let hours = now.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 becomes 12

    const box = document.getElementById("time-box");
    box.innerHTML = `
      <div class="time-hour">${hours}</div>
      <div class="time-ampm">${ampm}</div>
    `;
}


renderTimeBox();
setInterval(renderTimeBox, 60000);
renderWeeklyCalendar();
renderCalendar();
renderWeeklyCalendar();




























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
  let Base, Prime1, Prime2, Prime3, Prime4, Prime5;
  if (businessData?.BuColors?.Colors) {
    ({ Base, Prime1, Prime2, Prime3, Prime4, Prime5 } = businessData.BuColors.Colors);
  }

  // helper: render text inside an element
  function renderText(text, elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = text;
    } else {
      console.error(`Element with ID "${elementId}" not found.`);
    }
  }
  function setCircularProgress(percent) {
    const progressEl = document.getElementById("progress");
    const progressText = document.getElementById("progress-text");

    // Convert percentage to degrees (360° = 100%)
    const degrees = (percent / 100) * 360;

    // Update CSS variable
    progressEl.style.setProperty("--progress", degrees + "deg");

    // Update text
    progressText.textContent = percent + "%";
  }
  // render welcome with teacher name
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



  // PENDING

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
  function RenderPendingTasks(){
    const TaskAmount = 1
    renderText(TaskAmount,"Pending-Tasks")

    function renderRiskColor(value, colorId, labelId) {
      const colorElement = document.getElementById(colorId);
      const labelElement = document.getElementById(labelId);

      if (!colorElement || !labelElement) {
        console.error("No se encontraron los elementos necesarios.");
        return;
      }

      let color = "gray";
      let label = "Inválido";

      if (value >= 0 && value <= 30) {
        color = "green";
        label = "Bajo";
      } else if (value >= 31 && value <= 60) {
        color = "yellow";
        label = "Medio";
      } else if (value >= 61) {
        color = "red";
        label = "Alto";
      }

      // Renderizar el círculo en el span de color
      colorElement.innerHTML = `<span style="
        display:inline-block;
        width:12px;
        height:12px;
        border-radius:50%;
        background:${color};
        margin-right:6px;
      "></span>`;

      // Renderizar el texto en el span de nivel
      labelElement.textContent = label;
    }
    renderRiskColor( TaskAmount, "Alert-PT-Color", "Alert-Level")
  }
  function RenderGraphAmounts(){
    const LT = 30

    let percent = 0;
    
    const interval = setInterval(() => {
      if (percent <= LT) {
        setCircularProgress(percent);
        percent++;
      } else {
        clearInterval(interval);
      }
    }, 30);
  }



  function RenderSaveEventInfo(){

  const addEventBtn = document.getElementById("add-event-btn");
  const modal = document.getElementById("event-modal");
  const closeBtn = document.querySelector(".close-btn");
  const saveBtn = document.getElementById("save-event");
  const eventList = document.getElementById("event-list");

  // Open modal
  addEventBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  // Close modal
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Save event
  saveBtn.addEventListener("click", () => {
    const date = document.getElementById("event-date").value;
    const time = document.getElementById("event-time").value;
    const course = document.getElementById("event-course").value;
    const level = document.getElementById("event-level").value;
    const description = document.getElementById("event-description").value;

    if (!date || !time || !course || !level) {
      alert("Please fill in all required fields.");
      return;
    }

    // Create styled event card
    const eventCard = document.createElement("div");
    eventCard.classList.add("event-card");
    eventCard.innerHTML = `
      <div class="event-time">
        <span>${time}</span>
      </div>
      <div class="event-details">
        <h4>${course} <span class="event-level">${level}</span></h4>
        <p>${description}</p>
        <div class="status">
          <span class="status-badge ${level.toLowerCase()}">${level}</span>
          <div class="progress-bar">
            <div class="progress ${level.toLowerCase()}"></div>
          </div>
        </div>
      </div>
    `;

    eventList.appendChild(eventCard);

    // Reset form
    document.getElementById("event-date").value = "";
    document.getElementById("event-time").value = "";
    document.getElementById("event-course").value = "";
    document.getElementById("event-level").value = "";
    document.getElementById("event-description").value = "";

    // Close modal
    modal.style.display = "none";
  });

  // Close modal when clicking outside content
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  }









  // PENDING


function renderCorseInfo(){
  const Courses = TeacherData.carrera

  console.log(Courses)


  const categories = [
    { id: "Development", label: "Programación" },
    { id: "Business", label: "Negocios" },
    { id: "Design", label: "Diseño" },
    { id: "Leadership", label: "Liderazgo" },
    { id: "Sales", label: "Ventas" },
    { id: "Languages", label: "Idiomas" },
    { id: "Technology", label: "Tecnología" },
    { id: "Marketing", label: "Marketing" },
    { id: "Productivity", label: "Productividad" },
    { id: "Finance", label: "Finanzas" },
    { id: "AI", label: "AI" },
    { id: "Wellness", label: "Bienestar" }
  ];

  const select = document.getElementById("event-course");

  // Render options dynamically
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat.id;
    option.textContent = cat.label;
    select.appendChild(option);
  });

}








  // Call rendering functions
  renderWelcome();
  renderId()
  renderAlertIcons()
  renderUserIcon()
  RenderPendingTasks()
  RenderGraphAmounts()


  RenderSaveEventInfo()
  renderCorseInfo()


}

fetchAllContent();











































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
  window.location.href = "index11.2.html";
});
document.getElementById("Assignments").addEventListener("click", function () {
  window.location.href = "index11.3.html";
});
document.getElementById("Lessons").addEventListener("click", function () {
  window.location.href = "index11.4.html";
});   
document.getElementById("Mensajes").addEventListener("click", function () {
  window.location.href = "index11.5.html";
});







document.getElementById("Settings").addEventListener("click", function () {
  window.location.href = "index11.6.html";
}); 
document.getElementById("Logout").addEventListener("click", function () {
  window.location.href = "index4.html";
});  