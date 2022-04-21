
const popupList = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup-profile');
const profileForm = document.querySelector('.popup__profile-form');
const popupFullSize = document.querySelector('.popup_fullsize');
const inputName = profileForm.querySelector('.popup__field_type_name');
const inputJob = profileForm.querySelector('.popup__field_type_job');
const popupAddCard = document.querySelector('.popup-add-card');
const newCardForm = popupAddCard.querySelector('.popup__newcard-form');
const cardName = popupAddCard.querySelector('.popup__field_newcard-name');
const cardAdress = popupAddCard.querySelector('.popup__field_newcard-adress');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const newCardBtn = document.querySelector('.profile__add-btn');
const profileBtn = document.querySelector('.profile__edit-btn');
const galleryCards = document.querySelector('.gallery__cards');
const figureCaption = document.querySelector('.popup__figcaption');
const galleryTemplate = document.querySelector('.gallery__template').content;
const popupCloseBtn = 'popup__btn-close';
const popupSubmitClass = '.popup__form-submit';
const popupOpenClass = 'popup_opened';
// const container = galleryCards;
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

  function _renderCard(newCard) {
    const card = new Card(newCard, galleryTemplate);
    const cardElement = card._generateCard();
    galleryCards.prepend(cardElement);
}

initialCards.forEach((item) => {
  _renderCard(item, galleryTemplate);
});

function addNewCard(evt) {
  evt.preventDefault();
  const newCard = { name: cardName.value, link: cardAdress.value };
  const buttonElement = newCardForm.querySelector(popupSubmitClass);
  _renderCard(newCard);
  closePopup(popupAddCard);
  newCardForm.reset();
  btnDisabled(buttonElement, validationObj.inactiveButtonClass);
}

function removeCard(event) {
  const card = event.currentTarget.closest('.gallery__item');
  card.remove();
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.' + popupOpenClass);
    closePopup(openedPopup);
  }
}

function openPopup(popup) {
  popup.classList.add(popupOpenClass);
  document.addEventListener('keydown', closeByEscape);
} 

function closePopup(popup) {
  popup.classList.remove(popupOpenClass);
  document.removeEventListener('keydown', closeByEscape);
}

function handlerFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupProfile);
}

function openProfilePopup() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openPopup(popupProfile);
}

function openNewCardPopup() {
  openPopup(popupAddCard);
}

function closeByMousedown() {
  popupList.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains(popupOpenClass)) {
        closePopup(popup);
      }
      if (evt.target.classList.contains(popupCloseBtn)) {
        closePopup(popup);
      }
    });
  });
}

profileBtn.addEventListener('click', openProfilePopup);
newCardBtn.addEventListener('click', openNewCardPopup);
profileForm.addEventListener('submit', handlerFormSubmit);
newCardForm.addEventListener('submit', addNewCard);
closeByMousedown();