import {Request, Response} from 'express';
import { prisma } from '../database';

export default{
  createPost, DeletePost
};


async function createPost(request: Request, response: Response){
  try {
    const { tittle,content, userId} = request.body;

    const post = await prisma.post.create(
      {
        data:
          {
            tittle,
            content,
            userId
          }
      });

    return response.json({
      error: false,
      message: 'post criado',
      post
    });
  } catch (error) {
    return response.json({message: error.message});
  }
}

async function DeletePost(request: Request, response:Response) {
  try {
    const {id} = request.body;

    const postExist = await prisma.post.findUnique({where: {id}});
    if(postExist) {
      const post = await prisma.post.delete({where: {id}});
      return response.json({
        error: false,
        message: 'post deletado',
        post
      });
    }
    return response.json({
      error: false,
      message: 'post nao encontrado'
    });
    
  } catch (error) {
    return response.json({message: error.message});
  }
    
}