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
  setGlobalFont(data.Font)

  
  function SetMainColors(){
    renderImage(data.BuLogos.Icons[0], "BuLogo", "Bulogos")
    setBodyBackgroundColor(Prime4)
    setBackgroundColor("sidebar", Prime5)
   
    
  }
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

  function resourceColors(){
        const style = document.createElement('style');
    style.textContent = `
      .resource-card-ui {
        background:${Prime5};
      }
      .resource-card-ui.completed {
        border-left-color: ${Prime3};
      }
      .resource-card-ui.pending {
        border-left-color: ${Prime1};
      }
      .lesson-title {
        color: ${Base};
      }
      .resource-info p {
        color:  ${Prime};
      }
      .pdf-link {
        color:${Prime3};
      }
      .pdf-link:hover {
        color: ${Prime2};
      }
      .badge-green {
        background:${Prime3};
        color:${Prime5};
      }
      .badge-yellow {
        background:${Prime1};
        color:${Prime5};
      }
      .course-block {
        background-color: ${Prime5};
      }

      .course-block-title {
        color:${Prime3};
        border-left: 4px solid ${Prime3};
      }
      .course-block::-webkit-scrollbar-thumb {
        background-color: ${Prime1};
      }
      .course-block::-webkit-scrollbar-track {
        background: transparent;
      }
    `;
    document.head.appendChild(style);

  }









SetMainColors()
SideBarColors()
CategorieColors()
resourceColors()





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
  }

  if (businessData) {
    console.log("Business Document Data:", businessData);
  } else {
    console.log("No business data found.");
  }

function findAllIdsByValue(obj, targetValue) {
  const matchingIds = [];

  function search(item) {
    if (typeof item !== 'object' || item === null) return false;

    let found = false;

    for (const key in item) {
      if (!item.hasOwnProperty(key)) continue;

      const val = item[key];

      if (val === targetValue) {
        found = true;
      }

      if (typeof val === 'object' && val !== null) {
        if (search(val)) {
          found = true;
        }
      }
    }

    if (found && item.Id) {
      matchingIds.push(item.Id);
    }

    return found;
  }

  search(obj);
  return matchingIds;
}

function findResourcesByIds(obj, targetIds) {
  const matchingResources = [];

  function search(item) {
    if (item === null || typeof item !== 'object') return;

    if (Array.isArray(item)) {
      for (const element of item) {
        search(element);
      }
    } else {
      if (item.Id && targetIds.includes(item.Id)) {
        matchingResources.push(item);
      }

      for (const key in item) {
        if (!Object.prototype.hasOwnProperty.call(item, key)) continue;
        const val = item[key];
        if (typeof val === 'object' && val !== null) {
          search(val);
        }
      }
    }
  }

  search(obj);
  return matchingResources;
}

