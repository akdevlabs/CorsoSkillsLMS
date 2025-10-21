// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore, doc, getDoc, collection, addDoc, setDoc, Timestamp, updateDoc } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

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

const courseId = localStorage.getItem("selectedCourseId");

console.log(UserUidInfo)
console.log(courseId)
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
  setGlobalFont(data.Font)







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
  function CourseContentColors(){
    setBackgroundColor("Top-Course-Content", Prime5)
    setBackgroundColor("bottom-Course-Content", Prime5)
  }
  function SkrollColors(){
    const style = document.createElement('style');
    style.textContent = `
      .Content::-webkit-scrollbar-track {
        background:${Prime5};
      }
      .Content::-webkit-scrollbar-thumb {
        background: ${Base};
      }
      .Content::-webkit-scrollbar-thumb:hover {
        background: ${Base};
      }
    `;
    document.head.appendChild(style);
  }
  function breadcrumbColors(){
    const style = document.createElement('style');
    style.textContent = `
    #Courese-Tittle{
      color: ${Base};
    }
    #breadcrumb {
      color: ${Prime1};
    }
    #breadcrumb #current {
      color: ${Prime2};
    }
    `;
    document.head.appendChild(style);
  }
  function TopColors(){
    const style = document.createElement('style');
    style.textContent = `
    .nav {
      border: 2px solid ${Prime};
    }
    .video-player {
      background-color: ${Prime};
    }
    .bottom-Course-Content {
      border: 2px solid ${Prime};
    }
    .Top-Course-Content {
     border: 2px solid ${Prime};
    }
    .sidebar {
      border: 2px solid ${Prime};
    }
    `;
    document.head.appendChild(style);
  }

  function CorurseContentColors() {
    const style = document.createElement('style');
    style.textContent = `
      .mentor-info img {
        border: 2px solid ${Prime2};
      }
      #Teacher-Name {
        color: ${Prime2};
      }
      #Teacher-Subtitle {
        color: ${Base};
      }
      .course-description h3 {
        color: ${Base};
      }
      #About-Course-1{
        color: ${Base};
      }
      #About-Course-2{
        color: ${Base};
      }
      .course-description a {
        color: ${Prime2};
      }
      .course-suit ul {
        color: ${Prime3};
      }
      #resultados-aprendizaje h2 {
        color: ${Base};
      }
      #resultados-aprendizaje p {
        color:${Prime3};
      }
      #resultados-aprendizaje li {
        color: ${Prime};
      }
      #resultados-aprendizaje li::before {
        color: ${Prime2};
      }
    `;
    document.head.appendChild(style);
  }
  function setActiveContent(){
    //setBackgroundColor("Active-bottom-Course-Content", Prime5)
    const style = document.createElement('style');
    style.textContent = `
    .ANB{
      color:${Prime5};
      background-color: ${Base};
    }
  
    `;
    document.head.appendChild(style);
  }
  function ResourcesColors(){
    const style = document.createElement('style');
    style.textContent = `
      #Resources-main-tittle{
        color: ${Base};
      }

      .resource-download-btn {
        border: 2px solid ${Prime};
        color:${Prime};
      }

      .resource-download-btn:hover {
        border: none;
        background-color:${Prime3};
        color:${Prime5};
      }

      .resource-download-btn:active {
        border: none;
        background-color: ${Prime3};
        color:${Prime5};
      }

    `;
    document.head.appendChild(style);
  }
  function ExamColors(){
    const style = document.createElement('style');
    style.textContent = `
      .question-block {
        margin-top: 20px;
      }
      .question-block h3 {
        font-size: 1.4rem;
        margin-bottom: 10px;
        color: ${Prime1};
      }
      .question-block p {
        color: ${Prime3};
      }
      #next-btn,
      #submit-exam,
      #retake-btn {
        background-color: ${Prime1};
        color: ${Prime5};
      }
      #next-btn:hover,
      #submit-exam:hover,
      #retake-btn:hover {
        background-color: ${Prime3};
        color: ${Prime5};
      }
      #Exam-Portal em {
        color: #0b1af0;
      }

      #Exam-Portal strong {
        color: ${Prime3};
      }

      #Exam-Portal h2 {
        margin-top: 0;
        color: #08e213;
        font-size: 1.8rem;
      }

      .question-block label {
        color: ${Base};
      }



      .question-block input[type="radio"] {
        accent-color: ${Prime2};
      }

    `;
    document.head.appendChild(style);
  }
  function sidebarconColors(){
    const style = document.createElement('style');
    style.textContent = `
      .sidebar {
        background-color: ${Prime5};
      }
      .progress-section span {
        color: #6c63ff;
      }
      .progress-bar {
        background: #eee;
      }
      .progress {
        background: #6c63ff;
      }
      .sidebar p {
        color: #666;
      }
      .course-completion li {
        background-color: #f8f8ff;
        color: #555;
      }
      .course-completion li i {
        color: #6c63ff;
      }
      .course-completion li.completed {
        color: green;
        background-color: #e6f7ea;
      }
      .course-completion li.active {
        background-color: #efefff;
        color: #333;
      }
    `;
    document.head.appendChild(style);
  }




