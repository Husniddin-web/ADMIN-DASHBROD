//==   REQUEST  TO SERVER ====///
let baseUrl = `http://localhost:3000/user`
function getData(rsource) {``
    fetch(baseUrl)
        .then((data) => data.json())
        .then((re) => render(re))
        .catch((err) => render(err))
}
getData(baseUrl);



//=====  GET USER LIST ======////
function render(data = []) {
    let iter=1
    data.length > 0 ? data.forEach(e => {
        const div = createElement('tr', 'tr', `
        <td>${iter++}</td>
        <td>${e.title}</td>
        <td>${e.email}</td>
        <td>${e.score}</td>
        <td><button class="btn bg-warning py-0 text-light">Edit</button></td>
        <td><button  class="btn bg-danger py-0 text-light">Delete</button></td>
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
        alert('Fill input all')
    } else {
        fetch(baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: userName, email: userEmail, score: userScore })
        })

    }

}
$('.form-submit').addEventListener('submit',()=>{
    addUser();
})