
    let BaseURl = 'https://n36-todolist.herokuapp.com'
function auth() {
    let userName = $('#login-name').value.trim();
    let userPassword = $('#login-password').value.trim();

    const params = {
        login: userName,
        password: userPassword,
    }
    console.log(params);
    fetch(`${BaseURl}/login`,
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
                $('.alert').innerHTML = `<strong>${data.message}</strong>`
                setTimeout(() => {
                    $('.alert').classList.add('hide-toast');
                }, 2500)
            }
            if (data.token) {
                localStorage.setItem('token', data.token)
                localStorage.setItem('userName', params.login)
                $('.alert').classList.remove('alert-danger')
                $('.alert').classList.add('alert-success')
                $('.alert').classList.remove('hide-toast');
                $('.alert').innerHTML = '<strong>Xush kelibsiz</strong>'
                setTimeout(() => {
                    $('.alert').classList.add('hide-toast');
                    window.location.replace('./index.html')
                }, 2500)
            }
        })

}
$('#login').addEventListener('submit', (e) => {
    e.preventDefault();
    auth();
})








function eyes(){
    $('#login').addEventListener('click', e => {
        if (e.target.classList.contains('bi-eye-fill')) {
            $('#login-password').setAttribute('type', 'text')
            $('.eyes').innerHTML = '<i class="bi bi-eye-slash-fill"></i>'
        } 
            if(e.target.classList.contains('bi-eye-slash-fill')) {
            $('#login-password').setAttribute('type', 'password')
            $('.eyes').innerHTML = '<i class="bi bi-eye-fill"></i>'
        }
    
    })
    
}
eyes()











