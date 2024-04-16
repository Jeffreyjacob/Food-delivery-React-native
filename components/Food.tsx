import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'

interface Props {
    image: string,
    name: string
}
const Food = ({ image, name }: Props) => {
    return (
        <View style={{
            backgroundColor: "#fff", height: 250, width: 220, marginHorizontal: 20, borderRadius: 30,
            position: 'relative'
        }}>
            <View style={{ position: 'absolute', top: -50, width: '100%' }}>
                <View style={{ justifyContent: 'center', alignItems: "center", }}>
                    <View style={styles.plate}>
                        <Image source={{ uri: image }} style={{ width: 110, height: 110, borderRadius: 55, objectFit: "contain" }} />
                    </View>
                </View>
            </View>

            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 140 }}>
                <Text style={{ fontSize: 19, textAlign: "center", width: 180, fontFamily: "SFSemiBold" }}>
                    {name}
                </Text>
                <Text style={{
                    fontSize: 20, fontFamily: "SFSemiBold", color: Colors.backgroundRed,
                    paddingTop: 20
                }}>
                    $15.00
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    plate: {
        flexDirection: 'column',
        height: 162,
        width: 162,
        backgroundColor: '#e4e4e4',
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 80
    }
})

export default Food