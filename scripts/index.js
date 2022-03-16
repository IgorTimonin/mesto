const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup-profile');
const popupAddCard = document.querySelector('.popup-add-card');
const closePopupBtn = document.querySelectorAll(".popup__btn-close");
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
const formElement = document.querySelector('.popup__profile-form');
let inputName = formElement.querySelector('.popup__field_type_name');
let inputJob = formElement.querySelector('.popup__field_type_job');
const likeBtn = document.querySelectorAll('.gallery__like-btn');
const newCardBtn = document.querySelector('.profile__add-btn');
const profileBtn = document.querySelector('.profile__edit-btn');

function popupOpened(popup) {
  popup.classList.add("popup_opened");
};

function popupClosed(popup) {
  popup.classList.remove("popup_opened");
  console.log("close!");
};

function profileOpen() {
  popupOpened(popupProfile);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
};

function NewCardOpen() {
  popupOpened(popupAddCard);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
};

function closePopup() {
  popupClosed.closest("popup_opened");
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
}
);

likeBtn.forEach((btn) => {
    btn.addEventListener("click", () =>
      btn.classList.toggle("gallery__like-btn_active")
    );
  }
  );

closePopupBtn.forEach((i) => {
  i.addEventListener("click", () => popupClosed(i.closest('.popup_opened')
  )
  );
}
);
 

profileBtn.addEventListener("click", profileOpen);
newCardBtn.addEventListener("click", NewCardOpen);
formElement.addEventListener('submit', formSubmitHandler);
