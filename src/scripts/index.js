import { loginRequest } from './requests.js';

function authentication() {
  const token = localStorage.getItem('@petInfo:token');
  if (token) {
    window.location.replace('./src/pages/dashboard.html');
  }
}
authentication();

export async function handleLogin() {
  const inputs = document.querySelectorAll('.login__input');
  const errorMessageDisplay = document.querySelector('.form__password--error');
  const loginBtn = document.querySelector('.form__container--loginBtn');
  const loginBody = {};

  inputs.forEach(input => {
    input.addEventListener('click', () => {
      inputs.forEach(input => {
        input.classList.remove('invalid');
      });
      errorMessageDisplay.innerText = '';
    });
  });

  loginBtn.addEventListener('click', async event => {
    event.preventDefault();

    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i];
      if (input.value === '') {
        const message = 'Por favor, preencha ambos os campos';
        return handleLoginError(message);
      } else {
        loginBody[input.name] = input.value;
      }
    }

    const loading = document.createElement('img');
    loading.src = './src/assets/icons/spinner.svg';
    loginBtn.innerHTML = '';
    loginBtn.appendChild(loading);

    setTimeout(async () => {
      const login = await loginRequest(loginBody);
      handleLoginError(login);
      loginBtn.innerHTML = 'Acessar';
    }, 500);
  });
}
handleLogin();

function handleLoginError(message) {
  const inputs = document.querySelectorAll('.login__input');
  const errorMessageDisplay = document.querySelector('.form__password--error');
  const token = JSON.parse(localStorage.getItem('@petInfo:token'));

  if (message !== token) {
    errorMessageDisplay.innerText = `${message}.`;
    inputs.forEach(input => {
      input.classList.add('invalid');
    });
  }
}
