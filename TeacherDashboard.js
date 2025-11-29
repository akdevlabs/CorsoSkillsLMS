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



  function setheadercolors(){
    setTextColors("#header", Prime)
  }






  function setNextClassColors(){
    setTextColors(".UCC-Title", Prime)  
    setallBackgroundColor(".UCC-Btn-block", Prime5)
    setBorder(".UCC-Btn-block", `2px solid ${Base}`);
    setTextColors(".UCC-Btn-block", Prime)  
    setTextColors("#Cal-Icon", Base)  
  }
  function setcardContainerColors() {
    const style = document.createElement("style");
    style.textContent = `
      .card {
        background: ${Prime5};
      }
      .card.active {
        border: 2px solid ${Prime2};
      }
      .card h4 {
        color:${Prime1};
      }
      .hours {
        color:${Prime1};
      }
      .btn.start {
        background:${Prime2};
        color:${Prime5};
      }
      .btn.upcoming {
        background:${Prime3};
        color: ${Prime5};
      }
      .carousel-btn {
        background:${Prime3};
        color:${Prime5};
      }
    `;
    document.head.appendChild(style);
  }
  function setContentColors() {
    const style = document.createElement("style");
    style.textContent = `
        #Line{
          background-color: ${Prime3};
        }
        #Content h1{
          color: ${Base};
        }
        #Content p{
          color: ${Prime};
        } 
        /*----------- Stats ------------*/
        .stat-icon {
          background: ${Prime5};
        }
        .stat-card {
          background: ${Prime5};
        }
        .stat-card{
          color:${Base};
        }
        .stat-card:hover{
          color: ${Prime5};
          background-color: ${Base};
        }
        /*----- UpComingClasses -------*/
        .UpComingClasses {
        background:${Prime4};
        }
        .carousel-btn {      
          background:${Prime3};
        }
        .carousel-btn:hover {
          background: ${Prime2};
        }
        .card {
          background: ${Prime5};
        }
        .card:hover {
          box-shadow: 0 8px 26px ${Prime3};
        }
        .card.active {
          border: none;
        }
        .card h4 {  
          color:${Prime2};
        }
        .card h3 {
          color: ${Base};
        }
        .card .hours {
          color: ${Prime3};
        }
        .card .btn {
          background: ${Prime3};
          color:${Prime5};
        }
        .card .btn:hover {
          background: ${Prime2};
        }
        .card .btn.upcoming:hover {
          background: ${Prime2};
        }
        .avatars img {
          border: 2px solid${Prime2};
        }
        .avatars span {
          color: ${Prime2};
        }
    `;
    document.head.appendChild(style);
  }
  function setstatColors(){
   setBorder(".stat-card", `2px solid ${Base}`);
   setBorder(".stat-icon", `2px solid ${Base}`);
  }
  function setUpComingClassesColors() {
    const style = document.createElement("style");
    style.textContent = `

.Course-List {
   color: ${Prime4}; 
  background-color: ${Base};

}
.Course-Categories {
  border-bottom: 2px solid ${Prime5};
}
.Course-Row {
  border-bottom: 1px solid ${Prime5};
}
.Course-Row:hover {
color: ${Base};
  background: ${Prime4}; 

}
    `;
    document.head.appendChild(style);
  }
 

  setGlobalFont(data.Font)
  SetMainColors()
  sidebarcolors()
  Setmaincolors()
  SetUserInfoColors()

  setheadercolors()
  setstatColors()
  setNextClassColors()
  setcardContainerColors()

  setContentColors()
  setUpComingClassesColors()
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
async function getStudentsContent() {
  try {
    const querySnapshot = await getDocs(collection(db, "CorsoSkillsStudents"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("⚠️ Error fetching Students:", error);
    return [];
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
  console.log("🔄 Fetching all Corso Skills data...");

  // Fetch all in parallel for speed ⚡
  // NOTE: adapt these three to whatever fetch functions you have
  const [StudentsData, TeachersDataRaw, BusinessData,classroomData        ] = await Promise.all([
    getStudentsContent(),           // expected: Array of student objects
    getTeacherContent(),            // expected: Array or object for teachers
    getCorsoSkillAppContent(),      
    getCorsoSkillsClassrooms()
  ]);

  console.group("✅ All Firestore Data Loaded");
  console.log("Business:", BusinessData);
  console.log("Students:", StudentsData);
  console.log("Teachers (raw):", TeachersDataRaw);
  console.log("✅ Classroom Data:", classroomData);
  console.groupEnd();

  // Normalize teacher data: you sometimes treated teachers as array and sometimes as single
  const TeachersData = Array.isArray(TeachersDataRaw) ? TeachersDataRaw : (TeachersDataRaw ? [TeachersDataRaw] : []);
  const TeacherData = TeachersData[0] || TeachersDataRaw || null; // single teacher (for profile icon / greeting) if available

  // Provide sensible fallbacks for subcollections that may be inside BusinessData
  const AffiliatesData = BusinessData?.Affiliates || [];
  const Courses = BusinessData?.Courses || {};

  // ---------------- helpers ----------------
  function renderText(text, elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = text;
    } else {
      console.warn(`Element with ID "${elementId}" not found. Tried to render:`, text);
    }
  }

  function renderTextById(id, text, append = false) {
    const element = document.getElementById(id);
    if (!element) {
      console.warn(`⚠️ No element found with ID: ${id}`);
      return;
    }
    if (append) element.textContent += text;
    else element.textContent = text;
  }

  function convertFirestoreTimestampToDate(timestamp) {
    if (!timestamp || typeof timestamp.seconds !== "number") {
      console.error("Invalid Firestore timestamp:", timestamp);
      return null;
    }
    const date = new Date(timestamp.seconds * 1000 + (timestamp.nanoseconds || 0) / 1e6);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }
  function renderText(text, elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = text;
    } else {
      console.error(`Element with ID "${elementId}" not found.`);
    }
  }
  function countKeyOccurrences(obj, targetKey) {
    let count = 0;

    function traverse(current) {
      if (typeof current !== "object" || current === null) return;

      for (const key in current) {
        if (key === targetKey) {
          count++;
        }

        // Recursively check inside all children
        traverse(current[key]);
      }
    }

    traverse(obj);
    return count;
  }
function getCoursesByTeacher(allCourses, targetTeacherId) {
  const result = [];

  for (const category in allCourses) {
    const levels = allCourses[category];

    for (const level in levels) {
      const courses = levels[level];

      for (const courseId in courses) {
        const course = courses[courseId];

        if (course.createdBy?.teacherId === targetTeacherId) {
          result.push({
            category,
            level,
            courseId,
            ...course
          });
        }
      }
    }
  }

  return result;
}





  // -----------------------------------------

  // Render functions
  function renderWelcome() {
    // prefer single teacher's fullName if available, else fallback text
    const name = (TeacherData && TeacherData.fullName) ? TeacherData.fullName : (TeachersData?.fullName || null);
   
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

      // Remove any previously attached click handlers to avoid duplicates
      const newEl = userIdElement.cloneNode(true);
      userIdElement.parentNode.replaceChild(newEl, userIdElement);

      newEl.addEventListener("click", () => {
        navigator.clipboard.writeText(adminId).then(() => {
          const originalText = newEl.textContent;
          newEl.textContent = "ID copiado ✅";
          setTimeout(() => {
            newEl.textContent = originalText;
          }, 1500);
        }).catch(err => {
          console.error("Clipboard write failed:", err);
        });
      });
    } else {
      renderText("Falta ID", "User-Id");
    }
  }

  function renderCardInfo() {
    // students block
    function checkActiveStudents(students) {
      if (!Array.isArray(students)) {
        console.error("❌ Invalid students data", students);
        return { activeStudents: [], inactiveStudents: [] };
      }

      const activeStudents = students.filter(student => student.Uactive === true);
      const inactiveStudents = students.filter(student => student.Uactive !== true);

      //console.log(`✅ Active Students: ${activeStudents.length}`);
      //console.log(`🛑 Inactive Students: ${inactiveStudents.length}`);

      renderText(activeStudents.length, "Astudents");


    }
    function checkActiveTeachers(teachers) {
      if (!Array.isArray(teachers)) {
        console.error("❌ Invalid teachers data", teachers);
        return { activeTeachers: [], inactiveTeachers: [] };
      }

      const activeTeachers = teachers.filter(t => t.Uactive === true);
      const inactiveTeachers = teachers.filter(t => t.Uactive !== true);

    //console.log(`✅ Active Teachers: ${activeTeachers.length}`);
    //console.log(`🛑 Inactive Teachers: ${inactiveTeachers.length}`);

     // renderText(activeTeachers.length, "TotalTeachers");

   
    }
    function checkActiveCourses(coursesData) {
      if (!coursesData || typeof coursesData !== "object") {
        console.error("❌ Invalid courses data", coursesData);
        return 0;
      }

      let totalActiveCourses = 0;
      for (const category of Object.values(coursesData)) {
        if (!category || typeof category !== "object") continue;
        for (const levelData of Object.values(category)) {
          if (levelData && typeof levelData === "object" && Object.keys(levelData).length > 0) {
            totalActiveCourses++;
          }
        }
      }

    //console.log(`🎓 Total Active Courses: ${totalActiveCourses}`);
     // renderText(totalActiveCourses, "Cclasses");
      return totalActiveCourses;
    }

    // run the checks and render UI
    checkActiveStudents(StudentsData || []);
    checkActiveTeachers(TeachersData || []);

  
    const totalActiveCourses = checkActiveCourses(Courses);

  //console.log("Students count:", (StudentsData && StudentsData.length) || 0);
  //console.log("Teachers count:", (TeachersData && TeachersData.length) || 0);
  //console.log("Active Courses:", totalActiveCourses);
  }

  function renderUserIcon() {
    const container = document.getElementById("profile-Icon");
    if (!container) {
      console.warn("Element with ID 'profile-Icon' not found.");
      return;
    }

    if (!TeacherData || !TeacherData.profileImg) {
      container.innerHTML = `<i class="fa-solid fa-circle-user" style="font-size: 2rem;"></i>`;
    } else {
      container.innerHTML = `<img src="${TeacherData.profileImg}" alt="User Icon" width="50" height="50" style="border-radius: 50%;" />`;
    }
  }

  function renderAlertIcons() {
    const ActiveAlrts = 0; // change as needed
    const Prime2 = "#333"; // fallback colors if your theme variables are not defined
    const Prime5 = "#eee";

    function setTextColors(selector, Tcolor) {
      if (selector.startsWith('#')) {
        const el = document.getElementById(selector.slice(1));
        if (el) el.style.color = Tcolor;
      } else if (selector.startsWith('.')) {
        const els = document.querySelectorAll(selector);
        els.forEach(e => e.style.color = Tcolor);
      } else {
        const el = document.getElementById(selector);
        if (el) el.style.color = Tcolor;
      }
    }

    function setallBackgroundColor(selector, backgroundColor) {
      if (selector.startsWith("#")) {
        const el = document.getElementById(selector.slice(1));
        if (el) el.style.backgroundColor = backgroundColor;
      } else if (selector.startsWith(".")) {
        const els = document.querySelectorAll(selector);
        els.forEach(e => e.style.backgroundColor = backgroundColor);
      } else {
        const el = document.getElementById(selector);
        if (el) el.style.backgroundColor = backgroundColor;
      }
    }

    const Alert = ActiveAlrts ? "yes" : "no";
    const container = document.querySelector(".Active-Portal-Alerts");
    if (!container) return;

    if (Alert === "yes") {
      setTextColors("#APA", Prime2);
      setallBackgroundColor("#APA", Prime5);
      container.innerHTML = `<i class="fa-solid fa-bell"></i>`;
    } else {
      container.innerHTML = `<i class="fa-regular fa-bell"></i>`;
    }
  }

  function renderEvents(){
    const EventsCount = countKeyOccurrences(classroomData.Event, UserUidInfo)
    renderText(EventsCount, "CVideos")
  }

  function renderCoursesCreated(){
    const Coursecont = getCoursesByTeacher(classroomData.courses, UserUidInfo)
    renderText(Coursecont.length, "Cclasses")
  }






  





// --------------------- Extract Courses from Object ---------------------
function getCoursesByTeacherId(allCoursesObj, teacherId) {
  const result = [];

  for (const categoryKey in allCoursesObj) {
    const category = allCoursesObj[categoryKey];
    if (typeof category !== "object") continue;

    for (const levelKey in category) {
      const level = category[levelKey];
      if (typeof level !== "object") continue;

      for (const courseKey in level) {
        const course = level[courseKey];
        if (!course || typeof course !== "object") continue;

        if (course.createdBy?.teacherId === teacherId) {
          result.push(course);
        }
      }
    }
  }
  return result;
}


// --------------------- Extract ALL Live Classes ---------------------
function getAllLiveClasses(allCoursesArray) {
  const liveClasses = [];

  allCoursesArray.forEach(course => {
    const contents = course["Courses Content"];
    if (!Array.isArray(contents)) return;

    contents.forEach(item => {
      if (item.type === "clase-en-vivo" && Array.isArray(item.clases)) {
        item.clases.forEach(clase => {
          liveClasses.push({
            courseId: course.Id,
            courseTitle: course.title,
            ...clase
          });
        });
      }
    });
  });

  return liveClasses;
}

// --------------------- Convert Live Classes to Carousel Format ---------------------
function convertLiveClassesToCarouselFormat(liveClasses) {
  return liveClasses.map(lc => ({
    title: lc.title || "Live Class",
    subtitle: lc.courseTitle || "",
    hours: `${lc.duration || 0} min`,
    datetime: lc.datetime || "",
    desc: lc.desc || "",
    status: "active",
    buttonText: "JOIN LIVE",
    buttonType: "start"
  }));
}

// --------------------- Build Carousel ---------------------
function buildCarousel() {
  const allCourses = getCoursesByTeacherId(classroomData.courses, UserUidInfo);
  const liveClasses = getAllLiveClasses(allCourses);

  console.log("Live Classes:", liveClasses);

  const classes = convertLiveClassesToCarouselFormat(liveClasses);

  const avatars = [
    "https://i.pravatar.cc/28?img=1",
    "https://i.pravatar.cc/28?img=2",
    "https://i.pravatar.cc/28?img=3"
  ];

  const container = document.getElementById("cardContainer");
  if (!container) return;

  container.innerHTML = "";

  if (classes.length === 0) {
    container.innerHTML = `<p style="color:#999; padding:1rem;">No live classes found.</p>`;
    return;
  }

  classes.forEach(cls => {
    const card = document.createElement("div");
    card.className = `card ${cls.status === "active" ? "active" : ""}`;
    card.innerHTML = `
        <h4>${cls.subtitle}</h4>
        <h3>${cls.title}</h3>
        <p style="font-size:12px; color:#666;">
  ${cls.desc?.length > 45 ? cls.desc.slice(0, 45) + "..." : cls.desc}
</p>
        <div class="hours">${cls.hours}</div>
        <div class="hours">${cls.datetime}</div>
        <button class="btn ${cls.buttonType}">${cls.buttonText}</button>
        <div class="avatars">
          ${avatars.map(src => `<img src="${src}" />`).join("")}
          <span>+22</span>
        </div>
    `;
    container.appendChild(card);
  });

  initCarousel(classes.length);
}

buildCarousel();

// --------------------- Carousel Logic ---------------------
function initCarousel(totalCards) {
  const track = document.querySelector(".carousel-track");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  let index = 0;

  function updateCarousel() {
    const firstCard = track.querySelector(".card");
    if (!track || !firstCard) return;

    const style = window.getComputedStyle(firstCard);
    const marginRight = parseFloat(style.marginRight || 20);
    const cardWidth = firstCard.offsetWidth + marginRight;

    if (index < 0) index = totalCards - 1;
    if (index >= totalCards) index = 0;

    track.style.transform = `translateX(-${index * cardWidth}px)`;

    track.querySelectorAll(".card").forEach((c, i) =>
      c.classList.toggle("active", i === index)
    );
  }

  if (prevBtn) prevBtn.addEventListener("click", () => { index--; updateCarousel(); });
  if (nextBtn) nextBtn.addEventListener("click", () => { index++; updateCarousel(); });

  updateCarousel();
  window.addEventListener("resize", updateCarousel);
}





// --------------------- Detect Level from Course ID ---------------------
function getLevelFromId(courseId = "") {
  if (!courseId || typeof courseId !== "string") return "—";
  const match = courseId.match(/[A-Za-z]/);
  if (!match) return "—";
  const letter = match[0].toUpperCase();

  switch (letter) {
    case "B": return "Principiante";
    case "I": return "Intermedio";
    case "A": return "Avanzado";
    default: return "—";
  }
}

// --------------------- RENDER ALL COURSES (NOT FILTERED) ---------------------
function renderAllCoursesList() {
  const courses = getCoursesByTeacherId(classroomData.courses, UserUidInfo);

  const container = document.querySelector(".Course-List");
  if (!container) return;

  container.innerHTML = "";

  // Header
  const header = document.createElement("div");
  header.className = "Course-Categories";
  header.innerHTML = `
    <h4>Nombre del Curso</h4>
    <h4>Inicio</h4>
    <h4>Calificación</h4>
    <h4>Nivel</h4>
  `;
  container.appendChild(header);

  if (courses.length === 0) {
    const empty = document.createElement("p");
    empty.style.color = "#999";
    empty.style.padding = "1rem";
    empty.textContent = "No courses found.";
    container.appendChild(empty);
    return;
  }

  // Rows
  courses.forEach(course => {
    const createdDate = new Date(course.createdAt || null);
    const formattedDate = createdDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });

    const row = document.createElement("div");
    row.className = "Course-Row";

    row.innerHTML = `
      <div>${course.title || "Untitled Course"}</div>
      <div>${formattedDate}</div>
      <div>${course.rate || "—"}</div>
      <div>${getLevelFromId(course.Id)}</div>
    `;

    container.appendChild(row);
  });
}

