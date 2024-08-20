import '../../assets/cabecalho.css'
import iconeVoltar from '../../imagens/icon-voltar.svg';

function EditarInformacoes(){

    return(

        <>

            <header className="cabecalho">

                <a href="/perfil">

                    <img src={iconeVoltar} alt="Voltar para perfil"/>

                </a>

                <h1 className="cabecalho_titulo">Editar Informações</h1>

            </header>
        
        </>

    )
}

export default EditarInformacoes;