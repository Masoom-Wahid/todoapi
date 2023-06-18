var form = document.getElementById('form')
var taskname = document.getElementById('taskname')
var description = document.getElementById('description')
var hour = document.getElementById('hour')
var min = document.getElementById('min')
var sec = document.getElementById('sec')
var error = document.getElementById('error')



form.addEventListener('submit',e =>{
    e.preventDefault()
    var priority_radios = document.querySelectorAll('input[name="Priority"]')
    let selected_priority;
    for (const radio of priority_radios){
        if (radio.checked){
            selected_priority = radio.value;
            break;
        }
    }
    url = 'http://127.0.0.1:8000/api/create/'
    fetch(url, {
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'X-CSRFToken':csrftoken,
            'Authorization' : `Bearer ${localStorage.getItem('access')}`
        },
        body:JSON.stringify({'taskname':taskname.value,'description':description.value,'date':sessionStorage.getItem('date'),'hour':hour.value,'min':min.value,'sec':sec.value,'priority':selected_priority})
    })
    .then((response) => {
       return response.json();
    })
    .then((data) => {
        if (data == 'Created'){
            location.replace('/task.html')
        }else if(data == 'Error'){
            error.classList.remove('hidden')
        }else{
            refresh_url = 'http://127.0.0.1:8000/api/token/refresh/'
            fetch(refresh_url, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'X-CSRFToken':csrftoken,
                }, 
                body:JSON.stringify({'refresh':localStorage.getItem('refresh')})
            })
            .then((response) => {
               return response.json();
            })
            .then((data) => {
                if (data['access']){
                    localStorage.setItem('access',data['access'])
                    fetch(url, {
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json',
                            'X-CSRFToken':csrftoken,
                            'Authorization': `Bearer ${localStorage.getItem('access')}`
                        },
                        body:JSON.stringify({'taskname':taskname.value,'description':description.value,'date':sessionStorage.getItem('date'),'hour':hour.value,'min':min.value,'sec':sec.value,'priority':selected_priority})
                    })
                    .then((response) => {
                       return response.json();
                    })
                    .then((data) => {
                        if (data == 'Created'){
                            location.replace('/task.html')
                        }else{
                            error.classList.remove('hidden')
                        } 
                    })
                }else{
                    window.alert('Login Expired');
                    location.replace('/login.html')   
                }

            })   
        }
    })
})