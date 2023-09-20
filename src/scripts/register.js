import { toastRegister } from './render.js';
import { registerRequest } from './requests.js';

function authentication() {
  const token = localStorage.getItem('@petInfo:token');

  if (token) {
    window.location.replace('./dashboard.html');
  }
}
authentication();

function handleRegister() {
  const inputs = document.querySelectorAll('.signup__input');
  const signupBtn = document.querySelector('.form__container--signupBtn');

  const registerBody = {};

  inputs.forEach(input => {
    input.addEventListener('click', () => {
      inputs.forEach(input => {
        input.classList.remove('invalid');
      });
    });
  });

  signupBtn.addEventListener('click', async event => {
    event.preventDefault();

    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i];
      if (input.value === '') {
        const message =
          'Por favor, preencha todos os campos necessários para realizar o cadastro.';
        return handleRegisterError(message);
      } else {
        registerBody[input.name] = input.value;
      }
    }

    const loading = document.createElement('img');
    loading.src = '../assets/icons/spinner.svg';
    signupBtn.innerHTML = '';
    signupBtn.appendChild(loading);

    setTimeout(async () => {
      const signup = await registerRequest(registerBody);
      if (typeof signup !== 'object') {
        handleRegisterError(signup);
      } else {
        toastRegister(true);
      }
      signupBtn.innerHTML = 'Cadastrar';
    }, 1000);
  });
}
handleRegister();

function handleRegisterError(message) {
  const inputs = document.querySelectorAll('.signup__input');

  inputs.forEach(input => {
    input.classList.add('invalid');
  });
  toastRegister(false, message);
}
