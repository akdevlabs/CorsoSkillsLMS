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

  function CourseBtnColors(){
   setBackgroundColor("Course-btn-block-text", Prime5)
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
  CourseBtnColors()
  CouresesColors()
  filtersColors()
  searchBarColors()
  CourseCardColors()

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


function renderText(text, elementId) {
  const container = document.getElementById(elementId);
  if (!container) {
    console.error(`Element with id '${elementId}' not found.`);
    return;
  }
  container.textContent = text;
}

function RenderCarrersDirect(courseArray) {
  const container = document.getElementById("course-grid");
  container.innerHTML = "";

  if (courseArray.length === 0) {
    container.innerHTML = "<p>No hay carreras disponibles.</p>";
    return;
  }

  const typeLabels = {
    AI: "Inteligencia Artificial",
    Business: "Negocios",
    Design: "Diseño",
    Finance: "Finanzas",
    Languages: "Idiomas",
    Leadership: "Liderazgo",
    Marketing: "Marketing",
    Productivity: "Productividad",
    Programming: "Programación",
    Sales: "Ventas",
    Technology: "Tecnología"
  };

  courseArray.forEach(course => {
    const translatedType = typeLabels[course.Type] || "No especificado";

    const card = document.createElement("div");
    card.className = "course-card";
    card.setAttribute("data-course-id", course.Cid);

    card.innerHTML = `
      <div class="card">
        <img src="${course.Img || 'https://via.placeholder.com/320x180'}" alt="Imagen de la carrera" />
        <h3>${course.Tittle}</h3>
        <p><strong>Tipo:</strong> ${translatedType}</p>
        <button class="view-All-Coureses-btn" data-id="${course.Cid}">Explorar todos los cursos</button>
      </div>
    `;

    container.appendChild(card);
  });
}

// 👇 Esta es la función con callback cuando cambie el filtro
function getSelectedCareer(onChangeCallback) {
  const selectElement = document.getElementById("Careers-filter");

  if (!selectElement) return;

  selectElement.addEventListener("change", function () {
    const selectedValue = selectElement.value || "Popular";
    console.log("Carrera seleccionada (cambio):", selectedValue);
    renderText(getLabelForType(selectedValue), "Course-Tittle");

    if (typeof onChangeCallback === "function") {
      onChangeCallback(selectedValue);
    }
  });

  // Valor inicial
  return selectElement.value || "Popular";
}

// 🔎 Filtro popular o por tipo
function FindPopularOrFilter(selectedCareer) {
  const AllCareers = businessData.Careers;
  const courseArray = Object.values(AllCareers);

  if (selectedCareer === "Popular") {
    const popularCourses = courseArray.filter(c => c.Popular === true && c.Cid);
    RenderCarrersDirect(popularCourses);
  } else {
    const filteredCourses = courseArray.filter(c => c.Type === selectedCareer && c.Cid);
    RenderCarrersDirect(filteredCourses);
  }
}

// 🎯 Traductor de etiqueta para mostrar texto bonito
function getLabelForType(typeKey) {
  const labels = {
    Popular: "Carreras Populares",
    AI: "Inteligencia Artificial",
    Business: "Negocios",
    Design: "Diseño",
    Finance: "Finanzas",
    Languages: "Idiomas",
    Leadership: "Liderazgo",
    Marketing: "Marketing",
    Productivity: "Productividad",
    Programming: "Programación",
    Sales: "Ventas",
    Technology: "Tecnología"
  };

  return labels[typeKey] || typeKey;
}

// 🚀 Inicializar filtro y render inicial
function initCareerFilter() {
  const selectedCareer = getSelectedCareer(FindPopularOrFilter);

  renderText(getLabelForType(selectedCareer), "Course-Tittle");

  const selectElement = document.getElementById("Careers-filter");
  if (selectElement) {
    selectElement.value = selectedCareer;
  }

  FindPopularOrFilter(selectedCareer);
}

initCareerFilter();





   








      function logCourseSlotIds(courses) {
        const ids = [];
        for (const key in courses) {
          if (courses.hasOwnProperty(key) && courses[key].Id) {
            ids.push(courses[key].Id);
          }
        }
        return ids;
      }

      function renderNewCoursesOnly(courseArray, existingIds) {
        const container = document.getElementById("course-grid");
        container.innerHTML = "";

        const newCourses = courseArray.filter(course => course.Id && !existingIds.includes(course.Id));

        if (newCourses.length === 0) {
          container.innerHTML = "<p>No hay cursos nuevos disponibles.</p>";
          return;
        }

        newCourses.forEach(course => {
          const card = document.createElement("div");
          card.className = "course-card";
          card.setAttribute("data-course-id", course.Id); // attach courseId as a data attribute
          card.innerHTML = `
            <div class="card">
              <img src="${course.CImg || 'https://via.placeholder.com/320x180'}" alt="Imagen del curso" />
              <h3>${course.Tittle}</h3>
              <p><strong>Profesor:</strong> ${course.Teacher?.Name || 'No especificado'}</p>
              <p><strong>Descripción:</strong> ${course.Description[0]  || 'Sin descripción'}</p>
              <button class="view-more-btn">Ver más información</button>
            </div>
          `;
          container.appendChild(card);
        });
      }

      // Event delegation: listen for clicks on any "Ver más información" button
      document.addEventListener("click", function (e) {
        if (e.target.classList.contains("view-more-btn")) {
          const courseCard = e.target.closest(".course-card");
          const courseId = courseCard.getAttribute("data-course-id");
          if (courseId) {
            localStorage.setItem("selectedCourseId", courseId);
            window.location.href = "index10.7.html";
          }
        }
      });


      function CheckCourses() {
        if (!studentData || !businessData) {
          console.warn("❌ studentData o businessData no están disponibles.");
          return;
        }

        const studentIds = logCourseSlotIds(studentData.Courses);
        const category = document.getElementById("category-filter").value;
        const level = document.getElementById("level-filter").value;
        const price = document.getElementById("price-filter").value;
        const sort = document.getElementById("sort-filter").value;
        const searchQuery = document.getElementById("searchInput").value.toLowerCase();

        const allCourses = businessData.Courses;
        const levels = ["Beginner", "Intermediate", "Advanced"];
        let collectedCourses = [];

        for (let cat in allCourses) {
          if (category !== "all" && cat !== category) continue;
          const levelSet = allCourses[cat];
          if (!levelSet) continue;

          if (level === "all") {
            levels.forEach(lvl => {
              const courses = levelSet[lvl];
              if (courses) collectedCourses.push(...Object.values(courses));
            });
          } else {
            const courses = levelSet[level];
            if (courses) collectedCourses.push(...Object.values(courses));
          }
        }

        collectedCourses = collectedCourses.filter(course => {
          const title = course.Tittle?.toLowerCase() || "";
          const desc = course.Description[0]?.toLowerCase() || "";
          return title.includes(searchQuery) || desc.includes(searchQuery);
        });

        collectedCourses = collectedCourses.filter(course => {
          if (price === "free") return course.Price === 0 || course.Free === true;
          if (price === "paid") return course.Price > 0 || course.Free === false;
          return true;
        });

        collectedCourses.sort((a, b) => {
          if (sort === "latest") return (b.Timestamp || 0) - (a.Timestamp || 0);
          if (sort === "popular") return (b.Popularity || 0) - (a.Popularity || 0);
          if (sort === "rated") return (b.Rating || 0) - (a.Rating || 0);
          return 0;
        });

        renderNewCoursesOnly(collectedCourses, studentIds);
      }

      // Detectar cambios en filtros
      ["category-filter", "level-filter", "price-filter", "sort-filter"].forEach(id => {
        document.getElementById(id).addEventListener("change", CheckCourses);
      });

      // Inicializar al cargar
      document.addEventListener("DOMContentLoaded", async () => {
        studentData = await getStudentData();
        businessData = await getBusinessData();

        document.getElementById("category-filter").value = "all";
        document.getElementById("level-filter").value = "all";
        document.getElementById("price-filter").value = "all";
        document.getElementById("sort-filter").value = "relevance";
        document.getElementById("searchInput").value = "";

        CheckCourses();
      });




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


