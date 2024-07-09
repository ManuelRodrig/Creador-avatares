import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./firebase.js";
import { showMessage } from "./showMessage.js";

const signInForm = document.querySelector("#login-form");

signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = signInForm["login-email"].value;
  const password = signInForm["login-password"].value;

  try {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password);
    console.log(userCredentials);

    // Close the login modal
    const modal = bootstrap.Modal.getInstance(signInForm.closest('.modal'));
    modal.hide();

    // Reset the form
    signInForm.reset();

    // Show welcome message
    showMessage("Welcome " + userCredentials.user.email);

    // Hide signin and signup links
    const signinLinks = document.querySelectorAll('.logged-out');
    signinLinks.forEach(link => link.style.display = 'none');

    // Show logout link
    const logoutLink = document.querySelector('.logged-in');
    logoutLink.style.display = 'inline';

    // Redirect to another page
    window.location.href = "./app/Proyecto/genero.html";

  } catch (error) {
    if (error.code === 'auth/wrong-password') {
      showMessage("Wrong password", "error");
    } else if (error.code === 'auth/user-not-found') {
      showMessage("User not found", "error");
    } else {
      showMessage("Something went wrong", "error");
    }
  }
});
