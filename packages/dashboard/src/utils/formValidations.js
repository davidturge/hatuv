export const phone = /^\+?(972|0)(-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/;
export const passwordStrength = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;
export const isNotEmpty = (value) => value.trim() !== '';
export const isEmail = (value) => value.includes('@');
