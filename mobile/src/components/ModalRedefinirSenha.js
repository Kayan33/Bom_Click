import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable, Modal } from 'react-native';
import { AutenticadoContexto } from '../Context/AuthContext'
import api from '../services/api';
import { CORES, FONTES, TAMANHOS } from '../styles/styles';

const ModalRedefinirSenha = ({ visible, onClose }) => {

    const [senhaAtual, setSenhaAtual] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [loading, setLoading] = useState(false);

   
    const { usuario } = useContext(AutenticadoContexto); 
   

    const handleSalvar = async () => {
        
        
        setLoading(true);
        try {
            await api.put(`/usuario/redefinir-senha/${usuario.id}`, {
                senhaAtual,
                novaSenha
            });

            Alert.alert("Sucesso", "Sua senha foi redefinida!");
            onClose();

        } catch (error) {
            
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
                    <TextInput
                        style={styles.input}
                        placeholder="Nova Senha"
                        secureTextEntry
                        value={novaSenha}
                        onChangeText={setNovaSenha}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirmar Nova Senha"
                        secureTextEntry
                        value={confirmarSenha}
                        onChangeText={setConfirmarSenha}
                    />
                    <View style={styles.buttonContainer}>
                        <Button title="Cancelar" onPress={onClose} color="gray" />
                        <Button title={loading ? "Salvando..." : "Salvar"} onPress={handleSalvar} disabled={loading} />
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
    modalContainer:
    {
        width: '85%',
        backgroundColor: CORES.branco,
        padding: TAMANHOS.espacamentoMenor,
        borderRadius: TAMANHOS.bordaRaio,
        gap: TAMANHOS.espacamentoMenor
    },
    title:
    {
        fontFamily: FONTES.fonteMedium,
        textAlign: 'center',
        marginBottom: TAMANHOS.espacamentoPequeno
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: TAMANHOS.espacamentoPequeno,
        borderRadius: TAMANHOS.bordaRaio
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop:  TAMANHOS.espacamentoPequeno
    }
});


export default ModalRedefinirSenha;