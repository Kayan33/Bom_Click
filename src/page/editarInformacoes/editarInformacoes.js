import '../../assets/cabecalho.css'
import './editarInformacoes.css'
import './editarSenha.css';
import '../../components/SecaoCep/secaoCep.css'

import iconeVoltar from '../../imagens/icon-voltar.svg';
import SecaoCep from '../../components/SecaoCep/SecaoCep'

function EditarInformacoes() {

    return (

        <>

            <header className="cabecalho">

                <a href="/perfil">

                    <img src={iconeVoltar} alt="Voltar para perfil" />

                </a>

                <h1 className="cabecalho_titulo">Editar Informações</h1>

            </header>

            <section className='secao_informacoesPessoais'>

                <form action="" className='secao_informacoesPessoais_formulario'>

                    <fieldset className='secao_informacoesPessoais_formulario_container'>

                        <legend className='secao_informacoesPessoais_formulario_container_titulo'>Informações Pessoais</legend>

                        <div className='secao_informacoesPessoais_formulario_container_campo'>

                            <label for="user" className='secao_informacoesPessoais_formulario_container_campo_titulo'>Nome:</label>

                            <input type="text" id="user" value="Felipe Da Silva Jr" className='secao_informacoesPessoais_formulario_container_campo_valor' disabled />

                            <label for="alterarNome" className='iconeEditar'></label>

                            <input type="checkbox" name="" id="alterarNome" value="Alterar nome"
                                className='secao_informacoesPessoais_formulario_container_campo_checkbox' />

                        </div>

                        <div className='secao_informacoesPessoais_formulario_container_campo'>

                            <label for="cpf" className='secao_informacoesPessoais_formulario_container_campo_titulo'>CPF:</label>

                            <input type="text" id="cpf" value="581.021.984.69" className='secao_informacoesPessoais_formulario_container_campo_valor' disabled />

                            <label for="alterarCpf" className='iconeEditar'></label>

                            <input type="checkbox" name="" id="alterarCpf" value="Alterar CPF"
                                className='secao_informacoesPessoais_formulario_container_campo_checkbox' />

                        </div>

                        <div className='secao_informacoesPessoais_formulario_container_campo'>

                            <label for="dataNascimento" className='secao_informacoesPessoais_formulario_container_campo_titulo'>Data de Nascimento:</label>

                            <input type="text" id="dataNascimento" value="05/08/1999" className='secao_informacoesPessoais_formulario_container_campo_valor' disabled />

                            <label for="alterarDataNascimento" className='iconeEditar'></label>

                            <input type="checkbox" name="" id="alterarDataNascimento" value="Alterar data de nascimento"
                                className='secao_informacoesPessoais_formulario_container_campo_checkbox' />

                        </div>

                    </fieldset>

                </form>

            </section>

            <section className='secao_senha'>

                <form action="" className='secao_senha_formulario'>

                    <fieldset className='secao_senha_formulario_container'>

                        <label for="senha" className='secao_senha_formulario_container_titulo'>Senha:</label>

                        <div className='secao_senha_formulario_container_campo' >

                            <input type="password" id="senha" value="1231233123" className='secao_senha_formulario_container_campo_valor' />

                            <label for="mostrarSenha" className='iconeMostrarSenha'></label>

                            <input type="checkbox" name="" id="mostrarSenha" value="Ver senha" className='secao_senha_formulario_container_campo_checkbox' />

                            <button className='secao_senha_formulario_container_campo_botao'>Redefinir senha</button>


                        </div>

                    </fieldset>

                </form>

            </section>

 
            <SecaoCep/> 


            <form action="">

                <fieldset>

                    <legend>Formas de pagamento</legend>

                    <div>
                        <div></div>
                        <label for="user">Alimentação Alelo</label>
                        <input type="text" id="user" value="0800 0800 0800 0800" />
                        <button></button>
                    </div>

                    <div>
                        <div></div>
                        <label for="user">Alimentação Alelo</label>
                        <input type="text" id="user" value="0800 0800 0800 0800" />
                        <button></button>
                    </div>

                    <button>Adicionar Cartão</button>

                </fieldset>

            </form>

            <section>

                <form action="">

                    <fieldset>
                        <button>Apagar conta</button>
                    </fieldset>

                </form>

                <form action="">

                    <fieldset>

                        <button></button>

                    </fieldset>

                </form>

            </section>

        </>

    )
}

export default EditarInformacoes;