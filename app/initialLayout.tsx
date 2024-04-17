import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Stack, useRouter, useSegments } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


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
    <GestureHandlerRootView style={{flex:1}}>
       <Stack>
        <Stack.Screen name='index' options={{headerShown:false}}/>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name='Auth' options={{headerShown:false}}/>
        <Stack.Screen name='EmailCodeVerification' options={{
          headerBackTitle:'back',
          headerTitle:"",
          headerShadowVisible:false,
        }}/>
        <Stack.Screen name='Search' options={{
          headerBackVisible:false,
          headerShadowVisible:false,
          animation: 'slide_from_bottom',
        }}/>
        <Stack.Screen name='FoodDetails/[id]' options={{
          headerTitle:'',
          headerBackVisible:false,
          headerShadowVisible:false,
          headerStyle:{backgroundColor:'#F6F6F9'}
        }}/>
        <Stack.Screen name='Cart' options={{
          headerTitle:'Cart',
          headerBackVisible:false,
          headerShadowVisible:false,
          headerStyle:{backgroundColor:'#F6F6F9'},
          headerTitleStyle:{
            fontFamily:'SFSemiBold',
            fontSize:18
          }
        }}/>
        <Stack.Screen name='Checkout/Delivery' options={{
          headerTitle:'Checkout',
          headerShadowVisible:false,
          headerStyle:{
            backgroundColor:'#F6F6F9'
          },
          headerBackVisible:false
        }}/>
    </Stack>
    </GestureHandlerRootView>
    
  )
}

export default InitialLayout