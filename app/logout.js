import { signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./firebase.js";
import { showMessage } from "./showMessage.js";

const signInForm = document.querySelector("#login-form");
const logoutButton = document.querySelector("#logout");

// Función para actualizar la visibilidad de los enlaces de sesión
function updateUIAfterLogin() {
  const loggedInLinks = document.querySelectorAll('.logged-in');
  const loggedOutLinks = document.querySelectorAll('.logged-out');
  
  loggedInLinks.forEach(link => link.style.display = 'inline');
  loggedOutLinks.forEach(link => link.style.display = 'none');
}

// Función para actualizar la visibilidad de los enlaces de cierre de sesión
function updateUIAfterLogout() {
  const loggedInLinks = document.querySelectorAll('.logged-in');
  const loggedOutLinks = document.querySelectorAll('.logged-out');
  
  loggedInLinks.forEach(link => link.style.display = 'none');
  loggedOutLinks.forEach(link => link.style.display = 'inline');
}

logoutButton.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    await signOut(auth);
    console.log("Signed out");

    // Update UI after logout
    updateUIAfterLogout();

    // Optionally, redirect to a different page after logout
    window.location.href = "/src/index.html";

  } catch (error) {
    console.log(error);
  }
});

// Initial UI setup based on auth state
auth.onAuthStateChanged(user => {
  if (user) {
    updateUIAfterLogin();
  } else {
    updateUIAfterLogout();
  }
});
