import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

// Ponteiro de rotas
const usersRouter = Router();

// Instância do multer com configurações de upload
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    try {
        const {name, email, password} = request.body;

        const createUser = new CreateUserService();

        const newUser = await createUser.execute({name, email, password});

        // Password deletado para não ser impresso na tela
        delete newUser.password;

        return response.json(newUser);
    } catch(err) {
        return response.status(400).json({error: err.message});
    }
});

// O middleware de autenticação de usuário está sendo utilizado nesta rota para
// garantir que somente um usuário autenticado seja capaz de atualizar o seu avatar
usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        try{
            const updateUserAvatar = new UpdateUserAvatarService();

            const user = await updateUserAvatar.execute({
                user_id: request.user.id,
                avatarFileName: request.file.filename
            });

            delete user.password;

            return response.json(user);
        } catch(err){
            return response.status(400).json({error: err.message});
        }
});

export default usersRouter;
