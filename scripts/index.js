const popup = document.querySelector('.popup');
const openPopup = document.querySelector('.profile__edit-btn');
const closePopup = popup.querySelector('.popup__btn-close');
let saveBtn = document.querySelector('.popup__btn-save');
let profileName = document.querySelector('.profile__name');
let profileOccupation = document.querySelector('.profile__occupation');
let inputName = document.querySelector('.popup__profile-name');
let inputOccupation = document.querySelector('.popup__profile-occupation');
let likeBtn = document.querySelectorAll('.gallery__like-btn');
let name = 'ВВедите имя';

function togglePopup() {
  popup.classList.toggle('popup_opened');
  inputName.value = profileName.textContent;
  inputOccupation.value = profileOccupation.textContent;
};

popup.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    togglePopup();
  }
});

openPopup.addEventListener('click', togglePopup);
closePopup.addEventListener('click', togglePopup);

function inputProfileInfo() {
  profileName.textContent = inputName.value;
  profileOccupation.textContent = inputOccupation.value;
  if (inputName.value.length < 1) {
    profileName.textContent = 'Неизвестный';
  }
  if (inputOccupation.value.length < 1) {
    profileOccupation.textContent = 'Чем вы занимаетесь?';
  }
  togglePopup();
};
saveBtn.addEventListener('click', inputProfileInfo);

for (let i = 0; i < likeBtn.length; i++) {
  likeBtn[i].onclick = function () {
    this.classList.toggle('gallery__like-btn_active');
  }
}
