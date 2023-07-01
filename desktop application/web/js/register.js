document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const confirmpassword = document.getElementById('confirmpassword')
var  nonmatch = document.getElementById('nonmatch')
var error = document.getElementById('error')
var verify = document.getElementById('verify')
var veri = document.getElementById('veri')


form.addEventListener('submit', e => {
    e.preventDefault()
    if (password.value == confirmpassword.value){
        url = 'http://127.0.0.1:8000/api/sendmail/'
        fetch(url, {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'X-CSRFToken':csrftoken,
            }, 
            body:JSON.stringify({'name':username.value, 'email':email.value})
        })
        .then((response) => {
           return response.json();
        })
        .then((data) => {
        
            if (data != 'Smth Went Wrong'){
                error.classList.add('hidden')
                nonmatch.classList.add('hidden')
                document.getElementById('main-name').innerHTML = `Enter Your Verification Code`
                // username.classList.add('hidden')
                // email.classList.add('hidden')
                // password.classList.add('hidden')
                // confirmpassword.classList.add('hidden')
                // verify.classList.remove('hidden')
                form.classList.add('hidden')
                veri.classList.remove('hidden')
                if (document.getElementById('main-name').innerHTML == `Enter Your Verification Code`){
                    veri.addEventListener('submit',e=>{
                        e.preventDefault()
                    
                        if (verify.value == data){
                            reg_url = 'http://127.0.0.1:8000/api/register/'
                            fetch(reg_url, {
                                method:'POST',
                                headers:{
                                    'Content-Type':'application/json',
                                    'X-CSRFToken':csrftoken,
                                }, 
                                body:JSON.stringify({'name':username.value, 'email':email.value,'password':password.value})
                            })
                            .then((response) => {
                               return response.json();
                            })
                            .then((data) => {
                                
                                if (data == 'Done'){
                                    login_url = 'http://127.0.0.1:8000/api/token/'
                                    fetch(login_url, {
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
                                            error.classList.remove('hidden')  
                                        }else{
                                            localStorage.setItem('access',data['access'])
                                            localStorage.setItem('refresh',data['refresh'])
                                            window.alert('Signed Up in succesfully')
                                            location.replace('task.html')
                                        }
                                    });
                                }
                            })
                        }else{
                            error.classList.remove('hidden')  
                        }

                    })
                }
             
                
            }else{
                error.classList.remove('hidden')
            }
        });
    }
    else{
        nonmatch.classList.remove('hidden')
    }

})
