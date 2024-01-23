import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Button } from 'react-native';
import axios from 'axios';

const ProductSearch = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Gọi API để lấy tất cả sản phẩm
    fetchProducts();
  }, []);

  // Hàm gọi API để lấy tất cả sản phẩm
  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://:8080/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Hàm xử lý tìm kiếm
  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://your-api-endpoint/products?title=${searchKeyword}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Nhập từ khóa tìm kiếm"
        value={searchKeyword}
        onChangeText={(text) => setSearchKeyword(text)}
      />
      <Button title="Tìm kiếm" onPress={handleSearch} />

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
            {/* Thêm các trường khác nếu cần */}
          </View>
        )}
      />
    </View>
  );
};

export default ProductSearch;
