// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore, doc, getDoc, collection, addDoc, setDoc, Timestamp, deleteField, updateDoc,arrayUnion,serverTimestamp} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll, } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-storage.js";
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updateEmail, signInWithEmailAndPassword,  sendPasswordResetEmail, confirmPasswordReset, applyActionCode, onAuthStateChanged, signOut,   updatePassword   } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
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
const storage = getStorage(app, 'gs://corsoskills-1ba50.firebasestorage.app');
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

// ✅ Folder path in Firebase Storage
const folderPath = "BusinessUnits/CorsoSkills";
// ✅ On page load
window.addEventListener("DOMContentLoaded", () => {
  const uploadBtn = document.getElementById("Img-btn");
  const fileInput = document.getElementById("file");

  const userUid = localStorage.getItem("UserUidInfo");
  const role = capitalize(localStorage.getItem("UserRole") || "Unknown");

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  console.log("🔑 Usuario logueado:", localStorage.getItem("ActiveLogedin"));
  console.log("👤 Rol:", role);
  console.log("🆔 UID:", userUid);

  if (!uploadBtn || !fileInput || !userUid) {
    console.error("❌ Elementos del DOM o UID no encontrados.");
    return;
  }

  // ✅ Upload logic
  uploadBtn.addEventListener("click", async () => {
    const file = fileInput.files[0];

    if (!file) {
      alert("Por favor selecciona un archivo.");
      return;
    }

    try {
      const fullPath = `${folderPath}/${role}/${userUid} - ProfileImg`;
      const fileRef = ref(storage, fullPath);

      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);

      // ✅ Save URL in Firestore
      const userDocRef = doc(db, "CorsoSkillsStudents", userUid);
      await setDoc(userDocRef, {
        profileImage: downloadURL
      }, { merge: true });

      alert("✅ Imagen subida y guardada con éxito.");
      renderUserImage(downloadURL);
    } catch (err) {
      console.error("❌ Error al subir/guardar imagen:", err);
      alert("❌ Error al subir o guardar.");
    }
  });

  // ✅ Load profile image on page load
  loadProfileImage(userUid);
});
// 🔄 Load image from Firestore
async function loadProfileImage(userUid) {
  try {
    const docRef = doc(db, "CorsoSkillsStudents", userUid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const imageUrl = data.profileImage;

      if (imageUrl) {
        renderUserImage(imageUrl);
        return;
      }
    }

    // ❌ No image? Show icon
    renderUserIcon();
  } catch (err) {
    console.error("❌ Error al cargar la imagen:", err);
    renderUserIcon();
  }
}
// 🖼️ Render image in the DOM
function renderUserImage(url) {
  const imgContainer = document.getElementById("User-Img");
  imgContainer.innerHTML = `
    <img src="${url}" alt="Imagen de perfil" />
  `;
}
// 👤 Render icon fallback
function renderUserIcon() {
  const imgContainer = document.getElementById("User-Img");
  imgContainer.innerHTML = `
    <i id="User-img-Icon"  class="fa-solid fa-circle-user" ></i>
  `;
}









document.getElementById("changePasswordBtn").addEventListener("click", async () => {
  const user = auth.currentUser;
  const oldPassword = document.getElementById("oldPassword").value;
  const newPassword = document.getElementById("newPassword").value;

  if (!user || !oldPassword || !newPassword) {
    alert("Por favor completa todos los campos.");
    return;
  }

  try {
    const credential = EmailAuthProvider.credential(user.email, oldPassword);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
    alert("✅ Contraseña actualizada correctamente.");
  } catch (err) {
    console.error("❌ Error al actualizar contraseña:", err);
    alert(`❌ Error: ${err.message}`);
  }
});


















