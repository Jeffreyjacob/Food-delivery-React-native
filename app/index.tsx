import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const Page = () => {
    const inset = useSafeAreaInsets();
    const navigate = useRouter();
  return (
    <View style={{flex:1,backgroundColor:Colors.backgroundRed}}>
      <View style={{marginTop:90,backgroundColor:'#fff',borderRadius:40,width:50,marginLeft:50}}>
        <Image source={require('../assets/images/logo.png')}
        width={100} height={100}
        />
      </View>
      <Text style={{fontFamily:"SFBold",fontSize:60,color:'white',paddingLeft:50,paddingTop:40}}>
        Food For Everyone
    </Text>
       <View style={{position:'absolute',zIndex:7,bottom:60}}>
         <Image source={require('../assets/images/ToyFaces_Tansparent_BG_49.png')}/>
       </View>
       <View style={{position:'absolute',zIndex:5,bottom:60,right:0}}>
        <Image source={require('../assets/images/ToyFaces_Tansparent_BG_29.png')}
        />
       </View>
       <LinearGradient
        colors={['transparent','#FF4B3A',]}
        end={{x:0.5, y: 0.7}}
        style={styles.linearGradient}
      />
      <View style={{position:'absolute',zIndex:10,bottom:50,width:'100%'}}>
        <View style={{justifyContent:'center',alignItems:"center",}}>
        <TouchableOpacity onPress={()=>navigate.navigate('/Auth')}
        style={{backgroundColor:'#fff',paddingVertical:20,borderRadius:20,paddingHorizontal:100}}>
        <Text style={{fontSize:18,fontFamily:"SFSemiBold",color:"#FF460A"}}>Get Started</Text>
      </TouchableOpacity>
        </View>      
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    linearGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex:9,
        height:300
      },
})

export default Page