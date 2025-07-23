import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RotaProtegida from '../components/RotasProtegidas';

import Perfil from '../screens/Perfil';
import InformacoesPessoais from '../screens/InformacoesPessoais';
import Resumo from '../screens/Resumo';
import Finalizado from '../screens/Finalizado';
import DadosMercado from '../screens/DadosMercado';

const Stack = createNativeStackNavigator();

export default function RotasAutenticadas() {
    return (
        <RotaProtegida> 
            <Stack.Navigator>
                <Stack.Screen
                    name="Perfil"
                    component={Perfil}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="InformacoesPessoais"
                    component={InformacoesPessoais}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Resumo"
                    component={Resumo}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Finalizado"
                    component={Finalizado}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="DadosMercado"
                    component={DadosMercado}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </RotaProtegida>
    );
}