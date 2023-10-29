const oldPasswordInput = document.getElementById('old_password_input')
const newPasswordInput = document.getElementById('new_password_input')
const confirmNewPasswordInput = document.getElementById('confirm_new_password_input')

const oldPasswordEye = document.getElementById('old_password_eye')
const newPasswordEye = document.getElementById('new_password_eye')
const confirmNewPasswordEye = document.getElementById('confirm_new_password_eye')

const form = document.querySelector('form')

const errorContainer = document.querySelector('.error_container')

oldPasswordEye.onclick = () => {

    const oldPasswordEyeIcon = oldPasswordEye.src.split('/')[oldPasswordEye.src.split('/').length - 1].split('_')[2]

    if (oldPasswordEyeIcon === 'open') {
        oldPasswordInput.type = 'text'
        oldPasswordEye.src = './assets/password_eye_close_icon.svg'
    }
    else if (oldPasswordEyeIcon === 'close') {
        oldPasswordInput.type = 'password'
        oldPasswordEye.src = './assets/password_eye_open_icon.svg'
    }
}

newPasswordEye.onclick = () => {

    const newPasswordEyeIcon = newPasswordEye.src.split('/')[newPasswordEye.src.split('/').length - 1].split('_')[2]

    if (newPasswordEyeIcon === 'open') {
        newPasswordInput.type = 'text'
        newPasswordEye.src = './assets/password_eye_close_icon.svg'
    }
    else if (newPasswordEyeIcon === 'close') {
        newPasswordInput.type = 'password'
        newPasswordEye.src = './assets/password_eye_open_icon.svg'
    }
}

confirmNewPasswordEye.onclick = () => {

    const confirmNewPasswordEyeIcon = confirmNewPasswordEye.src.split('/')[confirmNewPasswordEye.src.split('/').length - 1].split('_')[2]

    if (confirmNewPasswordEyeIcon === 'open') {
        confirmNewPasswordInput.type = 'text'
        confirmNewPasswordEye.src = './assets/password_eye_close_icon.svg'
    }
    else if (confirmNewPasswordEyeIcon === 'close') {
        confirmNewPasswordInput.type = 'password'
        confirmNewPasswordEye.src = './assets/password_eye_open_icon.svg'
    }
}

const checkPasswordValidity = (password) => {
    if (password.length >= 8) {
        if (/^(?=.*[A-Z]).*$/.test(password)) {
            if (/^(?=.*[a-z]).*$/.test(password)) {
                if (/^(?=.*[0-9]).*$/.test(password)) {
                    if (/^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/.test(password)) {
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
    if (password === confirm_password) {
        return ''
    }
    return 'Both Passwords must be same'
}

newPasswordInput.addEventListener('input', () => {
    newPasswordInput.setCustomValidity(checkPasswordValidity(newPasswordInput.value))
})

confirmNewPasswordInput.addEventListener('input', () => {
    confirmNewPasswordInput.setCustomValidity(checkConfirmPasswordValidity(newPasswordInput.value, confirmNewPasswordInput.value))
})

const postChangePassword = async (e) => {

    e.preventDefault()

    try {
        const result = await fetch('/api/v1/change-password',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/JSON'
                },
                body: JSON.stringify({
                    oldpassword: oldPasswordInput.value,
                    newpassword: newPasswordInput.value
                })
            }).then((res) => res.json())

        if (result.status === 'Success') {
            errorContainer.style.display = 'flex'
            errorContainer.children[0].innerHTML = result.status
            errorContainer.children[1].innerHTML = result.message
            errorContainer.classList.add('success')
            errorContainer.classList.remove('error')

        }
        else if (result.status === 'Error') {
            errorContainer.style.display = 'flex'
            errorContainer.children[0].innerHTML = result.status
            errorContainer.children[1].innerHTML = result.message
            errorContainer.classList.add('error')
            errorContainer.classList.remove('success')
        }
        
        oldPasswordInput.value = ''
        newPasswordInput.value = ''
        confirmNewPasswordInput.value = ''
        
        setTimeout(() => {
            errorContainer.style.display = 'none'
        }, 5000)
    }

    catch (e) {

        errorContainer.style.display = 'flex'
        errorContainer.children[0].innerHTML = 'Error'
        errorContainer.children[1].innerHTML = 'Oops! Something went Wrong'
        errorContainer.classList.add('error')
        errorContainer.classList.remove('success')

        setTimeout(() => {
            errorContainer.style.display = 'none'
        }, 5000)

        window.history.replaceState('', '', '/login')
        location.reload()
    }
}

form.addEventListener('submit', postChangePassword)