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
    downloadBtn.style.backgroundColor = '#10b981'; // green-500
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








  heroContent();
  cardsContent()


})
document.getElementById('PYC-btn').addEventListener('click', function () {
  console.log("red")
});
document.getElementById('RV-btn').addEventListener('click', function () {
  console.log("blue")
});
document.getElementById('UC-btn').addEventListener('click', function () {
  console.log("yellow")
});
document.getElementById('PC-btn').addEventListener('click', function () {
  console.log("black")
});
document.getElementById('PmC-btn').addEventListener('click', function () {
  console.log("purple")
});









document.getElementById('backBtn').addEventListener('click', function () {
  window.location.href = "index.html";
});