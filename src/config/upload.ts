import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export default{
    // Avatars inseridos pelos usuários serão armazenados na aplicação
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'tmp'),
        filename(request, file, callback){
            const fileHash = crypto.randomBytes(10).toString('hex');
            const fileName = `${fileHash}-${file.originalname}`;

            return(callback(null, fileName));
        }
    })
}
