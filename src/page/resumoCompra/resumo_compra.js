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


export default function ResumoCompra() {
  return(
    <div>
    <header className='cabecalho'>
        <Link to='/'>
        <img src={iconeVoltar} alt="Voltar para Página Inicial" />
        </Link>
        <h1 className='cabecalho_titulo'>Resumo da compra</h1>
      </header>
      <main>
        <section className="secao_conferir_produtos">
          <h2>Confira os produtos</h2>
          <img src={confiancaLogo} alt="Logo do supermercado confiança"/>
          <div className='scroll_conferir_produtos'>
          <ul className="barraRolagem">
                              <li>
                                <div className='scroll_produto'>
                                        <img src={carne} alt=" Imagem de Carne Vermelha" />
                                        <p>Fraldinha Bovina Resfriada KG</p>
                                        <div className='scroll_economia'>
                                            <p>R$ 40,00</p>
                                            <p>R$ 5,00</p>
                                        </div>
                                </div>
                            </li>
                            <li> 
                                <div className='scroll_produto'>
                                        <img src={limao} alt="Imagem de limão Taiti" />
                                        <p>Limão Taiti KG</p>
                                        <div className='scroll_economia'>
                                            <p>R$ 40,00</p>
                                            <p>R$ 0,00</p>
                                        </div>
                                </div>
                            </li>
                            <li>
                                <div className='scroll_produto'>
                                        <img src={alho} alt="Imagem de alho" />
                                        <p>Alho KG</p>
                                        <div className='scroll_economia'>
                                            <p>R$ 0,50</p>
                                            <p>R$ 0,00</p>
                                        </div>
                                </div>
                            </li>
                            <li> 
                                <div className='scroll_produto'>
                                        <img src={batata} alt="Imagem de batata" />
                                        <p>Batata KG</p>
                                        <div className='scroll_economia'>
                                            <p>R$ 40,00</p>
                                            <p>R$ 5,00</p>
                                        </div>
                                </div>
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

 