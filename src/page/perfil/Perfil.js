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
                <img src={perfil} alt="" />
           
        </div>
    )
}