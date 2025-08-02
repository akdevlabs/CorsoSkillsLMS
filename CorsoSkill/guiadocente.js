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
    setTextColors(".hero", Prime5 )
    setBackgroundColorM(".hero", Base )
  }
  function GuideColors() {
    const style = document.createElement('style');
    style.textContent = `
      .guide-section h3 {
        color: ${Prime2};
      }
      .guide-step {
        background: ${Prime5};
      }
      .guide-step i {
        color: ${Base};
      }  
      .guide-step h2 {
        color: ${Prime2};
      }
      .guide-step p {
        color: ${Prime1};
      }  
      .guide-step h4 {

        color: #111827;
      }
    `;

    document.head.appendChild(style); // ✅ Append the style to apply it
  }
  function resourcesColors() {
    const style = document.createElement('style');
    style.textContent = `
      .resources-section {
        padding: 2rem 0;
      }

      .resources-section h3 {
        text-align: center;
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: #1f2937;
      }

      .resources-section ul {
        list-style: none;
        max-width: 600px;
        margin: auto;
      }

      .resources-section ul li {
        margin: 0.75rem 0;
        text-align: center;
      }

      .resources-section a {
        color: #2563eb;
        text-decoration: none;
        font-weight: 500;
      }

      .resources-section a:hover {
        text-decoration: underline;
      }
    `;

    document.head.appendChild(style); // ✅ Append the style to apply it
  }
  function ctaColors() {
    const style = document.createElement('style');
    style.textContent = `
      .cta-section {
        background:${Prime3};
        color: ${Prime5};
      }
      .cta-section h3 {
        font-size: 2rem;
        margin-bottom: 0.5rem;
      }
      .btn {
        background: ${Base};
        color: ${Prime5};
      }

      .btn:hover {
        background:${Prime2};
      }
    `;

    document.head.appendChild(style); // ✅ Append the style to apply it
  }

  function Footercolors(){
    setBackgroundColorM('#footer', Prime5)
    setBackgroundColorM('footer', Prime)
    setTextColors('#footer', Prime4)
  }

  Bodycolors()
  Navcolors()
  Herocolors()
  GuideColors()
  resourcesColors()
  ctaColors()
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
   const Guide = data.Guide


  console.log(Guide)
  
  
  function renderTextSection(containerId, Text) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.textContent = Text;
  }

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
  function renderPdfButtonWithPopupAndDownload(containerId, buttonText, pdfUrl) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Create the "View PDF" button
    const button = document.createElement('button');
    button.textContent = buttonText;
    button.style.padding = '0.75rem 1.5rem';
    button.style.margin = '0.5rem';
    button.style.border = 'none';
    button.style.borderRadius = '8px';
    button.style.backgroundColor = '#3b82f6';
    button.style.color = '#fff';
    button.style.cursor = 'pointer';
    button.style.fontSize = '1rem';

    // Modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.style.position = 'fixed';
    modalOverlay.style.top = 0;
    modalOverlay.style.left = 0;
    modalOverlay.style.width = '100vw';
    modalOverlay.style.height = '100vh';
    modalOverlay.style.background = 'rgba(0, 0, 0, 0.6)';
    modalOverlay.style.display = 'none';
    modalOverlay.style.justifyContent = 'center';
    modalOverlay.style.alignItems = 'center';
    modalOverlay.style.zIndex = 9999;

    // Modal content
    const modalContent = document.createElement('div');
    modalContent.style.background = '#fff';
    modalContent.style.padding = '1rem';
    modalContent.style.borderRadius = '10px';
    modalContent.style.width = '80%';
    modalContent.style.height = '80%';
    modalContent.style.display = 'flex';
    modalContent.style.flexDirection = 'column';
    modalContent.style.position = 'relative';

    // PDF iframe
    const iframe = document.createElement('iframe');
    iframe.src = pdfUrl;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Cerrar';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '10px';
    closeBtn.style.right = '10px';
    closeBtn.style.padding = '0.5rem 1rem';
    closeBtn.style.border = 'none';
    closeBtn.style.borderRadius = '6px';
    closeBtn.style.backgroundColor = '#ef4444';
    closeBtn.style.color = '#fff';
    closeBtn.style.cursor = 'pointer';

    // Download button
    const downloadBtn = document.createElement('a');
    downloadBtn.textContent = 'Descargar PDF';
    downloadBtn.href = pdfUrl;
    downloadBtn.download = '';
    downloadBtn.target = '_blank';
    downloadBtn.style.position = 'absolute';
    downloadBtn.style.top = '10px';
    downloadBtn.style.left = '10px';
    downloadBtn.style.padding = '0.5rem 1rem';
    downloadBtn.style.border = 'none';
    downloadBtn.style.borderRadius = '6px';
    downloadBtn.style.backgroundColor = '#10b981';
    downloadBtn.style.color = '#fff';
    downloadBtn.style.textDecoration = 'none';
    downloadBtn.style.fontSize = '0.9rem';

    // Button Events
    closeBtn.addEventListener('click', () => {
      modalOverlay.style.display = 'none';
    });

    button.addEventListener('click', () => {
      modalOverlay.style.display = 'flex';
    });

    // Assemble modal
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(downloadBtn);
    modalContent.appendChild(iframe);
    modalOverlay.appendChild(modalContent);

    // Append to DOM
    container.appendChild(button);
    document.body.appendChild(modalOverlay);
  }

  // 🔁 NEW FUNCTION to render all from the Links object
  function renderAllPdfButtons(containerId, linksObject) {
    const container = document.getElementById(containerId);
    if (!container || typeof linksObject !== 'object') return;

    Object.values(linksObject).forEach(item => {
      const title = item.Tittle?.trim();
      const url = item.link?.trim();
      if (title && url) {
        renderPdfButtonWithPopupAndDownload(containerId, title, url);
      }
    });
  }









  function heroContent() {
    renderTextSection("hero", Guide.hero.Tittle, Guide.hero.Text);
  }
  function cardsContent(){
    renderTextSection("PYC", Guide.Plan.btn.Tittle, Guide.Plan.btn.Text)
    renderTextSection("RV", Guide.Create.Btn.Tittle, Guide.Create.Btn.Text)
    renderTextSection("UC", Guide.Upload.Btn.Tittle, Guide.Upload.Btn.Text)
    renderTextSection("PC", Guide.Promos.Btn.Tittle, Guide.Promos.Btn.Text)
    renderTextSection("PmC",Guide.Money.Btn.Tittle, Guide.Money.Btn.Text)   
  }
  function hiddenContent(){
    renderAllPdfButtons("PYC-hidden", Guide.Plan.Links)
    renderAllPdfButtons("RV-hidden", Guide.Create.Links)
    renderAllPdfButtons("UC-hidden", Guide.Upload.Links)    
    renderAllPdfButtons("PC-hidden", Guide.Promos.Links)
    renderAllPdfButtons("PmC-hidden", Guide.Money.Links)




  }







  heroContent();
  cardsContent()
  hiddenContent()

})



