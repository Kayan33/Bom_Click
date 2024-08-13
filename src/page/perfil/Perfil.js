import iconeVoltar from '../../imagens/icon-voltar.svg'
import './perfil.css'
import perfil from '../../imagens/perfil.svg'

export default function Perfil() {
    return (
        <div>
            <header>
                <img src={iconeVoltar} alt="Voltar para Página Inicial" />
                <h1>Perfil</h1>
            </header>   
            <main>
                <section>
                    <img src={perfil} alt="icone de perfil" /> {/*Colocar tag Link*/}
                    <p>Editar Informações</p> {/*Colocar tag Link*/}
                    <h2>Olá Danrley!</h2>
                </section>
                <section>
                    <h3>Suas estatísticas!</h3>
                    <ul>
                        <li>
                            <div>
                                <p>Valores economizados</p>
                                <p>R$ 40,50</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>Valores economizados</p>
                                <p>R$ 40,50</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>Valores economizados</p>
                                <p>R$ 40,50</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>Valores economizados</p>
                                <p>R$ 40,50</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>Valores economizados</p>
                                <p>R$ 40,50</p>
                            </div>
                        </li>
                    </ul>
                </section>
                <section>
                    <h3>Informações por mercados</h3>
                    <ul>
                        <li>
                            <div>
                                <img src="" alt="" />
                                <p>Veja suas compras</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <img src="" alt="" />
                                <p>Veja suas compras</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <img src="" alt="" />
                                <p>Veja suas compras</p>
                            </div>
                        </li>
                    </ul>
                </section>
                <section>
                    <h3>Última compra</h3>
                    <img src="" alt="" />
                    <ul>
                        <li>
                            <div>
                                <img src="" alt="" />
                                <p>Fraldinha Bovina Resfriada KG</p>
                                <div>
                                    <p>R$ 40,00</p>
                                    <p>R$ 5,00</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div>
                                <img src="" alt="" />
                                <p>Limão Taiti KG</p>
                                <div>
                                    <p>R$ 40,00</p>
                                    <p>R$ 0,00</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div>
                                <img src="" alt="" />
                                <p>Alho KG</p>
                                <div>
                                    <p>R$ 0,50</p>
                                    <p>R$ 0,00</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div>
                                <img src="" alt="" />
                                <p>Óleo ML</p>
                                <div>
                                    <p>R$ 40,00</p>
                                    <p>R$ 5,00</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div>
                                <img src="" alt="" />
                                <p>Arroz KG</p>
                                <div>
                                    <p>R$ 45,00</p>
                                    <p>R$ 7,00</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </section>
            </main>
               
        </div>
    )
}