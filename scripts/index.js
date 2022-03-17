const popup = document.querySelectorAll('.popup');
const galleryImg = document.querySelectorAll(".gallery__img");
const popupProfile = document.querySelector('.popup-profile');
const profileForm = document.querySelector(".popup__profile-form");
const popupPhotoView = document.querySelector(".popup__photo-view");
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
    evt.target.classList.toggle("gallery__like-btn_active");
  });

  galleryCards.prepend(galleryItem);
  return addCard;
};

initialCards.map(addCard);

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

function profileOpen() {
  popupOpened(popupPhotoView);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
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
  // popupClosed(popup[0]);
  popupClosed(evt.target.closest(".popup_opened"));
};
// доделать позже - закрытие попапа при клике в любом месте

// popup.addEventListener('click', function (event) {  
//   if (event.target === event.currentTarget) {
//     popupClosed(popup);
//   }
// }
// );

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
