import {Request, Response} from 'express';
import { prisma } from '../database';

export default{
  createUser, DeleteUser
};


async function createUser(request: Request, response: Response){
  try {
    const { nome, email} = request.body;
    const userExist = await prisma.user.findUnique({where: {email}});
    if(userExist) {
      return response.json({
        error: true, 
        message: 'usuario ja existe' 
      });
    }

    const user = await prisma.user.create(
      {
        data:
          {
            nome,
            email
          }
      });

    return response.json({
      error: false,
      message: 'usuario cadastrado com sucesso',
      user
    });
  } catch (error) {
    return response.json({message: error.message});
  }
}

async function DeleteUser(request: Request, response:Response) {
  try {
    const {id} = request.body;

    const userExist = await prisma.user.findUnique({where: {id}});
    if(userExist) {
      const user = await prisma.user.delete({where: {id}});
      return response.json({
        error: false,
        message: 'usuario deletado',
        user
      });
    }
    return response.json({
      error: false,
      message: 'usuario nao encontrado'
    });
    
  } catch (error) {
    return response.json({message: error.message});
  }
    
}