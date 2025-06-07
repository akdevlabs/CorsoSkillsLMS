// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  collection, 
  addDoc, 
  setDoc, 
  Timestamp 
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2w5sXCGRBxne-23FRCTAXQrMwHt4nHTY",
  authDomain: "corsoskills-1ba50.firebaseapp.com",
  projectId: "corsoskills-1ba50",
  storageBucket: "corsoskills-1ba50.appspot.com", // must end in .com
  messagingSenderId: "813928863826",
  appId: "1:813928863826:web:771cd8ad820570441fa78b",
  measurementId: "G-MYT63ZNNCC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore instance
const db = getFirestore(app);

// Storage instance
const storage = getStorage(app);

// Get logged-in user ID from local storage
const UserUidInfo = localStorage.getItem("UserUidInfo");

// Optional: define your business unit
const TBuInfo = "CorsoSkills"; // could be used later to create dynamic paths


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
  console.log(data.BuLogos.Icons[0])
  const {Base, Prime1, Prime2, Prime3, Prime4, Prime5} = data.BuColors.Colors;
  
  function renderImage(imageUrl, altUrl, UrlId) {
    const logoElement = document.getElementById(UrlId);
    if (logoElement) {
      logoElement.src = imageUrl;
      logoElement.alt = altUrl;
    } else {
      console.error("Element with ID 'logo' not found.");
    }
  }
  function setBodyBackgroundColor(backgroundColor) {
    document.body.style.backgroundColor = backgroundColor;
  }
  function setBackgroundColor(selector, backgroundColor) {
    if (!selector) return;

    // If selector starts with '.', treat it as a class
    if (selector.startsWith('.')) {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        elements.forEach(el => {
          el.style.backgroundColor = backgroundColor;
        });
      } else {
        console.error(`No elements found with class '${selector}'`);
      }
    }
    // If selector starts with '#', treat it as an ID
    else if (selector.startsWith('#')) {
      const element = document.querySelector(selector);
      if (element) {
        element.style.backgroundColor = backgroundColor;
      } else {
        console.error(`Element with ID '${selector}' not found.`);
      }
    }
    // If no prefix, assume ID (for backward compatibility)
    else {
      const element = document.getElementById(selector);
      if (element) {
        element.style.backgroundColor = backgroundColor;
      } else {
        console.error(`Element with ID '${selector}' not found.`);
      }
    }
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
  function setBorderWithFocus(selector, borderStyle) {
    const elements = document.querySelectorAll(selector);

    if (elements.length > 0) {
      elements.forEach(element => {
        // Set initial border
        element.style.border = borderStyle;

        // On focus: apply same border
        element.addEventListener('focus', () => {
          element.style.border = borderStyle;
        });

        // On blur: optionally keep or reset the border
        element.addEventListener('blur', () => {
          element.style.border = borderStyle; // or reset if desired
        });
      });
    } else {
      console.error(`No elements found with selector '${selector}'`);
    }
  }









  function SetMainColors(){
    renderImage(data.BuLogos.Icons[0], "BuLogo", "Bulogos")
    setBodyBackgroundColor(Prime4)
    setBackgroundColor("#sidebar", Prime5)
    setTextColors("#Main-Title-header", Base)
    setTextColors("#Img-Q-blocks", Base)
    setTextColors("#titleInput", Base)
    setTextColors("#descriptionInput", Base)

    setBorderWithFocus('#titleInput', `2px solid ${Base}`);
    setBorderWithFocus('#descriptionInput', `2px solid ${Base}`);
    setBorderWithFocus('.input-tool', `2px solid ${Base}`);


   

  }
  function sidebarcolors(){
    setTextColors(".Side-Btns", Base)
    setTextColors(".fa-solid", Base)
    document.querySelectorAll('.Side-Btns').forEach(button => {
      const icon = button.querySelector('i');
      const text = button.querySelector('.linkName');

      button.addEventListener('mouseenter', () => {
        icon.style.color = Prime2; // Hover color
        text.style.color = Prime2;
      });

      button.addEventListener('mouseleave', () => {
        icon.style.color = Base;// Original color
       text.style.color = ''; // Reset to default (inherited or original)
      });
    });
  }
  function ToolSidebarColors(){
    setBackgroundColor("#Action-tool-side-bar", Prime5)

    setTextColors(".tool-Side-Btns", Base)
    setTextColors(".fa-solid", Base)
    document.querySelectorAll('.tool-Side-Btns').forEach(button => {
      const icon = button.querySelector('i');
      const text = button.querySelector('.linkName');

      button.addEventListener('mouseenter', () => {
        icon.style.color = Prime2; // Hover color
        text.style.color = Prime2;
      });

      button.addEventListener('mouseleave', () => {
        icon.style.color = Base;// Original color
       text.style.color = ''; // Reset to default (inherited or original)
      });
    });
  }

  function perviewcolors(){

    setBorderWithFocus("#Main-right", `2px solid ${Base}`);
    setBorderWithFocus("#Main-right", `2px solid ${Prime1}`);


    setBackgroundColor("#Main-right", Prime4)
    setTextColors("#course-title", Base)

    setBackgroundColor(".hidden-tabs", Prime5)
    setBorderWithFocus(".hidden-tabs", `2px solid ${Prime1}`);
    
  }






  sidebarcolors()
  SetMainColors()
  ToolSidebarColors()
  perviewcolors()

});


