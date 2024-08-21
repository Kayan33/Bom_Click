import React from "react"
import './resumocompra.css'
import { Link } from 'react-router-dom'
import iconeVoltar from '../../imagens/icon-voltar.svg'
import '../../assets/cabecalho.css'
import confiancaLogo from '../../imagens/confiancaLogo.png'
import alho from '../../imagens/alho.png'
import carne from '../../imagens/carne.png'
import batata from '../../imagens/batata.png'
import limao from '../../imagens/limao.png'
import editarEndereco from '../../imagens/editar.svg'
import '../../assets/carrossel.css'


export default function ResumoCompra() {
  return(
    <div>
    <header className='cabecalho'>
        <img src={iconeVoltar} alt="Voltar para Página Inicial" />
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

        <div className='secao_compras_lista_item_produto_valores'>

            <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--preço'>R$40,00</h4>

            <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--desconto secao_compras_lista_item_produto_titulo--amarelo'>R$40,00</h4>

        </div>

    </article>

</li>

<li className='secao_compras_produtos_lista_item'>

    <article className='secao_compras_lista_item_produto'>

        <img src={limao} alt="Fraldinha" className='secao_compras_lista_item_produto_imagem' />

        <h3 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo'>Limao Taiti KG</h3>

        <div className='secao_compras_lista_item_produto_valores'>

            <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--preço'>R$10,00</h4>

            <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--desconto secao_compras_lista_item_produto_titulo--amarelo'>R$40,00</h4>

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
          <h3>Entrega</h3>
          <div>
            <p>Retirar na loja:</p>
            <p>R. Treze de Maio, 2-13 - Centro, Bauru</p>
          </div>
          <p>Entrega em casa</p>
          <div className="entrega_endereco">
              <div>
                <p>CEP:</p>
                <div className="editar_endereco">
                  <p>17010-150</p>
                  <Link to='/editarInformacoes'>
                  <img src={editarEndereco} alt="link para editar endereço"/>
                  </Link>
                </div>
              </div>
              <div>
                <p>Logradouro:</p>
                <p>Rua Engenheiro Saint-Martin - até Quadra 11</p>
              </div>
              <div>
                <p>Bairro:</p>
                <p>Centro</p>
              </div>
              <div>
                <p>Número:</p>
                <div className="editar_endereco">
                  <p>10-12</p>
                  <Link to='/editarInformacoes'>
                   <img src={editarEndereco} alt="link para editar endereço" />
                   </Link>
                </div>
              </div>
          </div>
        </section>

        <section className="secao_forma_pagamento">
          <div className="scroll_forma_pagamento">
            <ul>
              <li>Crédito</li>
              <li>Débito</li>
              <li>Vale alimentação</li>
              <li>Vale refeição</li>
            </ul>
            <div className="pagamento_escolhido">

            </div>
          </div>
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
          <button>Finalizar compra</button>
        </section>
      </main>
    </div>
  )
}

 