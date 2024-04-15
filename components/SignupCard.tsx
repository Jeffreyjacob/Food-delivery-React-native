import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'expo-router';

type formValue = {
  fullname: string
  email: string,
  password: string,
}
const formSchema = z.object({
  fullname: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});


const SignupCard = () => {
  const { control, handleSubmit, formState: { isSubmitting } } = useForm<formValue>({ resolver: zodResolver(formSchema) })
   const ScrollViewRef = useRef<ScrollView>(null);
   const PasswordInputRef = useRef<TextInput>(null);
   const navigate = useRouter();

   const scrolltoInput = ()=>{
    PasswordInputRef.current?.measure((x, y, width, height, pageX, pageY)=>{
      ScrollViewRef.current?.scrollTo({ y: pageY, animated: true });
    })
   }

  
  const onsubmit = async (data: any) => {
    if (data) {
     console.log(data);
     navigate.navigate('/EmailCodeVerification')
    }
  }

  return (
    <ScrollView contentContainerStyle={{ marginTop: 50, alignItems: 'center', height: 650 }}
    keyboardDismissMode='on-drag' ref={ScrollViewRef}>

      <View style={{ gap: 30 }}>
        {/**Full name input field */}
        <Controller
          name={'fullname'}
          control={control}
          render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
            <View>
              <Text style={{ fontFamily: 'SFSemiBold', fontSize: 15, color: 'grey' }}>
                Full name
              </Text>
              <TextInput
                style={{ fontSize: 18, fontFamily: 'SFSemiBold', borderBottomWidth: 1, width: 290, paddingVertical: 13 }}
                placeholder='Enter your full name'
                value={value} onChangeText={onChange} onBlur={onBlur} />
              {error && <Text style={styles.errorMessage}>
                {error.message}
              </Text>
              }
            </View>
          )}
        />

        {/**Email address input field */}
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
                value={value} onChangeText={onChange} onBlur={onBlur} />
              {error && <Text style={styles.errorMessage}>
                {error.message}
              </Text>
              }
            </View>
          )
          }
        />


        {/**Password input field */}
        <Controller
          name={'password'}
          control={control}
          render={({ field: { value, onChange, onBlur}, fieldState: { error} }) => (
            <View>
              <Text style={{ fontFamily: 'SFSemiBold', fontSize: 15, color: 'grey' }}>
                Password
              </Text>
              <TextInput
                style={{ fontSize: 18, fontFamily: 'SFSemiBold', borderBottomWidth: 1, width: 290, paddingVertical: 13 }}
                placeholder='Enter your password' secureTextEntry
                value={value} onChangeText={onChange} onBlur={onBlur} ref={PasswordInputRef} onFocus={scrolltoInput} />
              {error && <Text style={styles.errorMessage}>
                {error.message}
              </Text>
              }
            </View>
          )}
        />

      </View>

      {/**sign up button */}
      <TouchableOpacity onPress={handleSubmit(onsubmit)}
        style={{ padding: 25, backgroundColor: "#FA4A0C", borderRadius: 30, marginTop: 100, width: 314 }}>
        <Text style={{ fontFamily: "SFSemiBold", color: 'white', textAlign: "center", fontSize: 18 }}>
          Sign Up
        </Text>
      </TouchableOpacity>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  errorMessage: {
    color: 'red',
    paddingTop: 10
  }
})

export default SignupCard