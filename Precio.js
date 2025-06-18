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
  function setGlobalFont(fontFamily) {
    document.body.style.fontFamily = fontFamily;
  }
  setGlobalFont(data.Font)
  console.log(data)
  
  function NavBarColors(){
    renderImage(data.BuLogos.Simple[1], "Bu logo" ,"Main-logo");
    setBodyBackgroundColor(Prime4, Base)
    setBackgroundColor('header', Prime5)
    setTextColors(".nav-link", Prime)
    setTextColors(".ANLB", Prime2)
    setBorder("#LoginSBtn", `2px solid ${Prime2}`)
    setBorder("#LoginTBtn", `2px solid ${Prime2}`)
    setTextColors("#startBtn", Prime5)
    setBackgroundColor("startBtn", Prime2)
  }
  function renderCardscolors(){
    setTextColors(".card", Prime5)
    setTextColors("#Basic-card", Prime)
    setBackgroundColorM("#Basic-card", Prime5)
    setBackgroundColorM("#Pro-card", Base)
    setBackgroundColorM("#Anual-card", Prime5)
    setTextColors("#Anual-card", Prime)

    setBorder(".card", `2px solid ${Prime}`)
    setBackgroundColorM("#Basic-card", Prime5)




    setBorder("#Basic-btn", `3px solid ${Prime2}`)
    setTextColors("#Basic-btn", Prime2)


    setBackgroundColorM("#pro-btn", Prime2)
    setTextColors("#pro-btn", Prime5)


    setBorder("#Anual-btn", `3px solid ${Prime2}`)
    setBackgroundColorM("#Anual-btn", Prime5)
    setTextColors("#Anual-btn", Prime2)

  }

  function footerColors(){
    setBackgroundColorM("#footer", Base)
    setTextColors("#footer", Prime5)

  }














  NavBarColors()
  renderCardscolors()
  footerColors()



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

  function renderText(elementId, text) {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = text;
    } else {
      console.error(`Element with ID '${elementId}' not found.`);
    }
  }
  function renderFeatures(features, targetElementId) {
    const ul = document.getElementById(targetElementId);
    ul.innerHTML = ''; // Clear existing content

    features.forEach(feature => {
      const li = document.createElement('li');
      li.textContent = feature;
      ul.appendChild(li);
    });
  } 
  
  function RenderBasicPriceTier() {
    const Pricing = websiteData.Constent.Pricing;
    renderText("Basic-Tittle", Pricing.Starter.Tittle);
    renderText("Basic-Price", `$${Pricing.Starter.Cost} mxn/mes`);
    renderFeatures(Pricing.Starter.Features, "Basic-features")
    
  }

  function RenderProPriceTier() {
    const Pricing = websiteData.Constent.Pricing;
    renderText("Pro-Tittle", Pricing.Pro.Tittle);
    renderText("Pro-Price", `$${Pricing.Pro.Cost} mxn/mes`);
    renderFeatures(Pricing.Pro.Features, "Pro-features")
  }

  function RenderYearlyPriceTier() {
    const Pricing = websiteData.Constent.Pricing;
    renderText("Anual-Tittle", Pricing.Yearly.Tittle);
    renderText("Anual-Price", `$${Pricing.Yearly.Cost} mxn/mes`);
    renderFeatures(Pricing.Yearly.Features, "Anual-features")
  }

  
  
  
  RenderBasicPriceTier()
  RenderProPriceTier() 
  RenderYearlyPriceTier()
 
});





