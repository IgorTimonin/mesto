import { initialCards } from '../components/initialCards.js';
import { Card } from '../components/card.js';
import { Section } from '../components/Section.js';
import { FormValidator } from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
const popupList = document.querySelectorAll('.popup');
// const popupSelector = document.querySelector('.popup');
const popupSelector = '.popup';
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

const popupForm = new PopupWithForm(popupProfile, handlerFormSubmit);

const AddCard = new PopupWithForm(popupAddCard, addNewCard);

const fullPhoto = new PopupWithImage(popupFullSize);

fullPhoto._setEventListeners();
popupForm._setEventListeners();
AddCard._setEventListeners();

profileBtn.addEventListener('click', () => {
  popupForm.open();
  formValidators[profileForm.name].resetValidation();
});

newCardBtn.addEventListener('click', () => {
  AddCard.open();
  formValidators[newCardForm.name].resetValidation();
});

function handleCardClick() {
    fullPhoto.open(this.src, this.alt);
}

function newCardMaker(items) {
    const card = new Card(items, galleryTemplate, handleCardClick);
    const cardElement = card._generateCard();
    return cardElement;
  }

function addNewCard() {
    const newCard = { name: cardName.value, link: cardAdress.value };
    const newSection = new Section(
      { items: newCard, renderer: newCardMaker },
      galleryCards
    );
    newSection.addItem(newCard);
    newCardForm.reset();
  }

const defaultCards = new Section({ items: initialCards, renderer: newCardMaker }, galleryCards);
defaultCards.renderAll();

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

// function closeByEscape(evt) {
//   if (evt.key === 'Escape') {
//     const openedPopup = document.querySelector('.' + popupOpenClass);
//     closePopup(openedPopup);
//   }
// }

function handlerFormSubmit() {
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
}