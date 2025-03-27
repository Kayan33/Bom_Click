import { useState, useEffect } from 'react';
import iconeVoltar from '../../imagens/icon-voltar.svg';
import '../../assets/cabecalho.css';
import '../carrinho/carrinho.css';
import confiancaLogo from '../../imagens/confiancaLogo.png';
import { useNavigate } from 'react-router-dom';
import Login from '../../components/login';
function CarrinhoCompras() {
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate()

  const handleCheckout = () => {
    navigate('/resumocompra')
  }

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.preco, 0).toFixed(2);
  };

  return (
    <div>
    <Login/>
      <header className='cabecalho teste'>
        <a href="/" className="cabecalho_link" aria-label="Voltar para o perfil">
          <img src={iconeVoltar} alt="Voltar para o perfil" className="cabecalho_link" />
        </a>
        <h1 className='cabecalho_titulo'>Carrinho</h1>
      </header>

      <section className='secao_resumo'>
        <h2 className='secao_resumo_titulo'>Resumo das compras por mercado</h2>
        <section className='secao_resumo_produtos'>
          <img src={confiancaLogo} alt="Confiança Logo" className='secao_resumo_produtos_logoMercado' />
          <ul className='secao_compras_produtos_lista barraRolagem'>
            {cartItems.map((item, index) => (
              <li key={index} className='secao_compras_produtos_lista_item'>
                <article className='secao_compras_lista_item_produto'>
                  <img src={item.imagem} alt={item.nome} className='secao_compras_lista_item_produto_imagem' />
                  <h3 className='secao_compras_lista_item_produto_titulo'>{item.nome}</h3>
                  <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--preco'>
                    R${item.preco.toFixed(2)}
                  </h4>
                  <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--naoMelhorPreco'>Melhor preço</h4>

                </article>
              </li>
            ))}
          </ul>
        </section>

          <h4 className='secao_resumo_total'>Total: R${calculateTotal()}</h4>
          <h3 className='secao_resumo_economizou'>Economizou: R$0</h3>
          <button className='secao_compras_lista_item_produto_carrinho secao_compras_lista_item_produto_carrinho--margem' onClick={handleCheckout}>FINALIZAR COMPRA</button>
      </section>

    </div>
  );
}

export default CarrinhoCompras;
