import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Products from '../components/Products/Products'

const AllProduct = () => {
  return (
    <ScrollView>
      <View >
        <View style={styles.container}>
        <Text style={styles.title}>Tất Cả Sản Phẩm</Text>
        </View>
        
        <Products />
       
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default AllProduct;
