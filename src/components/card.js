export default class Card {
  constructor(
    { cardData, handleCardClick, handleLikeClick, handleDeleteIconClick },
    template) 
  {
    this._items = cardData.items;
    this._myID = cardData.myID;
    this._delBtnHidden = cardData.delBtn;
    this._name = this._items.name;
    this._image = this._items.link;
    this._likes = this._items.likes;
    this._ownerId = this._items.owner._id;
    this._imageId = this._items._id;
    this._galleryTemplate = template;
    this.handleCardClick = handleCardClick;
    this.handleLikeClick = handleLikeClick;
    this.handleDeleteIconClick = handleDeleteIconClick;

  }

  _getTemplate() {
    const _galleryItem = this._galleryTemplate
      .cloneNode(true)
      .querySelector('.gallery__item');
    return _galleryItem;
  }

  _setEventListeners() {
    const _imgLike = this._element.querySelector('.gallery__like-btn');
    _imgLike.addEventListener('click', this.handleLikeClick);
    this._galleryImg.addEventListener('click', this.handleCardClick);
    this._deleteBtn.addEventListener('click', this.handleDeleteIconClick);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._deleteBtn = this._element.querySelector('.gallery__delete-btn');
    if (this._myID === this._ownerId) {
      this._deleteBtn.classList.remove(this._delBtnHidden)
    };
    this._galleryImg = this._element.querySelector('.gallery__img');
    this._likesQty = this._element.querySelector('.gallery__like-qty');
    this._element.querySelector('.gallery__title').textContent = this._name;
    this._likesQty.textContent = this._likes.length;
    this._galleryImg.src = this._image;
    this._galleryImg.alt = this._name;
    this._setEventListeners();
    return this._element;
  }

  removeCard() {
    this._element.remove();
  }
};

// constructor(data, template, handleCardClick) {
//     this._name = data.name;
//     this._image = data.link;
//     this._likes = data.likes;
//     this._galleryTemplate = template;
//     this.handleCardClick = handleCardClick;
//   }

//   _getTemplate() {
//     const _galleryItem = this._galleryTemplate
//       .cloneNode(true)
//       .querySelector('.gallery__item');
//     return _galleryItem;
//   }

//   _setEventListeners() {
//     const _imgLike = this._element.querySelector('.gallery__like-btn');
//     _imgLike.addEventListener('click', () => {
//       _imgLike.classList.toggle('gallery__like-btn_active');
//     });
//     this._galleryImg.addEventListener('click', this.handleCardClick);
//     const _deleteBtn = this._element.querySelector('.gallery__delete-btn');
//     _deleteBtn.addEventListener('click', () => {
//       this._element.remove();
//     });
//   }

//   generateCard() {
//     this._element = this._getTemplate();
//     this._galleryImg = this._element.querySelector('.gallery__img');
//     this._likesQty = this._element.querySelector('.gallery__like-qty');
//     this._galleryImg.src = this._image;
//     this._galleryImg.alt = this._name;
//     this._likesQty.textContent = this._likes.length;
//     this._element.querySelector('.gallery__title').textContent = this._name;
//     this._setEventListeners();
//     return this._element;
//   }
// };