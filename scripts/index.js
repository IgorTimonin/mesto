const popup = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup-profile');
const profileForm = document.querySelector(".popup__profile-form");
const popupPhotoView = document.querySelector('.popup-photo-view');
let inputName = profileForm.querySelector(".popup__field_type_name");
let inputJob = profileForm.querySelector(".popup__field_type_job");
const popupAddCard = document.querySelector('.popup-add-card');
const newCardForm = popupAddCard.querySelector(".popup__newcard-form");
let cardName = popupAddCard.querySelector(".popup__field_newcard-name");
let cardAdress = popupAddCard.querySelector(".popup__field_newcard-adress");
const closePopupBtn = document.querySelectorAll(".popup__btn-close");
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
const newCardBtn = document.querySelector('.profile__add-btn');
const profileBtn = document.querySelector('.profile__edit-btn');
const galleryCards = document.querySelector('.gallery__cards');
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
]; 
1
function addCard(card) {
  const galleryTemtpate = document.querySelector(".gallery__template").content;
  const galleryItem = galleryTemtpate
    .querySelector(".gallery__item")
    .cloneNode(true);

  galleryItem.querySelector(".gallery__img").src = card.link;
  galleryItem.querySelector(".gallery__img").alt = card.name;
  galleryItem.querySelector(".gallery__title").textContent = card.name;
  
  imgLike = galleryItem.querySelector(".gallery__like-btn");
  imgLike.addEventListener("click", function (evt) {
    evt.target.classList.toggle("gallery__like-btn_active")}); 
  
  galleryImgBtn = galleryItem.querySelector(".gallery__img");
  galleryImgBtn.addEventListener("click",  function fullPhotoOpen() {
  popupOpened(popupPhotoView);
  fullPhoto = document.querySelector(".popup__full-photo");
  fullPhoto.src = card.link;
  fullPhoto.alt = card.name;
  figCaption = document.querySelector(".popup__figcaption");
  figCaption.textContent = card.name;
  });
  deletBtn = galleryItem.querySelector(".gallery__delete-btn");
  deletBtn.addEventListener("click", removeCard);

  galleryCards.prepend(galleryItem);
  return addCard;
};

initialCards.map(addCard);

function removeCard(event) {
 const card = event.currentTarget.closest(".gallery__item");
 card.remove();
};

function popupOpened(pop) {
  pop.classList.add("popup_opened");
};

function popupClosed(pop) {
  pop.classList.remove("popup_opened");
};

function profileOpen() {
  popupOpened(popupProfile);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
};

function NewCardOpen() {
  popupOpened(popupAddCard);
};

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  if (inputName.value.length < 1) {
    profileName.textContent = 'Неизвестный';
  }
  if (inputJob.value.length < 1) {
    profileJob.textContent = 'Чем вы занимаетесь?';
  }
  popupClosed(evt.target.closest(".popup_opened"));
};

function addCardHandler(evt) {
  evt.preventDefault();
  initialCards.unshift({ name: cardName.value, link: cardAdress.value });
  addCard(initialCards[0]);
  evt.currentTarget.reset();
  popupClosed(evt.target.closest(".popup_opened"));
};

closePopupBtn.forEach((i) => {
  i.addEventListener("click", () => popupClosed(i.closest(".popup_opened")));
}
);

profileBtn.addEventListener("click", profileOpen);
newCardBtn.addEventListener("click", NewCardOpen);
profileForm.addEventListener('submit', formSubmitHandler);
newCardForm.addEventListener("submit", addCardHandler);
