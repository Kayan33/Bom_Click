import './header_home.css';
import logo from '../../imagens/bomClick.svg';
import carrinho from '../../imagens/carrinho.svg';
import perfil from '../../imagens/perfil.svg';
import { Link } from 'react-router-dom';

import confiancaLogo from '../../imagens/confiancaLogo.png';
import panelaoLogo from '../../imagens/panelaoLogo.png';
import tausteLogo from '../../imagens/tausteLogo.png';

import { produtos } from '../../data/produtos.js';
import { useState, useEffect, useRef } from 'react';

function HomeScreen() {
  const [setorSelecionado, setSetorSelecionado] = useState('Frios');
  const [mercadoSelecionado, setMercadoSelecionado] = useState('Confiança');
  const [cartCount, setCartCount] = useState(0);
  const [produtosComparacao, setProdutosComparacao] = useState([]);
  
  
  const comparacaoRef = useRef(null);

  function filtrarProdutos() {
    return produtos.filter(produto => {
      const mercadoMatch = mercadoSelecionado === 'Todos' || produto.mercado === mercadoSelecionado;
      const setorMatch = setorSelecionado === 'Todos' || produto.setores === setorSelecionado;
      return mercadoMatch && setorMatch;
    });
  };

  const produtosFiltrados = filtrarProdutos();

  const handleSetorClick = (setor) => {
    setSetorSelecionado(setor);
  };

  const handleMercadoClick = (mercado) => {
    setMercadoSelecionado(mercado);
  };

  function compararPreco(nomeProduto) {
    return produtos.filter(produto => produto.nome === nomeProduto);
  }

  const handleCompararPreco = (nomeProduto) => {
    const resultado = compararPreco(nomeProduto);
    setProdutosComparacao(resultado);
    console.log(resultado);
    
    
    if (comparacaoRef.current) {
      setTimeout(() => {
        comparacaoRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    
  }

  const handleAddToCart = (produto) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(produto);
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartCount', cart.length);
    setCartCount(cart.length);
  };

  useEffect(() => {
    const count = localStorage.getItem('cartCount');
    setCartCount(count ? parseInt(count, 10) : 0);
  }, []);

  return (
    <div>
      <header className='cabecalho-lista'>
        <li>
          <img src={logo} alt="Logo" className='lista-logo' />
        </li>
        <li>
          <Link to='/carrinho'>
            <div className='carrinho-container'>
              <img src={carrinho} alt="Carrinho de compras" />
              {cartCount > 0 && (
                <span className='cart-count'>{cartCount}</span>
              )}
            </div>
          </Link>
        </li>
      </header>

      <section className='cabecalho-estastisticas'>
        <div className='estastisticas'>
          <h1>
            Tudo o que você precisa para economizar em um só lugar!
          </h1>
        </div>
        <div className='estastisticas'>
          <Link to='/perfil'>
            <div className="estastisticas-link">
              <img src={perfil} alt="Perfil" className="perfil-img" />
              <span className="link-text">Veja suas economias e estatísticas!</span>
            </div>
          </Link>
        </div>
      </section>

      <section className='cabecalho_promocoes'>
        <h1>Promoções do dia!</h1>
      
          <div className='promocoes-01 barraRolagem'>
            {produtos.map(produto => (
              <div className='promocoes' key={produto.id}>
                <div className='promocoes_img'>
                  <img src={produto.imagem} alt={produto.nome} />
                </div>
                <div className='promocoes_produtos'>
                  <h3>{produto.nome}</h3>
                  <span>R${produto.preco.toFixed(2)}</span>
                  <div>
                    <img src={produto.mercadoImagem} alt={produto.mercado} className='imagem-mercado' />
                    <button onClick={() => handleAddToCart(produto)}>Adicionar <br /> a compra</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        
      </section>

      <section className='cabecalho_mercados'>
        <div className='mercados_flex'>
          <button
            className={`button ${mercadoSelecionado === 'Confiança' ? 'selected' : ''}`}
            onClick={() => handleMercadoClick('Confiança')}
          >
            <img src={confiancaLogo} alt="Confiança Logo"></img>
          </button>
          <button
            className={`button ${mercadoSelecionado === 'Panelão' ? 'selected' : ''}`}
            onClick={() => handleMercadoClick('Panelão')}
          >
            <img src={panelaoLogo} alt="Panelão Logo"></img>
          </button>
          <button
            className={`button ${mercadoSelecionado === 'Tauste' ? 'selected' : ''}`}
            onClick={() => handleMercadoClick('Tauste')}
          >
            <img src={tausteLogo} alt="Tauste Logo"></img>
          </button>
        </div>
      </section>

      <section className='cabecalho_setores'>
        <div className='barraRolagem'>
          <div className='promocoes-01 setores-mercado'>
            <button
              className={`button ${setorSelecionado === 'Frios' ? 'selected' : ''}`}
              onClick={() => handleSetorClick('Frios')}
            >
              Frios
            </button>
            <button
              className={`button ${setorSelecionado === 'Açougue' ? 'selected' : ''}`}
              onClick={() => handleSetorClick('Açougue')}
            >
              Açougue
            </button>
            <button
              className={`button ${setorSelecionado === 'Hortifrut' ? 'selected' : ''}`}
              onClick={() => handleSetorClick('Hortifrut')}
            >
              Hortifrut
            </button>
            <button
              className={`button ${setorSelecionado === 'Higiene' ? 'selected' : ''}`}
              onClick={() => handleSetorClick('Higiene')}
            >
              Higiene
            </button>
          </div>
        </div>
      </section>

      <section className="secao_compras">
        <ul className='secao_compras_produtos_lista barraRolagem'>
          {produtosFiltrados.map(produto => (
            <li key={produto.id} className='secao_compras_produtos_lista_item'>
              <article className='secao_compras_lista_item_produto'>
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className='secao_compras_lista_item_produto_imagem'
                />
                <h3 className='secao_compras_lista_item_produto_titulo'>
                  {produto.nome}
                </h3>

                <div className='secao_compras_lista_item_produto_valores'>
                  <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--preco'>
                    R${produto.preco.toFixed(2)}
                  </h4>
                  <button className='secao_compras_lista_item_produto_comparar--preco' onClick={() => handleCompararPreco(produto.nome)}>
                    Comparar Preço
                  </button>
                </div>

                <div className='secao_compras_lista_item_produto_valores'>
                  <button className='secao_compras_lista_item_produto_adicionar--carrinho' onClick={() => handleAddToCart(produto)}>
                    ADICIONAR A COMPRA
                  </button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section className="secao_compras" ref={comparacaoRef}>
        <h1>Comparativo de Preços</h1>
        <ul className='secao_compras_produtos_lista barraRolagem'>
          {produtosComparacao.map(produto => (
            <li key={produto.id} className='secao_compras_produtos_lista_item'>
              <article className='secao_compras_lista_item_produto'>
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className='secao_compras_lista_item_produto_imagem'
                />
                <h3 className='secao_compras_lista_item_produto_titulo'>
                  {produto.nome}
                </h3>

                <div className='secao_compras_lista_item_produto_valores'>
                  <div>
                  <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--preco'>
                    R${produto.preco.toFixed(2)}
                  </h4>
                  </div>
                  <div className='secao_compras_lista_item_produto_imagem--mercado'>
                    <img src={produto.mercadoImagem} alt='Imagem do mercado' />
                  </div>
                </div>

                <div className='secao_compras_lista_item_produto_valores'>
                  <button className='secao_compras_lista_item_produto_adicionar--carrinho' onClick={() => handleAddToCart(produto)}>
                    ADICIONAR A COMPRA
                  </button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default HomeScreen;
