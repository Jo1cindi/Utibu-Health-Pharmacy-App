import { View, Image, TouchableOpacity, Text } from "react-native";
import React, { useEffect, useState } from "react";
import HomeStyles from "../Styles/HomeStyles";
import Icon from "react-native-vector-icons/FontAwesome6";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Header = ({ navigation }) => {
  //Retrieving User ID
  const [customerID, setCustomerID] = useState("");
  const getUserID = async () => {
    try {
      const id = await AsyncStorage.getItem("customerID");
      if (id) {
        setCustomerID(id);
      } else {
        console.log("No ID found");
      }
      // console.log(id)
      return id;
    } catch (error) {
      console.error("Error retrieving ID", error);
      return null;
    }
  };

  //Retrieving Order count
  const [orderCount, setOrderCount] = useState("");
  const customer_id = {
    customerID: customerID,
  };
  const url =
    "http://ec2-18-133-195-128.eu-west-2.compute.amazonaws.com:8080/api/count-orders";
  const getOrderCount = () => {
    axios({
      method: "POST",
      url: url,
      headers: { "Content-Type": "application/json" },
      data: customer_id,
    })
      .then((response) => {
        setOrderCount(response.data[0].totalUnfulfilledOrders);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserID();
    getOrderCount();
    // console.log(orderCount)
  });

  return (
    <View style={HomeStyles.topMenu}>
      <View style={HomeStyles.logo}>
        <Image
          source={require("../Images/logo.png")}
          style={HomeStyles.logoImage}
        />
      </View>
      <View style={HomeStyles.cartBox}>
        <TouchableOpacity>
          <Icon
            name="user"
            size={36}
            style={{ color: "#697E51", marginRight: 10 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Checkout")}>
          <Icon
            name="cart-shopping"
            size={36}
            style={[{ color: "#705335" }, HomeStyles.icon]}
          >
            <View style={HomeStyles.count}>
              <Text style={{ color: "#eee" }}>{orderCount}</Text>
            </View>

          </Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
