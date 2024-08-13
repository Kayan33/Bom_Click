import './secaoEstatisticas.css'
import '../../assets/cabecalho.css'
import iconeVoltar from '../../imagens/icon-voltar.svg'

function DadosPorMercado() {
    return (
        <>

            <header className='cabecalho'>
                <a href="#" className="cabecalho__link" aria-label="Voltar para o perfil">  
                    <img src={iconeVoltar} alt="Voltar para o perfil" className="cabecalho__link"/>
                </a>

                <h1 className='cabecalho_titulo'>Confiança</h1>

            </header>

                <section className='secao_estatisticas'>

                    <div className='secao_estatisticas_item'>
                        <span className='secao_estatisticas_item_titulo'>Compras realizadas</span>
                        <span className='secao_estatisticas_item_valor'>2</span>
                    </div>

                    <div className='secao_estatisticas_item'>
                        <span>Valores gastos</span>
                        <span>2</span>
                    </div>

                    <div className='secao_estatisticas_item'>
                        <span>Valores Economizados</span>
                        <span>2</span>
                    </div>

                </section>


        </>
    )
}

export default DadosPorMercado