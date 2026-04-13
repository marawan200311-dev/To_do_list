from django.shortcuts import render, redirect
from tasks.models import Task

# Home page
def index(request):
    return render(request, 'pages/index.html')

# ADD page
def add_page(request):
    if request.method == 'POST':
        title = request.POST.get('title', '').strip()
        description = request.POST.get('description', '').strip()
        
        if not title:
            return render(request, 'pages/add.html', {'error': 'Task title is required'})
        
        if len(title) < 3:
            return render(request, 'pages/add.html', {'error': 'Task title must be at least 3 characters'})
        
        task = Task.objects.create(title=title, description=description)
        return render(request, 'pages/add.html', {'success': f'Task "{title}" added successfully!'})
    
    return render(request, 'pages/add.html')

# DELETE page
def delete_page(request):
    if request.method == 'POST':
        task_ids = request.POST.getlist('task_ids')
        
        if task_ids:
            deleted_count = Task.objects.filter(id__in=task_ids).delete()[0]
            return render(request, 'pages/delete.html', {
                'tasks': Task.objects.all(),
                'success': f'Successfully deleted {deleted_count} task(s)'
            })
        else:
            return render(request, 'pages/delete.html', {
                'tasks': Task.objects.all(),
                'error': 'Please select at least one task to delete'
            })
    
    return render(request, 'pages/delete.html', {'tasks': Task.objects.all()})

# SHOW page
def show_page(request):
    tasks = Task.objects.all()
    return render(request, 'pages/show.html', {'tasks': tasks})

# UPDATE page
def update_page(request):
    tasks = Task.objects.all()
    selected_task = None
    
    if request.method == 'POST':
        task_id = request.POST.get('task_id')
        action = request.POST.get('action')
        
        # If just selecting a task to edit
        if task_id and not action:
            try:
                selected_task = Task.objects.get(id=task_id)
            except Task.DoesNotExist:
                pass
            return render(request, 'pages/update.html', {
                'tasks': tasks,
                'selected_task': selected_task
            })
        
        # If updating the task
        if action == 'update' and task_id:
            title = request.POST.get('title', '').strip()
            description = request.POST.get('description', '').strip()
            
            if not title:
                return render(request, 'pages/update.html', {
                    'tasks': tasks,
                    'selected_task': selected_task,
                    'error': 'Task title is required'
                })
            
            if len(title) < 3:
                return render(request, 'pages/update.html', {
                    'tasks': tasks,
                    'selected_task': selected_task,
                    'error': 'Task title must be at least 3 characters'
                })
            
            try:
                task = Task.objects.get(id=task_id)
                task.title = title
                task.description = description
                task.save()
                return render(request, 'pages/update.html', {
                    'tasks': Task.objects.all(),
                    'success': f'Task #{task_id} updated successfully!'
                })
            except Task.DoesNotExist:
                pass
    
    return render(request, 'pages/update.html', {'tasks': tasks})