import { Router } from 'express';
import { CreateUserController } from './useCases/createUser/CreateUserController';
import { AuthenticateUserController } from './useCases/authenticateUser/AthenticateUserController';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';

const router = Router();

const createUserController = new CreateUserController();
const authenticaUserController = new AuthenticateUserController();

router.post('/users', createUserController.handle);
router.post('/login', authenticaUserController.handle)

router.get('/courses', ensureAuthenticated, (request, response) => {
  return response.json([
    { id: 1, name: 'Rafael' },
    { id: 2, name: 'Bruno' },
    { id: 3, name: 'Carlos' },
    { id: 4, name: 'Jurandyr' },
    { id: 5, name: 'Carolyne' },
    { id: 6, name: 'Pedro' },
    { id: 7, name: 'Anna' },
    { id: 8, name: 'Janaina' },
  ]);
})

export { router }
