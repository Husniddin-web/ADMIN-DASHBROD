

function registration() {
    let BaseURl = 'https://n36-todolist.herokuapp.com'
    let userName = $('#user-name').value.trim();
    let userPassword = $('#user-password').value.trim();

    const params = {
        userName: userName,
        userPassword: userPassword,
    }
    console.log(params);
    fetch(`${BaseURl}/signup`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params)
        }).then((response) => response.json())
        .then(data => {
            console.log(data);
            if (data.message) {
                $('.alert').classList.remove('hide-toast');
                $('.alert').innerHTML = '<strong>Oldin royhatdan otkansiz</strong>'
                setTimeout(() => {
                    $('.alert').classList.add('hide-toast');
                }, 2500)
            }
            if (data.token) {
                $('.alert').classList.remove('alert-danger')
                $('.alert').classList.add('alert-success')
                $('.alert').classList.remove('hide-toast');
                $('.alert').innerHTML = '<strong>Royhatdan otingiz</strong>'
                setTimeout(() => {
                    $('.alert').classList.add('hide-toast');
                    window.location.replace('./login.html')
                }, 2500)
            }
        })

}
$('#registration').addEventListener('submit', (e) => {
    e.preventDefault();
    registration();
})


function eyes(){
    $('.reg').addEventListener('click', e => {
        if (e.target.classList.contains('bi-eye-fill')) {
            $('#user-password').setAttribute('type', 'text')
            $('.eyes').innerHTML = '<i class="bi bi-eye-slash-fill"></i>'
        } 
        if (e.target.classList.contains('bi-eye-slash-fill')) {
            $('#user-password').setAttribute('type', 'password')
            $('.eyes').innerHTML = '<i class="bi bi-eye-fill"></i>'
    
        }
    
    })
    
}
eyes()