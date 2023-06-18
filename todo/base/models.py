from django.db import models
from django.contrib.auth.models import User
PRIORITY_CHOICES = [
        ('p1', 'Priority 1'),
        ('p2', 'Priority 2'),
        ('p3', 'Priority 3'),
    ]
class Date(models.Model):
    date = models.DateField()

    def __str__(self):
        return str(self.date)



class Tasks(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    name = models.CharField(max_length=100,blank=False)
    description = models.CharField(max_length=150)
    complete = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    date = models.ForeignKey(Date, on_delete=models.CASCADE,blank=False)
    time = models.TimeField(null=True,blank=True)
    priority = models.CharField(max_length=50,choices=PRIORITY_CHOICES,blank=False)
    def __str__(self):
        return self.name

    class Meta:
        ordering=['complete','priority']

   

# class Tasks(models.Model):
#     user = models.ForeignKey(User,on_delete=models.CASCADE)
#     name = models.CharField(max_length=100)
#     description = models.CharField(max_length=150)
#     complete = models.BooleanField(default=False)
#     created = models.DateTimeField(auto_now_add=True)
#     updated = models.DateTimeField(auto_now=True)
#     date = models.DateField(null=True)
 
#     @property
#     def count_incomplete(self):
#         incomplete = 0
#         tasks = self.user.tasks_set.all()
#         for i in tasks:
#             if i.complete == False:
#                 incomplete += 1
#         return incomplete                

        
#     def __str__(self):
#         return self.name