function courseBtns() {
  const categoryButtons = document.querySelectorAll(".Categorie");
  const resourceContainer = document.getElementById("resource-container"); 
  const levelFilter = document.getElementById("level-filter");
  const { Base, Prime, Prime1, Prime2, Prime3, Prime4, Prime5 } = businessData.BuColors.Colors;

  categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
      // ✅ Clear prior rendered items
      resourceContainer.innerHTML = "";

      // ✅ Highlight the clicked category button & remove highlight from others
      categoryButtons.forEach(btn => {
        btn.style.borderColor = "";
        btn.style.color = "";
      });
      button.style.borderColor = Prime2;
      button.style.color = Prime2;

      const categoryId = button.id;
      const categoryName = button.querySelector("h2").textContent;

      console.log("Clicked Category ID:", categoryId);
      console.log("Clicked Category Name:", categoryName);

      const matchingCourseIds = findAllIdsByValue(studentData.Courses, categoryName);
      console.log("Matching Course IDs:", matchingCourseIds);

      // Refresh level dropdown
      const newLevelFilter = levelFilter.cloneNode(true);
      levelFilter.parentNode.replaceChild(newLevelFilter, levelFilter);

      // ✅ Set border to indicate selection required
      newLevelFilter.style.border = `4px solid ${Prime2}`;

      // ✅ Create extra optional status filter
      let extraFilter = document.getElementById("status-filter");
      if (!extraFilter) {
        extraFilter = document.createElement("select");
        extraFilter.id = "status-filter";
        extraFilter.innerHTML = `
          <option value="all">Todos los cursos</option>
          <option value="in-progress">Curso en progreso</option>
          <option value="completed">Curso finalizado</option>
        `;
        newLevelFilter.insertAdjacentElement("afterend", extraFilter);
      } else {
        extraFilter.value = "all"; // reset filter when new category
      }

      // ✅ Create search bar
      let searchBar = document.getElementById("Search-bar");
      if (!searchBar) {
        searchBar = document.createElement("input");
        searchBar.id = "Search-bar";
        searchBar.type = "text";
        searchBar.placeholder = "🔍 Buscar eBook por nombre o curso...";
        extraFilter.insertAdjacentElement("afterend", searchBar);
      } else {
        searchBar.value = ""; // reset search
      }

      // Function to render courses with current filters
      function renderCourses() {
        const selectedLevel = newLevelFilter.value;
        const statusValue = extraFilter.value;
        const searchTerm = searchBar.value.trim().toLowerCase();

        console.log("Selected Level:", selectedLevel);
        console.log("Extra Filter:", statusValue);
        console.log("Search Term:", searchTerm);

        // ✅ Remove highlight once level selected
        if (selectedLevel !== "") {
          newLevelFilter.style.border = `2px solid ${Prime2}`;
        }

        const allCourses = businessData.Courses;

        let matchedCategoryKey = null;
        for (const key in allCourses) {
          const courseCategory = allCourses[key];
          if (courseCategory.Info?.Tittle === categoryName) {
            matchedCategoryKey = key;
            break;
          }
        }

        if (!matchedCategoryKey) {
          console.warn(`No matching category found for name: ${categoryName}`);
          return;
        }

        const categoryCourses = allCourses[matchedCategoryKey];
        const levelCourses = categoryCourses[selectedLevel];

        if (!levelCourses || typeof levelCourses !== "object") {
          console.warn(`No courses found for level: ${selectedLevel}`);
          return;
        }

        let allResources = [];
        matchingCourseIds.forEach(id => {
          const resources = findResourcesByIds(levelCourses, id);
          if (resources.length > 0) {
            allResources.push(...resources);
          }
        });

        console.log("Resources Found:", allResources);

        // Save to localStorage
        localStorage.setItem("allResources", JSON.stringify(allResources));

        // Clear before rendering
        resourceContainer.innerHTML = "";

        // Group resources by course ID
        const groupedByCourse = {};
        allResources.forEach(resourceObj => {
          const courseId = resourceObj.Id;
          if (!groupedByCourse[courseId]) {
            groupedByCourse[courseId] = [];
          }
          const resources = resourceObj.Resources || {};
          for (const resKey in resources) {
            groupedByCourse[courseId].push(resources[resKey]);
          }
        });

        // Build course title lookup
        const courseDataMap = {};
        for (const categoryKey in businessData.Courses) {
          const categoryObj = businessData.Courses[categoryKey];
          for (const levelKey in categoryObj) {
            if (levelKey === "Info") continue;
            const levelObj = categoryObj[levelKey];
            if (typeof levelObj === "object") {
              for (const courseKey in levelObj) {
                const courseObj = levelObj[courseKey];
                if (courseObj?.Id) {
                  courseDataMap[courseObj.Id] = courseObj.Tittle || "Curso sin título";
                }
              }
            }
          }
        }

        // Render
        for (const courseId in groupedByCourse) {
          const courseTitle = courseDataMap[courseId] || "Curso desconocido";

          const courseBlock = document.createElement("div");
          courseBlock.classList.add("course-block");

          const courseHeader = document.createElement("h2");
          courseHeader.classList.add("course-block-title");
          courseHeader.textContent = courseTitle;
          courseBlock.appendChild(courseHeader);

          groupedByCourse[courseId].forEach((resource, index) => {
            const status = resource.Status || (index % 2 === 0 ? "Pendiente" : "Completado");

            // Status filter
            if (
              (statusValue === "completed" && status !== "Completado") ||
              (statusValue === "in-progress" && status !== "Pendiente")
            ) {
              return;
            }

            // Search filter
            if (
              searchTerm &&
              !courseTitle.toLowerCase().includes(searchTerm) &&
              !resource.Tittle.toLowerCase().includes(searchTerm)
            ) {
              return;
            }

            const card = document.createElement("div");
            card.classList.add("resource-card-ui");
            card.classList.add(status === "Completado" ? "completed" : "pending");

            card.innerHTML = `
              <div class="resource-info">
                <h3 class="lesson-title">Lección ${index + 1}: ${resource.Tittle}</h3>
                <p><strong>Curso:</strong> ${courseTitle}</p>
                <p><strong>Material:</strong> PDF - ${resource.Tittle}</p>
              </div>
              <div class="resource-actions">
                <a href="${resource.Link}" target="_blank" class="pdf-link">📘 Ver PDF</a>
                <span class="status ${status === "Completado" ? "badge-green" : "badge-yellow"}">
                  ${status}
                </span>
              </div>
            `;

            courseBlock.appendChild(card);
          });

          if (courseBlock.children.length > 1) {
            resourceContainer.appendChild(courseBlock);
          }
        }
      }

      // Listeners
      newLevelFilter.addEventListener("change", renderCourses);
      extraFilter.addEventListener("change", renderCourses);
      searchBar.addEventListener("input", renderCourses);
    });
  });
}

courseBtns();























}

// Run the fetch
fetchAllContent();




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
