import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
  import {
    getFirestore,
    doc,
    getDoc
  } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
  import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signOut
  } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
  const firebaseConfig = {
    apiKey: "AIzaSyD2w5sXCGRBxne-23FRCTAXQrMwHt4nHTY",
    authDomain: "corsoskills-1ba50.firebaseapp.com",
    projectId: "corsoskills-1ba50",
    storageBucket: "corsoskills-1ba50.appspot.com",
    messagingSenderId: "813928863826",
    appId: "1:813928863826:web:771cd8ad820570441fa78b",
    measurementId: "G-MYT63ZNNCC"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

  const TBuInfo = "CorsoSkills";

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
    function applyGradientFade(elementId, color1, color2, fadeStartPercent = 90, duration = 1000) {
      const el = document.getElementById(elementId);
      if (!el) return;

      // Clamp percentage
      fadeStartPercent = Math.max(0, Math.min(100, fadeStartPercent));

      // Construct a three-stop gradient:
      // - Color1 on the left
      // - Color2 in the middle
      // - Transparent from fadeStartPercent to 100%
      const gradient = `
        linear-gradient(to right,
          ${color1} 0%,
          ${color2} ${fadeStartPercent}%,
          transparent 100%
        )
      `;

      // Apply smooth transition and background
      el.style.transition = `background ${duration}ms ease-in-out`;
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
    function getBoxShadow(color = 'rgba(78, 70, 229, 0.692)', intensity = 1) {
      const yOffset = 10 * intensity;
      const blurRadius = 30 * intensity;
      return `0 ${yOffset}px ${blurRadius}px ${color}`;
    }
    function changeCloseNavColor(color) {
      const closeNavBtn = document.getElementById('closeNav');
      if (closeNavBtn) {
        closeNavBtn.style.color = color;
      }
    }


    function SideNavcolors(){
      setTextColors(".sideNav-link", Prime5 )
      setBackgroundColorM("#sideNav", Prime)
      
    }

    function BannerColors(){
      renderImage(data.BuLogos.Simple[1], "Bu logo" ,"Main-logo");
      setBodyBackgroundColor(Prime4, Base)
      setBackgroundColor('header', Prime5)
      setTextColors(".nav-link", Prime)
      setTextColors(".ANLB", Prime2)
      setBorder("#LoginSBtn", `2px solid ${Prime2}`)
      setBorder("#LoginTBtn", `2px solid ${Prime2}`)


      setBackgroundColorM("#startBtn", Prime2)
      setTextColors("#startBtn", Prime5)
    
    }
    function heroColors(){
      applyGradientFade(
        'community-header',         // ID of your element
        Prime,                  // Left side color
        Prime3,                  // Right side color
        100,                        // Optional: where to start fading to transparent
        1000                        // Duration of the transition in ms
      );
      setTextColors("#community-header-tittle", Prime5)
      setTextColors("#community-header-Subtittle", Prime5)
    }
    function CardColors() {
      setBackgroundColorM(".community-card", Prime5);
      setTextColors(".fas", Base);
      const cards = document.querySelectorAll(".community-card");
      cards.forEach(card => {
        const originalShadow = card.style.boxShadow;

        card.addEventListener("mouseenter", () => {
          card.style.boxShadow = getBoxShadow(Prime2, 1.2);

          // Change icon color only inside this card
          const icons = card.querySelectorAll(".fas");
          icons.forEach(icon => {
            icon.style.color = Prime2;
          });
        });

        card.addEventListener("mouseleave", () => {
          card.style.boxShadow = originalShadow;

          // Reset icon color inside this card
          const icons = card.querySelectorAll(".fas");
          icons.forEach(icon => {
            icon.style.color = Base;
          });
        });
      });
      setTextColors("#community-header", Prime5)
      setTextColors(".Subtittle", Prime1);
    
    
    }
    function Footercolors(){
      setBackgroundColorM('#footer', Prime)
      setTextColors('#footer', Prime5)
    }

    SideNavcolors()
    BannerColors()
    heroColors()
    CardColors()
    Footercolors()


  });

  async function WebsiteContent() {
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
  WebsiteContent().then((data) => {  
    const Hero  = data.Constent.Community.Hero
    const Cards = data.Constent.Community.Cards


    console.log(Cards)



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




    function renderHeroContent(){
      renderTextSection("community-header-tittle", Hero.Tittle)
      renderTextSection("community-header-Subtittle", Hero.Subtittle)
    }

    function renderCardContent(){
      renderTextSection("Card-tittle-1", Cards.Slot1.tittle)
      renderTextSection("Card-subtittle-1", Cards.Slot1.content)

      renderTextSection("Card-tittle-2", Cards.Slot2.tittle)
      renderTextSection("Card-subtittle-2", Cards.Slot2.content)

      renderTextSection("Card-tittle-3", Cards.Slot3.tittle)
      renderTextSection("Card-subtittle-3", Cards.Slot3.content)

      renderTextSection("Card-tittle-4", Cards.Slot4.tittle)
      renderTextSection("Card-subtittle-4", Cards.Slot4.content)

    }

    renderHeroContent()
    renderCardContent()
  });


  document.getElementById('menuToggle').addEventListener('click', () => {
  const sideNav = document.getElementById('menuToggle');
  document.getElementById('sideNav').classList.add('open');
  sideNav.style.display = 'none';
});

document.getElementById('closeNav').addEventListener('click', () => {
  const sideNav = document.getElementById('menuToggle');
  document.getElementById('sideNav').classList.remove('open');
   sideNav.style.display = 'block';
});