const form = document.getElementById('form')
const username = document.getElementById('username')
const password = document.getElementById('password')


form.addEventListener('submit', e => {
    e.preventDefault();
    url = 'http://127.0.0.1:8000/api/token/'
    fetch(url, {
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'X-CSRFToken':csrftoken,
        }, 
        body:JSON.stringify({'username':username.value, 'password':password.value})
    })
    .then((response) => {
       return response.json();
    })
    .then((data) => {
        if (data['detail'] == 'No active account found with the given credentials'){
            window.alert('No Such Account Available')
        }else{
            localStorage.setItem('access',data['access'])
            localStorage.setItem('refresh',data['refresh'])
            window.alert('logged in succesfully')
            location.replace('task.html')
        }
    });
})