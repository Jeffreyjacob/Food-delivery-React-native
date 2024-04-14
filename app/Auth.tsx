import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/constants/Colors';
import LoginCard from '@/components/LoginCard';
import SignupCard from '@/components/SignupCard';


const Auth = () => {
    const [showAuthOption,setShowAuthOption] = useState(false)
  return (
    <View style={{flex:1,backgroundColor:Colors.backgroundGrey}}>
      <View style={{backgroundColor:"#fff",height:300,borderBottomRightRadius:30,borderBottomLeftRadius:30,
        justifyContent:'center',alignItems:'center',position:'relative'
      }}>
        <Image source={require('../assets/images/Group 3 (1).png')}/>
        <View style={{flexDirection:"row",position:'absolute',bottom:0,paddingHorizontal:60}}>
            <TouchableOpacity onPress={()=>setShowAuthOption(false)}
            style={[{width:'50%',padding:10},showAuthOption ? null:{borderBottomWidth:2,borderBottomColor:"#FA4A0C"} ]}>
                <Text style={{textAlign:"center",fontFamily:"SFSemiBold",fontSize:20}}>
                Login
                </Text>
            </TouchableOpacity> 
            <TouchableOpacity onPress={()=>setShowAuthOption(true)}
            style={[{width:'50%',padding:10},showAuthOption ?{borderBottomWidth:2,borderBottomColor:"#FA4A0C"}:null]} >
                <Text style={{textAlign:"center",fontFamily:"SFSemiBold",fontSize:20}}>
                Sign-up
                </Text>
            </TouchableOpacity>
        </View>
      </View>
      {
      showAuthOption ? (
        <SignupCard/>
      ):(
        <LoginCard/>
      )
      }

    </View>
  )
}

export default Auth