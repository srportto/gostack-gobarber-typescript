import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';


const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    try {

        const {email, password} = request.body;

        const authenticateUser = new AuthenticateUserService();


        const {user} = await authenticateUser.execute({email,password});

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.createdAt,
            updated_at: user.updateAt,
          };

      return response.json({user: userWithoutPassword} );

    } catch (err) {
        return response.status(400).json({ erro: err.message });
    }
});

export default sessionsRouter;
