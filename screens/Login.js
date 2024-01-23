// Login.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Thêm dòng này
import {api} from '../data/api';


const Login = () => {
  const [mobileId, setMobileId] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://${api[0].ip}:8080/login/customer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobileId: mobileId,
          password: password,
        }),
      });

      if (response.status === 202) {
        // Lưu token vào AsyncStorage
        const responseData = await response.json();
        await AsyncStorage.setItem('accessToken', responseData.token);
        console.log("*"+responseData.token)
        console.log(`http://${api[0].ip}:8080/login/customer`);
        alert('Đăng nhập thành công!');
        navigation.navigate('home');
      } else {
        const responseData = await response.json();
        alert(`Đăng nhập thất bại: ${responseData.message}`);
      }
    } catch (error) {
      console.error('Lỗi khi thực hiện yêu cầu đăng nhập:', error);
    }
  };

  const handleRegister = () => {
    navigation.navigate('register');
  };

  const handleForgotPassword = () => {
    // Xử lý sự kiện khi người dùng click vào nút "Forgot Password?"
    // Ví dụ: navigation.navigate('ForgotPassword');
  };

  return (
    <ImageBackground
      source={require('../assets/nen4.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.logo}>Đăng nhập</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Số điện thoại..."
            placeholderTextColor="black"
            onChangeText={text => setMobileId(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Mật khẩu..."
            placeholderTextColor="black"
            onChangeText={text => setPassword(text)}
          />
        </View>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgot}>Quên Mật khẩu?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>ĐĂNG NHẬP</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.loginText}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Đặt màu nền thành trong suốt để hình ảnh background hiển thị đúng
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 40,
    color: 'black',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'black',
  },
  forgot: {
    color: 'black',
    fontSize: 11,
  },
  loginBtn: {
    width: '60%',
    backgroundColor: 'green',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default Login;