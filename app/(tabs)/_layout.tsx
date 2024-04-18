import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { Entypo, MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons';

import Colors from '@/constants/Colors';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';


// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {


  return (
    <GestureHandlerRootView style={{flex:1}}>
    <Tabs screenOptions={{tabBarActiveTintColor:Colors.backgroundRed,tabBarInactiveTintColor:Colors.grey,
     tabBarStyle:{backgroundColor:Colors.backgroundGrey},headerStyle:{backgroundColor:Colors.backgroundGrey},
     headerShadowVisible:false,}}>
      <Tabs.Screen name='index' options={{
        tabBarLabel:'',tabBarIcon:({size,color})=>(<Entypo name="home" size={size} color={color} />),
        headerTitle:'',
      }}/>
      <Tabs.Screen name='Favorite' options={{
        tabBarLabel:"",tabBarIcon:({color,size})=>(<MaterialIcons name="favorite-outline" size={size} color={color} />),
      }}
      />
      <Tabs.Screen name='Profile' options={{
        tabBarLabel:"",tabBarIcon:({color,size})=>(<Octicons name="person" size={size} color={color}/>),
        headerShown:false
      }}
      />
      <Tabs.Screen name='History' options={{
        tabBarLabel:"",tabBarIcon:({color,size})=>(<MaterialCommunityIcons name="history" size={size} color={color} />),
      }}
      />

    </Tabs>
    </GestureHandlerRootView>
  );
}
