from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Tasks,Date
from django.contrib.auth.models import User
from datetime import timedelta, date

class TasksSerializer(ModelSerializer):
    count_task = serializers.SerializerMethodField('count_incomplete_tasks') 
    trophies = serializers.SerializerMethodField('count_trophies') 
    medals = serializers.SerializerMethodField('count_medals') 
    activity = serializers.SerializerMethodField('count_activity') 
    streak = serializers.SerializerMethodField('count_streak') 
    class Meta:
        model = Tasks
        fields = '__all__' 

    def count_streak(self, instance):
        class MyException(Exception):
            pass
        try:
            try:
                user = self.context['user']
                today = date.today()
                date_obj = Date.objects.get(date=today)
                streak = 0
                stop = False
                while not stop:
                    tasks_completed = False
                    try:
                        tasks_that_day = Tasks.objects.filter(user=user, date=date_obj)
                        for task in tasks_that_day:
                            if task.complete:
                                tasks_completed = True
                                streak += 1
                                today -= timedelta(days=1)
                                date_obj = Date.objects.get(date=today)
                                break
                            else:
                                continue 
                        else: 
                            if not tasks_completed:
                                break 
                    except MyException as e:
                        
                        stop = True
            except:
                pass            
            return streak
        except:
            pass    

    def count_activity(self,instance):
        try:
            activity_time = self.context['activity_time']
            return activity_time
        except:
            pass    
    def count_incomplete_tasks(self,instance):
        incomplete = 0
        try:
            tasks= self.context['tasks']
            for i in tasks:
                if i.complete == False:
                    incomplete += 1
            return incomplete  
        except:
            return incomplete      
    def count_trophies(self,instance):
        try:
            trophies  = 0 
            for i in self.context['trophy_task']:
                if i.complete == True and i.time != None:
                    trophies+=1        
            return trophies
        except:
            pass    

    def count_medals(self,instance):
        try:
            medals = 0
            for i in self.context['trophy_task']:
                if i.complete == True:
                    if i.time == None:
                        medals+=1
            return medals        
        except:
            pass        

class SearchSerializer(ModelSerializer):
    class Meta:
        model = Tasks
        fields = '__all__'        