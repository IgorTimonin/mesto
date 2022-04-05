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

function openPopup(pop) {
  pop.classList.add('popup_opened');
  escHandler(pop);
  overlayHandler(pop);
}

function escHandler(popup) {
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  });
}

function closePopup(pop) {
  pop.classList.remove('popup_opened');
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

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__submit');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function openProfilePopup() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openPopup(popupProfile);
  setEventListeners(popupProfile);
}

function openNewCardPopup() {
  openPopup(popupAddCard);
  setEventListeners(popupAddCard);
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('form__submit_inactive');
  } else {
    buttonElement.classList.remove('form__submit_inactive');
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function overlayHandler(pop) {
  pop.addEventListener('click', function (evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(pop);
    }
  });
}

profileBtn.addEventListener('click', openProfilePopup);
newCardBtn.addEventListener('click', openNewCardPopup);
profileForm.addEventListener('submit', handlerFormSubmit);
newCardForm.addEventListener('submit', addNewCard);
