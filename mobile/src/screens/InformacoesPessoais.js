import React, { useState, useEffect, useContext } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AutenticadoContexto } from '../Context/authContext';
import api from '../services/api';
import IconeOlho from '../components/icones/IconeOlho';

export default function InformacoesPessoais() {
    const navigation = useNavigation();
    const { autenticado, usuario, logout } = useContext(AutenticadoContexto);

    const [dadosUsuarios, setDadosUsuarios] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [modalAlterarVisivel, setModalAlterarVisivel] = useState(false);
    // const [modalDeletarVisivel, setModalDeletarVisivel] = useState(false);
    const [mostrarSenha, setMostrarSenha] = useState(false);

    useEffect(() => {
        async function consultarDadosUsuarios() {
            if (!usuario?.id) {
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
            } catch (err) {
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

    const toggleMostrarSenha = () => {
        setMostrarSenha(prevState => !prevState);
    };

    // As funções de modal não precisam do 'e.preventDefault()' no ambiente nativo
    // const isModalAlterarVisivel = () => setModalAlterarVisivel(true);
    // const handleCloseAlterarModal = () => setModalAlterarVisivel(false);
    // const isModalDeletarVisivel = () => setModalDeletarVisivel(true);
    // const handleCloseDeletarModal = () => setModalDeletarVisivel(false);

    function logOutUsuario() {
        logout();
        navigation.navigate('Inicial');
    }

    if (loading) {
        return <View style={styles.center}><ActivityIndicator size="large" /></View>;
    }

    if (error) {
        return <View style={styles.center}><Text>{error}</Text></View>;
    }

    if (!dadosUsuarios) {
        return <View style={styles.center}><Text>Nenhum dado de usuário encontrado.</Text></View>;
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView>
                {/* Modais continuam iguais */}
                {/* {modalAlterarVisivel && (
                    <ModalAlterarDados
                        onClose={handleCloseAlterarModal}
                        dadosParaAlterar={{ nome: dadosUsuarios.nome }}
                        usuarioId={usuario.id}
                    />
                )} */}
                {/* {modalDeletarVisivel && (
                    <ModalDeletarUsuarios
                        isOpen={modalDeletarVisivel}
                        onClose={handleCloseDeletarModal}
                    />
                )} */}

                <View style={styles.cabecalho}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text>Voltar</Text>
                    </TouchableOpacity>
                    <Text style={styles.cabecalho_titulo}>Editar Informações</Text>
                </View>

                <View style={styles.secao}>
                    <View style={styles.containerFieldset}>
                        <Text style={styles.tituloFieldset}>Informações Pessoais</Text>

                        <View style={styles.campo}>
                            <Text style={styles.campo_titulo}>Nome:</Text>
                            <TextInput
                                style={styles.campo_valor}
                                value={dadosUsuarios.nome || ''}
                                editable={false}
                            />
                        </View>

                        <View style={styles.campo}>
                            <Text style={styles.campo_titulo}>CPF:</Text>
                            <TextInput
                                style={styles.campo_valor}
                                value={dadosUsuarios.cpf || ''}
                                editable={false}
                            />
                        </View>

                        <View style={styles.campo}>
                            <Text style={styles.campo_titulo}>Data de Nascimento:</Text>
                            <TextInput
                                style={styles.campo_valor}
                                value={dadosUsuarios?.data_Nascimento || ''}
                                editable={false}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.secao}>
                    <View style={styles.containerFieldset}>
                        <Text style={styles.campo_titulo}>Senha:</Text>
                        <View style={styles.campo}>
                            <TextInput
                                secureTextEntry={!mostrarSenha}
                                id="senha"
                                value={dadosUsuarios.senha || ''}
                                style={styles.campo_valor}
                                editable={false}
                            />
                            <TouchableOpacity onPress={toggleMostrarSenha}>
                                <IconeOlho />
                                <Text>{mostrarSenha ? 'Ocultar' : 'Mostrar'}</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <TouchableOpacity style={styles.botao} onPress={isModalAlterarVisivel}>
                            <Text style={styles.botaoTexto}>Redefinir Dados</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
               
                <View style={styles.secao}>
                    {/* <SecaoCep /> */}
                </View>
               
                <View style={styles.secao}>
                    {/* <TouchableOpacity style={styles.botao} onPress={isModalDeletarVisivel}>
                        <Text style={styles.botaoTexto}>Apagar conta</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={styles.botao} onPress={logOutUsuario}>
                        <Text style={styles.botaoTexto}>Sair</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cabecalho: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    cabecalho_titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 15,
    },
    secao: {
        margin: 15,
    },
    containerFieldset: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
    },
    tituloFieldset: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    campo: {
        marginBottom: 15,
    },
    campo_titulo: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    campo_valor: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        color: '#888'
    },
    botao: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    botaoTexto: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});