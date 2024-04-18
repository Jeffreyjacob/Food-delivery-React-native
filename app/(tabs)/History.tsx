import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { FontAwesome5 } from '@expo/vector-icons'

const History = () => {
  return (
    <View style={{ backgroundColor: "#F6F6F9", flex: 1 }}>
      <Stack.Screen options={{
        headerTitleStyle: {
          fontSize: 21
        }
      }} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <FontAwesome5 name="calendar-alt" size={100} color="#C7C7C7" />
          <Text style={{ fontSize: 28, fontFamily: "SFSemiBold", paddingTop: 15 }}>
            No history yet
          </Text>
          <Text style={{fontSize:17,fontFamily:"SFRegular",color:"#C7C7C7",paddingTop:10,width:170,
            textAlign:'center'
          }}>
            Hit the orange button down
            below to Create an order
          </Text>
        </View>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center", paddingBottom: 30 }}>
        <TouchableOpacity
          style={{ padding: 25, backgroundColor: "#FA4A0C", borderRadius: 30, width: 314, }}>
          <Text style={{ fontFamily: "SFSemiBold", color: 'white', textAlign: "center", fontSize: 18 }} >
            Start Ordering
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default History