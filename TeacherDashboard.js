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
  function setstatColors(){
   setallBackgroundColor(".stat-card", Prime5)
   setallBackgroundColor(".stat-card-active", Base)
   setTextColors(".stat-value", Prime)
   setTextColors(".stat-label", Prime)
   setTextColors("#Cclasses", Prime5)
   setTextColors("#stat-label-active", Prime5)
   setBorder(".stat-card", `2px solid ${Base}`);
   setBorder(".stat-icon", `2px solid ${Base}`);
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


  
 

  setGlobalFont(data.Font)
  SetMainColors()
  sidebarcolors()
  Setmaincolors()
  SetUserInfoColors()

  setheadercolors()
  setstatColors()
  setNextClassColors()
 setcardContainerColors()


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




  
  const classes = [
      { title: "Contextual understanding and design process flow", subtitle: "UI/UX FUNDAMENTAL", hours: "14 Hours", status: "active", buttonText: "START THE CLASS", buttonType: "start" },
      { title: "Introduction to foundation of desk research and how to present", subtitle: "UI/UX FUNDAMENTAL", hours: "20 Hours", status: "upcoming", buttonText: "UPCOMING CLASS", buttonType: "upcoming" },
      { title: "Basic illustration and how to use the adobe illustrator", subtitle: "UI/UX FUNDAMENTAL", hours: "32 Hours", status: "upcoming", buttonText: "UPCOMING CLASS", buttonType: "upcoming" },
      { title: "Introduction to foundation of desk research and how to present", subtitle: "UI/UX FUNDAMENTAL", hours: "20 Hours", status: "upcoming", buttonText: "UPCOMING CLASS", buttonType: "upcoming" },
      { title: "Basic illustration and how to use the adobe illustrator", subtitle: "UI/UX FUNDAMENTAL", hours: "32 Hours", status: "upcoming", buttonText: "UPCOMING CLASS", buttonType: "upcoming" },
      { title: "Basic illustration and how to use the adobe illustrator", subtitle: "UI/UX FUNDAMENTAL", hours: "32 Hours", status: "upcoming", buttonText: "UPCOMING CLASS", buttonType: "upcoming" },
      { title: "Introduction to foundation of desk research and how to present", subtitle: "UI/UX FUNDAMENTAL", hours: "20 Hours", status: "upcoming", buttonText: "UPCOMING CLASS", buttonType: "upcoming" },
      { title: "Basic illustration and how to use the adobe illustrator", subtitle: "UI/UX FUNDAMENTAL", hours: "32 Hours", status: "upcoming", buttonText: "UPCOMING CLASS", buttonType: "upcoming" }
    ];

    const avatars = [
      "https://i.pravatar.cc/28?img=1",
      "https://i.pravatar.cc/28?img=2",
      "https://i.pravatar.cc/28?img=3"
    ];

    const container = document.getElementById("cardContainer");

    // Render cards
    classes.forEach(cls => {
      const card = document.createElement("div");
      card.className = `card ${cls.status === "active" ? "active" : ""}`;

      card.innerHTML = `
        <h4>${cls.subtitle}</h4>
        <h3>${cls.title}</h3>
        <div class="hours">${cls.hours}</div>
        <button class="btn ${cls.buttonType}">${cls.buttonText}</button>
        <div class="avatars">
          ${avatars.map(src => `<img src="${src}" />`).join("")}
          <span>+22</span>
        </div>
      `;
      container.appendChild(card);
    });

    // Carousel Logic
    const track = document.querySelector(".carousel-track");
    const prevBtn = document.querySelector(".carousel-btn.prev");
    const nextBtn = document.querySelector(".carousel-btn.next");
    let index = 0;

    function updateCarousel() {
      const cardWidth = document.querySelector(".card").offsetWidth + 20; // card + margin
      track.style.transform = `translateX(-${index * cardWidth}px)`;
    }

    prevBtn.addEventListener("click", () => {
      if (index > 0) index--;
      updateCarousel();
    });

    nextBtn.addEventListener("click", () => {
      if (index < classes.length - 1) index++;
      updateCarousel();
    });











  renderWelcome()
  renderId()
  renderUserIcon()
  renderAlertIcons()

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
  window.location.href = "index11.5.html";
}); 



document.getElementById("Settings").addEventListener("click", function () {
  window.location.href = "index11.6.html";
});   
document.getElementById("Logout").addEventListener("click", function () {
  window.location.href = "index4.html";
});  

