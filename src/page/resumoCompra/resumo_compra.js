import React, { useState } from "react"
import SecaoCep from '../../components/SecaoCep/SecaoCep'
import './resumocompra.css'
import { Link } from 'react-router-dom'
import iconeVoltar from '../../imagens/icon-voltar.svg'
import '../../assets/cabecalho.css'
import confiancaLogo from '../../imagens/confiancaLogo.png'
import alho from '../../imagens/alho.png'
import carne from '../../imagens/carne.png'
import batata from '../../imagens/batata.png'
import limao from '../../imagens/limao.png'
import iconeCartao from '../../imagens/iconeCartao.svg'
import iconeExcluir from '../../imagens/iconeExcluir.svg'
import '../../assets/carrossel.css'



export default function ResumoCompra() {

  const [isChecked, setIsChecked] = useState(true)

  const [opcaoSelecionada, setOpcaoSelecionada] = useState('')

  const compVisivel = () => {
    setIsChecked(!isChecked)
  }

  const handleClick = (opcao) => {
    setOpcaoSelecionada(opcao)
  }

  const renderImage = () => {
    switch (opcaoSelecionada) {
      case 'credito':
        return <div className="img_cartao_escolhido">
        <img src={iconeCartao} alt="Crédito"/>
        <div className="cartao_escolhido">
          <p>Crédito Visa</p>
          <p>0800 **** **** 0800</p>
        </div>
        <div className="cartao_excluir">
          <img src={iconeExcluir} alt="Excluir" className="excluir"/>
        </div>
        </div>;
      case 'debito':
        return <div className="img_cartao_escolhido">
        <img src={iconeCartao} alt="Débito"/>
        <div className="cartao_escolhido">
          <p>Débito Visa</p>
          <p>0800 **** **** 0800</p>
        </div>
        <div className="cartao_excluir">
          <img src={iconeExcluir} alt="Excluir" className="excluir"/>
        </div>
        </div>;
      case 'valeAlimentacao':
        return <div className="img_cartao_escolhido">
        <img src={iconeCartao} alt="Vale Alimentação"/>
        <div className="cartao_escolhido">
          <p>Alimentação Alelo</p>
          <p>0800 **** **** 0800</p>
        </div>
        <div className="cartao_excluir">
          <img src={iconeExcluir} alt="Excluir" className="excluir"/>
        </div>
        </div>;
      case 'valeRefeicao':
        return <div className="img_cartao_escolhido">
        <img src={iconeCartao} alt="Vale Refeição"/>
        <div className="cartao_escolhido">
          <p>Refeição Verocard</p>
          <p>0800 **** **** 0800</p>
        </div>
        <div className="cartao_excluir">
          <img src={iconeExcluir} alt="Excluir" className="excluir"/>
        </div>
        </div>;
      default:
        return null;
    }
  };

  return(
    <div>
    <header className='cabecalho'>
        <Link to='/'><img src={iconeVoltar} alt="Voltar para Página Inicial" /></Link>
        <h1 className='cabecalho_titulo'>Resumo da compra</h1>
      </header>
      <main>
        <section className="secao_conferir_produtos">
          <h2>Confira os produtos</h2>
          <img src={confiancaLogo} alt="Logo do supermercado confiança"/>
          <div className='scroll_conferir_produtos'>

          <ul className='secao_compras_produtos_lista barraRolagem'>

<li className='secao_compras_produtos_lista_item'>

    <article className='secao_compras_lista_item_produto'>

        <img src={carne} alt="Fraldinha" className='secao_compras_lista_item_produto_imagem' />

        <h3 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo'>Fraldinha Bovina Resfriada KG</h3>

        <div className='secao_compras_lista_item_produto_valores melhor_preco'>

            <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--preço'>R$40,00</h4>

            <h4>Melhor Preço!</h4>

        </div>

    </article>

</li>

<li className='secao_compras_produtos_lista_item'>

    <article className='secao_compras_lista_item_produto'>

        <img src={limao} alt="Fraldinha" className='secao_compras_lista_item_produto_imagem' />

        <h3 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo'>Limao Taiti KG</h3>

        <div className='secao_compras_lista_item_produto_valores nao_melhor_preco'>

            <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--preço'>R$10,00</h4>

            <h4>Não é o melhor preço</h4>

        </div>

    </article>

</li>
<li className='secao_compras_produtos_lista_item'>

    <article className='secao_compras_lista_item_produto'>

        <img src={alho} alt="Fraldinha" className='secao_compras_lista_item_produto_imagem' />

        <h3 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo'>Alho UN</h3>

        <div className='secao_compras_lista_item_produto_valores'>

            <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--preço'>R$0,50</h4>

            <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--desconto secao_compras_lista_item_produto_titulo--amarelo'>R$40,00</h4>

        </div>

    </article>

</li>
<li className='secao_compras_produtos_lista_item'>

    <article className='secao_compras_lista_item_produto'>

        <img src={batata} alt="Fraldinha" className='secao_compras_lista_item_produto_imagem' />

        <h3 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo'>Batata UN</h3>

        <div className='secao_compras_lista_item_produto_valores'>

            <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--preço'>R$5,00</h4>

            <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--desconto secao_compras_lista_item_produto_titulo--amarelo'>R$1,00</h4>

        </div>

    </article>

</li>

</ul>
          </div>
        </section>

        <section className="secao_resumo_entrega">
          <h3>Entrega:</h3>
          <div className="escolha_entrega">
            <div className="entrega_opcao_1">
              <div className="entrega_local">
                <label
                for="lojaProxima">
                Retirar na loja:
                </label>
                <input type="box" id="lojaProxima" value={"R. Treze de Maio, 2-13 - Centro, Bauru"}/>
              </div>
              <input
                type="checkbox"
                checked={isChecked}
                className="checkbox"
                id="lojaProxima"
                onChange={compVisivel}
                />
              </div>
             <div className="entrega_opcao_2">
             <label For="entregaCasa">
               Entrega em casa:
               </label>
               <input
               type="checkbox"
               checked={!isChecked}
               className="checkbox_2"
               id="entregaCasa"
               onChange={compVisivel}/>
             </div>
            </div>
             {!isChecked && ( <SecaoCep/>)}
        </section>

        <section className="secao_forma_pagamento">
          <h3>Forma de pagamento:</h3>
            <ul className="barraRolagem barraRolagem--amarelo">
              <li><button onClick={() => handleClick('credito')}>Crédito</button></li>
              <li><button onClick={() => handleClick('debito')}>Débito</button></li>
              <li><button onClick={() => handleClick('valeAlimentacao')}>Vale alimentação</button></li>
              <li><button onClick={() => handleClick('valeRefeicao')}>Vale refeição</button></li>
            </ul>
              {renderImage()}
            
          <div className="finalizar_compra">
          <div className="compra_total">
            <p>Total: R$200</p>
            <p>Economizou: R$50</p>
          </div>
          <div className="entrega_total">
              <p>Taxa de entrega: R$10</p>
              <p>Previsão da entrega: 16:00</p>
          </div>
          </div>
          <div className="finalizar_compra_botao">
          <Link to="/finalizado"><button>Finalizar compra</button></Link>
          </div>
        </section>
      </main>
    </div>
  )
}

 