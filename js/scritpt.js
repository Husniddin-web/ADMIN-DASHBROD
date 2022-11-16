//==   REQUEST  TO SERVER ====///
let URL = "https://n36-todolist.herokuapp.com"
let authToken = localStorage.getItem('token');
function getData() {
    fetch(`${URL}/todos`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'token': authToken
        },
    })
        .then((data) => data.json())
        .then((re) => render(re))
        .catch((err) => render(err))
}
getData();



//=====  GET USER LIST ======////

function render(data = []) {
    let iter = 1
    data.length > 0 ? data.forEach(e => {
        const div = createElement('tr', 'tr', `
        <td>${iter++}</td>
        <td>${e.body}</td>
        <td>salohiddinovhusniddin@gmial.com</td>
        <td>${e.id}</td>
        <td><button class="btn btn-warning py-0 text-light " data-ed="${e.id}">Edit</button></td>
        <td><button  class="btn btn-danger py-0 text-light"   data-del="${e.id}">Delete</button></td>
        `)
        $('.body').appendChild(div);
    }) : $('.body').textContent = 'USER EMPTY'
}


//=====  GET USER LIST ======////





//====== ADD USER ====//
function addUser() {
    const userName = $('#name').value.trim();
    const userEmail = $('#email').value.trim();
    if (userName.length === 0 || userEmail.length === 0) {
        slide('Malumot Yetarli Emas', 'crimson');
        setTimeout(() => {
            $('.toastify').classList.add('slide');
        }, 2000)
    } else {
        slide('Muvoffaqaytli qoshildi', 'lime');
        setTimeout(() => {
            $('.toastify').classList.add = "slide";
        }, 2000)
        setTimeout(() => {
            fetch(`${URL}/todos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'token': authToken
                },
                body: JSON.stringify(
                    {
                        text: userName,
                    }
                )
            })
        }, 1500)
        setTimeout(() => {
            window.location.reload()
        }, 2000)

    }

}
$('.form-submit').addEventListener('submit', () => {
    addUser();
})
function slide(text, color) {
    $('.toastify').classList.remove('slide');
    $('.text').textContent = text
    $('.toastify').style.background = color
}
//====== ADD USER ====//




//====== DELTE USER  ==////
$('tbody').addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-danger')) {
        let id = e.target.getAttribute('data-del')
        console.log(id);
        delUser(id);
    }
})
//====== DELTE USER  ==////

//== function delete user ==///
function delUser(id) {
    slide('Muvoffaqaytli ochirldi', 'lime');
    setTimeout(() => {
        $('.toastify').classList.add('slide');
    }, 2000)
    setTimeout(() => {
        fetch(`${URL}/todos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'token': authToken
            },
            body: JSON.stringify({})
        })
    }, 1000);
    setTimeout(() => {
        window.location.reload()
    }, 1500)
}

//== function delete user ==///

//====== EDIT USER===///
$('tbody').addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-warning')) {
        $('.wrapper').classList.remove('none')
        let id = e.target.getAttribute('data-ed');
        localStorage.setItem('editId', id);
        fetch(`${URL}/todos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'token': authToken
            }
        })
            .then((data) => data.json())
            .then((re) => setValue(re))
            .catch((err) => render(err))
    }
})
function setValue(data = []) {
    $('#userEdit').value = data.body
    $('#userScore').value = data.id
}

function updateUser() {
    const userName = $('#userEdit').value.trim();
    const userScore = $('#userScore').value.trim();
    const userEmail = $('#userEmail').value.trim();
    if (userName.length === 0 || userEmail.length === 0) {
        slide('Malumot Yetarli Emas', 'crimson');
        setTimeout(() => {
            $('.toastify').classList.add('slide');
        }, 2000)
    } else {
        slide('Foydalanuvchi yangilandi', 'lime');
        setTimeout(() => {
            $('.toastify').classList.add('slide');
        }, 2000)
        setTimeout(() => {
            let id = localStorage.getItem('editId')
            fetch(`${URL}/todos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'token': authToken
                },
                body: JSON.stringify({
                    body: userName,
                })
            })
        }, 1500)
        setTimeout(()=>{
            window.location.reload()
        },2000)
    }

}

$('.form-edit').addEventListener('submit', () => {
    updateUser();
})





//==== MODAL =====///
$('.cancel').addEventListener('click', (e) => {
    $('.wrapper').classList.add('none')
})






function userName() {
    let user = localStorage.getItem('userName')
    if (user) {
        $('#userId').textContent = user
    } else {
        setTimeout(() => {
            window.location.replace('./login.html')
        }, 2000)
    }
}
userName();



$('#out').addEventListener('click', () => {
    localStorage.clear();
    userName();
})


