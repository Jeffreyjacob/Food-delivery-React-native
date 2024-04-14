import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type formValue = {
  email: string,
  password: string,
}
const formSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const LoginCard = () => {
  const { control, handleSubmit,formState:{isSubmitting}} = useForm<formValue>({ resolver: zodResolver(formSchema) })

  const onsubmit = async (data:any) => {
    if(data){
      console.log(data);
    }
  }
  return (
    <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>

      <View style={{ gap: 35, marginTop: 30 }}>
        {/**Email input field */}

        <Controller
          name={'email'}
          control={control}
          render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
            <View>
              <Text style={{ fontFamily: 'SFSemiBold', fontSize: 15, color: 'grey' }}>
                Email address
              </Text>
              <TextInput
                style={{ fontSize: 18, fontFamily: 'SFSemiBold', borderBottomWidth: 1, width: 290, paddingVertical: 13 }}
                placeholder='Enter your email address'
                value={value} onBlur={onBlur} onChangeText={onChange} />
              {error && <Text style={styles.errorMessage}>
                {error.message}
              </Text>
              }
            </View>

          )}
        />

        {/**Password input field */}
        <Controller
        name={'password'}
        control={control}
        render={({ field: { value, onChange, onBlur }, fieldState: { error }})=>(
          <View>
          <Text style={{ fontFamily: 'SFSemiBold', fontSize: 15, color: 'grey' }}>
            Password
          </Text>
          <TextInput
            style={{ fontSize: 18, fontFamily: 'SFSemiBold', borderBottomWidth: 1, width: 290, paddingVertical: 13 }}
            placeholder='Enter your Password' secureTextEntry 
            value={value} onChangeText={onChange} onBlur={onBlur}/>
            {error && <Text style={styles.errorMessage}>
                {error.message}
              </Text>
              }
        </View>
        )}
        />
      
      </View>

      {/**Login Button */}
      {
        isSubmitting ? 
        <TouchableOpacity style={{ padding: 25, backgroundColor: "#FA4A0C", borderRadius: 30, marginTop: 100, width: 314 }}>
          <View style={{flexDirection:"row",gap:10}}>
          <ActivityIndicator color='#fff'/>
            <Text style={{ fontFamily: "SFSemiBold", color: 'white', textAlign: "center", fontSize: 18 }}>
              Loading...
            </Text>
          </View>
        </TouchableOpacity>:
         <TouchableOpacity  onPress={handleSubmit(onsubmit)}
         style={{ padding: 25, backgroundColor: "#FA4A0C", borderRadius: 30, marginTop: 100, width: 314 }}>
           <Text style={{ fontFamily: "SFSemiBold", color: 'white', textAlign: "center", fontSize: 18 }}>
            Login
           </Text>
         </TouchableOpacity>

      }
     

    </View>
  )
}

const styles = StyleSheet.create({
  errorMessage: {
    color: 'red',
    paddingTop: 10
}
})

export default LoginCard