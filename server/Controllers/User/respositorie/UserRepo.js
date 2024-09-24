class UserRepo {

  constructor() {
    this.users = [
      {
        user_id : 1,
        name : "lorem",
        email : "lorem@lorem.com",
        password : "lorem",
        profilePicture : null,
        rule : "admin",
        createdAt : new Date(),
        updatedAt : new Date(),
        status : 1,
      },
      {
        user_id : 2,
        name : "lorem",
        email : "lorem@lorem.com",
        password : "lorem",
        profilePicture : null,
        rule : "admin",
        createdAt : new Date(),
        updatedAt : new Date(),
        status : 1,
      },
      {
        user_id : 3,
        name : "lorem",
        email : "lorem@lorem.com",
        password : "lorem",
        profilePicture : null,
        rule : "admin",
        createdAt : new Date(),
        updatedAt : new Date(),
        status : 1,
      }
    ];
  }

  getAll() {
    return this.users;
  }

}

module.exports = new UserRepo();
