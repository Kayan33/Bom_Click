import iconeVoltar from '../../imagens/icon-voltar.svg'
import '../perfil/perfil.css'
import perfil from '../../imagens/perfil-pagePerfil.svg'
import tausteLogo from '../../imagens/tausteLogo.png'
import confiancaLogo from '../../imagens/confiancaLogo.png'
import panelaoLogo from '../../imagens/panelaoLogo.png'
import carne from '../../imagens/carne.png'
import limao from '../../imagens/limao.png'
import '../../assets/cabecalho.css'
import { Link } from 'react-router-dom'

export default function Perfil() {
    return (
        <div>
            <header className='cabecalho'>
                <Link to='/'><img src={iconeVoltar} alt="Voltar para Página Inicial" /></Link>
                <h1 className='cabecalho_titulo'>Perfil</h1>
            </header>   
            <main>
                <section className='secao_perfil'>
                    <Link to="/dadosPorMercado">
                        <img src={perfil} alt="icone de perfil" id='icon-page-perfil'/> 
                        <p>Editar Informações</p> 
                    </Link>
                    <h2>Olá Danrley!</h2>
                </section>
                <section className='perfil_secao_estatisticas'>
                    <h3>Suas estatísticas!</h3>
                    <div className='perfil_scroll_valores'>
                        <ul>
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
                    </div>
                </section>
                <section className='secao_info_mercados'>
                    <h3>Informações por mercados</h3>
                    <ul>
                        <li>
                            <div>
                                <img src={tausteLogo} alt="Logo Supermecado Tauste" />
                                <Link to='/dadosPorMercado'>Veja suas compras</Link> 
                            </div>
                        </li>
                        <li>
                            <div>
                                <img src={confiancaLogo} alt="Logo Supermecado Confiança" />
                                <Link to='/dadosPorMercado'>Veja suas compras</Link>   
                            </div>
                        </li>
                        <li>
                            <div>
                                <img src={panelaoLogo} alt="Logo Supermecado Panelão" />
                                <Link to='/dadosPorMercado'>Veja suas compras</Link> 
                            </div>
                        </li>
                    </ul>
                </section>
                <section className='secao_ultimas_compras'>
                    <h3>Última compra</h3>
                    <img src={confiancaLogo} alt="Logo Supermecado Confiança" />
                    <div className='scrool_ultimas_compras'>
                        <ul>
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
                                        <img src={carne} alt="Imagem de Carne Vermelha" />
                                        <p>Alho KG</p>
                                        <div className='scroll_economia'>
                                            <p>R$ 0,50</p>
                                            <p>R$ 0,00</p>
                                        </div>
                                </div>
                            </li>
                            <li> 
                                <div className='scroll_produto'>
                                        <img src={limao} alt="Imagem de Limão Taiti" />
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
            </main>
               
        </div>
    )
}