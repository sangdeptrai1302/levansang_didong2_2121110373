import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Feather } from '@expo/vector-icons';
import {api} from '../../data/api';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'native-base';


const { height } = Dimensions.get('window');

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const getAPI = () => {
    const apiUrl =`http://${api[0].ip}:8080/products`;

    return fetch(apiUrl)
      .then(response => response.json())
      .then((data) => setProducts(data))
      .catch(error => console.log(error));
  }
  useEffect(() => {
    getAPI();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text !== '') {
      setSearchResults(products.filter((product) =>
        product.productName.toLowerCase().includes(text.toLowerCase())
      ));
    } else {
      setSearchResults([]);
    }
  };
  const handleProductPress = (product) => {
    navigation.navigate('productDetails', { product }); // Navigate to ProductDetails screen
  };
  const ProductItem = ({ item }) => (
    <TouchableOpacity style={styles.productContainer} onPress={() => handleProductPress(item)}>
      <View style={styles.item}>
        {item.manufacturer && (
          <Image source={{ uri: item.manufacturer }} style={styles.image} />
        )}
        <Text style={styles.name}>{item.productName}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      
      <TouchableOpacity style={styles.searchBar} onPress={() => setIsSearchActive(!isSearchActive)}>
        <Feather name="search" size={20} />
        {isSearchActive && (
          <>
          <TextInput
            value={searchQuery}
            onChangeText={handleSearch}
            placeholder="Tìm kiếm sản phẩm..."
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Feather name="x" size={20} />
          </TouchableOpacity>
        </>
        )}
      </TouchableOpacity>
      {isSearchActive && searchQuery!="" && (
        <TouchableWithoutFeedback onPress={() => setIsSearchActive(false)}>
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.productId.toString()}
            renderItem={({ item }) => <ProductItem item={item} />}
            style={{ height: height - 120 }} 
            ListEmptyComponent={<Text style={styles.emptyMessage}>Không tìm thấy kết quả !!!</Text>}
          />
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 10,
    alignItems: 'center',
    borderColor: 'gray', // Thêm màu viền
    borderWidth: 1,
    height:'100px' // Thêm độ dày viền
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  image: {
    width: 50,
    height: 50,
  },
  name: {
    fontSize: 18,
    flex: 1,
    marginTop:'3%',
  },
  price: {
    fontSize: 16,
    color: '#888',
    marginTop:'3%'
  },
});

export default Header;