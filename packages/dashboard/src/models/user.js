export const PermissionEnum = Object.freeze({
  SUPER_USER: 0,
  ACCOUNT_ADMIN: 1,
  GROUP_ADMIN: 2
});

class User {
  constructor(
    {
      accountId = '',
      email = '',
      firstName = '',
      lastName = '',
      groups = [],
      permission = PermissionEnum.GROUP_ADMIN
    }
  ) {
    this.accountId = accountId;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.groups = groups;
    this.permission = permission;
    this.createdOn = new Date();
    this.updatedOn = new Date();
  }

  get name() {
    return `${this.firstName} ${this.lastName}`;
  }
}

export default User;
