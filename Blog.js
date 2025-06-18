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
    setTextColors(".hero-text", Prime5 )
    setBackgroundColorM(".hero", Prime )
  }
  function blogbtnColors(){
    function setBlogCardTheme({ bg, text, muted, mediaBg }) {
      const root = document.documentElement;

      if (bg) root.style.setProperty('--blog-bg', bg);
      if (text) root.style.setProperty('--blog-text', text);
      if (muted) root.style.setProperty('--blog-muted', muted);
      if (mediaBg) root.style.setProperty('--media-bg', mediaBg);
    }
    setBlogCardTheme({
      bg: Prime5,
      text: Base,
      muted: Prime3,
      mediaBg: Prime1
    });
    function setPopupcolors() {
      const style = document.createElement('style');
      style.textContent = `
        .popup {
          background-color: ${Prime4};
        }
        .close-btn {
          color: ${Prime2};
        }
        .close-btn:hover {
          color: ${Prime2};
        }
        #popup-title {
          color: ${Prime2};
        }
        #popup-description {
          color:  ${Prime3};
        }
        #popup-content h3 {
          color:  ${Prime4};
        }
        #popup-content blockquote {
          background-color:  ${Prime3};
          color: ${Prime5};
        }
      `;
      document.head.appendChild(style);
    }

    // Call the function to inject the styles
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
   const blog = data.Constent.Blog


  console.log(data)
  
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
    renderTextSection("hero-tittle", blog.Hero.tittle)
    renderTextSection("hero-text", blog.Hero.text)
  }

  function Renderslots(){
 

    function renderBlogCards(slots) {
      const container = document.getElementById("blog-container");

      for (const key in slots) {
        const { Tittle, Description, Meta, Img, Content } = slots[key];

        const button = document.createElement("button");
        button.className = "blog-btn";
        button.onclick = () => showPopup(Tittle, Description, Content);

        const card = document.createElement("div");
        card.className = "blog-card";

        const media = document.createElement("div");
        media.className = "media-container";
        if (Img.startsWith("http")) {
          const imgEl = document.createElement("img");
          imgEl.src = Img;
          imgEl.alt = Tittle;
          media.appendChild(imgEl);
        } else {
          media.innerHTML = Img;
        }

        card.appendChild(media);

        const contentHTML = `
          <div class="blog-content">
            <h3>${Tittle}</h3>
            <p>${Description}</p>
            <span class="blog-meta">${Meta}</span>
          </div>
        `;
        card.innerHTML += contentHTML;

        button.appendChild(card);
        container.appendChild(button);
      }
    }

function showPopup(title, description, content) {
  document.getElementById("popup-title").textContent = title;
  document.getElementById("popup-description").textContent = description;

  let html = "";

  if (typeof content === "object" && content !== null) {
    const keys = Object.keys(content);

    keys.forEach((key, index) => {
      const section = content[key];
      html += `<div style="margin-bottom: 1rem;">`;
      html += `<h3>T${index + 1}</h3>`;

      if (section.Tittle || section.Title) {
        html += `<strong>${section.Tittle || section.Title}</strong><br>`;
      }

      if (Array.isArray(section.List)) {
        html += "<ul>";
        section.List.forEach(item => {
          html += `<li>${item}</li>`;
        });
        html += "</ul>";
      }

      if (section.Text) {
        html += `<p>${section.Text}</p>`;
      }

      if (section.Tips) {
        html += `<blockquote>${section.Tips}</blockquote>`;
      }

      html += `</div>`;
    });
  } else {
    html = `<p>${content}</p>`;
  }

  document.getElementById("popup-content").innerHTML = html;
  document.getElementById("popup-overlay").style.display = "flex";
}


    document.getElementById("close-btn").addEventListener('click', function () {
      document.getElementById("popup-overlay").style.display = "none";
    });
  




    renderBlogCards(blog.BlogCards);


  }







  heroContent()
  Renderslots()


})

document.getElementById('backBtn').addEventListener('click', function () {
  window.location.href = "index.html";
});