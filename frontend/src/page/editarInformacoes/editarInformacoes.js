import React, {useState, useEffect, useContext } from 'react'
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { AutenticadoContexto } from '../../Contexts/authContexts';
import '../../assets/cabecalho.css';
import './secaoEditarInformacoes.css';
import './secaoEditarSenha.css';
import './secaoGerenciamentoConta.css';
import '../../components/SecaoCep/secaoCep.css';
import './secaoCartoes.css';

import iconeVoltar from '../../imagens/icon-voltar.svg';
import SecaoCep from '../../components/SecaoCep/SecaoCep';
import ModalAlterarDados from '../../components/modalAlterarDados/ModalAlterarDados';

function EditarInformacoes() {
    const navigate = useNavigate();
    const { autenticado, usuario, logout } = useContext(AutenticadoContexto);
    const [dadosUsuarios, setDadosUsuarios] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalVisivel, setModalVisivel] = useState(false);
   
    
    

    useEffect(() => {
        async function consultarDadosUsuarios() {
            if (!usuario?.id) {
                console.log("ID do usuário não encontrado no contexto.");
                setLoading(false);
                setError("Não foi possível identificar o usuário.");
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const id = usuario.id;
                const resposta = await api.post(`/BuscaUsuariosUnico/${id}`);
                setDadosUsuarios(resposta.data);
                console.log("Dados do usuário:", resposta.data);

            } catch (err) {
                console.error("Erro ao buscar dados do usuário:", err);
                setError("Falha ao carregar informações do perfil.");
                setDadosUsuarios(null);
            } finally {
                setLoading(false);
            }
        }

        if (autenticado) {
            consultarDadosUsuarios();
        } else {
            setLoading(false);
        }

    }, [autenticado, usuario]);

    function isModalVisivel(e) {
        e.preventDefault();
        setModalVisivel(true)
    }


    if (loading) {
        return <div>Carregando perfil...</div>;
    }

    if (error) {
        return <div>Erro ao carregar perfil: {error}</div>;
    }

    function logOutUsuario () {
        logout()
        navigate('/')
    }



    return (
        <>

        {modalVisivel === true && <ModalAlterarDados/>}
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

                            <input type="text" id="user" value={dadosUsuarios.nome} className='secao_informacoesPessoais_formulario_container_campo_valor' disabled />

                            <label for="alterarNome" className='iconeEditar'></label>

                            <input type="checkbox" name="" id="alterarNome" value="Alterar nome"
                                className='secao_informacoesPessoais_formulario_container_campo_checkbox' />

                        </div>

                        <div className='secao_informacoesPessoais_formulario_container_campo'>

                            <label for="cpf" className='secao_informacoesPessoais_formulario_container_campo_titulo'>CPF:</label>

                            <input type="text" id="cpf" value={dadosUsuarios.cpf} className='secao_informacoesPessoais_formulario_container_campo_valor' disabled />

                            <label for="alterarCpf" className='iconeEditar'></label>

                            <input type="checkbox" name="" id="alterarCpf" value="Alterar CPF"
                                className='secao_informacoesPessoais_formulario_container_campo_checkbox' />

                        </div>

                        <div className='secao_informacoesPessoais_formulario_container_campo' id='desabilitado'>

                            <label for="dataNascimento" className='secao_informacoesPessoais_formulario_container_campo_titulo'>Data de Nascimento:</label>

                            <input type="text" id="dataNascimento" value={dadosUsuarios?.data_Nascimento || ''} className='secao_informacoesPessoais_formulario_container_campo_valor' disabled />
                            
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

                            <input type="password" id="senha" value={dadosUsuarios.senha} className='secao_senha_formulario_container_campo_valor' />

                            <label for="mostrarSenha" className='iconeMostrarSenha'></label>

                            <input type="checkbox" name="" id="mostrarSenha" value="Ver senha" className='secao_senha_formulario_container_campo_checkbox' />

                            <button className='secao_senha_formulario_container_campo_botao' onClick={isModalVisivel}>Redefinir Dados</button>


                        </div>

                    </fieldset>

                </form>

            </section>

            <section className='secaoCep'>

                <SecaoCep />

            </section>

            <section className='secaoCartoes' id='desabilitado'>

                <form action="" className='secaoCartoes_formulario'>

                    <fieldset className='secaoCartoes_formulario_container'>

                        <legend className='secaoCartoes_formulario_container_titulo'>Formas de pagamento</legend>

                        <div className='secaoCartoes_formulario_container_cartao'>

                            <div className='secaoCartoes_formulario_container_cartao_icone'></div>

                            <label for="user" className='secaoCartoes_formulario_container_cartao_titulo'>Alimentação Alelo</label>

                            <input type="text" id="user" value="0800 0800 0800 0800" className='secaoCartoes_formulario_container_cartao_numero' />

                            <button aria-label="Excluir cartão" className='secaoCartoes_formulario_container_cartao_botao'></button>
                            
                        </div>

                        <div className='secaoCartoes_formulario_container_cartao'>

                            <div className='secaoCartoes_formulario_container_cartao_icone'></div>

                            <label for="user" className='secaoCartoes_formulario_container_cartao_titulo'>Alimentação Alelo</label>

                            <input type="text" id="user" value="0800 0800 0800 0800" className='secaoCartoes_formulario_container_cartao_numero' />

                            <button aria-label="Excluir cartão" className='secaoCartoes_formulario_container_cartao_botao'></button>
                            
                        </div>

                        <button className='secaoCartoes_formulario_container_botao'>Adicionar Cartão</button>

                    </fieldset>

                </form>

            </section>

            <section className='secaoGerenciamentoConta'>

                <form action="" className='secaoGerenciamentoConta_formularioDeletarConta'>

                    <fieldset className='secaoGerenciamentoConta_formularioDeletarConta_container'>
                        <button className='secaoGerenciamentoConta_formularioDeletarConta_container_botao'>Apagar conta</button>
                    </fieldset>

                </form>

                <form action="" className='secaoGerenciamentoConta_formularioSairConta'>

                    <fieldset className='secaoGerenciamentoConta_formularioSairConta_container'>

                        <button className='secaoGerenciamentoConta_formularioSairConta_container_botao' onClick={logOutUsuario}></button>

                    </fieldset>

                </form>

            </section>

        </>

    )
}

export default EditarInformacoes;