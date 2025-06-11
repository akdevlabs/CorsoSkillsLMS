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
    setTextColors("#hero", Prime5 )
    setBackgroundColorM(".hero", Prime )
  }
  function blogbtnColors(){
    function setPopupcolors() {
      const style = document.createElement('style');
      style.textContent = `
        .job-card {
          border: 1px solid #ddd;
          background-color: ${Prime5};
        }
        .apply-button {
          background-color:${Base};
          color: ${Prime5};
        }
        .job-icon {
          color: ${Prime2};
        }
        .fa-solid{
        color: ${Prime2};
        }
        
        
      `;
      document.head.appendChild(style);
    }
    function Jobcolors() {
      const style = document.createElement('style');
      style.textContent = `
        /* Container for job post */
        #job-post {
          background-color: ${Prime5};
          border: 1px solid ${Prime1};
        }

        #job-post h2 {
          color: ${Prime3};
        }

        #job-post h3 {
          color: ${Prime};
        }

        #job-post p,
        #job-post label {
          color: ${Prime};
        }

        #job-post input:focus,
        #job-post textarea:focus {
          border-color: ${Prime2};
        }

        #job-post button[type="submit"] {
          background-color: ${Base};
          color: white;
        }

        #job-post button[type="submit"]:hover {
          background-color: ${Prime2};
        }
      `;
      document.head.appendChild(style);
    }

    // Call the function to inject the styles
    setPopupcolors();
    Jobcolors()
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
  const Jobs = data.Constent.Jobs
  console.log(Jobs.List)
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
    renderTextSection("hero", Jobs.hero.Tittle, Jobs.hero.Text)
  }

function jobsContent() {
  // Render compact job card
  function renderJobCard(containerId, title, description, location, timeType, experience, slotKey) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container with id "${containerId}" not found.`);
      return;
    }

    const card = document.createElement('div');
    card.className = 'job-card';

    card.innerHTML = `
      <h3 class="job-title">
        <i class="fas fa-rocket job-icon" style="color: #007bff;"></i>
        ${title}
      </h3>
      <p class="job-description">${description}</p>
      <ul class="job-details">
        <li><i class="fa-solid fa-map-pin"></i> ${location}</li>
        <li><i class="fa-solid fa-calendar-days"></i> ${timeType}</li>
        <li><i class="fa-solid fa-briefcase"></i> ${experience}</li>
      </ul>
      <button class="apply-button">Aplicar ahora</button>
    `;

    container.appendChild(card);

    const applyButton = card.querySelector('.apply-button');
    applyButton.addEventListener('click', () => {
      const Jobposting = document.querySelector('.Job-posting');
    if (Jobposting) Jobposting.style.display = 'block';

   const jobsSection = document.querySelector('.jobs-section');
    if (jobsSection) jobsSection.style.display = 'none';

      renderFullJobPost('job-post', Jobs.List[slotKey]);

    });
  }

  // Render full job detail on apply click
  function renderFullJobPost(containerId, jobData) {
    const {
      tittle,
      description,
      location,
      time,
      type,
      Requirements = [],
      Offer = []
    } = jobData;

    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container with id "${containerId}" not found.`);
      return;
    }

    container.innerHTML = `
        <h2> Título del Puesto: ${tittle}</h2>
        <p><strong> Tipo de Contrato:</strong> ${time}</p>
        <p><strong> Ubicación:</strong> ${location}</p>
        <p><strong> Experiencia Requerida:</strong> ${type}</p>

        <h3> Descripción del Puesto:</h3>
        <p>${description}</p>

        <h3> Requisitos:</h3>
        <ul>${Requirements.map(item => `<li>${item}</li>`).join('')}</ul>

        <h3> Qué Ofrecemos:</h3>
        <ul>${Offer.map(item => `<li>${item}</li>`).join('')}</ul>

        <hr>

        <h3> Postúlate Aquí</h3>
        <form action="#" method="POST">
          <label for="name">Nombre completo:</label>
          <input type="text" id="name" name="name" required >

          <label for="email">Correo electrónico:</label>
          <input type="email" id="email" name="email" required >

          <label for="portfolio">CV o portafolio (enlace):</label>
          <input type="url" id="portfolio" name="portfolio" placeholder="https://tu-portafolio.com">

          <label for="message">Mensaje:</label>
          <textarea id="message" name="message" rows="5" placeholder="Cuéntanos por qué quieres unirte al equipo..."></textarea>

          <button type="submit">
            Enviar postulación
          </button>
        </form>
      </div>
    `;
  }

  function isSlotFilled(slot) {
    return Object.values(slot).some(value => {
      if (Array.isArray(value)) return value.length > 0;
      return value && value.trim() !== '';
    });
  }

  function renderAllJobs(jobsObj, containerId) {
    Object.keys(jobsObj).forEach(slotKey => {
      const slot = jobsObj[slotKey];
      if (typeof slot === 'object' && isSlotFilled(slot)) {
        const { tittle, description, location, time, type } = slot;
        renderJobCard(containerId, tittle, description, location, time, type, slotKey);
      }
    });
  }

  // Start rendering cards
  renderAllJobs(Jobs.List, 'job-block');
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".job-form");
    if (!form) {
      console.warn("Form with class .job-form not found");
      return;
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const portfolio = form.portfolio.value.trim();
      const message = form.message.value.trim();

      if (!name || !email) {
        alert("Por favor completa los campos obligatorios.");
        return;
      }

      try {
        await addDoc(collection(db, "jobRequest"), {
          name,
          email,
          portfolio,
          message,
          submittedAt: Timestamp.now()
        });

        alert("✅ Tu postulación fue enviada con éxito.");
        form.reset();
      } catch (error) {
        console.error("Error al enviar la postulación:", error);
        alert("❌ Hubo un error al enviar tu postulación. Intenta nuevamente.");
      }
    });
  });

jobsContent()
  heroContent()


})

document.getElementById("RefreshBtn").addEventListener("click", function () {
    location.reload();
});
document.getElementById('backBtn').addEventListener('click', function () {
  window.location.href = "index.html";
});