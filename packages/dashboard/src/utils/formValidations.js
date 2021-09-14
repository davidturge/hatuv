export const phone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
export const isNotEmpty = (value) => value.trim() !== '';
export const isEmail = (value) => value.includes('@');
