const { PrismaClient } = require( '@prisma/client' );

class UserController {

  get( request, response ) {
    const userRepo = require( "./respositorie/UserRepo" );

    try {
      return response.status( 200 ).json( {
        status : 201,
        message : 'Todos os usuários',
        data : userRepo.getAll(),
      } );
    } catch ( error ) {
      return response.status( 501 ).json( {
        message : 'Erro ao requisitar os usuário',
        status : 501,
      } );
    }
  }

  // TODO: create
  async create( request, response ) {
    try {
      const prisma = new PrismaClient();
      const { name, email, password, profile_picture, created_at, rule, status } = request.body;


      const user = await prisma.user.create( {
        data : {
          name,
          email,
          password,
          profile_picture,
          created_at,
          rule,
          status,
        },
      } );

      console.log( 'Created user:', user );

      response.status( 201 ).json( user );
    } catch ( error ) {
      console.error( 'Error creating user:', error );
      return response.status( 501 ).json( {
        message : 'Erro ao criar o usuário',
        status : 501,
      } );
    }
  }

  // TODO: update
  // TODO: delete
  // TODO: get single
}

module.exports = new UserController();
