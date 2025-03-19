import puppeteer from "puppeteer";
import { Request, Response } from "express";
import stringSimilarity from "string-similarity";

class Puppeteer {

    async buscaProdutosConfiança(req: Request, res: Response) {
        console.time("Execução");
        const navegador = await puppeteer.launch({ headless: false, devtools: true });
        const pagina = await navegador.newPage();

        async function buscaDados() {
            console.log("Acessou");
            const informacoesProduto = await pagina.waitForSelector('div.auto-suggest-item__info');
            const produtoSite = await informacoesProduto!.evaluate(el => el.textContent);
            return String(produtoSite);
        }

        let produto = 'Costelão Tauste Temperado Bandeja 1500g';
        let produtoArray = produto.split(" ");
        await pagina.goto(`https://www.confianca.com.br/bauru/home`);
        await pagina.setViewport({ width: 1080, height: 1024 });
        let produtoConcatenado = "";

        for (let contador = 0; contador < produtoArray.length; contador++) {
            produtoConcatenado += `${produtoArray[contador]} `;
            console.log("TENTATIVA:", produtoConcatenado);
            await pagina.locator('div.search-header > form > input').fill(produtoConcatenado);

            //pausa de 2 segundos
            await new Promise(resolve => setTimeout(resolve, 2000));

            const produtoSite = await buscaDados();
            console.log("ENCONTRADO_SITE:", produtoSite);
            const similaridade = stringSimilarity.compareTwoStrings(produtoConcatenado, produtoSite);
            console.log("Similaridade:", similaridade);
            console.log(similaridade >= 0.60);

            if (similaridade >= 0.60) {
                const resultado = await pagina.waitForSelector('div.auto-suggest-item-container > a', { visible: true });
                resultado!.click();
                const imagemContainer = await pagina.locator('.Img__Wrapper img').waitHandle();
                const imagemProduto = await imagemContainer.evaluate((img => img.src));
                console.log(imagemProduto);
                const valorContainer = await pagina.locator('.product-info__price false').waitHandle();
                const valorProduto = await valorContainer.evaluate((el => el.textContent));
                console.log(valorProduto);
            }
        }
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