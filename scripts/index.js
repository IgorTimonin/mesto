const popupList = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup-profile');
const profileForm = document.querySelector('.popup__profile-form');
const popupPhotoView = document.querySelector('.popup__photo-view');
const inputName = profileForm.querySelector('.popup__field_type_name');
const inputJob = profileForm.querySelector('.popup__field_type_job');
const popupAddCard = document.querySelector('.popup-add-card');
const newCardForm = popupAddCard.querySelector('.popup__newcard-form');
const cardName = popupAddCard.querySelector('.popup__field_newcard-name');
const cardAdress = popupAddCard.querySelector('.popup__field_newcard-adress');
const closePopupBtnList = document.querySelectorAll('.popup__btn-close');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const newCardBtn = document.querySelector('.profile__add-btn');
const profileBtn = document.querySelector('.profile__edit-btn');
const galleryCards = document.querySelector('.gallery__cards');
const fullPhoto = document.querySelector('.popup__full-photo');
const figCaption = document.querySelector('.popup__figcaption');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

function addCard(card) {
  const galleryTemtpate = document.querySelector('.gallery__template').content;
  const galleryItem = galleryTemtpate
    .querySelector('.gallery__item')
    .cloneNode(true);

  const galleryImg = galleryItem.querySelector('.gallery__img');

  galleryImg.src = card.link;
  galleryImg.alt = card.name;
  galleryItem.querySelector('.gallery__title').textContent = card.name;

  imgLike = galleryItem.querySelector('.gallery__like-btn');
  imgLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('gallery__like-btn_active');
  });

  galleryImg.addEventListener('click', function fullPhotoOpen() {
    popupOpened(popupPhotoView);
    fullPhoto.src = card.link;
    fullPhoto.alt = card.name;
    figCaption.textContent = card.name;
  });
  deletBtn = galleryItem.querySelector('.gallery__delete-btn');
  deletBtn.addEventListener('click', removeCard);
  galleryCards.prepend(galleryItem);
}

initialCards.map(addCard);

function removeCard(event) {
  const card = event.currentTarget.closest('.gallery__item');
  card.remove();
}

function popupOpened(pop) {
  pop.classList.add('popup_opened');
}

function popupClosed(pop) {
  pop.classList.remove('popup_opened');
}

function profileOpen() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  popupOpened(popupProfile);
  
}

function NewCardOpen() {
  popupOpened(popupAddCard);
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  popupClosed(evt.target.closest('.popup_opened'));
}

function addCardHandler(evt) {
  evt.preventDefault();
  initialCards.unshift({ name: cardName.value, link: cardAdress.value });
  addCard(initialCards[0]);
  evt.currentTarget.reset();
  popupClosed(evt.target.closest('.popup_opened'));
}

closePopupBtnList.forEach((i) => {
  i.addEventListener('click', () => popupClosed(i.closest('.popup_opened')));
});

profileBtn.addEventListener('click', profileOpen);
newCardBtn.addEventListener('click', NewCardOpen);
profileForm.addEventListener('submit', formSubmitHandler);
newCardForm.addEventListener('submit', addCardHandler);
