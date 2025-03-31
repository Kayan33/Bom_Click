import { produtos } from "../../data/produtos";
import iconvoltar from "../../imagens/icon-voltar.svg";
import "./modalSimilares.css";

export default function ModalSimilares({ setIsOpen }) {
  return (
    <div className="modal modal--similares">
      <div className="titulo-container">
        <img
          src={iconvoltar}
          alt="Fechar"
          className="modal-similares__icon-voltar"
          onClick={() => setIsOpen(false)}
        />
        <h2 className="modal-login-titulo">Produtos similares</h2>
      </div>

      <div className="modal-similares__inputs-container barraRolagem--vertical">
        {produtos.map((prod) => (
          <li key={prod.id} className="modal-similares__item">
            <img
              src={prod.imagem}
              alt={prod.imagem}
              className="modal-similares__imagem"
            />
            <div className="modal-similares__flex-prod">
              <span className="modal-similares__produto-nome">{prod.nome}</span>
              <span className="modal-similares__produto-preco">
                R${prod.preco.toFixed(2)}
              </span>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
}
