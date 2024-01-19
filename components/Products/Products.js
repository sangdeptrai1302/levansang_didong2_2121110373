import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {api} from '../../data/api';
import ProductDetails from '../../screens/ProductDetails'; // Import ProductDetails
import ProductsCard from './ProductsCard';

export default function Products() {
  const [games, setGames] = useState([]);
  const [numColumns, setNumColumns] = useState(2); // Thêm state cho số cột
  const navigation = useNavigation();

  const getAPI = () => {
    const apiUrl = `http://${api[0].ip}:8080/products`;

    return fetch(apiUrl)
      .then(response => response.json())
      .then((data) => setGames(data))
      .catch(error => console.log(error));
  }

  const handleProductPress = (product) => {
    navigation.navigate('productDetails', { product }); // Navigate to ProductDetails screen
  };

  useEffect(() => {
    getAPI();
  }, []);

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
        key={numColumns.toString()} // Thêm key khi thay đổi số cột
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
    height: 200, // Điều chỉnh chiều cao của ảnh
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
});
