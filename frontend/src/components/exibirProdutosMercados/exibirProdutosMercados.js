import { useState } from "react";
import confiancaLogo from "../../imagens/confiancaLogo.png";
import panelaoLogo from "../../imagens/panelaoLogo.png";
import tausteLogo from "../../imagens/tausteLogo.png";
import { produtos } from "../../data/produtos.js";

export default function ExibirProdutosMercados({ handleCompararPreco, handleAddToCart }) {
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
        mercadoSelecionado === "Todos" || produto.mercado === mercadoSelecionado;
      const setorMatch =
        setorSelecionado === "Todos" || produto.setores === setorSelecionado;
      return mercadoMatch && setorMatch;
    });
  }

  const produtosFiltrados = filtrarProdutos();

  

  return (
    <div>
      <section className="cabecalho_mercados">
        <div className="mercados_flex">
          <button
            className={`button ${mercadoSelecionado === "Confiança" ? "selected" : ""}`}
            onClick={() => handleMercadoClick("Confiança")}
          >
            <img src={confiancaLogo} alt="Confiança Logo"></img>
          </button>
          <button
            className={`button ${mercadoSelecionado === "Panelão" ? "selected" : ""}`}
            onClick={() => handleMercadoClick("Panelão")}
          >
            <img src={panelaoLogo} alt="Panelão Logo"></img>
          </button>
          <button
            className={`button ${mercadoSelecionado === "Tauste" ? "selected" : ""}`}
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
                className={`button ${setorSelecionado === setor ? "selected" : ""}`}
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
            <li key={produto.id} className="secao_compras_produtos_lista_item">
              <article className="secao_compras_lista_item_produto">
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="secao_compras_lista_item_produto_imagem"
                />
                <h3 className="secao_compras_lista_item_produto_titulo">{produto.nome}</h3>

                <h4 className="secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--preco">
                  R${produto.preco.toFixed(2)}
                </h4>

                <button
                  className="secao_compras_lista_item_produto_comparar"
                  onClick={() => handleCompararPreco(produto.nome)}
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
  );
}
