console.log('Update Task page loaded');

document.addEventListener('DOMContentLoaded', function() {
  const taskSelect = document.getElementById('taskSelect');
  const titleInput = document.getElementById('taskTitle');
  const descriptionInput = document.getElementById('taskDescription');
  const updateForm = document.querySelector('form');

  // Auto-submit when task is selected to load its data
  if (taskSelect) {
    taskSelect.addEventListener('change', function() {
      if (this.value) {
        this.form.submit();
      }
    });
  }

  // Validation before update
  if (updateForm) {
    updateForm.addEventListener('submit', function(event) {
      const action = event.submitter?.value;
      
      if (action === 'update') {
        const title = titleInput.value.trim();
        
        if (!title) {
          event.preventDefault();
          alert('Please enter a task title');
          titleInput.focus();
          return;
        }
        
        if (title.length < 3) {
          event.preventDefault();
          alert('Task title must be at least 3 characters');
          titleInput.focus();
          return;
        }
        
        const confirmed = confirm('Are you sure you want to update this task?');
        if (!confirmed) {
          event.preventDefault();
        }
      }
    });
  }
});