async function getTeacherContent() {
  try {
    const docRef = doc(db, "CorsoSkillsTeacher", UserUidInfo);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.error("No such teacher document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching teacher document:", error);
    return null;
  }
}
async function getCorsoSkillAppContent() {
  try {
    const docRef = doc(db, "CorsoSkillBusiness", TBuInfo);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.error("No such business document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching business document:", error);
    return null;
  }
}
async function fetchAllContent() {
  const teacherData = await getTeacherContent();
  const businessData = await getCorsoSkillAppContent();

  if (teacherData) {
    console.log("Teacher Document Data:", teacherData);
  } else {
    console.log("No teacher data found.");
  }

  if (businessData) {
    console.log("Business Document Data:", businessData);
  } else {
    console.log("No business data found.");
  }

    // Extract business colors if needed
  const { Base, Prime1, Prime2, Prime3, Prime4, Prime5 } = businessData?.BuColors?.Colors || {};

  function AddVideoBtn() {
    const addVideoBtn = document.getElementById("add-video");

    // Inject styles only once
    if (!document.getElementById("video-style")) {
      const style = document.createElement("style");
      style.id = "video-style";
      style.textContent = `
        .video-block-label{
          color: ${Base};
        }
        .video-input-section input {
          color: ${Base};
          border: 1px solid ${Prime3};
          background-color: ${Prime5};
          transition: border-color 0.2s ease;
        }
        .video-input-section input:focus {
          border-color: ${Base};
          outline: none;
        }
        .remove-video-btn {
          background: ${Prime2};
          color: ${Prime5};
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          transition: background-color 0.2s ease;
        }
      `;
      document.head.appendChild(style);
    }

    addVideoBtn.addEventListener("click", function () {
      const container = document.getElementById("Add-container");

      // Create wrapper
      const videoInputWrapper = document.createElement("div");
      videoInputWrapper.classList.add("video-input-section");

      // Block label
      const blockLabel = document.createElement("label");
      blockLabel.classList.add("video-block-label");
      blockLabel.textContent = "Agregar Video";

      // Remove button
      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.classList.add("remove-video-btn");
      removeBtn.textContent = "×";
      removeBtn.title = "Eliminar este video";

      removeBtn.addEventListener("click", () => {
        container.removeChild(videoInputWrapper);
      });

      // Inputs
      const titleInput = document.createElement("input");
      titleInput.type = "text";
      titleInput.placeholder = "Nombre del video";
      titleInput.classList.add("video-title");

      const urlInput = document.createElement("input");
      urlInput.type = "url";
      urlInput.placeholder = "URL del video (opcional)";
      urlInput.classList.add("video-url");

      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "video/*";
      fileInput.classList.add("video-file");



      // Append everything
      videoInputWrapper.appendChild(removeBtn);
      videoInputWrapper.appendChild(blockLabel);
      videoInputWrapper.appendChild(titleInput);
      videoInputWrapper.appendChild(urlInput);
      videoInputWrapper.appendChild(fileInput);


      container.appendChild(videoInputWrapper);
    });
  }
  function AddTextBtn() {
    const addTextBtn = document.getElementById("add-text");

    // Inject styles only once
    if (!document.getElementById("text-style")) {
      const style = document.createElement("style");
      style.id = "text-style";
      style.textContent = `
        .text-input-section textarea {
          color: ${Base};
          border: 1px solid ${Prime3};   
        }
        .text-input-section textarea:focus {
          border-color: ${Base};    
          outline: none;
        }
        .remove-text-btn {
          background: ${Prime2};   
          color: ${Prime5};        
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          transition: background-color 0.2s ease;
        }
      `;
      document.head.appendChild(style);
    }

    addTextBtn.addEventListener("click", function () {
      const container = document.getElementById("Add-container");

      // Create wrapper
      const textInputWrapper = document.createElement("div");
      textInputWrapper.classList.add("text-input-section");

      // Block label
      const blockLabel = document.createElement("label");
      blockLabel.classList.add("video-block-label");
      blockLabel.textContent = "Contenido De Texto";

      // Remove button
      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.classList.add("remove-text-btn");
      removeBtn.textContent = "×"; // the "x" symbol
      removeBtn.title = "Eliminar este texto";

      // Remove wrapper on click
      removeBtn.addEventListener("click", () => {
        container.removeChild(textInputWrapper);
      });

      // Create textarea
      const textarea = document.createElement("textarea");
      textarea.placeholder = "Escribe el contenido de texto aquí...";

      // Append remove button first (top right corner)
      textInputWrapper.appendChild(removeBtn);
      textInputWrapper.appendChild(blockLabel);
      // Append textarea to wrapper
      textInputWrapper.appendChild(textarea);

      // Append wrapper to container
      container.appendChild(textInputWrapper);
    });
  }
  function AddPresentBtn() {
    const addPresentBtn = document.getElementById("add-present");

    // Inject styles only once
    if (!document.getElementById("present-style")) {
      const style = document.createElement("style");
      style.id = "present-style";
      style.textContent = `
        .present-input-section input {
          color: ${Base};
          border: 1px solid ${Prime3};
          background-color: ${Prime5};
          transition: border-color 0.2s ease;
        }
        .present-input-section input:focus {
          border-color: ${Base};  
          outline: none;
        }
        .remove-present-btn {
          background: ${Prime2};   
          color: ${Prime5};   
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          transition: background-color 0.2s ease;
        }
      `;
      document.head.appendChild(style);
    }

    addPresentBtn.addEventListener("click", function () {
      const container = document.getElementById("Add-container");

      // Create wrapper
      const presentInputWrapper = document.createElement("div");

      // Block label
      const blockLabel = document.createElement("label");
      blockLabel.classList.add("video-block-label");
      blockLabel.textContent = "Agregar Presentación";

      presentInputWrapper.classList.add("present-input-section");

      // Remove button
      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.classList.add("remove-present-btn");
      removeBtn.textContent = "×"; // the "x" symbol
      removeBtn.title = "Eliminar esta presentación";

      // Remove wrapper on click
      removeBtn.addEventListener("click", () => {
        container.removeChild(presentInputWrapper);
      });

      // Title input
      const titleInput = document.createElement("input");
      titleInput.type = "text";
      titleInput.placeholder = "Nombre de la presentación";

      // File upload input
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".ppt,.pptx,.pdf";

      // Append remove button first (top right corner)
      presentInputWrapper.appendChild(removeBtn);
      presentInputWrapper.appendChild(blockLabel);
      // Append inputs to wrapper
      presentInputWrapper.appendChild(titleInput);
      presentInputWrapper.appendChild(fileInput);

      // Append wrapper to container
      container.appendChild(presentInputWrapper);
    });
  }
  function AddExamBtn() {
    const addExamBtn = document.getElementById("add-Exam");

    // Inject styles only once
    if (!document.getElementById("exam-style")) {
      const style = document.createElement("style");
      style.id = "exam-style";
      style.textContent = `
        .question-block {
          border: 1px solid ${Base};
          color: ${Base};
          background-color: ${Prime5};
        }
        .Exam-block-label{
          color: ${Base};
        }
        .exam-input-section input[type="text"],
        .exam-input-section select {
          color: ${Base};
          border: 1px solid ${Prime3};
          background-color: ${Prime5};
        }
        .exam-input-section input:focus,
        .exam-input-section select:focus {
          border-color: ${Prime3};
          outline: none;
        }
        .add-question-btn {
          background-color: ${Prime3};
          color: ${Prime5};
        }
        .add-question-btn:hover {
          background-color: ${Prime3};
        }
        .remove-exam-btn {
          background: ${Prime2};
          color: ${Prime5};
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          transition: background-color 0.2s ease;
        }
      `;
      document.head.appendChild(style);
    }

    addExamBtn.addEventListener("click", function () {
      const container = document.getElementById("Add-container");

      const examWrapper = document.createElement("div");
      examWrapper.classList.add("exam-input-section");

      // Block label
      const blockLabel = document.createElement("label");
      blockLabel.classList.add("Exam-block-label");
      blockLabel.textContent = "Contenido De Texto";


      // Remove button
      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.classList.add("remove-exam-btn");
      removeBtn.textContent = "×";
      removeBtn.title = "Eliminar este examen";

      removeBtn.addEventListener("click", () => {
        container.removeChild(examWrapper);
      });

      const titleInput = document.createElement("input");
      titleInput.type = "text";
      titleInput.placeholder = "Nombre del examen";

      const questionsContainer = document.createElement("div");
      questionsContainer.classList.add("questions-container");

      function createQuestionBlock(index) {
        const questionBlock = document.createElement("div");
        questionBlock.classList.add("question-block");

        const questionInput = document.createElement("input");
        questionInput.type = "text";
        questionInput.placeholder = `Pregunta ${index + 1}`;

        questionBlock.appendChild(questionInput);

        for (let i = 0; i < 4; i++) {
          const answerInput = document.createElement("input");
          answerInput.type = "text";
          answerInput.placeholder = `Opción ${i + 1}`;
          questionBlock.appendChild(answerInput);
        }

        const correctLabel = document.createElement("label");
        correctLabel.textContent = "Respuesta correcta:";

        const correctSelect = document.createElement("select");
        for (let i = 0; i < 4; i++) {
          const option = document.createElement("option");
          option.value = i;
          option.textContent = `Opción ${i + 1}`;
          correctSelect.appendChild(option);
        }

        questionBlock.appendChild(correctLabel);
        questionBlock.appendChild(correctSelect);

        return questionBlock;
      }

      questionsContainer.appendChild(createQuestionBlock(0));

      const addQuestionBtn = document.createElement("button");
      addQuestionBtn.classList.add("add-question-btn");
      addQuestionBtn.textContent = "Agregar otra pregunta";

      addQuestionBtn.addEventListener("click", () => {
        const count = questionsContainer.children.length;
        questionsContainer.appendChild(createQuestionBlock(count));
      });

      examWrapper.appendChild(removeBtn);  // Add remove button at top
      examWrapper.appendChild(blockLabel);
      examWrapper.appendChild(titleInput);
      examWrapper.appendChild(questionsContainer);
      examWrapper.appendChild(addQuestionBtn);

      container.appendChild(examWrapper);
    });
  }
  function AddTemaBtn() {
    const addTemaBtn = document.getElementById("add-Tema");

    // Inject styles once
    if (!document.getElementById("tema-style")) {
      const style = document.createElement("style");
      style.id = "tema-style";
      style.textContent = `
        .tema-input-section input[type="text"] {
          border: 1px solid ${Prime3};
          background-color:${Prime5};
          color: ${Base};
        }
        .Tema-block-label{
         color: ${Base};
        } 
        .tema-input-section input:focus {
          border-color: ${Prime3};
          outline: none;
        }
        .remove-tema-btn {
          background: ${Prime2};
          color: ${Prime5};
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
      `;
      document.head.appendChild(style);
    }

    addTemaBtn.addEventListener("click", () => {
      const container = document.getElementById("Add-container");

      // Block label
      const blockLabel = document.createElement("label");
      blockLabel.classList.add("Tema-block-label");
      blockLabel.textContent = "Inicio de Tema";

      const temaWrapper = document.createElement("div");
      temaWrapper.classList.add("tema-input-section");

      // Remove button
      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.classList.add("remove-tema-btn");
      removeBtn.textContent = "×";
      removeBtn.title = "Eliminar este tema";

      removeBtn.addEventListener("click", () => {
        container.removeChild(temaWrapper);
      });

      const temaInput = document.createElement("input");
      temaInput.type = "text";
      temaInput.placeholder = "Nombre del Tema";

      temaWrapper.appendChild(blockLabel);
      temaWrapper.appendChild(removeBtn);
      temaWrapper.appendChild(temaInput);
      container.appendChild(temaWrapper);
    });
  }
  function AddSubTemaBtn() {
    const addSubTemaBtn = document.getElementById("add-SubTema");

    // Inject styles once
    if (!document.getElementById("subtema-style")) {
      const style = document.createElement("style");
      style.id = "subtema-style";
      style.textContent = `
        .subtema-input-section input[type="text"] {
          border: 1px solid ${Prime3};
          background-color: ${Prime5};
          color: ${Base};
        }
        .SubTema-block-label{
          color: ${Base};
        }
        .subtema-input-section input:focus {
          border-color: ${Prime3};
          outline: none;
        }
        .remove-subtema-btn {
          background: ${Prime2};
          color: ${Prime5};
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
      `;
      document.head.appendChild(style);
    }

    addSubTemaBtn.addEventListener("click", () => {
      const container = document.getElementById("Add-container");

      const subtemaWrapper = document.createElement("div");
      subtemaWrapper.classList.add("subtema-input-section");

      // Block label
      const blockLabel = document.createElement("label");
      blockLabel.classList.add("SubTema-block-label");
      blockLabel.textContent = "Inicio de Subtema";

      // Remove button
      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.classList.add("remove-subtema-btn");
      removeBtn.textContent = "×";
      removeBtn.title = "Eliminar este subtema";

      removeBtn.addEventListener("click", () => {
        container.removeChild(subtemaWrapper);
      });

      const subtemaInput = document.createElement("input");
      subtemaInput.type = "text";
      subtemaInput.placeholder = "Nombre del Subtema";
      subtemaWrapper.appendChild(blockLabel);
      subtemaWrapper.appendChild(removeBtn);
      subtemaWrapper.appendChild(subtemaInput);
      container.appendChild(subtemaWrapper);
    });
  }





 // Variable global para guardar el nivel seleccionado
  let selectedLevel = "All";

  // Configurar los botones de nivel para selección
  function setupLevelButtons() {
    const buttons = document.querySelectorAll(".level-btn");
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        // Remover clase active de todos
        buttons.forEach(b => b.classList.remove("active"));
        // Añadir clase active al botón clickeado
        btn.classList.add("active");
        // Guardar nivel seleccionado
        selectedLevel = btn.getAttribute("data-value");
      });
    });
  }

  // Función principal para mostrar preview
  function AddPreviewBtn() {
    document.getElementById("preview").addEventListener("click", function () {
      const title = document.getElementById("titleInput").value;
      const description = document.getElementById("descriptionInput").value;
      const imageInput = document.getElementById("imageInput");
      const imageFile = imageInput.files[0];

      const Mainright = document.getElementById("Main-right");
      Mainright.style.display = "flex";

      // Establecer título del curso
      document.getElementById("course-title").textContent = title;

      // Establecer imagen del curso
      if (imageFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
          document.getElementById("img-course").src = e.target.result;
        };
        reader.readAsDataURL(imageFile);
      } else {
        document.getElementById("img-course").src = "";
      }

      // Establecer descripción
      document.getElementById("Notes").textContent = description;

      // Mostrar nivel seleccionado
      const courseLevelDiv = document.getElementById("course-level");
      let displayText = "";
      switch (selectedLevel) {
        case "Beginner":
          displayText = "Nivel: Principiante";
          break;
        case "Intermediate":
          displayText = "Nivel: Intermedio";
          break;
        case "Advanced":
          displayText = "Nivel: Avanzado";
          break;
        default:
           displayText = "Nivel: Principiante";
      }
      courseLevelDiv.textContent = displayText;

      // Limpiar lista de cursos previa
      const courseList = document.getElementById("Course-list");
      courseList.innerHTML = "";

      // Renderizado de temas, subtemas e items
      const allInputs = Array.from(document.getElementById("Add-container").children);
      let temaIndex = 0;

      for (let i = 0; i < allInputs.length; i++) {
        const element = allInputs[i];

        if (element.classList.contains("tema-input-section")) {
          const temaValue = element.querySelector("input[type='text']").value.trim();
          if (!temaValue) continue;

          temaIndex++;
          let subtemaIndex = 0;

          const temaBtn = document.createElement("button");
          temaBtn.innerHTML = `<i class="fas fa-book"></i> Tema ${temaIndex}: ${temaValue}`;
          temaBtn.classList.add("toggle-btn");

          const temaContentWrapper = document.createElement("div");
          temaContentWrapper.style.display = "none";
          temaBtn.addEventListener("click", () => {
            const isOpen = temaContentWrapper.style.display === "block";
            temaContentWrapper.style.display = isOpen ? "none" : "block";
            temaBtn.innerHTML = `<i class="fas fa-book${isOpen ? '' : '-open'}"></i> Tema ${temaIndex}: ${temaValue}`;
          });

          courseList.appendChild(temaBtn);
          courseList.appendChild(temaContentWrapper);

          let j = i + 1;
          let lastSubtemaList = null;

          while (j < allInputs.length && !allInputs[j].classList.contains("tema-input-section")) {
            const currentElement = allInputs[j];

            if (currentElement.classList.contains("subtema-input-section")) {
              const subtemaValue = currentElement.querySelector("input[type='text']").value.trim();
              if (subtemaValue) {
                subtemaIndex++;

                const subtemaBtn = document.createElement("button");
                subtemaBtn.innerHTML = `<i class="fas fa-book-open"></i> Subtema ${subtemaIndex}: ${subtemaValue}`;
                subtemaBtn.classList.add("toggle-btn");

                const itemList = document.createElement("ul");
                itemList.style.display = "none";

                subtemaBtn.addEventListener("click", () => {
                  const isOpen = itemList.style.display === "block";
                  itemList.style.display = isOpen ? "none" : "block";
                  subtemaBtn.innerHTML = `<i class="fas fa-book-open${isOpen ? '' : '-reader'}"></i> Subtema ${subtemaIndex}: ${subtemaValue}`;
                });

                temaContentWrapper.appendChild(subtemaBtn);
                temaContentWrapper.appendChild(itemList);

                lastSubtemaList = itemList;
              }
            } else {
              const inputBlock = currentElement;
              const titleInput = inputBlock.querySelector("input[type='text']");
              const title = titleInput ? titleInput.value.trim() : "";

              const type = inputBlock.getAttribute("data-type") || "otro";
              let label = "📄 Otro";
              let iconClass = "fas fa-file";

              if (type === "video") {
                label = "📹 Video";
                iconClass = "fas fa-video";
              } else if (type === "text") {
                label = "📝 Texto";
                iconClass = "fas fa-align-left";
              } else if (type === "presentation") {
                label = "📄 Presentación";
                iconClass = "fas fa-file-powerpoint";
              } else if (type === "exam") {
                label = "🧪 Examen";
                iconClass = "fas fa-file-alt";
              }

              const itemBtn = document.createElement("button");
              itemBtn.innerHTML = `<i class="${iconClass}"></i> ${label}: ${title || "Sin título"}`;
              itemBtn.classList.add("item-preview-btn");

              const modal = document.createElement("div");
              modal.classList.add("modal");
              modal.style.display = "none";
              modal.style.position = "fixed";
              modal.style.top = "50%";
              modal.style.left = "50%";
              modal.style.transform = "translate(-50%, -50%)";
              modal.style.backgroundColor = "#fff";
              modal.style.border = "1px solid #ccc";
              modal.style.padding = "20px";
              modal.style.zIndex = "1000";
              modal.style.maxWidth = "90%";
              modal.style.maxHeight = "90%";
              modal.style.overflow = "auto";

              const fileInput = inputBlock.querySelector("input[type='file']");
              const textArea = inputBlock.querySelector("textarea");
              const video = inputBlock.querySelector("video");

              if (fileInput && fileInput.files.length > 0) {
                const file = fileInput.files[0];
                const fileURL = URL.createObjectURL(file);
                if (file.type.includes("pdf")) {
                  const iframe = document.createElement("iframe");
                  iframe.src = fileURL;
                  iframe.style.width = "100%";
                  iframe.style.height = "600px";
                  modal.appendChild(iframe);
                } else if (file.type.startsWith("video")) {
                  const videoEl = document.createElement("video");
                  videoEl.controls = true;
                  videoEl.src = fileURL;
                  videoEl.style.width = "100%";
                  modal.appendChild(videoEl);
                } else {
                  const message = document.createElement("p");
                  message.textContent = `Archivo no soportado: ${file.name}`;
                  modal.appendChild(message);
                }
              } else if (textArea) {
                const paragraph = document.createElement("p");
                paragraph.textContent = textArea.value;
                modal.appendChild(paragraph);
              } else if (video) {
                const videoClone = video.cloneNode(true);
                videoClone.controls = true;
                modal.appendChild(videoClone);
              } else {
                const fallback = document.createElement("p");
                fallback.textContent = "Contenido no disponible.";
                modal.appendChild(fallback);
              }

              const closeBtn = document.createElement("button");
              closeBtn.innerHTML = `<i class="fas fa-times"></i> Cerrar`;
              closeBtn.onclick = () => (modal.style.display = "none");
              closeBtn.style.marginTop = "10px";
              modal.appendChild(closeBtn);

              itemBtn.onclick = () => (modal.style.display = "block");
              document.body.appendChild(modal);

              const li = document.createElement("li");
              li.appendChild(itemBtn);

              if (lastSubtemaList) {
                lastSubtemaList.appendChild(li);
              } else {
                let directItemList = temaContentWrapper.querySelector("ul.direct-items");
                if (!directItemList) {
                  directItemList = document.createElement("ul");
                  directItemList.classList.add("direct-items");
                  temaContentWrapper.appendChild(directItemList);
                }
                directItemList.appendChild(li);
              }
            }
            j++;
          }
          i = j - 1;
        }
      }

      document.getElementById("Resources").textContent = "";
      document.getElementById("Quizes").textContent = "";
    });
  }

  // Inicializar al cargar la página
 



















  function SaveCourse() {
  const saveBtn = document.getElementById("Upload");

  saveBtn.addEventListener("click", async () => {
    const title = document.getElementById("titleInput").value;
    const description = document.getElementById("descriptionInput").value;
    const imageInput = document.getElementById("imageInput");
    const imageFile = imageInput.files[0];

    // Get selected course level
    const selectedLevelBtn = document.querySelector("#level-toggle-buttons .level-btn.selected");
    const courseLevel = selectedLevelBtn ? selectedLevelBtn.getAttribute("data-value") : null;

    const allInputs = Array.from(document.getElementById("Add-container").children);
    const courseData = {
      title,
      description,
      image: null, // Will be base64 if image is selected
      level: courseLevel,
      temas: []
    };

    const buildAndSave = async () => {
      let i = 0;
      while (i < allInputs.length) {
        const element = allInputs[i];
        if (element.classList.contains("tema-input-section")) {
          const temaValue = element.querySelector("input[type='text']").value.trim();
          if (!temaValue) {
            i++;
            continue;
          }

          const tema = {
            title: temaValue,
            items: [],
            subtemas: []
          };

          let j = i + 1;
          let currentSubtema = null;

          while (j < allInputs.length && !allInputs[j].classList.contains("tema-input-section")) {
            const el = allInputs[j];

            if (el.classList.contains("subtema-input-section")) {
              const subtemaValue = el.querySelector("input[type='text']").value.trim();
              if (subtemaValue) {
                currentSubtema = {
                  title: subtemaValue,
                  items: []
                };
                tema.subtemas.push(currentSubtema);
              }
            } else {
              const inputBlock = el;
              const titleInput = inputBlock.querySelector("input[type='text']");
              const title = titleInput ? titleInput.value.trim() : "";
              const textArea = inputBlock.querySelector("textarea");
              const fileInput = inputBlock.querySelector("input[type='file']");
              const type = inputBlock.getAttribute("data-type") || "otro";

              const item = {
                type,
                title,
                content: null
              };

              if (textArea) {
                item.content = textArea.value;
              } else if (fileInput && fileInput.files.length > 0) {
                item.content = fileInput.files[0].name;
              }

              if (currentSubtema) {
                currentSubtema.items.push(item);
              } else {
                tema.items.push(item);
              }
            }

            j++;
          }

          courseData.temas.push(tema);
          i = j;
        } else {
          i++;
        }
      }

      try {
        const teacherRef = doc(db, "CorsoSkillsTeacher", UserUidInfo);
        const docSnap = await getDoc(teacherRef);

        if (!docSnap.exists()) {
          console.error("No such teacher document!");
          return;
        }

        const existingData = docSnap.data();
        const updatedCourses = existingData.courses || [];
        updatedCourses.push(courseData);

        await setDoc(teacherRef, {
          ...existingData,
          courses: updatedCourses
        });

        alert("Curso guardado en Firestore.");
      } catch (error) {
        console.error("Error saving course:", error);
      }
    };

    // Handle image loading first if exists
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = function (e) {
        courseData.image = e.target.result;
        buildAndSave();
      };
      reader.readAsDataURL(imageFile);
    } else {
      buildAndSave();
    }
  });

  // Handle level selection UI
  const levelButtons = document.querySelectorAll("#level-toggle-buttons .level-btn");
  levelButtons.forEach(button => {
    button.addEventListener("click", () => {
      levelButtons.forEach(btn => btn.classList.remove("selected"));
      button.classList.add("selected");
    });
  });
}






  function ClearAllBtn() {
    const clearAllBtn = document.getElementById("clearAll");

    clearAllBtn.addEventListener("click", () => {
      const confirmed = confirm("¿Estás seguro de que quieres borrar todo?");
      if (confirmed) {
        location.reload();
      }
    });
  }









  








  // Function to show the selected tab and hide the others
  function showTab(tabId) {
    const tabs = ['Notes', 'Resources', 'Quizes'];

    tabs.forEach(id => {
      document.getElementById(id).style.display = (id === tabId) ? 'block' : 'none';
    });
  }

  // Add click event listeners to buttons
  document.getElementById('Notes-btns').addEventListener('click', () => showTab('Notes'));
  document.getElementById('Resources-btns').addEventListener('click', () => showTab('Resources'));
  document.getElementById('Quizes-btns').addEventListener('click', () => showTab('Quizes'));

  // Optionally, show the first tab by default on page load
  showTab('Notes');





























  AddVideoBtn()
  AddTextBtn()
  AddPresentBtn()
  AddExamBtn()
  AddTemaBtn()
  AddSubTemaBtn()
 
  SaveCourse()
  ClearAllBtn()


 setupLevelButtons();
  AddPreviewBtn();
}
fetchAllContent()






















 
 


    
 
 
 

 
 
 
 
 
 
