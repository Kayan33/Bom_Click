import React, { useContext, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { AutenticadoContexto } from '../Context/authContext'
import { View, ActivityIndicator } from 'react-native';

export default function RotaProtegida({ children }) {
    const { autenticado, loadingAuth, abrirModalLogin } = useContext(AutenticadoContexto);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused && !loadingAuth && !autenticado) {
            abrirModalLogin();
        }
    }, [isFocused, autenticado, loadingAuth]);
    
    if (loadingAuth) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }
    return autenticado ? children : null;
}