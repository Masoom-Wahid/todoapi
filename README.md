![4](https://github.com/Masoom-Wahid/todoapi/assets/121297100/f66909ad-7864-4730-840b-32e54df083e2)
![3](https://github.com/Masoom-Wahid/todoapi/assets/121297100/b8420e5f-94ea-4f04-b1c9-ba2a48fc2d14)
![5](https://github.com/Masoom-Wahid/todoapi/assets/121297100/db74f54e-68a2-43d7-8b37-9748b37571e7)


#This TodoList Was Made By Django And HTML/CSS and Js Only And No Front-End Framework, U Can Have Tasks For Each Day and other features Like Priority , TaskCountdown
#To Start Using This U should start with making a virtual env, U Can Make One By Writing In the Main Directory :
```
python -m venv venv
```
after making ur virtual env u can move on by downloading the neccesary libaries wirtten in requirments.py , u can do so by wiriting 
```
pip install -r requirments.txt
```
if this failed for some reason just intsall each one of them individually by writing
```
pip install (the name mentioned in the txt file)
```

after downloading all of the libraries u need a django secret_key u can get one by going to ur cmd and :
```
>>> from django.core.management.utils import get_random_secret_key
>>> get_random_secret_key()
```
after getting the secret key u can create a new file in the settings.py folder and writing in inside of it :
```
secret_key = (ur secret key)
```

u will need ur email and access key being used for the smtp application , if u have one write them in the secret.py as :
```
EMAIL_HOST_USER = (your email)
EMAIL_HOST_PASSWORD = (your key)
```
Note: all of these are neccecasry for running the django server 
after all of this go to manage.py folder and run in the cmd :
first u  will make ur database with:
```
python manage.py makemigrations
```
then u migrate all of ur tables with :
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

u are advised to run the front on a server , u can do so with VSCODE's local server running 
after running the server u should see smth like this :

![1](https://github.com/Masoom-Wahid/todoapi/assets/121297100/438b9109-94a4-4810-a925-2dfed2a0321c)

u can login by that same username and password u create earlier.
after logging in u should see smth like this:
![2](https://github.com/Masoom-Wahid/todoapi/assets/121297100/caf70ebd-ae0b-475c-95d3-4fa1b2c46f72)
 
The Website Is Dynamic For Each Day And U Will Get Another List For Each Day :
U Have Features Like,  Prioirty Ordering , Making A  Task With Countdown 








