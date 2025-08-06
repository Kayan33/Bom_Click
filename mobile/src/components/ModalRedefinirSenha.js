import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Modal, ActivityIndicator, TouchableOpacity } from 'react-native';
import api from '../services/api';
import { CORES, FONTES, TAMANHOS } from '../styles/styles';
import { Feather } from '@expo/vector-icons'; 

const ModalRedefinirSenha = ({ visible, onClose }) => {
    const [senhaAtual, setSenhaAtual] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [loading, setLoading] = useState(false);

   
    const [novaSenhaVisivel, setNovaSenhaVisivel] = useState(true);
    const [confirmarSenhaVisivel, setConfirmarSenhaVisivel] = useState(true);

    const handleSalvar = async () => {
        if (!senhaAtual || !novaSenha || !confirmarSenha) {
            Alert.alert("Atenção", "Por favor, preencha todos os campos.");
            return;
        }
        if (novaSenha !== confirmarSenha) {
            Alert.alert("Erro", "A nova senha e a confirmação não coincidem.");
            return;
        }
        if (novaSenha.length < 6) {
            Alert.alert("Erro", "A nova senha deve ter pelo menos 6 caracteres.");
            return;
        }

        setLoading(true);
        try {
            
            await api.put('/usuario/redefinir-senha', {
                senhaAtual,
                novaSenha
            });
            
            Alert.alert("Sucesso", "Sua senha foi redefinida!");
            onClose();
         
            setSenhaAtual('');
            setNovaSenha('');
            setConfirmarSenha('');

        } catch (error) {
            console.error(error.response?.data || error.message);
            Alert.alert("Erro ao redefinir", error.response?.data?.error || "Não foi possível completar a operação.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Redefinir Senha</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Senha Atual"
                        secureTextEntry
                        value={senhaAtual}
                        onChangeText={setSenhaAtual}
                    />
                    <View style={styles.passwordInputWrapper}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Nova Senha"
                            secureTextEntry={novaSenhaVisivel}
                            value={novaSenha}
                            onChangeText={setNovaSenha}
                        />
                        <TouchableOpacity onPress={() => setNovaSenhaVisivel(!novaSenhaVisivel)}>
                            <Feather name={novaSenhaVisivel ? 'eye-off' : 'eye'} size={20} color="#888" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.passwordInputWrapper}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Confirmar Nova Senha"
                            secureTextEntry={confirmarSenhaVisivel}
                            value={confirmarSenha}
                            onChangeText={setConfirmarSenha}
                        />
                         <TouchableOpacity onPress={() => setConfirmarSenhaVisivel(!confirmarSenhaVisivel)}>
                            <Feather name={confirmarSenhaVisivel ? 'eye-off' : 'eye'} size={20} color="#888" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title="Cancelar" onPress={onClose} color="gray" />
                        <View style={{ width: 120 }}>
                           <Button 
                                title={loading ? "" : "Salvar"} 
                                onPress={handleSalvar} 
                                disabled={loading} 
                            />
                           {loading && <ActivityIndicator style={{ position: 'absolute', alignSelf: 'center', top: 10 }} color="white" />}
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContainer: {
        width: '85%',
        backgroundColor: CORES.branco,
        padding: TAMANHOS.espacamentoMenor,
        borderRadius: TAMANHOS.bordaRaio,
        gap: TAMANHOS.espacamentoMenor
    },
    title: {
        fontFamily: FONTES.fonteBold, 
        fontSize: 20,
        textAlign: 'center',
        marginBottom: TAMANHOS.espacamentoPequeno
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: TAMANHOS.espacamentoPequeno,
        borderRadius: TAMANHOS.bordaRaio,
        fontSize: 16, 
    },
    passwordInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: TAMANHOS.bordaRaio,
        paddingHorizontal: TAMANHOS.espacamentoPequeno,
    },
    passwordInput: {
        flex: 1,
        paddingVertical: TAMANHOS.espacamentoPequeno,
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: TAMANHOS.espacamentoPequeno
    }
});

export default ModalRedefinirSenha;