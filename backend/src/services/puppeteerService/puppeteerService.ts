import puppeteer from "puppeteer";
import stringSimilarity from "string-similarity";

export class PuppeteerService {

  async buscaProdutosConfiança(title: string, url: string) {
    const navegador = await puppeteer.launch();
    const pagina = await navegador.newPage();

    async function buscaDados() {
      const informacoesProduto = await pagina.waitForSelector(
        "div.auto-suggest-item__info"
      );

      if (informacoesProduto) {

        const produtoSite = await informacoesProduto.evaluate(
          (el) => el.textContent
        );
        return String(produtoSite);

      } else {

        return ""
      }
    }

    async function produtoEncontrado() {
      const resultado = await pagina.waitForSelector(
        "div.auto-suggest-item-container > a"
      );
      const resultadoLink = await resultado!.evaluate((el) => el.href);
      await pagina.goto(resultadoLink);

      const imagemContainer = await pagina
        .locator("div.Img__Wrapper img")
        .waitHandle();
      const imageUrl = await imagemContainer.evaluate((img) => img.src);

      const produtoContainer = await pagina
        .locator("div.product-info h2.heading-2")
        .waitHandle();
      const title = await produtoContainer.evaluate((el) => el.textContent);

      const valorContainer = await pagina
        .locator("div.product-info__price")
        .waitHandle();

      const priceString = await valorContainer.evaluate((el) => el.textContent);
      let finalPrice = null;

      if (priceString) {
        const prices = priceString.split('R$').map(p => p.trim()).filter(p => p !== '');
        if (prices.length >= 2) {
          finalPrice = 'R$ ' + prices[prices.length - 1]; // Pega o segundo preço
        } else if (prices.length === 1) {
          finalPrice = 'R$ ' + prices[0]; // Pega o primeiro preço
        }
        // Se prices.length for 0, finalPrice permanecerá null
      }

      return { imageUrl, title, price: finalPrice };
    }

    async function buscaSimilares() {
      return await pagina.$$eval("div.auto-suggest-item", (itemDivs) => {
        return itemDivs.map((div, index) => {
          const imgElement = div.querySelector(".auto-suggest-item__img img");
          const baseUrl = "https://www.confianca.com.br";
          const src = imgElement?.getAttribute("src") || "";
          const imageUrl = src.startsWith("http") ? src : baseUrl + src;
          const infoElement = div.querySelector(".auto-suggest-item__info h4");
          const title = infoElement ? infoElement.textContent!.trim() : null;
          const priceElement = div.querySelector(
            ".auto-suggest-item__price h2.price-current"
          );
          const price = priceElement ? priceElement.textContent!.trim() : null;
          return { id: index, imageUrl, title, price };
        });
      });
    }

    let produtoConcatenado = "";
    let produtosSimilares = {};
    let dadosEncontrados = {};

    await pagina.goto(url);

    for (let palavra of title.split(" ")) {
      produtoConcatenado += `${palavra} `;
      await pagina
        .locator("div.search-header > form > input")
        .fill(produtoConcatenado);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const produtoSite = await buscaDados();
      const similaridade = stringSimilarity.compareTwoStrings(
        produtoConcatenado,
        produtoSite
      );
      if (similaridade >= 0.4 && similaridade < 0.75) {
        produtosSimilares = await buscaSimilares();
      } else if (similaridade >= 0.75) {
        dadosEncontrados = await produtoEncontrado();
        await navegador.close();

        return { dadosEncontrados, produtosSimilares };
      }
    }

    await navegador.close();
    return { dadosEncontrados: null, produtosSimilares: [] };
  }

