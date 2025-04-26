const authForm = document.querySelector("#authForm");
const switchForm = document.querySelector("#switchForm");
const formTitle = document.querySelector("#form-title");
const authSwitch = document.querySelector("#authSwitch");
const authButton = document.querySelector("#authButton");

const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");

let isSignIn = true;

document.body.addEventListener("click", (e) => {
    if (e.target.id === "switchForm") {
        e.preventDefault();
        switchAuthForm();
    }
});

authForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (isSignIn) {
        // Sign In
        const existingUser = users.find(
            (u) => u.email === email.value && u.password === password.value
        );
        if (existingUser) {
            localStorage.setItem("onlineUser", JSON.stringify(existingUser));
            window.location.href = "../index.html";
        } else {
            alert("Invalid Credentials");
        }
    } else {
        // Sign Up
        if (!username.value || !email.value || !password.value || !confirmPassword.value) {
            alert("Please fill in all fields");
            return;
        }

        const existingUser = users.find(
            (u) => u.username === username.value || u.email === email.value
        );
        if (existingUser) {
            alert(`User ${existingUser.username} already exists`);
            return;
        }

        if (password.value !== confirmPassword.value) {
            alert("Passwords do not match");
            return;
        }

        const newUser = {
            username: username.value,
            email: email.value,
            password: password.value
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("onlineUser", JSON.stringify(newUser));
        alert("Registration successful!");
        window.location.href = "../index.html";
    }
});

function switchAuthForm() {
    isSignIn = !isSignIn; // Toggle

    if (!isSignIn) {
        formTitle.textContent = "Sign Up";
        authButton.textContent = "Sign Up";
        username.style.display = "block";
        confirmPassword.style.display = "block";
        authSwitch.innerHTML = `
            Already have an account? <a href="#" id="switchForm">Sign In</a>
        `;
    } else {
        formTitle.textContent = "Sign In";
        authButton.textContent = "Sign In";
        username.style.display = "none";
        confirmPassword.style.display = "none";
        authSwitch.innerHTML = `
            Don't Have An Account? <a href="#" id="switchForm">Register now</a>
        `;
    }

    // Clear all input fields every time you switch
    username.value = "";
    email.value = "";
    password.value = "";
    confirmPassword.value = "";
}