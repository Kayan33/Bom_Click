import { useState, useEffect } from 'react';
import iconeVoltar from '../../imagens/icon-voltar.svg';
import '../../assets/cabecalho.css';
import '../carrinho/carrinho.css';
import fotoCarne from '../../imagens/carne.png';
import confiancaLogo from '../../imagens/confiancaLogo.png';

function CarrinhoCompras() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.preco, 0).toFixed(2);
  };

  return (
    <div>
      <header className='cabecalho teste'>
        <a href="/" className="cabecalho_link" aria-label="Voltar para o perfil">
          <img src={iconeVoltar} alt="Voltar para o perfil" className="cabecalho_link" />
        </a>
        <h1 className='cabecalho_titulo'>Carrinho</h1>
      </header>

      <section className='resumo'>
        <h2>Resumo das compras por mercado</h2>
        <div className='secao_carrinho_produtos'>
          <img src={confiancaLogo} alt="Confiança Logo" />
          <ul className='secao_compras_produtos_lista'>
            {cartItems.map((item, index) => (
              <li key={index} className='secao_compras_produtos_lista_item'>
                <article className='secao_compras_lista_item_produto'>
                  <img src={item.imagem} alt={item.nome} className='secao_compras_lista_item_produto_imagem' />
                  <h3 className='secao_compras_lista_item_produto_titulo'>{item.nome}</h3>
                  <div className='secao_compras_lista_item_produto_valores'>
                    <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--preço'>
                      R${item.preco.toFixed(2)}
                    </h4>
                    <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--desconto'>Não é o melhor preço</h4>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>

        <div className='secao_carrinho_compra'>
          <div className='secao_total_economizou'>
            <h4>Total: R${calculateTotal()}</h4>
            <h3>Economizou: R$0</h3>
          </div>
          <div>
            <button className='secao_compras_lista_item_produto_adicionar--carrinho'>FINALIZAR COMPRA</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CarrinhoCompras;
