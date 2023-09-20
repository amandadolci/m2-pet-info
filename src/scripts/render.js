// TOAST REGISTER
export function toastRegister(success, message = '') {
  const body = document.querySelector('body');
  const toastContainer = document.createElement('div');
  const toastTitle = document.createElement('span');
  const iconContainer = document.createElement('div');
  const icon = document.createElement('img');
  const titleMessage = document.createElement('h3');
  const toastMessage = document.createElement('p');
  const messageLink = document.createElement('a');

  toastContainer.classList.add('toast__container', 'toast__add');
  toastTitle.classList.add('toast__container--title');
  iconContainer.classList.add('toast__title--icon');
  titleMessage.classList.add('toast__title--h3');
  toastMessage.classList.add('toast__container--message');

  if (success) {
    iconContainer.classList.remove('toast__error--icon');
    titleMessage.classList.remove('toast__error--title');
    icon.src = '../assets/icons/check-solid.svg';
    titleMessage.innerText = 'Sua conta foi criada com sucesso!';
    toastMessage.innerHTML =
      'Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login: ';
    messageLink.href = '../../index.html';
    messageLink.innerText = 'Acessar página de login';
    toastMessage.appendChild(messageLink);
  } else {
    iconContainer.classList.add('toast__error--icon');
    titleMessage.classList.add('toast__error--title');
    icon.src = '../assets/icons/error.svg';
    titleMessage.innerText = 'Erro!';
    toastMessage.innerHTML = message;
  }
  iconContainer.appendChild(icon);
  toastTitle.append(iconContainer, titleMessage);
  toastContainer.append(toastTitle, toastMessage);
  body.appendChild(toastContainer);

  setTimeout(() => {
    toastContainer.classList.add('toast__remove');
  }, 5000); //3000

  setTimeout(() => {
    body.removeChild(toastContainer);
  }, 6990); //4990
}

// RENDER DASHBOARD
export function renderUserInfo(user) {
  const userAvatar = document.querySelector('.nav__userContainer--avatar');
  const username = document.querySelector('.userContainer__logout--username');

  userAvatar.src = user.avatar;
  username.innerText = `@${user.username}`;
}

export function renderFeed(user, feed) {
  const feedList = document.querySelector('.dashboard__container--feedList');
  feedList.innerHTML = '';

  feed.reverse();
  feed.forEach(post => {
    const postContainer = document.createElement('li');
    postContainer.classList.add('feedList__container--post');

    const headerContainer = document.createElement('div');
    headerContainer.classList.add('post__container--header');

    const headerInfo = document.createElement('div');
    headerInfo.classList.add('header__container--info');

    const infoUser = document.createElement('div');
    infoUser.classList.add('header__info--user');

    const userAvatar = document.createElement('img');
    userAvatar.classList.add('header__user--avatar');
    userAvatar.src = `${post.user.avatar}`;

    const userName = document.createElement('h4');
    userName.classList.add('header__user--name');
    userName.innerText = `@${post.user.username}`;

    const space = document.createElement('span');
    space.classList.add('header__info--space');
    space.innerText = '|';

    const date = document.createElement('small');
    date.classList.add('header__info--date');
    const options = { month: 'long', year: 'numeric' };
    // date.innerText = new Date(post.createdAt).toLocaleDateString(
    //   'pt-BR',
    //   options
    // );

    if (post.createdAt === '2023-03-16T19:24:42.665Z') {
      date.innerText = 'Outubro de 2022';
    } else if (post.createdAt === '2023-03-16T19:20:59.506Z') {
      date.innerText = 'Setembro de 2022';
    } else {
      date.innerText = new Date(post.createdAt).toLocaleDateString(
        'pt-BR',
        options
      );
    }

    const headerBtnsContainer = document.createElement('div');
    headerBtnsContainer.classList.add('header__container--buttons');

    const editBtn = document.createElement('button');
    editBtn.classList.add('header__buttons--edit');
    editBtn.innerText = 'Editar';
    editBtn.dataset.postId = post.id;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('header__buttons--delete');
    deleteBtn.innerText = 'Excluir';
    deleteBtn.dataset.postId = post.id;

    const postContentContainer = document.createElement('div');
    postContentContainer.classList.add('post__container--content');

    const postTitle = document.createElement('h1');
    postTitle.classList.add('content__container--title');
    postTitle.innerText = `${post.title}`;

    const postText = document.createElement('p');
    postText.classList.add('content__container--text');
    postText.innerText = `${post.content.substring(0, 145)}...`;

    const openPostBtn = document.createElement('button');
    openPostBtn.classList.add('content__container--openPostBtn');
    openPostBtn.innerText = 'Acessar Publicação';
    openPostBtn.dataset.postId = post.id;

    infoUser.append(userAvatar, userName);
    headerInfo.append(infoUser, space, date);

    if (user.id === post.user.id) {
      headerBtnsContainer.append(editBtn, deleteBtn);
    }

    headerContainer.append(headerInfo, headerBtnsContainer);
    postContentContainer.append(postTitle, postText, openPostBtn);
    postContainer.append(headerContainer, postContentContainer);
    feedList.appendChild(postContainer);
  });
}

