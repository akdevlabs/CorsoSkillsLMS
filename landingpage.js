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


  console.log(data)
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
    setTextColors("#startBtn", Prime5)
   
  }
  function HeroColors(){
    setBackgroundColor("startBtn", Prime2)

    setBackgroundColor("StartHBtn", Prime2)
    applyRightToLeftFade('hero-Block-text', Prime, 30, 1500)
    setTextColors('.hero-Block-text', Prime5)
    setTextColors("#StartHBtn", Prime5)


  }
  function StatColors(){
    setBackgroundColorM(".stat", Prime)
    applyGradientFade(
      ".stat",         // ID of your element
      Prime,                  // Left side color
      Base,                  // Right side color
      100,                        // Optional: where to start fading to transparent
      1000                        // Duration of the transition in ms
    );
    setTextColors(".stat", Prime5)
  }
  function CategorieColors(){
    setTextColors(".Categorie", Prime)
    setBorder(".Categorie", `2px solid ${Prime}`);
    setHoverStyle('.Categorie', Prime);
    setBackgroundColor("showMoreBtn", Prime2)
    setTextColors("#showMoreBtn", Prime5)
    setBackgroundColor("course-category", Prime5)
     setTextColors(".TC-tittle", Prime)
     setBorder(".course-category", `3px solid ${Prime}`);
  }
  function WCUColor(){
    setBackgroundColorM('.card ', Prime5)
    setTextColors('.card ', Prime)
    setBackgroundColorM('.bg-shape', Prime3)
    setTextColors(".subtitle", Prime3)
    setTextColors(".title", Prime)
  }
  function Eventscolors(){
    setBackgroundColorM(".Event-Block", Prime5)
    setTextColors("#event-subtitulo", Prime3) 
    setTextColors("#event-titulo", Base) 
    setTextColors("#Shows-all-events", Prime2) 
    const style = document.createElement('style');
    style.textContent = `
      .event {
        background: ${Prime5};
        border: 1px solid ${Prime};
      }
      .event-date {
        background: ${Prime3};
        color: ${Prime5};
      }
      .event-info h3 {
        color:${Base};
      }
      .event-info p {
        color:${Prime1};
      }
    `;
    document.head.appendChild(style);
  }

  function reviewcolors(){
      

    const style = document.createElement('style');
    style.textContent = `
      .review-block h3 {
        color: ${Prime3};
        
      }
      .review-block h1 {
        color: ${Prime};
        font-size: 32px;
        margin-bottom: 40px;
      }
      .review {
        background-color: ${Prime5};
        border: 1px solid ${Prime};
      }
      .review .message {
        color: ${Prime1};
      }
      .review .name {
        color: ${Base};
      }
      .review .stars {
        color: ${Prime2};
      }
    `;
    document.head.appendChild(style);
    setTextColors('#next', Prime5) 
    setBackgroundColorM('#next', Prime2) 
    setTextColors('#back', Prime5)  
    setBackgroundColorM('#back', Prime2)     
  }
   function Footercolors(){
    setBackgroundColorM('.footer-line', Prime1)
    renderImage(data.BuLogos.Simple[1], "Bu logo" ,"footer-logo-Img");
    setBackgroundColorM('#footer', Prime5)
    setBackgroundColorM('footer', Prime)
    setTextColors('#footer', Prime4)
    setTextColors(".footer-link", Prime4)
    setBackgroundColorM('#SubBtn-newsletter', Prime2)
    setTextColors('#SubBtn-newsletter', Prime5)

  }

  SideNavcolors()
  BannerColors()
  HeroColors()
  StatColors()
  CategorieColors()
  WCUColor()
  Eventscolors()
  reviewcolors()
  Footercolors()


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
  function setHeroBackgroundImage(imageUrl,url) {
    const heroSection = document.getElementById(url);
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
    const header = websiteData.Constent.Landing.Header.Hero;
    setHeroBackgroundImage(header.Imgs[1], 'Hero');
    renderText("hero-heading", header.Text.Heading.Normal);
    renderText("hero-body", header.Text.Body.Normal);
    renderText("StartHBtn", header.Text.ActionBtn);

  }
  function WCUBlock(){
  
    renderImage(websiteData.Constent.Landing.WCU.Imgs[0], "professional", "WCU-img")
  }

  function Eventscontent(){
    function eventContent() {
      let currentIndex = 0;
      const eventsPerPage = 3;
      const eventSlots = websiteData.Constent.Events.List;

      // Get slot keys and reverse to show newest first
      const slotKeys = Object.keys(eventSlots).reverse();
      console.log(`Total event slots: ${slotKeys.length}`);

      slotKeys.forEach((key, index) => {
      // console.log(`slot#${index + 1}: ${key}`);
      });

      // Convert each slot to an array of event objects
      const eventsData = slotKeys.map(slot => eventSlots[slot]);

      function renderEvents() {
        const container = document.getElementById("event-list-block");
        container.innerHTML = "";

        const sliced = eventsData.slice(currentIndex, currentIndex + eventsPerPage);

        sliced.forEach(event => {
          const eventBtn = document.createElement("button");
          eventBtn.className = "event";
          eventBtn.innerHTML = `
            <div class="event-date">
              <span class="day">${event.Date[0]}</span>
              <span class="month">${event.Date[1]}</span>
            </div>
            <div class="event-info">
              <h3 class="event-description">${event.Description}</h3>
              <p class="event-time">${event.Time}</p>
              <p class="event-address">${event.Adress}</p>
            </div>
          `;

          eventBtn.addEventListener("click", () => {
          // console.log(`Event title: ${event.Description}`);
          });

          container.appendChild(eventBtn);
        });
      }

      document.getElementById("next").addEventListener("click", () => {
        if (currentIndex + eventsPerPage < eventsData.length) {
          currentIndex += eventsPerPage;
          renderEvents();
        }
      });

      document.getElementById("back").addEventListener("click", () => {
        if (currentIndex - eventsPerPage >= 0) {
          currentIndex -= eventsPerPage;
          renderEvents();
        }
      });

      // Initial render
      renderEvents();
    }
    function alleventContent() {
      const eventSlots = websiteData.Constent.Events.List;
      const slotKeys = Object.keys(eventSlots).reverse(); // Newest first
      const eventsData = slotKeys.map(slot => eventSlots[slot]);

      const popup = document.createElement("div");
      popup.id = "event-popup";
      popup.style.position = "fixed";
      popup.style.top = "0";
      popup.style.left = "0";
      popup.style.width = "100vw";
      popup.style.height = "100vh";
      popup.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
      popup.style.display = "none";
      popup.style.justifyContent = "center";
      popup.style.alignItems = "center";
      popup.style.zIndex = "9999";

      const content = document.createElement("div");
      content.style.background = "#fff";
      content.style.padding = "20px";
      content.style.borderRadius = "10px";
      content.style.maxHeight = "80vh";
      content.style.overflowY = "auto";
      content.style.width = "90%";
      content.style.maxWidth = "600px";
      content.style.position = "relative";

      const closeBtn = document.createElement("span");
      closeBtn.innerHTML = "&times;";
      closeBtn.style.position = "absolute";
      closeBtn.style.top = "10px";
      closeBtn.style.right = "20px";
      closeBtn.style.fontSize = "24px";
      closeBtn.style.cursor = "pointer";
      closeBtn.style.color = "#000";

      closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
      });

      popup.appendChild(content);
      content.appendChild(closeBtn);
      document.body.appendChild(popup);

      function renderAllEvents() {
        content.innerHTML = '';
        content.appendChild(closeBtn);

        eventsData.forEach(event => {
          const eventEl = document.createElement("div");
          eventEl.className = "event";

          eventEl.innerHTML = `
            <div class="event-date">${event.Date[0]} ${event.Date[1]}</div>
            <div class="event-info">
              <h3>${event.Description}</h3>
              <p class="event-time">${event.Time}</p>
              <p class="event-address">${event.Adress}</p>
            </div>
          `;

          content.appendChild(eventEl);
        });
      }

      document.getElementById("Shows-all-events").addEventListener("click", () => {
        renderAllEvents();
        popup.style.display = "flex";
      });
    }


    alleventContent()
    eventContent()
    renderImage(websiteData.Constent.Landing.Events.Img[3], "professional", "Event-img-1")
    renderImage(websiteData.Constent.Landing.Events.Img[1], "professional", "Event-img-2")
    renderImage(websiteData.Constent.Landing.Events.Img[4], "professional", "Event-img-3")
    renderImage(websiteData.Constent.Landing.Events.Img[3], "professional", "mobile-Even-img")
  }
  
  function ReviewContent() {
    let currentIndex = 0;
    const reviewsPerPage = 3;
    const reviewsSlots = websiteData.Constent.Reviews;

    function renderImg(){
      renderImage(websiteData.Constent.reviewCont.img, "Team", "review-left-img")  
      renderImage(websiteData.Constent.reviewCont.img, "Team", "mobile-review-img")       

    }
    renderImg()
    // Get all slot keys (slot1, slot2, ...)
    const slotKeys = Object.keys(reviewsSlots);
    console.log(`Total slots: ${slotKeys.length}`);

    slotKeys.forEach((key, index) => {
     // console.log(`slot#${index + 1}: ${key}`);
    });

    // Convert each slot object into a review object array
    const reviewsData = slotKeys.map(slot => reviewsSlots[slot]);

    function renderReviews() {
      const container = document.getElementById("reviews");
      container.innerHTML = "";

      const sliced = reviewsData.slice(currentIndex, currentIndex + reviewsPerPage);

      sliced.forEach(review => {
        const reviewEl = document.createElement("div");
        reviewEl.className = "review";
        reviewEl.innerHTML = `
          <p class="message">"${review.Message}"</p>
          <p class="name"><strong>${review.Name}</strong> – ${review.Type}</p>
          <p class="stars">${"★".repeat(review.Stars)}${"☆".repeat(5 - review.Stars)}</p>
        `;
        container.appendChild(reviewEl);
      });
    }

    document.getElementById("next").addEventListener("click", () => {
      if (currentIndex + reviewsPerPage < reviewsData.length) {
        currentIndex += reviewsPerPage;
        renderReviews();
      }
    });

    document.getElementById("back").addEventListener("click", () => {
      if (currentIndex - reviewsPerPage >= 0) {
        currentIndex -= reviewsPerPage;
        renderReviews();
      }
    });

    // Initial render
    renderReviews();
  }



  
  
  
  ReviewContent()

  renderHeaderCont();
  WCUBlock();
  Eventscontent();
});








function initCategoryReveal(batchSize = 6) {
  const categories = document.querySelectorAll('.Categorie');
  const showMoreBtn = document.getElementById('showMoreBtn');
  let currentIndex = 0;

  function showNextBatch() {
    const nextBatch = Array.from(categories).slice(currentIndex, currentIndex + batchSize);
    nextBatch.forEach(item => item.style.display = 'flex');
    currentIndex += batchSize;

    if (currentIndex >= categories.length) {
      showMoreBtn.style.display = 'none'; // hide button when all are shown
    }
  }

  // Hide all initially
  categories.forEach(item => item.style.display = 'none');

  // Show the first batch
  showNextBatch();

  // Add click event
  showMoreBtn.addEventListener('click', showNextBatch);
}
document.addEventListener('DOMContentLoaded', () => {
  initCategoryReveal();
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


document.getElementById('StartHBtn').addEventListener('click', function () {
  window.location.href = "index5.1.html";
});