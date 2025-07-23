import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, Pressable, TextInput, Alert } from 'react-native';

export default function CadastroModal({ visible, onCadastroSubmit, onClose, onNavigateToLogin }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmeSenha, setConfirmeSenha] = useState('');

    const [senhaVisibilidade, setSenhaVisibilidade] = useState(true);

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
                        style={styles.modal_container_input}
                        placeholderTextColor="#555"
                    />
                    <TextInput
                        placeholder='Email:'
                        value={email}
                        onChangeText={setEmail}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        style={styles.modal_container_input}
                        placeholderTextColor="#555"
                    />
                    <TextInput
                        placeholder='CPF:'
                        value={cpf}
                        onChangeText={setCpf}
                        keyboardType='numeric'
                        style={styles.modal_container_input}
                        placeholderTextColor="#555"
                    />
                    <TextInput
                        placeholder='Senha:'
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry={senhaVisibilidade}
                        style={styles.modal_container_input}
                        placeholderTextColor="#555"
                    />
                    <TextInput
                        placeholder='Confirme sua senha:'
                        value={confirmeSenha}
                        onChangeText={setConfirmeSenha}
                        secureTextEntry={senhaVisibilidade}
                        style={styles.modal_container_input}
                        placeholderTextColor="#555"
                    />

                    <Pressable onPress={RealizarCadastro} style={styles.botao}>
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
        backgroundColor: '#054aae',
        borderRadius: 8,
        padding: 20,
        justifyContent: 'space-around',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    modal_container_titulo: {
        color: '#f1f1f1',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    modal_container_input: {
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        color: '#2f7339',
        paddingHorizontal: 16,
        height: 45,
        marginBottom: 10,
    },
    botao: {
        backgroundColor: '#F2E205',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    botao_texto: {
        color: '#2f7339',
        fontWeight: 'bold',
        fontSize: 16,
    },
    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
    },
    opcoes_titulo: {
        color: '#ffc200',
    },
    opcoes_titulo_bold: {
        color: '#ffc200',
        fontWeight: 'bold',
    },
});