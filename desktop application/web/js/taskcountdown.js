var start_button = document.getElementById('startbutton')
var stop_button = document.getElementById('stopbtn')
if ((sessionStorage.getItem('taskname')) && (sessionStorage.getItem('task_id'))  && (sessionStorage.getItem('time')) != undefined){
    document.title = `${sessionStorage.getItem('taskname')} | Todo`
    var title = document.getElementsByClassName('tasktitle')[0].innerHTML += `${sessionStorage.getItem('taskname')}`
    session_time = sessionStorage.getItem('time')
    time = session_time.split(':')
    var hour = time[0]
    var min  = time[1]
    var sec = time[2]
    var h = document.getElementById('hours')
    var m = document.getElementById('minutes')
    var s = document.getElementById('seconds')
    h.innerHTML = `${hour}`
    m.innerHTML = `${min}`
    s.innerHTML = `${sec}`
    var startTimer = null;
    document.getElementById('startbutton').addEventListener('click',function(){
        
        allButtons = document.getElementsByTagName('button')
        if (stop_button.id != 'stopbtn'){
            stop_button.id = 'stopbtn'
            
        }
        for (i=0;i < allButtons.length;i++){
            if (allButtons[i].id == 'startbutton'){
                allButtons[i].style.background = 'red'
            }
            if (allButtons[i].id == 'stopbtn'){
                allButtons[i].style.background = 'linear-gradient(45deg, rgba(0, 0, 139, 0.7) 0%, rgba(10, 10, 158, 0.7) 20%, rgba(30, 144, 255, 0.7) 50%, rgba(108, 166, 205, 0.7) 75%, rgba(65, 105, 225, 0.7) 100%)';
            }
        }
        
        document.getElementById('startbutton').removeAttribute('id')
        function startInterval(){
            startTimer = setInterval(function(){
                timer();
            },1000);
        }
        startInterval()
    })

    function timer(){
        if(h.innerHTML == 0 && m.innerHTML == 0 && s.innerHTML == 0){
            h.innerHTML = 0;
            m.innerHTML = 0;
            s.innerHTML = 0;
        } else if(s.innerHTML != 0){
            s.innerHTML--;
            if (h.innerHTML == 0 && m.innerHTML == 0 && s.innerHTML == 0){
                window.alert('Task Completed Good Job!')
                edit_url = 'http://127.0.0.1:8000/api/edit/'
                fetch(edit_url, {
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        'X-CSRFToken':csrftoken,
                        'Authorization' : `Bearer ${localStorage.getItem('access')}`
                    }, 
                    body:JSON.stringify({'id':sessionStorage.getItem('task_id'),'action':'updatetime','time':sessionStorage.getItem('time')})
                })
                .then((response) => {
                   return response.json();
                })
                .then((data) => {
                    
                    if (data == 'Done'){
                        location.replace('task.html')
                        
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
                                    body:JSON.stringify({'id':sessionStorage.getItem('task_id'),'action':'updatetime'})
                                })
                                .then((response) => {
                                   return response.json();
                                })
                                .then((data) => {
                                    if (data == 'Done'){
                                        location.replace('task.html')
                                    }
                                })
                            }else{
                                window.alert('Login Expired');
                                location.replace('login.html')   
                            }
                        })   
                    }
                })
            }
        } else if(m.innerHTML != 0 && s.innerHTML == 0){
            s.innerHTML = 59;
            m.innerHTML--;
        } else if(h.innerHTML != 0 && m.innerHTML == 0){
            m.innerHTML = 60;
            h.innerHTML--;
        }
        return;
    }
    document.getElementById('stopbtn').addEventListener('click',function(){
        start_button.id = 'startbutton'
        
        allButtons = document.getElementsByTagName('button')
        for (i=0;i < allButtons.length;i++){
            if (allButtons[i].id == 'stopbtn'){
                allButtons[i].style.background = 'red'
            }
            if (allButtons[i].id == 'startbutton'){
                allButtons[i].style.background = 'linear-gradient(45deg, rgba(0, 0, 139, 0.7) 0%, rgba(10, 10, 158, 0.7) 20%, rgba(30, 144, 255, 0.7) 50%, rgba(108, 166, 205, 0.7) 75%, rgba(65, 105, 225, 0.7) 100%)';
            }
        }
        
        document.getElementById('stopbtn').removeAttribute('id')
        clearInterval(startTimer)
        var hour_done = h.innerHTML
        var  minutes_done = m.innerHTML
        var seconds_done = s.innerHTML
        edit_time = sessionStorage.getItem('time')
        let hourDone = parseInt(h.innerHTML);
        let minutesDone = parseInt(m.innerHTML);
        let secondsDone = parseInt(s.innerHTML)
        let [originalHours, originalMinutes, originalSeconds] = edit_time.split(':').map(num => parseInt(num));

        let hoursDiff = hourDone - originalHours;
        let minutesDiff = minutesDone - originalMinutes;
        let secondsDiff = secondsDone - originalSeconds;

        let totalTime = 0; // This should be stored in a variable that persists between tasks
        totalTime += hoursDiff * 3600; // Convert hours to seconds
        totalTime += minutesDiff * 60; // Convert minutes to seconds
        totalTime += secondsDiff;

        totalTime =  Math.abs(totalTime)

        url = 'http://127.0.0.1:8000/api/updatetime/'
        fetch(url, {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'X-CSRFToken':csrftoken,
                'Authorization' : `Bearer ${localStorage.getItem('access')}`
            },
            body:JSON.stringify({'id':sessionStorage.getItem('task_id'),'hour':hour_done,'minutes':minutes_done,'seconds':seconds_done,'activity_time':totalTime})
        })
        .then((response) => {
           return response.json();
        })
        .then((data) => {
            if (data == 'Updated'){
                
                sessionStorage.setItem('time',`${hour_done}:${minutes_done}:${seconds_done}`)
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
                            body:JSON.stringify({'id':sessionStorage.getItem('task_id'),'hour':hour_done,'minutes':minutes_done,'seconds':seconds_done,'activity_time':totalTime})
                        })
                        .then((response) => {
                           return response.json();
                        })
                        .then((data) => {
                            if (data == 'Updated'){
                               
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