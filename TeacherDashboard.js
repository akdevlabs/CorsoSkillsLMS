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
  const {Base, Prime1, Prime2, Prime3, Prime4, Prime5} = data.BuColors.Colors;
  
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
  function setheadercolors(){
    setTextColors("#header", Base)
    
  

  }
  function setLevelBtnscolors(){
    setBackgroundColor("Beginner", Prime3)
    setBackgroundColor("Intermediate", Prime3)
    setBackgroundColor("Advanced", Prime3)
    setTextColors(".Level-Btns", Prime5)
    setBackgroundColor("line", Prime1)
  }
  function settabscolors(){
    setTextColors(".COB-tittle", Base)
    setBackgroundColor("scroll-left", Prime3)
    setBackgroundColor("scroll-right", Prime3)
    setTextColors("#scroll-left", Prime5)
    setTextColors("#scroll-right", Prime5)
  }
  function setstatColors(){
    setBackgroundColor("Student-card", Prime5)
    setBackgroundColor("Classes-card", Prime5)
    setBackgroundColor("Submissions-card", Prime5)
    setBackgroundColor("Messages-card", Prime5)
    setTextColors(".card", Base)
    setTextColors(".Alerts", Prime2)


    setBackgroundColor("lesson-Btn", Prime3)
    setBackgroundColor("Course-Btn", Prime3)
    setTextColors(".Action-btns-card", Prime5)
    
  }

  function setChartcolors(){
    setBackgroundColor("student-chart", Prime5)
    setBackgroundColor("Cursos-chart", Prime5)
    setTextColors(".chart-block", Base)
  }





  SetMainColors()
  setLevelBtnscolors()
  setheadercolors()
  sidebarcolors()
  settabscolors()
  setstatColors()
  setChartcolors()


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
    

    const {Base, Prime1, Prime2, Prime3, Prime4, Prime5} = businessData.BuColors.Colors;
  

    if (studentData) {
      console.log("Student Document Data:", studentData);
    } else {
      console.log("No student data found.");
    }

    if (businessData) {
      console.log("Business Document Data:", businessData);
    } else {
      console.log("No business data found.");
    }

    function renderText(text, elementId) {
      const element = document.getElementById(elementId);
      if (element) {
        element.textContent = text;
      } else {
        console.error(`Element with ID "${elementId}" not found.`);
      }
    }













    
    function renderWelcome() {
      if (studentData && studentData.fullName) {
        renderText("Hola, " + studentData.fullName, "wecome-banner-tittle");
      } else {
        renderText("Welcome!", "wecome-banner-tittle");
      }
    }
    function renderUserIcon() {
      const container = document.getElementById("profile-Icon");

      if (!container) {
        console.error("Element with ID 'profile-Icon' not found.");
        return;
      }

      if (!studentData?.profileImg) {
        container.innerHTML = `<i class="fa-solid fa-circle-user" style="font-size: 2rem;"></i>`;
      } else {
        container.innerHTML = `<img src="${studentData.profileImg}" alt="User Icon" width="50" height="50" style="border-radius: 50%;" />`;
      }
    }
    function CursosOfrecidosblock(){

      let selectedLevel = "Beginner"; // Default level
      let currentIndex = 0; // Tab scroll index
      function levelListener() {
      const buttons = document.querySelectorAll('.Level-Btns');

      buttons.forEach(button => {
        button.addEventListener('click', () => {
          selectedLevel = button.id;
          currentIndex = 0; // Reset tab scroll

          // Update active styles
          buttons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');

          console.log("Selected level:", selectedLevel);

          // Refresh tab buttons with new level
          createTabButtons(businessData.Courses);
        });
      });
      }
      function createTabButtons(courseLevels) {
        const tabsContainer = document.getElementById("tabs");
        tabsContainer.innerHTML = "";

        const categories = courseLevels[selectedLevel];
        if (!categories) return;

        const categoryKeys = Object.keys(categories);
        const visibleKeys = categoryKeys.slice(currentIndex, currentIndex + 6);

        visibleKeys.forEach(key => {
          const button = document.createElement("button");
          button.textContent = key;
          button.className = "tab-btn";

          // Default style
          button.style.backgroundColor = Base;
          button.style.color = Prime5;
          button.style.transition = "background-color 0.3s, color 0.3s";

          button.addEventListener("mouseenter", () => {
            button.style.backgroundColor = Prime2;
            button.style.color = Prime5;
          });

          button.addEventListener("mouseleave", () => {
            button.style.backgroundColor = Base;
            button.style.color = Prime5;
          });

          tabsContainer.appendChild(button);
        });

        const leftBtn = document.getElementById("scroll-left");
        const rightBtn = document.getElementById("scroll-right");

        if (leftBtn) leftBtn.disabled = currentIndex === 0;
        if (rightBtn) rightBtn.disabled = currentIndex + 6 >= categoryKeys.length;
      }
      function scrollTabs(direction) {
        const totalKeys = Object.keys(businessData.Courses[selectedLevel]).length;

        if (direction === 'left' && currentIndex > 0) {
          currentIndex -= 6;
        } else if (direction === 'right' && currentIndex + 6 < totalKeys) {
          currentIndex += 6;
        }

        createTabButtons(businessData.Courses);
      }
      function createLevelbtnActions() {
        const levels = ["Beginner", "Intermediate", "Advanced"];

        levels.forEach(level => {
          const btn = document.getElementById(level);
          if (!btn) return;

          btn.addEventListener("mouseenter", () => {
            btn.style.backgroundColor = Prime2;
            btn.style.color = Prime5;
          });

          btn.addEventListener("mouseleave", () => {
            if (!btn.classList.contains("active")) {
              btn.style.backgroundColor = Prime3;
              btn.style.color = Prime5;
            }
          });
        });
      }
      // --- Initialize everything ---
      document.getElementById("scroll-left").addEventListener("click", () => scrollTabs('left'));
      document.getElementById("scroll-right").addEventListener("click", () => scrollTabs('right'));

      createLevelbtnActions();
      levelListener();
      createTabButtons(businessData.Courses);
    }
    function ActionBtnsBlock() {
      const lessonBtn = document.getElementById('lesson-Btn');
      const courseBtn = document.getElementById('Course-Btn'); // Fixed name (lowercase 'c')

      if (!lessonBtn || !courseBtn) return; // Safety check

      // Hover effects for lesson button
      lessonBtn.addEventListener("mouseenter", () => {
        lessonBtn.style.backgroundColor = Prime2;
        lessonBtn.style.color = Prime5;
      });

      lessonBtn.addEventListener("mouseleave", () => {
        lessonBtn.style.backgroundColor = Prime3;
        lessonBtn.style.color = Prime5;
      });

      // Hover effects for course button
      courseBtn.addEventListener("mouseenter", () => {
        courseBtn.style.backgroundColor = Prime2;
        courseBtn.style.color = Prime5;
      });

      courseBtn.addEventListener("mouseleave", () => {
        courseBtn.style.backgroundColor = Prime3;
        courseBtn.style.color = Prime5;
      });
    }
    function renderChartInfo(){
      const ctx1 = document.getElementById('chart1').getContext('2d');
      const ctx2 = document.getElementById('chart2').getContext('2d');

      new Chart(ctx1, {
        type: 'line',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
          datasets: [{
            label: 'Students',
            data: [20, 45, 40, 60, 90, 75, 100],
            borderColor: Prime2,
            tension: 0.4
          }]
        },
        options: {
          plugins: {legend: {display: false}},
          scales: {y: {beginAtZero: true}}
        }
      });

      new Chart(ctx2, {
        type: 'line',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
          datasets: [{
            label: 'Performance',
            data: [30, 50, 45, 70, 85, 85, 95],
            borderColor: Prime2,
            tension: 0.4
          }]
        },
        options: {
          plugins: {legend: {display: false}},
          scales: {y: {beginAtZero: true}}
        }
      });
    }


    
    


    renderWelcome();
    renderUserIcon();
    ActionBtnsBlock()
    CursosOfrecidosblock()

    renderChartInfo()

    
 }


  fetchAllContent();

 
 
 
 
 
     
   
 
 
 

 
 
 
 
 
 document.getElementById("Course-Btn").addEventListener("click", function () {
    window.location.href = "index11.7.html";
  });
  
document.getElementById("Home").addEventListener("click", function () {
  window.location.href = "index11.html";
});
document.getElementById("invocie").addEventListener("click", function () {
  window.location.href = "index11.1.html";
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