export const AccountTypeEnum = Object.freeze({
  0: 'regular'
});

class Account {
  constructor(
    {
      name,
      logo = '',
      groups = [],
      phone,
      mobile,
      type = 0,
      address = {
        city: '',
        houseNumber: '',
        street: ''
      }
    }
  ) {
    this.name = name;
    this.logo = logo;
    this.groups = groups;
    this.type = type;
    this.address = address;
    this.phone = phone;
    this.mobile = mobile;
    this.createdOn = new Date();
    this.updatedOn = new Date();
  }
}

export default Account;
