import { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

export const AutenticadoContexto = createContext({});

export const useAuth = () => {
    return useContext(AutenticadoContexto);
}

export default function AuthProvider({ children }) {
    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem('@token');
        return storedToken ? JSON.parse(storedToken) : null;
    });
    const [usuario, setUsuario] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);

    const autenticado = !!token && !!usuario;

    useEffect(() => {
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete api.defaults.headers.common['Authorization'];
        }
    }, [token]);


    async function verificarToken() {
        setLoadingAuth(true);
        const iToken = localStorage.getItem('@token');
        if (!iToken) {
            setUsuario(null);
            setToken(null);
            setLoadingAuth(false);
            return;
        }
        const tokenU = JSON.parse(iToken);
        setToken(tokenU); // Set token state early

        try {
            const resposta = await api.get('/verificaTokenUsuario');
            if (resposta.data && resposta.data.id) {
                setUsuario(resposta.data);
                localStorage.setItem('@id', JSON.stringify(resposta.data.id));
                localStorage.setItem('@nome', JSON.stringify(resposta.data.nome));
            } else {
                setUsuario(null);
                setToken(null);
                localStorage.removeItem('@token');
                localStorage.removeItem('@id');
                localStorage.removeItem('@nome');
            }
        } catch (err) {
            console.error("Erro ao verificar token:", err);
            setUsuario(null);
            setToken(null);
            localStorage.removeItem('@token');
            localStorage.removeItem('@id');
            localStorage.removeItem('@nome');
        } finally {
            setLoadingAuth(false);
        }
    }

    async function loginEntrada(email, senha) {
        try {
            const resposta = await api.post('/loginUsuario', { email, senha });
            if (resposta.data && resposta.data.id && resposta.data.token && resposta.data.nome) {
                localStorage.setItem('@id', JSON.stringify(resposta.data.id));
                localStorage.setItem('@token', JSON.stringify(resposta.data.token));
                localStorage.setItem('@nome', JSON.stringify(resposta.data.nome));
                setUsuario(resposta.data);
                setToken(resposta.data.token);
                return true;
            } else {
                console.error('Resposta inválida do login:', resposta.data);
                setUsuario(null);
                setToken(null);
                return false;
            }
        } catch (err) {
            console.error('Erro de Comunicação no Login:', err);
            setUsuario(null);
            setToken(null);
            localStorage.removeItem('@token');
            localStorage.removeItem('@id');
            localStorage.removeItem('@nome');
            return false;
        }
    }

    function logout() {
         setUsuario(null);
         setToken(null);
         localStorage.removeItem('@token');
         localStorage.removeItem('@id');
         localStorage.removeItem('@nome');
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

    useEffect(() => {
        verificarToken();
    }, []);

    return (
        <AutenticadoContexto.Provider value={{ autenticado, usuario, token, loadingAuth, loginEntrada, logout, cadastrarUsuario }}>
            {!loadingAuth ? children : <div>Verificando autenticação...</div>}
        </AutenticadoContexto.Provider>
    );
}