  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
  import {
    getFirestore,
    doc,
    getDoc,
    getDocs,
    collection,
    addDoc, 
    updateDoc,
    setDoc,
    arrayUnion,
    serverTimestamp
  } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

  import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signOut
  } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";

  import {
    getStorage,
    ref,
    listAll,
    uploadBytes,
    getDownloadURL
  } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-storage.js";

  const firebaseConfig = {
    apiKey: "AIzaSyD2w5sXCGRBxne-23FRCTAXQrMwHt4nHTY",
    authDomain: "corsoskills-1ba50.firebaseapp.com",
    projectId: "corsoskills-1ba50",
    storageBucket: "corsoskills-1ba50.appspot.com",
    messagingSenderId: "813928863826",
    appId: "1:813928863826:web:771cd8ad820570441fa78b",
    measurementId: "G-MYT63ZNNCC"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  
const storage = getStorage(app, 'gs://corsoskills-1ba50.firebasestorage.app');

  const TBuInfo =  "CorsoSkills";  // Example variable (not used in the current code)
  const UserUidInfo = localStorage.getItem("UserUidInfo");
  console.log(UserUidInfo)
  const courseId = localStorage.getItem("selectedCourseId");

console.log(storage)

// Reference to root or a folder inside the bucket
const folderRef = ref(storage, "BusinessUnits/");  // for example, list files inside BusinessUnits/

const testEmail = "test3@gmail.com";      // Replace with your test email
const testPassword = "123456789";  // Replace with your test password


async function listFilesInFolder() {
  try {
    // Sign in the user first
    const userCredential = await signInWithEmailAndPassword(auth, testEmail, testPassword);
    console.log("✅ Signed in as:", userCredential.user.email);

    // Reference your deep folder inside the bucket
    const folderRef = ref(storage, "BusinessUnits/CorsoSkills/Careers/BC01/");

    // List all files in the folder
    const res = await listAll(folderRef);

    if (res.items.length === 0) {
      console.log("⚠️ No files found in the folder.");
      return;
    }

    console.log(`📂 Found ${res.items.length} files:`);

    // Loop through files and log URL + add clickable link
    for (const itemRef of res.items) {
      const url = await getDownloadURL(itemRef);
      console.log("🔗", itemRef.name, url);

      // Optional: create clickable link in the page
      const a = document.createElement("a");
      a.href = url;
      a.textContent = itemRef.name;
      a.target = "_blank";
      document.body.appendChild(a);
      document.body.appendChild(document.createElement("br"));
    }
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

listFilesInFolder();



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
    function NavColors(){
      const style = document.createElement('style');
      style.textContent = `
        #Tittle{
          color: ${Base};
        }
        .Input-Block select {
          padding: 10px 12px;
          font-size: 16px;
          border: 1px solid  ${Prime3};
          border-radius: 8px;
          background-color: ${Prime5};
          transition: border-color 0.2s, box-shadow 0.2s;
          appearance: none;
          cursor: pointer;
        }

        .Input-Block select:hover {
          border-color:${Base};
          
        }

        .Input-Block select:focus {
          outline: none;
          border-color:${Prime3};
         
        }

      `;
      document.head.appendChild(style);

    }
    function Allcolors(){
      const style = document.createElement('style');
      style.textContent = `
        .content {
          background: ${Prime5};
        }
        .Faq-Q-tittle{
          color: ${Prime3};
          border: 1px solid ${Prime3};
        }
        .Faq-Q-tittle:hover{
          color: ${Prime5};
          background: ${Prime2};
          border: none; 
        }
        .hidden-faq-text {
          color: ${Base};
        }
        #faq::-webkit-scrollbar-thumb {
          background-color: ${Prime2};
        }
        #faq::-webkit-scrollbar-thumb:hover {
          background-color: ${Prime3};
        }
        #announcement-container li {
          border-left: 4px solid ${Prime3};
        }
        #announcement-container li:hover {
          color: ${Prime5};
          background-color:${Prime2};
          border-left: 4px solid ${Prime1};
        }
        #announcement-container li strong {
          color: ${Prime3};
        }
        /*----------- Messages --------------*/
        .content-tittle{
        color: ${Base};
        }
        #teacher-message{
          color:${Prime2};
          border: 1px solid ${Prime3};
        }
        .send-btn {
          background-color: ${Base};
          color: ${Prime5};
        }
        .send-btn:hover {
          background-color:${Prime2};
        }
        /*----------- teacher-info --------------*/
        #teacher-info .content-tittle {
          color:${Base};
        }
        .Teacher-points span {
          color: ${Base};
        }
        .Teacher-points strong {
          color:${Prime3};
        }














      `;
      document.head.appendChild(style);

    }



    SideBarColors()
    SetMainColors()
    NavColors()
    Allcolors()




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
  
    function renderImage(imageUrl, altUrl, UrlId) {
      const logoElement = document.getElementById(UrlId);
      if (logoElement) {
        logoElement.src = imageUrl;
        logoElement.alt = altUrl;
      } else {
        console.error("Element with ID 'logo' not found.");
      }
    }
    function renderText(text, elementId) {
      const element = document.getElementById(elementId);
  
      if (element) {
        element.textContent = text;
      } else {
        console.error(`Element with ID "${elementId}" not found.`);
      }
    }
    function setBackgroundColor(elementId, backgroundColor) {
      const element = document.getElementById(elementId);
      if (element) {
        element.style.backgroundColor = backgroundColor;
      } else {
        console.error(`Element with ID '${elementId}' not found.`);
      }
    }


    function populateCourseCategories(courses) {
      const select = document.getElementById("Category-select");
      if (!select) return;

      // Clear old options except the first one
      select.length = 1;

      const sortedCategories = Object.keys(courses).sort();

      sortedCategories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        select.appendChild(option);
      });
    }



    function populateCourseLevels(courses) {
      const select = document.getElementById("Type-select");
      if (!select) return;

      // Clear old options except the first one
      select.length = 1;

      const levelSet = new Set();

      Object.values(courses).forEach(category => {
        Object.entries(category).forEach(([level, value]) => {
          // Exclude 'Info' and empty levels
          if (
            level !== "Info" &&
            value &&
            typeof value === "object" &&
            Object.keys(value).length > 0
          ) {
            levelSet.add(level);
          }
        });
      });

      // Optional: order levels
      const orderedLevels = ["Beginner", "Intermediate", "Advanced"];
      const finalLevels = orderedLevels.filter(l => levelSet.has(l)).concat(
        [...levelSet].filter(l => !orderedLevels.includes(l))
      );

      finalLevels.forEach(level => {
        const option = document.createElement("option");
        option.value = level;
        option.textContent = level;
        select.appendChild(option);
      });
    }


    function getAllTeacherNames(courses) {
      const teacherNames = [];

      for (const key in courses) {
        const slot = courses[key];
        if (slot.Teacher) {
          teacherNames.push(slot.Teacher);
        }
      }

      // Optional: remove duplicates
      return [...new Set(teacherNames)];
    }
    function addStudentOptions(teachers) {
      const select = document.getElementById("student-select");
      if (!select) return;

      // Clear old options except the first (placeholder)
      select.length = 1;

      teachers.forEach((teacher, index) => {
        const option = document.createElement("option");
        option.value = `teacher-${index}`;
        option.textContent = teacher;
        select.appendChild(option);
      });
    }
    function formatBusinessHours(timeMap) {
      const dayTranslations = {
        Monday: "L",
        Tuesday: "M",
        Wednesday: "X",
        Thursday: "J",
        Friday: "V",
        Saturday: "S",
        Sunday: "D",
      };

      const hoursByDay = Object.entries(timeMap).map(([day, info]) => {
        const open = `${info.Open[0]}${info.Open[1]}`;
        const close = `${info.Close[0]}${info.Close[1]}`;
        return { day, open, close };
      });

      const grouped = {};
      for (const { day, open, close } of hoursByDay) {
        const key = `${open}-${close}`;
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(dayTranslations[day]);
      }

      const result = [];
      for (const [timeRange, days] of Object.entries(grouped)) {
        const order = ["L", "M", "X", "J", "V", "S", "D"];
        days.sort((a, b) => order.indexOf(a) - order.indexOf(b));

        const ranges = [];
        let start = days[0], end = days[0];
        for (let i = 1; i < days.length; i++) {
          const prevIndex = order.indexOf(end);
          const currentIndex = order.indexOf(days[i]);
          if (currentIndex === prevIndex + 1) {
            end = days[i];
          } else {
            ranges.push(start === end ? start : `${start}-${end}`);
            start = end = days[i];
          }
        }
        ranges.push(start === end ? start : `${start}-${end}`);
        const [open, close] = timeRange.split("-");
        result.push(`${ranges.join(", ")} ${open} - ${close}`);
      }

      return result.join(", ");
    }

    async function RenderMainNavcontent() {
      // Populate selects
      populateCourseCategories(businessData.Courses);
      populateCourseLevels(businessData.Courses);

      const categorySelect = document.getElementById("Category-select");
      const typeSelect = document.getElementById("Type-select");
      const courseSelect = document.getElementById("Course-select");

      const teacherNameSpan = document.getElementById("Teacher-Name");
      const teacherEmailSpan = document.getElementById("Teacher-Email");
      const teacherTimeSpan = document.getElementById("Teacher-Time");

      const courses = businessData.Courses;
      let currentCourseData = null;
      let selectedCourseId = null;

      function formatBusinessHours(timeMap) {
        const dayTranslations = {
          Monday: "L", Tuesday: "M", Wednesday: "X", Thursday: "J",
          Friday: "V", Saturday: "S", Sunday: "D",
        };

        const hoursByDay = Object.entries(timeMap).map(([day, info]) => {
          const open = `${info.Open[0]}${info.Open[1]}`;
          const close = `${info.Close[0]}${info.Close[1]}`;
          return { day, open, close };
        });

        const grouped = {};
        for (const { day, open, close } of hoursByDay) {
          const key = `${open}-${close}`;
          if (!grouped[key]) grouped[key] = [];
          grouped[key].push(dayTranslations[day]);
        }

        const result = [];
        for (const [timeRange, days] of Object.entries(grouped)) {
          const order = ["L", "M", "X", "J", "V", "S", "D"];
          days.sort((a, b) => order.indexOf(a) - order.indexOf(b));

          const ranges = [];
          let start = days[0], end = days[0];
          for (let i = 1; i < days.length; i++) {
            const prevIndex = order.indexOf(end);
            const currentIndex = order.indexOf(days[i]);
            if (currentIndex === prevIndex + 1) {
              end = days[i];
            } else {
              ranges.push(start === end ? start : `${start}-${end}`);
              start = end = days[i];
            }
          }
          ranges.push(start === end ? start : `${start}-${end}`);
          const [open, close] = timeRange.split("-");
          result.push(`${ranges.join(", ")} ${open} - ${close}`);
        }

        return result.join(", ");
      }

      function checkAndSearch() {
        const selectedCategory = categorySelect.value;
        const selectedType = typeSelect.value;

        if (selectedCategory !== "Elige Categoria" && selectedType !== "Elige Nivel") {
          const courseData = courses[selectedCategory]?.[selectedType];
          currentCourseData = courseData;
          courseSelect.innerHTML = '<option>Elige Curso</option>';
          

          if (courseData) {
            Object.values(courseData).forEach(course => {
              if (course && course.Tittle && course.Id) {
                
                const option = document.createElement("option");
                option.value = course.Id;
                option.textContent = course.Tittle;
                courseSelect.appendChild(option);
           
              }
            });
          }
        } else {
          courseSelect.innerHTML = '<option>Elige Curso</option>';
        }

        // Reset teacher info
        teacherNameSpan.innerHTML = "<strong>Nombre:</strong>";
        teacherEmailSpan.innerHTML = "<strong>Email:</strong>";
        teacherTimeSpan.innerHTML = "<strong>Horario de atención:</strong>";
        selectedCourseId = null;
      }

      // Get extra teacher data from Firebase
      async function getTeacherContent(TId) {
        try {
          const docRef = doc(db, "CorsoSkillsTeacher", TId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            return docSnap.data();
          } else {
            console.error("No se encontró el documento del profesor.");
            return null;
          }
        } catch (error) {
          console.error("Error obteniendo datos del profesor:", error);
          return null;
        }
      }

      // Clear previous event listeners
      function clearPreviousClickListeners(button) {
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        return newButton;
      }

      // On course change
      async function onCourseSelectChange() {
        const selectedId = courseSelect.value;
        selectedCourseId = selectedId;
        console.log("✔️ Selected Course ID:", selectedId);
        localStorage.setItem("courseIdsaved", selectedId);
        if (currentCourseData) {
          const course = Object.values(currentCourseData).find(c => c.Id === selectedId);

          if (course?.Teacher) {
            const { Name, Email, Time, TeacherId } = course.Teacher;

            teacherNameSpan.innerHTML = `<strong>Nombre:</strong> ${Name || "N/A"}`;
            teacherEmailSpan.innerHTML = `<strong>Email:</strong> ${Email || "N/A"}`;
            teacherTimeSpan.innerHTML = `<strong>Horario de atención:</strong> ${
              Time ? formatBusinessHours(Time) : "N/A"
            }`;

            const teacherData = await getTeacherContent(TeacherId);
            

            // ✅ Save teacherData to localStorage
            localStorage.setItem("selectedTeacherData", JSON.stringify(teacherData));
          }
        }
      }


      // Event listeners
      categorySelect?.addEventListener("change", checkAndSearch);
      typeSelect?.addEventListener("change", checkAndSearch);
      courseSelect?.addEventListener("change", onCourseSelectChange);

      // Optional: expose data access
      return {
        getSelectedCourseId: () => selectedCourseId
      };
    }

    RenderMainNavcontent()



  }
  

  // Run the fetch
  fetchAllContent()
  





