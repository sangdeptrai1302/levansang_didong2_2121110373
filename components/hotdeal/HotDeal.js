import { StyleSheet, Text, View,ScrollView, Image } from 'react-native'
import React from 'react'


const HotDeal = () => {

    return (
        <View style={styles.top} >
         
         <Text style={styles.name} ></Text>
         <ScrollView horizontal>
        
           <View style={styles.homeContainer}>
             <View style={styles.imageContainer}>
               <Image source={require('../../assets/ip1.jpg')} style={styles.image} />
               <Text>Iphone 11  </Text>
               <Text>Giá :20$ </Text>
             </View>
             <View style={styles.imageContainer}>
               <Image source={require('../../assets/ip3.jpg')} style={styles.image} />
               <Text>Iphone 11 Pro</Text>
               <Text>Giá :20$ </Text>
             </View>
             <View style={styles.imageContainer}>
               <Image source={require('../../assets/ip5.jpg')} style={styles.image} />
               <Text>Iphone 13 Pro</Text>
               <Text>Giá :20$ </Text>
             </View>
             <View style={styles.imageContainer}>
               <Image source={require('../../assets/ip6.jpg')} style={styles.image} />
               <Text>Iphone 14Pro </Text>
               <Text>Giá :20$ </Text>
             </View>
           </View>
         </ScrollView>
         </View>
       );
}

export default HotDeal
const styles = StyleSheet.create({
    homeContainer: {
      paddingTop:-2000,
      flexDirection: 'row',
      alignItems: 'center',
    },
    imageContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      marginHorizontal: 10,
    },
    image: {
      width: 150, // Điều chỉnh chiều rộng của hình ảnh
      height: 150, // Điều chỉnh chiều cao của hình ảnh
      marginBottom: 10,
      resizeMode: 'cover',
    },
    name:
    {
      
      fontSize:20,
      alignItems: 'center',
    },
   
  });