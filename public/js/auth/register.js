const userNameInput = document.getElementById('user_name_input')
const emailInput = document.getElementById('email_input')
const passwordInput = document.getElementById('password_input')
const confirmPasswordInput = document.getElementById('confirm_password_input')

const userNameLabel = document.getElementById('user_name_label')
const emailLabel = document.getElementById('email_label')
const passwordLabel = document.getElementById('password_label')
const confirmPasswordLabel = document.getElementById('confirm_password_label')

const passwordEye = document.getElementById('password_eye')
const confirmPasswordEye = document.getElementById('confirm_password_eye')

const usernameAvailability = document.getElementById('username_availability')
const emailAvailability = document.getElementById('email_availability')

const registerForm = document.querySelector('form')

const loginRoute = document.getElementById('login_route')

const registerBtn = document.getElementById('register_btn')

passwordEye.onclick = () => {

    const passwordEyeIcon = passwordEye.src.split('/')[passwordEye.src.split('/').length - 1].split('_')[2]

    if (passwordEyeIcon === 'open') {
        passwordInput.type = 'text'
        passwordEye.src = './assets/password_eye_close_icon.svg'
    }
    else if (passwordEyeIcon === 'close') {
        passwordInput.type = 'password'
        passwordEye.src = './assets/password_eye_open_icon.svg'
    }
}

confirmPasswordEye.onclick = () => {
    const confirmPasswordEyeIcon = confirmPasswordEye.src.split('/')[confirmPasswordEye.src.split('/').length - 1].split('_')[2]

    if (confirmPasswordEyeIcon === 'open') {
        confirmPasswordInput.type = 'text'
        confirmPasswordEye.src = './assets/password_eye_close_icon.svg'
    }
    else if (confirmPasswordEyeIcon === 'close') {
        confirmPasswordInput.type = 'password'
        confirmPasswordEye.src = './assets/password_eye_open_icon.svg'
    }
}

const checkPasswordValidity = (password) => {
    if(password.length >= 8){
        if(/^(?=.*[A-Z]).*$/.test(password)){
            if(/^(?=.*[a-z]).*$/.test(password)){
                if(/^(?=.*[0-9]).*$/.test(password)){
                    if(/^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/.test(password)){
                        return ''
                    }
                    return 'Password must contain a Special Character'
                }
                return 'Password must contain a number'
            }
            return 'Password must contain a Small letter'
        }
        return 'Password must contain a Capital letter'
    }
    return 'Password must be atleast 8 Characters'
}

const checkConfirmPasswordValidity = (password, confirm_password) => {
    if(password === confirm_password){
        return ''
    }
    return 'Both Passwords must be same'
}

passwordInput.addEventListener('input', () => {
    passwordInput.setCustomValidity(checkPasswordValidity(passwordInput.value))
})

confirmPasswordInput.addEventListener('input', () => {
    confirmPasswordInput.setCustomValidity(checkConfirmPasswordValidity(passwordInput.value, confirmPasswordInput.value))
})

userNameInput.oninput = async () => {
    if (userNameInput.value.length > 0) {
        if (!userNameInput.value.includes(' ')) {
            const result = await fetch('/api/v1/check-username-availability',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'Application/JSON'
                    },
                    body: JSON.stringify({
                        username: userNameInput.value.toLowerCase()
                    })
                }).then((res) => res.json())

            if (result.status === 'Success') {
                usernameAvailability.style.visibility = 'visible'
                usernameAvailability.style.backgroundColor = '#0F0'
                usernameAvailability.style.color = '#000'
                usernameAvailability.innerHTML = `*${result.message}`
                emailInput.disabled = false
                emailInput.style.backgroundColor = 'white'
                emailLabel.style.backgroundColor = 'white'
            }
            else if (result.status === 'Error') {
                usernameAvailability.style.visibility = 'visible'
                usernameAvailability.style.backgroundColor = '#F00'
                usernameAvailability.style.color = '#FFF'
                usernameAvailability.innerHTML = `*${result.message}`
                emailInput.disabled = true
                emailInput.style.backgroundColor = '#999'
                emailLabel.style.backgroundColor = '#999'
            }
        }
        else {
            usernameAvailability.style.visibility = 'visible'
            usernameAvailability.style.backgroundColor = '#F00'
            usernameAvailability.style.color = '#FFF'
            usernameAvailability.innerHTML = `*Username must not contain spaces`
            emailInput.disabled = true
            emailInput.style.backgroundColor = '#999'
            emailLabel.style.backgroundColor = '#999'
        }
    }
    else {
        usernameAvailability.style.visibility = 'hidden'
        emailInput.disabled = true
        emailInput.style.backgroundColor = '#999'
        emailLabel.style.backgroundColor = '#999'
    }
}

emailInput.oninput = async () => {
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailInput.value.toLowerCase())) {
        const result = await fetch('/api/v1/check-email-availability',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/JSON'
                },
                body: JSON.stringify({
                    email: emailInput.value.toLowerCase()
                })
            }).then((res) => res.json())

        if (result.status === 'Success') {
            emailAvailability.style.visibility = 'visible'
            emailAvailability.style.backgroundColor = '#0F0'
            emailAvailability.style.color = '#000'
            emailAvailability.innerHTML = `*${result.message}`
            passwordInput.disabled = false
            passwordInput.style.backgroundColor = 'white'
            passwordLabel.style.backgroundColor = 'white'
            confirmPasswordInput.disabled = false
            confirmPasswordInput.style.backgroundColor = 'white'
            confirmPasswordLabel.style.backgroundColor = 'white'
            registerBtn.disabled = false

        }
        else if (result.status === 'Error') {
            emailAvailability.style.visibility = 'visible'
            emailAvailability.style.backgroundColor = '#F00'
            emailAvailability.style.color = '#FFF'
            emailAvailability.innerHTML = `*${result.message}`
            passwordInput.disabled = true
            passwordInput.style.backgroundColor = '#999'
            passwordLabel.style.backgroundColor = '#999'
            confirmPasswordInput.disabled = true
            confirmPasswordInput.style.backgroundColor = '#999'
            confirmPasswordLabel.style.backgroundColor = '#999'
            registerBtn.disabled = true
        }
    }
    else if (emailInput.value.length > 0) {
        emailAvailability.style.visibility = 'visible'
        emailAvailability.style.backgroundColor = '#F00'
        emailAvailability.style.color = '#FFF'
        emailAvailability.innerHTML = `*Invalid Email`
        passwordInput.disabled = true
        passwordInput.style.backgroundColor = '#999'
        passwordLabel.style.backgroundColor = '#999'
        confirmPasswordInput.disabled = true
        confirmPasswordInput.style.backgroundColor = '#999'
        confirmPasswordLabel.style.backgroundColor = '#999'
        registerBtn.disabled = true
    }
    else {
        emailAvailability.style.visibility = 'hidden'
        passwordInput.disabled = true
        passwordInput.style.backgroundColor = '#999'
        passwordLabel.style.backgroundColor = '#999'
        confirmPasswordInput.disabled = true
        confirmPasswordInput.style.backgroundColor = '#999'
        confirmPasswordLabel.style.backgroundColor = '#999'
        registerBtn.disabled = true
    }
}

loginRoute.onclick = (event) => {
    event.preventDefault()

    window.history.replaceState('', '', '/login')
    location.reload()
}