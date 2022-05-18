import './index.css';
import { initialCards } from '../components/initialCards.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
const popupProfile = document.querySelector('.popup-profile');
const profileForm = document.querySelector('.popup__profile-form');
const popupFullSize = document.querySelector('.popup_fullsize');
const popupAddCard = document.querySelector('.popup-add-card');
const newCardForm = popupAddCard.querySelector('.popup__newcard-form');
const profileName = '.profile__name';
const profileJob = '.profile__job';
const newCardBtn = document.querySelector('.profile__add-btn');
const profileBtn = document.querySelector('.profile__edit-btn');
const galleryCards = document.querySelector('.gallery__cards');
const galleryTemplate = document.querySelector('.gallery__template').content;
const validationObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-submit',
  inactiveButtonClass: 'popup__form_submit_inactive',
  inputErrorClass: 'input_type_error',
  activeErrorClass: 'input-error_active',
};

const userInfo = new UserInfo({ userName: profileName, userInfo: profileJob });
const popupUser = new PopupWithForm(popupProfile, userFormSubmit);
const addCard = new PopupWithForm(popupAddCard, newCardSubmit);
const fullPhoto = new PopupWithImage(popupFullSize);

fullPhoto.setEventListeners();
popupUser.setEventListeners();
addCard.setEventListeners();

function handleCardClick() {
  fullPhoto.open(this.src, this.alt);
}

//создание разметки карточки
function newCardMaker(items) {
  const card = new Card(items, galleryTemplate, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

//отрисовка дефолтных карточек
const defaultCards = new Section(
  { items: initialCards, renderer: newCardMaker },
  galleryCards
);
defaultCards.renderAll();

//наложение валидации на все формы
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

//обработчик submit формы добавления карточки
function newCardSubmit(CardObj) {
  defaultCards.addItem(CardObj);
}

//обработчик submit формы пользователя
function userFormSubmit(userData) {
  userInfo.setUserInfo(userData);
};

//открытие popup профайла пользователя
profileBtn.addEventListener('click', () => {
  popupUser.setInputValues(userInfo.getUserInfo());
  popupUser.open();
  formValidators[profileForm.name].resetValidation();
});

//открытие popup добавления карточки
newCardBtn.addEventListener('click', () => {
  newCardForm.reset();
  addCard.open();
  formValidators[newCardForm.name].resetValidation();
});