import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../data/api";
import axios from "axios";

const ProfileCard = () => {
  const profileData = {
    firstName: "sang",
    lastName: "123",
    mobileNo: "0345313382",
    emailId: "sagdeptrai1302@gmail.com",
    password: "Sang1302",
    createdOn: "2024-01-14T21:24:39",
    creditCard: {
      cardNumber: "0123456789",
      cardValidity: "12/25",
      cardCVV: "123",
    },
    address: {
      house: {
        addressId: 7,
        streetNo: "147",
        buildingName: "phước long B",
        locality: "krong buk",
        city: "đak lak",
        state: "Việt Nam",
        pincode: "700000",
      },
    },
 };
 const handleLoginPress = () => {
  // Đoạn mã bạn muốn thực hiện khi nút được nhấn
  // Ví dụ: Chuyển hướng đến trang đăng nhập
  navigation.navigate('login'); // Thay 'Login' bằng tên màn hình bạn muốn chuyển đến
};
  const navigation = useNavigation();
  const [token, setAccessToken] = useState("");

  useEffect(() => {
    const loadAccessToken = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        if (token) {
          setAccessToken(token);
          console.log("Token loaded successfully:", token);
        } else {
          console.warn("Không tìm thấy accessToken trong AsyncStorage.");
        }
      } catch (error) {
        console.error("Lỗi khi load accessToken từ AsyncStorage:", error);
      }
    };

    loadAccessToken();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `http://${api[0].ip}:8080/logout/customer`,
        {
          token: token,
        }
      );

      if (response.status === 202) {
       
        navigation.navigate("home");
        alert("Bạn đã đăng xuất thành công")
      } else {
        // Handle logout failure
        const errorData = await response.json();
        console.error("Logout failed:", errorData);
       
        alert(`Đăng xuất thất bại: ${errorData.message}`);
      }
    } catch (error) {
      setAccessToken("");
      if (token == "") {
        alert(`bạn chưa đăng nhập`);
      } else {
        console.error("Error during logout:", error.message);
        alert("Đã xảy ra lỗi khi đăng xuất ", error.message);
        console.log("" + token);
      }
    }
  };

 
  const goToOrderScreen = () => {
    // Navigate to the "Order" screen
    navigation.navigate("Orders");
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
        
          <Image
            source={require("../assets/sang1.jpg")}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.buttonlogin} onPress={handleLoginPress} >
          <Text style={styles.buttonText}>đăng nhập</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Thông tin cá nhân</Text>
            <Text style={styles.profileInfo}>
              Tên: {profileData.firstName} {profileData.lastName}
            </Text>
            <Text style={styles.profileInfo}>
              Số điện thoại: {profileData.mobileNo}
            </Text>
            <Text style={styles.profileInfo}>Email: {profileData.emailId}</Text>
            <Text style={styles.profileInfo}>
              Ngày tạo: {profileData.createdOn}
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Địa chỉ</Text>
            <Text style={styles.profileInfo}>
              Địa chỉ: {profileData.address.house.buildingName},{" "}
              {profileData.address.house.streetNo},{" "}
              {profileData.address.house.locality},{" "}
              {profileData.address.house.city},{" "}
              {profileData.address.house.state},{" "}
              {profileData.address.house.pincode}
            </Text>
          </View>

          
        </View>
      </View>
      <View style={styles.buttonContainer}>
        
        <TouchableOpacity style={styles.buttonlogout} onPress={handleLogout}>
          <Text style={styles.buttonText}>đăng xuất</Text>
        </TouchableOpacity>

        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  cardContainer: {
    marginTop: 20,
  },
  card: {
    backgroundColor: "#f1f1f1",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  profileInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonorder: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    width: "48%", // Adjust the width based on your preference
  },
  buttonlogout: {
    backgroundColor: "#ff0000",
    padding: 10,
    borderRadius: 5,
    width: "48%", // Adjust the width based on your preference
  },
  buttonlogin: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    width: "48%", // Adjust the width based on your preference
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileCard;
