import { View ,StyleSheet, ScrollView, Image} from 'react-native'
import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { StatusBar } from 'expo-status-bar'
import Products from '../Products/Products'
import Headfones from '../../screens/Headfones'



const Layout = ({children}) => {
  return (
    <>
    <StatusBar/>
    <Image source={require('../../assets/logo.jpg')} style={styles.image} />
     <Header/>
     <ScrollView>
        {children}
      {/* <Headfones/> */}
      <Products/>
     </ScrollView>
     <View  style ={styles.footer}>
   
     </View>
     <Footer/>
    </>
  )
}
const styles = StyleSheet.create({
  footer: {
    display: "flex",
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
    zIndex: 100,
    borderTopWidth: 1,
    borderColor: "lightgray",
    position: "absolute",
    bottom: 20,
    padding: 10,
 
    marginBottom:20
    
  },
  image:{
    marginLeft:50,
  }
})
export default Layout