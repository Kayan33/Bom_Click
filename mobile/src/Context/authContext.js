import { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginModal from '../components/Login';
import CadastroModal from '../components/Cadastro';

export const AutenticadoContexto = createContext({});

export default function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);

    const [modalAtivo, setModalAtivo] = useState(null);

    const autenticado = !!token && !!usuario;

    function abrirModalLogin() {
        setModalAtivo('login');
    }

    function abrirModalCadastro() {
        setModalAtivo('cadastro');
    }

    function fecharTodosModais() {
        setModalAtivo(null);
    }

    useEffect(() => {
        async function loadStoredTokenAndUser() {
            try {
                const storedToken = await AsyncStorage.getItem('@token');
                const storedUser = await AsyncStorage.getItem('@usuario');

                let parsedToken = null;
                if (storedToken) {
                    try {
                        parsedToken = JSON.parse(storedToken);
                    } catch (e) {
                        console.error("Erro ao fazer parse do token do AsyncStorage, limpando-o:", storedToken, e);
                        await AsyncStorage.removeItem('@token');
                    }
                }
                setToken(parsedToken);

                let parsedUser = null;
                if (storedUser) {
                    try {
                        parsedUser = JSON.parse(storedUser);
                    } catch (e) {
                        console.error("Erro ao fazer parse do usuário do AsyncStorage, limpando-o:", storedUser, e);
                        await AsyncStorage.removeItem('@usuario');
                    }
                }
                setUsuario(parsedUser);

            } catch (error) {
                console.error("Erro ao carregar dados do AsyncStorage:", error);
                setToken(null);
                setUsuario(null);
            } finally {
                if (!token) {
                    setLoadingAuth(false);
                }
            }
        }

        loadStoredTokenAndUser();
    }, []);

    useEffect(() => {

        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            verificarToken();
        } else {
            delete api.defaults.headers.common['Authorization'];
            setUsuario(null);
            setLoadingAuth(false);
        }
    }, [token]);


    async function verificarToken() {
        setLoadingAuth(true);
        let currentToken = token;
        if (!currentToken) {
            try {
                const storedToken = await AsyncStorage.getItem('@token');
                if (storedToken) {
                    try {
                        currentToken = JSON.parse(storedToken);
                        setToken(currentToken);
                    } catch (e) {
                        console.error("Erro ao analisar token no verificarToken, limpando:", storedToken, e);
                        await AsyncStorage.removeItem('@token');
                        currentToken = null;
                    }
                }
            } catch (e) {
                console.error("Erro ao buscar token no AsyncStorage em verificarToken:", e);
                currentToken = null;
            }
        }


        if (!currentToken) {
            setUsuario(null);
            setToken(null);
            setLoadingAuth(false);
            return;
        }

        try {
            const resposta = await api.get('/verificaTokenUsuario');
            if (resposta.data && resposta.data.id) {
                setUsuario(resposta.data);
                await AsyncStorage.setItem('@id', JSON.stringify(resposta.data.id));
                await AsyncStorage.setItem('@nome', JSON.stringify(resposta.data.nome));
                await AsyncStorage.setItem('@usuario', JSON.stringify(resposta.data));
            } else {
                console.warn("Token inválido ou resposta da API incompleta ao verificar token:", resposta.data);
                setUsuario(null);
                setToken(null);
                await AsyncStorage.removeItem('@token');
                await AsyncStorage.removeItem('@id');
                await AsyncStorage.removeItem('@nome');
                await AsyncStorage.removeItem('@usuario');
            }
        } catch (err) {
            console.error("Erro ao verificar token na API:", err);

            setUsuario(null);
            setToken(null);
            await AsyncStorage.removeItem('@token');
            await AsyncStorage.removeItem('@id');
            await AsyncStorage.removeItem('@nome');
            await AsyncStorage.removeItem('@usuario');
        } finally {
            setLoadingAuth(false);
        }
    }

    async function loginEntrada(email, senha) {
        setLoadingAuth(true);
        try {
            const resposta = await api.post('/loginUsuario', { email, senha });
            if (resposta.data && resposta.data.id && resposta.data.token && resposta.data.nome) {
                await AsyncStorage.setItem('@id', JSON.stringify(resposta.data.id));
                await AsyncStorage.setItem('@token', JSON.stringify(resposta.data.token));
                await AsyncStorage.setItem('@nome', JSON.stringify(resposta.data.nome));
                await AsyncStorage.setItem('@usuario', JSON.stringify(resposta.data));

                setUsuario(resposta.data);
                setToken(resposta.data.token);
                setLoadingAuth(false);
                fecharTodosModais()
                return true;
            } else {
                console.error('Resposta inválida do login:', resposta.data);
                setUsuario(null);
                setToken(null);
                setLoadingAuth(false);
                return false;
            }
        } catch (err) {
            console.error('Erro de Comunicação no Login:', err);
            setUsuario(null);
            setToken(null);
            await AsyncStorage.removeItem('@token');
            await AsyncStorage.removeItem('@id');
            await AsyncStorage.removeItem('@nome');
            await AsyncStorage.removeItem('@usuario');
            setLoadingAuth(false);
            return false;
        }
    }

    async function logout() {
        setUsuario(null);
        setToken(null);
        await AsyncStorage.removeItem('@token');
        await AsyncStorage.removeItem('@id');
        await AsyncStorage.removeItem('@nome');
        await AsyncStorage.removeItem('@usuario');
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

    return (
        <AutenticadoContexto.Provider value={{
            autenticado, usuario, token, loadingAuth, loginEntrada, logout, cadastrarUsuario,
            abrirModalLogin,
            abrirModalCadastro,
            fecharTodosModais
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