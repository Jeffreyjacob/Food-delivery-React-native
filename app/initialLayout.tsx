import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Stack, useRouter, useSegments } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo';


const InitialLayout = () => {
    const router = useRouter();
    const segments = useSegments();
    const {isLoaded,isSignedIn} = useAuth();
      useEffect(()=>{
          if(!isLoaded) return;
        const inTabsGroup = segments[0] === '(tabs)';
        if(isSignedIn && !inTabsGroup){
             router.replace('/(tabs)');
        }else if(!isSignedIn){
         router.replace('/')
        }
   
     },[isSignedIn])
  return (
       <Stack>
        <Stack.Screen name='index' options={{headerShown:false}}/>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name='Auth' options={{headerShown:false}}/>
    </Stack>
    
  )
}

export default InitialLayout