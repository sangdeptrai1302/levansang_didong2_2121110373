import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

const Desktop = () => {
  const [games, setGames] = useState([]);
  const [numColumns, setNumColumns] = useState(2);
  const navigation = useNavigation();

  const getAPI = () => {
    const apiUrl = 'http://10.17.8.251:8080/api/products';

    return fetch(apiUrl)
      .then(response => response.json())
      .then((data) => {
        // Lọc và chỉ lấy các sản phẩm có category.id === 3
        const filteredGames = data.filter(item => item.category.id === 7);
        setGames(filteredGames);
      })
      .catch(error => console.log(error));
  }

  const handleMoreButton = (id) => {
    navigation.navigate('productDetails', { _id: id });
    console.log(id);
  };

  const handleAddToCart = () => {
    alert('Added to cart');
  };

  useEffect(() => {
    getAPI();
  }, []);

  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.photo }} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <Text style={styles.productPrice}>{`Giá: ${item.price}`}</Text>
      <View style={styles.categoryContainer}>
        <Image source={{ uri: item.category.photo }} style={styles.categoryImage} />
        <Text style={styles.productCategory}>{`Category: ${item.category.name}`}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={games}
        keyExtractor={(item) => item.id.toString()}
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

export default Desktop;
