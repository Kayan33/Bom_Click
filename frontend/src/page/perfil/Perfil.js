import iconeVoltar from '../../imagens/icon-voltar.svg';
import '../perfil/perfil.css';
import perfilIcone from '../../imagens/perfil-pagePerfil.svg';
import tausteLogo from '../../imagens/tausteLogo.png';
import confiancaLogo from '../../imagens/confiancaLogo.png';
import panelaoLogo from '../../imagens/panelaoLogo.png';
import fotoCarne from '../../imagens/carne.png';
import limao from '../../imagens/limao.png';
import batata from '../../imagens/batata.png';
import alho from '../../imagens/alho.png';
import '../../assets/cabecalho.css';
import { Link } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react'; 
import { AutenticadoContexto } from '../../Contexts/authContexts'; 
import Login from '../../components/login/Login';
import api from '../../services/api';

export default function Perfil() {
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
        <div>
            <header className='cabecalho'>
                <Link to='/' className='cabecalho_link'>
                    <img src={iconeVoltar} alt="Voltar para Página Inicial" />
                </Link>
                <h1 className='cabecalho_titulo'>Perfil</h1>
            </header>

            <main>
                {autenticado && (
                    <>
                        <section className='secao_perfil'>
                            <Link to="/editarInformacoes">
                                <img src={perfilIcone} alt="icone de perfil" id='icon-page-perfil' />
                                <p>Editar Informações</p>
                            </Link>
                            <h2>Olá {dadosUsuarios?.nome || 'Usuario'}</h2>
                        </section>

                        <section className='perfil_secao_estatisticas'>
                            <h3>Suas estatísticas!</h3>
                            <ul className='barraRolagem barraRolagem--amarelo'>
                                <li>
                                    <div className='scroll_item'>
                                        <p>Valores economizados</p>
                                        <p>R$ 40,50</p>
                                    </div>
                                </li>
                             </ul>
                        </section>

                        <section className='secao_info_mercados'>
                            <h3>Informações por mercados</h3>
                            <ul className='barraRolagem'>
                                <li>
                                    <div className='info_compras'>
                                        <Link to='/dadosPorMercado'>
                                            <img src={tausteLogo} alt="Logo Supermecado Tauste" />
                                            <p>Veja suas compras</p>
                                        </Link>
                                    </div>
                                </li>
                                 <li>
                                    <div className='info_compras'>
                                        <Link to='/dadosPorMercado'>
                                            <img src={confiancaLogo} alt="Logo Supermecado Confiança" />
                                            <p>Veja suas compras</p>
                                        </Link>
                                    </div>
                                </li>
                                 <li>
                                    <div className='info_compras'>
                                        <Link to='/dadosPorMercado'>
                                            <img src={panelaoLogo} alt="Logo Supermecado Panelão" />
                                            <p>Veja suas compras</p>
                                        </Link>
                                    </div>
                                </li>
                            </ul>
                        </section>

                        <section className='secao_compras'>
                            <section className='secao_compras_produtos'>
                                <h3 className='secao_compras_titulo'> Últimas Compras</h3>
                                <ul className='secao_compras_produtos_lista barraRolagem'>
                                    <li className='secao_compras_produtos_lista_item'>
                                        <article className='secao_compras_lista_item_produto'>
                                            <img src={fotoCarne} alt="Fraldinha" className='secao_compras_lista_item_produto_imagem' />
                                            <h3 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo'>Fraldinha Bovina Resfriada KG</h3>
                                            <div className='secao_compras_lista_item_produto_valores'>
                                                <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--preço'>R$40,00</h4>
                                                <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--desconto secao_compras_lista_item_produto_titulo--amarelo'>R$40,00</h4>
                                            </div>
                                        </article>
                                    </li>
                                     <li className='secao_compras_produtos_lista_item'>
                                         <article className='secao_compras_lista_item_produto'>
                                             <img src={limao} alt="Limao" className='secao_compras_lista_item_produto_imagem' />
                                             <h3 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo'>Limao Taiti KG</h3>
                                             <div className='secao_compras_lista_item_produto_valores'>
                                                 <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--preço'>R$10,00</h4>
                                                 <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--desconto secao_compras_lista_item_produto_titulo--amarelo'>R$40,00</h4>
                                             </div>
                                         </article>
                                     </li>
                                     <li className='secao_compras_produtos_lista_item'>
                                         <article className='secao_compras_lista_item_produto'>
                                             <img src={alho} alt="Alho" className='secao_compras_lista_item_produto_imagem' />
                                             <h3 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo'>Alho UN</h3>
                                             <div className='secao_compras_lista_item_produto_valores'>
                                                 <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--preço'>R$0,50</h4>
                                                 <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--desconto secao_compras_lista_item_produto_titulo--amarelo'>R$40,00</h4>
                                             </div>
                                         </article>
                                     </li>
                                     <li className='secao_compras_produtos_lista_item'>
                                         <article className='secao_compras_lista_item_produto'>
                                             <img src={batata} alt="Batata" className='secao_compras_lista_item_produto_imagem' />
                                             <h3 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo'>Batata UN</h3>
                                             <div className='secao_compras_lista_item_produto_valores'>
                                                 <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--preço'>R$5,00</h4>
                                                 <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--desconto secao_compras_lista_item_produto_titulo--amarelo'>R$1,00</h4>
                                             </div>
                                         </article>
                                     </li>
                                </ul>
                            </section>
                        </section>
                    </>
                )}

                {!autenticado && (
                    <Login />
                )}
            </main>
        </div>
    );
}