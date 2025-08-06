import React, { useState, useEffect, useContext } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
    Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AutenticadoContexto } from '../Context/AuthContext'
import ModalRedefinirSenha from '../components/ModalRedefinirSenha';
import ModalEditarCEP from '../components/ModalEditarCEP';
import api from '../services/api';

import DateTimePicker from '@react-native-community/datetimepicker';

import { Feather, FontAwesome } from '@expo/vector-icons';
import { CORES, TAMANHOS, FONTES } from '../styles/styles';

export default function InformacoesPessoais() {
    const navigation = useNavigation();
    const { autenticado, usuario, logout, deletarUsuario } = useContext(AutenticadoContexto);

    const [dadosUsuarios, setDadosUsuarios] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [dataNascimento, setDataNascimento] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [modalSenhaVisivel, setModalSenhaVisivel] = useState(false);
     const [modalCepVisivel, setModalCepVisivel] = useState(false);

    useEffect(() => {
        if (autenticado && usuario?.id) {
            consultarDadosUsuarios();
        } else {
            setLoading(false);
            if (!usuario?.id) setError("Não foi possível identificar o usuário.");
        }
    }, [autenticado, usuario]);

    async function consultarDadosUsuarios() {
        setLoading(true);
        setError(null);
        try {
            const id = usuario.id;
            const resposta = await api.post(`/BuscaUsuariosUnico/${id}`);
            setDadosUsuarios(resposta.data);

            if (resposta.data.data_nascimento) {
                setDataNascimento(new Date(resposta.data.data_nascimento));
            }
        } catch (err) {
            setError("Falha ao carregar informações do perfil.");
            setDadosUsuarios(null);
        } finally {
            setLoading(false);
        }
    }

    const onDateChange = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setDataNascimento(selectedDate);
            salvarDataNascimento(selectedDate);
        }
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    async function salvarDataNascimento(novaData) {
        setLoading(true);
        try {
            const id = usuario.id;
            const dataFormatada = novaData.toISOString();

            await api.put(`/AlteraDadosUsuario/${id}`, {
                dataNascimento: dataFormatada,
            });

            Alert.alert("Sucesso", "Data de nascimento atualizada!");
            consultarDadosUsuarios();

        } catch (err) {
            Alert.alert("Erro", "Não foi possível salvar a data de nascimento.");
            console.error("Erro ao salvar data:", err);
        } finally {
            setLoading(false);
        }
    }

    function logOutUsuario() {
        logout();
    }

    if (loading) {
        return <View style={styles.center}><ActivityIndicator size="large" color={CORES.azul} /></View>;
    }

    if (error) {
        return <View style={styles.center}><Text style={styles.errorText}>{error}</Text></View>;
    }

    if (!dadosUsuarios) {
        return <View style={styles.center}><Text>Nenhum dado de usuário encontrado.</Text></View>;
    }

    const formatarData = (dataString) => {
        if (!dataString) return '';
        const data = new Date(dataString);
        const dia = String(data.getUTCDate()).padStart(2, '0');
        const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
        const ano = data.getUTCFullYear();
        return `${dia}/${mes}/${ano}`;
    };

async function apagarConta(id) {
    await deletarUsuario(id)
    logout()
}

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={24} color={CORES.amarelo} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Editar Informações</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Informações Pessoais</Text>

                    <InfoLinha label="Nome:" value={`${dadosUsuarios.nome || ''} ${dadosUsuarios.sobrenome || ''}`} />
                    <InfoLinha label="CPF:" value={dadosUsuarios.cpf || ''} />
                    <InfoLinha label="E-mail:" value={dadosUsuarios.email || ''} />

                    <InfoLinhaStackedEditavel
                        label="Data de Nascimento:"
                        value={formatarData(dadosUsuarios.dataNascimento) || 'Não informado'}
                        onEditPress={showDatepicker}
                    />

                     <View style={styles.secaoRedefinirSenha}>
                <TouchableOpacity onPress={() => setModalSenhaVisivel(true)}>
                    <Text style={styles.linkRedefinir}>Redefinir senha</Text>
                </TouchableOpacity>
            </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Endereço</Text>

                    <InfoLinhaEditavel
                        label="CEP:"
                        value={dadosUsuarios.cep || ''}
                        onEditPress={() => setModalCepVisivel(true)}/>

                    <InfoLinha label="Logradouro:" value={dadosUsuarios.rua || ''} />
                    <InfoLinha label="BAIRRO:" value={dadosUsuarios.bairro || ''} />
                    <InfoLinha label="Número:" value={dadosUsuarios.numero?.toString() || ''} />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Formas de pagamento</Text>
                    <CartaoLinha bandeira="Alimentação Alelo" numero="0800 **** **** 0800" />
                    <CartaoLinha bandeira="Crédito Visa" numero="0800 **** **** 0800" />
                    <TouchableOpacity style={styles.addButton}>
                        <Text style={styles.addButtonText}>Adicionar cartão</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity 
                    onPress={() => apagarConta(usuario.id)}
                style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>Apagar conta</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={logOutUsuario}>
                    <Feather name="log-out" size={28} color={CORES.vermelho} />
                </TouchableOpacity>
            </View>
            {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={dataNascimento}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={onDateChange}
                />
            )}

             <ModalRedefinirSenha 
                visible={modalSenhaVisivel}
                onClose={() => setModalSenhaVisivel(false)}
            />

             <ModalEditarCEP
                visible={modalCepVisivel}
                onClose={() => setModalCepVisivel(false)}
                cepAtual={dadosUsuarios.cep}
                onSaveSuccess={consultarDadosUsuarios}
            />

        </SafeAreaView>
    );
}

