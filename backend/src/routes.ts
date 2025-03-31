import {Router} from 'express';
import Puppeteer from './Puppeteer/buscaProdutos';
import ControllerPost from './Controllers/ControllersPost/ControllersPost';
import ControllerGet from './Controllers/ControllersGet/ControllersGet';
import ControllerPut from './Controllers/ControllersPut/ControllersPut';

const router = Router();

router.get('/BuscarProdutos', new Puppeteer().buscaProdutosConfiança)


router.post('/CadastroUsuarios', new ControllerPost().cadastro_Usuarios)
router.get('/BuscaUsuarios', new ControllerGet().BuscaUsuarios)
router.post('/BuscaUsuariosUnico/:id', new ControllerPost().BuscaUsuarioUnico)
router.put('/AlteraDadosUsuario/:id', new ControllerPut().AlteraDadosUsuario)

export default router;