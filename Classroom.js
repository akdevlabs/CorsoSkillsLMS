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


 

  function CouresesColors(){
    setBackgroundColor("Courses-Block", Prime5) 
  }
  function filtersColors(){
    const style = document.createElement('style');
    style.textContent = `
      .calendar-container {
        background: ${Prime5};
      }
      .filters select {
        border: 2px solid ${Prime3};
        background-color: ${Prime5};
      }

      .filters select:focus {
        border-color: 1px solid ${Base};
      }
      .search-bar input {
        border: 2px solid ${Prime3};
      }
      .search-bar button {
        background-color: ${Base};
        color: ${Prime5};
      }
      .search-bar button:hover {
        background-color: ${Prime2};
      }
    `;
    document.head.appendChild(style);
  }
  function  searchBarColors(){
    const style = document.createElement('style');
    style.textContent = `
      #Course-btn-block-text h1{
        color:${Base};
      }
      #Course-btn-block-text h3{
        color: ${Prime1};
      }
    `;
    document.head.appendChild(style);
  }
  function filtersColors(){
    const style = document.createElement('style');
    style.textContent = `
      .calendar-container {
        background: ${Prime5};
      }
      .filters select {
        border: 2px solid ${Prime3};
        background-color: ${Prime5};
      }

      .filters select:focus {
        border-color: 1px solid ${Base};
      }
      .search-bar input {
        border: 2px solid ${Prime3};
      }
      .search-bar button {
        background-color: ${Base};
        color: ${Prime5};
      }
      .search-bar button:hover {
        background-color: ${Prime2};
      }
    `;
    document.head.appendChild(style);
  }
  function CourseCardColors(){
    const style = document.createElement('style');
    style.textContent = `
      .course-card {
        color: ${Prime}; 
        background: ${Prime4}; 
      }
      .course-card h3 {
        color: ${Base}; 
      }

      .course-card p {
        color: ${Prime}; 
      }
      .course-card button {
        background-color:${Base}; 
        color: ${Prime5}; 
      }
      .course-card button:hover {
        background-color: ${Prime2}; 
      }

    `;
    document.head.appendChild(style);
  }







  SetMainColors()
  sidebarcolors()
  CourseContentColors()




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
  try {
    const studentData = await getstudentContent();
    const businessData = await getCorsoSkillAppContent();
    const courseData = businessData.Courses;
    if (!studentData || !businessData) {
      console.log("Missing data: studentData or businessData is null");
        return;
    }

    console.log("Student Document Data:", studentData);
    console.log("Business Document Data:", businessData);
    
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

function addVideoToPlayer(videoUrl) {
  const container = document.getElementById("videoContainer");

  // Clear existing content
  container.innerHTML = "";

  // Create video element
  const video = document.createElement("video");
  video.setAttribute("controls", true);
  video.setAttribute("width", "100%");
  video.src = videoUrl;

  // Create and update time display
  const timeDisplay = document.createElement("div");
  timeDisplay.className = "video-time";
  timeDisplay.textContent = "0:00 / 0:00";

  video.addEventListener("loadedmetadata", () => {
    timeDisplay.textContent = `0:00 / ${formatTime(video.duration)}`;
  });

  video.addEventListener("timeupdate", () => {
    timeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
  });

  container.appendChild(video);
  container.appendChild(timeDisplay);
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}



    const CouresIdInfo = findCourseById(courseData);

    renderText(CouresIdInfo.Type, "Type")
    renderText(CouresIdInfo.Level, "current")
    renderText(CouresIdInfo.Tittle, "Courese-Tittle")

    renderImage(CouresIdInfo.Teacher.Img, "Mentor Photo", "Mentor-Photo")
    renderText(CouresIdInfo.Teacher.Name, "Teacher-Name")
    renderText(CouresIdInfo.Teacher.Subtitle, "Teacher-Subtitle")

    renderText(CouresIdInfo.Description[0], "About-Course-1")
    renderText(CouresIdInfo.Description[1], "About-Course-2")
    renderResultadosAprendizaje(CouresIdInfo.Points)


   addVideoToPlayer(CouresIdInfo.Modules.Intro.Video);

//Description

  } catch (err) {
      console.error("Error in fetchAllContent:", err);
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


