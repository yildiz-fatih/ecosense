// App.js
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import AnimatedSplash from './components/AnimatedSplash';
import { AuthProvider } from './context/AuthProvider';
import RootNavigator from './navigation/RootNavigator';

// Keep the native splash visible until we're ready
SplashScreen.preventAutoHideAsync();

export default function App() {
  // load the Ionicons font (so tab icons & splash title render correctly)
  const [fontsLoaded] = useFonts({ ...Ionicons.font });
  // local state to hide our JS splash once animation completes
  const [showSplash, setShowSplash] = useState(true);

  // while fonts aren’t ready or our splash is still playing, show it
  if (!fontsLoaded || showSplash) {
    return <AnimatedSplash onFinish={() => setShowSplash(false)} />;
  }

  // now that splash is gone and fonts are loaded, render the real app
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
