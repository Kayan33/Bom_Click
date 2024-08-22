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

            <form action="">

                <fieldset>

                    <legend>Informações Pessoais</legend>

                    <label for="user">Nome:</label>
                    <input type="text" id="user" value="Felipe Da Silva Jr" disabled />
                    <input type="checkbox" name="" id="user" value="Alterar nome" />

                    <label for="cpf">CPF:</label>
                    <input type="text" id="cpf" disabled />
                    <input type="checkbox" name="" id="cpf" value="Alterar cpf" />

                    <label for="dataNascimento">Data de Nascimento:</label>
                    <input type="text" id="dataNascimento" disabled />
                    <input type="checkbox" name="" id="dataNascimento" value="Alterar data de nascimento" />

                </fieldset>

            </form>

            <form action="">

                <fieldset>

                    <label for="senha">Senha:</label>
                    <input type="password" id="senha" />
                    <input type="checkbox" name="" id="senha" value="Ver senha" />

                    <button>Redefinir senha</button>

                </fieldset>

            </form>



            <form action="">

                <fieldset>

                    <legend>Endereço</legend>

                    <label for="user">Nome:</label>
                    <input type="text" id="user" />

                    <label for="cpf">CPF:</label>
                    <input type="text" id="cpf" />

                    <label for="dataNascimento">Data de Nascimento:</label>
                    <input type="text" id="dataNascimento" />

                    <label for="senha">Senha:</label>
                    <input type="password" id="senha" />

                    <button>Redefinir senha</button>

                </fieldset>

            </form>

            <section>

                

            </section>




            <form action="">

                <fieldset>

                    <legend>Formas de pagamento</legend>

                    <label for="user">Nome:</label>
                    <input type="text" id="user" />

                    <label for="cpf">CPF:</label>
                    <input type="text" id="cpf" />

                    <label for="dataNascimento">Data de Nascimento:</label>
                    <input type="text" id="dataNascimento" />

                    <label for="senha">Senha:</label>
                    <input type="password" id="senha" />

                    <button>Redefinir senha</button>

                </fieldset>

            </form>

        </>

    )
}

export default EditarInformacoes;