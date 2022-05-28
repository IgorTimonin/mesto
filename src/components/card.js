export default class Card {
  constructor(
    { cardData, handleCardClick, handleLikeClick, handleDeleteIconClick },
    template
  ) {
    this._items = cardData.items;
    this._myID = cardData.myID;
    this._delBtnHidden = cardData.delBtn;
    this._name = this._items.name;
    this._image = this._items.link;
    this._likes = this._items.likes;
    this._ownerId = this._items.owner._id;
    this._cardId = this._items._id;
    this._galleryTemplate = template;
    this.handleCardClick = handleCardClick;
    this.handleLikeClick = handleLikeClick;
    this.handleDeleteIconClick = handleDeleteIconClick;
    this._element = this._getTemplate();
    this._imgLike = this._element.querySelector('.gallery__like-btn');
  }

  _getTemplate() {
    const _galleryItem = this._galleryTemplate
      .cloneNode(true)
      .querySelector('.gallery__item');
    return _galleryItem;
  }

  getThisID() {
    return this._cardId;
  }

  isLiked = () => {
    return this._likes.some((liked) => liked._id == this._myID);
  };

  _setEventListeners() {
    this._imgLike.addEventListener('click', () => this.handleLikeClick(this));
    this._galleryImg.addEventListener('click', this.handleCardClick);
    this._deleteBtn.addEventListener('click', () => {
      this.handleDeleteIconClick(this._element);
    });
  }

  updateLikes(card) {
    this._likesQty.textContent = card.likes.length;
    this._likes = card.likes;
    if (this.isLiked()) {
      this._imgLike.classList.add('gallery__like-btn_active');
    } else {
      this._imgLike.classList.remove('gallery__like-btn_active');
    }
  }

  generateCard() {
    this._deleteBtn = this._element.querySelector('.gallery__delete-btn');
    if (this._myID === this._ownerId) {
      this._deleteBtn.classList.remove(this._delBtnHidden);
    }
    this._galleryImg = this._element.querySelector('.gallery__img');
    this._likesQty = this._element.querySelector('.gallery__like-qty');
    this._element.querySelector('.gallery__title').textContent = this._name;
    this._likesQty.textContent = this._likes.length;
    this._galleryImg.src = this._image;
    this._galleryImg.alt = this._name;
    this.updateLikes(this._items);
    this._setEventListeners();
    return this._element;
  }

  deleteCard = () => {
    this._element.remove();
  }
}
