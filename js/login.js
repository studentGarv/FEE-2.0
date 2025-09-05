// Simple login logic for demo
const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('loginError');

loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const username = loginForm.username.value.trim();
  const password = loginForm.password.value.trim();

  // Demo credentials (replace with real auth in production)
  if ((username === 'admin' && password === 'cyberpunk') || (username === 'user' && password === 'android')) {
    localStorage.setItem('loggedIn', 'true');
    window.location.href = 'index.html';
  } else {
    errorMsg.textContent = 'Invalid username or password.';
  }
});
