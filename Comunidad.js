import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
  import {
    getFirestore,
    doc,
    getDoc
  } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
  import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signOut
  } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
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

  const TBuInfo = "CorsoSkills";

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
   console.log(data)
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
    function setBodyBackgroundColor(backgroundColor, textColor) {
      document.body.style.backgroundColor = backgroundColor;
      document.body.style.color = textColor;
    }
    function setBackgroundColor(elementId, backgroundColor) {
      const element = document.getElementById(elementId);
      if (element) {
        element.style.backgroundColor = backgroundColor;
      } else {
        console.error(`Element with ID '${elementId}' not found.`);
      }
    }
    function setBorderBottom(elementId, borderStyle) {
      const element = document.getElementById(elementId);
      if (element) {
        element.style.borderBottom = borderStyle;
      } else {
        console.error(`Element with ID '${elementId}' not found.`);
      }
    }
    function setBorder(elementId, borderStyle) {
      const element = document.getElementById(elementId);
      if (element) {
        element.style.border = borderStyle;
      } else {
        console.error(`Element with ID '${elementId}' not found.`);
      }
    }
    function setTextColors(elementId, Tcolor){
      const element = document.getElementById(elementId);
      if (element) {
        element.style.color = Tcolor;
      } else {
        console.error(`Element with ID '${elementId}' not found.`);
      }
    }
    function setBackgroundColorWithTransparency(elementId, colorName, alpha) {
      const element = document.getElementById(elementId);
      if (!element) {
        console.error(`Element with ID '${elementId}' not found.`);
        return;
      }
    
      // Create temporary element to compute RGB value
      const temp = document.createElement('div');
      temp.style.color = colorName;
      document.body.appendChild(temp);
    
      // Get computed RGB color
      const computedColor = window.getComputedStyle(temp).color;
      document.body.removeChild(temp);
    
      // Extract RGB values from string like "rgb(255, 0, 0)"
      const rgbMatch = computedColor.match(/\d+/g);
      if (rgbMatch && rgbMatch.length === 3) {
        const [r, g, b] = rgbMatch;
        element.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      } else {
        console.error(`Could not parse color: ${computedColor}`);
      }
    }
    
    function renderLoginColors(){
      renderImage(data.BuLogos.Simple[1], "Bu logo" ,"Bulogo");
      setBodyBackgroundColor(Base, Prime5)

  

    }
    function renderNavcolors(){
        setBackgroundColor("nav-block", Prime4)
        setTextColors("nav-links", Base)
    }
  
  
  
  
  
  
    
   renderLoginColors()
   renderNavcolors()
  });
