import iconeVoltar from '../../imagens/icon-voltar.svg'
import './perfil.css'
import perfil from '../../imagens/perfil.svg'
import tausteLogo from '../../imagens/tausteLogo.png'
import confiancaLogo from '../../imagens/confiancaLogo.png'
import panelaoLogo from '../../imagens/panelaoLogo.png'
import carne from '../../imagens/carne.png'
import limao from '../../imagens/limao.png'
import '../../assets/cabecalho.css'

export default function Perfil() {
    return (
        <div>
            <header className='cabecalho'>
                <img src={iconeVoltar} alt="Voltar para Página Inicial" />
                <h1 className='cabecalho_titulo'>Perfil</h1>
            </header>   
            <main>
                <section className='secao_perfil'>
                    <a href="/dadosPorMercado">
                        <img src={perfil} alt="icone de perfil" /> {/*Colocar tag Link*/}
                        <p>Editar Informações</p> {/*Colocar tag Link*/}
                    </a>
                    <h2>Olá Danrley!</h2>
                </section>
                <section className='secao_estatisticas'>
                    <h3>Suas estatísticas!</h3>
                    <div className='scroll_valores'>
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
                                <p>Veja suas compras</p>  {/*Colocar tag Link*/}
                            </div>
                        </li>
                        <li>
                            <div>
                                <img src={confiancaLogo} alt="Logo Supermecado Confiança" />
                                <p>Veja suas compras</p>  {/*Colocar tag Link*/}
                            </div>
                        </li>
                        <li>
                            <div>
                                <img src={panelaoLogo} alt="Logo Supermecado Panelão" />
                                <p>Veja suas compras</p>  {/*Colocar tag Link*/}
                            </div>
                        </li>
                    </ul>
                </section>
                <section className='secao_ultimas_compras'>
                    <h3>Última compra</h3>
                    <img src={confiancaLogo} alt="Logo Supermecado Confiança" />
                    <div className='scrool_ultimas_compras'>
                        <ul>
                            <li> {/*Colocar tag Link*/}
                                <div className='scroll_produto'>
                                    <img src={carne} alt=" Imagem de Carne Vermelha" />
                                    <p>Fraldinha Bovina Resfriada KG</p>
                                    <div className='scroll_economia'>
                                        <p>R$ 40,00</p>
                                        <p>R$ 5,00</p>
                                    </div>
                                </div>
                            </li>
                            <li> {/*Colocar tag Link*/}
                                <div className='scroll_produto'>
                                    <img src={limao} alt="Imagem de limão Taiti" />
                                    <p>Limão Taiti KG</p>
                                    <div className='scroll_economia'>
                                        <p>R$ 40,00</p>
                                        <p>R$ 0,00</p>
                                    </div>
                                </div>
                            </li>
                            <li> {/*Colocar tag Link*/}
                                <div className='scroll_produto'>
                                    <img src={carne} alt="Imagem de Carne Vermelha" />
                                    <p>Alho KG</p>
                                    <div className='scroll_economia'>
                                        <p>R$ 0,50</p>
                                        <p>R$ 0,00</p>
                                    </div>
                                </div>
                            </li>
                            <li>  {/*Colocar tag Link*/}
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