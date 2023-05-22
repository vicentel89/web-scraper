function register() {
  document.querySelector('#register').innerHTML = 'loading...';

  const username = document.querySelector('#username');
  const password = document.querySelector('#password');

  fetch('http://localhost:3000/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  })
    .then((res) => res.json())
    .then(() => (window.location.href = 'http://localhost:3000/login.html'));
}

const registerButton = document.querySelector('#register');

registerButton.addEventListener('click', register);
