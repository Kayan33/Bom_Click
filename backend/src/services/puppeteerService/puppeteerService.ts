import puppeteer from "puppeteer";
import stringSimilarity from "string-similarity";

export class PuppeteerService {
    async buscaProdutosConfiança(nomeProduto: string, url: string) {

        const navegador = await puppeteer.launch();
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
            const nomeProduto = await produtoContainer.evaluate(el => el.textContent);

            const valorContainer = await pagina.locator('div.product-info__price').waitHandle();
            const valorProduto = await valorContainer.evaluate(el => el.textContent);

            return { nomeProduto, valorProduto, imagemProduto };
        }

        async function buscaSimilares() {
            return await pagina.$$eval('div.auto-suggest-item', itemDivs => {
                return itemDivs.map(div => {
                    const imgElement = div.querySelector('.auto-suggest-item__img img');
                    const imageUrl = imgElement ? imgElement.getAttribute('src') : null;
                    const infoElement = div.querySelector('.auto-suggest-item__info h4');
                    const title = infoElement ? infoElement.textContent!.trim() : null;
                    const priceElement = div.querySelector('.auto-suggest-item__price h2.price-current');
                    const price = priceElement ? priceElement.textContent!.trim() : null;
                    return { imageUrl, title, price };
                });
            });
        }

        let produtoConcatenado = "";
        let produtosSimilares = {};
        let dadosEncontrados = {};

        await pagina.goto(url);

        for (let palavra of nomeProduto.split(" ")) {
            produtoConcatenado += `${palavra} `;
            await pagina.locator('div.search-header > form > input').fill(produtoConcatenado);
            await new Promise(resolve => setTimeout(resolve, 2000));

            const produtoSite = await buscaDados();
            const similaridade = stringSimilarity.compareTwoStrings(produtoConcatenado, produtoSite);

            if (similaridade >= 0.40 && similaridade <= 0.60) {
                produtosSimilares = await buscaSimilares();
            } else if (similaridade >= 0.80) {
                dadosEncontrados = await produtoEncontrado();
                await navegador.close();

                return { dadosEncontrados, produtosSimilares };
            }
        }

        await navegador.close();
        return produtosSimilares;
    }

    async buscaProdutosTauste(nomeProduto: string, url: string) {

        const navegador = await puppeteer.launch();
        const pagina = await navegador.newPage();

        async function buscaDados() {
            const informacoesProduto = await pagina.waitForSelector('div.product-item-details');
            const produtoSite = await informacoesProduto!.evaluate(el => el.textContent);
            return String(produtoSite);
        }

        async function produtoEncontrado() {

            await new Promise(resolve => setTimeout(resolve, 2000));

            return await pagina.$$eval('div.product-container', itemDivs => {
                return itemDivs.map(div => {
                    const imgElement = div.querySelector('img.product-image');
                    const imageUrl = imgElement ? imgElement.getAttribute('src') : null;

                    const titleElement = div.querySelector('span.livesearch.product-name');
                    const title = titleElement ? titleElement.textContent!.trim() : null;

                    const priceElement = div.querySelector('.livesearch.product-price span'); // Adicionamos o 'span' para selecionar o elemento correto
                    const price = priceElement ? priceElement.textContent!.trim() : null;

                    return { imageUrl, title, price };
                });
            });
        }

        async function buscaSimilares() {

            return await pagina.$$eval('div.product-container', itemDivs => {
                return itemDivs.map(div => {
                    const imgElement = div.querySelector('img.product-image');
                    const imageUrl = imgElement ? imgElement.getAttribute('src') : null;

                    const titleElement = div.querySelector('span.livesearch.product-name');
                    const title = titleElement ? titleElement.textContent!.trim() : null;

                    const priceElement = div.querySelector('.livesearch.product-price span'); // Adicionamos o 'span' para selecionar o elemento correto
                    const price = priceElement ? priceElement.textContent!.trim() : null;

                    return { imageUrl, title, price };
                });
            });
        }

        let produtoConcatenado = "";
        let produtosSimilares = {};
        let dadosEncontrados = {};

        await pagina.goto(url);

        for (let palavra of nomeProduto.split(" ")) {
            produtoConcatenado += `${palavra} `;
            await pagina.locator('input#search').fill(produtoConcatenado);
            await new Promise(resolve => setTimeout(resolve, 2000));

            const produtoSite = await buscaDados();
            const similaridade = stringSimilarity.compareTwoStrings(produtoConcatenado, produtoSite);

            if (similaridade >= 0.40 && similaridade <= 0.60) {
                produtosSimilares = await buscaSimilares();
            } else if (similaridade >= 0.80) {
                dadosEncontrados = await produtoEncontrado();
                await navegador.close();
                return { dadosEncontrados, produtosSimilares };
            }
        }

        await navegador.close();
        return produtosSimilares;
    }
}

export default new PuppeteerService;
