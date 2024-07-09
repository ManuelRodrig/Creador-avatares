import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"
import { auth, db } from "./app/firebase.js";
import { loginCheck } from "./app/loginCheck.js";
import { setupPosts } from "./app/postList.js";

import './app/signupForm.js'
import './app/signinForm.js'
import './app/googleLogin.js'
import './app/facebookLogin.js'
import './app/githubLogin.js'
import './app/logout.js'
import './app/postList.js'

// list for auth state changes
onAuthStateChanged(auth, async (user) => {
  if (user) {
    loginCheck(user);
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      setupPosts(querySnapshot.docs);
    } catch (error) {
      console.log(error)
    }
  } else {
    setupPosts([]);
    loginCheck(user);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const logoutLink = document.getElementById('logout');
  const signinLinks = document.querySelectorAll('.logged-out');
  const loggedInSection = document.querySelector('.logged-in');

  // Verificar si el usuario está autenticado o no
  const userIsLoggedIn = false; // Aquí deberías implementar tu lógica de autenticación

  if (userIsLoggedIn) {
    // Mostrar sección de logged-in y ocultar links de signin
    loggedInSection.style.display = 'block';
    signinLinks.forEach(link => link.style.display = 'none');
    logoutLink.style.display = 'inline'; // Mostrar link de logout
  } else {
    // Mostrar links de signin y ocultar logged-in y logout
    loggedInSection.style.display = 'none';
    signinLinks.forEach(link => link.style.display = 'inline');
    logoutLink.style.display = 'none'; // Ocultar link de logout
  }
});