//TOAST DASHBOARD
export function toastDashboard() {
  const body = document.querySelector('body');

  const toastContainer = document.createElement('div');
  toastContainer.classList.add('toast__container', 'toast__add');

  const toastTitle = document.createElement('span');
  toastTitle.classList.add('toast__container--title');

  const iconContainer = document.createElement('div');
  iconContainer.classList.add('toast__title--icon');

  const icon = document.createElement('img');
  icon.src = '../assets/icons/check-solid.svg';
  iconContainer.appendChild(icon);

  const titleMessage = document.createElement('h3');
  titleMessage.classList.add('toast__title--h3');
  titleMessage.innerText = 'Post deletado com sucesso!';
  toastTitle.append(iconContainer, titleMessage);

  const toastMessage = document.createElement('p');
  toastMessage.classList.add('toast__container--message');
  toastMessage.innerText =
    'O post selecionado para exclusão foi deletado e a partir de agora não aparecerá no seu feed.';

  toastContainer.append(toastTitle, toastMessage);
  body.appendChild(toastContainer);

  setTimeout(() => {
    toastContainer.classList.add('toast__remove');
  }, 3000);

  setTimeout(() => {
    body.removeChild(toastContainer);
  }, 4990);
}

// MODAL - DASHBOARD
export function renderPublishModal(post = '') {
  const modalController = document.querySelector('.modal__controller');
  modalController.innerHTML = '';

  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal__container');

  const modalHeaderContainer = document.createElement('div');
  modalHeaderContainer.classList.add('modal__container--header');

  const headerTitle = document.createElement('h1');
  headerTitle.classList.add('modal__header--title');
  headerTitle.innerText = 'Criando novo post';

  const closeModalBtn = document.createElement('button');
  closeModalBtn.classList.add('modal__header--closeBtn', 'modal__exit');
  closeModalBtn.innerText = 'X';
  modalHeaderContainer.append(headerTitle, closeModalBtn);

  const modalPublishContainer = document.createElement('form');
  modalPublishContainer.classList.add('modal__container--contentANDpublish');

  const publishContainerTitle = document.createElement('div');
  publishContainerTitle.classList.add('modal__publishContainer--title');

  const publishTitleLabel = document.createElement('label');
  publishTitleLabel.classList.add('publish__container--titleLabel');
  publishTitleLabel.innerText = 'Título do post';

  const publishTitleInput = document.createElement('input');
  publishTitleInput.classList.add(
    'publish__container--titleInput',
    'post__input'
  );
  publishTitleInput.name = 'title';
  publishTitleInput.placeholder = 'Digite o título aqui...';

  publishContainerTitle.append(publishTitleLabel, publishTitleInput);

  const publishContainerText = document.createElement('div');
  publishContainerText.classList.add('modal__publishContainer--text');

  const publishTextLabel = document.createElement('label');
  publishTextLabel.classList.add('publish__container--textLabel');
  publishTextLabel.innerText = 'Conteúdo do post';

  const publishTextInput = document.createElement('textarea');
  publishTextInput.classList.add(
    'publish__container--textInput',
    'post__input'
  );
  publishTextInput.name = 'content';
  publishTextInput.placeholder = 'Digite o conteúdo do post aqui...';
  publishTextInput.wrap = 'soft';

  publishContainerText.append(publishTextLabel, publishTextInput);

  const publishContainerButtons = document.createElement('div');
  publishContainerButtons.classList.add('publish__container--buttons');

  const cancelPublishBtn = document.createElement('button');
  cancelPublishBtn.classList.add('modal__container--cancelBtn', 'modal__exit');
  cancelPublishBtn.innerText = 'Cancelar';
  cancelPublishBtn.type = 'reset';

  const publishBtn = document.createElement('button');
  publishBtn.classList.add('modal__container--publishBtn');
  publishBtn.innerText = 'Publicar';

  publishContainerButtons.append(cancelPublishBtn, publishBtn);

  if (post) {
    headerTitle.innerText = 'Edição';
    publishTitleInput.value = post.title;
    publishTextInput.value = post.content;
    publishBtn.innerText = 'Salvar Alterações';
  }

  modalPublishContainer.append(
    publishContainerTitle,
    publishContainerText,
    publishContainerButtons
  );

  modalContainer.append(modalHeaderContainer, modalPublishContainer);

  modalController.appendChild(modalContainer);
}

