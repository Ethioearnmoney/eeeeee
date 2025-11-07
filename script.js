// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBQ-E4YrEChSdnpAfVpTjRWPsI_eM8d_VY",
  authDomain: "ethioearn.firebaseapp.com",
  projectId: "ethioearn",
  storageBucket: "ethioearn.firebasestorage.app",
  messagingSenderId: "780752809959",
  appId: "1:780752809959:web:cb98a0547ef46148fcd742",
  measurementId: "G-CVHL849LRK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- Registration Logic ---
const registerBtn = document.getElementById("registerBtn");
if (registerBtn) {
  registerBtn.onclick = async () => {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value.trim();
    const statusText = document.getElementById("status");

    if (!name || !phone || !password) {
      statusText.innerText = "Please fill all fields!";
      return;
    }

    if (!phone.startsWith("+251")) {
      statusText.innerText = "Phone number must start with +251.";
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000);

    try {
      await addDoc(collection(db, "users"), {
        name,
        phone,
        password,
        code,
        status: "pending"
      });

      localStorage.setItem("phone", phone);
      statusText.innerText = "Registered! Redirecting...";
      setTimeout(() => (location.href = "verify.html"), 1500);
    } catch (err) {
      statusText.innerText = "Error: " + err.message;
    }
  };
}

// --- Verification Page ---
const verifyBtn = document.getElementById("verifyBtn");
if (verifyBtn) {
  verifyBtn.onclick = () => {
    document.getElementById("verifyStatus").innerText =
      "Your account is pending admin approval.";
  };
}
