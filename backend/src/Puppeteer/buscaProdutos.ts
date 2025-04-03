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

        const { nomeProduto } = req.body;

        const navegador = await puppeteer.launch();
        const pagina = await navegador.newPage();

        async function buscaDados() {
            const informacoesProduto = await pagina.waitForSelector('div.product-item-details');
            const produtoSite = await informacoesProduto!.evaluate(el => el.textContent);
            return String(produtoSite);
        }

        async function produtoEncontrado() {
            await new Promise((resolve) => setTimeout(resolve, 2000));
       
            return await pagina.$$eval("div.product-container", (itemDivs) => {
              return itemDivs.map((div) => {
                const imgElement = div.querySelector("img.product-image");
                const imageUrl = imgElement ? imgElement.getAttribute("src") : null;
       
                const titleElement = div.querySelector(
                  "span.livesearch.product-name"
                );
                const title = titleElement ? titleElement.textContent!.trim() : null;
       
                const priceElement = div.querySelector(
                  ".livesearch.product-price span"
                ); // Adicionamos o 'span' para selecionar o elemento correto
                const price = priceElement ? priceElement.textContent!.trim() : null;
       
                return { imageUrl, title, price };
              });
            });
          }
       
          async function buscaSimilares() {
            return await pagina.$$eval("div.product-container", (itemDivs) => {
              return itemDivs.map((div) => {
                const imgElement = div.querySelector("img.product-image");
                const imageUrl = imgElement ? imgElement.getAttribute("src") : null;
       
                const titleElement = div.querySelector(
                  "span.livesearch.product-name"
                );
                const title = titleElement ? titleElement.textContent!.trim() : null;
       
                const priceElement = div.querySelector(
                  ".livesearch.product-price span"
                ); // Adicionamos o 'span' para selecionar o elemento correto
                const price = priceElement ? priceElement.textContent!.trim() : null;
       
                return { imageUrl, title, price };
              });
            });
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

                return res.json({

                    dadosEncontrados: dadosEncontrados,
                    produtosSimilares: produtosSimilares

                })
            }
        }

        if (Object.keys(produtosSimilares).length > 0) {

            await navegador.close();
            return res.json({ produtosSimilares: produtosSimilares });

        } else {

            await navegador.close();
            return res.json("Nenhum produto localizado");
        }
    }

    async buscaProdutosPaoAcucar(req: Request, res: Response) {

        console.time("Execução");

        const { nomeProduto } = req.body;

        const navegador = await puppeteer.launch({ headless: false, devtools: true });
        const pagina = await navegador.newPage();

        async function buscaDados() {
            const informacoesProduto = await pagina.waitForSelector('.Top-sc-chotap-6 a');
            const produtoSite = await informacoesProduto!.evaluate(el => el.textContent);
            return String(produtoSite);
        }

        async function produtoEncontrado() {


            const resultado = await pagina.waitForSelector('.InnerContainer-sc-chotap-5 a .Text-sc-1uwpde0-7 a');
            const resultadoLink = await resultado!.evaluate(el => el.href);

            await pagina.goto(resultadoLink);

            //pausa de 2 segundos
            await new Promise(resolve => setTimeout(resolve, 2000));

            const imagemContainer = await pagina.locator('.Desktop-sc-1g5p14a-6 > img').waitHandle();
            const imagemProduto = await imagemContainer.evaluate(img => img.src);


            const produtoContainer = await pagina.locator('.BoxStyled-sc-iohoom-0 > h1').waitHandle();
            const nomeProduto = await produtoContainer.evaluate((el) => el.textContent);


            const valorContainer = await pagina.locator('.CurrentPrice-sc-17j9p6i-0 > p').waitHandle();
            const valorProduto = await valorContainer.evaluate((el => el.textContent));

            return ({

                nomeProduto: nomeProduto,
                valorProduto: valorProduto,
                imagemProduto: imagemProduto

            })
        }

        async function buscaSimilares() {
            await pagina.waitForSelector('div.CardSuggestion-sc-v5lr4f-1'); // Espera o container principal da sugestão aparecer

            const itemsData = await pagina.$$eval('div.CardSuggestion-sc-v5lr4f-1 .ListStyled-sc-chotap-0 > div.Container-sc-chotap-2', (productContainers) => {
                return productContainers.map(container => {
                    // Pegar a URL da imagem
                    const imgElement = container.querySelector('a > div > div > img.Image-sc-chotap-4');
                    const imageUrl = imgElement ? imgElement.getAttribute('src') : null;

                    // Pegar o título do produto
                    const titleElement = container.querySelector('.InnerContainer-sc-chotap-5 > a .Top-sc-chotap-6 span a');
                    const title = titleElement ? titleElement.textContent!.trim() : null;

                    // Pegar o preço do produto
                    const priceElement = container.querySelector('.InnerContainer-sc-chotap-5 > a .Middle-sc-chotap-7 .Price-sc-chotap-8 .MuiGrid-root p.LabelPrice-sc-1co9fex-0');
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
        await pagina.goto(`https://www.paodeacucar.com/`);
        await pagina.setViewport({ width: 1080, height: 1024 });
        let produtoConcatenado = "";

        let dadosEncontrados = {}
        let produtosSimilares = {}

        for (let contador = 0; contador < produtoArray.length; contador++) {
            produtoConcatenado += `${produtoArray[contador]} `;

            await pagina.locator('input#input-search').fill(produtoConcatenado);

            //pausa de 2 segundos
            await new Promise(resolve => setTimeout(resolve, 2000));

            const produtoSite = await buscaDados();
            const similaridade = stringSimilarity.compareTwoStrings(produtoConcatenado, produtoSite);

            console.log(similaridade)

            if (similaridade >= 0.40 && similaridade < 0.75) {

                produtosSimilares = await buscaSimilares()

            } else if (similaridade >= 0.75) {

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