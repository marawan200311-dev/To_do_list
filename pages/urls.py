from django.urls import path
from . import views

# urlpatterns = [
#       path('', views.index, name='index'),
# #     path('add/', views.add_page, name='add_page'),
# #     path('delete/', views.delete_page, name='delete_page'),
# #     path('show/', views.show_page, name='show_page'),
# #     path('update/', views.update_page, name='update_page'),
# #
#   ]

urlpatterns = [
    # Home page
    path('', views.index, name='index'),
    
    # Other pages (temporary)
    
    path('add/', views.add_page, name='add_page'),

    path('delete/', views.delete_page, name='delete_page'),
    path('show/', views.show_page, name='show_page'),
    path('update/', views.update_page, name='update_page'),
]