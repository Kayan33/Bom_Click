import './secaoEstatisticas.css'
import '../../assets/cabecalho.css'
import '../../assets/carrossel.css'
import iconeVoltar from '../../imagens/icon-voltar.svg'
import fotoCarne from '../../imagens/carne.png';

function DadosPorMercado() {
    return (
        <>

            <header className='cabecalho'>
                <a href="#" className="cabecalho__link" aria-label="Voltar para o perfil">
                    <img src={iconeVoltar} alt="Voltar para o perfil" className="cabecalho__link" />
                </a>

                <h1 className='cabecalho_titulo'>Confiança</h1>

            </header>

            <section className='secao_estatisticas'>

                <div className='secao_estatisticas_item'>
                    <span className='secao_estatisticas_item_titulo'>Compras realizadas</span>
                    <span className='secao_estatisticas_item_valor'>2</span>
                </div>

                <div className='secao_estatisticas_item'>
                    <span className='secao_estatisticas_item_titulo'>Valores gastos</span>
                    <span className='secao_estatisticas_item_valor'>2</span>
                </div>

                <div className='secao_estatisticas_item'>
                    <span className='secao_estatisticas_item_titulo'>Valores Economizados</span>
                    <span className='secao_estatisticas_item_valor'>2</span>
                </div>

            </section>

            <section className='secao_compras'>

                <h2 className='secao_compras_titulo'>Compras Realizadas</h2>

                <section className='secao_compras_produtos'>

                    <time datetime="2024-05-17" className='secao_compras_titulo secao_compras_titulo--verde'>17/05/2024</time>

                    <ul className='secao_compras_produtos_lista'>

                        <li className='secao_compras_produtos_lista_item'>

                            <article className='secao_compras_lista_item_produto'>

                                <img src={fotoCarne} alt="Fraldinha" className='secao_compras_lista_item_produto_imagem' />

                                <h3 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo'>Fraldinha Bovina Resfriada KG</h3>

                                <div className='secao_compras_lista_item_produto_valores'>

                                    <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--preço'>R$40,00</h4>

                                    <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--desconto'>R$40,00</h4>

                                </div>

                            </article>

                        </li>

                        <li className='secao_compras_produtos_lista_item'>

                            <article className='secao_compras_lista_item_produto'>

                                <img src={fotoCarne} alt="Fraldinha" className='secao_compras_lista_item_produto_imagem' />

                                <h3 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo'>Fraldinha Bovina Resfriada KG</h3>

                                <div className='secao_compras_lista_item_produto_valores'>

                                    <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--preço'>R$40,00</h4>

                                    <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--desconto'>R$40,00</h4>

                                </div>

                            </article>

                        </li>

                    </ul>

                    <time datetime="2024-05-17" className='secao_compras_titulo secao_compras_titulo--verde'>17/05/2024</time>

                    <ul className='secao_compras_produtos_lista'>

                        <li className='secao_compras_produtos_lista_item'>

                            <article className='secao_compras_lista_item_produto'>

                                <img src={fotoCarne} alt="Fraldinha" className='secao_compras_lista_item_produto_imagem' />

                                <h3 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo'>Fraldinha Bovina Resfriada KG</h3>

                                <div className='secao_compras_lista_item_produto_valores'>

                                    <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--preço'>R$40,00</h4>

                                    <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--desconto'>R$40,00</h4>

                                </div>

                            </article>

                        </li>

                        <li className='secao_compras_produtos_lista_item'>

                            <article className='secao_compras_lista_item_produto'>

                                <img src={fotoCarne} alt="Fraldinha" className='secao_compras_lista_item_produto_imagem' />

                                <h3 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo'>Fraldinha Bovina Resfriada KG</h3>

                                <div className='secao_compras_lista_item_produto_valores'>

                                    <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--preço'>R$40,00</h4>

                                    <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--desconto'>R$40,00</h4>

                                </div>

                            </article>

                        </li>

                        <li className='secao_compras_produtos_lista_item'>

                            <article className='secao_compras_lista_item_produto'>

                                <img src={fotoCarne} alt="Fraldinha" className='secao_compras_lista_item_produto_imagem' />

                                <h3 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo'>Fraldinha Bovina Resfriada KG</h3>

                                <div className='secao_compras_lista_item_produto_valores'>

                                    <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--preço'>R$40,00</h4>

                                    <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--desconto'>R$40,00</h4>

                                </div>

                            </article>

                        </li>

                        <li className='secao_compras_produtos_lista_item'>

                            <article className='secao_compras_lista_item_produto'>

                                <img src={fotoCarne} alt="Fraldinha" className='secao_compras_lista_item_produto_imagem' />

                                <h3 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo'>Fraldinha Bovina Resfriada KG</h3>

                                <div className='secao_compras_lista_item_produto_valores'>

                                    <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--preço'>R$40,00</h4>

                                    <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--desconto'>R$40,00</h4>

                                </div>

                            </article>

                        </li>

                        <li className='secao_compras_produtos_lista_item'>

                            <article className='secao_compras_lista_item_produto'>

                                <img src={fotoCarne} alt="Fraldinha" className='secao_compras_lista_item_produto_imagem' />

                                <h3 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo'>Fraldinha Bovina Resfriada KG</h3>

                                <div className='secao_compras_lista_item_produto_valores'>

                                    <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--preço'>R$40,00</h4>

                                    <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--desconto'>R$40,00</h4>

                                </div>

                            </article>

                        </li>

                        <li className='secao_compras_produtos_lista_item'>

                            <article className='secao_compras_lista_item_produto'>

                                <img src={fotoCarne} alt="Fraldinha" className='secao_compras_lista_item_produto_imagem' />

                                <h3 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo'>Fraldinha Bovina Resfriada KG</h3>

                                <div className='secao_compras_lista_item_produto_valores'>

                                    <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--preço'>R$40,00</h4>

                                    <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--desconto'>R$40,00</h4>

                                </div>

                            </article>

                        </li>

                    </ul>

                </section>

            </section>


        </>
    )
}

export default DadosPorMercado