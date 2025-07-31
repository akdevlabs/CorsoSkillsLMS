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

//console.log(auth)

const TBuInfo =  "CorsoSkills";  // Example variable (not used in the current code)
const UserUidInfo = localStorage.getItem("UserUidInfo");


onAuthStateChanged(auth, (user) => {
  if (user) {
    // ✅ Authenticated
   // console.log("🔐 User is authenticated:");
   // console.log("UID:", user.uid);
  //  console.log("Email:", user.email);

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

 // console.log("🔑 Usuario logueado:", localStorage.getItem("ActiveLogedin"));
 // console.log("👤 Rol:", role);
 // console.log("🆔 UID:", userUid);

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
 // console.log(data.BuLogos.Icons[0])
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
    .course-button {
      background-color:${Base};
      color: ${Prime5};
    }
    .course-button:hover {
      background-color: ${Prime2};
    }
    .career-button {
      background-color:${Base};
      color: ${Prime5};
    }  
    .career-button:hover {
      background-color: ${Prime2};
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

  const {Base, Prime, Prime1, Prime2, Prime3, Prime4, Prime5} = businessData.BuColors.Colors;

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
  document.getElementById("password-update-btn").addEventListener("click", function () {
    const passwordContent = document.getElementById("PS-password-Content");
    passwordContent.style.display = "flex";
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








  // PEnding to do //
  function Certificates(){

    function CertificatesCourses() {
      function getNestedProperty(obj, path) {
        return path.split('.').reduce((acc, key) => acc?.[key], obj);
      }

      const CertificateBlock = studentData.Courses;
      const Courses = businessData.Courses;

      function getCertifiedCourseIds(CoursesObj) {
        return Object.values(CoursesObj)
          .filter(course => course?.Certificates === true)
          .map(course => course.Id);
      }

      function parseCourseCode(code) {
        const levelMap = { B: "Beginner", I: "Intermediate", A: "Advanced" };
        const categoryMap = {
          A: "AI", B: "Business", D: "Design", F: "Finance", I: "Languages",
          L: "Leadership", M: "Marketing", P: "Productivity", C: "Programming",
          S: "Sales", T: "Technology", W: "Wellness"
        };

        if (!/^[A-Z]{2}\d{2}$/.test(code)) {
          return { error: `Invalid code format: ${code}` };
        }

        const level = levelMap[code.charAt(0)] || "Unknown";
        const category = categoryMap[code.charAt(1)] || "Unknown";
        const courseNumber = parseInt(code.slice(2), 10);

        return {
          code,
          level,
          category,
          fullLabel: `${category}.${level}.C${courseNumber}`
        };
      }

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

        const isCarrera = type === "Carrera";
        const backgroundImg = isCarrera ? businessData.Certificates.Careers : businessData.Certificates.Courses;
        const signatureImg = businessData.Certificates.Sig;
        const logo = businessData.BuLogos.Simple[1];

        let modal = document.getElementById("certificate-modal");
        if (!modal) {
          modal = document.createElement("div");
          modal.id = "certificate-modal";
          modal.innerHTML = `
            <div class="certificate-overlay">
              <div class="certificate-popup">
                <button class="close-btn" id="close-certificate-btn">✖</button>
                <button class="download-btn" id="download-certificate-btn">📥 Descargar</button>
                <div id="certificate-container"></div>
              </div>
            </div>
          `;
          document.body.appendChild(modal);

          const style = document.createElement("style");
          style.textContent = `
            .certificate-overlay {
              background: #000000b3;
            }
            .certificate-popup {
              background: ${Prime5};
            }
            .close-btn {
              color: ${Prime2};
            }
            .download-btn {
              background:${Prime3};
              color: ${Prime5};
            }
            .certificate {
              background-color: ${Prime5};
              box-shadow: 0 0 10px #0000004d;
            }
            .line {
              background-color: black;
            }
          `;
          document.head.appendChild(style);

          document.getElementById("close-certificate-btn").addEventListener("click", () => {
            modal.remove();
          });

          document.getElementById("download-certificate-btn").addEventListener("click", () => {
            const target = document.getElementById("certificate-content");
            html2canvas(target, {
              scale: 2,
              useCORS: true,
              allowTaint: true
            }).then(canvas => {
              const link = document.createElement("a");
              link.download = `Certificado-${data.courseName.replace(/\s+/g, "_")}.png`;
              link.href = canvas.toDataURL("image/png");
              link.click();
            });
          });
        }

        const container = document.getElementById("certificate-container");
        container.innerHTML = `
          <div class="certificate" id="certificate-content" style="background-image: url('CorsoSkill/certifacete.png');">
            <img src="${logo}" alt="Logo" class="logo" />
            <h3>CERTIFICADO DE FINALIZACIÓN</h3>
            <h1>${userName}</h1>
            <h4>FINALIZÓ EL ${isCarrera ? "CARRERA PROFESIONAL" : "CURSO"} DE CORSOSKILLS</h4>
            <h1>${courseName.toUpperCase()}</h1>
            <p>POR HABER COMPLETADO SATISFACTORIAMENTE EL ${type.toUpperCase()}:</p>
            <div class="course-Time-Lessons">
              <div class="hours">
                <span>${Hours}</span><br/>
                <span>HORAS</span>
              </div>
              <div class="lessons">
                <span>${Lessons}</span><br/>
                <span>LECCIONES</span>
              </div>
            </div>
            <div class="certificate-footer">
              <div class="signature">
                <img src="CorsoSkill/ArmantiSig.png" alt="Firma" />
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
      }

      function renderCertifiedCourseButtons() {
        const certifiedCourseIds = getCertifiedCourseIds(CertificateBlock);
        const container = document.getElementById("CertificatesCurso");
        container.innerHTML = "";

        certifiedCourseIds.forEach(id => {
          const parsed = parseCourseCode(id);
          const fullCourseObj = getNestedProperty(Courses, parsed.fullLabel);
          const studentCourseEntry = Object.values(CertificateBlock).find(entry => entry?.Id === id);
          if (!fullCourseObj || !studentCourseEntry) return;

          const exampleData = {
            userName: studentData.fullName || studentData.Name || "Nombre del Estudiante",
            courseId: fullCourseObj.Id || id,
            courseName: fullCourseObj.Title || fullCourseObj.Tittle || "Título no encontrado",
            type: fullCourseObj.Type || "Curso",
            Hours: fullCourseObj.Duration?.Hours || "00",
            Lessons: fullCourseObj.Lessons || "00",
            completionDate: studentCourseEntry?.Date || new Date().toISOString()
          };

          const button = document.createElement("button");
          button.textContent = exampleData.courseName;
          button.className = "course-button";

          button.addEventListener("click", () => {
            generateAndDownloadCertificate(exampleData);
          });
          container.appendChild(button);
        });
      }

      renderCertifiedCourseButtons();
    }



    function CertificatesCarrera() {
      // 🔧 Helper: resolve "Category.Level.CXX" into nested object access
      function getNestedProperty(obj, path) {
        return path.split('.').reduce((acc, key) => acc?.[key], obj);
      }

      // Setup
      const CertificateBlock = studentData.Career;
      const Careers = businessData.Careers;

      // Get certified career IDs
      function getCertifiedCareerIds(CareerObj) {
        const certifiedIds = [];
        for (const slot in CareerObj) {
          const career = CareerObj[slot];
          if (career?.Certificates === true) {
            certifiedIds.push(career.Cid);
          }
        }
        return certifiedIds;
      }

      // Parse code like "BC01" → category + label
      function parseCourseCode(code) {
        const categoryMap = {
          A: "AI", B: "Business", D: "Design", F: "Finance", I: "Languages",
          L: "Leadership", M: "Marketing", P: "Productivity", C: "Programming",
          S: "Sales", T: "Technology", W: "Wellness"
        };

        if (!/^[A-Z]{2}\d{2}$/.test(code)) {
          return { error: `Invalid code format: ${code}` };
        }

        const categoryCode = code.charAt(0);
        const courseNumber = parseInt(code.slice(2), 10);

        return {
          code,
          category: categoryMap[categoryCode] || "Unknown",
          fullLabel: `C${courseNumber}`
        };
      }

      // Generate and download certificate (same as courses, but with Careers background)
      async function generateAndDownloadCertificate(data) {
        const {
          userName,
          courseName,
          courseId,
          type = "Carrera",
          Hours = "00",
          Lessons = "00",
          completionDate
        } = data;

        const isCarrera = type === "Carrera";
        const backgroundImg = isCarrera
          ? businessData.Certificates.Careers
          : businessData.Certificates.Courses;
        const signatureImg = businessData.Certificates.Sig;
        const logo = businessData.BuLogos.Simple[1];
        const orientation = isCarrera ? "portrait" : "landscape";

        // Create or reuse modal
        let modal = document.getElementById("certificate-modal");
        if (!modal) {
          modal = document.createElement("div");
          modal.id = "certificate-modal";
          modal.innerHTML = `
            <div class="certificate-overlay">
              <div class="certificate-popup">
                <button class="close-btn" id="close-certificate-btn">✖</button>
                <div id="certificate-container"></div>
              </div>
            </div>
          `;
          document.body.appendChild(modal);

          const style = document.createElement("style");
          style.textContent = `
            .certificate-overlay {
              position: fixed;
              top: 0; left: 0;
              width: 100%; height: 100%;
              background: rgba(0, 0, 0, 0.7);
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 9999;
            }
            .certificate-popup {
              background: ${Prime5};
              padding: 20px;
              border-radius: 8px;
              width: ${isCarrera ? '600px' : '1000px'};
              max-height: 90vh;
              overflow: auto;
              position: relative;
            }
            .close-btn {
              position: absolute;
              top: 10px;
              right: 10px;
              background:  ${Prime2};
              color: ${Prime5};
              border: none;
              font-size: 18px;
              cursor: pointer;
              border-radius: 4px;
              padding: 5px 10px;
            }
            .certificate {
              width: 100%;
              font-family: sans-serif;
              text-align: center;
              padding: 40px;
              color: ${Prime};
              box-shadow: 0 0 10px rgba(0,0,0,0.3);
            }
            .certificate .logo {
              width: 200px;
              margin: 0 auto 20px;
            }
            .course-Time-Lessons {
              display: flex;
              justify-content: center;
              gap: 40px;
              margin-top: 10px;
            }
            .certificate-footer {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 40px;
              padding: 0 30px;
            }
            .signature{
              display: flex;
              flex-direction: column;
              align-items: center;
              margin: -1rem 0 1rem 0;
            }
            .signature img {
              width: 150px;
              margin: 10px 0  -4rem 0;
            }
            .line {
              width: 100px;
              height: 2px;
              background-color: black;
              margin: 5px auto;
            }
            .certificate h1{
              color: ${Base};
            }
            .name{
              margin:-1rem 0 0 0 ;
            }

          `;
          document.head.appendChild(style);

          document.getElementById("close-certificate-btn").addEventListener("click", () => {
            modal.remove();
          });
        }

        const container = document.getElementById("certificate-container");

        container.innerHTML = `
          <div class="certificate" id="certificate-content">
            <img src="${logo}" alt="Logo" class="logo" />
            <h3>CERTIFICADO DE FINALIZACIÓN</h3>
            <h1>${userName}</h1>
            <h4>FINALIZÓ LA ${"CARRERA PROFESIONAL" } DE CORSOSKILLS</h4>
            <h1>${courseName.toUpperCase()}</h1>
            <p>POR HABER COMPLETADO SATISFACTORIAMENTE LA ${type.toUpperCase()}:</p>
            <div class="course-Time-Lessons">
              <div class="hours">
                <span>${Hours}</span><br/>
                <span>HORAS</span>
              </div>
              <div class="lessons">
                <span>${Lessons}</span><br/>
                <span>LECCIONES</span>
              </div>
            </div>
            <div class="certificate-footer">
              <div class="signature">
                <img src="${signatureImg}" alt="Signature">
                <div class="line"></div>
                <div class="name">
                  <h3>Ashley  Armanti</h3>
                  <h3>CEO, CorsoSkills</h3>
                </div>
              </div>
              <div class="date">
                <h3>${new Date(completionDate).toLocaleDateString("es-MX")}</h3>
                <div class="line"></div>
                <h3>FECHA DE FINALIZACIÓN</h3>
              </div>
            </div>
          </div>
        `;
        // Apply background
        const certificateEl = document.getElementById("certificate-content");
        certificateEl.style.backgroundImage = `url('${backgroundImg}')`;
        certificateEl.style.backgroundSize = "cover";
        certificateEl.style.backgroundPosition = "center";
        certificateEl.style.backgroundRepeat = "no-repeat";
      }

      // Render buttons
      // Render buttons
        function renderCertifiedCareerButtons() {
          const certifiedCareerIds = getCertifiedCareerIds(CertificateBlock);
          const container = document.getElementById("CertificatesCarrera");
          container.innerHTML = "";

          certifiedCareerIds.forEach(id => {
            const { category, fullLabel } = parseCourseCode(id);
            const categoryData = Careers?.[category];
            const careerData = categoryData?.[fullLabel];
            const studentCareerEntry = Object.values(CertificateBlock).find(entry => entry?.Cid === id);
            if (!careerData || !studentCareerEntry) return;

            const exampleData = {
              userName: studentData.FullName || studentData.Name || "Nombre del Estudiante",
              courseId: careerData.Cid || id,
              courseName: careerData.Tittle || careerData.Title || "Título no encontrado",
              type: careerData.Type || "Carrera",
              Hours: careerData?.Duration?.Hours || "00",
              Lessons: careerData?.CList?.length?.toString() || "00",
              completionDate: studentCareerEntry?.Date || new Date().toISOString()
            };

            const button = document.createElement("button");
            button.textContent = exampleData.courseName;
            button.className = "career-button";

            button.addEventListener("click", () => {
              generateAndDownloadCertificate(exampleData);
            });

            container.appendChild(button);
          });
        }


      // Init
      renderCertifiedCareerButtons();
    }

    CertificatesCourses()
    CertificatesCarrera()
 
  }

  function Notificaciones() {
    async function loadNotificationSettings() {
      const studentRef = doc(db, "CorsoSkillsStudents", UserUidInfo);
      const docSnap = await getDoc(studentRef);

      if (!docSnap.exists()) {
        // Crear documento con valores por defecto en Settings.Notificaciones
        await setDoc(studentRef, {
          Settings: {
            Notificaciones: getDefaultNotificationSettings()
          }
        });
      } else {
        const data = docSnap.data();
        const settings = data.Settings?.Notificaciones;

        if (!settings) {
          // Inicializar Settings.Notificaciones si no existe
          await updateDoc(studentRef, {
            "Settings.Notificaciones": getDefaultNotificationSettings()
          });
        } else {
          // Renderizar checkboxes con valores existentes o true por defecto
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
          "Settings.Notificaciones": newSettings
        });
        console.log("✅ Notificaciones actualizadas:", newSettings);
      } catch (error) {
        console.error("❌ Error al guardar notificaciones:", error);
      }
    });

    loadNotificationSettings();
  }

  function Devices() {
    async function recordCurrentDeviceOncePerDay() {
      const studentRef = doc(db, "CorsoSkillsStudents", UserUidInfo);
      const docSnap = await getDoc(studentRef);

      if (!docSnap.exists()) {
        await setDoc(studentRef, {
          Settings: {
            Dispositivos: { devicesArray: [], lastRecorded: Timestamp.fromDate(new Date(0)) }
          }
        });
      }

      const data = docSnap.data();
      const dispositivos = data.Settings?.Dispositivos || { devicesArray: [], lastRecorded: Timestamp.fromDate(new Date(0)) };
      const lastRecorded = dispositivos.lastRecorded?.toDate?.() || new Date(0);

      const today = new Date();
      const sameDay =
        today.getFullYear() === lastRecorded.getFullYear() &&
        today.getMonth() === lastRecorded.getMonth() &&
        today.getDate() === lastRecorded.getDate();

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
          "Settings.Dispositivos.devicesArray": arrayUnion(deviceData),
          "Settings.Dispositivos.lastRecorded": Timestamp.fromDate(today)
        });
        console.log("✅ Dispositivo registrado con éxito:", deviceString);
      } catch (error) {
        console.error("❌ Error al guardar dispositivo:", error);
      }
    }

    async function renderRecentDevices() {
      try {
        const studentRef = doc(db, "CorsoSkillsStudents", UserUidInfo);
        const studentSnap = await getDoc(studentRef);

        if (studentSnap.exists()) {
          const data = studentSnap.data();
          const dispositivos = data.Settings?.Dispositivos || { devicesArray: [] };
          const devicesArray = dispositivos.devicesArray || [];

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

    recordCurrentDeviceOncePerDay();
    renderRecentDevices();
  }

  function Comunicacion() {
    async function loadCommunicationSettings() {
      const studentRef = doc(db, "CorsoSkillsStudents", UserUidInfo);
      const docSnap = await getDoc(studentRef);

      if (!docSnap.exists()) {
        // Crear documento con valores por defecto en Settings.Comunicacion
        await setDoc(studentRef, {
          Settings: {
            Comunicacion: getDefaultCommunicationSettings()
          }
        });
      } else {
        const data = docSnap.data();
        const settings = data.Settings?.Comunicacion;

        if (!settings) {
          // Inicializar Settings.Comunicacion si no existe
          await updateDoc(studentRef, {
            "Settings.Comunicacion": getDefaultCommunicationSettings()
          });
        } else {
          // Renderizar selects con valores existentes o valores por defecto
          document.querySelector("#Comunicacion-Content select:nth-of-type(1)").value = settings.metodo ?? "Email";
          document.querySelector("#Comunicacion-Content select:nth-of-type(2)").value = settings.zona ?? "GMT-6 Ciudad de México";
        }
      }
    }

    function getDefaultCommunicationSettings() {
      return {
        metodo: "Email",
        zona: "GMT-6 Ciudad de México",
        updatedAt: Timestamp.fromDate(new Date())
      };
    }

    document.querySelector("#Comunicacion-Content button").addEventListener("click", async () => {
      const metodo = document.querySelector("#Comunicacion-Content select:nth-of-type(1)").value;
      const zona = document.querySelector("#Comunicacion-Content select:nth-of-type(2)").value;

      const studentRef = doc(db, "CorsoSkillsStudents", UserUidInfo);

      const newSettings = {
        metodo,
        zona,
        updatedAt: Timestamp.fromDate(new Date())
      };

      try {
        await updateDoc(studentRef, {
          "Settings.Comunicacion": newSettings
        });
        console.log("✅ Configuración de comunicación actualizada:", newSettings);
      } catch (error) {
        console.error("❌ Error al guardar configuración de comunicación:", error);
      }
    });

    loadCommunicationSettings();
  }
    
  function Privacidad() {
    async function loadPrivacySettings() {
      const studentRef = doc(db, "CorsoSkillsStudents", UserUidInfo);
      const docSnap = await getDoc(studentRef);

      if (!docSnap.exists()) {
        // Crear el documento con valores por defecto dentro de Settings.Privacidad
        await setDoc(studentRef, {
          Settings: {
            Privacidad: getDefaultPrivacySettings()
          }
        });
      } else {
        const data = docSnap.data();
        const settings = data.Settings?.Privacidad; // CORREGIDO: leer desde Settings.Privacidad

        if (!settings) {
          // Inicializar Settings.Privacidad si no existe
          await updateDoc(studentRef, {
            "Settings.Privacidad": getDefaultPrivacySettings()
          });
        } else {
          // Mostrar estado actual en los checkboxes
          document.getElementById("publicProfile").checked = settings.publicProfile ?? true;
          document.getElementById("shareActivity").checked = settings.shareActivity ?? true;
        }
      }
    }

    function getDefaultPrivacySettings() {
      return {
        publicProfile: true,
        shareActivity: true,
        updatedAt: Timestamp.fromDate(new Date())
      };
    }

    document.querySelector("#Privacidad-Content button").addEventListener("click", async () => {
      const studentRef = doc(db, "CorsoSkillsStudents", UserUidInfo);

      const newSettings = {
        publicProfile: document.getElementById("publicProfile").checked,
        shareActivity: document.getElementById("shareActivity").checked,
        updatedAt: Timestamp.fromDate(new Date())
      };

      try {
        await updateDoc(studentRef, {
          "Settings.Privacidad": newSettings
        });
        console.log("✅ Configuración de privacidad actualizada:", newSettings);
      } catch (error) {
        console.error("❌ Error al guardar privacidad:", error);
      }
    });

    loadPrivacySettings();
  }
  function AgendaPersonal() {
    async function loadAgendaSettings() {
      const studentRef = doc(db, "CorsoSkillsStudents", UserUidInfo);
      const docSnap = await getDoc(studentRef);

      if (!docSnap.exists()) {
        // Crear el documento con configuración por defecto dentro de Settings.Agenda
        await setDoc(studentRef, {
          Settings: {
            Agenda: getDefaultAgendaSettings()
          }
        });
      } else {
        const data = docSnap.data();
        const settings = data.Settings?.Agenda;  // CORREGIDO para leer desde Settings.Agenda

        if (!settings) {
          // Inicializar Settings.Agenda si no existe
          await updateDoc(studentRef, {
            "Settings.Agenda": getDefaultAgendaSettings()
          });
        } else {
          // Cargar el estado del checkbox
          document.getElementById("syncGoogleCalendar").checked = settings.syncGoogle ?? false;
        }
      }
    }

    function getDefaultAgendaSettings() {
      return {
        syncGoogle: false,
        updatedAt: Timestamp.fromDate(new Date())
      };
    }

    document.querySelector("#Agenda-Content button").addEventListener("click", async () => {
      const studentRef = doc(db, "CorsoSkillsStudents", UserUidInfo);

      const newSettings = {
        syncGoogle: document.getElementById("syncGoogleCalendar").checked,
        updatedAt: Timestamp.fromDate(new Date())
      };

      try {
        // Actualizar dentro de Settings.Agenda
        await updateDoc(studentRef, {
          "Settings.Agenda": newSettings
        });
        console.log("✅ Configuración de agenda actualizada:", newSettings);
      } catch (error) {
        console.error("❌ Error al guardar configuración de agenda:", error);
      }
    });

    loadAgendaSettings();
  }
  function RedesSociales() {
    async function loadSocialSettings() {
      const studentRef = doc(db, "CorsoSkillsStudents", UserUidInfo);
      const docSnap = await getDoc(studentRef);

      if (!docSnap.exists()) {
        // Crear documento con la estructura inicial y valores por defecto
        await setDoc(studentRef, {
          Settings: {
            Redes: getDefaultSocialSettings()
          }
        });
      } else {
        const data = docSnap.data();
        const settings = data.Settings?.Redes;

        if (!settings) {
          // Si no existe Settings.Redes, inicializarlo
          await updateDoc(studentRef, {
            "Settings.Redes": getDefaultSocialSettings()
          });
        } else {
          // Cargar estados a los checkboxes
          document.getElementById("instagram").checked = settings.instagram ?? true;
          document.getElementById("facebook").checked = settings.facebook ?? true;
          document.getElementById("linkedin").checked = settings.linkedin ?? true;
          document.getElementById("twitter").checked = settings.twitter ?? true;
          document.getElementById("tiktok").checked = settings.tiktok ?? true;
        }
      }
    }

    function getDefaultSocialSettings() {
      return {
        instagram: true,
        facebook: true,
        linkedin: true,
        twitter: true,
        tiktok: true,
        updatedAt: Timestamp.fromDate(new Date())
      };
    }

    document.querySelector("#Redes-Content button").addEventListener("click", async () => {
      const studentRef = doc(db, "CorsoSkillsStudents", UserUidInfo);

      const newSettings = {
        instagram: document.getElementById("instagram").checked,
        facebook: document.getElementById("facebook").checked,
        linkedin: document.getElementById("linkedin").checked,
        twitter: document.getElementById("twitter").checked,
        tiktok: document.getElementById("tiktok").checked,
        updatedAt: Timestamp.fromDate(new Date())
      };

      try {
        await updateDoc(studentRef, {
          "Settings.Redes": newSettings
        });
        console.log("✅ Conexiones de redes sociales actualizadas:", newSettings);
      } catch (error) {
        console.error("❌ Error al guardar redes sociales:", error);
      }
    });

    loadSocialSettings();
  }
























  Certificates()
  Notificaciones()
  Devices()
  Comunicacion()
  Privacidad()
  AgendaPersonal()
  RedesSociales()





}

// Run the fetch
fetchAllContent()


document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const toggle = document.getElementById("menuToggle");
  const closeBtn = document.getElementById("Mobile-closeBtn");

  const openSidebar = () => {
    sidebar.classList.add("active");
    overlay.classList.add("active");
  };

  const closeSidebar = () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  };

  toggle.addEventListener("click", openSidebar);
  closeBtn.addEventListener("click", closeSidebar);
  overlay.addEventListener("click", closeSidebar);
});



document.addEventListener("DOMContentLoaded", function () {
  const leftButtons = document.querySelectorAll(".Left-Btn");

  leftButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const content = this.nextElementSibling;

      // Optional: Close all other open contents
      document.querySelectorAll(".Hidden-Content").forEach((section) => {
        if (section !== content) {
          section.style.display = "none";
        }
      });

      // Toggle the current section
      content.style.display =
        content.style.display === "flex" ? "none" : "flex";
    });
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const openBtn = document.getElementById("open");
  const closeBtn = document.getElementById("close");
  const menuToggle = document.getElementById("menuToggle");
  const linkNames = document.querySelectorAll(".linkName");
  const mobileSidebar = document.getElementById("Mobile-sidebar"); // Make sure this ID exists

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

  function toggleMobileSidebar() {
    mobileSidebar.classList.toggle("show"); // Add a class like .show to handle visibility in CSS
  }

  // Attach event listeners
  openBtn.addEventListener("click", showSidebarText);
  closeBtn.addEventListener("click", hideSidebarText);
  menuToggle.addEventListener("click", toggleMobileSidebar);

  // Initial state
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







