import {Router} from 'express';
import Puppeteer from './Puppeteer/buscaProdutos';
import ControllerPost from './Controllers/ControllersPost/ControllersPost';
import ControllerGet from './Controllers/ControllersGet/ControllersGet';
import ControllerPut from './Controllers/ControllersPut/ControllersPut';
import ControllerDelete from './Controllers/ControllersDelete/ControllersDelete';
import { loginController } from './Controllers/LoginController/LoginController';

const router = Router();

router.get('/BuscarProdutos', new Puppeteer().buscaProdutosConfiança)


router.post('/CadastroUsuarios', new ControllerPost().cadastro_Usuarios)
router.get('/BuscaUsuarios', new ControllerGet().BuscaUsuarios)
router.post('/BuscaUsuariosUnico/:id', new ControllerPost().BuscaUsuarioUnico)
router.put('/AlteraDadosUsuario/:id', new ControllerPut().AlteraDadosUsuario)
router.delete('/DeletaUsuario/:id', new ControllerDelete().DeletarUsuarioUnico)

router.post('/loginUsuario', new loginController().loginUsuario)
router.get('/verificaTokenUsuario/:id', new loginController().verificaTokenUsuario)
export default router;