async function addMessagesToDB() {
  const button = document.getElementById("teacher-message-btn");
  const textarea = document.getElementById("teacher-message");
  const messagesContainer = document.getElementById("messages-container");

  if (!button || !textarea) {
    console.error("❌ Botón o textarea no encontrado.");
    return;
  }

  button.addEventListener("click", async function () {
    const savedCId = localStorage.getItem("courseIdsaved"); // ✅ actualizado aquí
    const message = textarea.value.trim();

    if (!message || !savedCId || !UserUidInfo) {
      console.warn("⚠️ Mensaje, curso o usuario no disponible.");
      return;
    }

    console.log("📌 Guardando mensaje en curso:", savedCId);

    try {
      const colRef = collection(db, "CorsoSkillMessages");
      const snapshot = await getDocs(colRef);

      let targetDoc = null;

      // 🔍 Buscar documento con mismo curso y usuario
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        if (data[savedCId]?.[UserUidInfo]) {
          targetDoc = { id: docSnap.id, data };
        }
      });

      const newMessage = {
        message: message,
        timestamp: new Date()
      };

      if (targetDoc) {
        // ✅ Agregar mensaje a usuario existente
        const docRef = doc(db, "CorsoSkillMessages", targetDoc.id);
        const currentMessages =
          targetDoc.data[savedCId][UserUidInfo].STMessages || [];

        await updateDoc(docRef, {
          [`${savedCId}.${UserUidInfo}.STMessages`]: [...currentMessages, newMessage]
        });

        console.log("✅ Mensaje agregado a usuario existente:", targetDoc.id);
      } else {
        // ⚠️ Ver si ya existe un documento con solo el curso (pero sin este usuario)
        let courseOnlyDoc = null;

        snapshot.forEach(docSnap => {
          const data = docSnap.data();
          if (data[savedCId] && !data[savedCId][UserUidInfo]) {
            courseOnlyDoc = { id: docSnap.id };
          }
        });

        if (courseOnlyDoc) {
          // ➕ Agregar usuario nuevo bajo curso existente
          const docRef = doc(db, "CorsoSkillMessages", courseOnlyDoc.id);

          await updateDoc(docRef, {
            [`${savedCId}.${UserUidInfo}`]: {
              STMessages: [newMessage]
            }
          });

          console.log("➕ Usuario agregado al curso existente:", courseOnlyDoc.id);
          localStorage.setItem("MessagerId", courseOnlyDoc.id);
        } else {
          // 🆕 Crear documento nuevo con curso y usuario
          const newDocRef = await addDoc(colRef, {
            [savedCId]: {
              [UserUidInfo]: {
                STMessages: [newMessage]
              }
            }
          });

          console.log("🆕 Nuevo documento creado para curso:", savedCId);
        }
      }

      textarea.value = "";
      await loadMessages(); // recargar mensajes después de guardar
      location.reload();
    } catch (err) {
      console.error("❌ Error al guardar mensaje:", err);
    }
  });

  // 📥 Cargar mensajes al iniciar
  await loadMessages();

  async function loadMessages() {
    const savedCId = localStorage.getItem("courseIdsaved");
    if (!savedCId || !UserUidInfo || !messagesContainer) return;

    messagesContainer.innerHTML = "⌛ Cargando mensajes...";

    try {
      const snapshot = await getDocs(collection(db, "CorsoSkillMessages"));

      let messages = [];

      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        const docMessages = data?.[savedCId]?.[UserUidInfo]?.STMessages;
        if (Array.isArray(docMessages)) {
          messages = docMessages;
        }
      });

      if (!messages.length) {
        messagesContainer.innerHTML = "<p>Sin mensajes aún.</p>";
        return;
      }

      // Ordenar cronológicamente
      messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

      // Mostrar mensajes
      messagesContainer.innerHTML = messages
        .map(
          msg => `
            <div class="msg">
              <p>${msg.message}</p>
              <small>${new Date(msg.timestamp).toLocaleString()}</small>
            </div>
          `
        )
        .join("");
    } catch (err) {
      messagesContainer.innerHTML = "❌ Error al cargar mensajes.";
      console.error(err);
    }
  }
}
addMessagesToDB()
 const MessagerId = localStorage.getItem("MessagerId");
