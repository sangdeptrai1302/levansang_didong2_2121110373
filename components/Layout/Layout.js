import { View ,StyleSheet, ScrollView} from 'react-native'
import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { StatusBar } from 'expo-status-bar'
import Products from '../Products/Products'



const Layout = ({children}) => {
  return (
    <>
    <StatusBar/>
     <Header/>
     <ScrollView>
        {children}
      
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
})
export default Layout