TopColors()

CorurseContentColors()
SkrollColors()
breadcrumbColors()
setActiveContent()
sidebarconColors()
  SetMainColors()
  sidebarcolors()
  CourseContentColors()
  ExamColors()
ResourcesColors()



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
  try {
    const studentData = await getstudentContent();
    const businessData = await getCorsoSkillAppContent();
    const ClassroomData = await getCorsoSkillsClassrooms();
    const courseData = businessData.Courses;
    if (!studentData || !businessData) {
      console.log("Missing data: studentData or businessData is null");
        return;
    }

    console.log("Student Document Data:", studentData);
    console.log("Business Document Data:", businessData);
    console.log("Classroom Document Data:", ClassroomData);

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
    function findCourseById(courseData) {
      const selectedId = localStorage.getItem("selectedCourseId");
      if (!selectedId) {
        console.warn("No selectedCourseId in localStorage");
        return null;
      }

      const categories = Object.values(courseData); // AI, Business, Design, etc.

      for (const category of categories) {
        if (typeof category !== "object" || Array.isArray(category)) continue;

        const levels = ["Beginner", "Intermediate", "Advanced"];
        for (const level of levels) {
          const levelGroup = category[level];
          if (levelGroup && typeof levelGroup === "object") {
            for (const course of Object.values(levelGroup)) {
              if (course && course.Id === selectedId) {
                console.log("Matched Course:", course);
                return course; // ✅ Return the single matched object
              }
            }
          }
        }
      }

      console.warn("No course found with ID:", selectedId);
      return null;
    }

    function renderResultadosAprendizaje({ Tittle, SubTittle, List }, containerId = "resultados-aprendizaje") {
      const container = document.getElementById(containerId);
      if (!container || !Array.isArray(List)) return;

      container.innerHTML = `
        <h2>${Tittle}</h2>
        <p>${SubTittle}</p>
        <ul>
          ${List.map(item => `<li>${item}</li>`).join("")}
        </ul>
      `;
    }
    document.addEventListener("DOMContentLoaded", function () {
      const loadVideoBtn = document.getElementById("loadVideoBtn");

      loadVideoBtn.addEventListener("click", function () {
        addVideoToPlayer("https://www.w3schools.com/html/mov_bbb.mp4");
      });
    });

    function setVideoSource(videoUrl) {
      const videoContainer = document.getElementById("videoContainer");

      // Find or create the video element
      let video = videoContainer.querySelector("video");
      if (!video) {
        video = document.createElement("video");
        video.controls = true;
        videoContainer.innerHTML = ''; // Clear any previous content
        videoContainer.appendChild(video);
      }

      // Create and set the <source> tag
      video.innerHTML = ''; // Clear previous sources
      const source = document.createElement("source");
      source.src = videoUrl;
      source.type = "video/mp4";

      video.appendChild(source);
      video.load(); // Refresh the video element
    }
    function renderStarsToElement(elementId, rating) {
      const maxStars = 5;
      let starsHTML = '';

      for (let i = 1; i <= maxStars; i++) {
        if (i <= rating) {
          starsHTML += '<i class="fas fa-star"></i>'; // filled
        } else {
          starsHTML += '<i class="far fa-star"></i>'; // outline
        }
      }

      const container = document.getElementById(elementId);
      if (container) container.innerHTML = starsHTML;
    }
    function renderHoursMinutes(durationObj) {
      const durationDiv = document.getElementById("Duration");

      // Extract hours and minutes (strings)
      const hoursStr = durationObj.Hours || "";
      const minutesStr = durationObj.Min || "";

      // Parse numbers safely, default to 0 if empty or invalid
      const hours = parseInt(hoursStr) || 0;
      const minutes = parseInt(minutesStr) || 0;

      // Build the duration string
      let result = "";
      if (hours > 0) result += `${hours} hr${hours > 1 ? 's' : ''} `;
      if (minutes > 0) result += `${minutes} min`;

      // If both zero, show "0 min"
      if (result.trim() === "") result = "0 min";

      durationDiv.textContent = result.trim();
    }
    function renderLanguages(obj) {
      const container = document.getElementById("Language");
      if (!container) {
        console.error("No element with id 'Language' found");
        return;
      }

      container.innerHTML = ""; // Clear existing content

      if (Array.isArray(obj.Language)) {
        obj.Language.forEach(lang => {
          const p = document.createElement("p");
          p.textContent = lang;
          container.appendChild(p);
        });
      } else {
        console.error("'Language' is not an array");
      }
    }

    function renderNewCoursesOnly(courseArray, existingIds) {
        const newCourses = courseArray.filter(course => course.Id && !existingIds.includes(course.Id));

        if (newCourses.length === 0) {
            console.log("No hay cursos nuevos disponibles.");
        } else {
            console.log(`Hay ${newCourses.length} curso(s) nuevo(s) disponible(s).`, newCourses);
        }
    }




    const CouresIdInfo = findCourseById(courseData);


    function RenderBottomContent(){
      renderText(CouresIdInfo.Type, "Type")
      renderText(CouresIdInfo.Level, "current")
      renderText(CouresIdInfo.Tittle, "Courese-Tittle")

      renderImage(CouresIdInfo.Teacher.Img, "Mentor Photo", "Mentor-Photo")
      renderText(CouresIdInfo.Teacher.Name, "Teacher-Name")
      renderText(CouresIdInfo.Teacher.Subtitle, "Teacher-Subtitle")

      renderText(CouresIdInfo.Description[0], "About-Course-1")
      renderText(CouresIdInfo.Description[1], "About-Course-2")
      renderResultadosAprendizaje(CouresIdInfo.Points)


    }
    function RenderSidebarContent(){
      renderStarsToElement("Review-Stars", CouresIdInfo.Reviews.Average)
      renderHoursMinutes(CouresIdInfo.Duration)
      renderText(CouresIdInfo.Level, "Skill-Level")
      renderLanguages(CouresIdInfo)
      renderText(CouresIdInfo.SignUps, "Views")
    }
    function renderCouresSignupContent(){
      function logCourseSlotIds(courses) {
        const ids = [];
        for (const key in courses) {
          if (courses.hasOwnProperty(key) && courses[key].Id) {
            ids.push(courses[key].Id);
          }
        }
        return ids;
      }
      function FindFilter(){
        const Level = CouresIdInfo.Level
        if (Level === 'Principiante') {
           return ("Beginner")
        }else if(Level === 'Intermedio') {
           return ("Intermediate")
        }else if(Level === 'Avanzado') {
           return ("Advanced")

        }
      }
      function CourseType() {
        const Type = CouresIdInfo.Type;
     
        if (Type === 'Inteligencia Artificial') {
          return 'AI';
        } else if (Type === 'Negocios') {
          return 'Business';
        } else if (Type === 'Diseño')  {
          return 'Design';
        } else if (Type === 'Finanzas'){
           return 'Finance';
        } else if (Type === 'Idiomas'){
           return 'Languages';
        } else if (Type === 'Liderazgo'){
           return 'Leadership';
        } else if (Type === 'Marketing'){
           return 'Marketing';
        } else if (Type === 'Productividad'){
           return 'Productivity';
        } else if (Type === 'Programación'){
           return 'Programming';
        } else if (Type === 'Ventas'){
           return 'Sales';
        } else if (Type === 'Tecnología'){
           return 'Technology';
        } else if (Type === 'Bienestar'){
           return 'Wellness';
        }

         
      }
      function checkIfCourseIdExists(courseObj, idToFind) {
        let found = false;

        for (const key in courseObj) {
          if (courseObj[key]?.Id === idToFind) {
            return true
          }
        }

        if (!found) {
          return false
        }
      }


      const studentCoureses = logCourseSlotIds(studentData.Courses)
      const StuCour = studentData.Courses;
      const Type = CourseType(); 
      const level = FindFilter(); 
      const Id = CouresIdInfo.Id

         

  


      const AllCourses = businessData?.Courses?.[Type]?.[level];

     // console.log("Level:", AllCourses);


      console.log(checkIfCourseIdExists(StuCour, Id));

      function EnrolledType() {
        const Enrolled = studentData.Enrolled;
        const enroll = document.getElementById("enroll-container");
        const Upgrade = document.getElementById("Upgrade-container");
        const Pay = document.getElementById("Pay-block");
        const MySub = businessData.Settings.Offersubscriptions;

        if (Enrolled === 'Monthly' || Enrolled === 'Yearly') {
          enroll.style.display = "block";
          Upgrade.style.display = "none";
          Pay.style.display = "none";

        } else if (Enrolled === 'Trial') {
          if (Slot <= 3) {
            enroll.style.display = "block";
            Upgrade.style.display = "none";
          } else {
            enroll.style.display = "none";
            Upgrade.style.display = "block";
          }
          Pay.style.display = "none";

        } else if (Enrolled === 'Payper') {
          enroll.style.display = "none";
          Pay.style.display = "block";

          if (MySub === true) {
            Upgrade.style.display = "block";
          } else {
            Upgrade.style.display = "none";
          }
        }
      }

      function CheckACourse() {
        const checker = checkIfCourseIdExists(StuCour, Id);
        const Details = document.getElementById("Details-block");
        const progress = document.getElementById("progress-section");
        const view = document.getElementById("Module-view");
        const List = document.getElementById("Module-List");
        const enroll = document.getElementById("enroll-container");
        const Upgrade = document.getElementById("Upgrade-container");
        const Pay = document.getElementById("Pay-block");
        const Active = document.getElementById("Active-Nav-Btns");   
        

        if (checker === true) {
          // If already enrolled in course, override all UI
          enroll.style.display = "none";
          Upgrade.style.display = "none";
          Pay.style.display = "none";
          Details.style.display = "none";
          progress.style.display = "block";
          view.style.display = "none";
          List.style.display = "block";
          Active.style.display = "flex";

        } else {
          // If not enrolled, show default view according to subscription
          EnrolledType(); // <<< make sure we run this here

          Details.style.display = "block";
          progress.style.display = "none";
          view.style.display ="block";
          List.style.display = "none";
          Active.style.display = "none";
        }
        
      }

      // Call only the main entry function
      CheckACourse();

      

      function countSlots(obj) {
        return Object.keys(obj).filter(key => key.startsWith("Slot")).length;
      }
      function addNewSlot(obj, newCourseId) {
        const slotCount = countSlots(obj);
        const newSlotKey = `Slot${slotCount + 1}`;
        const CInfo = CouresIdInfo
        const Teacher = CouresIdInfo.Teacher.Name
        const OCTime = CouresIdInfo.Teacher.Time
        const TId = CouresIdInfo.Teacher.TeacherId


 
        const newSlot = {
          Id: newCourseId,
          progress: 0,
          Type:CInfo.Type,
          Teacher:Teacher,
          Time:OCTime,
          TeacherId:TId,
          Certificate: false

        };

        obj[newSlotKey] = newSlot;

        console.log(`Added ${newSlotKey}:`, newSlot);

        return { [newSlotKey]: newSlot }; // Return new slot wrapped in key
      }

      const CourseStudent = studentData;
      console.log(CourseStudent)

    function createEnrollButton(studentCourses, studentId, UserUidInfo, newCourseId) {
      const btn = document.getElementById("enroll-container");

      btn.addEventListener("click", async () => {
        try {
          // Add the slot locally
          const newSlotData = addNewSlot(studentCourses, newCourseId);

          // Save under student's "Courses"
          const studentDocRef = doc(db, "CorsoSkillsStudents", UserUidInfo);
          await setDoc(studentDocRef, { Courses: newSlotData }, { merge: true });

          console.log(studentDocRef)

          // Also save a copy into Classrooms
          const classroomDocRef = doc(db, "CorsoSkillsClassrooms", TBuInfo);
          await setDoc(classroomDocRef, {
            "Courses": {
              [Type]: {
                [level]: {
                  [newCourseId]: {
                    ["Students"]: {
                      [UserUidInfo]: {
                        name:CourseStudent.fullName,
                        level:level,
                        sexo:CourseStudent.sexo,
                        id: UserUidInfo,
                        courseId: newCourseId,
                        enrolledAt: new Date().toISOString(),
                        lastLogin: CourseStudent.lastLogin,
                        
                      }
                    }
                  }
                }
              }
            }
          }, { merge: true });

          btn.textContent = "Inscrito ✔️";
          btn.disabled = true;

          alert("Información guardada correctamente.");

          // Delay the reload by 1 second
          setTimeout(() => {
                location.reload();
              }, 1000);

            } catch (error) {
              console.error("Error al inscribirse:", error);
              alert("Hubo un error al inscribirse. Intenta nuevamente.");
            }
          });
    }

    const newCourseId = Id;            // <-- ID of course being enrolled in
    const studentId = newCourseId;     // You can use same or different ID

    createEnrollButton(StuCour, studentId, UserUidInfo, newCourseId);









      function RenderViedoLineup() {
        const ActiveCourse = checkIfCourseIdExists(StuCour, Id);
        const videoElement = document.getElementById("courseVideo");
        const moduleList = document.querySelector("#Module-List ul");
        const progressCount = document.querySelector("#Module-List h4 span");

        if (!videoElement || !moduleList || !progressCount) {
          console.error("Required DOM elements not found.");
          return;
        }

        function formatTime(time) {
          const hours = Math.floor(time);
          const minutes = Math.round((time - hours) * 60);
          let result = "";
          if (hours > 0) result += `${hours} hora${hours > 1 ? "s" : ""}`;
          if (minutes > 0) result += (result ? " " : "") + `${minutes} min`;
          return result || "0 min";
        }

        const orderedKeys = Object.keys(CouresIdInfo.Modules).sort((a, b) => {
          if (a === "Intro") return -1;
          if (b === "Intro") return 1;
          return parseInt(a.replace("M", "")) - parseInt(b.replace("M", ""));
        });

        let currentModuleIndex = 0;
        const watchedModules = new Set();

        function findCourseSlotById(courseSlots, targetId) {
          for (const slotName in courseSlots) {
            const slot = courseSlots[slotName];
            if (slot.Id === targetId) {
              return {
                found: true,
                slotName: slotName,
                slotData: slot
              };
            }
          }
          return {
            found: false,
            slotName: null,
            slotData: null
          };
        }

        function getFirstUnwatchedVideoIndex(studentCourses, courseId) {
          const courseObject = findCourseSlotById(studentCourses, courseId);
          const videoHistory = courseObject.found && courseObject.slotData.videoHistory
            ? courseObject.slotData.videoHistory
            : {};

          for (let i = 0; i < orderedKeys.length; i++) {
            const moduleKey = orderedKeys[i];
            if (!videoHistory.hasOwnProperty(moduleKey)) {
              return i;
            }
          }

          return -1; // Todos los módulos completados
        }

        function loadVideoByIndex(index, autoplay = ActiveCourse) {
          const key = orderedKeys[index];
          const module = CouresIdInfo.Modules[key];

          if (!module || !module.Video) {
            console.warn("No video found for module", key);
            return;
          }

          currentModuleIndex = index;

          const videoParent = document.getElementById("courseVideo").parentNode;
          const newVideo = document.createElement("video");
          newVideo.setAttribute("id", "courseVideo");
          newVideo.setAttribute("controls", "true");
          newVideo.src = module.Video;

          console.log(`▶️ Reproduciendo: Módulo ${index + 1} - "${module.Tittle || "Sin título"}"`);

          newVideo.addEventListener("ended", async () => {
            if (!ActiveCourse) return;

            const isVideoFullyWatched = Math.abs(newVideo.currentTime - newVideo.duration) < 1;
            if (!isVideoFullyWatched) {
              console.warn("⚠️ El video no se vio completamente. No se guardará el progreso.");
              return;
            }

            const moduleKey = orderedKeys[index];
            const completedModule = CouresIdInfo.Modules[moduleKey];
            const moduleTitle = completedModule.Tittle || "Sin título";

            if (!watchedModules.has(index)) {
              watchedModules.add(index);
            }

            const percent = Math.round((watchedModules.size / orderedKeys.length) * 100);
            console.log(`✅ Video completado: Módulo ${index + 1} - "${moduleTitle}"`);
            console.log(`📊 Progreso actual: ${percent}%`);

            const StudentVideo = studentData.Courses;
            const ScObject = findCourseSlotById(StudentVideo, Id);

            if (ScObject.found && ScObject.slotName) {
              try {
                const studentRef = doc(db, "CorsoSkillsStudents", UserUidInfo);
                const currentDate = new Date().toISOString();

                const currentHistory = ScObject.slotData.videoHistory || {};
                const alreadyCompleted = currentHistory[moduleKey]?.completedAt;

                if (!alreadyCompleted) {
                  const updatedVideoHistory = {
                    ...currentHistory,
                    [moduleKey]: {
                      title: moduleTitle,
                      completedAt: currentDate,
                      progress: percent
                    }
                  };

                  const updatedSlot = {
                    ...ScObject.slotData,
                    progress: percent,
                    videos: {
                      ...(ScObject.slotData.videos || {}),
                      [moduleKey]: "completed"
                    },
                    videoHistory: updatedVideoHistory
                  };

                  const updatedCourses = {
                    ...studentData.Courses,
                    [ScObject.slotName]: updatedSlot
                  };

                  await updateDoc(studentRef, {
                    Courses: updatedCourses
                  });

                  console.log("📁 Progreso y video actualizado en Firestore.");
                } else {
                  console.log("⚠️ Este módulo ya había sido registrado como completado.");
                }
              } catch (error) {
                console.error("❌ Error al actualizar Firestore:", error);
                alert("Hubo un error al guardar el progreso.");
              }
            }

            const nextIndex = index + 1;
            if (nextIndex < orderedKeys.length) {
              const nextTitle = CouresIdInfo.Modules[orderedKeys[nextIndex]].Tittle || "Sin título";
              console.log(`▶️ Reproduciendo: Módulo ${nextIndex + 1} - "${nextTitle}"`);
              loadVideoByIndex(nextIndex, true);
            } else {
              alert("🎉 ¡Has completado todos los módulos!");
            }
          });

          newVideo.addEventListener("loadedmetadata", () => {
            if (autoplay) {
              newVideo.play().catch((err) => {
                console.warn("Autoplay bloqueado o falló:", err);
              });
            }
          });

          const oldVideo = document.getElementById("courseVideo");
          if (videoParent && oldVideo) {
            videoParent.replaceChild(newVideo, oldVideo);
          }

          renderModules(index);
        }

        function renderModules(selectedIdx = 0) {
          moduleList.innerHTML = "";

          const ScObject = findCourseSlotById(studentData.Courses, Id);
          const videoHistory = ScObject.found && ScObject.slotData.videoHistory
            ? ScObject.slotData.videoHistory
            : {};

          orderedKeys.forEach((key, i) => {
            const mod = CouresIdInfo.Modules[key];
            const li = document.createElement("li");

            const icon = document.createElement("i");
            const title = document.createTextNode(" " + (mod.Tittle || "Sin título") + " ");
            const timeSpan = document.createElement("span");
            timeSpan.textContent = formatTime(mod.Time || 0);

            const isCompleted = !!videoHistory[key];

            if (i === selectedIdx) {
              li.classList.add("active");
              icon.className = "fas fa-play-circle";
            } else if (isCompleted) {
              li.classList.add("completed");
              icon.className = "fas fa-check-circle";
            } else {
              icon.className = ActiveCourse ? "far fa-circle" : "fas fa-lock";
            }

            if (ActiveCourse) {
              li.style.cursor = "pointer";
              li.addEventListener("click", () => loadVideoByIndex(i, true));
            } else {
              li.style.cursor = i === 0 ? "pointer" : "not-allowed";
              if (i === 0) {
                li.addEventListener("click", () => loadVideoByIndex(0, true));
              }
            }

            li.appendChild(icon);
            li.appendChild(title);
            li.appendChild(timeSpan);
            moduleList.appendChild(li);
          });

          progressCount.textContent = `${selectedIdx + 1}/${orderedKeys.length}`;
        }

        // ⏯ Reproducir primer módulo NO completado
        const nextUnwatchedIndex = getFirstUnwatchedVideoIndex(studentData.Courses, Id);

        if (nextUnwatchedIndex >= 0 && nextUnwatchedIndex < orderedKeys.length) {
          loadVideoByIndex(nextUnwatchedIndex, ActiveCourse);
        } else {
          alert("🎉 ¡Has completado todos los módulos!");
        }
      }








      RenderViedoLineup() 


    }
    function renderResourcesContent(){
      
      function renderDownloadButtons(resourcesObj) {
        const container = document.getElementById("Resourcesbtns");
        container.innerHTML = ""; // Clear previous content

        Object.keys(resourcesObj).forEach((key) => {
          const resource = resourcesObj[key];

          const btn = document.createElement("button");
          btn.textContent = resource.Tittle;
          btn.className = "resource-download-btn";

          btn.addEventListener("click", () => {
            const a = document.createElement("a");
            a.href = resource.Link;
            a.target = "_blank";
            a.rel = "noopener noreferrer";
            a.click();
          });

          container.appendChild(btn);
        });
      }

      renderDownloadButtons(CouresIdInfo.Resources)



    }
    function renderHomeworkContent(){
      
      function renderDownloadButtons(resourcesObj) {
        const container = document.getElementById("Homeworkbtns");
        container.innerHTML = ""; // Clear previous content

        Object.keys(resourcesObj).forEach((key) => {
          const resource = resourcesObj[key];

          const btn = document.createElement("button");
          btn.textContent = resource.Tittle;
          btn.className = "resource-download-btn";

          btn.addEventListener("click", () => {
            const a = document.createElement("a");
            a.href = resource.Link;
            a.target = "_blank";
            a.rel = "noopener noreferrer";
            a.click();
          });

          container.appendChild(btn);
        });
      }

      renderDownloadButtons(CouresIdInfo.Assessment.Tareas)



    }
    function renderExamContent() {
      const examData = CouresIdInfo.Assessment.Examen;
      const portal = document.getElementById("Exam-Portal");

      if (!portal || !examData) {
        console.error("❌ Exam portal o data no disponible.");
        return;
      }

      let currentQuestion = 0;
      const userAnswers = [];
      const questions = Object.entries(examData);
      console.log(questions)
      function renderHeader() {
        return `
          <div style="text-align: right;">
            <button id="close-exam" style="background: none; border: none; font-size: 18px; cursor: pointer;">❌ Cerrar</button>
          </div>
        `;
      }

      function setupCloseButton() {
        const closeBtn = document.getElementById("close-exam");
        if (closeBtn) {
          closeBtn.addEventListener("click", () => {
            portal.style.display = "none";
            portal.innerHTML = "";
          });
        }
      }

      function renderQuestion(index) {
        const [key, q] = questions[index];
        portal.innerHTML = `
          ${renderHeader()}
          <div class="question-block">
            <h3>Pregunta ${index + 1} de ${questions.length}:</h3>
            <p>${q.Question}</p>
            ${q.Options.map((opt, i) => `
              <label>
                <input type="radio" name="answer" value="${i}" ${userAnswers[index] === i ? 'checked' : ''}>
                ${opt}
              </label><br>
            `).join('')}
            <button id="next-btn">${index === questions.length - 1 ? 'Revisar respuestas' : 'Siguiente'}</button>
          </div>
        `;
        setupCloseButton();

        document.getElementById("next-btn").onclick = () => {
          const selected = document.querySelector('input[name="answer"]:checked');
          if (!selected) {
            alert("Por favor selecciona una opción.");
            return;
          }
          userAnswers[index] = parseInt(selected.value);
          currentQuestion++;
          if (currentQuestion < questions.length) {
            renderQuestion(currentQuestion);
          } else {
            renderReview();
          }
        };
      }

      function renderReview() {
        portal.innerHTML = `
          ${renderHeader()}
          <h3>Revisión de respuestas:</h3>
          <ol>
            ${questions.map(([key, q], i) => {
              const userIndex = userAnswers[i];
              const userText = userIndex !== undefined ? q.Options[userIndex] : "No respondida";
              return `
                <li>
                  <strong>${q.Question}</strong><br>
                  <em>Tu respuesta:</em> ${userText}<br>
                </li>
              `;
            }).join('')}
          </ol>
          <button id="submit-exam">Enviar examen</button>
        `;
        setupCloseButton();

        document.getElementById("submit-exam").onclick = gradeExam;
      }

      function gradeExam() {
        let correct = 0;
        questions.forEach(([key, q], i) => {
          const correctAnswer = q.Answer;
          const selectedAnswer = userAnswers[i];
          if (selectedAnswer === correctAnswer) {
            correct++;
          }
        });

        const total = questions.length;
        const percent = Math.round((correct / total) * 100);

        portal.innerHTML = `
          ${renderHeader()}
          <h2>Resultados del examen</h2>
          <p>Tu calificación: <strong>${percent}%</strong></p>
        `;
        setupCloseButton();

        if (percent >= 80) {
          portal.innerHTML += `<p style="color: green;">✅ ¡Felicidades! Has aprobado el examen.</p>`;
          console.log("passed exam");
        } else {
          portal.innerHTML += `
            <p style="color: red;">❌ No alcanzaste el 80%. Puedes volver a intentarlo.</p>
            <button id="retake-btn">Reintentar examen</button>
          `;
          document.getElementById("retake-btn").onclick = () => {
            currentQuestion = 0;
            userAnswers.length = 0;
            renderQuestion(currentQuestion);
          };
        }
      }

      // 🚀 Iniciar examen
      currentQuestion = 0;
      userAnswers.length = 0;
      renderQuestion(currentQuestion);

      
    }
    function RenderProgressContent(){
      function getCourseProgressById(coursesObj, targetId) {
        for (const slotKey in coursesObj) {
          if (coursesObj.hasOwnProperty(slotKey)) {
            const course = coursesObj[slotKey];
            if (course.Id === targetId) {
              return course.progress;
            }
          }
        }
        return null; // Not found
      }
      const amount = getCourseProgressById(studentData.Courses, CouresIdInfo.Id)
      console.log(amount)
      function renderStudyProgress(percent) {
        const clampedPercent = Math.max(0, Math.min(100, percent));
        const percentText = document.getElementById("progress-percent");
        const progressFill = document.getElementById("progress-bar-fill");

        if (percentText && progressFill) {
          percentText.textContent = `${clampedPercent}%`;
          requestAnimationFrame(() => {
            progressFill.style.width = `${clampedPercent}%`;
          });
        } else {
          console.warn("Progress elements not found.");
        }
      }
      setTimeout(() => {
        renderStudyProgress(amount); // Or any dynamic value
      }, 2000);
      

      function renderaLLText(text, targetElement) {
        if (targetElement) {
          targetElement.textContent = text;
        } else {
          console.error("Target element not found.");
        }
      }

      function RenderQuotes() {
        const Quotes = businessData.Quotes;
        const Quotesid = document.getElementById("Quotes-block");

        if (!Quotes || !Array.isArray(Quotes) || Quotes.length === 0) {
          console.error("Quotes data is missing or invalid.");
          return;
        }

        // Ensure 'amount' is defined and within expected range
        const index = Math.floor(amount / 10); // Convert 0–100 to 0–10

        if (index >= 0 && index < Quotes.length) {
          renderaLLText(Quotes[index], Quotesid);
        } else {
          console.warn("No quote available for this progress level.");
        }
      }

      // Call it
      RenderQuotes();

    }

















    RenderBottomContent()
    RenderSidebarContent()
    renderCouresSignupContent()
    renderResourcesContent()
    renderHomeworkContent()
    renderExamContent()
    RenderProgressContent()



  } catch (error) {
      console.error("Error in fetchAllContent:", error);
    }
}


