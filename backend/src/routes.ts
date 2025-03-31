import {Router} from 'express';
import Puppeteer from './Puppeteer/buscaProdutos';
import ControllerPost from './Controllers/ControllersPost/ControllersPost';
import ControllerGet from './Controllers/ControllersGet/ControllersGet';

const router = Router();

router.get('/BuscarProdutos', new Puppeteer().buscaProdutosConfiança)


router.post('/CadastroUsuarios', new ControllerPost().cadastro_Usuarios)
router.get('/BuscaUsuarios', new ControllerGet().BuscaUsuarios)

export default router;