document.getElementById('PYC-btn').addEventListener('click', function () {
  const element = document.getElementById("PYC-hidden");
  if (element) {
    element.style.display = (element.style.display === 'flex') ? 'none' : 'flex';
  }
});

document.getElementById('RV-btn').addEventListener('click', function () {
  const element = document.getElementById("RV-hidden");
  if (element) {
    element.style.display = (element.style.display === 'flex') ? 'none' : 'flex';
  }
});

document.getElementById('UC-btn').addEventListener('click', function () {
  const element = document.getElementById("UC-hidden");
  if (element) {
    element.style.display = (element.style.display === 'flex') ? 'none' : 'flex';
  }
});
document.getElementById('PC-btn').addEventListener('click', function () {
  const element = document.getElementById("PC-hidden");
  if (element) {
    element.style.display = (element.style.display === 'flex') ? 'none' : 'flex';
  }
});
document.getElementById('PmC-btn').addEventListener('click', function () {
  const element = document.getElementById("PmC-hidden");
  if (element) {
    element.style.display = (element.style.display === 'flex') ? 'none' : 'flex';
  }
});






function redirectToWhatsApp(phoneNumber, message) {
  const encodedMessage = encodeURIComponent(message);
  const isMobile = /iPhone|Android|iPad/i.test(navigator.userAgent);

  const baseURL = isMobile
    ? `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`
    : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

  window.open(baseURL, '_blank');
}

document.addEventListener("DOMContentLoaded", function () {
  const contactBtn = document.getElementById("contact-btn");
  if (contactBtn) {
    contactBtn.addEventListener("click", function () {
      redirectToWhatsApp("5212221706782", "¡Hola! Estoy interesado en soporte de docente.");
    });
  }
});



document.getElementById('backBtn').addEventListener('click', function () {
  window.location.href = "index.html";
});