fetchAllContent();

document.addEventListener("DOMContentLoaded", function () {
  const openBtn = document.getElementById("showMoreLink");
  const Info = document.getElementById("About-Course-2");

  function showSidebarText() {
    openBtn.style.display = "none";
    Info.style.display = "flex";
  }



  openBtn.addEventListener("click", showSidebarText);

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

document.addEventListener("DOMContentLoaded", function () {
      const examBtn = document.getElementById("Exam-btn");
      const portal = document.getElementById("Exam-Portal");

      if (examBtn && portal) {
        portal.style.display = "none"; // oculto al inicio
        examBtn.addEventListener("click", function () {
          portal.style.display = "block";
          
        });
      }
});


async function applyActiveNavBtns() {
  try {
    const docRef = doc(db, "CorsoSkillBusiness", TBuInfo); // Asegúrate de que db y TBuInfo estén definidos
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data(); // Retorna los datos del documento
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
}
document.addEventListener("DOMContentLoaded", function () {
  applyActiveNavBtns().then((data) => {
    if (!data) return;

    console.log(data.BuLogos.Icons[0]);

    const { Base, Prime, Prime1, Prime2, Prime3, Prime4, Prime5 } = data.BuColors.Colors;

    const DetialsBtn = document.getElementById("Detials-btn");
    const ResourcesBtn = document.getElementById("Resources-btn");
    const HomeworkBtn = document.getElementById("Homework-btn");
    const ExamBtn = document.getElementById("Exam-btn");
    const RequirementBtn = document.getElementById("Requirement-btn");   

    const detials = document.getElementById("detials");
    const Resources = document.getElementById("Resources");
    const Homework = document.getElementById("Homework");
    const Exam = document.getElementById("Exam");
    const Requirement = document.getElementById("Requirement");

    const sections = [detials, Resources, Homework, Exam, Requirement];
    const buttons = [DetialsBtn, ResourcesBtn, HomeworkBtn, ExamBtn, RequirementBtn];

    function hideAllSections() {
      sections.forEach((section) => {
        section.style.display = "none";
      });
      buttons.forEach((btn) => {
        btn.style.backgroundColor = "";
        btn.style.color = "";
      });
    }

    function showSection(section, activeBtn) {
      hideAllSections();
      section.style.display = "flex";
      activeBtn.style.backgroundColor = Prime2;
      activeBtn.style.color = Prime5;
    }

    // Event listeners
    DetialsBtn.addEventListener("click", () => showSection(detials, DetialsBtn));
    ResourcesBtn.addEventListener("click", () => showSection(Resources, ResourcesBtn));
    HomeworkBtn.addEventListener("click", () => showSection(Homework, HomeworkBtn));
    ExamBtn.addEventListener("click", () => showSection(Exam, ExamBtn));
    RequirementBtn.addEventListener("click", () => showSection(Requirement, RequirementBtn));

    // Mostrar por defecto la sección "Details"
    showSection(detials, DetialsBtn);
  });


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
document.getElementById("Multi-User").addEventListener("click", function () {
  window.location.href = "index10.8.html";
});
document.getElementById("carrer").addEventListener("click", function () {
  window.location.href = "index10.5.html";
});




