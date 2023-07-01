from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Tasks,Date,DateActivity
from .serializer import TasksSerializer,SearchSerializer
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.template.loader import render_to_string
from django.conf import settings
from django.core.mail import EmailMessage
import random, string
from django.template.loader import render_to_string
from .permissions import IsOwner
from .forms import PositionForm
from django.db.models import Q
from datetime import time,timedelta,datetime


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['date_joined'] =  user.date_joined.strftime("%Y/%m/%d")
        # ...

        return token

class MyTokebObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def ListTasks(request):
#     user = request.user
#     tasks = user.tasks_set.all()
#     serializer = TasksSerializer(tasks,many=True)
#     return Response(serializer.data)
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def ListTasks(request):
    try:
        date = Date.objects.get(date = request.data['date'])
    except:
        date = Date.objects.create(date=request.data['date'])        
    user = request.user
    try:
        activity_time = DateActivity.objects.get(user=request.user,date=date).activity
    except:
        activity_time = None    
    trophy_task = Tasks.objects.filter(user=user)
    tasks = Tasks.objects.filter(user=user,date=date)
    serializer = TasksSerializer(tasks,many=True,context={'tasks':tasks,'trophy_task':trophy_task,'activity_time':activity_time,'user':user})
    return Response(serializer.data)

@api_view(["POST"])
def send_email(request):
    try:
        email = request.data['email']
        name = request.data['name']
        choices = string.ascii_letters + string.digits + string.ascii_lowercase
        sercet_key = "".join(random.choice(choices) for i in range(6))

        template = render_to_string('email_template.html',{'name':name,'secret_key':sercet_key})
        email = EmailMessage(
            'Your Registration Code',
            template,
            settings.EMAIL_HOST_USER,
            [email],
        )
        email.fail_silently = False
        email.send()
        return Response(sercet_key)
    except:
        return Response('Smth Went Wrong',status=400)


@api_view(['POST'])
def register(request):
    email = request.data['email']
    name = request.data['name']
    password = request.data['password']

    User.objects.create_user(
        username=name,
        email=email,
        password=password
    )
    return Response('Done',status=200)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_task(request):
    try:
        if not request.data['taskname'] and request.data['priority']:
            return Response('Error',status=400)
        else:
            if request.data['hour']  == '0' and request.data['min'] == '0' and request.data['sec'] == '0':
                user = request.user
                task_name = request.data['taskname']
                description = request.data['description']
                Date_obj = Date.objects.get_or_create(date=request.data['date'])


                created_task = Tasks.objects.create(
                    user=user,
                    name=task_name,
                    description=description,
                    complete=False,
                    date = Date_obj[0],
                    priority=request.data['priority']
                )
                return Response('Created',status=200)
            else:
                user = request.user
                task_name = request.data['taskname']
                description = request.data['description']
                Date_obj = Date.objects.get_or_create(date=request.data['date'])


                created_task = Tasks.objects.create(
                    user=user,
                    name=task_name,
                    description=description,
                    complete=False,
                    date = Date_obj[0],
                    time = time(hour=int(request.data['hour']),minute=int(request.data['min']),second=int(request.data['sec'])),
                    priority=request.data['priority']
                )
                return Response('Created',status=200)    
    except:
        return Response('Error',status=400)
    

@api_view(['POST'])
@permission_classes([IsOwner])
def edittask(request):
    task = Tasks.objects.get(id=request.data['id'])
    action = request.data['action']
    if action == 'edit':
        if task.complete == False:
            task.complete = True
            task.save()
        else:
            task.complete = False
            task.save() 
    elif action == 'updatetime':
        task.time = time(hour=int(0),minute=int(0),second=int(0))
        task.complete = True
        duration_time = request.data['time'].split(':')
        try:
            activity_counter = DateActivity.objects.get(user=task.user,date=task.date)
            activity_time = activity_counter.activity

            duration = timedelta(hours=int(duration_time[0]),minutes=int(duration_time[1]),seconds=int(duration_time[2]))

            combined_time = datetime.combine(datetime.now().date(), activity_time) + duration

            activity_counter.activity = combined_time.time()
            activity_counter.save()
        except:
            DateActivity.objects.create(user=task.user,
                                    date=task.date,
                                    activity = time(hour=int(duration_time[0]),minute=int(duration_time[1]),second=int(duration_time[2]))
                                    )   

        task.save()
    elif action == 'update':
            serializer = TasksSerializer(task,many=False)
            return Response(serializer.data)
    elif action == 'delete':
        task.delete()
    return Response('Done',status=200)        

@api_view(["POST"])
@permission_classes([IsOwner])
def search(request):
    q = request.data['q']
    task = Tasks.objects.filter(user = request.user)
    result = task.filter(name__icontains=q)
    serializer = SearchSerializer(result,many=True,context={'task':task})
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsOwner])
def update(request):
        task_id = request.data['id']
        task_name = request.data['name']
        task_description = request.data['description']
        task = Tasks.objects.get(id=task_id)
        task.name = task_name
        task.description = task_description 
        task.save()
        return Response('Updated',status=200)
    # except:
    #     return Response('Error',status=400)
@api_view(["POST"])
@permission_classes([IsOwner])
def update_timer(request):
    task = Tasks.objects.get(id=request.data['id'])
    duration_time  = timedelta(seconds=int(request.data['activity_time']))
    hours, remainder = divmod(duration_time.seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    duration = timedelta(hours=hours,minutes=minutes,seconds=seconds)


    try:
        activity_counter=DateActivity.objects.get(user=task.user,date=task.date)
        activity_time = activity_counter.activity

        combined_time = datetime.combine(datetime.now().date(), activity_time) + duration

        activity_counter.activity = combined_time.time()
        activity_counter.save()
    except:
        DateActivity.objects.create(user=task.user,
                                    date=task.date,
                                    activity = time(hour=int(hours),minute=int(minutes),second=int(seconds))
                                    )    
    task.time = time(hour=int(request.data['hour']),minute=int(request.data['minutes']),second=int(request.data['seconds']))
    task.save()
    return Response('Updated',status=200)
