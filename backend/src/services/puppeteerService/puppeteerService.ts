import puppeteer from "puppeteer";
import stringSimilarity from "string-similarity";

export class PuppeteerService {





async buscaProdutosConfiança(title: string, url: string) {
  const navegador = await puppeteer.launch({ headless: false, defaultViewport: null });
  const pagina = await navegador.newPage();
  await pagina.goto(url);

  function limparTitulo(titulo: string): string {
    const palavrasProibidas = [
      "unidade", "aproximadamente",
      "caixa", "embalagem", "unidades", "kg", "ml", "leve", "preço", "especial",
      "tablete", "vidro", "refil", "pacote", "sache", "garrafa", "rótulo",
    ];
    const regex = new RegExp(`\\b(${palavrasProibidas.join("|")})\\b`, "gi");
    return titulo.replace(regex, "").replace(/\s{2,}/g, " ").trim();
  }

  const tituloLimpo = limparTitulo(title);
  const palavras = tituloLimpo.split(" ");
  let produtosSimilares: any[] = [];
  let dadosEncontradosTemp: any = null;

  const inputSelector = "input.search-header__input";

  await pagina.waitForSelector(inputSelector, { timeout: 5000 });
  await pagina.locator(inputSelector).fill(tituloLimpo);
  await new Promise(resolve => setTimeout(resolve, 2000));

  for (let i = palavras.length; i > 0; i--) {
    const tentativa = palavras.slice(0, i).join(" ");
    await pagina.locator(inputSelector).fill(tentativa);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const encontrados = await pagina.$$eval("div.auto-suggest-item", (itemDivs) => {
      return itemDivs.map((div, index) => {
        const imgElement = div.querySelector(".auto-suggest-item__img img");
        const baseUrl = "https://www.confianca.com.br";
        const src = imgElement?.getAttribute("src") || "";
        let imageUrl = src.startsWith("http") ? src : baseUrl + src;
        imageUrl = imageUrl
          .replace(/height=\d+/i, "height=300")
          .replace(/width=\d+/i, "width=300");

        const infoElement = div.querySelector(".auto-suggest-item__info h4");
        const title = infoElement ? infoElement.textContent!.trim() : null;

        const priceElement = div.querySelector("h2.price-current");
        const price = priceElement ? priceElement.textContent!.trim() : null;

        return { id: index, imageUrl, title, price };
      });
    });

   if (encontrados.length === 1 && !dadosEncontradosTemp) {
  dadosEncontradosTemp = encontrados[0];
} else if (encontrados.length > 1) {
  if (!dadosEncontradosTemp) {
    dadosEncontradosTemp = encontrados[0];
    produtosSimilares = encontrados.slice(1);
  } else {
    const filtrados = encontrados.filter(p => p.title !== dadosEncontradosTemp.title);
    produtosSimilares = filtrados;
  }
  break;
}

  }

  await navegador.close();

  return {
    dadosEncontrados: dadosEncontradosTemp,
    produtosSimilares
  };
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



  async buscaProdutosPromocoes() {

    async function buscaDadosConfianca() {
      const navegador = await puppeteer.launch();
      const pagina = await navegador.newPage();
  
      await pagina.goto("https://www.confianca.com.br/bauru/home");
  
      const produtos = await pagina.$$eval('div.slick-track > div.slick-slide', (slides) => {
        return slides.map(slide => {
          try {
            const imgElement = slide.querySelector('div.slide a.product-shelf div.product-shelf__header div.product-shelf__img button img');
            let imageUrl = imgElement ? imgElement.getAttribute('src') : null;

            if (imageUrl && !imageUrl.startsWith('http')) {
                 imageUrl = `https://www.confianca.com.br${imageUrl}`;
                }

  
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
  
      const produtos = await pagina.$$eval('li.product-item', (slides) => {
        return slides.map(slide => {
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

    async function buscaPromoPaoDeAcucar() {
      const navegador = await puppeteer.launch();
      const pagina = await navegador.newPage();
  
      await pagina.goto("https://www.paodeacucar.com/especial/ofertasdodia-pao2023");
  
      const produtos = await pagina.$$eval("div.Card-sc-yvvqkp-0", (slides) => {
        return slides.map((slide) => {
          try {
            const imgElement = slide.querySelector("img");
            const imageUrl = imgElement?.getAttribute("src") || null;
    
            const titleElement = slide.querySelector("a[aria-label]");
            const title = titleElement?.getAttribute("title")?.trim() || null;
    
            const priceElement = slide.querySelector("p.PriceValue-sc-20azeh-4");
            const price = priceElement?.textContent?.trim() || null;
    
            return { imageUrl, title, price };
          } catch (error) {
            console.error("Erro ao extrair dados de um produto:", error);
            return null;
          }
        }).filter((item) => item !== null);
      });
      
  
      await navegador.close();
      return { PaoDeAcucar: produtos };
    }
  
    // Execução simultânea
    const [dadosConfianca, dadosTauste,dadosPaoDeAcucar] = await Promise.all([
      buscaDadosConfianca(),
      buscaDadosTauste(),
      buscaPromoPaoDeAcucar()
    ]);
  
    return {
      ...dadosConfianca,
      ...dadosTauste,
      ...dadosPaoDeAcucar
    };
  }
  

}

export default new PuppeteerService();
