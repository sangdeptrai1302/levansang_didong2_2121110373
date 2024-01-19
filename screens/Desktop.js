import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ProductsCard from '../components/Products/ProductsCard';
import {api} from '../data/api';

export default function Desktop()  {
  const [games, setGames] = useState([]);
  const [numColumns, setNumColumns] = useState(2);
  const navigation = useNavigation();

  const getAPI = () => {
    const apiUrl = `http://${api[0].ip}:8080/products/desktop`;

    return fetch(apiUrl)
      .then(response => response.json())
      .then((data) => setGames(data))
      .catch(error => console.log(error));
  }

  const handleMoreButton = (id) => {
    navigation.navigate('productDetails', { _id: productId });
    console.log(id);
  };



  useEffect(() => {
    getAPI();
  }, []);

  const handleProductPress = (product) => {
    navigation.navigate('productDetails', { product }); // Navigate to ProductDetails screen
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.productContainer} onPress={() => handleProductPress(item)}>
      <ProductsCard product={item}/>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={games}
        keyExtractor={(item) => item.productId.toString()}
        renderItem={renderProduct}
        key={numColumns.toString()}
        numColumns={numColumns}
      />
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  },
  productContainer: {
    flex: 1,
    margin: 8,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  productDescription: {
    fontSize: 12,
    marginTop: 4,
  },
  productPrice: {
    fontSize: 12,
    marginTop: 4,
    color: 'green',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  categoryImage: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
});

