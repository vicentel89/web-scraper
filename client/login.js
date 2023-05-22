function login() {
  document.querySelector('#login').innerHTML = 'loading...';

  const username = document.querySelector('#username');
  const password = document.querySelector('#password');

  fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem('user', JSON.stringify(data));
      window.location.href = 'http://localhost:3000/web-scraper.html';
    });
}

const loginButton = document.querySelector('#login');

loginButton.addEventListener('click', login);
