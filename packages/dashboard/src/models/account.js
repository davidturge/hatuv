export const AccountTypeEnum = Object.freeze({
  0: 'regular'
});

class Account {
  constructor(
    {
      id = null,
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
    this.id = id;
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
