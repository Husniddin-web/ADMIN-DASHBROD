//==   REQUEST  TO SERVER ====///
let baseUrl = `http://localhost:3000/user`
function getData(rsource) {
    ``
    fetch(baseUrl)
        .then((data) => data.json())
        .then((re) => render(re))
        .catch((err) => render(err))
}
getData(baseUrl);



//=====  GET USER LIST ======////
function render(data = []) {
    let iter = 1
    data.length > 0 ? data.forEach(e => {
        const div = createElement('tr', 'tr', `
        <td>${iter++}</td>
        <td>${e.title}</td>
        <td>${e.email}</td>
        <td>${e.score}</td>
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
    const userScore = $('#number').value.trim();
    const userEmail = $('#email').value.trim();
    if (userName.length === 0 || userEmail.length === 0) {
        slide('Malumot Yetarli Emas', 'crimson');
        setTimeout(() => {
            $('.toastify').classList.add('slide');
        }, 2000)
    } else {
        slide('Muvoffaqaytli qoshildi', 'lime');
        setTimeout(() => {
            $('.toastify').classList.add="slide";
        }, 2000)
        setTimeout(() => {
            fetch(baseUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: userName, email: userEmail, score: userScore })
            })
        }, 1500)

    }

}
$('.form-submit').addEventListener('submit', () => {
    addUser();
})
function slide(text, color, icon) {
    $('.toastify').classList.remove('slide');
    $('.text').textContent = text
    $('.toastify').style.background = color
}
//====== ADD USER ====//




//====== DELTE USER  ==////
$('tbody').addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-danger')) {
        console.log(e.target);
        let id = e.target.getAttribute('data-del')
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
        fetch(`http://localhost:3000/user/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({})
        })
    }, 1000);
}

//== function delete user ==///

//====== EDIT USER===///
$('tbody').addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-warning')) {
        $('.wrapper').classList.remove('none')
        let id = e.target.getAttribute('data-ed');
        console.log(id);
        localStorage.setItem('editId',id);
        fetch(`http://localhost:3000/user/${id}`)
        .then((data) => data.json())
        .then((re) => setValue((re)))
        .catch((err) => render(err))
    }
})
function setValue(data=[]){
    $('#userEdit').value=data.title
    $('#userScore').value=data.score
    $('#userEmail').value=data.email
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
            let id=localStorage.getItem('editId')
            fetch(`http://localhost:3000/user/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: userName, email: userEmail, score: userScore })
            })
        }, 1500)

    }

}

$('.form-edit').addEventListener('submit',()=>{
    console.log(2);
    updateUser();
})





//==== MODAL =====///
$('.cancel').addEventListener('click',(e)=>{
    $('.wrapper').classList.add('none')
})