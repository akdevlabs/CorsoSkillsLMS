// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore, doc, getDoc, collection, addDoc, setDoc, Timestamp, deleteField, updateDoc} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-storage.js";
import { getAuth,  sendPasswordResetEmail, confirmPasswordReset, applyActionCode, signInWithEmailAndPassword,onAuthStateChanged, signOut   } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
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
const auth = getAuth(app);

console.log(auth)

const TBuInfo =  "CorsoSkills";  // Example variable (not used in the current code)
const UserUidInfo = localStorage.getItem("UserUidInfo");


onAuthStateChanged(auth, (user) => {
  if (user) {
    // ✅ Authenticated
    console.log("🔐 User is authenticated:");
    console.log("UID:", user.uid);
    console.log("Email:", user.email);

    // Optional: Store in localStorage if needed
    localStorage.setItem("ActiveLogedin", "true");
    localStorage.setItem("UserUidInfo", user.uid);
    localStorage.setItem("UserEmail", user.email);

  } else {
    // ❌ Not authenticated
    console.warn("🚫 Usuario no autenticado. Redirigiendo al login...");
    localStorage.removeItem("ActiveLogedin");
    window.location.href = "login.html"; // or your login route
  }
});






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
    setBackgroundColor("#header", Prime5)
  }
  function CenterColors(){
    const style = document.createElement('style');
    style.textContent = `
  
    .header {
      color: ${Base};
    }
    .card {
      background-color: ${Prime5};
    }
    .card h3, .card h2 {
      color:${Prime};
    }
    .card i {
      color: ${Prime3};
    }
    input[type="text"],
    input[type="email"],
    input[type="password"],
    textarea,
    select {
      background-color: ${Prime5};
    }
    input:focus, textarea:focus, select:focus {
      border-color:${Prime3};
    }
    .btn, .btn-sm {
      background-color: ${Base};
      color: ${Prime5};
    }
    .btn:hover, .btn-sm:hover {
      background-color:${Prime2};
    }
    .payment-card {
      background: ${Prime5};
      border: 1.5px solid ${Prime2};
    }
    .payment-card h4 {
      color: ${Prime2};
    }
    .payment-card p {
      color: ${Base};
    }
    .payment-card p strong {
      color: ${Prime};
    }
    .Renderd {
      border: 1px solid  ${Prime};
    }
    .Pay-Info {
      color: ${Base};
    }
    #User-Img i {
      color:${Prime2};
    }
    .card-left-btn{
      background-color: ${Prime5};
    }
    .card-left-btn  h3, .card-left-btn h2 {
      color:${Prime};
    }
    .card-left-btn i {
      color: ${Prime3};
    }









    `;
    document.head.appendChild(style);

  }


  
 




  SideBarColors()
  SetMainColors()
  mainColors()  
  CenterColors()

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
  function renderText(text, elementId) {
    const container = document.getElementById(elementId);
    if (container) {
      container.textContent = text; // or use .innerHTML if you want to include HTML tags
    } else {
      console.error(`Element with ID '${elementId}' not found.`);
    }
  }
  function formatTimestampToSpanishDate(seconds, nanoseconds) {
    // Convert to milliseconds
    const totalMilliseconds = seconds * 1000 + Math.floor(nanoseconds / 1_000_000);
    
    // Create date object
    const date = new Date(totalMilliseconds);
    
    // Format in Spanish
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formatted = date.toLocaleDateString('es-ES', options);
    
    return formatted;
  }
  function renderTextOrFallback(elementId, contentId, value, buttonId ,SaveId) {
    const button = document.getElementById(buttonId);
    const container = document.getElementById(elementId);
    const content = document.getElementById(contentId);
    const Save = document.getElementById(SaveId);    

    if (value && value.trim() !== "") {
      container.textContent = value;
      content.style.display = "none"; // Hide the editable content if there's already a value

    } else {
      content.style.display = "block"; // Show content (e.g., input) if value is missing
      Save.style.display = "block";
    }

    if (button) {
      button.addEventListener("click", () => {
        content.style.display = "block"; // Always show content when edit button is clicked
        Save.style.display = "block";
      });
    }
  }
  function renderUserImage() {
      const container = document.getElementById("User-Img");
      const imageUrl = studentData.profileImg;

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
    renderTextOrFallback("Full-Name" ,"Full-Name-Content" , studentData.fullName, "Full-Name-btn", "save-Content")
    renderTextOrFallback("nick-name" ,"nick-name-Content" , studentData.ShortName, "nick-name-btn", "save-Content")
    renderTextOrFallback("bio-R" ,"Bio-Content" , studentData.bio, "Bio-btn", "save-Content",)  

   // renderTextOrFallback("Email-Text" ,"email-Content" , studentData.email, "Email-btn", "save-2-Content")  
   // renderTextOrFallback("password-Text" ,"New-password-Content" , studentData.password, "password-btn", "save-2-Content")  

  }
  function RenderFacturaInfo(){

    const date = formatTimestampToSpanishDate(studentData.Subscription.Nextpayment.seconds, studentData.Subscription.Nextpayment.nanoseconds)
    renderText(studentData.Subscription.Plan, "Active-plan")
    renderText(date, "Payments")
  


  }
  function renderPayments() {
  const container = document.getElementById("payments-container");
  const paymentsArray = studentData.Subscription.Payments;

  container.innerHTML = "";

  if (!paymentsArray.length) {
    container.innerHTML = "<p>No hay pagos registrados.</p>";
    return;
  }

  paymentsArray.forEach(payment => {
    const fullDate = formatTimestampToSpanishDate(payment.Date.seconds, payment.Date.nanoseconds)
    const card = document.createElement("div");
    card.className = "payment-card";
    card.innerHTML = `
      <h4>Pago ID: ${payment.Id}</h4>
      <p><strong>Monto:</strong> $${payment.Amount}</p>
      <p><strong>Fecha:</strong> ${fullDate}</p>
    `;
    container.appendChild(card);
  });
}









  document.getElementById("User-Img").addEventListener("click", async () => {
    const Img = document.getElementById("Img-Content")
   
        Img.style.display = "block"; 
  });

  document.getElementById("saveProfile").addEventListener("click", async () => {
    const fullName = document.getElementById("fullName").value.trim();
    const ShortName = document.getElementById("nickname").value.trim();
    const bio = document.getElementById("bio").value.trim();

    try {
      const studentRef = doc(db, "CorsoSkillsStudents", UserUidInfo);

      // Only update filled fields
      const updatedFields = {};

      if (fullName) {
        updatedFields.fullName = fullName;
        document.getElementById("Full-Name").innerText = fullName;
        document.getElementById("Full-Name-Content").style.display = "none";
      }

      if (ShortName) {
        updatedFields.ShortName = ShortName;
        document.getElementById("nick-name").innerText = ShortName;
        document.getElementById("nick-name-Content").style.display = "none";
      }

      if (bio) {
        updatedFields.bio = bio;
        document.getElementById("bio-R").innerText = bio;
        document.getElementById("Bio-Content").style.display = "none";
      }

      if (Object.keys(updatedFields).length > 0) {
        await updateDoc(studentRef, updatedFields);
        alert("Perfil actualizado exitosamente.");

        // Refresh after slight delay
        setTimeout(() => {
          location.reload();
        }, 800);
      } else {
        alert("No se ingresaron nuevos datos para actualizar.");
      }

    } catch (error) {
      console.error("Error al guardar el perfil:", error);
      alert("Hubo un error al guardar el perfil.");
    }
  });
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

  document.getElementById("pay-history-btn").addEventListener("click", async () => {
    renderPayments()
  });























  renderUserImage()
  RenderProfileInfo()
  RenderFacturaInfo()




























}

// Run the fetch
fetchAllContent()





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