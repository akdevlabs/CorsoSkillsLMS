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
  function setGlobalFont(fontFamily) {
    document.body.style.fontFamily = fontFamily;
  }
  setGlobalFont(data.Font)




  function Bodycolors(){
    setBodyBackgroundColor(Prime4, Base)
  }
  function Navcolors(){
    renderImage(data.BuLogos.Simple[1], "Bu logo" ,"Main-logo");
    setTextColors("#header", Prime2 )
    setBackgroundColorM("#header", Prime5 )
  }
  function Herocolors(){
    setTextColors("#hero", Prime5 )
    setBackgroundColorM(".hero", Prime )
  }
  function blogbtnColors(){
    function setPopupcolors() {
      const style = document.createElement('style');
      style.textContent = `
        /* Container for all media cards */
        #media-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding: 1rem;
          max-width: 800px;
          margin: 0 auto;
        }

        /* Individual media card */
        .media-card {
          background-color: ${Prime5};
          border: 1px solid ${Prime1};
          border-left: 5px solid ${Prime2};
        }
        .media-card h4 {
          color: ${Base};
        }
        .media-card p {
          color: ${Base};
        }
        .media-card a {
          color: ${Prime3};
        }
      `;
      document.head.appendChild(style);
    }
    function kitcolors() {
      const style = document.createElement('style');
      style.textContent = `
       /* Press Kit */
        .presskit-section {
          background-color: ${Prime5};
        }
        .presskit-section h3 {
          color: ${Base};
        }
        .presskit-section p {
          color: ${Prime1};
        }  
        .btn {
          background-color: ${Base};
          color: ${Prime5};
        }
        .btn:hover {
          background-color:${Prime2};
        }
      `;
      document.head.appendChild(style);
    }
    setPopupcolors();
    kitcolors()
  }
  function Footercolors(){
    setBackgroundColorM('#footer', Prime5)
    setBackgroundColorM('footer', Prime)
    setTextColors('#footer', Prime4)
  }

  Bodycolors()
  Navcolors()
  Herocolors()
  blogbtnColors()
  Footercolors()


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
  const Press = data.Constent.Press
 
  console.log(Press)

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
    renderTextSection("hero", Press.hero.Tittle, Press.hero.Text)
  }
  function mediaConten() {
    // ✅ Render media-style card
    function renderMediaCard(containerId, title, description, linkURL, linkText) {
      const container = document.getElementById(containerId);
      if (!container) {
        console.error(`Container with id "${containerId}" not found.`);
        return;
      }

      const card = document.createElement('div');
      card.className = 'media-card';

      card.innerHTML = `
        <h4>📺 ${title}</h4>
        <p>${description}</p>
        <a href="${linkURL}" target="_blank" rel="noopener noreferrer">${linkText}</a>
      `;

      container.appendChild(card);
    }

    // ✅ Check if slot has at least one non-empty value
    function isSlotFilled(slot) {
      return Object.values(slot).some(value => {
        if (Array.isArray(value)) return value.length > 0;
        return value && value.toString().trim() !== '';
      });
    }

    // ✅ Render all slots from Press.List
    function renderAllMedia(jobsObj, containerId) {
      if (!jobsObj || typeof jobsObj !== 'object') {
        console.error('Invalid or undefined jobs object passed:', jobsObj);
        return;
      }

      Object.keys(jobsObj).forEach(slotKey => {
        const slot = jobsObj[slotKey];
        if (typeof slot === 'object' && isSlotFilled(slot)) {
          const { tittle, text, link, type } = slot;
          renderMediaCard(containerId, tittle, text, link, type);
        }
      });
    }

    // ✅ Start rendering media cards
    renderAllMedia(Press.list, 'media-section');
  }
  function setButtonLink(buttonId, newHref) {
    const button = document.getElementById(buttonId);
    if (button && button.tagName === 'A') {
      button.setAttribute('href', newHref);
    } else {
      console.error(`Element with ID "${buttonId}" not found or is not an <a> tag.`);
    }
  }

  heroContent()
  mediaConten()
  setButtonLink("kit-btn", Press.kit)

})

document.getElementById('backBtn').addEventListener('click', function () {
  window.location.href = "index.html";
});


