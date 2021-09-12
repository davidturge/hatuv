class Group {
  constructor(
    {
      id = null,
      name = '',
      owner = '',
      accountId = '',
      tvs = [],
    }
  ) {
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.tvs = tvs || [];
    this.accountId = accountId;
    this.createdOn = new Date();
    this.updatedOn = new Date();
  }
}

export default Group;
