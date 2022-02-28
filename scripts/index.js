const popup = document.querySelector('.popup');
const openPopup = document.querySelector('.profile__edit-btn');
const closePopup = popup.querySelector('.popup__btn-close');
const likeBtn = document.querySelectorAll('.gallery__like-btn')
const saveBtn = document.querySelector('.popup__btn-save');
let profileName = document.querySelector('.profile__name')
let profileOccupation = document.querySelector('.profile__occupation')
let inputName = document.querySelector('.popup__profile-name')
let inputOccupation = document.querySelector('.popup__profile-occupation')

function togglePopup() {
  popup.classList.toggle('popup__opened');
  inputName.value = profileName.textContent;
  inputOccupation.value = profileOccupation.textContent;
};

popup.addEventListener('click', function(event) {
  if (event.target === event.currentTarget) {
    togglePopup();
  }
});

openPopup.addEventListener('click', togglePopup);
closePopup.addEventListener('click', togglePopup);

function inputProfileInfo() {
  profileName.textContent = inputName.value;
  profileOccupation.textContent = inputOccupation.value;
};
saveBtn.addEventListener('click', inputProfileInfo);

// function toggleLike() {
//   console.log('Like click!');
//   likeBtn.classList.toggle('gallery__like-btn_active');
// };

// likeBtn.addEventListener('click', toggleLike);


