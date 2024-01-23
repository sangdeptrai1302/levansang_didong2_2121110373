import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { api } from '../data/api';
import { useNavigation } from '@react-navigation/native';

const Headfones = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [allGames, setAllGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [numColumns, setNumColumns] = useState(2);
  const navigation = useNavigation(); // Sử dụng hook useNavigation để có đối tượng navigation

  const [searchMessage, setSearchMessage] = useState('');
  useEffect(() => {
    // Gọi API để lấy tất cả sản phẩm
    getAPI();
  }, []);

  const getAPI = () => {
    const apiUrl = `http://${api[0].ip}:8080/products`;

    return fetch(apiUrl)
      .then(response => response.json())
      .then((data) => {
        setAllGames(data);
        setFilteredGames(data);
      })
      .catch(error => console.log(error));
  }


  const handleProductPress = (product) => {
    navigation.navigate('productDetails', { product }); // Navigate to ProductDetails screen
  };


  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handleProductPress(item)}>
      <View style={styles.productWrapper}>
        <Image source={{ uri: item.manufacturer }} style={styles.thumbnail} />
        <Text style={styles.productName}>{item.productName}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleSearch = () => {
    const keyword = searchKeyword.toLowerCase();
    const filteredData = allGames.filter(item => item.productName.toLowerCase().includes(keyword));
    setFilteredGames(filteredData);
    
    if (filteredData.length === 0) {
      setSearchMessage('Không tìm thấy sản phẩm');
    } else {
      setSearchMessage('');
    }
  };

  return (
    <View>
      <TextInput
       style={styles.searchInput} 
        placeholder="Nhập từ khóa tìm kiếm"
        value={searchKeyword}
        onChangeText={(text) => setSearchKeyword(text)}
      />
      <TouchableOpacity title="Tìm kiếm" onPress={handleSearch}>
        <Text  style={styles.searchtext}>Tìm kiếm</Text>
      </TouchableOpacity>
      {searchMessage !== '' && <Text style={styles.searchMessage}>{searchMessage}</Text>}
      <FlatList
        data={filteredGames}
        keyExtractor={(item) => item.productId.toString()}
        numColumns={numColumns}
        renderItem={renderProduct}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  productWrapper: {
    flexDirection: 'column', // Đổi thành cột
    alignItems: 'center',
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginBottom: 10, // Thêm margin dưới hình ảnh
    resizeMode: 'cover',
  },
  productName: {
    textAlign: 'center', // Căn giữa văn bản
  },
  searchInput: {
    borderRadius: 10, // Số này có thể điều chỉnh tùy thuộc vào độ bo tròn bạn muốn
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
    marginBottom: 10,
  },
  searchtext:{
    textAlign: 'center', 
    fontSize:"20",
    color:"blue"
  },
  searchMessage: {
    textAlign: 'center',
    color: 'red',
    marginTop: 10,
  },
});

export default Headfones;
