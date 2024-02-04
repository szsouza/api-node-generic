import  Express  from 'express';
import userController from './controllers/userController';
import postController from './controllers/postController';

const app = Express();

app.use(Express.json());

const PORT = 8000;

app.get('/', (request, response) => {
  return response.send({message: 'hello'});
});

app.post('/createUser', userController.createUser);
app.post('/deleteUser', userController.DeleteUser);
app.post('/createPost', postController.createPost);
app.post('/deletePost', postController.DeletePost);

app.listen(PORT, () => {
  console.log('server is runing');
});
