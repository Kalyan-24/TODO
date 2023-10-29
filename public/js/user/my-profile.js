const firstname = document.getElementById('first_name')
const lastname = document.getElementById('last_name')

const form = document.querySelector('form')

const errorContainer = document.querySelector('.error_container')

const postUpdateProfile = async (e) => {

    e.preventDefault()

    try {
        const result = await fetch('/api/v1/update-profile',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/JSON'
                },
                body: JSON.stringify({
                    firstname: firstname.value,
                    lastname: lastname.value
                })
            }).then((res) => res.json())

        if (result.status === 'Success') {
            errorContainer.style.display = 'flex'
            errorContainer.children[0].innerHTML = 'Success'
            errorContainer.children[1].innerHTML = 'Profile Updated Successfully'
            errorContainer.classList.add('success')
            errorContainer.classList.remove('error')

            setTimeout(() => {
                errorContainer.style.display = 'none'
            }, 5000)
        }
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

form.addEventListener('submit', postUpdateProfile)
