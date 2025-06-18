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
  function AboutColors(){
    setBackgroundColorM(".About-Block", Base )
    setTextColors("#About-Tittle", Prime5 )
    setTextColors("#About-Text", Prime5 )
  }
  function Herocolors(){
    setTextColors(".hero-text", Prime5 )
  }
  function MissionColors(){
    setBackgroundColorM("#Mission-Line", Prime2)
    setTextColors("#Mission-Tittle", Prime3 )
    setTextColors("#Mission-Text", Prime )
  }
  function visionColors(){
    setBackgroundColorM(".Vission-text", Prime5 )
    setTextColors("#top-num", Prime2 )
    const style = document.createElement('style');
    style.textContent = `
      .value-Block{
        background-color: ${Prime5};
      }
      .icon {
        color: ${Base};
      }
      .title {
        color: ${Prime2}; 
      }
      .description {
        color: ${Prime1}; 
      }


    `;
    document.head.appendChild(style);

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
  function GridColors(){
    setBackgroundColorM("#Goal-Block", Prime1 )
    setBackgroundColorM("#Key-Block-text", Prime )
    setTextColors("#Goal-Block", Prime5 )
    setTextColors("#Key-Block-text", Prime5 )

  }
  function Footercolors(){
    setBackgroundColorM('#footer', Prime5)
    setBackgroundColorM('footer', Prime)
    setTextColors('#footer', Prime4)
  }

  Bodycolors()
  Navcolors()
  AboutColors()
  Herocolors()
  blogbtnColors()
  GridColors()
  Footercolors()
  MissionColors()
  visionColors()

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
   const About = data.Constent.About


  console.log(data)
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
  function renderList(items, targetElementId) {
    const ul = document.createElement('ul');

    items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      ul.appendChild(li);
    });

    const target = document.getElementById(targetElementId);
    if (target) {
      target.appendChild(ul);
    } else {
      console.warn(`Element with ID "${targetElementId}" not found.`);
    }
  }
  function renderValuesListWithIcons(data, targetElementId) {
    const ul = document.createElement('ul');
    ul.className = 'icon-list';

    Object.values(data).forEach(([title, description, iconHTML]) => {
      const li = document.createElement('li');

      li.innerHTML = `
        <span class="icon">${iconHTML}</span>
        <div class="text-content">
          <strong class="title">${title}</strong>: <span class="description">${description}</span>
        </div>
      `;

      ul.appendChild(li);
    });

    const target = document.getElementById(targetElementId);
    if (target) {
      target.innerHTML = '';
      target.appendChild(ul);
    } else {
      console.warn(`Element with ID "${targetElementId}" not found.`);
    }
  }




  function heroContent(){

    setHeroBackgroundImage( About.Hero.img,"hero")
    renderTextSection("hero-tittle", About.Hero.tittle)
    renderTextSection("hero-text", About.Hero.text)
  }
    function aboutContent(){
    renderImage(About.about.img, "Old people","about-img")
    renderTextSection("About-Tittle", About.about.tittle)
    renderTextSection("About-Text", About.about.text)
  }
  function renderMission(){
    renderTextSection('Mission-Tittle', About.Mission.tittle)
    renderTextSection('Mission-Text', About.Mission.text)
  }
  function rendervision(){
    renderImage(About.Vision.img, "Idea","Vission-img")
    renderTextSection('Vission-Tittle', About.Vision.tittle)
    renderTextSection('Vission-Text', About.Vision.text)
  }
  function renderGoal(){
    renderTextSection('Goal-Tittle', About.Goal.tittle)
    renderTextSection('Goal-Text', About.Goal.text)
  }
  function renderDif(){
    renderTextSection('Key-Tittle', About.Key.Tittle)  
    renderList(About.Key.list, "Key-list")
  }
  function rendervalues(){
    renderTextSection('value-Tittle', About.Values.tittle) 
    renderValuesListWithIcons(About.Values.List, 'value-list');
    renderImage(About.Values.img, "Balence","value-Block-img")
  }
  function rendergridcont(){
    renderImage(About.Key.Imgs[0], "Grid-Img-1", "Grid-Img-1")
    renderImage(About.Key.Imgs[1], "Grid-Img-1", "Grid-Img-2")
    renderImage(About.Key.Imgs[2], "Grid-Img-1", "Grid-Img-3")
  }



  aboutContent()
  heroContent()
  renderMission()
  rendervision()
  renderGoal()
  renderDif()
  rendervalues()
  rendergridcont()
})

document.getElementById('backBtn').addEventListener('click', function () {
  window.location.href = "index.html";
});