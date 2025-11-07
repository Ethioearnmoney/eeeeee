import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebase Config (same as yours)
const firebaseConfig = {
  apiKey: "AIzaSyBQ-E4YrEChSdnpAfVpTjRWPsI_eM8d_VY",
  authDomain: "ethioearn.firebaseapp.com",
  projectId: "ethioearn",
  storageBucket: "ethioearn.firebasestorage.app",
  messagingSenderId: "780752809959",
  appId: "1:780752809959:web:cb98a0547ef46148fcd742",
  measurementId: "G-CVHL849LRK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadUsers() {
  const querySnapshot = await getDocs(collection(db, "users"));
  const tbody = document.querySelector("#userTable tbody");
  tbody.innerHTML = "";

  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${data.name}</td>
      <td>${data.phone}</td>
      <td>${data.password}</td>
      <td>${data.code}</td>
      <td>${data.status}</td>
      <td>
        <button onclick="updateUser('${docSnap.id}','verified')">✅</button>
        <button onclick="updateUser('${docSnap.id}','rejected')">❌</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

window.updateUser = async (id, status) => {
  const ref = doc(db, "users", id);
  await updateDoc(ref, { status });
  loadUsers();
};

loadUsers();
