const passwordInput = document.getElementById('password_input')
const passwordEye = document.getElementById('password_eye')

const loginForm = document.querySelector('form')

const registerRoute = document.getElementById('register_route')


passwordEye.onclick = () => {

    const passwordEyeIcon = passwordEye.src.split('/')[passwordEye.src.split('/').length - 1].split('_')[2]

    if(passwordEyeIcon === 'open'){
        passwordInput.type = 'text'
        passwordEye.src = './assets/password_eye_close_icon.svg'
    }
    else if(passwordEyeIcon === 'close'){
        passwordInput.type = 'password'
        passwordEye.src = './assets/password_eye_open_icon.svg'
    }
}

registerRoute.onclick = (event) => {
    event.preventDefault()
    
    window.history.replaceState('', '', '/register')
    location.reload()
}