document.getElementById("Home").addEventListener("click", function () {
  window.location.href = "index11.html";
});
document.getElementById("invocie").addEventListener("click", function () {
  window.location.href = "index11.1.html";
});
document.getElementById("Students").addEventListener("click", function () {
  window.location.href = "index11.2.html";
});
document.getElementById("Assignments").addEventListener("click", function () {
  window.location.href = "index11.3.html";
});
document.getElementById("Lessons").addEventListener("click", function () {
  window.location.href = "index11.4.html";
});   
document.getElementById("Mensajes").addEventListener("click", function () {
  window.location.href = "index11.5.html";
});
document.getElementById("Settings").addEventListener("click", function () {
  window.location.href = "index11.6.html";
}); 
document.getElementById("Logout").addEventListener("click", function () {
  window.location.href = "index4.html";
});  





 document.addEventListener("DOMContentLoaded", function () {
    const openBtn = document.getElementById("open");
    const closeBtn = document.getElementById("close");
    const linkNames = document.querySelectorAll(".linkName");

    function showSidebarText() {
      linkNames.forEach(el => el.style.display = "inline");
      openBtn.style.display = "none";
      closeBtn.style.display = "flex";
    }

    function hideSidebarText() {
      linkNames.forEach(el => el.style.display = "none");
      closeBtn.style.display = "none";
      openBtn.style.display = "flex";
    }

    openBtn.addEventListener("click", showSidebarText);
    closeBtn.addEventListener("click", hideSidebarText);

    // Initial state: hide all link names, show open button only
    hideSidebarText();
 });

 document.addEventListener("DOMContentLoaded", function () {
  const openToolBtn = document.getElementById("tool-sidebar-open");
  const closeToolBtn = document.getElementById("tool-sidebar-close");
  const sidebarContent = document.querySelectorAll(".tool-Side-Btns span"); // Assumes labels are in <span> elements

  function showToolSidebarText() {
    sidebarContent.forEach(el => el.style.display = "inline");
    openToolBtn.style.display = "none";
    closeToolBtn.style.display = "flex";
  }

  function hideToolSidebarText() {
    sidebarContent.forEach(el => el.style.display = "none");
    closeToolBtn.style.display = "none";
    openToolBtn.style.display = "flex";
  }

  openToolBtn.addEventListener("click", showToolSidebarText);
  closeToolBtn.addEventListener("click", hideToolSidebarText);

  // Initial state
  hideToolSidebarText();
});
