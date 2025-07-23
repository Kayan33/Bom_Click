import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from './src/Context/authContext'
import { AlertNotificationRoot } from 'react-native-alert-notification';
import RotasIndex from './src/Routes';

import { StyleSheet } from 'react-native';

export default function App() {
  return (
    <SafeAreaProvider style={styles.safeAreaProvider}>
      <AlertNotificationRoot>
        <AuthProvider>
          <NavigationContainer>
            <StatusBar style="dark" translucent={true} />
            <RotasIndex />
          </NavigationContainer>
        </AuthProvider>
      </AlertNotificationRoot>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({

  safeAreaProvider: {
    flex: 1,
  }
})