// Overlay login logic for index.html
(function() {
  // Only show overlay if not logged in
  if (localStorage.getItem('loggedIn') === 'true' || localStorage.getItem('loggedIn') === 'guest') return;

  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'loginOverlay';
  overlay.innerHTML = `
    <div class="login-overlay-bg"></div>
    <div class="login-container login-overlay-form">
      <h2>ARASAKA LOGIN</h2>
      <form id="loginForm" autocomplete="off">
        <div>
          <label for="username">Username</label>
          <input type="text" id="username" name="username" required autofocus>
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required>
        </div>
        <div class="error" id="loginError"></div>
        <button type="submit">Login</button>
        <button type="button" id="skipLogin" class="skip-btn">Continue as Guest</button>
      </form>
    </div>
  `;
  document.body.appendChild(overlay);

  // Style overlay (uses login.css + extra)
  const style = document.createElement('style');
  style.textContent = `
    #loginOverlay {
      position: fixed; z-index: 9999; inset: 0; display: flex; align-items: center; justify-content: center;
    }
    .login-overlay-bg {
      position: absolute; inset: 0;
      background: linear-gradient(120deg, #0ffb 0%, #111e 80%);
      backdrop-filter: blur(18px) brightness(0.9) saturate(1.2);
      -webkit-backdrop-filter: blur(18px) brightness(0.9) saturate(1.2);
      z-index: 0;
      transition: backdrop-filter 0.3s;
    }
    .login-overlay-form {
      z-index: 1; box-shadow: 0 0 32px #0ff8, 0 0 8px #fff2;
      animation: loginPop 0.5s cubic-bezier(.7,-0.2,.3,1.4);
      position: relative;
    }
    #loginOverlay * {
      pointer-events: auto !important;
    }
    @keyframes loginPop {
      0% { transform: scale(0.8) translateY(40px); opacity: 0; }
      100% { transform: scale(1) translateY(0); opacity: 1; }
    }
    body.login-locked *:not(#loginOverlay):not(#loginOverlay *):not(script):not(style) {
      pointer-events: none !important;
      user-select: none !important;
      filter: none !important;
    }
  `;
  document.head.appendChild(style);
  document.body.classList.add('login-locked');

  // Login logic
  const loginForm = overlay.querySelector('#loginForm');
  const errorMsg = overlay.querySelector('#loginError');
  const skipBtn = overlay.querySelector('#skipLogin');
  
  // Skip login functionality
  skipBtn.addEventListener('click', function() {
    localStorage.setItem('loggedIn', 'guest');
    overlay.remove();
    document.body.classList.remove('login-locked');
  });
  
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = loginForm.username.value.trim();
    const password = loginForm.password.value.trim();
    if ((username === 'admin' && password === 'cyberpunk') || (username === 'user' && password === 'android')) {
      localStorage.setItem('loggedIn', 'true');
      overlay.remove();
      document.body.classList.remove('login-locked');
    } else {
      errorMsg.textContent = 'Invalid username or password.';
    }
  });
})();
