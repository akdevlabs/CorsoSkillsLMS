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
      #faq-section{
        background-color: ${Prime5};
      }
      .faq-question {
        color: ${Prime};
        background-color: ${Prime5};
      }
      .faq-question:hover {
        color: ${Prime5};
        background-color: ${Prime2};
      }
      .faq-answer {
        color: ${Prime};
        padding: 1rem 1.5rem;
       border: 3px solid ${Prime2};
      }

      #faq-navigation button {

        background-color: ${Base};
        color: ${Prime5};
      }
      #faq-navigation button:disabled {
        background-color: ${Prime1};
        cursor: not-allowed;
      }


      /* CTA */
      .cta-section {
        background: ${Prime3};
        color: white;
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
  const FAQ = data.FAQ


 
  console.log(FAQ)

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
    renderTextSection("hero", FAQ.hero.Tittle, FAQ.hero.Text)
  }

const questionsPerPage = 10;
    let currentPage = 0;

    function renderFAQPage(data, page) {
      const container = document.getElementById("faq-container");
      container.innerHTML = "";

      const allFAQs = Object.values(data);
      const startIndex = page * questionsPerPage;
      const endIndex = Math.min(startIndex + questionsPerPage, allFAQs.length);
      const currentFAQs = allFAQs.slice(startIndex, endIndex);

      currentFAQs.forEach(faq => {
        const questionBtn = document.createElement("button");
        questionBtn.className = "faq-question";
        questionBtn.textContent = faq.Question;

        const answerDiv = document.createElement("div");
        answerDiv.className = "faq-answer";
        answerDiv.textContent = faq.Answer;

        questionBtn.addEventListener("click", () => {
          answerDiv.style.display = answerDiv.style.display === "none" ? "block" : "none";
        });

        container.appendChild(questionBtn);
        container.appendChild(answerDiv);
      });

      document.getElementById("prev-btn").disabled = currentPage === 0;
      document.getElementById("next-btn").disabled = endIndex >= allFAQs.length;
    }

    document.getElementById("prev-btn").addEventListener("click", () => {
      if (currentPage > 0) {
        currentPage--;
        renderFAQPage(FAQ.QuestionAnswers, currentPage);
      }
    });

    document.getElementById("next-btn").addEventListener("click", () => {
      const totalQuestions = Object.keys(FAQ.QuestionAnswers).length;
      if ((currentPage + 1) * questionsPerPage < totalQuestions) {
        currentPage++;
        renderFAQPage(FAQ.QuestionAnswers, currentPage);
      }
    });

    // Initial render
    renderFAQPage(FAQ.QuestionAnswers, currentPage);


  heroContent()



})

document.getElementById('backBtn').addEventListener('click', function () {
  window.location.href = "index.html";
});