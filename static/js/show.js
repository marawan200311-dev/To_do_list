console.log('Show Tasks page loaded');

document.addEventListener('DOMContentLoaded', function() {
  const rows = document.querySelectorAll('.tasks-table tbody tr');
  
  rows.forEach(row => {
    row.addEventListener('click', function() {
      console.log('Task clicked:', this.cells[1]?.innerText);
    });
  });
});