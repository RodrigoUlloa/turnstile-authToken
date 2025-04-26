document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const messageDiv = document.getElementById('message');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.get('username'),
          password: formData.get('password'),
          'cf-turnstile-response': turnstile.getResponse(),
        }),
      });
      const data = await response.json();

      messageDiv.style.display = 'block';
      if (data.success) {
        messageDiv.className = 'success';
        messageDiv.textContent = data.message;
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      } else {
        messageDiv.className = 'error';
        messageDiv.textContent = data.message;
        turnstile.reset();
      }
    } catch (error) {
      messageDiv.style.display = 'block';
      messageDiv.className = 'error';
      messageDiv.textContet = 'An error ocurred. Please try again.';
      turnstile.reset();
    }
  });
});
