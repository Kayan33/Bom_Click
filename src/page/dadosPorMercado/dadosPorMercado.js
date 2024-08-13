import './dadosPorMercado.css'
import '../../components/cabecalho.css'
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


        </>
    )
}

export default DadosPorMercado