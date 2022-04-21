const validationObj = {
  // formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-submit',
  inactiveButtonClass: 'popup__form_submit_inactive',
  inputErrorClass: 'input_type_error',
  activeErrorClass: 'input-error_active',
};

class FormValidator {
  constructor(data, validElement) {
    this._formSelector = validElement;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._activeErrorClass = data.activeErrorClass;
    this._inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
  };
  //   enableValidation () {
  //    document.querySelectorAll(_formSelector).forEach((_formElement) => {

  //   const _inputList = Array.from(_formElement.querySelectorAll(_inputSelector));
  //   const buttonElement = _formElement.querySelector(_submitButtonSelector);
  //   toggleButtonState(_inputList, buttonElement, _inactiveButtonClass);
  //    _inputList.forEach((inputElement) => {
  //      inputElement.addEventListener('input', () => {
  //        isValid(_formElement, inputElement, _inputErrorClass, _activeErrorClass);
  //        toggleButtonState(_inputList, buttonElement, _inactiveButtonClass);
  //      });
  //    });
  //    });
  // };

  enableValidation = () => {
    document.querySelectorAll(_formSelector).forEach((_formElement) => {
      const _inputList = Array.from(
        _formElement.querySelectorAll(_inputSelector)
      );
      const buttonElement = _formElement.querySelector(_submitButtonSelector);
      toggleButtonState(_inputList, buttonElement, _inactiveButtonClass);
      _inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          isValid(
            _formElement,
            inputElement,
            _inputErrorClass,
            _activeErrorClass
          );
          toggleButtonState(_inputList, buttonElement, _inactiveButtonClass);
        });
      });
    });
  }

  _showInputError = (
    _formElement,
    inputElement,
    _inputErrorClass,
    _activeErrorClass
  ) => {
    const errorElement = _formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(_inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(_activeErrorClass);
  };

  _hideInputError = (
    _formElement,
    inputElement,
    _inputErrorClass,
    _activeErrorClass
  ) => {
    const errorElement = _formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(_inputErrorClass);
    errorElement.classList.remove(_activeErrorClass);
    errorElement.textContent = '';
  };

  _isValid = (
    _formElement,
    inputElement,
    _inputErrorClass,
    _activeErrorClass
  ) => {
    if (!inputElement.validity.valid) {
      showInputError(
        _formElement,
        inputElement,
        _inputErrorClass,
        _activeErrorClass
      );
    } else {
      hideInputError(
        _formElement,
        inputElement,
        _inputErrorClass,
        _activeErrorClass
      );
    }
  };

  _btnDisabled = (buttonElement, _inactiveButtonClass) => {
    buttonElement.classList.add(_inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  };

  _toggleButtonState = (_inputList, buttonElement, _inactiveButtonClass) => {
    if (hasInvalidInput(_inputList)) {
      btnDisabled(buttonElement, _inactiveButtonClass);
    } else {
      buttonElement.classList.remove(_inactiveButtonClass);
      buttonElement.removeAttribute('disabled', 'disabled');
    }
  };

  _hasInvalidInput = (_inputList) => {
    return _inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

};

enableValidation(validationObj, formSelector);