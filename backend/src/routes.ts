import {Router} from 'express';
import Puppeteer from './Puppeteer/buscaProdutos';

const router = Router();

router.get('/BuscarProdutos', new Puppeteer().buscaProdutosConfiança)

export default router;