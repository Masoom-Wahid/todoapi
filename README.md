
![about](https://github.com/Masoom-Wahid/todoapi/assets/121297100/73ef1d4e-2527-4732-b589-634a914222d6)
![2](https://github.com/Masoom-Wahid/todoapi/assets/121297100/49b0492f-350f-4285-b294-e50d96731fd7)
![3](https://github.com/Masoom-Wahid/todoapi/assets/121297100/6a9f92ed-a199-4ab3-86b6-ed0e19416ee0)
![4](https://github.com/Masoom-Wahid/todoapi/assets/121297100/6e126f58-a5f0-479e-a141-a234ee5b9e48)

#This TodoList Was Made By Django And HTML/CSS and Js Only And No Front-End Framework, U Can Have Tasks For Each Day and other features Like Priority , TaskCountdown
## Note: Registering New Users Will not Work unless u fill up ur google token and gmail in todoapi/todo/todo/secrets.py module.
#To Start Using This U should start with making a virtual env, U Can Make One By Writing In the Main Directory :
```
python -m venv venv
```
after making ur virtual env u should start it , u can do so by writing in the main directory:
### in windows
```
.\venv\Scripts\activate
```
### in unix based systems
```
source ./venv/bin/activate
```
### install the depencdancies of the project
```
pip install -r requirments.txt
```

after all of this go to manage.py folder and run in the cmd :
first u  will make ur database with:
```
python manage.py makemigrations
```
then u migrate ur database with :
```
python manage.py migrate
```
u will need a user , u can make on by :
```
python manage.py createsuperuser
```
after all of this u should be good to go
```
python manage.py runserver
```
if all things did go well ur django server should run without any problem 

## Frontend
### for frontend part just to the web directory located in "todoapi/desktop application/web" and run
```
python -m http.server 5500
```

![1](https://github.com/Masoom-Wahid/todoapi/assets/121297100/438b9109-94a4-4810-a925-2dfed2a0321c)

u can login by that same username and password u create earlier.
after logging in u should see smth like this:
![2](https://github.com/Masoom-Wahid/todoapi/assets/121297100/caf70ebd-ae0b-475c-95d3-4fa1b2c46f72)
 
The Website Is Dynamic For Each Day And U Will Get Another List For Each Day :
U Have Features Like,  Prioirty Ordering , Making A  Task With Countdown 








