const popupList = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup-profile');
const popupOpenClass = 'popup_opened';
const profileForm = document.querySelector('.popup__profile-form');
const popupFullSize = document.querySelector('.popup_fullsize');
const inputName = profileForm.querySelector('.popup__field_type_name');
const inputJob = profileForm.querySelector('.popup__field_type_job');
const popupAddCard = document.querySelector('.popup-add-card');
const newCardForm = popupAddCard.querySelector('.popup__newcard-form');
const cardName = popupAddCard.querySelector('.popup__field_newcard-name');
const cardAdress = popupAddCard.querySelector('.popup__field_newcard-adress');
const popupCloseBtnList = document.querySelectorAll('.popup__btn-close');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const newCardBtn = document.querySelector('.profile__add-btn');
const profileBtn = document.querySelector('.profile__edit-btn');
const galleryCards = document.querySelector('.gallery__cards');
const cardElement = document.querySelector('.popup__full-photo');
const figureCaption = document.querySelector('.popup__figcaption');
const galleryTemtpate = document.querySelector('.gallery__template').content;

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

function createCard(card) {
  const galleryItem = galleryTemtpate
    .querySelector('.gallery__item')
    .cloneNode(true);
  const galleryCard = galleryItem.querySelector('.gallery__img');
  galleryCard.src = card.link;
  galleryCard.alt = card.name;
  galleryItem.querySelector('.gallery__title').textContent = card.name;
  imgLike = galleryItem.querySelector('.gallery__like-btn');
  imgLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('gallery__like-btn_active');
  });

  galleryCard.addEventListener('click', function openFullPhoto() {
    cardElement.src = card.link;
    cardElement.alt = card.name;
    figureCaption.textContent = card.name;
    openPopup(popupFullSize);
  });
  deletBtn = galleryItem.querySelector('.gallery__delete-btn');
  deletBtn.addEventListener('click', removeCard);
  return galleryItem;
}

function renderCard(card) {
  galleryCards.prepend(card);
}

function initialPhoto() {
  const photoCards = initialCards.map(createCard);
  galleryCards.append(...photoCards);
}
initialPhoto();

function addNewCard(evt) {
  evt.preventDefault();
  const newCard = { name: cardName.value, link: cardAdress.value };
  renderCard(createCard(newCard));
  closePopup(popupAddCard);
  newCardForm.reset();
}

function removeCard(event) {
  const card = event.currentTarget.closest('.gallery__item');
  card.remove();
}

function openPopup(popup) {
  popup.classList.add(popupOpenClass);
  escHandler(popup);
  overlayHandler(popup);
  enableValidation(validationObj);
}

function escHandler(popup) {
  document.addEventListener(
    'keydown',
    function EscListner(evt) {
      if (evt.key === 'Escape') {
        closePopup(popup);
        console.log('Esc pushed');
      }
    },
    { once: true }
  );
} 

function closePopup(popup) {
  popup.classList.remove(popupOpenClass);
}

function handlerFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupProfile);
}

popupCloseBtnList.forEach((popupCloseButton) => {
  popupCloseButton.addEventListener('click', () =>
    closePopup(popupCloseButton.closest('.popup_opened'))
  );
});

function openProfilePopup() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openPopup(popupProfile);
}

function openNewCardPopup() {
  openPopup(popupAddCard);
}

function overlayHandler(popup) {
  popup.addEventListener('click', function (evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
}

profileBtn.addEventListener('click', openProfilePopup);
newCardBtn.addEventListener('click', openNewCardPopup);
profileForm.addEventListener('submit', handlerFormSubmit);
newCardForm.addEventListener('submit', addNewCard);
