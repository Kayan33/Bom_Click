import "./header_home.css";
import logo from "../../imagens/bomClick.svg";
import carrinho from "../../imagens/carrinho.svg";
import perfil from "../../imagens/perfil.svg";
import { Link } from "react-router-dom";
import confiancaLogo from "../../imagens/confiancaLogo.png";
import panelaoLogo from "../../imagens/panelaoLogo.png";
import paodeacucarLogo from "../../imagens/logo-pao-de-acucar.jpg";
import tausteLogo from "../../imagens/tausteLogo.png";
import { produtos } from "../../data/produtos.js";
import { useState, useEffect, useRef } from "react";
import ModalSimilares from "../../components/modalSimilares/modalSimilares.js";
import api from "../../services/api.js";
import Loading from "../compraFinalizada/Loading.js";

function HomeScreen() {
  const [cartCount, setCartCount] = useState(0);
  const [produtosComparacao, setProdutosComparacao] = useState([]);
  const [produtosSimilares, setProdutosSimilares] = useState([]);
  const [produtosPromo, setProdutosPromo] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
 

  const [setorSelecionado, setSetorSelecionado] = useState("Frios");
  const [mercadoSelecionado, setMercadoSelecionado] = useState("Confiança");
  const handleMercadoClick = (mercado) => {
    setMercadoSelecionado(mercado);
  };

  const handleSetorClick = (setor) => {
    setSetorSelecionado(setor);
  };

  function filtrarProdutos() {
    return produtos.filter((produto) => {
      const mercadoMatch =
        mercadoSelecionado === "Todos" ||
        produto.mercado === mercadoSelecionado;
      const setorMatch =
        setorSelecionado === "Todos" || produto.setores === setorSelecionado;
      return mercadoMatch && setorMatch;
    });
  }

  const produtosFiltrados = filtrarProdutos();

  const comparacaoRef = useRef(null);

  const handleCompararPreco = async (nomeProduto) => {
    setLoading(true);
    try {
      // Faz a chamada à API para comparar preços
      const resposta = await api.post("/BuscarProdutos", { nomeProduto });

      // Armazena o resultado no estado
      setProdutosComparacao(resposta.data);
      
      // Verifica se o comparacaoRef está presente e rola para o componente desejado
      if (comparacaoRef.current) {
        setTimeout(() => {
          comparacaoRef.current.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } catch (erro) {
      console.error("Erro ao buscar comparação de preços:", erro);
    } finally {
      setLoading(false);
    }
  };

  const BuscaPromoTodosMercados = async () => {
   
    try {
     
      const resposta = await api.get("/BuscaPromoMercados");

      setProdutosPromo(resposta.data);
      console.log(resposta.data);

    } catch (erro) {
      console.error("Erro ao buscar produtos em oferta:", erro);
    } 
  };

  useEffect(()=>{
    BuscaPromoTodosMercados()
  },[])

  const atualizarProduto = (mercado, produtoSelecionado) => {
    setProdutosComparacao((prev) => ({
      ...prev,
      [mercado]: {
        ...prev[mercado],
        dadosEncontrados: produtoSelecionado,
      },
    }));
  };

 



  useEffect(() => {
    const count = localStorage.getItem("cartCount");
    setCartCount(count ? parseInt(count, 10) : 0);
  }, []);

  return (
    <div>
      {loading && <Loading />}

      <header className="cabecalho-lista">
        <li>
          <img src={logo} alt="Logo" className="lista-logo" />
        </li>
        {/* <li>
          <Link to="/carrinho">
            <div className="carrinho-container">
              <img src={carrinho} alt="Carrinho de compras" />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </div>
          </Link>
        </li> */}
      </header>

      <section className="cabecalho-estastisticas">
        <div className="estastisticas">
          <h1>Tudo o que você precisa para economizar em um só lugar!</h1>
        </div>
        <div className="estastisticas">
          <Link to="/perfil">
            <div className="estastisticas-link">
              <img src={perfil} alt="Perfil" className="perfil-img" />
              <span className="link-text">
                Veja suas economias e estatísticas!
              </span>
            </div>
          </Link>
        </div>
      </section>

      <div>
        <section className="cabecalho_promocoes">
          <h1>Promoções do dia!</h1>

          <div className="promocoes-01 barraRolagem">
            {produtosPromo.map((produto) => (
              <div className="promocoes" key={produto.id}>
                <div className="promocoes_img">
                  <img src={produto.imageUrl} alt={produto.title} />
                </div>
                <div className="promocoes_produtos">
                  <h3>{produto.title}</h3>
                  <span>R${produto.price}</span>
                  <div>
                    <img
                      src={produto.mercado.logo}
                      alt={produto.mercado}
                      className="imagem-mercado"
                    />
                    <button  onClick={() => handleCompararPreco(produto.title)}>
                    Comparar Preço
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div>
        <section className="cabecalho_mercados">
          <div className="mercados_flex">
            <button
              className={`button ${
                mercadoSelecionado === "Confiança" ? "selected" : ""
              }`}
              onClick={() => handleMercadoClick("Confiança")}
            >
              <img src={confiancaLogo} alt="Confiança Logo"></img>
            </button>
            <button
              className={`button ${
                mercadoSelecionado === "Panelão" ? "selected" : ""
              }`}
              onClick={() => handleMercadoClick("Panelão")}
            >
              <img src={panelaoLogo} alt="Panelão Logo"></img>
            </button>
            <button
              className={`button ${
                mercadoSelecionado === "Tauste" ? "selected" : ""
              }`}
              onClick={() => handleMercadoClick("Tauste")}
            >
              <img src={tausteLogo} alt="Tauste Logo"></img>
            </button>
          </div>
        </section>

        <section className="cabecalho_setores">
          <div className="barraRolagem">
            <div className="promocoes-01 setores-mercado">
              {["Frios", "Açougue", "Hortifrut", "Higiene"].map((setor) => (
                <button
                  key={setor}
                  className={`button ${
                    setorSelecionado === setor ? "selected" : ""
                  }`}
                  onClick={() => handleSetorClick(setor)}
                >
                  {setor}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="secao_compras">
          <ul className="secao_compras_produtos_lista barraRolagem">
            {produtosFiltrados.map((produto) => (
              <li
                key={produto.id}
                className="secao_compras_produtos_lista_item"
              >
                <article className="secao_compras_lista_item_produto">
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className="secao_compras_lista_item_produto_imagem"
                  />
                  <h3 className="secao_compras_lista_item_produto_titulo">
                    {produto.nome}
                  </h3>

                  <h4 className="secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--preco">
                    R${produto.preco.toFixed(2)}
                  </h4>

                  <button
                    className="secao_compras_lista_item_produto_comparar"
                    onClick={() => handleCompararPreco(produto.nome)}
                  >
                    Comparar Preço
                  </button>

                  
                </article>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="secao_compras" ref={comparacaoRef}>
      <h2 className="comparativo">
                    Comparativo:
                    <span></span>
                  </h2>
        <ul className="secao_compras_produtos_lista barraRolagem">
          {Object.keys(produtosComparacao).map((mercado) => {
            const dadosEncontrados = Array.isArray(
              produtosComparacao[mercado]?.dadosEncontrados
            )
              ? produtosComparacao[mercado]?.dadosEncontrados[0]
              : produtosComparacao[mercado]?.dadosEncontrados;

            const similares =
              produtosComparacao[mercado]?.produtosSimilares || [];

            if (dadosEncontrados) {
              return (
                <li key={dadosEncontrados.id} className="secao_compras_produtos_lista_item">
                 
                  <h3 className="mercado_nome">{mercado}</h3>
                  <article className="secao_compras_lista_item_produto">
                    <img
                      src={dadosEncontrados.imageUrl}
                      alt={dadosEncontrados.title}
                      className="secao_compras_lista_item_produto_imagem"
                    />
                    <h3 className="secao_compras_lista_item_produto_titulo">
                      {dadosEncontrados.title}
                    </h3>
                    <h4 className="secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--preco">
                      {dadosEncontrados.price}
                    </h4>

                    <button
                      className="secao_compras_lista_item_produto_comparar secao_compras_lista_item_produto_comparar--naoEncontrado"
                      onClick={() => {
                        setProdutosSimilares({ mercado, similares });
                        setIsOpen(true);
                      }}
                    >
                      Produto incorreto?
                    </button>

                   
                  </article>
                </li>
              );
            } else {
              return (
                <li key={mercado} className="secao_compras_produtos_lista_item">
                  <h3 className="mercado_nome">{mercado}</h3>
                  <article className="secao_compras_lista_item_produto">
                    <h3 className="secao_compras_lista_item_produto_titulo">
                      Produto não encontrado
                    </h3>

                    <button
                      className="secao_compras_lista_item_produto_comparar secao_compras_lista_item_produto_comparar--naoEncontrado"
                      onClick={() => setIsOpen(true)}
                    >
                      Produto incorreto?
                    </button>
                  </article>
                </li>
              );
            }
          })}
        </ul>
      </section>

      {isOpen && (
        <ModalSimilares
          setIsOpen={setIsOpen}
          produtosSimilares={produtosSimilares}
          setProdutosSimilares={setProdutosSimilares}
          comparacaoRef={comparacaoRef}
          atualizarProduto={atualizarProduto}
        />
      )}
    </div>
  );
}

export default HomeScreen;
