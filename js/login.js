const authForm = document.querySelector("#authForm")
const switchForm = document.querySelector("#switchForm")
const formTitle = document.querySelector("#form-title")
const authSwitch = document.querySelector("#authSwitch")
const authButton = document.querySelector("#authButton")

const username = document.querySelector("#username")
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const confirmPassword = document.querySelector("#confirmPassword")

let SignIn = true

document.body.addEventListener("click", (e) => {
    if (e.target.id !== "switchForm") return;
    switchAuthForm()

})

authForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const user = {
        username: SignIn ? undefined : username.value,
        email: email.value,
        password: password.value,
        confirmPassword: SignIn ? undefined : confirmPassword.value
    }

    if (SignIn) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const exestingUser = users.find((user) => user.email == email.value && user.password == password.value)    
        if(exestingUser){
            localStorage.setItem("onlineUser" , JSON.stringify(exestingUser))
            window.location.href = '../html/movies.html'
        }else{
            alert("Invalid Credentials")
            return
        }
    } 
    else {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const exestingUser = users.find((user) => user.username == username.value && user.email == email.value)
        if (exestingUser) {
            alert(`User ${exestingUser.username} Already exist`)
            return
        }
        if (confirmPassword.value !== password.value) {
            alert("password mismatch")
            return
        }
        users.push(user)
        localStorage.setItem("users", JSON.stringify(users))
        alert("registeretion successfully")

        switchAuthForm()
    }

})

function switchAuthForm() {
    SignIn = !SignIn
    if (!SignIn) {
        authButton.textContent = "Sign up";
        formTitle.textContent = "Sign up"
        username.style.display = "block"
        confirmPassword.style.display = "block"
        authSwitch.innerHTML = `
    Already have an account? <a href="#" id="switchForm">Sing in</a>
    `
    } else {
        authButton.textContent = "Sign In";
        formTitle.textContent = "Sign In"
        username.style.display = "none"
        confirmPassword.style.display = "none"
        username.value = ""
        confirmPassword.value = ""
        email.value = ""
        password.value = ""
        authSwitch.innerHTML = `
        New to DugFlix? <a href="#" id="switchForm">Register now</a>
        `
    }
}