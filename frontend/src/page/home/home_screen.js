import "./header_home.css";
import logo from "../../imagens/bomClick.svg";
import carrinho from "../../imagens/carrinho.svg";
import perfil from "../../imagens/perfil.svg";
import { Link } from "react-router-dom";

import { produtos } from "../../data/produtos.js";
import { useState, useEffect, useRef } from "react";
import ModalSimilares from "../../components/modalSimilares/modalSimilares.js";
import api from "../../services/api.js";
import Loading from "../compraFinalizada/Loading.js";
import ExibirProdutosMercados from "../../components/exibirProdutosMercados/exibirProdutosMercados.js";

function HomeScreen() {
  const [cartCount, setCartCount] = useState(0);
  const [produtosComparacao, setProdutosComparacao] = useState([]);
  const [todosProdutos, setTodosProdutos] = useState([]);
  const [produtosSimilares, setProdutosSimilares] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nomeProduto, setNomeProduto] = useState("");

  const comparacaoRef = useRef(null);

  const handleCompararPreco = async (nomeProduto) => {
    setLoading(true);
    try {
      // Faz a chamada à API para comparar preços
      const resposta = await api.post("/BuscarProdutos", { nomeProduto });

      // Armazena o resultado no estado
      setProdutosComparacao(resposta.data);
      console.log(resposta.data);

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

  const handlebuscaProdutos = async (e) => {
    e.preventDefault(); // Evita o reload da página

    if (!nomeProduto.trim()) {
      alert("Digite o nome do produto!");
      return;
    }

    setLoading(true);
    try {
      const resposta = await api.post("/BuscarTodosProdutos", { nomeProduto });
      setTodosProdutos(resposta?.data.produtos || []);
      console.log(resposta.data);
    } catch (erro) {
      console.error("Erro ao buscar comparação de preços:", erro);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (produto) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(produto);
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("cartCount", cart.length);
    setCartCount(cart.length);
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
        <li>
          <Link to="/carrinho">
            <div className="carrinho-container">
              <img src={carrinho} alt="Carrinho de compras" />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </div>
          </Link>
        </li>
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
          {produtos.map((produto) => (
            <div className="promocoes" key={produto.id}>
              <div className="promocoes_img">
                <img src={produto.imagem} alt={produto.nome} />
              </div>
              <div className="promocoes_produtos">
                <h3>{produto.nome}</h3>
                <span>R${produto.preco.toFixed(2)}</span>
                <div>
                  <img
                    src={produto.mercadoImagem}
                    alt={produto.mercado}
                    className="imagem-mercado"
                  />
                  <button onClick={() => handleAddToCart(produto)}>
                    Adicionar <br /> a compra
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="cabecalho_mercados-busca">
        <form className="mercados_flex" onSubmit={handlebuscaProdutos}>
          <input
            type="text"
            placeholder="Nome do produto"
            className="mercados_input"
            value={nomeProduto}
            onChange={(e) => setNomeProduto(e.target.value)}
          />
          <button className="mercados_botao" type="submit">
            Buscar produtos
          </button>
        </form>
      </section>

      <section className="secao_compras">
        <ul className="secao_compras_produtos_lista barraRolagem">
          {todosProdutos.map((produto, index) => (
            <li key={index} className="secao_compras_produtos_lista_item">
              <article className="secao_compras_lista_item_produto">
                <img
                  src={
                    produto.imageUrl.startsWith("//")
                      ? `https:${produto.imageUrl}`
                      : produto.imageUrl
                  }
                  alt={produto.title}
                  className="secao_compras_lista_item_produto_imagem"
                />
                <h3 className="secao_compras_lista_item_produto_titulo">
                  {produto.title}
                </h3>

                <h4 className="secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--preco">
                  {produto.price}
                </h4>

                <button
                  className="secao_compras_lista_item_produto_comparar"
                  onClick={() => handleCompararPreco(produto.title)}
                >
                  Comparar Preço
                </button>

                <button
                  className="secao_compras_lista_item_produto_carrinho"
                  onClick={() => handleAddToCart(produto)}
                >
                  ADICIONAR A COMPRA
                </button>
              </article>
            </li>
          ))}
        </ul>
      </section>
      </div>

      <ExibirProdutosMercados />



      <section className="secao_compras" ref={comparacaoRef}>

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
                <li key={mercado} className="secao_compras_produtos_lista_item">
        <h2 className="comparativo">
          Comparativo:{" messi messi"}
          <span></span>
        </h2>
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

                    <button
                      className="secao_compras_lista_item_produto_carrinho"
                      onClick={() => handleAddToCart(dadosEncontrados)}
                    >
                      ADICIONAR A COMPRA
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
        />
      )}
    </div>
  );
}

export default HomeScreen;
