import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import InitialLayout from './initialLayout';


const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const TokenCache = {
  async getToken(key:string){
     try{
      return SecureStore.getItemAsync(key);     
     } catch(err){
      return null;
     }
  },
  async saveToken (key:string,value:string){
    try{
      return SecureStore.setItemAsync(key,value);
    }catch(err){
      return;
    }
  }
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    SFRegular: require('../assets/fonts/SF-Pro-Rounded-Regular.ttf'),
    SFBold: require('../assets/fonts/SF-Pro-Rounded-Bold.ttf'),
    SFSemiBold: require('../assets/fonts/SF-Pro-Rounded-Semibold.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {


  return (
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={TokenCache}>
          <InitialLayout/>
      </ClerkProvider>
  );
}
