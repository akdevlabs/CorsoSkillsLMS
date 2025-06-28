// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore, doc, getDoc, collection, addDoc, setDoc, Timestamp, deleteField, updateDoc   } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

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
  function setBackgroundColor(selector, backgroundColor) {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      elements.forEach(element => {
        element.style.backgroundColor = backgroundColor;
      });
    } else {
      console.error(`No elements found for selector '${selector}'.`);
    }
  }
  function setTextColors(selector, Tcolor) {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      elements.forEach(element => {
        element.style.color = Tcolor;
      });
    } else {
      console.error(`No elements found for selector '${selector}'.`);
    }
  }
  function setGlobalFont(fontFamily) {
    document.body.style.fontFamily = fontFamily;
  }
  setGlobalFont(data.Font)




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





  function SetMainColors(){
    renderImage(data.BuLogos.Icons[0], "BuLogo", "Bulogos")
    setBodyBackgroundColor(Prime4)
    setBackgroundColor("#sidebar", Prime5)

  }
  function trophieBlockColors(){
    setBackgroundColor(".trophie-Contaiener", Prime5)
    setTextColors("#Tittle", Base)
   
  }




  function NewCoursesColors(){
    setTextColors("#New-Course-Tittle", Base)
    const style = document.createElement('style');
    style.textContent = `
      .custom-carousel-btn {
        color: ${Prime5};
        background: ${Base};
      }
      .custom-carousel-btn:hover {
        color: ${Prime5};
        background: ${Prime2};
      }
      .custom-course-card {
        background-color:${Prime5};
      }
      .custom-course-title {
        color:${Base};
      }
      .custom-course-instructor {
       color:${Prime};
      }
      .custom-progress-bar {
       background: ${Prime1};
      }
      .custom-progress-fill {
        background: ${Prime2};
      }
      .custom-progress-info {
        color:${Prime};
      }
    `;
    document.head.appendChild(style); 
  }


  
SetMainColors()
SideBarColors()
trophieBlockColors()





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
    return;
  }

  if (businessData) {
    console.log("Business Document Data:", businessData);
  } else {
    console.log("No business data found.");
  }
 
  function RendertrophieContent(){
    const  Task  = "True"
    const  Trophy = businessData.Trophies

    function renderTextSection(containerId, Text) {
      const container = document.getElementById(containerId);
      if (!container) return;
      container.textContent = Text;
    }

    function renderImage(imageUrl, altText, elementId) {
      const target = document.getElementById(elementId);

      if (!target) {
        console.error(`Element with ID '${elementId}' not found.`);
        return;
      }

      // Clear previous content
      target.innerHTML = '';

      if (imageUrl.endsWith('.svg')) {
        // Create and insert an <object> element for SVG
        const object = document.createElement('object');
        object.type = 'image/svg+xml';
        object.data = imageUrl;
        object.width = '100%';
        object.height = '100%';
        object.setAttribute('aria-label', altText);
        target.appendChild(object);
      } else {
        // Create and insert a standard <img> element
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = altText;
        img.style.width = '100%';
        img.style.height = 'auto';
        target.appendChild(img);
      }
    }
    renderTextSection("Tittle", "Text")





    

     if (Prgress === 100) {
       renderImage(Trophy.T1.Icons[0], "trophie-Block", "trophie-Block")
     }else{

     } 




    if (Task === "True") {
      renderImage(Trophy.T1.Icons[0], "trophie-Block", "trophie-Block")


    }else{



    }



  }


RendertrophieContent()


}

// Run the fetch
fetchAllContent()


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
  window.location.href = "index10.4.html";
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