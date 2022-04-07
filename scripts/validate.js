const validationObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-submit',
  inactiveButtonClass: 'popup__form_submit_inactive',
  inputErrorClass: 'input_type_error',
  activeErrorClass: 'input-error_active',
};

  function enableValidation (
  {formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  activeErrorClass}
) {
   document.querySelectorAll(formSelector).forEach((formElement) => {

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
   inputList.forEach((inputElement) => {
     inputElement.addEventListener('input', () => {
       isValid(formElement, inputElement, inputErrorClass, activeErrorClass);
       toggleButtonState(inputList, buttonElement, inactiveButtonClass);
     });
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
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled', 'disabled');
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

enableValidation(validationObj);