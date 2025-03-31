import puppeteer from "puppeteer";
import { Request, Response } from "express";
import stringSimilarity from "string-similarity";

class Puppeteer {

    async buscaProdutosConfiança(req: Request, res: Response) {
        console.time("Execução");
        const navegador = await puppeteer.launch({ headless: false, devtools: true });
        const pagina = await navegador.newPage();

        async function buscaDados() {
            const informacoesProduto = await pagina.waitForSelector('div.auto-suggest-item__info');
            const produtoSite = await informacoesProduto!.evaluate(el => el.textContent);
            return String(produtoSite);
        }

        async function produtoEncontrado() {

            const resultado = await pagina.waitForSelector('div.auto-suggest-item-container > a');
            const resultadoLink = await resultado!.evaluate(el => el.href);

            await new Promise(resolve => setTimeout(resolve, 1000));
            await pagina.goto(resultadoLink);

            await new Promise(resolve => setTimeout(resolve, 2000));

            const imagemContainer = await pagina.locator('div.Img__Wrapper img').waitHandle();
            const imagemProduto = await imagemContainer.evaluate(img => img.src);

            const produtoContainer = await pagina.locator('div.product-info h2.heading-2').waitHandle();
            const nomeProduto = await produtoContainer.evaluate((el) => el.textContent);

            const valorContainer = await pagina.locator('div.product-info__price').waitHandle();
            const valorProduto = await valorContainer.evaluate((el => el.textContent));

            return ({

                nomeProduto: nomeProduto,
                valorProduto: valorProduto,
                imagemProduto: imagemProduto

            })
        }

        async function buscaSimilares() {

            const resultadosSimilares = pagina.locator('div.auto-suggest-item-container')

            const itemsData = await pagina.$$eval('div.auto-suggest-item', (itemDivs) => {
                // Esta função roda no navegador. 'itemDivs' é um array das divs encontradas.

                return itemDivs.map(div => {
                    // Para cada 'div.auto-suggest-item', encontramos os elementos internos.
                    // Usamos querySelector DENTRO da div atual.

                    // 1. Imagem (pegando o atributo 'src' da tag 'img')
                    const imgElement = div.querySelector('.auto-suggest-item__img img');
                    // NOTA: O 'src' aqui é relativo ("/ccstore/..."). Pode precisar ser combinado com o domínio base.
                    const imageUrl = imgElement ? imgElement.getAttribute('src') : null;

                    // 2. Informação (pegando o texto do 'h4')
                    const infoElement = div.querySelector('.auto-suggest-item__info h4');
                    const title = infoElement ? infoElement.textContent!.trim() : null;

                    // 3. Preço (pegando o texto do 'h2')
                    const priceElement = div.querySelector('.auto-suggest-item__price h2.price-current');
                    const price = priceElement ? priceElement.textContent!.trim() : null;

                    // Retornamos um objeto com os dados extraídos para este item

                    return {
                        imageUrl: imageUrl,
                        title: title,
                        price: price,
                    };

                });
            });
        }

        let produto = "Café 3 Corações Portinari Peneirando Café 1957 Pacote 250g";
        let produtoArray = produto.split(" ");
        await pagina.goto(`https://www.confianca.com.br/bauru/home`);
        await pagina.setViewport({ width: 1080, height: 1024 });
        let produtoConcatenado = "";

        let dadosEncontrados = {}
        let produtosSimilares

        for (let contador = 0; contador < produtoArray.length; contador++) {
            produtoConcatenado += `${produtoArray[contador]} `;
            console.log("TENTATIVA:", produtoConcatenado);
            await pagina.locator('div.search-header > form > input').fill(produtoConcatenado);

            //pausa de 2 segundos
            await new Promise(resolve => setTimeout(resolve, 2000));

            const produtoSite = await buscaDados();
            const similaridade = stringSimilarity.compareTwoStrings(produtoConcatenado, produtoSite);

            if (similaridade >= 0.40 && similaridade <= 0.60) {

                produtosSimilares = await buscaSimilares()

            }

            if (similaridade >= 0.80) {

                dadosEncontrados = await produtoEncontrado();
                produtosSimilares
                break

            }
        }

        console.log(dadosEncontrados)
        console.log(produtosSimilares)


        if ((Object.keys(dadosEncontrados).length > 0)) {

            console.log(dadosEncontrados)
            console.log(produtosSimilares)

            return {

                dadosEncontrados: dadosEncontrados,
                produtosSimilares: produtosSimilares
            }

        } else {

            console.log("Produto não encontrado")
            return `Produto não encontrado ${produtosSimilares}`
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