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

      if ( !name || !email || !password ) {
        return response.status( 400 ).json( {
          message : 'Todos os campos são obrigatórios',
          status : 400,
        } );
      }

      const userExist = await prisma.user.findUnique( {
        where : { email }
      } )
      if ( userExist ) {
        console.log( "adadsad" );
        return response.status( 409 ).json( {
          message : 'Email já cadastrado',
          status : 409,
        } );
      }

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

      response.status( 201 ).json( { message : "Usuário cadastrado", status : 201, user : { id : user.user_id } } );
    } catch ( error ) {
      console.error( 'Error creating user:', error );
      return response.status( 501 ).json( {
        message : 'Erro ao criar o usuário',
        status : 501,
      } );
    }
  }

  // TODO: update
  async update( request, response ) {
    try {
      const prisma = new PrismaClient();
      const user_id = parseInt(request.params.user_id);
      const { name, email, password, profile_picture, rule, status } = request.body;

      // Check if required fields are provided
      if ( !name || !email || !password ) {
        return response.status( 400 ).json( {
          message : 'All fields are required',
          status : 400,
        } );
      }

      // Check if user exists
      const existingUser = await prisma.user.findUnique( {
        where : {
          user_id : user_id,
        },
      } );

      if ( !existingUser ) {
        return response.status( 404 ).json( {
          message : 'User not found',
          status : 404,
        } );
      }

      // Update the user
      const updatedUser = await prisma.user.update( {
        where : {
          user_id: user_id
        },
        data : {
          name,
          email,
          password,
          profile_picture,
          rule,
          status,
        },
      } );

      return response.status( 200 ).json( {
        message : 'User updated successfully',
        status : 200,
        user : user_id
      } );

    } catch
      ( error ) {
      console.error( 'Error updating user:', error );
      return response.status( 501 ).json( {
        message : 'Erro ao atualizar o usuário',
        status : 501,
      } );
    }
  }


  // TODO: delete
  // TODO: get single
}

module
  .exports = new UserController();
