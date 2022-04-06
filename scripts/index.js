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
const validationObj = {
  formSelector: '.popup__form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  activeErrorClass: 'form__input-error_active',
};
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
  pop.classList.add(popupOpenClass);
  escHandler(pop);
  overlayHandler(pop);
  enableValidation(validationObj);
}

function escHandler(popup) {
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  });
}

function closePopup(pop) {
  pop.classList.remove(popupOpenClass);
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

    function enableValidation({
      formSelector,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      activeErrorClass
    }) {
      const activePopup = document.querySelector(('.' + popupOpenClass));
      activePopup.querySelectorAll(formSelector).forEach((formElement) => {
        setEventListeners(
          formElement,
          inputSelector,
          submitButtonSelector,
          inactiveButtonClass,
          inputErrorClass,
          activeErrorClass
        );
      });
    };

const setEventListeners = (
  formElement,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  activeErrorClass
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement,inputErrorClass, activeErrorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  activeErrorClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(activeErrorClass);
};

const hideInputError = (
  formElement,
  inputElement,
  inputErrorClass,
  activeErrorClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(activeErrorClass);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement, inputErrorClass, activeErrorClass, ...rest) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      activeErrorClass
    );
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, activeErrorClass);
  }
};

function openProfilePopup() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openPopup(popupProfile);
}

function openNewCardPopup() {
  openPopup(popupAddCard);
}

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
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