const userUid = localStorage.getItem("UserUidInfo");
if (userUid) {
  loadProfileImage(userUid);
}

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


  
  RenderProfileInfo()
  RenderFacturaInfo()







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

  document.getElementById("saveNotif").addEventListener("click", async () => {
    const studentRef = doc(db, "CorsoSkillsStudents", UserUidInfo);

  })









  // PEnding to do //
  function Certificates(){
    const CertificateBlock =  studentData.Courses
    function getCertifiedCourseIds(Courses) {
      const certifiedIds = [];

      // Loop through each slot in the Courses object
      for (const slot in Courses) {
        const course = Courses[slot];
        
        // Check if the course has Certificates === true
        if (course?.Certificates === true) {
          certifiedIds.push(course.Id);
        }
      }

      return certifiedIds;
    }
    const certifiedCourseIds = getCertifiedCourseIds(CertificateBlock);
    console.log(certifiedCourseIds); // Output: ["BB05"]




  async function generateAndDownloadCertificate(data) {
    const {
      userName,
      courseName,
      courseId,
      type,
      Hours = "00",
      Lessons = "00",
      completionDate
    } = data;

    const certificateHTML = `
      <div class="certificate" id="certificate-content">
        <h3>CERTIFICADO DE FINALIZACIÓN</h3>
        <h3>${userName}</h3>
        <h3>FINALIZÓ EL ${type === "Carrera" ? "CARRERA PROFESIONAL" : "CURSO"} DE CORSOSKILLS</h3>
        <h1>${courseName.toUpperCase()}</h1>
        <p>POR HABER COMPLETADO SATISFACTORIAMENTE EL ${type.toUpperCase()}:</p>
        <div class="course-Time-Lessons">
          <div class="hours">
            <span>${Hours}</span>
            <span>HORAS</span>
          </div>
          <div class="lessons">
            <span>${Lessons}</span>
            <span>LECCIONES</span>
          </div>
        </div>

        <div class="certificate-footer">
          <div class="signature">
            <img>
            <div class="line"></div>
            <h3>Ashley Armanti</h3>
            <h3>CEO, CorsoSkills</h3>
          </div>
          <div class="date">
            <h3>${new Date(completionDate).toLocaleDateString("es-MX")}</h3>
            <div class="line"></div>
            <h3>FECHA DE FINALIZACIÓN</h3>
          </div>
        </div>
      </div>
    `;

    const container = document.getElementById("certificate-container");
    container.innerHTML = certificateHTML;

    const element = document.getElementById("certificate-content");

    const opt = {
      margin: 0.5,
      filename: `certificado-${courseId}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Trigger the download
    await html2pdf().from(element).set(opt).save();
  }

  // Example data
  const exampleData = {
    userName: "Juan Pérez",
    courseId: "BB05",
    courseName: "Negocios para Emprendedores",
    type: "Curso", // or "Carrera"
    teacher: "Carlos Rivas",
    Hours: 12,
    Lessons: 8,
    completionDate: "2025-07-23"
  };

  // Call the certificate generation on page load
  window.onload = () => {
    generateAndDownloadCertificate(exampleData);
  };
    
  }





  function  Notificaciones(){
    async function loadNotificationSettings() {
      const studentRef = doc(db, "CorsoSkillsStudents", UserUidInfo);
      const docSnap = await getDoc(studentRef);

      if (!docSnap.exists()) {
        // If user doc doesn't exist, create it with default notifications
        await setDoc(studentRef, {
          Notifications: {
            settings: getDefaultNotificationSettings()
          }
        });
      } else {
        const data = docSnap.data();
        const settings = data.Notifications?.settings;

        if (!settings) {
          // If Notifications.settings doesn't exist yet, initialize it
          await updateDoc(studentRef, {
            "Notifications.settings": getDefaultNotificationSettings()
          });
        } else {
          // Render checkboxes from existing settings
          document.getElementById("emailNotif").checked = settings.email ?? true;
          document.getElementById("platformNotif").checked = settings.platform ?? true;
          document.getElementById("classReminder").checked = settings.classReminder ?? true;
          document.getElementById("newCourseNotif").checked = settings.newCourse ?? true;
          document.getElementById("messageNotif").checked = settings.message ?? true;
          document.getElementById("eventNotif").checked = settings.event ?? true;
          document.getElementById("promoNotif").checked = settings.promo ?? true;
        }
      }
    }

    loadNotificationSettings()
    function getDefaultNotificationSettings() {
      return {
        email: true,
        platform: true,
        classReminder: true,
        newCourse: true,
        message: true,
        event: true,
        promo: true,
        updatedAt: Timestamp.fromDate(new Date())
      };
    }

    document.getElementById("saveNotif").addEventListener("click", async () => {
      const studentRef = doc(db, "CorsoSkillsStudents", UserUidInfo);

      const newSettings = {
        email: document.getElementById("emailNotif").checked,
        platform: document.getElementById("platformNotif").checked,
        classReminder: document.getElementById("classReminder").checked,
        newCourse: document.getElementById("newCourseNotif").checked,
        message: document.getElementById("messageNotif").checked,
        event: document.getElementById("eventNotif").checked,
        promo: document.getElementById("promoNotif").checked,
        updatedAt: Timestamp.fromDate(new Date())
      };

      try {
        await updateDoc(studentRef, {
          "Notifications.settings": newSettings
        });
        console.log("✅ Notificaciones actualizadas:", newSettings);
      } catch (error) {
        console.error("❌ Error al guardar notificaciones:", error);
      }
    });
  }
  function Devices(){
    async function recordCurrentDeviceOncePerDay() {
    const studentRef = doc(db, "CorsoSkillsStudents", UserUidInfo);
    const docSnap = await getDoc(studentRef);

    if (!docSnap.exists()) {
      await setDoc(studentRef, {
        Devices: { devicesArray: [], lastRecorded: Timestamp.fromDate(new Date(0)) }
      });
    }

    const data = docSnap.data();
    const lastRecorded = data.Devices?.lastRecorded?.toDate?.() || new Date(0);

    const today = new Date();
    const sameDay =
      today.getFullYear() === lastRecorded.getFullYear() &&
      today.getMonth() === lastRecorded.getMonth() &&
      today.getDate() === lastRecorded.getDate();

    // Ya se registró hoy, no volver a registrar
    if (sameDay) {
      console.log("ℹ️ El dispositivo ya fue registrado hoy.");
      return;
    }

    const ua = navigator.userAgent;

    // Browser detection
    let browser = "Navegador desconocido";
    if (ua.includes("Chrome")) browser = "Chrome";
    else if (ua.includes("Firefox")) browser = "Firefox";
    else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
    else if (ua.includes("Edg")) browser = "Edge";

    // OS detection
    let os = "Sistema operativo desconocido";
    if (ua.includes("Windows NT")) os = "Windows";
    else if (ua.includes("Macintosh")) os = "macOS";
    else if (ua.includes("Android")) os = "Android";
    else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
    else if (ua.includes("Linux")) os = "Linux";

    // Device type detection
    let deviceType = "Computadora";
    if (/Mobi|Android|iPhone/i.test(ua)) deviceType = "Teléfono";
    else if (/Tablet|iPad/i.test(ua)) deviceType = "Tablet";

    const deviceString = `${browser} (${os}) - ${deviceType}`;

    const deviceData = {
      deviceInfo: deviceString,
      timestamp: Timestamp.fromDate(today)
    };

    try {
      await updateDoc(studentRef, {
        "Devices.devicesArray": arrayUnion(deviceData),
        "Devices.lastRecorded": Timestamp.fromDate(today)
      });
      console.log("✅ Dispositivo registrado con éxito:", deviceString);
    } catch (error) {
      console.error("❌ Error al guardar dispositivo:", error);
    }
  }
  recordCurrentDeviceOncePerDay()
  async function renderRecentDevices() {
    try {
      const studentRef = doc(db, "CorsoSkillsStudents", UserUidInfo);
      const studentSnap = await getDoc(studentRef);

      if (studentSnap.exists()) {
        const data = studentSnap.data();
        const devicesArray = data.Devices?.devicesArray || [];

        const sorted = devicesArray.sort((a, b) => {
          const timeA = a.timestamp?.seconds || 0;
          const timeB = b.timestamp?.seconds || 0;
          return timeB - timeA;
        });

        const latestThree = sorted.slice(0, 3);

        const container = document.getElementById("Devices-Content");
        container.innerHTML = "";

        if (latestThree.length === 0) {
          container.innerHTML = "<p>No hay dispositivos registrados.</p>";
          return;
        }

        latestThree.forEach((device) => {
          const p = document.createElement("p");
          const readableDate = device.timestamp?.toDate?.().toLocaleString("es-ES") || "Fecha desconocida";
          p.textContent = `${device.deviceInfo} - ${readableDate}`;
          container.appendChild(p);
        });
      } else {
        console.log("❌ No se encontró el documento del estudiante.");
      }
    } catch (error) {
      console.error("❌ Error al cargar los dispositivos:", error);
    }
  }
  renderRecentDevices()
  }
  
  Certificates()
  Notificaciones()
  Devices()



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







