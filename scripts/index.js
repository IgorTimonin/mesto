const popup = document.querySelector('.popup');
const openPopup = document.querySelector('.profile__edit-btn');
const closePopup = popup.querySelector('.popup_btn-close');
let profileName = document.querySelector('.profile__name')
let profileOccupation = document.querySelector('.profile__occupation')

function togglePopup() {
  popup.classList.toggle('popup__opened');
};

popup.addEventListener('click', function(event) {
  if (event.target === event.currentTarget) {
    togglePopup();
  }
});

openPopup.addEventListener('click', togglePopup);
closePopup.addEventListener('click', togglePopup);