console.log(MessagerId)










async function getAllCorsoSkillMessages() {
  try {
    const querySnapshot = await getDocs(collection(db, "CorsoSkillMessages"));
    const messages = [];

    querySnapshot.forEach((doc) => {
      messages.push({
        id: doc.id,
        data: doc.data()
      });
    });

    //console.log("📩 CorsoSkillMessages:", messages);
    return messages;
  } catch (error) {
   // console.error("❌ Error fetching messages:", error);
    return [];
  }
}
getAllCorsoSkillMessages().then((data) => {
  const courseSelect = document.getElementById("Course-select");

  function renderUpcomingAnnouncements(announcementsObj, containerId) {
    const ul = document.createElement("ul");
    const now = Date.now(); // current time in milliseconds

    const announcementEntries = Object.values(announcementsObj)
      .map(announcement => {
        const timestampMs = announcement.Date.seconds * 1000;
        return {
          ...announcement,
          timestampMs
        };
      })
      .filter(announcement => announcement.timestampMs >= now) // Only future or today
      .sort((a, b) => a.timestampMs - b.timestampMs); // Closest date first

    if (announcementEntries.length === 0) {
      ul.innerHTML = "<li>No upcoming announcements.</li>";
    } else {
      announcementEntries.forEach(announcement => {
        const date = new Date(announcement.timestampMs);
        const formattedDate = date.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric"
        }); // e.g., "July 18"

        const li = document.createElement("li");
        li.textContent = `${formattedDate}: ${announcement.Tittle}`;
        ul.appendChild(li);
      });
    }

    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Clear previous content
    container.appendChild(ul);
  }




  courseSelect.addEventListener("change", function () {
    const selectedValue = courseSelect.value; // This is your courseId (e.g. "BB05")
    const courseId = selectedValue;
    const MessageData = data; // Array of message objects
    const StudentIdData = UserUidInfo; // Example: "O4fomNmpPVRsVEChnPWXBumw5qL2"

    console.log("🔍 Selected course:", courseId);
    console.log("🧍‍♂️ Student UID:", StudentIdData);
    console.log("🧾 Message Data Array:", MessageData);

    // Search for the object where courseId exists as a key
    for (const item of MessageData) {
      const messageObj = item.data;

      if (messageObj.hasOwnProperty(courseId)) {
        const courseData = messageObj[courseId];

        if (courseData.hasOwnProperty(StudentIdData)) {
          const studentMessages = courseData[StudentIdData];

          renderUpcomingAnnouncements(studentMessages.Announcements, "announcement-container");




          console.log("📥 Messages for selected course and student:", studentMessages);
        } else {
          console.warn("⚠️ No messages found for this student in selected course.");
        }

        return; // Found the course, no need to continue loop
      }
    }

    console.warn("⚠️ No data found for selected course.");
  });
});









  document.addEventListener("DOMContentLoaded", function () {
    const questions = document.querySelectorAll(".Faq-Q-tittle");

    questions.forEach((question) => {
      question.addEventListener("click", function () {
        const questionId = question.id;
        const index = questionId.split("-")[1]; // Get number from ID like Faq-1-questions
        const answer = document.getElementById(`Faq-${index}-answer`);

        if (answer) {
          answer.classList.toggle("show");
        }
      });
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


document.getElementById("Settings").addEventListener("click", function () {
  window.location.href = "index10.6.html";
}); 
document.getElementById("Logout").addEventListener("click", function () {
  window.location.href = "index4.html";
}); 