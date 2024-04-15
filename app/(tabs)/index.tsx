import FoodCard from '@/components/FoodCard';
import FoodCategories from '@/components/FoodCategories';
import Colors from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import { Link, Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';


export default function TabOneScreen() {
  const navigate = useRouter();
  const [category,setCategory] = useState('Beef');
  const [FoodData,setFoodData] = useState([]);
  const [loading,SetLoading] = useState(false);

   const OnFoodCategoryChange = (category:string)=>{
    setCategory(category)
   }
   useEffect(()=>{
      SetLoading(true)
     const fetchFood = async ()=>{
      try{
        const items = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`).then(
          res=>{
            setFoodData(res.data.meals)
            SetLoading(false)
          }
        )
      }catch(err:any){
        console.log(err.toJSON())
      }
     }
     fetchFood()
   },[category]);
  return (
    <View style={{flex:1,backgroundColor:Colors.backgroundGrey}}>
      <Stack.Screen options={{
        headerRight:()=>(
          <TouchableOpacity style={{marginRight:30}}>
            <Feather name="shopping-cart" size={24} color={Colors.grey} />
          </TouchableOpacity>
        )
      }}/>
      <Animated.View style={{paddingHorizontal:20}}>
        <View style={{width:320,paddingHorizontal:30,marginTop:15}}>
        <Text style={{fontSize:50,fontFamily:'SFBold',}}>
            Delicious Food for you
          </Text>
          {/**search bar */}
          <Link href={'/Search'} asChild>
          <TouchableOpacity style={{backgroundColor:"#EFEEEE",padding:15,
            borderWidth:StyleSheet.hairlineWidth,borderRadius:30,marginTop:20
          }}>
            <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
            <Feather name="search" size={24} color="black" />
            <Text style={{fontSize:18,fontFamily:"SFRegular",color:Colors.grey}}>Search</Text>
            </View>
          </TouchableOpacity>
          </Link>

        </View>

         <View>
           <FoodCategories onCategoryChange={OnFoodCategoryChange}/>
            <FoodCard FoodData={FoodData} loading={loading} />
         </View>
          
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  
});
