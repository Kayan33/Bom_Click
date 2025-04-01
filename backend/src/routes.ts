import {Router} from 'express';
import Puppeteer from './Puppeteer/buscaProdutos';
import ControllerPost from './Controllers/ControllersPost/ControllersPost';
import ControllerGet from './Controllers/ControllersGet/ControllersGet';
import ControllerPut from './Controllers/ControllersPut/ControllersPut';
import ControllerDelete from './Controllers/ControllersDelete/ControllersDelete';
import LoginController from './Controllers/LoginController/LoginController';
import { estaAutenticado } from './middleware/estaAutenticado';

const router = Router();

router.get('/BuscarProdutosConfianca', new Puppeteer().buscaProdutosConfiança)

router.get('/BuscarProdutosTauste', new Puppeteer().buscaProdutosTauste)



router.post('/CadastroUsuarios', new ControllerPost().cadastro_Usuarios)
router.get('/BuscaUsuarios', new ControllerGet().BuscaUsuarios)
router.post('/BuscaUsuariosUnico/:id', new ControllerPost().BuscaUsuarioUnico)
router.put('/AlteraDadosUsuario/:id', new ControllerPut().AlteraDadosUsuario)
router.delete('/DeletaUsuario/:id', new ControllerDelete().DeletarUsuarioUnico)

router.post('/loginUsuario', new LoginController().loginUsuario)
router.get('/verificaTokenUsuario', estaAutenticado,new LoginController().verificaTokenUsuario)
export default router;