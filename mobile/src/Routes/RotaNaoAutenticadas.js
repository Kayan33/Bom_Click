import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicial from '../screens/Inicial'
import Carrinho from "../screens/Carrinho";

const Stack = createNativeStackNavigator();

export default function RotasNaoAutenticadas() {
    return (
        <Stack.Navigator
        initialRouteName="Inicial">
            <Stack.Screen
                name="Inicial"
                component={Inicial}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Carrinho"
                component={Carrinho}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}