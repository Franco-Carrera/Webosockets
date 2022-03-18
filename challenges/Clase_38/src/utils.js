import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const hashPassword = (password) =>bcrypt.hashSync(password,bcrypt.genSaltSync(10));
export const isValidPassword = (password,user)=>bcrypt.compareSync(password,user.password)

export const cookieExtractor = req =>{
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['MVC_JWT_COOKIE'];
    }
    return token;
}
export default __dirname;