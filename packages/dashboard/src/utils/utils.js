export const encrypt = (data) => btoa(JSON.stringify(data));
export const decrypt = (data) => JSON.parse(atob(data));
export const getInitials = (name = '') => name
  .replace(/\s+/, ' ')
  .split(' ')
  .slice(0, 2)
  .map((v) => v && v[0].toUpperCase())
  .join('');
