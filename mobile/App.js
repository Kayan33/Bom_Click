import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';

import RotasIndex from './src/Routes';

import AuthProvider from './src/Context/AuthContext';
import ApiProvider from './src/Context/ApiContext';

SplashScreen.preventAutoHideAsync();


export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold
  });


  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider style={styles.safeAreaProvider} onLayout={onLayoutRootView}>
      <AlertNotificationRoot>
        <AuthProvider>
          <ApiProvider>
            <NavigationContainer>
              <StatusBar style="dark" translucent={true} />
              <RotasIndex />
            </NavigationContainer>
          </ApiProvider>
        </AuthProvider>
      </AlertNotificationRoot>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({

  safeAreaProvider: {
    flex: 1,
  }
});