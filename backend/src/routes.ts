import {Router} from 'express';
import Puppeteer from './Puppeteer/buscaProdutos';
import ControllerPost from './Controllers/ControllersPost/ControllersPost';

const router = Router();

router.get('/BuscarProdutos', new Puppeteer().buscaProdutosConfiança)
router.post('/CadastroUsuarios', new ControllerPost().cadastro_Usuarios)

export default router;