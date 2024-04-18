import { View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet,ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { FadeInLeft, FadeInRight, FadeOutLeft, FadeOutRight } from 'react-native-reanimated';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { TextInput } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const ProfileSections = [
    {name:"Orders"},
    {name:"Pending Reviews"},
    {name:"Faq"},
    {name:"Help"},
]

const Profile = () => {
  const {user} = useUser();
  const [editProfile, setEditProfile] = React.useState(false);
  const [firstName,setFirstName] = React.useState(user?.firstName);
  const [signoutLoading, setSignoutLoading] = React.useState(false);
  const { signOut } = useAuth();


  useEffect(() => {
    if (!user) return;
    setFirstName(user?.firstName);

  }, [user]);

  const SaveUserInfo = async()=>{
    try{
       if(!firstName) return;
        await user?.update({
           firstName
        })

    }catch(err){
      console.error(err)
    }finally{
      setEditProfile(!editProfile)
    }
  }

  const signout = async ()=>{
    setSignoutLoading(true)
    await signOut()
    setSignoutLoading(false)
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F6F6F9", paddingHorizontal: 40 }}>
      <SafeAreaView>
        <Text style={{ fontSize: 34, fontFamily: "SFSemiBold", paddingTop: 20, paddingHorizontal: 5 }}>
          My Profile
        </Text>
        <View style={{ justifyContent: 'center', alignItems: "center", paddingTop: 30 }}>
          <View style={{ flexDirection: "row", justifyContent: 'space-between', width: '100%' }}>
              <Text style={{ fontSize: 18, fontFamily: "SFSemiBold" }}>
                Personal details
              </Text>
            {
              editProfile ? (
                <TouchableOpacity onPress={SaveUserInfo}>
              <Text style={{ fontSize: 16, fontFamily: "SFRegular", color: "#FA4A0C" }}>
                  Save
              </Text>
            </TouchableOpacity>
              ):(
                <TouchableOpacity onPress={()=>setEditProfile(!editProfile)}>
              <Text style={{ fontSize: 16, fontFamily: "SFRegular", color: "#FA4A0C" }}>
                Change
              </Text>
            </TouchableOpacity>
              )
            }
          </View>
          {/**Profile Card */}
          <View style={{ width: 315, backgroundColor: '#fff', height: 167, borderRadius: 20, marginTop: 15,
            flexDirection:'row',justifyContent:'center',paddingTop:15,gap:15
          }}>
               <View>
                <Image source={require('@/assets/images/Rectangle 6.png')}
                 style={{width:81,height:90}}/>
               </View>

               <View style={{width:175}}>
               {editProfile ? (
                <Animated.View entering={FadeInLeft} exiting={FadeOutLeft}>
                  <View style={{borderBottomWidth:StyleSheet.hairlineWidth,gap:7,paddingBottom:10,marginBottom:5}}>
                     <TextInput placeholder='Enter first name' value={firstName || ''}
                     style={{backgroundColor:"#F6F6F9",borderRadius:15,padding:12,fontFamily:"SFSemiBold",
                      fontSize:18
                     }} 
                     onChangeText={setFirstName}/>
                  <Text style={{fontSize:15,fontFamily:"SFRegular",color:"#C4C4C4",paddingTop:5}}>
                    {user?.primaryEmailAddress?.emailAddress}
                  </Text>
                  </View>
                  <View style={{  borderBottomWidth:StyleSheet.hairlineWidth,paddingBottom:10}}>
                  <Text  style={{fontSize:15,fontFamily:"SFRegular",color:"#C4C4C4"}}>
                    +2347082406281
                  </Text>
                  </View>
                  <Text  style={{fontSize:15,fontFamily:"SFRegular",color:"#C4C4C4"}}>
                    No 11 fountain street pako baruwa lagos state
                  </Text>
                </Animated.View>
              ):(
                <Animated.View style={{gap:7}} entering={FadeInRight} exiting={FadeOutRight}>
                  <View style={{borderBottomWidth:StyleSheet.hairlineWidth,gap:7,paddingBottom:10}}>
                  <Text style={{fontSize:18,fontFamily:"SFSemiBold"}}>
                    {firstName}
                  </Text>
                  <Text style={{fontSize:15,fontFamily:"SFRegular",color:"#C4C4C4"}}>
                    {user?.primaryEmailAddress?.emailAddress}
                  </Text>
                  </View>
                  <View style={{  borderBottomWidth:StyleSheet.hairlineWidth,paddingBottom:10}}>
                  <Text  style={{fontSize:15,fontFamily:"SFRegular",color:"#C4C4C4"}}>
                    +2347082406281
                  </Text>
                  </View>
                  <Text  style={{fontSize:15,fontFamily:"SFRegular",color:"#C4C4C4"}}>
                    No 11 fountain street pako baruwa lagos state
                  </Text>
                </Animated.View>
              )}
               </View>
          </View>

           {/**Profile section */}
           <View style={{paddingTop:20}}>
                  {
                    ProfileSections.map((item,index)=>(
                      <TouchableOpacity key={index}
                      style={{width:314,height:60,backgroundColor:"#fff",borderRadius:20,marginVertical:7,
                        justifyContent:"center"
                      }}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',
                          paddingHorizontal:20
                        }}>
                        <Text style={{fontSize:18,fontFamily:"SFSemiBold"}}>
                       {item.name}
                       </Text>
                       <Entypo name="chevron-right" size={26} color="black" />
                        </View>
                      </TouchableOpacity>
                    ))
                  }
                </View>

                <TouchableOpacity onPress={signout}
                 style={{ padding: 22, backgroundColor: "#FA4A0C", borderRadius: 30, width: 314,marginTop:25}}>
                    {
                      signoutLoading ? (<View style={{justifyContent:"center",alignItems:"center"}}>
                        <ActivityIndicator color='white'/>
                      </View>):(
                          <Text style={{ fontFamily: "SFSemiBold", color: 'white', textAlign: "center", fontSize: 18 }}>
                            Sign Out 
                          </Text>
                      )
                    }
                </TouchableOpacity>

        </View>
      </SafeAreaView>
    </View>
  )
}

export default Profile