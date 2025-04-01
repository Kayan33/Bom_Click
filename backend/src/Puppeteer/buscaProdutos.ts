import puppeteer from "puppeteer";
import { Request, Response } from "express";
import stringSimilarity from "string-similarity";

class Puppeteer {

    async buscaProdutosConfiança(req: Request, res: Response) {
        console.time("Execução");

        const { nomeProduto, url } = req.body;

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

            await pagina.goto(resultadoLink);

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

            return itemsData
        }

        let produto = nomeProduto;
        let produtoArray = produto.split(" ");
        await pagina.goto(url);
        await pagina.setViewport({ width: 1080, height: 1024 });
        let produtoConcatenado = "";

        let dadosEncontrados = {}
        let produtosSimilares = {}

        for (let contador = 0; contador < produtoArray.length; contador++) {

            produtoConcatenado += `${produtoArray[contador]} `;

            await pagina.locator('div.search-header > form > input').fill(produtoConcatenado);

            //pausa de 2 segundos
            await new Promise(resolve => setTimeout(resolve, 2000));

            const produtoSite = await buscaDados();
            const similaridade = stringSimilarity.compareTwoStrings(produtoConcatenado, produtoSite);

            if (similaridade >= 0.40 && similaridade <= 0.60) {

                produtosSimilares = await buscaSimilares()

            } else if (similaridade >= 0.80) {

                dadosEncontrados = await produtoEncontrado();

                await navegador.close();
                console.timeEnd("Execução");

                return res.json({

                    dadosEncontrados: dadosEncontrados,
                    produtosSimilares: produtosSimilares

                })
            }
        }

        if (Object.keys(produtosSimilares).length > 0) {

            await navegador.close();
            console.timeEnd("Execução");

            return res.json({ produtosSimilares: produtosSimilares });

        } else {

            await navegador.close();
            console.timeEnd("Execução");
            return res.json("Nenhum produto localizado");
        }

    }

    async buscaProdutosTauste(req: Request, res: Response) {

        console.time("Execução");

        const { nomeProduto } = req.body;

        const navegador = await puppeteer.launch({ headless: false, devtools: true });
        const pagina = await navegador.newPage();

        async function buscaDados() {
            const informacoesProduto = await pagina.waitForSelector('div.product-item-details');
            const produtoSite = await informacoesProduto!.evaluate(el => el.textContent);
            return String(produtoSite);
        }

        async function produtoEncontrado() {

            const productNameElement = pagina.locator('span.livesearch.product-name');
            await productNameElement.click();

            //pausa de 2 segundos
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
            const itemsData = await pagina.$$eval('div.livesearch.products-container > div.livesearch.product-result > div.product-container', (productContainers) => {
                return productContainers.map(container => {
                    const imgElement = container.querySelector('.product-info .product-image');
                    const imageUrl = imgElement ? imgElement.getAttribute('src') : null;

                    const titleElement = container.querySelector('.product-info .product-item-details .livesearch.product-name');
                    const title = titleElement ? titleElement.textContent!.trim() : null;

                    const priceElement = container.querySelector('.product-info .product-item-details .livesearch.product-price span');
                    const price = priceElement ? priceElement.textContent!.trim() : null;

                    return {
                        imageUrl: imageUrl,
                        title: title,
                        price: price,
                    };
                });
            });
            return itemsData;
        }

        let produto = "Isotônico Gatorade Limão Frasco 500ml";
        let produtoArray = produto.split(" ");
        await pagina.goto(`https://tauste.com.br/bauru/`);
        await pagina.setViewport({ width: 1080, height: 1024 });
        let produtoConcatenado = "";

        let dadosEncontrados = {}
        let produtosSimilares = {}

        for (let contador = 0; contador < produtoArray.length; contador++) {
            produtoConcatenado += `${produtoArray[contador]} `;
            console.log("TENTATIVA:", produtoConcatenado);
            await pagina.locator('input#search').fill(produtoConcatenado);

            //pausa de 2 segundos
            await new Promise(resolve => setTimeout(resolve, 2000));

            const produtoSite = await buscaDados();
            const similaridade = stringSimilarity.compareTwoStrings(produtoConcatenado, produtoSite);

            if (similaridade >= 0.40 && similaridade <= 0.60) {

                produtosSimilares = await buscaSimilares()

            } else if (similaridade >= 0.80) {

                dadosEncontrados = await produtoEncontrado();

                await navegador.close();
                console.timeEnd("Execução");

                return res.json({

                    dadosEncontrados: dadosEncontrados,
                    produtosSimilares: produtosSimilares

                })
            }
        }

        if (Object.keys(produtosSimilares).length > 0) {

            await navegador.close();
            console.timeEnd("Execução");

            return res.json({ produtosSimilares: produtosSimilares });

        } else {

            await navegador.close();
            console.timeEnd("Execução");
            return res.json("Nenhum produto localizado");
        }


    }




}

export default Puppeteer;