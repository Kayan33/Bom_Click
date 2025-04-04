
import iconvoltar from "../../imagens/icon-voltar.svg";
import "./modalSimilares.css";
import "../../assets/style.css";


export default function ModalSimilares({ setIsOpen, setProdutosSimilares, produtosSimilares, atualizarProduto }) {
  const handleClose = () => {
    setIsOpen(false);
    setProdutosSimilares({ mercado: "", similares: [] });
  };

  const handleSelecionarProduto = (produtoSelecionado) => {
    atualizarProduto(produtosSimilares.mercado, produtoSelecionado);
    handleClose();
  };

  return (
    <div className="modal-fundo">
      <div className="modal modal--similares">
        <div className="titulo-container">
          <img
            src={iconvoltar}
            alt="Fechar"
            className="modal-similares__icon-voltar"
            onClick={handleClose}
          />
          <h2 className="modal-similares__produto-titulo">Produtos similares</h2>
        </div>

        <div className="modal-similares__inputs-container barraRolagem--vertical">
          {produtosSimilares.similares?.length > 0 ? (
            produtosSimilares.similares.map((prod) => (
              <li key={prod.id} className="modal-similares__item" onClick={() => handleSelecionarProduto(prod)}>
                <img
                  src={prod.imageUrl}
                  alt={prod.title}
                  className="modal-similares__imagem"
                />
                <div className="modal-similares__flex-prod">
                  <span className="modal-similares__produto-nome">
                    {prod.title}
                  </span>
                  <span className="modal-similares__produto-preco">
                    {prod.price}
                  </span>
                </div>
              </li>
            ))
          ) : (
            <p>Nenhum produto similar encontrado</p>
          )}
        </div>
      </div>
    </div>
  );
}

