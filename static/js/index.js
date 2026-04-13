// index.js - Specific JavaScript for home page

console.log('Home page - To Do List Application');

// Add animation effect when page loads
document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.btn');
  
  // Animate buttons one by one
  buttons.forEach((button, index) => {
    button.style.opacity = '0';
    button.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      button.style.transition = 'all 0.5s ease';
      button.style.opacity = '1';
      button.style.transform = 'translateY(0)';
    }, index * 100);
  });

  // Optional: Add click tracking
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const action = this.innerText.trim();
      console.log(`User clicked: ${action}`);
    });
  });
});