renderAllCoursesList();









  // initial renders
  renderId();
  renderWelcome();
  renderCardInfo();
  renderUserIcon();
  renderAlertIcons();
  renderEvents()
  renderCoursesCreated()
  // Optionally return all for later use
  return {
    BusinessData,
    StudentsData,
    TeachersData,
    TeacherData,
    AffiliatesData,
    Courses,
  };
}


fetchAllContent()




















  function renderTodaysDate() {
    const container = document.querySelector(".UCC-Btn");
    if (!container) return;

    const today = new Date();

    // Custom short month names
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                    "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

    const month = months[today.getMonth()];
    const day = today.getDate();
    const year = today.getFullYear();

    const formattedDate = `${month} ${day}, ${year}`;

    container.textContent = formattedDate;
  }

  // Run immediately
  renderTodaysDate();










document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("sidebar");
  const openBtn = document.getElementById("open");
  const closeBtn = document.getElementById("close");
  const menuToggle = document.getElementById("menuToggle");
  const linkNames = document.querySelectorAll(".linkName");
  const mobileSidebar = document.getElementById("Mobile-sidebar"); // Make sure this ID exists

  function showSidebarText() {
    linkNames.forEach(el => el.style.display = "inline");
    openBtn.style.display = "none";
    closeBtn.style.display = "flex";
    navbar.style.width = "10rem";
  }

  function hideSidebarText() {
    linkNames.forEach(el => el.style.display = "none");
    closeBtn.style.display = "none";
    openBtn.style.display = "flex";
    navbar.style.width = "5rem";
  }

  function toggleMobileSidebar() {
    mobileSidebar.classList.toggle("show"); // Add a class like .show to handle visibility in CSS
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

