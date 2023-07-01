taskbox = document.getElementsByClassName('taskbox')
authbtn = document.getElementById('authbtn')
welcome = document.getElementById('welcome')

if (localStorage.getItem('access') == null && localStorage.getItem('refresh') ==  null){
    document.getElementsByClassName("unauthenticatedbanner")[0].classList.remove('hidden')
    document.getElementById('dateform').classList.add('hidden')
}else{
    access_url = 'http://127.0.0.1:8000/api/gettasks/'
    async function DataRequest() {
        const request = await fetch(access_url,{
            method : 'POST',
            headers :{
                'Content-Type':'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('access')}`
            },
            body:JSON.stringify({'date':sessionStorage.getItem('date')})
        })
        const response = await request.json();
        var today = true;
        const currentDate = new Date();
        const givenDateString = sessionStorage.getItem('date');
        const givenDate = new Date(givenDateString);
        
        const givenTimestamp = givenDate.getTime();
        const currentTimestamp = currentDate.getTime();
        
        if (givenTimestamp == currentTimestamp){
        }
        const differenceInMs = currentTimestamp - givenTimestamp;
        
        const msInDay = 1000 * 60 * 60 * 24;
        
        if (differenceInMs >= msInDay) {
          var today = false;
        } else if (differenceInMs >= 0) {
          today = true;
         } //else {
        //   var not_today = true
        // }
         

        if (today == false){
            var headerBar = document.getElementsByClassName('header-bar')[0];
            headerBar.style.background = "linear-gradient(90deg, #000000 0%, #000000     50%, #000000 100%)";
            headerBar.style.color = 'white'
        }
        if (request.status === 200){
            if (response.length == 0){
                document.getElementById('no-task').classList.remove('hidden')
            }

            response.forEach(element => {
                if (today == true){
                    if (element.complete == true){
                        if(element.time == null){
                            taskbox[0].innerHTML += `    <div class="task-wrapper" data-position="{{task.pk}}">
                        <div class="task-title">
                            <div class="task-complete-icon edit-icon" data-id=${element.id} data-action="edit"></div>
                            <i><s><a href="#">${element.name}</a></s></i>
                        </div>
                        <div class="task-controls">
                            <a class="delete-link edit-icon" data-id=${element.id} data-action="delete">&#215;</a>
                            <span class="handle edit-icon" data-id=${element.id} data-action="edit">&#129351;</span>
                        </div>
                    </div>`
                        }else{
                            taskbox[0].innerHTML += `    <div class="task-wrapper" data-position="{{task.pk}}">
                            <div class="task-title">
                                <div class="task-complete-icon edit-icon" data-id=${element.id} data-action="edit"></div>
                                <i><s><a href="#">${element.name}</a></s></i>
                            </div>
                            <div class="task-controls">
                                <a class="delete-link edit-icon" data-id=${element.id} data-action="delete">&#215;</a>
                                <a><span class="handle">&#127942;</span></a>
                            </div>
                        </div>`
                        }
                    }else{
                        if (element.time == null){
                            taskbox[0].innerHTML += `    <div class="task-wrapper" data-position="{{task.pk}}">
                            <div class="task-title">
                                <div class=" edit-icon" data-id=${element.id} data-action="edit">${element.priority === 'p1' ? '&#128681;' : element.priority === 'p2' ? '&#127988;' : '&#x2690;'  }</div>
                                <a data-id=${element.id} data-action="update" class="edit-icon" href=
                                "#" >${element.name}</a> 
                            </div>
                            <div class="task-controls">
                                <a class="delete-link edit-icon" data-id=${element.id} data-action="delete">&#215;</a>
                                <span class="handle edit-icon" data-id=${element.id} data-action="edit">&#x2713;</span>
                            </div>
                        </div>`
                        }
                        else{
                            taskbox[0].innerHTML += `    <div class="task-wrapper" data-position="{{task.pk}}">
                            <div class="task-title">
                            <div class=" edit-icon" data-id=${element.id} data-action="edit">${element.priority === 'p1' ? '&#128681;' : element.priority === 'p2' ? '&#127988;' : '&#x2690;'  }</div>
                                <a data-id=${element.id} data-action="update" class="edit-icon">${element.name} (${element.time} left)</a> 
                            </div>
                            <div class="task-controls">
                                <a class="delete-link edit-icon" data-id=${element.id} data-action="delete">&#215;</a>
                                <a href="taskcountdown.html"><span class="handle countdown" data-id=${element.id}  data-name="${element.name}" data-time=${element.time}>&#128336;</span></a>
                            </div>
                        </div>`
                        }
                    }
                }else{
                    const main_body = document.getElementById('main_body')
                    const elements = main_body.getElementsByTagName('*');
                    for(let i = 0; i < elements.length; i++) {
                        if (elements[i].id != 'date' && elements[i].id != 'datebutton'){
                            elements[i].disabled = true;
                            elements[i].setAttribute('href', '#');
                        }

                        
                      }
                      if (element.complete == true){
                        if(element.time == null){
                            taskbox[0].innerHTML += `    <div class="task-wrapper">
                        <div class="task-title">
                            <div class="task-complete-icon "></div>
                            <i><s><a href="#">${element.name}</a></s></i>
                        </div>
                        <div class="task-controls">
                            <a class="delete-link">&#215;</a>
                            <span class="handle " >&#129351;</span>
                        </div>
                    </div>`
                        }else{
                            taskbox[0].innerHTML += `    <div class="task-wrapper" data-position="{{task.pk}}">
                            <div class="task-title">
                                <div class="task-complete-icon "></div>
                                <i><s><a href="#">${element.name}</a></s></i>
                            </div>
                            <div class="task-controls">
                                <a class="delete-link" >&#215;</a>
                                <a><span class="handle">&#127942;</span></a>
                                
                            </div>
                        </div>`
                        }
                    }else{
                        if (element.time == null){
                            taskbox[0].innerHTML += `    <div class="task-wrapper">
                            <div class="task-title">
                                <div class="">${element.priority === 'p1' ? '&#128681;' : element.priority === 'p2' ? '&#127988;' : '&#x2690;'  }</div>
                                <a  href=
                                "#" >${element.name}</a> 
                            </div>
                            <div class="task-controls">
                                <a class="delete-link " >&#215;</a>
                                <span class="handle ">&#x2713;</span>
                            </div>
                        </div>`
                        }
                        else{
                            taskbox[0].innerHTML += `    <div class="task-wrapper">
                            <div class="task-title">
                            <div class="">${element.priority === 'p1' ? '&#128681;' : element.priority === 'p2' ? '&#127988;' : '&#x2690;'  }</div>
                                <a >${element.name} (${element.time} left)</a> 
                            </div>
                            <div class="task-controls">
                                <a class="delete-link " >&#215;</a>
                                <a href="#"><span class="handle">&#128336;</span></a>
                            </div>
                        </div>`
                        }
                    }
                }
            });

            var dateform = document.getElementById('dateform')
            dateform.addEventListener('submit',e=>{
                e.preventDefault()
                sessionStorage.setItem('date',document.getElementById('date').value)
                location.reload()
            })


            authbtn.innerHTML = `logout`
            authbtn.removeAttribute("href")
            authbtn.addEventListener('click',function(){
                localStorage.removeItem('access')
                localStorage.removeItem('user')
                localStorage.removeItem('email')
                localStorage.removeItem('refresh')
                location.reload()
            })
            welcome.innerHTML = `Welcome Back ${localStorage.getItem('user')}`
            if (response.length == 0){
                document.getElementById('task_count').innerHTML = `0`
                document.getElementById('trophies').innerHTML = `0&#127942;-0&#129351;`

            }else{
                document.getElementById('task_count').innerHTML = `${response[0]['count_task']}`
                document.getElementById('trophies').innerHTML = `${response[0].trophies}&#127942;-${response[0].medals}&#129351;`
                if (response[0].activity != null){
                    document.getElementById('activity_time').innerHTML = `Activity Today: ${response[0].activity}`
                }
                if (response[0].streak != 0){
                    document.getElementById('streak').innerHTML = `Streak: ${response[0].streak}${response[0].streak > 1 && response[0].streak <= 3 ? '&#x1F525;': response[0].streak >= 3 && response[0].streak < 6 ?'💪' : response[0].streak >= 6  && response[0].streak <= 9 ? '🦍' : response[0].streak >= 10 ?  '&#x1F451;' : ''}`
                }
            }
            ///////////////////////////////the countdown logic////////////////////////////
            var countdown_icon = document.getElementsByClassName('countdown')
            for(i=0;i<countdown_icon.length;i++){
                countdown_icon[i].addEventListener('click',function(){
                    var id = this.dataset.id
                    var time = this.dataset.time
                    var taskname = this.dataset.name
                    
                    sessionStorage.setItem('task_id',id)
                    sessionStorage.setItem('time',time)
                    sessionStorage.setItem('taskname',taskname)
                })
            }

            ///////////////////////////////////////////////////////////////////////////////////

            //Making The Complete And Incomplete Button Function
            var icon = document.getElementsByClassName('edit-icon')
            for (i=0;i < icon.length;i++){
                icon[i].addEventListener('click',function(){
                    var id = this.dataset.id
                    var action = this.dataset.action
                    edit_url = 'http://127.0.0.1:8000/api/edit/'
                    fetch(edit_url, {
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json',
                            'X-CSRFToken':csrftoken,
                            'Authorization' : `Bearer ${localStorage.getItem('access')}`
                        }, 
                        body:JSON.stringify({'id':id,'action':action})
                    })
                    .then((response) => {
                       return response.json();
                    })
                    .then((data) => {
                       
                        if (data == 'Done'){
                            location.reload()
                            
                        }else if( action == 'update' && data != 'Given token not valid for any token type'){
                            sessionStorage.setItem('taskname',data['name'])
                            sessionStorage.setItem('description',data['description'])
                            sessionStorage.setItem('task_id',data['id'])
                            location.replace('update.html')
                        }
                        else{
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
                                    fetch(edit_url, {
                                        method:'POST',
                                        headers:{
                                            'Content-Type':'application/json',
                                            'X-CSRFToken':csrftoken,
                                            'Authorization': `Bearer ${localStorage.getItem('access')}`
                                        },
                                        body:JSON.stringify({'id':id,'action':action})
                                    })
                                    .then((response) => {
                                       return response.json();
                                    })
                                    .then((data) => {
                                        if (data == 'Done'){
                                            location.reload()
                                        }else if( action == 'update' && data != 'Given token not valid for any token type'){
                                            sessionStorage.setItem('taskname',data['name'])
                                            sessionStorage.setItem('description',data['description'])
                                            sessionStorage.setItem('task_id',data['id'])
                                            location.replace('update.html')
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
            }

            //Search Logic
            searchform = document.getElementById('search-form')
            q = document.getElementById('q')
            searchform.addEventListener('submit',e=>{
                e.preventDefault()
                search_url = 'http://127.0.0.1:8000/api/search/'
                    fetch(search_url, {
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json',
                            'X-CSRFToken':csrftoken,
                            'Authorization' : `Bearer ${localStorage.getItem('access')}`
                        }, 
                        body:JSON.stringify({'q':q.value})
                    })
                    .then((response) => {
                       return response.json();
                    })
                    .then((data) => {
                        if (data != 'Given token not valid for any token type'){
                            taskbox[0].innerHTML = '';
                            var refresh_icon = document.getElementById('refresh-icon').classList.remove('hidden')
 
                            if (data.length != 0){
                                data.forEach(element => {
                                    if (element.complete == true){
                                        taskbox[0].innerHTML = ''
                                        taskbox[0].innerHTML += `    <div class="task-wrapper" data-position="{{task.pk}}">
                                        <div class="task-title">
                                            <div class="task-complete-icon edit-icon" data-id=${element.id} data-action="edit"></div>
                                            <i><s><a href="#">${element.name}</a></s></i>
                                        </div>
                                        <div class="task-controls">
                                            <a class="delete-link edit-icon" data-id=${element.id} data-action="delete">&#215;</a>
                                            <span class="handle edit-icon" data-id=${element.id} data-action="edit">&#x2713;</span>
                                        </div>
                                    </div>`
                                    }else{
                                    taskbox[0].innerHTML += `    <div class="task-wrapper" data-position="{{task.pk}}">
                                    <div class="task-title">
                                        <div class="task-incomplete-icon edit-icon" data-id=${element.id} data-action="edit"></div>
                                        <a href="{% url 'task-update' task.id %}">${element.name}</a> 
                                    </div>
                                    <div class="task-controls">
                                        <a class="delete-link edit-icon" data-id=${element.id} data-action="delete">&#215;</a>
                                        <span class="handle edit-icon" data-id=${element.id} data-action="edit">&#x2713;</span>
                                    </div>
                                </div>`
                                }
                                })
                            }
   
                        }
                        else{
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
                                    fetch(search_url, {
                                        method:'POST',
                                        headers:{
                                            'Content-Type':'application/json',
                                            'X-CSRFToken':csrftoken,
                                            'Authorization': `Bearer ${localStorage.getItem('access')}`
                                        },
                                        body:JSON.stringify({'id':id,'action':action})
                                    })
                                    .then((response) => {
                                       return response.json();
                                    })
                                    .then((data) => {
                                        if (data != 'Given token not valid for any token type' ){
                                            taskbox[0].innerHTML = ''
                                            var refresh_icon = document.getElementById('refresh-icon').classList.remove('hidden')
                                            if (data.length != 0){
                                                data.forEach(element => {
                                                    if (element.complete == true){
                                                        taskbox[0].innerHTML = ''
                                                        taskbox[0].innerHTML += `    <div class="task-wrapper" data-position="{{task.pk}}">
                                                        <div class="task-title">
                                                            <div class="task-complete-icon edit-icon" data-id=${element.id} data-action="edit"></div>
                                                            <i><s><a href="#">${element.name}</a></s></i>
                                                        </div>
                                                        <div class="task-controls">
                                                            <a class="delete-link edit-icon" data-id=${element.id} data-action="delete">&#215;</a>
                                                            <span class="handle edit-icon" data-id=${element.id} data-action="edit">&#x2713;</span>
                                                        </div>
                                                    </div>`
                                                    }else{
                                                    taskbox[0].innerHTML += `    <div class="task-wrapper" data-position="{{task.pk}}">
                                                    <div class="task-title">
                                                        <div class="task-incomplete-icon edit-icon" data-id=${element.id} data-action="edit"></div>
                                                        <a href="{% url 'task-update' task.id %}">${element.name}</a> 
                                                    </div>
                                                    <div class="task-controls">
                                                        <a class="delete-link edit-icon" data-id=${element.id} data-action="delete">&#215;</a>
                                                        <span class="handle edit-icon" data-id=${element.id} data-action="edit">&#x2713;</span>
                                                    </div>
                                                </div>`
                                                }

                                                })
                                            }
                                        }else{
                                            window.alert('login expired')
                                            location.replace('login.html')   
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
                    location.reload();
                }else{
                    window.alert('Login Expired');
                    location.replace('login.html')   
                }

            })
        }
    }

    DataRequest()
   

}