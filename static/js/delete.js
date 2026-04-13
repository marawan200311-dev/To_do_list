// delete.js - Specific JavaScript for Delete Task page

console.log('Delete Task page loaded');

document.addEventListener('DOMContentLoaded', function() {
  const checkboxes = document.querySelectorAll('.task-checkbox');
  const deleteBtn = document.getElementById('deleteBtn');
  const deleteForm = document.getElementById('deleteTaskForm');

  // Update delete button state based on checkboxes
  function updateDeleteButton() {
    const checkedCount = document.querySelectorAll('.task-checkbox:checked').length;
    
    if (deleteBtn) {
      if (checkedCount > 0) {
        deleteBtn.disabled = false;
        deleteBtn.textContent = `🗑️ Delete Selected (${checkedCount})`;
      } else {
        deleteBtn.disabled = true;
        deleteBtn.textContent = '🗑️ Delete Selected';
      }
    }
  }

  // Add event listeners to all checkboxes
  if (checkboxes.length > 0) {
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', updateDeleteButton);
    });
  }

  // Initial update
  updateDeleteButton();

  // Confirmation before delete
  if (deleteForm) {
    deleteForm.addEventListener('submit', function(event) {
      const checkedCount = document.querySelectorAll('.task-checkbox:checked').length;
      
      if (checkedCount === 0) {
        event.preventDefault();
        alert('Please select at least one task to delete');
        return;
      }
      
      const confirmed = confirm(`Are you sure you want to delete ${checkedCount} task(s)? This action cannot be undone.`);
      
      if (!confirmed) {
        event.preventDefault();
      } else {
        // Show loading state
        deleteBtn.textContent = '⏳ Deleting...';
        deleteBtn.disabled = true;
      }
    });
  }

  // Optional: Select All functionality
  const selectAllHtml = `
    <div class="select-all">
      <label>
        <input type="checkbox" id="selectAllCheckbox"> Select All
      </label>
    </div>
  `;
  
  const tableHeader = document.querySelector('.tasks-table thead tr');
  if (tableHeader && document.querySelectorAll('.task-checkbox').length > 0) {
    // Add select all column header if not exists
    const firstTh = tableHeader.querySelector('th:first-child');
    if (firstTh && firstTh.textContent === 'Select') {
      const selectAllCheckbox = document.createElement('input');
      selectAllCheckbox.type = 'checkbox';
      selectAllCheckbox.id = 'selectAllCheckbox';
      selectAllCheckbox.style.width = '20px';
      selectAllCheckbox.style.height = '20px';
      selectAllCheckbox.style.cursor = 'pointer';
      
      // Clear and add checkbox
      firstTh.innerHTML = '';
      firstTh.appendChild(selectAllCheckbox);
      
      selectAllCheckbox.addEventListener('change', function() {
        const isChecked = this.checked;
        document.querySelectorAll('.task-checkbox').forEach(checkbox => {
          checkbox.checked = isChecked;
        });
        updateDeleteButton();
      });
    }
  }
});