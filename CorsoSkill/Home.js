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
  function setBodyBackgroundColor(backgroundColor, textColor) {
    document.body.style.backgroundColor = backgroundColor;
    document.body.style.color = textColor;
  }
  function setBackgroundColor(elementId, backgroundColor) {
    const element = document.getElementById(elementId);
    if (element) {
      element.style.backgroundColor = backgroundColor;
    } else {
      console.error(`Element with ID '${elementId}' not found.`);
    }
  }
  function setBorderBottom(elementId, borderStyle) {
    const element = document.getElementById(elementId);
    if (element) {
      element.style.borderBottom = borderStyle;
    } else {
      console.error(`Element with ID '${elementId}' not found.`);
    }
  }
  function setBorder(elementId, borderStyle) {
    const element = document.getElementById(elementId);
    if (element) {
      element.style.border = borderStyle;
    } else {
      console.error(`Element with ID '${elementId}' not found.`);
    }
  }
  function setTextColors(elementId, Tcolor){
    const element = document.getElementById(elementId);
    if (element) {
      element.style.color = Tcolor;
    } else {
      console.error(`Element with ID '${elementId}' not found.`);
    }
  }
  function setBackgroundColorWithTransparency(elementId, colorName, alpha) {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element with ID '${elementId}' not found.`);
      return;
    }
  
    // Create temporary element to compute RGB value
    const temp = document.createElement('div');
    temp.style.color = colorName;
    document.body.appendChild(temp);
  
    // Get computed RGB color
    const computedColor = window.getComputedStyle(temp).color;
    document.body.removeChild(temp);
  
    // Extract RGB values from string like "rgb(255, 0, 0)"
    const rgbMatch = computedColor.match(/\d+/g);
    if (rgbMatch && rgbMatch.length === 3) {
      const [r, g, b] = rgbMatch;
      element.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    } else {
      console.error(`Could not parse color: ${computedColor}`);
    }
  }
  
  function renderHeaderColors(){
    // Example usage:
    renderImage(data.BuLogos.Simple[2], "Bu logo" ,"Bulogo");
    setBodyBackgroundColor(Base, Prime5)
    setBackgroundColor("header", Prime1)



    setBorderBottom("header", `2px solid ${Prime4}`);
    setBorder("LoginBtn", `1px solid ${Prime2}`)
    setTextColors("LoginBtn", Prime2)
    setBackgroundColor("LoginBtn", Prime4)
    setBackgroundColor("startBtn", Prime2)
    setBackgroundColor("StartHBtn", Prime2)
    setTextColors("StartHBtn", Prime5)
    setTextColors("hero-Block", Base)
    setBackgroundColorWithTransparency("hero-Block", Prime4, .8);
   
  }

  function renderRoleCardColors(){
    setBackgroundColor('Role-Card-Block', Prime4)
    setBackgroundColor('Role-Card-Sidebar', Prime1)
    setBorder('Role-Card-Sidebar', `2px solid ${Base}`)
    setTextColors('Role-Card-Sidebar', Prime5)
  }





  
  renderHeaderColors()
  renderRoleCardColors()
});





async function RenderCoursesContent() {
  try {
    const docRef = doc(db, "CorsoSkillApp", "Courses"); // Make sure Courses is a valid string
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const documentData = docSnap.data();
      return documentData;
    } else {
      console.error("No such document in CorsoSkillApp!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document from CorsoSkillApp:", error);
    return null;
  }
}

async function applyContent() {
  try {
    const docRef = doc(db, "CorsoSkillsWebsite", TBuInfo); // Make sure TBuInfo is a valid string
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const documentData = docSnap.data();
      return documentData;
    } else {
      console.error("No such document in CorsoSkillsWebsite!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document from CorsoSkillsWebsite:", error);
    return null;
  }
}

// Fetch and log both documents
Promise.all([RenderCoursesContent(), applyContent()]).then(([coursesData, websiteData]) => {
  console.log("Courses Data:", coursesData);
  console.log("Website Content Data:", websiteData);

  function renderImage(imageUrl, altUrl, UrlId) {
    const logoElement = document.getElementById(UrlId);
    if (logoElement) {
      logoElement.src = imageUrl;
      logoElement.alt = altUrl;
    } else {
      console.error(`Element with ID '${UrlId}' not found.`);
    }
  }
  function setHeroBackgroundImage(imageUrl) {
    const heroSection = document.getElementById('Hero');
    if (heroSection) {
      heroSection.style.backgroundImage = `url('${imageUrl}')`;
      heroSection.style.backgroundSize = 'cover';
      heroSection.style.backgroundPosition = 'center';
      heroSection.style.backgroundRepeat = 'no-repeat';
    } else {
      console.error("Element with ID 'Hero' not found.");
    }
  }
  function renderText(elementId, text) {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = text;
    } else {
      console.error(`Element with ID '${elementId}' not found.`);
    }
  }
  function renderCourseSlots(obj, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container with ID '${containerId}' not found.`);
      return;
    }
  
    container.innerHTML = ""; // Clear old content
  
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const { Tittle, Description } = obj[key];
  
        const card = document.createElement("div");
        card.classList.add("course-card");
  
        const titleElement = document.createElement("h3");
        titleElement.textContent = Tittle;
  
        const descElement = document.createElement("p");
        descElement.textContent = Description;
  
        card.appendChild(titleElement);
        card.appendChild(descElement);
        container.appendChild(card);
      }
    }
  }
  
  
  



  function renderHeaderCont() {
    const header = websiteData.Constent.Header.Hero;
    setHeroBackgroundImage(header.Imgs[0]);
    renderText("hero-heading", header.Text.Heading.Normal);
    renderText("hero-body", header.Text.Body.Normal);
    renderText("StartHBtn", header.Text.ActionBtn.Normal);
  }
  function RenderCourseBlock() {
    const Courses = coursesData; // assume globally available
    console.log(typeof Courses);
  
    const filterButtons = document.querySelectorAll(".Role-Card-filters button");
    const levelSelector = document.getElementById("Role-Card-Selector");
  
    // Spanish-to-English level mapping
    const levelMap = {
      Basico: "Beginner",
      Intermedio: "Intermediate",
      Avanzado: "Advanced"
    };
  
    let currentLevel = "Beginner"; // default
  
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });
  
    levelSelector.addEventListener("change", (e) => {
      const selected = e.target.value;
      const level = levelMap[selected];
  
      if (!level) {
        console.warn(`Unrecognized level: ${selected}`);
        return;
      }
  
      currentLevel = level;
      console.log(`Selected level (mapped): ${level}`);
  
      const selectedLevelCourses = Courses[level];
      if (!selectedLevelCourses) {
        console.warn(`No courses found for level: ${level}`);
        return;
      }
  
      renderObjectKeys(selectedLevelCourses, "Role-Btn-Block");
    });
  
    function renderObjectKeys(obj, containerId) {
      const container = document.getElementById(containerId);
      if (!container) {
        console.error(`Container with ID '${containerId}' not found.`);
        return;
      }
  
      container.innerHTML = ""; // Clear previous content
  
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const button = document.createElement("button");
          button.textContent = key;
          button.classList.add("course-btn");
          container.appendChild(button);
  
          button.addEventListener("click", () => {
            console.log(`Button clicked: ${button.textContent}`);
            const courseSlot = Courses[currentLevel][key];
  
            if (!courseSlot) {
              console.warn(`No data found for slot: ${key}`);
              return;
            }
  
            renderCourseSlots({ [key]: courseSlot }, "test"); // You can pass just that slot
          });
        }
      }
    }
  
    // Default render
    levelSelector.value = "Basico";
    levelSelector.dispatchEvent(new Event("change"));
  }
  

  
  
  
  


  renderHeaderCont();
  RenderCourseBlock();
});

























 

function setFadePercentage(percent) {
  const fadeValue = `${percent}%`;
  const img = document.querySelector('#hero-img img');
  img.style.setProperty('--fade', fadeValue);
}

// Example: set fade to 20% on each side
setFadePercentage(20);