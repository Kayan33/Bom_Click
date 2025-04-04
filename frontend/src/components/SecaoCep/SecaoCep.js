import React, {useState, useEffect, useContext } from 'react'
import api from '../../services/api';
import { AutenticadoContexto } from '../../Contexts/authContexts';

function SecaoCep() {

    const { autenticado, usuario } = useContext(AutenticadoContexto);
    const [dadosUsuarios, setDadosUsuarios] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) {
        return <div>Carregando perfil...</div>;
    }

    if (error) {
        return <div>Erro ao carregar perfil: {error}</div>;
    }

    return (

        <>

                <form action="" className='secaoCep_formulario' id='desabilitado'>

                    <fieldset className='secaoCep_formulario_container'>

                        <legend className='secaoCep_formulario_container_titulo'>Endereço</legend>

                        <div className='secaoCep_formulario_container_campo'>

                            <label for="cep" className='secaoCep_formulario_container_campo_titulo'>Cep:</label>
                            <input type="text" id="cep" value={dadosUsuarios?.cep || 'Adicionar'} className='secaoCep_formulario_container_campo_valor' />

                            <label for="alterarCep" className='iconeEditar'></label>
                            <input type="checkbox" name="" id="alterarCep" className='secaoCep_formulario_container_campo_checkbox' />

                        </div>

                        <label for="logradouro" className='secaoCep_formulario_container_campo_titulo'>Logradouro:</label>
                        <input type="text" id="logradouro" value="Rua Engenheiro Saint Martin" className='secaoCep_formulario_container_campo_valor secaoCep_formulario_container_campo_valor--width' />

                        <label for="bairro" className='secaoCep_formulario_container_campo_titulo'>Bairro:</label>
                        <input type="text" id="bairro" value="Centro" className='secaoCep_formulario_container_campo_valor secaoCep_formulario_container_campo_valor--width' />

                        <div className='secaoCep_formulario_container_campo'>

                            <label for="numero" className='secaoCep_formulario_container_campo_titulo'>Número:</label>
                            <input type="text" id="numero" value="10-12" className='secaoCep_formulario_container_campo_valor' />

                            <label for="alterarCep" className='iconeEditar'></label>
                            <input type="checkbox" name="" id="alterarCep" className='secaoCep_formulario_container_campo_checkbox' />

                        </div>

                    </fieldset>

                </form>

        </>
    )
}

export default SecaoCep;