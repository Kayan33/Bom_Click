import puppeteer from "puppeteer";
import { Request, Response } from "express";
import stringSimilarity from "string-similarity";

class Puppeteer {

    async buscaProdutosConfiança(req: Request, res: Response) {

        console.time("Execução");
        //const { produto } = req.body;
        const navegador = await puppeteer.launch({ headless: false, devtools: true });
        const pagina = await navegador.newPage();

        const produto = 'Frango a passarinho';
        console.log(produto.split(" "));

        await pagina.goto(`https://www.confianca.com.br/bauru/home`)

        await pagina.setViewport({ width: 1080, height: 1024 });

        for(let contador = 0; contador < produto.length; contador++){

            produto[contador--] + produto[contador]
        }

        await pagina.locator('div.search-header > form > input').fill(produto);

        const caixaSugestao = await pagina.locator('.auto-suggest-item-container').waitHandle();

        const informacoesProduto = await pagina.locator('.auto-suggest-item__info').waitHandle();

        const nomeProduto = String(await informacoesProduto.evaluate(el => el.textContent)); 

        const similaridade = stringSimilarity.compareTwoStrings(produto, nomeProduto);
        console.log("Similaridade:", similaridade);


        // // Wait and click on first result.
        // await page.locator('.devsite-result-item-link').click();

        // // Locate the full title with a unique string.
        // const textSelector = await page
        //     .locator('text/Customize and automate')
        //     .waitHandle();
        // const fullTitle = await textSelector?.evaluate(el => el.textContent);

        // // Print the full title.
        // console.log('The title of this blog post is "%s".', fullTitle);

        // await browser.close();

        // console.timeEnd("Execução");

    }

    async buscaProdutosTauste(req: Request, res: Response) {

        console.time("Execução");
        const { url, produto } = req.body;
        const browser = await puppeteer.launch({ headless: false, devtools: true });
        const page = await browser.newPage();

        await page.goto(`https://www.confianca.com.br/bauru/home`)

        await page.setViewport({ width: 1080, height: 1024 });

        // Type into search box.
        await page.locator('.search-header__input').fill('Frango a milanesa bife 470g');

        // // Wait and click on first result.
        // await page.locator('.devsite-result-item-link').click();

        // // Locate the full title with a unique string.
        // const textSelector = await page
        //     .locator('text/Customize and automate')
        //     .waitHandle();
        // const fullTitle = await textSelector?.evaluate(el => el.textContent);

        // // Print the full title.
        // console.log('The title of this blog post is "%s".', fullTitle);

        // await browser.close();

        // console.timeEnd("Execução");

    }




}

export default Puppeteer;

