import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { isClerkAPIResponseError, useSignUp } from '@clerk/clerk-expo';
const CELL_COUNT = 6;

const EmailCodeVerification = () => {
    const [value, setValue] = useState('');
    const { signUp, isLoaded, setActive } = useSignUp();
    const [loading, setLoading] = useState(false)
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const onVerification = async () => {
       setLoading(true)
       if(!signUp && !isLoaded){
        return
       }
       try{
        const completeSignUp = await signUp.attemptEmailAddressVerification({
            code:value
        })
        await setActive({ session: completeSignUp.createdSessionId });
        setLoading(false);
       }catch(err){
            if(isClerkAPIResponseError(err)){
                Alert.alert('Error',err.errors[0].message);
                setLoading(false)
            }
       }
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 30, paddingVertical: 40 }}>
            <Text style={{ fontFamily: 'SFRegular', fontSize: 18, color: Colors.backgroundRed }}>
                Enter 6 digit code.We just sent you on given email address
            </Text >

            <CodeField
                ref={ref}
                {...props}
                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                testID="my-code-input"
                renderCell={({ index, symbol, isFocused }) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                )}
            />
            <TouchableOpacity onPress={() => onVerification()}
                style={{ padding: 25, backgroundColor: "#FA4A0C", borderRadius: 30, marginTop: 100, width: 314 }}>
                {
                    loading ? <ActivityIndicator color='#fff' /> :
                        <Text style={{ fontFamily: "SFSemiBold", color: 'white', textAlign: "center", fontSize: 18 }}>
                            Continue
                        </Text>
                }
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    root: { padding: 20, marginBottom: 20 },
    codeFieldRoot: { marginTop: 20 },
    cell: {
        width: 45,
        height: 45,
        lineHeight: 38,
        fontSize: 30,
        paddingVertical: 5,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#00000030',
        textAlign: 'center',
        borderRadius: 10
    },
    focusCell: {
        borderColor: Colors.backgroundRed,
    },
})

export default EmailCodeVerification