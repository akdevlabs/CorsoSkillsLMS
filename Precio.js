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






// ✅ Stripe connection
const stripe = Stripe("pk_live_51RVlJfAm4abMk6SePmUcLSH6hHznmLPkaiI2A5ek2h4QWMR6QoWXveraM6hZILiYKDSkSx9ymUa3sUMlBmdVORI800ynWaolC4");

// 🔹 Define Stripe Price IDs (from your Stripe Dashboard)
const PRICE_IDS = {
  basic: "9.99", // Replace with your actual Basic price ID
  pro: "price_PRO_ID",     // Replace with your actual Pro price ID
  anual: "price_ANUAL_ID", // Replace with your actual Annual price ID
};

// 🔹 Select buttons
const basicBtn = document.getElementById("Basic-btn");
const proBtn = document.getElementById("pro-btn");
const anualBtn = document.getElementById("Anual-btn");

// 🔹 Redirect helper
async function redirectToCheckout(priceId) {
  try {
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: priceId, quantity: 1 }],
      mode: "subscription", // "payment" if it's a one-time purchase
      successUrl: window.location.origin + "/success.html",
      cancelUrl: window.location.origin + "/cancel.html",
    });

    if (error) {
      console.error("❌ Stripe Checkout error:", error.message);
      alert("Hubo un error al procesar el pago. Inténtalo de nuevo.");
    }
  } catch (err) {
    console.error("❌ Error al conectar con Stripe:", err);
  }
}

// 🔹 Event Listeners
if (basicBtn) basicBtn.addEventListener("click", () => redirectToCheckout(PRICE_IDS.basic));
if (proBtn) proBtn.addEventListener("click", () => redirectToCheckout(PRICE_IDS.pro));
if (anualBtn) anualBtn.addEventListener("click", () => redirectToCheckout(PRICE_IDS.anual));

// 🔹 Optional: Auto-fill pricing info
document.addEventListener("DOMContentLoaded", () => {
  // Basic Plan
  document.getElementById("Basic-Tittle").textContent = "Plan Starter";
  document.getElementById("Basic-Price").textContent = "$9.99/mes";
  document.getElementById("Basic-features").innerHTML = `
    <li>Acceso a cursos básicos</li>
    <li>Certificados incluidos</li>
    <li>Soporte por correo</li>
  `;

  // Pro Plan
  document.getElementById("Pro-Tittle").textContent = "Plan Pro";
  document.getElementById("Pro-Price").textContent = "$19.99/mes";
  document.getElementById("Pro-features").innerHTML = `
    <li>Acceso a todos los cursos</li>
    <li>Mentorías personalizadas</li>
    <li>Soporte prioritario</li>
  `;

  // Annual Plan
  document.getElementById("Anual-Tittle").textContent = "Plan Anual";
  document.getElementById("Anual-Price").textContent = "$199/año";
  document.getElementById("Anual-features").innerHTML = `
    <li>12 meses de acceso ilimitado</li>
    <li>Certificaciones premium</li>
    <li>Descuento exclusivo</li>
  `;
});
