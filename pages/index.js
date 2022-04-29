import { initialCards } from '../components/initialCards.js';
import { Card } from '../components/card.js';
import { Section } from '../components/Section.js';
import { FormValidator } from '../components/FormValidator.js';
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
const popupFullphoto = document.querySelector('.popup__full-photo');
const galleryTemplate = document.querySelector('.gallery__template').content;
const popupCloseBtn = 'popup__btn-close';
const popupOpenClass = 'popup_opened';
const validationObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-submit',
  inactiveButtonClass: 'popup__form_submit_inactive',
  inputErrorClass: 'input_type_error',
  activeErrorClass: 'input-error_active',
};

const InitialObj = {
  items: initialCards,
  renderer: function newCardMaker(items) {
    const card = new Card(items, galleryTemplate);
    const cardElement = card._generateCard();
    return cardElement;
  },
};

const formValidators = {};
const enableValidation = (validationObj) => {
  const formList = Array.from(
    document.querySelectorAll(validationObj.formSelector)
  );
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationObj, formElement);
    formValidators[formElement.name] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationObj);

// function newCardMaker(newCard) {
//   const card = new Card(newCard, galleryTemplate, openFullPhoto);
//   const cardElement = card._generateCard();
//   return cardElement;
// }

// function renderCard(newCard) {
//   galleryCards.prepend(newCardMaker(newCard));
// }

// initialCards.forEach((item) => {
//   renderCard(item);
// });

const defaultCards = new Section(InitialObj, galleryCards);
defaultCards.renderAll();

function addNewCard(evt) {
  evt.preventDefault();
  const newCard = { name: cardName.value, link: cardAdress.value };
  renderCard(newCard);
  closePopup(popupAddCard);
  newCardForm.reset();
}

// function closeByEscape(evt) {
//   if (evt.key === 'Escape') {
//     const openedPopup = document.querySelector('.' + popupOpenClass);
//     closePopup(openedPopup);
//   }
// }

function openPopup(popup) {
  popup.classList.add(popupOpenClass);
  document.addEventListener('keydown', closeByEscape);
}

function openFullPhoto(image, name) {
  popupFullphoto.src = image;
  popupFullphoto.alt = name;
  figureCaption.textContent = name;
  openPopup(popupFullSize);
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
  formValidators[profileForm.name].resetValidation();
  openPopup(popupProfile);
}

function openNewCardPopup() {
  newCardForm.reset();
  formValidators[newCardForm.name].resetValidation();
  openPopup(popupAddCard);
}

// function closeByMousedown() {
//   popupList.forEach((popup) => {
//     popup.addEventListener('mousedown', (evt) => {
//       if (evt.target.classList.contains(popupOpenClass)) {
//         closePopup(popup);
//       }
//       if (evt.target.classList.contains(popupCloseBtn)) {
//         closePopup(popup);
//       }
//     });
//   });
// }

profileBtn.addEventListener('click', openProfilePopup);
newCardBtn.addEventListener('click', openNewCardPopup);
profileForm.addEventListener('submit', handlerFormSubmit);
newCardForm.addEventListener('submit', addNewCard);
closeByMousedown();