  async buscaProdutosTauste(title: string, url: string) {
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
        return itemDivs.map((div, index) => {
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

          return { id: index, imageUrl, title, price };
        });
      });
    }

    let produto = title;
    let produtoArray = produto.split(" ");
    await pagina.goto(url);
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

      if (similaridade >= 0.40 && similaridade < 0.75) {

        produtosSimilares = await buscaSimilares()

      } else if (similaridade >= 0.75) {

        dadosEncontrados = await produtoEncontrado();

        await navegador.close();

        return {

          dadosEncontrados: dadosEncontrados,
          produtosSimilares: produtosSimilares

        }
      }
    }

    await navegador.close();
    return { dadosEncontrados: null, produtosSimilares: [] };
  }

  async buscaProdutosPaoAcucar(title: string, url: string) {

    const navegador = await puppeteer.launch();
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

        title: nomeProduto,
        price: valorProduto,
        imageUrl: imagemProduto

      })
    }

    async function buscaSimilares() {
      await pagina.waitForSelector('div.CardSuggestion-sc-v5lr4f-1');

      const itemsData = await pagina.$$eval('div.CardSuggestion-sc-v5lr4f-1 .ListStyled-sc-chotap-0 > div.Container-sc-chotap-2', (productContainers) => {
        return productContainers.map((container, index) => {
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
            id: index,
            imageUrl: imageUrl,
            title: title,
            price: price,
          };
        });
      });
      return itemsData;
    }

    let produto = title;
    let produtoArray = produto.split(" ");
    await pagina.goto(url);
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

      if (similaridade >= 0.40 && similaridade < 0.75) {

        produtosSimilares = await buscaSimilares()

      } else if (similaridade >= 0.75) {

        dadosEncontrados = await produtoEncontrado();

        await navegador.close();
        return {

          dadosEncontrados: dadosEncontrados,
          produtosSimilares: produtosSimilares

        }
      }
    }
    await navegador.close();
    return { dadosEncontrados: null, produtosSimilares: [] };
  }

  async buscaProdutosMercados(title: string, urlConfianca: string, urlTauste: string, urlPaoAcucar: string) {
    const [produtosConfiança, produtosTauste, produtosPaoAcucar] = await Promise.all([
      this.buscaProdutosConfiança(title, urlConfianca),
      this.buscaProdutosTauste(title, urlTauste),
      this.buscaProdutosPaoAcucar(title, urlPaoAcucar)
    ]);

    function extraiListaProdutos(produtos: any) {
      return produtos.buscaTodosProdutos || []; // Pega só os produtos de 'BuscaTodosProdutos'
    }

    const listaConfiança = extraiListaProdutos(produtosConfiança);
    const listaTauste = extraiListaProdutos(produtosTauste);
    const listaPaoAcucar = extraiListaProdutos(produtosPaoAcucar);

    function intercalaProdutos(lista1: any[], lista2: any[], lista3: any[]) {
      const resultado = [];
      const maxLength = Math.max(lista1.length, lista2.length);
      for (let i = 0; i < maxLength; i++) {
        if (lista1[i]) resultado.push(lista1[i]);
        if (lista2[i]) resultado.push(lista2[i]);
        if (lista3[i]) resultado.push(lista3[i]);
      }
      return resultado;
    }

    return { produtos: intercalaProdutos(listaConfiança, listaTauste, listaPaoAcucar) };
  }

  async buscaProdutosPromocoes() {
    async function buscaDadosConfianca() {
      const navegador = await puppeteer.launch();
      const pagina = await navegador.newPage();
  
      await pagina.goto("https://www.confianca.com.br/bauru/home");
  
      const produtos = await pagina.$$eval('div.slick-track > div.slick-slide', (slides) => {
        return slides.map(slide => {
          try {
            const imgElement = slide.querySelector('div.slide a.product-shelf div.product-shelf__header div.product-shelf__img button img');
            const imageUrl = imgElement ? imgElement.getAttribute('src') : null;
  
            const titleElement = slide.querySelector('div.slide a.product-shelf article.product-shelf__info div h3.product-shelf__name');
            const title = titleElement ? titleElement.textContent : null;
  
            const currentPriceElement = slide.querySelector('div.slide a.product-shelf article.product-shelf__info div div.product-shelf__price.normal-price span.product-shelf__price-current');
            const price = currentPriceElement ? currentPriceElement.textContent : null;
  
            return { imageUrl, title, price };
          } catch (error) {
            console.error("Erro ao extrair dados de um slide:", error);
            return null;
          }
        }).filter(product => product !== null);
      });
  
      await navegador.close();
      return { Confianca: produtos };
    }
  
    async function buscaDadosTauste() {
      const navegador = await puppeteer.launch();
      const pagina = await navegador.newPage();
  
      await pagina.goto("https://tauste.com.br/bauru/");
  
      const produtos = await pagina.$$eval('li.product-item', (items) => {
        return items.map(slide => {
          try {
            const imgElement = slide.querySelector('img.product-image-photo');
            const imageUrl = imgElement?.getAttribute('src') || null;
      
            const titleElement = slide.querySelector('strong.product-item-name a');
            const title = titleElement?.textContent?.trim() || null;
      
            const priceElement = slide.querySelector('span.price');
            const price = priceElement?.textContent?.trim() || null;
      
            return { imageUrl, title, price };
          } catch (error) {
            console.error("Erro ao extrair dados de um produto:", error);
            return null;
          }
        }).filter(product => product !== null);
      });
      
  
      await navegador.close();
      return { Tauste: produtos };
    }
  
    // Execução simultânea
    const [dadosConfianca, dadosTauste] = await Promise.all([
      buscaDadosConfianca(),
      buscaDadosTauste()
    ]);
  
    return {
      ...dadosConfianca,
      ...dadosTauste
    };
  }
  

}

export default new PuppeteerService();
