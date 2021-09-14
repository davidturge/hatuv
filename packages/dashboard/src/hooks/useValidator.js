import { useState } from 'react';

// const inputStateReducer = (state, action) => {
//   if (action.type === 'INPUT') {
//     return { value: action.value, isTouched: state.isTouched };
//   }
//   if (action.type === 'BLUR') {
//     return { isTouched: true, value: state.value };
//   }
//   if (action.type === 'RESET') {
//     return { isTouched: false, value: '' };
//   }
//   return inputStateReducer;
// };

const useValidator = (validations, value, callback) => {
  const initialInputState = {
    value,
    isTouched: false
  };

  const [inputState] = useState(initialInputState);

  const valueIsValid = validations.every((validator) => validator(inputState.value) === true);

  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    debugger;
    console.log(event.target.value);
    callback('name', event.target.value);

    // callback('name', event.target.value);
    // setInputState({ value: event.target.value, isTouched: true });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler
  };
};

export default useValidator;
