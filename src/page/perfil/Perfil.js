import iconeVoltar from '../../imagens/icon-voltar.svg'
import '../perfil/perfil.css'
import perfil from '../../imagens/perfil-pagePerfil.svg'
import tausteLogo from '../../imagens/tausteLogo.png'
import confiancaLogo from '../../imagens/confiancaLogo.png'
import panelaoLogo from '../../imagens/panelaoLogo.png'
import fotoCarne from '../../imagens/carne.png'
import limao from '../../imagens/limao.png'
import batata from '../../imagens/batata.png'
import alho from '../../imagens/alho.png'
import '../../assets/cabecalho.css'
import { Link } from 'react-router-dom'


export default function Perfil() {
    return (
        <div>
            <header className='cabecalho'>
                <Link to='/' className='cabecalho_link'>
                    <img src={iconeVoltar} alt="Voltar para Página Inicial" />
                </Link>
                <h1 className='cabecalho_titulo'>Perfil</h1>
            </header>   
            <main>
                <section className='secao_perfil'>
                    <Link to="/editarInformacoes">
                        <img src={perfil} alt="icone de perfil" id='icon-page-perfil'/> 
                        <p>Editar Informações</p> 
                    </Link>
                    <h2>Olá Danrley!</h2>
                </section>
                <section className='perfil_secao_estatisticas'>
                    <h3>Suas estatísticas!</h3>
                    <ul className='barraRolagem barraRolagem--amarelo'>
                            <li>
                                <div className='scroll_item'>
                                    <p>Valores economizados</p>
                                    <p>R$ 40,50</p>
                                </div>
                            </li>
                            <li>
                                <div className='scroll_item'>
                                    <p>Valores economizados</p>
                                    <p>R$ 40,50</p>
                                </div>
                            </li>
                            <li>
                                <div className='scroll_item'>
                                    <p>Valores economizados</p>
                                    <p>R$ 40,50</p>
                                </div>
                            </li>
                            <li>
                                <div className='scroll_item'>
                                    <p>Valores economizados</p>
                                    <p>R$ 40,50</p>
                                </div>
                            </li>
                            <li>
                                <div className='scroll_item'>
                                    <p>Valores economizados</p>
                                    <p>R$ 40,50</p>
                                </div>
                            </li>
                            <li>
                                <div className='scroll_item'>
                                    <p>Valores economizados</p>
                                    <p>R$ 40,50</p>
                                </div>
                            </li>
                            <li>
                                <div className='scroll_item'>
                                    <p>Valores economizados</p>
                                    <p>R$ 40,50</p>
                                </div>
                            </li>
                        </ul>
                </section>
                <section className='secao_info_mercados'>
                    <h3>Informações por mercados</h3>
                    <ul className='barraRolagem'>
                        <li>
                            <div className='info_compras'>
                            <img src={tausteLogo} alt="Logo Supermecado Tauste" />
                                    <Link to='/dadosPorMercado'>Veja suas compras</Link> 
                            </div>
                        </li>
                        <li>
                            <div className='info_compras'>
                            <img src={confiancaLogo} alt="Logo Supermecado Confiança" />
                                    <Link to='/dadosPorMercado'>Veja suas compras</Link>   
                            </div>
                        </li>
                        <li>
                            <div className='info_compras'>
                            <img src={panelaoLogo} alt="Logo Supermecado Panelão" />
                                    <Link to='/dadosPorMercado'>Veja suas compras</Link> 
                            </div>
                        </li>
                    </ul>
                </section>
                <section className='secao_compras'>
                

                <section className='secao_compras_produtos'>

                    <h3 className='secao_compras_titulo'> Últimas Compras</h3>

                    <ul className='secao_compras_produtos_lista barraRolagem'>

                        <li className='secao_compras_produtos_lista_item'>

                            <article className='secao_compras_lista_item_produto'>

                                <img src={fotoCarne} alt="Fraldinha" className='secao_compras_lista_item_produto_imagem' />

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

                  
                </section>

            </section>
            </main>
        </div>
    )
}