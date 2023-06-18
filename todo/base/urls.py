from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('token/', views.MyTokebObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('gettasks/',views.ListTasks,name="listtask"),
    path('sendmail/',views.send_email,name="sendmail"),
    path('register/',views.register,name="register"),
    path('create/',views.create_task,name='create'),
    path('edit/',views.edittask,name='edit'),
    path('search/',views.search,name="search"),
    path('update/',views.update,name='update'),
    path('updatetime/',views.update_timer,name="updatetimer")
]
