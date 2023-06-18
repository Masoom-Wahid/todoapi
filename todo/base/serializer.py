from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Tasks,Date
from django.contrib.auth.models import User
class TasksSerializer(ModelSerializer):
    count_task = serializers.SerializerMethodField('count_incomplete_tasks') 
    trophies = serializers.SerializerMethodField('count_trophies') 
    medals = serializers.SerializerMethodField('count_medals') 
    class Meta:
        model = Tasks
        fields = '__all__'
 
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