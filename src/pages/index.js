import './index.css';
import validationObj from '../utils/constants'; 
import Card from '../components/Card.js';
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
const popupWithSubmit = document.querySelector('.popup-submit');
const submitBtn = popupWithSubmit.querySelector('.popup__form-submit');
const newCardForm = popupAddCard.querySelector('.popup__newcard-form');
const profileName = '.profile__name';
const profileJob = '.profile__job';
const newCardBtn = document.querySelector('.profile__add-btn');
const profileBtn = document.querySelector('.profile__edit-btn');
const profileImg = document.querySelector('.profile__avatar');
const popupAvatar = document.querySelector('.popup-avatar');
const avatarForm = popupAvatar.querySelector('.popup__avatar-form');
const galleryCards = document.querySelector('.gallery__cards');
const popupAvatarBtn = document.querySelector('.profile__avatar-btn');
const delBtnHidden = 'gallery__delete-btn_hidden';
const savingText = 'Сохранение...';
const galleryTemplate = document.querySelector('.gallery__template').content;
const apiUserUrl = 'https://nomoreparties.co/v1/cohort-41/users/me';
let userID = 'Новый ИД';

const userInfo = new UserInfo(
  { userName: profileName, userInfo: profileJob },
  profileImg
);
const popupUser = new PopupWithForm(popupProfile, userFormSubmit);
const addCard = new PopupWithForm(popupAddCard, newCardSubmit);
const fullPhoto = new PopupWithImage(popupFullSize);
const editAvatar = new PopupWithForm(popupAvatar, editAvatarSubmit);
const popupSubmit = new PopupWithSubmit(popupWithSubmit, submitBtn);
const api = new Api('https://mesto.nomoreparties.co/v1/cohort-41/cards', {
  authorization: '1958a966-a982-4094-8b61-ad54c8ab2b4e',
  'Content-Type': 'application/json',
});

//отрисовка данных пользователя и карточек
Promise.all([api.getUserData(apiUserUrl), api.getInitialCards()])
  .then(([userData, cardData]) => {
    userInfo.setAvatar(userData)
    userID = userInfo.getMyId(userData._id);
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
    });
    defaultCards.renderAll(cardData);
  })
  .catch((err) => console.log(err));

fullPhoto.setEventListeners();
popupUser.setEventListeners();
addCard.setEventListeners();
editAvatar.setEventListeners();
popupSubmit.setEventListeners();

//функция ожидания загрузки
function renderLoading(isLoading, btnObj) {
  if (isLoading) {
    btnObj.submitBtn.textContent = savingText;
  } else {
    btnObj.submitBtn.textContent = btnObj.btnText;
  }
}

//создание разметки карточки
const newCardMaker = (items) => {
  const cardData = {
    items,
    myID: userID,
    delBtn: delBtnHidden,
  };
  const card = new Card(
    {
      cardData,
      handleCardClick: () => {
        fullPhoto.open(items.link, items.name);
      },
      handleLikeClick: (card) => {
        api
          .likeSwitcher(items._id, card.isLiked())
          .then((res) => {
            card.updateLikes(res);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      handleDeleteIconClick: (cardElement) => {
        popupSubmit.open();
        popupSubmit.setActionSubmit = () => {
          const btnText = submitBtn.textContent;
          renderLoading(true, { btnText, submitBtn });
          api
            .deleteCard(items._id)
            .then(() => {
            card.deleteCard(cardElement);
            popupSubmit.close();
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              renderLoading(false, { btnText, submitBtn });
            });
        };
      },
    },
    galleryTemplate
  );
  const cardElement = card.generateCard();
  return cardElement;
};

const defaultCards = new Section(newCardMaker, galleryCards);

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
function newCardSubmit(cardObj) {
  const submitBtn = this.submitBtn;
  const btnText = submitBtn.textContent;
  renderLoading(true, { btnText, submitBtn });
  api
    .setNewCard(cardObj)
    .then((res) => {
      defaultCards.addItem(res);
      this.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, { btnText, submitBtn });
    });
}

//обработчик submit формы пользователя
function userFormSubmit(userData) {
  const submitBtn = this.submitBtn;
  const btnText = submitBtn.textContent;
  renderLoading(true, { btnText, submitBtn });
  api
    .setUserData(apiUserUrl, userData)
    .then(() => {
      this.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, { btnText, submitBtn });
    });
  userInfo.setUserInfo(userData);
}

//обработчик submit формы изменения аватара
function editAvatarSubmit(avatar) {
  const submitBtn = this.submitBtn;
  const btnText = submitBtn.textContent;
  renderLoading(true, { btnText, submitBtn });
  api
    .setUserAvatar(apiUserUrl, avatar.avatarLink)
    .then((res) => {
      userInfo.setAvatar(res);
      this.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, { btnText, submitBtn });
    });
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
