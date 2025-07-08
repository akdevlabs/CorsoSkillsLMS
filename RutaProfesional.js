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








  SetMainColors()
  sidebarcolors()






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

      if (!studentData || !businessData) {
        console.log("Missing data: studentData or businessData is null");
        return;
      }

      console.log("Student Document Data:", studentData);
      console.log("Business Document Data:", businessData);

      async function getStudentData() {
        // 🔁 Reemplaza con tu lógica real (Firebase, API, etc.)
        return await fetchStudentDataFromFirebase();
      }

      async function getBusinessData() {
        // 🔁 Reemplaza con tu lógica real
        return await fetchBusinessDataFromFirebase();
      }

      function findCourseById(careerData, CId) {
        if (!CId) {
          console.warn("No course ID provided.");
          return null;
        }

        if (!careerData || typeof careerData !== "object") {
          console.warn("Invalid 'careerData' input.");
          return null;
        }

        for (const [careerKey, careerBlock] of Object.entries(careerData)) {
          // 🔍 1. Check if the career itself matches by Cid
          if (careerBlock?.Cid === CId) {
            console.log("📦 Career Data:", careerBlock);
            return careerBlock;
          }

          // 🔍 2. Search inside the CList
          const courseList = careerBlock?.CList;
          if (Array.isArray(courseList)) {
            for (const course of courseList) {
              if (course?.Id === CId) {
                console.log("✅ Found Course ID:", CId);
                console.log("📁 In Career:", careerKey);
                console.log("📦 Career Data:", careerBlock);
                return careerBlock;
              }
            }
          }
        }

        console.warn("Course ID not found:", CId);
        return null;
      }
      function findAllCourseById(courseData, CId) {
        const selectedId = CId;
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

      function renderCarrerPathBtns() {
        function createDropdown(array, containerId, selectId = 'myDropdown') {
          // Create the label
          const label = document.createElement('label');
          label.htmlFor = selectId;
          label.textContent = 'Carrera';
          label.style.display = 'block';
          label.style.marginBottom = '5px';
          label.style.fontWeight = 'bold';

          // Create the <select> element
          const select = document.createElement('select');
          select.id = selectId;

          // Create <option> elements using Tittle as label and Id as value
          array.forEach((item, index) => {
            const option = document.createElement('option');
            option.value = item.Id;
            option.textContent = item.Tittle;
            if (index === 0) option.selected = true; // Default to first
            select.appendChild(option);
          });

          // Append to the container
          const container = document.getElementById(containerId);
          container.innerHTML = ''; // Clear previous
          container.appendChild(label);
          container.appendChild(select);

          // Event listener to capture change
          select.addEventListener('change', () => {
            const selectedValue = select.value; // This is the Id
            console.log('Selected ID:', selectedValue);
          });

          return select.value; // Return default selected Id
        }

        // Example usage
        const optionsArray = studentData.Path;
       
        const selectedId = createDropdown(optionsArray, 'dropdown-container');
        console.log('Default selected ID:', selectedId);
        findCourseById(businessData.Careers, selectedId)

      }




   
      renderCarrerPathBtns()
    } catch (err) {
      console.error("Error in fetchAllContent:", err);
    }
}

// Run the fetch
fetchAllContent();



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
document.getElementById("profile").addEventListener("click", function () {
  window.location.href = "index10.8.html";
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


