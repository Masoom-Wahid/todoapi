var form = document.getElementById('form')
var taskname = document.getElementById('taskname')
var description = document.getElementById('description')
var error = document.getElementById('error')


if ((sessionStorage.getItem('taskname') && sessionStorage.getItem('description') && sessionStorage.getItem('task_id')) != undefined){
    taskname.value = sessionStorage.getItem('taskname')
    description.value = sessionStorage.getItem('description')
    form.addEventListener('submit',e =>{
        e.preventDefault()
        url = 'http://127.0.0.1:8000/api/update/'
        fetch(url, {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'X-CSRFToken':csrftoken,
                'Authorization' : `Bearer ${localStorage.getItem('access')}`
            },
            body:JSON.stringify({'id':sessionStorage.getItem('task_id'),'name':taskname.value,'description':description.value})
        })
        .then((response) => {
           return response.json();
        })
        .then((data) => {
            if (data == 'Updated'){
                location.replace('task.html')
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
                            body:JSON.stringify({'id':sessionStorage.getItem('task_id'),'name':taskname.value,'description':description.value})
                        })
                        .then((response) => {
                           return response.json();
                        })
                        .then((data) => {
                            if (data == 'Updated'){
                                location.replace('task.html')
                            }else{
                                error.classList.remove('hidden')
                            } 
                        })
                    }else{
                        window.alert('Login Expired');
                        location.replace('login.html')   
                    }
    
                })   
            }
        })
    })



}else{
    location.replace('index.html')
}

