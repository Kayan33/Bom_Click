import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, Pressable, TextInput, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { CORES, TAMANHOS } from '../styles/styles';

export default function CadastroModal({ visible, onCadastroSubmit, onClose, onNavigateToLogin }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmeSenha, setConfirmeSenha] = useState('');
   
    const [senhaVisibilidade, setSenhaVisibilidade] = useState(true);
    const [confirmeSenhaVisibilidade, setConfirmeSenhaVisibilidade] = useState(true);

    async function RealizarCadastro() {
        if (!nome || !email || !cpf || !senha || !confirmeSenha) {
            Alert.alert("Atenção", "Por favor, preencha todos os campos.");
            return;
        }

        if (senha !== confirmeSenha) {
            Alert.alert("Erro", "As senhas não coincidem.");
            return;
        }

        try {
            const sucesso = await onCadastroSubmit({ nome, email, cpf, senha });
            if (sucesso) {
                Alert.alert("Sucesso!", "Cadastro realizado. Faça o login para continuar.");
                onNavigateToLogin();
            } else {
                Alert.alert("Erro", "Não foi possível realizar o cadastro. Verifique os dados ou tente mais tarde.");
            }
        } catch (error) {
            console.error("Erro no handleCadastro:", error);
            Alert.alert("Erro no Servidor", "Ocorreu um erro inesperado. Tente novamente.");
        }
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modal}>
                <View style={[styles.modal_container, { height: 500 }]}>

                    <Pressable onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>X</Text>
                    </Pressable>

                    <Text style={styles.modal_container_titulo}>Crie sua Conta</Text>

                    <TextInput
                        placeholder='Nome completo:'
                        value={nome}
                        onChangeText={setNome}
                        style={styles.input}
                        placeholderTextColor={CORES.verde}
                    />
                    <TextInput
                        placeholder='Email:'
                        value={email}
                        onChangeText={setEmail}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        style={styles.input}
                        placeholderTextColor={CORES.verde}
                    />
                    <TextInput
                        placeholder='CPF:'
                        value={cpf}
                        onChangeText={setCpf}
                        keyboardType='numeric'
                        style={styles.input}
                        placeholderTextColor={CORES.verde}
                    />
                    <View style={styles.passwordInputWrapper}>
                        <TextInput
                            placeholder='Senha:'
                            value={senha}
                            onChangeText={setSenha}
                            secureTextEntry={senhaVisibilidade}
                            style={styles.passwordInput}
                            placeholderTextColor={CORES.verde}
                        />
                        <Pressable onPress={() => setSenhaVisibilidade(!senhaVisibilidade)}>
                            <Feather
                                name={senhaVisibilidade ? 'eye-off' : 'eye'}
                                size={18}
                                color={CORES.verde}
                            />
                        </Pressable>
                    </View>
                   
                    <View style={styles.passwordInputWrapper}>
                        <TextInput
                            placeholder='Confirme sua senha:'
                            value={confirmeSenha}
                            onChangeText={setConfirmeSenha}
                            secureTextEntry={confirmeSenhaVisibilidade}
                            style={styles.passwordInput}
                            placeholderTextColor={CORES.verde}
                        />
                        <Pressable onPress={() => setConfirmeSenhaVisibilidade(!confirmeSenhaVisibilidade)}>
                            <Feather
                                name={confirmeSenhaVisibilidade ? 'eye-off' : 'eye'}
                                size={18}
                                color={CORES.verde}
                            />
                        </Pressable>
                    </View>

                    <Pressable
                        onPress={RealizarCadastro}
                        disabled={!nome || !email || !cpf || !senha || !confirmeSenha}
                        style={({ pressed }) => [
                            styles.botao,
                            {
                                backgroundColor: !nome || !email || !cpf || !senha || !confirmeSenha ? '#b49738ff' : '#ffc200',
                                opacity: pressed ? 0.8 : 1
                            }
                        ]}
                    >
                        <Text style={styles.botao_texto}>Cadastrar</Text>
                    </Pressable>

                    <Pressable onPress={onNavigateToLogin} style={styles.linkContainer}>
                        <Text style={styles.opcoes_titulo}>Já tem uma conta? </Text>
                        <Text style={styles.opcoes_titulo_bold}>Faça login</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modal_container: {
        width: 340,
        backgroundColor: CORES.azul,
        borderRadius: TAMANHOS.bordaRaio,
        padding: TAMANHOS.espacamentoMenor,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    closeButton: {
        position: 'absolute',
        top: 7,
        right: 17,
        zIndex: 1,
    },
    closeButtonText: {
        color: CORES.branco,
        fontSize: TAMANHOS.fonteTitulo,
        fontWeight: 'bold',
    },
    modal_container_titulo: {
        color: CORES.branco,
        fontSize: TAMANHOS.fonteTitulo,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: TAMANHOS.espacamentoPequeno,
    },
    input: { 
        backgroundColor: CORES.branco,
        borderRadius: 50,
        color: CORES.verde,
        paddingHorizontal: TAMANHOS.espacamentoMenor,
        height: 45,
        marginBottom: TAMANHOS.espacamentoPequeno,
        width: 280,
    },
    passwordInputWrapper: { 
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: CORES.branco,
        borderRadius: 50,
        height: 45,
        width: 280,
        paddingHorizontal: TAMANHOS.espacamentoMenor,
        marginBottom: TAMANHOS.espacamentoPequeno,
    },
    passwordInput: {
        flex: 1,
        color: CORES.verde,
    },
    botao: {
        backgroundColor: CORES.amarelo,
        borderRadius: 50,
        paddingVertical: TAMANHOS.espacamentoPequeno,
        alignItems: 'center',
        marginTop: TAMANHOS.espacamentoMenor,
        width: 150,
    },
    botao_texto: {
        color: CORES.verde,
        fontWeight: 'bold',
        fontSize: TAMANHOS.fonteSegundaria,
    },
    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: TAMANHOS.espacamentoMenor,
    },
    opcoes_titulo: {
        color: CORES.amarelo,
    },
    opcoes_titulo_bold: {
        color: CORES.amarelo,
        fontWeight: 'bold',
    },
});