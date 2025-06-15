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



  function Bodycolors(){
    setBodyBackgroundColor(Prime4, Base)
  }
  function Navcolors(){
    renderImage(data.BuLogos.Simple[1], "Bu logo" ,"Main-logo");
    setTextColors("#header", Prime2 )
    setBackgroundColorM("#header", Prime5 )
  }
  function Herocolors(){
    setTextColors(".hero", Prime5)
    setBackgroundColorM(".hero", Prime )
  }

  function blogbtnColors(){
    function setPopupcolors() {
      const style = document.createElement('style');
      style.textContent = `
        .partner-section {
          padding: 3rem 1rem;
        }
        .partner-section h3 {
          font-size: 1.75rem;
          margin-bottom: 2rem;
          text-align: center;
        }
        .partner-grid {
          width: 100%;
          gap: 1rem;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: center;
          margin: 0 auto;
        }
        .card {
          background-color: ${Prime5};
        }
        .card i {
          display: flex;
          font-size: 3rem;
          margin-bottom: 1rem;
          align-items: center;
          justify-content: center;
        }
        .card p {
          font-size: 1.2rem;
          margin: 1rem;
        }

        .steps-section {
          padding: 3rem 1rem;
        }

        .steps-section h3 {
          font-size: 1.75rem;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .steps-list {
          list-style: none;
          max-width: 700px;
          margin: 0 auto;
          counter-reset: step;
          padding: 0 1rem;
        }

        .steps-list li {
          background-color: ${Prime5};
          margin-bottom: 1.5rem;
          padding: 1.5rem 1.75rem;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.329);
          font-weight: bold;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
        }

        .steps-list li span {
          display: inline-block;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          text-align: center;
          line-height: 32px;
          margin-right: 0.75rem;
        }
        /* CTA */
        .cta-section {
          background: ${Prime3};
          color:${Prime5};
          text-align: center;
          padding: 3rem 0;
        }

        .cta-section h3 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .cta-section p {
          margin-bottom: 1.5rem;
        }

        .btn {
          background: ${Prime5};
          color: ${Prime3};
        }

        .btn:hover {
          color: ${Prime5};
          background:  ${Prime2};
        }
      `;
      document.head.appendChild(style);
    }
    setPopupcolors();

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
blogbtnColors()

});




async function BlogContent() {
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
BlogContent().then((data) => {  
   const Associations = data.Constent.Associations


  console.log(Associations.Cards.Card2.Text)
  
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

  

  function heroContent(){
    renderTextSection("hero", Associations.hero.Tittle, Associations.hero.Text)
  }
  function benefitsContent(){
     renderTextSection("card-1", Associations.Cards.Card1.Tittle,  Associations.Cards.Card1.Text) 
     renderTextSection("card-2", Associations.Cards.Card2.Tittle,  Associations.Cards.Card2.Text) 
     renderTextSection("card-3", Associations.Cards.Card3.Tittle,  Associations.Cards.Card3.Text) 
     renderTextSection("card-4", Associations.Cards.Card4.Tittle,  Associations.Cards.Card4.Text) 
  }
  function stepContent(){
    function renderStepsFromNestedObject(obj) {
      const ul = document.getElementById("steps-list");
      ul.innerHTML = ""; // Clear previous content

      // Convert to array and sort by `num`
      const sortedSlots = Object.values(obj).sort((a, b) => a.num - b.num);

      // Create and append list items
      sortedSlots.forEach((slot, index) => {
        const li = document.createElement("li");
        li.textContent = `🔹 ${slot.Text}`;
        ul.appendChild(li);
      });
    }
    renderStepsFromNestedObject(Associations.Work)
  }



  heroContent()
  benefitsContent()
  stepContent()

})
function redirectToWhatsApp(phoneNumber, message) {
    const encodedMessage = encodeURIComponent(message);
    const isMobile = /iPhone|Android|iPad/i.test(navigator.userAgent);

    const baseURL = isMobile
      ? `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    window.location.href = baseURL;
  }

  document.addEventListener("DOMContentLoaded", function () {
    const contactBtn = document.getElementById("contact-btn");
    if (contactBtn) {
      contactBtn.addEventListener("click", function () {
        redirectToWhatsApp("5212221706782", "¡Hola! Estoy interesado en tu Asociaciones Estratégicas.");
      });
    }
  });
document.getElementById('backBtn').addEventListener('click', function () {
  window.location.href = "index.html";
});