const InfoLinha = ({ label, value }) => (
    <View style={styles.infoRowStacked}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
    </View>
);


const InfoLinhaEditavel = ({ label, value, onEditPress }) => (
    <View style={styles.infoRowInline}>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity style={styles.valueContainer} onPress={onEditPress}>
            <Text style={styles.value}>{value}</Text>
            <View style={styles.iconWrapper}>
                <Feather name="edit" size={16} color={CORES.amarelo} />
            </View>
        </TouchableOpacity>
    </View>
);

const InfoLinhaStackedEditavel = ({ label, value, onEditPress }) => (
    <View style={styles.infoRowStacked}>
        <View style={styles.labelWithIconContainer}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity style={styles.iconWrapper} onPress={onEditPress}>
                <Feather name="edit" size={16} color={CORES.amarelo} />
            </TouchableOpacity>
        </View>
        <Text style={styles.value}>{value}</Text>
    </View>
);


const CartaoLinha = ({ bandeira, numero }) => (
    <View style={styles.cardRow}>
        <FontAwesome name="credit-card" size={24} color={CORES.azul} />
        <View style={styles.cardInfo}>
            <Text style={styles.cardBrand}>{bandeira}</Text>
            <Text style={styles.cardNumb}>{numero}</Text>
        </View>
        <TouchableOpacity>
            <Feather name="trash-2" size={20} color={CORES.vermelho} />
        </TouchableOpacity>
    </View>
);


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: CORES.branco,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: CORES.vermelho,
        fontSize: TAMANHOS.fonteSegundaria,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: TAMANHOS.espacamentoMenor,
        paddingVertical: TAMANHOS.espacamentoPequeno,
        backgroundColor: CORES.azul,
        paddingTop: 55
    },
    headerTitle: {
        fontFamily: FONTES.fonteBold,
        fontSize: TAMANHOS.fonteTitulo,
        color: CORES.amarelo,
    },
    scrollContainer: {
        padding: TAMANHOS.espacamentoMenor,
        paddingBottom: 100,
    },
    section: {
        marginBottom: TAMANHOS.espacamentoMaior,
    },
    sectionTitle: {
        fontFamily: FONTES.fonteBold,
        fontSize: TAMANHOS.fonteSegundaria,
        color: CORES.amarelo,
        marginBottom: TAMANHOS.espacamentoMenor,
    },
    infoRowStacked: {
        borderBottomWidth: 1,
        borderBottomColor: CORES.branco,
        paddingBottom: TAMANHOS.espacamentoMenor,
        marginBottom: 5,
    },
    infoRowInline: {
        // flexDirection: 'row',
        // alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: CORES.branco,
        paddingBottom: TAMANHOS.espacamentoMenor, 
        marginBottom: TAMANHOS.espacamentoMenor,
        
    },
    labelWithIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: TAMANHOS.espacamentoPequeno,
        
    },
    valueContainer: {
        flexDirection: 'row',
        alignItems:   'center',
        marginBottom: TAMANHOS.espacamentoPequeno
    },
    iconWrapper: {
        marginLeft: TAMANHOS.espacamentoPequeno,
    },
    label: {
        fontFamily: FONTES.fonteMedium,
        fontSize: TAMANHOS.fonteSegundaria,
        color: CORES.azul,
    },
    value: {
        fontFamily: FONTES.fonteBold,
        color: CORES.azul,
    },
    secaoRedefinirSenha: {
        fontFamily: FONTES.fonteMedium,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: CORES.vermelho,
        borderRadius: 50,
        paddingVertical: TAMANHOS.espacamentoPequeno,
        paddingHorizontal: TAMANHOS.espacamentoMenor,
    },
    linkRedefinir: {
        fontFamily: FONTES.fonteMedium,
        color: CORES.vermelho,
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: TAMANHOS.espacamentoMenor,
    },
    cardInfo: {
        flex: 1,
        marginLeft: TAMANHOS.espacamentoMenor,
    },
    cardBrand: {
        fontFamily: FONTES.fonteRegular,
        fontSize: TAMANHOS.fonteSegundaria,
        color: CORES.azul,
    },
    cardNumb: {
        fontFamily: FONTES.fonteBold,
        fontSize: TAMANHOS.fonteSegundaria,
        color: CORES.azul,
        marginTop: TAMANHOS.espacamentoPequeno,
    },
    addButton: {
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: CORES.verde,
        borderRadius: 50,
        paddingVertical: TAMANHOS.espacamentoPequeno,
        paddingHorizontal: TAMANHOS.espacamentoMenor,
    },
    addButtonText: {
        color: CORES.verde,
        fontWeight: 'bold',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: TAMANHOS.espacamentoMenor,
        backgroundColor: CORES.branco,
        borderTopWidth: 1,
        borderTopColor: CORES.branco,
        paddingBottom: TAMANHOS.espacamentoMaior + TAMANHOS.espacamentoPequeno,
    },
    deleteButton: {
        borderWidth: 1,
        borderColor: CORES.vermelho,
        borderRadius: 50,
        paddingVertical: TAMANHOS.espacamentoPequeno,
        paddingHorizontal: TAMANHOS.espacamentoMenor,
    },
    deleteButtonText: {
        color: CORES.vermelho,
        fontWeight: 'bold',
    },
});