import './index.css';
import { initialCards } from '../components/initialCards.js';
import Card from '../components/Card.js';
import PopupAvatar from '../components/PopupAvatar';
import Api from '../components/Api';
import PopupWithSubmit from '../components/PopupWithSubmit';
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
const profileImg = document.querySelector('.profile__avatar');
const popupAvatar = document.querySelector('.popup__avatar');
const avatarForm = popupAvatar.querySelector('.popup__avatar-form');
const galleryCards = document.querySelector('.gallery__cards');
const popupAvatarBtn = document.querySelector('.profile__avatar-btn');
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
const editAvatar = new PopupAvatar(popupAvatar, editAvatarSubmit);
// const popupSubmit = new PopupWithSubmit(popup-submit,);
const api = new Api('https://mesto.nomoreparties.co/v1/cohort-41/cards', {
  authorization: '1958a966-a982-4094-8b61-ad54c8ab2b4e',
});


console.log(api.getInitialCards())

fullPhoto.setEventListeners();
popupUser.setEventListeners();
addCard.setEventListeners();
editAvatar.setEventListeners();
// popupSubmit.setEventListeners();

function handleCardClick() {
  fullPhoto.open(this.src, this.alt);
}

//создание разметки карточки
function newCardMaker(items) {
  const card = new Card(items, galleryTemplate, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

// отрисовка дефолтных карточек
// const defaultCards = new Section(
//   { items: api.getInitialCards().then, renderer: newCardMaker },
//   galleryCards
// );
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

//обработчик submit формы изменения аватара
function editAvatarSubmit() {
  console.log('avatar edit');
}

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

//открытие popup изменения Аватара
popupAvatarBtn.addEventListener('click', () => {
  avatarForm.reset();
  editAvatar.open();
  formValidators[avatarForm.name].resetValidation();
});

//отрисовка данных пользователя и карточек
Promise.all([api.getUserData()])
  .then((userData) => {
    console.log(userData);
    profileImg.src = userData[0].avatar;
      userInfo.setUserInfo({
        name: userData[0].name,
        about: userData[0].about,
      })
  })
  .catch((err) => console.log(err));

// function userDataHandler(profileImg) {
//   userInfo.setUserInfo(api.getUserData().then);
//   console.log(api.getUserData());
//   profileImg.src = api.getUserData.avatar;
  // profileName.textContent = api.getUserData().name;
  // profileJob.textContent = api.getUserData().about;
// }

// userDataHandler(profileImg);

//  this._avatar.src = result.avatar;
//  this._userName.textContent = result.name;
//  this._userJob.textContent = result.about;