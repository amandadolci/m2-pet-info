import {
  getUser,
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
} from './requests.js';
import {
  renderUserInfo,
  renderFeed,
  renderPublishModal,
  renderPostModal,
  renderDeleteModal,
  toastDashboard,
} from './render.js';

function authentication() {
  const token = localStorage.getItem('@petInfo:token');

  if (!token) {
    window.location.replace('../../index.html');
  }
}
authentication();

async function renderDashboard() {
  const user = await getUser();
  const feed = await getAllPosts();

  renderUserInfo(user);
  renderFeed(user, feed);
  showPostModal();
  showPublishModal();
  showDeleteModal();
}
renderDashboard();

function logout() {
  const createPostBtn = document.querySelector(
    '.nav__userContainer--createPostBtn'
  );
  const userBtn = document.querySelector('.nav__userContainer--avatar');
  const background = document.querySelector('.nav__userContainer--after');
  const logoutContainer = document.querySelector('.nav__userContainer--logout');
  const logoutBtn = document.querySelector('.userContainer__logout--button');

  userBtn.addEventListener('click', () => {
    setTimeout(() => {
      createPostBtn.classList.toggle('hidden');
      logoutContainer.classList.toggle('hidden');
      background.classList.toggle('hidden');
    }, 150);

    logoutBtn.addEventListener('click', () => {
      localStorage.clear();
      setTimeout(() => {
        window.location.replace('../../index.html');
      }, 500);
    });
  });
}
logout();

function showPublishModal() {
  const modalController = document.querySelector('.modal__controller');
  const createBtn = document.querySelector(
    '.nav__userContainer--createPostBtn'
  );
  const editPostBtns = document.querySelectorAll('.header__buttons--edit');

  createBtn.addEventListener('click', async () => {
    renderPublishModal();
    showModal();
    closeModal();
    const inputs = document.querySelectorAll('.post__input');

    const submitBtn = document.querySelector('.modal__container--publishBtn');
    submitBtn.addEventListener('click', async event => {
      event.preventDefault();
      const postBody = handlePublish();

      if (typeof postBody === 'object') {
        const loading = document.createElement('img');
        loading.src = '../assets/icons/spinner.svg';
        submitBtn.innerHTML = '';
        submitBtn.appendChild(loading);

        setTimeout(async () => {
          await createPost(postBody);
          submitBtn.innerHTML = 'Publicar';
          renderDashboard();
          modalController.close();
          inputs.forEach(input => {
            input.value = '';
          });
        }, 1000);
      }
    });
  });

  editPostBtns.forEach(button => {
    button.addEventListener('click', async event => {
      const postId = event.target.dataset.postId;
      const feed = await getAllPosts();
      const post = feed.find(post => post.id === postId);

      renderPublishModal(post);
      showModal();
      closeModal();
      const inputs = document.querySelectorAll('.post__input');

      const submitBtn = document.querySelector('.modal__container--publishBtn');
      submitBtn.addEventListener('click', async event => {
        event.preventDefault();
        const postBody = handlePublish();

        if (typeof postBody === 'object') {
          const loading = document.createElement('img');
          loading.src = '../assets/icons/spinner.svg';
          submitBtn.innerHTML = '';
          submitBtn.appendChild(loading);

          setTimeout(async () => {
            await updatePost(postId, postBody);
            submitBtn.innerHTML = 'Salvar Alterações';
            renderDashboard();
            modalController.close();
            inputs.forEach(input => {
              input.value = '';
            });
          }, 1000);
        }
      });
    });
  });
}

function handlePublish() {
  const inputs = document.querySelectorAll('.post__input');
  const newPost = {};

  inputs.forEach(input => {
    input.classList.remove('invalid');
    input.addEventListener('click', () => {
      inputs.forEach(input => {
        input.classList.remove('invalid');
      });
    });
  });

  for (let i = 0; i < inputs.length; i++) {
    let input = inputs[i];
    if (input.value === '') {
      return handlePublishError();
    } else {
      newPost[input.name] = input.value;
    }
  }
  return newPost;
}

function handlePublishError() {
  const inputs = document.querySelectorAll('.post__input');

  inputs.forEach(input => {
    input.classList.add('invalid');
  });
}

function showPostModal() {
  const openPostBtns = document.querySelectorAll(
    '.content__container--openPostBtn'
  );

  openPostBtns.forEach(button => {
    button.addEventListener('click', async event => {
      const postId = event.target.dataset.postId;
      const feed = await getAllPosts();
      const post = feed.find(post => post.id === postId);

      renderPostModal(post);
      showModal();
      closeModal();
    });
  });
}

function showDeleteModal() {
  const modalController = document.querySelector('.modal__controller');
  const deleteBtns = document.querySelectorAll('.header__buttons--delete');

  deleteBtns.forEach(button => {
    button.addEventListener('click', async event => {
      const postId = event.target.dataset.postId;

      renderDeleteModal();
      showModal();
      closeModal();

      const deleteBtn = document.querySelector('.modal__container--deleteBtn');
      deleteBtn.addEventListener('click', async () => {
        await deletePost(postId);

        renderDashboard();

        modalController.close();

        toastDashboard();
      });
    });
  });
}

function showModal() {
  const modalController = document.querySelector('.modal__controller');
  modalController.close();
  modalController.showModal();
}

function closeModal() {
  const modalController = document.querySelector('.modal__controller');
  const closeModal = document.querySelectorAll('.modal__exit');
  closeModal.forEach(button => {
    button.addEventListener('click', () => {
      modalController.close();
    });
  });
}
