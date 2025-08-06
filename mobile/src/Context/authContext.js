import { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginModal from '../components/Login';
import CadastroModal from '../components/Cadastro';

export const AutenticadoContexto = createContext({});

const ASYNC_STORAGE_KEY = '@Auth:session';

export default function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [token, setToken] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [modalAtivo, setModalAtivo] = useState(null);

    const autenticado = !!token && !!usuario;

    useEffect(() => {
        async function loadSession() {
            try {
                const storedSession = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);

                if (storedSession) {
                    const session = JSON.parse(storedSession);
                    api.defaults.headers.common['Authorization'] = `Bearer ${session.token}`;
                  
                    const resposta = await api.get('/verificaTokenUsuario');

                    if (resposta.data && resposta.data.id) {
                     
                        setToken(session.token);
                        setUsuario(resposta.data);
                    } else {
                        console.warn("Sessão encontrada, mas token inválido. Limpando...");
                        await handleLogoutCleanup();
                    }
                }
            } catch (error) {
                console.error("Erro ao carregar ou verificar a sessão:", error);
                await handleLogoutCleanup();
            } finally {
                setLoadingAuth(false);
            }
        }

        loadSession();
    }, []);

    async function loginEntrada(email, senha) {
        setLoadingAuth(true);
        try {
            const resposta = await api.post('/loginUsuario', { email, senha });

            if (resposta.data && resposta.data.token && resposta.data.id) {
                const sessionData = {
                    token: resposta.data.token,
                    usuario: resposta.data
                };
               
                await AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(sessionData));
                
                api.defaults.headers.common['Authorization'] = `Bearer ${sessionData.token}`;

                setToken(sessionData.token);
                setUsuario(sessionData.usuario);
                
                fecharTodosModais();
                return true;
            } else {
                console.error('Resposta inválida do login:', resposta.data);
                await handleLogoutCleanup();
                return false;
            }
        } catch (err) {
            console.error('Erro de Comunicação no Login:', err);
            await handleLogoutCleanup(); 
            return false;
        } finally {
            setLoadingAuth(false);
        }
    }
    
  
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

    
    function abrirModalLogin() { setModalAtivo('login'); }
    function abrirModalCadastro() { setModalAtivo('cadastro'); }
    function fecharTodosModais() { setModalAtivo(null); }

    return (
        <AutenticadoContexto.Provider value={{
            autenticado,
            usuario,
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