// no seu arquivo components/ModalEditarCEP.js

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Modal, ActivityIndicator } from 'react-native';
import api from '../services/api'; 
import { AutenticadoContexto } from '../Context/AuthContext'
import { CORES, FONTES, TAMANHOS } from '../styles/styles';

const ModalEditarCEP = ({ visible, onClose, cepAtual, onSaveSuccess }) => {
 
     const { usuario } = useContext(AutenticadoContexto);
    const [cep, setCep] = useState('');
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        if (cepAtual) {
            setCep(cepAtual);
        }
    }, [cepAtual]);


    const handleSalvar = async () => {
       
        if (!cep || cep.length < 8) {
            Alert.alert("Erro", "Por favor, digite um CEP válido com 8 dígitos.");
            return;
        }

        setLoading(true);
        try {
          
            await api.put(`/AlteraDadosUsuario/${usuario.id}`, {
                cep: cep,
            });

            Alert.alert("Sucesso", "CEP atualizado!");
            onSaveSuccess(); 
            onClose(); 

        } catch (error) {
            console.error(error.response?.data || error.message);
            Alert.alert("Erro", "Não foi possível atualizar o CEP.");
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
                    <Text style={styles.title}>Editar CEP</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o novo CEP"
                        keyboardType="numeric"
                        maxLength={8}
                        value={cep}
                        onChangeText={setCep}
                    />
                    <View style={styles.buttonContainer}>
                        <Button title="Cancelar" onPress={onClose} color="gray" />
                        <View style={{ width: 120 }}>
                           <Button 
                                title={loading ? "" : "Salvar"} 
                                onPress={handleSalvar} 
                                disabled={loading} 
                            />
                           {loading && <ActivityIndicator style={{position: 'absolute', alignSelf: 'center', top: 10}} color="white"/>}
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContainer: { width: '85%', backgroundColor: 'white', padding: 20, borderRadius: 10, gap: 20 },
    title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, fontSize: 16 },
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-around' }
});


export default ModalEditarCEP;