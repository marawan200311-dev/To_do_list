// add.js - Specific JavaScript for Add Task page

console.log('Add Task page loaded');

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('addTaskForm');
  const messageArea = document.getElementById('messageArea');

  // Auto-hide message after 3 seconds
  function showMessage(message, type) {
    messageArea.textContent = message;
    messageArea.className = `message-area ${type}`;
    messageArea.style.display = 'block';
    
    setTimeout(() => {
      messageArea.style.display = 'none';
    }, 3000);
  }

  // Form validation before submit
  if (form) {
    form.addEventListener('submit', function(event) {
      const titleInput = document.getElementById('taskTitle');
      const title = titleInput.value.trim();
      
      if (title === '') {
        event.preventDefault();
        showMessage('Please enter a task title', 'error');
        titleInput.focus();
        return;
      }
      
      if (title.length < 3) {
        event.preventDefault();
        showMessage('Task title must be at least 3 characters', 'error');
        titleInput.focus();
        return;
      }
      
      // Show loading state
      const submitBtn = document.querySelector('.btn-submit');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = '⏳ Saving...';
      submitBtn.disabled = true;
      
      // Re-enable after form submit (in case of slow network)
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 5000);
    });
  }

  // Auto-focus on title field
  const titleField = document.getElementById('taskTitle');
  if (titleField) {
    titleField.focus();
  }

  // Character counter for description (optional feature)
  const descriptionField = document.getElementById('taskDescription');
  if (descriptionField) {
    const counter = document.createElement('small');
    counter.style.display = 'block';
    counter.style.textAlign = 'right';
    counter.style.color = '#666';
    counter.style.marginTop = '5px';
    descriptionField.parentNode.appendChild(counter);
    
    function updateCounter() {
      const length = descriptionField.value.length;
      counter.textContent = `${length} characters`;
    }
    
    descriptionField.addEventListener('input', updateCounter);
    updateCounter();
  }
});