export function renderPostModal(post) {
  const modalController = document.querySelector('.modal__controller');
  modalController.innerHTML = '';

  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal__container');

  const headerContainer = document.createElement('div');
  headerContainer.classList.add('modal__container--header');

  const headerInfo = document.createElement('div');
  headerInfo.classList.add('header__container--info');

  const infoUser = document.createElement('div');
  infoUser.classList.add('header__info--user');

  const userAvatar = document.createElement('img');
  userAvatar.classList.add('header__user--avatar');
  userAvatar.src = `${post.user.avatar}`;

  const userName = document.createElement('h4');
  userName.classList.add('header__user--name');
  userName.innerText = `@${post.user.username}`;

  const space = document.createElement('span');
  space.classList.add('header__info--space');
  space.innerText = '|';

  const date = document.createElement('small');
  date.classList.add('header__info--date');
  const options = { month: 'long', year: 'numeric' };
  // date.innerText = new Date(post.createdAt).toLocaleDateString(
  //   'pt-BR',
  //   options
  // );

  if (post.createdAt === '2023-03-16T19:24:42.665Z') {
    date.innerText = 'Outubro de 2022';
  } else if (post.createdAt === '2023-03-16T19:20:59.506Z') {
    date.innerText = 'Setembro de 2022';
  } else {
    date.innerText = new Date(post.createdAt).toLocaleDateString(
      'pt-BR',
      options
    );
  }

  const closeModalBtn = document.createElement('button');
  closeModalBtn.classList.add('modal__header--closeBtn', 'modal__exit');
  closeModalBtn.innerText = 'X';

  const postContentContainer = document.createElement('div');
  postContentContainer.classList.add('modal__container--contentANDpublish');

  const postTitle = document.createElement('h1');
  postTitle.classList.add('content__container--title');
  postTitle.innerText = `${post.title}`;

  const postText = document.createElement('p');
  postText.classList.add('content__container--text');
  postText.innerText = `${post.content}`;

  infoUser.append(userAvatar, userName);
  headerInfo.append(infoUser, space, date);

  headerContainer.append(headerInfo, closeModalBtn);
  postContentContainer.append(postTitle, postText);
  modalContainer.append(headerContainer, postContentContainer);
  modalController.appendChild(modalContainer);
}

export function renderDeleteModal() {
  const modalController = document.querySelector('.modal__controller');
  modalController.innerHTML = '';

  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal__container');

  const modalHeaderContainer = document.createElement('div');
  modalHeaderContainer.classList.add('modal__container--header');

  const headerTitle = document.createElement('h1');
  headerTitle.classList.add('modal__header--title');
  headerTitle.innerText = 'Confirmação de exclusão';

  const closeModalBtn = document.createElement('button');
  closeModalBtn.classList.add('modal__header--closeBtn', 'modal__exit');
  closeModalBtn.innerText = 'X';
  modalHeaderContainer.append(headerTitle, closeModalBtn);

  const modalContentContainer = document.createElement('div');
  modalContentContainer.classList.add('modal__container--contentANDpublish');

  const contentTitle = document.createElement('h1');
  contentTitle.classList.add('content__container--title');
  contentTitle.innerText = 'Tem certeza que deseja excluir este post?';

  const contentText = document.createElement('p');
  contentText.classList.add('content__container--text');
  contentText.innerText =
    'Essa ação não poderá ser desfeita, então pedimos que tenha cautela antes de concluir.';

  modalContentContainer.append(contentTitle, contentText);

  const modalButtonsContainer = document.createElement('div');
  modalButtonsContainer.classList.add('modal__container--buttons');

  const cancelModalBtn = document.createElement('button');
  cancelModalBtn.classList.add('modal__container--cancelBtn', 'modal__exit');
  cancelModalBtn.innerText = 'Cancelar';

  const deleteModalBtn = document.createElement('button');
  deleteModalBtn.classList.add('modal__container--deleteBtn');
  deleteModalBtn.innerText = 'Sim, excluir este post';

  modalButtonsContainer.append(cancelModalBtn, deleteModalBtn);

  modalContainer.append(
    modalHeaderContainer,
    modalContentContainer,
    modalButtonsContainer
  );
  modalController.appendChild(modalContainer);
}
