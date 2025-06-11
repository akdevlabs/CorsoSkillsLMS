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
  function setBackgroundColorM(selector, backgroundColor) {
    const elements = document.querySelectorAll(selector);

    if (elements.length === 0) {
      console.error(`No elements found for selector '${selector}'.`);
      return;
    }

    elements.forEach(element => {
      element.style.backgroundColor = backgroundColor;
    });
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
  function setBorder(selector, borderStyle) {
  const elements = document.querySelectorAll(selector);

  if (elements.length === 0) {
    console.error(`No elements found for selector '${selector}'.`);
    return;
  }

  elements.forEach(element => {
    element.style.border = borderStyle;
  });
}
  function applyRightToLeftFade(elementId, hexColor, fadeStartPercent = 50, duration = 1000) {
    const el = document.getElementById(elementId);
    if (!el) return;

    // Clamp percentage between 0 and 100
    fadeStartPercent = Math.max(0, Math.min(100, fadeStartPercent));

    // Create gradient: solid starts at 0%, starts fading at fadeStartPercent%, fully transparent at 100%
    const gradient = `linear-gradient(to right, ${hexColor} 0%, ${hexColor} ${fadeStartPercent}%, transparent 100%)`;

    // Set transition for smooth effect
    el.style.transition = `background ${duration}ms ease-in-out`;

    // Apply the gradient background
    el.style.background = gradient;
  }
  function setHoverStyle(selector, primeColor) {
    const elements = document.querySelectorAll(selector);

    if (elements.length === 0) {
      console.error(`No elements found for selector '${selector}'.`);
      return;
    }

    elements.forEach(element => {
      // Set default border and text color
      element.style.border = `2px solid ${primeColor}`;
      element.style.transition = 'all 0.3s ease'; // Smooth transition

      // Mouse enter: highlight
      element.addEventListener('mouseenter', () => {
        element.style.color  = Prime2;
        element.style.border = `2px solid ${Prime2}`;
      });

      // Mouse leave: revert
      element.addEventListener('mouseleave', () => {
        element.style.color = Prime3;
        element.style.border =  `2px solid ${Prime3}`;
      });
    });
  }
  function applybottomFade(elementId, hexColor, fadeStartPercent = 50, duration = 1000) {
    const el = document.getElementById(elementId);
    if (!el) return;

    // Clamp percentage between 0 and 100
    fadeStartPercent = Math.max(0, Math.min(100, fadeStartPercent));

    // Create gradient: solid starts at 0%, starts fading at fadeStartPercent%, fully transparent at 100%
    const gradient = `linear-gradient(to top, ${hexColor} 0%, ${hexColor} ${fadeStartPercent}%, transparent 80%)`;

    // Set transition for smooth effect
    el.style.transition = `background ${duration}ms ease-in-out`;

    // Apply the gradient background
    el.style.background = gradient;
  }
  function applyGradientFade(selector, color1, color2, fadeStartPercent = 90, duration = 1000) {
    // Clamp fadeStartPercent between 0 and 100
    fadeStartPercent = Math.max(0, Math.min(100, fadeStartPercent));

    // Build the gradient
    const gradient = `
      linear-gradient(to right,
        ${color1} 0%,
        ${color2} ${fadeStartPercent}%,
        transparent 100%
      )
    `;

    let elements = [];

    if (selector.startsWith('#')) {
      const el = document.getElementById(selector.slice(1));
      if (el) elements.push(el);
    } else if (selector.startsWith('.')) {
      elements = Array.from(document.querySelectorAll(selector));
    }

    elements.forEach(el => {
      el.style.transition = `background ${duration}ms ease-in-out`;
      el.style.background = gradient;
    });
  }


  function Bodycolors(){
    setBodyBackgroundColor(Prime4, Base)
  }
  function Navcolors(){
    renderImage(data.BuLogos.Simple[1], "Bu logo" ,"Main-logo");
    setTextColors("#header", Prime2 )
    setBackgroundColorM("#header", Prime5 )
  }
  function Herocolors(){
    setTextColors(".hero-text", Prime5 )
    setBackgroundColorM(".hero", Base )
  }
  function GuideColors(){
    
  }

  function Footercolors(){
    setBackgroundColorM('#footer', Prime5)
    setBackgroundColorM('footer', Prime)
    setTextColors('#footer', Prime4)
  }

  Bodycolors()
  Navcolors()
  Herocolors()

  Footercolors()


});


async function GuideContent() {
  try {
    const docRef = doc(db, "CorsoSkillsWebsite", TBuInfo); // Ensure db and transferredInfo are initialized
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
GuideContent().then((data) => {  
   const guide = data.Constent.Guide


  console.log(guide)
  
  function renderTextSection(containerId, titleText, subtitleText) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const title = document.createElement('h2');
    title.textContent = titleText;

    const subtitle = document.createElement('p');
    subtitle.textContent = subtitleText;

    container.appendChild(title);
    container.appendChild(subtitle);
  }
  function renderTextSection(containerId, Text) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.textContent = Text;
  }





  function heroContent(){
    renderTextSection("hero-tittle", guide.Hero.Tittle)
    renderTextSection("hero-text", guide.Hero.Text)
  }
   
 function pycContent(){
   function createCourseHeader(titleText, paragraphText, urlId) {
    const container = document.getElementById(urlId);

    if (!container) {
      console.error(`Container with ID "${urlId}" not found.`);
      return;
    }

    container.classList.add('course-toggle-container');

    // Create h2 and p
    const h2 = document.createElement('h2');
    h2.textContent = titleText;

    const p = document.createElement('p');
    p.textContent = paragraphText;


    // Toggle on container click
    container.addEventListener('click', () => {
      console.log("Clicked")
      hiddenPYC()
    });

    // Append elements
    container.appendChild(h2);
    container.appendChild(p);

  }
  
  createCourseHeader(guide.PlanCourse.Btn.Tittle, guide.PlanCourse.Btn.Text, "PYC")
 }

 function hiddenPYC(){
  console.log("Yellow")

 }





  heroContent()
  pycContent()


})




document.getElementById('backBtn').addEventListener('click', function () {
  window.location.href = "index.html";
});