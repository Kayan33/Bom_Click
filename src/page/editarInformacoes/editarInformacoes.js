import '../../assets/cabecalho.css'
import iconeVoltar from '../../imagens/icon-voltar.svg';

function EditarInformacoes() {

    return (

        <>

            <header className="cabecalho">

                <a href="/perfil">

                    <img src={iconeVoltar} alt="Voltar para perfil" />

                </a>

                <h1 className="cabecalho_titulo">Editar Informações</h1>

            </header>


            <h2>Informações Pessoais</h2>

            <form action="">

                <label for="user">Nome:</label>
                <input type="text" id="user" />

                <label for="cpf">CPF:</label>
                <input type="text" id="cpf" />

                <label for="dataNascimento">Data de Nascimento:</label>
                <input type="text" id="dataNascimento" />

            </form>

            <form action="">

                <label for="senha">Senha:</label>
                <input type="password" id="senha" />

                <button>Redefinir senha</button>

            </form>

            <h2>Endereço</h2>

            <form action="">

                <label for="user">Nome:</label>
                <input type="text" id="user" />

                <label for="cpf">CPF:</label>
                <input type="text" id="cpf" />

                <label for="dataNascimento">Data de Nascimento:</label>
                <input type="text" id="dataNascimento" />

                <label for="senha">Senha:</label>
                <input type="password" id="senha" />

                <button>Redefinir senha</button>

            </form>

            <h2>Endereço</h2>
            
            <form action="">

                <label for="user">Nome:</label>
                <input type="text" id="user" />

                <label for="cpf">CPF:</label>
                <input type="text" id="cpf" />

                <label for="dataNascimento">Data de Nascimento:</label>
                <input type="text" id="dataNascimento" />

                <label for="senha">Senha:</label>
                <input type="password" id="senha" />

                <button>Redefinir senha</button>

            </form>

        </>

    )
}

export default EditarInformacoes;