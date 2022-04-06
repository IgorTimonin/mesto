const validationObj = {
  formSelector: '.popup__form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  activeErrorClass: 'form__input-error_active',
};

function enableValidation({formSelector, ...rest}) {
  const activePopup = document.querySelector('.' + popupOpenClass);
  activePopup.querySelectorAll(formSelector).forEach((formElement) => {
    setEventListeners(formElement, rest);
  });
}

const setEventListeners = (
  formElement,
  {inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  activeErrorClass}
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
   inputList.forEach((inputElement) => {
     inputElement.addEventListener('input', () => {
       isValid(formElement, inputElement, inputErrorClass, activeErrorClass);
       toggleButtonState(inputList, buttonElement, inactiveButtonClass);
     });
   });
};

const showInputError = (
  formElement,
  inputElement,
  inputErrorClass,
  activeErrorClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(activeErrorClass);
};

const hideInputError = (
  formElement,
  inputElement,
  inputErrorClass,
  activeErrorClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(activeErrorClass);
  errorElement.textContent = '';
};

const isValid = (
  formElement,
  inputElement,
  inputErrorClass,
  activeErrorClass,
) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputErrorClass,
      activeErrorClass
    );
  } else {
    hideInputError(
      formElement,
      inputElement,
      inputErrorClass,
      activeErrorClass
    );
  }
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};