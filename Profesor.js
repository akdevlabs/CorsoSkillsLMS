// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore, doc, getDoc, collection, addDoc, setDoc, Timestamp, deleteField, updateDoc} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-storage.js";

// Configuración Firebase (tuya)
const firebaseConfig = {
  apiKey: "AIzaSyD2w5sXCGRBxne-23FRCTAXQrMwHt4nHTY",
  authDomain: "corsoskills-1ba50.firebaseapp.com",
  projectId: "corsoskills-1ba50",
  storageBucket: "corsoskills-1ba50.appspot.com",
  messagingSenderId: "813928863826",
  appId: "1:813928863826:web:771cd8ad820570441fa78b",
  measurementId: "G-MYT63ZNNCC"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

 const fileInput = document.getElementById("file");
  const btn = document.getElementById("btn");
  let file;

  fileInput.addEventListener("change", (e) => {
    file = e.target.files[0];
    btn.disabled = !file;
  });

  btn.addEventListener("click", async () => {
    if (!file) return alert("Selecciona archivo");

    const fileRef = ref(storage, `testUploads/${Date.now()}_${file.name}`);

    try {
      const snapshot = await uploadBytes(fileRef, file);
      const url = await getDownloadURL(snapshot.ref);
      alert("Subido! URL:\n" + url);
      console.log(url);
    } catch(e) {
      console.error(e);
      alert("Error al subir. Mira consola.");
    }
  });














const TBuInfo =  "CorsoSkills";  // Example variable (not used in the current code)
const UserUidInfo = localStorage.getItem("UserUidInfo");


console.log(UserUidInfo)



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
  function setBodyBackgroundColor(backgroundColor) {
    document.body.style.backgroundColor = backgroundColor;
  }
  function setBackgroundColor(selector, backgroundColor) {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      elements.forEach(element => {
        element.style.backgroundColor = backgroundColor;
      });
    } else {
      console.error(`No elements found for selector '${selector}'.`);
    }
  }
  function setTextColors(selector, Tcolor) {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      elements.forEach(element => {
        element.style.color = Tcolor;
      });
    } else {
      console.error(`No elements found for selector '${selector}'.`);
    }
  }
  function setGlobalFont(fontFamily) {
    document.body.style.fontFamily = fontFamily;
  }
  setGlobalFont(data.Font)
  


  function SideBarColors(){
        const style = document.createElement('style');
    style.textContent = `
      .Side-Btns i{
        color: ${Base}
      }
      .linkName{
        color: ${Base}
      }

      .Side-Btns i:hover {
        color: ${Prime2}
      }
      .Side-caret i{
        color: ${Base}
      }

    `;
    document.head.appendChild(style);

  }
  function SetMainColors(){
    renderImage(data.BuLogos.Icons[0], "BuLogo", "Bulogos")
    setBodyBackgroundColor(Prime4)
    setBackgroundColor("#sidebar", Prime5)

  }
  function mainColors(){
    setBackgroundColor("#main", Prime5)
  }



  
 




  SideBarColors()
  SetMainColors()
  mainColors()  


});


async function getstudentContent() {
  try {
    const docRef = doc(db, "CorsoSkillsStudents", UserUidInfo);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.error("No such student document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching student document:", error);
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
  const studentData = await getstudentContent();
  const businessData = await getCorsoSkillAppContent();

  if (studentData) {
    console.log("Student Document Data:", studentData);
  } else {
    console.log("No student data found.");
    return;
  }

  if (businessData) {
    console.log("Business Document Data:", businessData);
  } else {
    console.log("No business data found.");
  }
  function renderText(elementId, text) {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element with id "${elementId}" not found.`);
      return;
    }
    element.textContent = text;
  }  
  function renderUserImage() {
      const container = document.getElementById("User-Img");
      const imageUrl = //studentData.profileImg;

      container.innerHTML = ""; // Clear any existing content

      if (imageUrl && imageUrl.trim() !== "") {
        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = "User Image";
        container.appendChild(img);
      } else {
        container.innerHTML = '<i class="fa-solid fa-user"></i>';
      }
  }

  function RenderProfileInfo(){
    renderText("Full-Name", studentData.fullName)
  }



document.getElementById("saveNotif").addEventListener("click", async () => {
  const emailNotif = document.getElementById("emailNotif").checked;
  const platformNotif = document.getElementById("platformNotif").checked;
  const classReminder = document.getElementById("classReminder").checked;

  try {
    const studentRef = doc(db, "CorsoSkillsStudents", UserUidInfo);

    await updateDoc(studentRef, {
      notifications: {
        emailNotifi: emailNotif,
        platformnNtifi: platformNotif,
        classReminderNotifi: classReminder
      }
    });

    alert("Preferencias guardadas exitosamente.");
  } catch (error) {
    console.error("Error al guardar configuración:", error);
    alert("Hubo un error al guardar la configuración.");
  }
});


document.getElementById("saveProfile").addEventListener("click", async () => {
  const fullName = document.getElementById("fullName").value.trim();
  const ShortName = document.getElementById("nickname").value.trim();
  const email = document.getElementById("email").value.trim();
  const bio = document.getElementById("bio").value.trim();

  try {
    const studentRef = doc(db, "CorsoSkillsStudents", UserUidInfo);

    await updateDoc(studentRef, {
    
        fullName,
        ShortName,
        email,
        bio
     
    });

    alert("Perfil actualizado exitosamente.");
  } catch (error) {
    console.error("Error al guardar el perfil:", error);
    alert("Hubo un error al guardar el perfil.");
  }
});













  renderUserImage()
  RenderProfileInfo()



}

// Run the fetch
fetchAllContent()








function setupShowContentOnClick(buttonId, contentId) {
  const button = document.getElementById(buttonId);
  const content = document.getElementById(contentId);

  if (!button) {
    console.error(`Button with id "${buttonId}" not found.`);
    return;
  }
  if (!content) {
    console.error(`Content with id "${contentId}" not found.`);
    return;
  }

  button.addEventListener("click", () => {
    content.style.display = "block";  // Show the content
  });
}

// Call the function to attach the event
setupShowContentOnClick("Full-Name-btn", "Full-Name-Content");












document.querySelectorAll('.Left-Btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const contentId = btn.id.replace('-Btn', '-Content');
    const content = document.getElementById(contentId);
    content.classList.toggle('show'); // Asegúrate que el CSS use .show para visibilidad
  });
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



document.getElementById("Home").addEventListener("click", function () {
  window.location.href = "index10.html";
});
document.getElementById("Books").addEventListener("click", function () {
  window.location.href = "index10.1.html";
});
document.getElementById("Videos").addEventListener("click", function () {
  window.location.href = "index10.2.html";
});
document.getElementById("Classroom").addEventListener("click", function () {
  window.location.href = "index10.7.html";
});
document.getElementById("Trophy").addEventListener("click", function () {
  window.location.href = "index10.3.html";
});
document.getElementById("Multi-User").addEventListener("click", function () {
  window.location.href = "index10.8.html";
});
document.getElementById("carrer").addEventListener("click", function () {
  window.location.href = "index10.5.html";
});


document.getElementById("profile").addEventListener("click", function () {
  window.location.href = "index10.4.html";
});   
document.getElementById("Logout").addEventListener("click", function () {
  window.location.href = "index4.html";
});  