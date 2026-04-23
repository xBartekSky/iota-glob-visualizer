import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Colors } from './src/theme/Colors';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LoadingScreen } from './src/screens/LoadingScreen';
import { useState } from 'react';

// ← poza komponentem, tworzony raz
const queryClient = new QueryClient();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        {isLoading ? (
          <LoadingScreen
            onAnimationFinish={() => setIsLoading(false)}
            fadeInDuration={800}
            pauseDuration={1500}
            startScale={0.6}
          />
        ) : (
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        )}
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}