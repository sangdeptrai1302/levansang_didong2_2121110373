import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import Layout from '../components/Layout/Layout'
import Categories from '../components/category/Categories'
import Slider from '../components/Slider/Slider'

import HotDeal from '../components/hotdeal/HotDeal'


const Home = () => {
  return (
    <Layout>
      <Categories/>
      <Slider/>
      <Text> sản phẩm mới nhất</Text>
     <HotDeal/>
    
    
 

    </Layout>
    
  )
}

export default Home
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });