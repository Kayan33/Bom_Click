import { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginModal from '../components/Login';
import CadastroModal from '../components/Cadastro';

export const AutenticadoContexto = createContext({});

// Definimos uma chave única para a sessão, tornando o armazenamento mais seguro e atômico.
const ASYNC_STORAGE_KEY = '@Auth:session';

export default function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [token, setToken] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true); // Começa como true para exibir um loader inicial
    const [modalAtivo, setModalAtivo] = useState(null);

    const autenticado = !!token && !!usuario;

    // Simplificamos o fluxo de inicialização em um único useEffect.
    // Ele roda apenas uma vez quando o aplicativo é aberto.
    useEffect(() => {
        async function loadSession() {
            try {
                const storedSession = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);

                if (storedSession) {
                    const session = JSON.parse(storedSession);
                    // Definimos o cabeçalho da API antes de verificar o token
                    api.defaults.headers.common['Authorization'] = `Bearer ${session.token}`;

                    // Verificamos se o token ainda é válido na API
                    const resposta = await api.get('/verificaTokenUsuario');

                    if (resposta.data && resposta.data.id) {
                        // Se o token for válido, atualizamos o estado com os dados da sessão
                        setToken(session.token);
                        setUsuario(resposta.data); // Usamos os dados mais recentes da API
                    } else {
                        // Se o token for inválido, limpamos tudo
                        console.warn("Sessão encontrada, mas token inválido. Limpando...");
                        await handleLogoutCleanup();
                    }
                }
            } catch (error) {
                console.error("Erro ao carregar ou verificar a sessão:", error);
                // Se houver qualquer erro (parsing, API), limpamos a sessão por segurança
                await handleLogoutCleanup();
            } finally {
                // Ao final de todo o processo, paramos o carregamento
                setLoadingAuth(false);
            }
        }

        loadSession();
    }, []); // O array vazio [] garante que isso só rode uma vez.

    async function loginEntrada(email, senha) {
        setLoadingAuth(true);
        try {
            const resposta = await api.post('/loginUsuario', { email, senha });

            if (resposta.data && resposta.data.token && resposta.data.id) {
                const sessionData = {
                    token: resposta.data.token,
                    usuario: resposta.data
                };

                // Salvamos o token e os dados do usuário em um único objeto
                await AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(sessionData));
                
                // Atualizamos o cabeçalho da API com o novo token
                api.defaults.headers.common['Authorization'] = `Bearer ${sessionData.token}`;

                setToken(sessionData.token);
                setUsuario(sessionData.usuario);
                
                fecharTodosModais();
                return true;
            } else {
                console.error('Resposta inválida do login:', resposta.data);
                await handleLogoutCleanup(); // Limpa qualquer estado parcial
                return false;
            }
        } catch (err) {
            console.error('Erro de Comunicação no Login:', err);
            await handleLogoutCleanup(); // Limpa qualquer estado parcial
            return false;
        } finally {
            setLoadingAuth(false);
        }
    }
    
    // Função centralizada para limpar estado e AsyncStorage.
    // Usada no logout, e em casos de erro de login ou verificação de token.
    async function handleLogoutCleanup() {
        delete api.defaults.headers.common['Authorization'];
        setToken(null);
        setUsuario(null);
        await AsyncStorage.removeItem(ASYNC_STORAGE_KEY);
    }
    
    async function logout() {
        await handleLogoutCleanup();
        console.log("Usuário deslogado");
    }

    async function cadastrarUsuario({ nome, email, cpf, senha }) {
        try {
            const resposta = await api.post('/CadastroUsuarios', { nome, email, cpf, senha });
            if (resposta.status === 201 || resposta.status === 200) {
                console.log('Cadastro Efetuado com Sucesso via Contexto:', resposta.data);
                return true;
            } else {
                console.warn('Resposta inesperada da API de cadastro:', resposta);
                return false;
            }
        } catch (err) {
            if (err.response) {
                console.error(`Erro ${err.response.status} no Cadastro via Contexto:`, err.response.data);
            } else {
                console.error('Erro de Comunicação no Cadastro via Contexto:', err);
            }
            return false;
        }
    }

    async function deletarUsuario(id) {
        try {
           const resposta = await api.delete(`/DeletaUsuario/${id}`)

            return resposta
        } catch (error) {
            console.log(error);
            
        }
          }

    // Funções de controle dos modais (sem alteração)
    function abrirModalLogin() { setModalAtivo('login'); }
    function abrirModalCadastro() { setModalAtivo('cadastro'); }
    function fecharTodosModais() { setModalAtivo(null); }

    return (
        <AutenticadoContexto.Provider value={{
            autenticado,
            usuario, // Apenas 'usuario', sem o 'dadosUsuario'
            token,
            loadingAuth,
            loginEntrada,
            logout,
            cadastrarUsuario,
            deletarUsuario,
            abrirModalLogin,
            abrirModalCadastro,
            fecharTodosModais,
        }}>
            {children}
            <LoginModal
                visible={modalAtivo === 'login'}
                onClose={fecharTodosModais}
                onLoginSubmit={loginEntrada}
                onNavigateToCadastro={abrirModalCadastro}
            />
            <CadastroModal
                visible={modalAtivo === 'cadastro'}
                onClose={fecharTodosModais}
                onCadastroSubmit={cadastrarUsuario}
                onNavigateToLogin={abrirModalLogin}
            />
        </AutenticadoContexto.Provider>
    );
}