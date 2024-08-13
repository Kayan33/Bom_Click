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
                    <img src={perfil} alt="" /> {/*Colocar tag Link*/}
                    <p>Editar Informações</p> {/*Colocar tag Link*/}
                    <h2>Olá Danrley!</h2>
                </section>
                <section>
                    <h3>Suas estatísticas!</h3>
                    <ul>
                        <li>Valores economizados</li>
                        <li>Valores economizados</li>
                        <li>Valores economizados</li>
                        <li>Valores economizados</li>
                        <li>Valores economizados</li>
                    </ul>
                </section>
                <section>
                    <h3>Informações por mercados</h3>
                    <ul>
                        <li><img src="" alt="" />Veja suas compras</li>
                        <li><img src="" alt="" />Veja suas compras</li>
                        <li><img src="" alt="" />Veja suas compras</li>
                    </ul>
                </section>
                <section>
                    <h3>Última compra</h3>
                    <img src="" alt="" />
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </section>
            </main>
               
        </div>
    )
}