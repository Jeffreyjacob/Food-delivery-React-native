import { View, Text,ScrollView, TouchableOpacity, StyleSheet} from 'react-native'
import React, { useRef, useState } from 'react'
import Colors from '@/constants/Colors';
import * as Haptics from 'expo-haptics';


const FoodCategories = () => {
    const Categories = [
        {id:"1",name:"Beef"},
        {id:"2",name:"Chicken"},
        {id:"3",name:"Dessert"},
        {id:"4",name:"Seafood"},
        {id:"5",name:"Lamb"},
        {id:"6",name:"Pasta"},
        {id:"7",name:"Starter"},
        {id:"8",name:"Breakfast"},
    ]
    const [activeIndex,setActiveIndex]= useState(0);
    const ItemRef = useRef<Array<TouchableOpacity | null>>([]);
    const ScrollViewRef = useRef<ScrollView>(null);
    const selectCategory = (index:any)=>{
        setActiveIndex(index)
        const selected = ItemRef.current[index]
        selected?.measure((x)=>{
            ScrollViewRef.current?.scrollTo({x:x - 50,y:0,animated:true});
        })
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  return (
    <ScrollView horizontal 
     ref={ScrollViewRef}
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{
        marginTop:30,
        gap:10,
        paddingLeft:50
    }}>
       {
        Categories.map((item,index)=>(
         <TouchableOpacity key={index} onPress={()=>selectCategory(index)}
         ref={(el)=>ItemRef.current[index] = el}
         style={activeIndex === index ? styles.selectBtn:styles.btn}>
             <Text style={activeIndex === index ? styles.selectText:styles.Text}>
                {item.name}
                </Text>
         </TouchableOpacity>
        ))
       }
    </ScrollView>
  )
}
const styles = StyleSheet.create({
    selectBtn:{
      borderBottomWidth:2,
      borderBottomColor:Colors.backgroundRed,
      paddingBottom:7,
      paddingHorizontal:15
    },
    btn:{
        paddingBottom:7,
        paddingHorizontal:15
    },
    selectText:{
        fontSize:20,
        fontFamily:'SFSemiBold',
        textAlign:'center',
        color:Colors.backgroundRed
    },
    Text:{
        fontSize:20,
        fontFamily:'SFSemiBold',
        textAlign:'center',
        color:Colors.grey
    }
})

export default FoodCategories