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



  function CarrerColors(){
    setTextColors("#CPB-Tittle", Base)
    const style = document.createElement('style');
    style.textContent = `
      .Carrer-Path {
        background: ${Prime5};
      }
      #course-output h3 {
        color: ${Prime1};
      }
      #dropdown-container select {
        border: 2px solid ${Prime3};
      }
      #dropdown-container select:focus {
        border-color: ${Prime2};
        outline: none;
      }
    `;
    document.head.appendChild(style);
  }
  function KeysColors(){
    setBackgroundColor("Full", Prime2)
    setBackgroundColor("Almost", Prime3)
    setBackgroundColor("Half", Base)
    setBackgroundColor("Nothing", Prime4)


  }
  function CategorieColors(){
        const style = document.createElement('style');
    style.textContent = `
      .Main-tittle h1 {
        color:${Base};
      }
      .TC-title h1 {
       color:${Base};
      }  
      .TC-title p {
        color: ${Prime};
      }
      .Categorie {
        color: ${Base};
        background-color: ${Prime5};
      }
      .Categorie:hover {
        color:${Prime2};
         border-color: ${Prime2};
      }
      .filter-bar input {
        border: 2px solid ${Prime3};
      }
      .filter-bar select {
        border: 2px solid ${Prime3};
      }

    `;
    document.head.appendChild(style);

  }






  SetMainColors()
  sidebarcolors()
  CarrerColors()
  KeysColors()
CategorieColors()




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
    const {Base, Prime, Prime1, Prime2, Prime3, Prime4, Prime5} = businessData.BuColors.Colors;
    if (!studentData || !businessData) {
      console.log("Missing data: studentData or businessData is null");
      return;
    }

    console.log("Student Document Data:", studentData);
    console.log("Business Document Data:", businessData);



function FilterBlocks() {
    const categories = document.querySelectorAll(".Categorie");
    const CarrerBlock = businessData.Careers;
    const dropdownContainer = document.getElementById("dropdown-container");

    categories.forEach(category => {
        category.addEventListener("click", function () {
            const categoryId = this.id; // e.g., "Business"
            
            let categoryData = CarrerBlock[categoryId];
            if (!categoryData) {
                console.warn("Category not found:", categoryId);
                dropdownContainer.innerHTML = "<p>No data found for this category</p>";
                return;
            }

            // Clear old dropdown
            dropdownContainer.innerHTML = "";

            // Create dropdown
            const dropdown = document.createElement("select");

            // Optional: placeholder option
            const placeholderOption = document.createElement("option");
            placeholderOption.textContent = "Seleccione un título...";
            placeholderOption.disabled = true;
            placeholderOption.selected = true;
            dropdown.appendChild(placeholderOption);

            // Loop through keys (C1, C2, etc.)
            Object.keys(categoryData).forEach(key => {
                if (categoryData[key]?.Tittle) {
                    const option = document.createElement("option");
                    option.value = key; // store C1, C2, etc.
                    option.textContent = categoryData[key].Tittle;
                    dropdown.appendChild(option);
                }
            });

            // When a title is selected, log the full object and render courses
            dropdown.addEventListener("change", function () {
                const selectedKey = this.value; // e.g., "C1"
                const selectedObj = categoryData[selectedKey];
                console.log("Selected object:", selectedObj);
                
                const Courses = businessData.Courses[categoryId];
                console.log(Courses);

                // ======= Added: Render course blocks for selected object =======
                if (selectedObj) {
                    // extract course IDs from selectedObj.CList
                    const selectedCourseIds = extractIds(selectedObj.CList || []);
                    // find all full course objects from businessData.Courses
                    const allCourses = findAllCoursesByIds(businessData.Courses, selectedCourseIds);
                    // render course blocks with progress info into #course-output
                    renderSlotBlocks(selectedObj.CList || [], allCourses, studentData.Courses);
                }
            });

            dropdownContainer.appendChild(dropdown);
        });
    });
}


// Helper functions you provided, no changes here:

function findCourseById(careerData, CId) {
  if (!CId) return null;

  for (const [careerKey, careerBlock] of Object.entries(careerData)) {
    if (careerBlock?.Cid === CId) return careerBlock;

    const courseList = careerBlock?.CList;
    if (Array.isArray(courseList)) {
      for (const course of courseList) {
        if (course?.Id === CId) return careerBlock;
      }
    }
  }
  return null;
}

function findAllCoursesByIds(courseData, CIds) {
  const matchedCourses = [];
  const categories = Object.values(courseData);

  for (const category of categories) {
    if (typeof category !== "object") continue;

    const levels = ["Beginner", "Intermediate", "Advanced"];
    for (const level of levels) {
      const levelGroup = category[level];
      if (!levelGroup) continue;

      for (const course of Object.values(levelGroup)) {
        if (CIds.includes(course.Id)) matchedCourses.push(course);
      }
    }
  }
  return matchedCourses;
}

function extractIds(CList) {
  return CList.map(item => item.Id);
}

function renderSlotBlocks(cList, fullCourses, courseProgressData) {
  const slotMap = {};

  // Group course Ids by slot
  cList.forEach(item => {
    if (!slotMap[item.Slot]) slotMap[item.Slot] = [];
    slotMap[item.Slot].push(item.Id);
  });

  const container = document.getElementById("course-output");
  container.innerHTML = '';

  Object.keys(slotMap).sort((a, b) => a - b).forEach(slot => {
    const weekBlock = document.createElement('div');
    weekBlock.style.marginBottom = '20px';

    const heading = document.createElement('h3');
    heading.textContent = `Semana ${slot}`;
    heading.style.marginBottom = '8px';
    heading.style.color = '#333';
    weekBlock.appendChild(heading);

    const ul = document.createElement('ul');
    slotMap[slot].forEach(courseId => {
      const course = fullCourses.find(c => c.Id === courseId);
      if (course) {
        const li = document.createElement('li');
        li.textContent = course.Tittle;

        // Apply color based on progress (make sure Prime, Prime2, etc. are defined)
        const progressEntry = Object.values(courseProgressData).find(p => p.Id === courseId);
        const progress = progressEntry?.progress;

        if (progress === 100) {
          li.style.color = Prime5;
          li.style.backgroundColor = Prime2;
        } else if (progress === 80) {
          li.style.color = Prime5;
          li.style.backgroundColor = Prime3;
        } else if (progress === 50) {
          li.style.color = Prime5;
          li.style.backgroundColor = Base;
        } else {
          li.style.color = Prime;
          li.style.backgroundColor = Prime4;
        }

        ul.appendChild(li);
      }
    });

    weekBlock.appendChild(ul);
    container.appendChild(weekBlock);
  });
}









    FilterBlocks()




    
    
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
document.getElementById("Classroom").addEventListener("click", function () {
  window.location.href = "index10.7.html";
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


document.getElementById("Settings").addEventListener("click", function () {
  window.location.href = "index10.6.html";
}); 
document.getElementById("profile").addEventListener("click", function () {
  window.location.href = "index10.4.html";
});   
document.getElementById("Logout").addEventListener("click", function () {
  window.location.href = "index4.html";
});   