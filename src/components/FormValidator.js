export default class FormValidator {
  constructor(data, form) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._activeErrorClass = data.activeErrorClass;
    this._formElement = form;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this.buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  enableValidation = () => {
    this._setEventListeners();
  };

  _setEventListeners = () => {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonState();
        this._isValid(inputElement);
      });
    });
  };

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._activeErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._activeErrorClass);
    errorElement.textContent = '';
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  btnDisabled() {
    this.buttonElement.classList.add(this._inactiveButtonClass);
    this.buttonElement.setAttribute('disabled', 'disabled');
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput(this._inputList)) {
      this.btnDisabled();
    } else {
      this.buttonElement.classList.remove(this._inactiveButtonClass);
      this.buttonElement.removeAttribute('disabled', 'disabled');
    }
  };
};