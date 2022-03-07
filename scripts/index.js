const popup = document.querySelector('.popup');
const openPopup = document.querySelector('.profile__edit-btn');
const closePopup = popup.querySelector('.popup__btn-close');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let formElement = document.querySelector('.popup__profile-form');
let inputName = formElement.querySelector('.popup__field_type_name');
let inputJob = formElement.querySelector('.popup__field_type_job');

function popupOpened() {
  popup.classList.add("popup_opened");
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
};

function popupClosed() {
  popup.classList.remove("popup_opened");
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
  popupClosed();
};

popup.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    popupClosed();
  }
});

openPopup.addEventListener("click", popupOpened);
closePopup.addEventListener("click", popupClosed);
formElement.addEventListener('submit', formSubmitHandler);
