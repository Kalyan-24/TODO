const menu = document.getElementById('hamburger_menu')
const userServices = document.getElementById('user_services')

const noTodoFoundContainer = document.getElementById('noTodoFoundContainer')
const todoContainer = document.getElementById('todoContainer')


const addNewTODO = document.getElementById('addNewTODO')
const newTODOContainer = document.getElementById('newTODOContainer')

const todoTitleInput = document.getElementById('TODOTitleInput')
const todoDescriptionInput = document.getElementById('TODODescriptionInput')

const newTODOCancelBtn = document.getElementById('newTODOCancelBtn')
const newTODOAddBtn = document.getElementById('newTODOAddBtn')


const getSavedTodos = async () => {
    const result = await fetch('/api/v1/my-saved-todos',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/JSON'
            },
        }).then((res) => res.json())

    return result
}

const displaySavedTodos = async () => {
    const result = await getSavedTodos()

    const data = result.data

    if (data.length !== 0) {
        noTodoFoundContainer.style.display = 'none'
        todoContainer.style.display = 'flex'

        todoContainer.innerHTML = ''
        data.forEach((e, ind) => {
            let isCompleted = ''

            if (e.isCompleted) {
                isCompleted = 'checked'
            }

            todoContainer.innerHTML +=
                `
                <form class="todo">
                    <div>
                        <h4 class="todoTitle">${e.title}</h4>
                        <p class="todoDescription">${e.description}</p>
                    </div>
            
                    <div class="todoButtons">
                        <label class="checkboxContainer">
                            <input type="checkbox" ${isCompleted} id="completeTodo-${ind}">
                            <span class="mark"></span>
                        </label>

                        <input type="button" value="Delete" class="todoDeleteBtn" id="deleteTodo-${ind}">
                    </div>
                </form>
            `
        });
    }
    else {
        noTodoFoundContainer.style.display = 'flex'
        todoContainer.style.display = 'none'
    }

    const completeTodoCheckBoxes = document.querySelectorAll('.todo .todoButtons .checkboxContainer input[type="checkbox"]')

    completeTodoCheckBoxes.forEach((ele, i) => {
        ele.onchange = async () => {
            const result = await fetch(`/api/v1/${data[i]._id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'Application/JSON'
                    },
                }).then((res) => res.json())

            displaySavedTodos()

            const successContainer = document.createElement('div')
            successContainer.classList.add('success_container')
            successContainer.innerHTML =
                `
                    <span id="status">
                        Success
                    </span>
                    <span>
                        TODO Updated!
                    </span>
                    <div class="timer"></div>
                `
            document.body.appendChild(successContainer)

            setTimeout(() => {
                document.body.removeChild(successContainer)
            }, 5000)
        }
    });

    const deleteTodoBtns = document.querySelectorAll('.todo .todoButtons .todoDeleteBtn')

    deleteTodoBtns.forEach((ele, i) => {
        ele.onclick = async () => {
            const result = await fetch(`/api/v1/${data[i]._id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'Application/JSON'
                    },
                }).then((res) => res.json())

            displaySavedTodos()

            const successContainer = document.createElement('div')
            successContainer.classList.add('success_container')
            successContainer.innerHTML =
                `
                    <span id="status">
                        Success
                    </span>
                    <span>
                        TODO Deleted!
                    </span>
                    <div class="timer"></div>
                `
            document.body.appendChild(successContainer)

            setTimeout(() => {
                document.body.removeChild(successContainer)
            }, 5000)
        }
    });

}

displaySavedTodos()

menu.onclick = () => {
    const menu1 = menu.children[0]
    const menu2 = menu.children[1]
    const menu3 = menu.children[2]

    if (menu2.style.display === 'flex') {
        menu2.style.display = 'none'
        menu1.style.transform = 'rotate(45deg) translateX(25%) translateY(50%)'
        menu3.style.transform = 'rotate(-45deg) translateX(25%) translateY(-50%)'

        userServices.style.right = '0%'
    }
    else if (menu2.style.display === 'none') {
        menu2.style.display = 'flex'
        menu1.style.transform = 'rotate(0deg) translateX(0%) translateY(0%)'
        menu3.style.transform = 'rotate(-0deg) translateX(0%) translateY(-0%)'

        userServices.style.right = '-100%'
    }
}


addNewTODO.onclick = () => {
    addNewTODO.style.display = 'none'
    newTODOContainer.style.display = 'block'
}

newTODOCancelBtn.onclick = () => {
    addNewTODO.style.display = 'grid'
    newTODOContainer.style.display = 'none'
}

newTODOAddBtn.onclick = async (e) => {
    e.preventDefault()
    if(todoTitleInput.value === ''){
        const errorContainer = document.createElement('div')
        errorContainer.classList.add('success_container')
        errorContainer.style.backgroundColor = '#F00'
        errorContainer.innerHTML =
            `
                <span id="status">
                    Error
                </span>
                <span>
                    Please fill out <b style="font-weight: 900">Title</b> field!
                </span>
                <div class="timer" style="background-color: rgb(255, 99, 99);"></div>
            `
        document.body.appendChild(errorContainer)

        setTimeout(() => {
            document.body.removeChild(errorContainer)
        }, 5000)
    }
    else if(todoDescriptionInput.value === ''){
        const errorContainer = document.createElement('div')
        errorContainer.classList.add('success_container')
        errorContainer.style.backgroundColor = '#F00'
        errorContainer.innerHTML =
            `
                <span id="status">
                    Error
                </span>
                <span>
                    Please fill out <b style="font-weight: 900">Description</b> field!
                </span>
                <div class="timer" style="background-color: rgb(255, 99, 99);"></div>
            `
        document.body.appendChild(errorContainer)

        setTimeout(() => {
            document.body.removeChild(errorContainer)
        }, 5000)
    }
    else if (todoTitleInput.value !== '' && todoDescriptionInput.value !== '') {
        const result = await fetch('/api/v1/add-new-todo',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/JSON'
                },
                body: JSON.stringify({
                    TODOTitle: todoTitleInput.value,
                    TODODescription: todoDescriptionInput.value,
                })
            }).then((res) => res.json())

        displaySavedTodos()

        const successContainer = document.createElement('div')
        successContainer.classList.add('success_container')
        successContainer.innerHTML =
            `
                <span id="status">
                    Success
                </span>
                <span>
                    TODO created Successfully!
                </span>
                <div class="timer"></div>
            `
        document.body.appendChild(successContainer)

        setTimeout(() => {
            document.body.removeChild(successContainer)
        }, 5000)

        todoTitleInput.value = ''
        todoDescriptionInput.value = ''

        newTODOContainer.style.display = 'none'
        addNewTODO.style.display = 'grid'
    }
}
