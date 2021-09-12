class TV {
  constructor(
    {
      name
    }
  ) {
    this.name = name;
    this.createdOn = new Date();
    this.updatedOn = new Date();
  }
}

export default TV;
