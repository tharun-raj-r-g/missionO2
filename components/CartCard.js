import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
const { width, height } = Dimensions.get("window");
import Icon from "react-native-vector-icons/Feather";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "../api/api";
import {
  addToCart,
  decrementQty,
  incrementQty,
  removeFromCart,
} from "../redux/reducers/cartReducers";
import {
  incrementQuantity,
  decrementQuantity,
  zeroQuantity,
} from "../redux/reducers/productReducer";

const CartCard = ({ name, fullname, image, item }) => {
  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    dispatch(addToCart(item)); // cart array being used
    dispatch(incrementQuantity(item)); // product array being used
  };
  const HandlePress = () => {
    dispatch(removeFromCart(item));
    dispatch(zeroQuantity(item));
  };
  const [isimage,setImage]=useState("");
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  useEffect(() => {
    getImage();
  }, []);
  const getImage = () => {
    axiosInstance
      .get(
        `/plant/image/${image}`
      )
      .then((response) => {
        setImage(response.data.image);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View
      style={{
        height: height * 0.1,
        width: width * 0.92,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View
        style={{
          height: height * 0.06,
          width: width * 0.1,
          marginLeft: width * 0.03,
          elevation: 20,
          shadowColor: "black",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
        }}
      >
        <Image
          style={{
            height: "100%",
            width: "100%",
            resizeMode: "cover",
            borderRadius: 10,
            elevation: 20,
            shadowColor: "black",
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
          }}
          source={{
            uri:`data:image/jpeg;base64,${isimage}`,
          }}
        ></Image>
      </View>
      <View
        style={{
          height: height * 0.08,
          width: width * 0.45,
          paddingLeft: "3%",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 14,width:width*0.4 }} numberOfLines={1}>
          {name}
        </Text>
        <Text style={{ color: "white", fontSize: 10, opacity: 0.8,width:width*0.4 }} numberOfLines={1}>
          {name}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          height: height * 0.08,
          width: width * 0.1,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={HandlePress}
      >
        <Icon2 name="trash-can" size={30} color="white" />
      </TouchableOpacity>
      <View
        style={{
          height: height * 0.04,
          width: width * 0.17,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: "2%",
          borderWidth: 1,
          borderColor: "white",
          borderRadius: 8,
          marginVertical: "3%",
          marginLeft: "2%",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            dispatch(decrementQty(item));
            dispatch(decrementQuantity(item));
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
            -
          </Text>
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold", color: "white" }}>
          {item.quantity}
        </Text>
        <TouchableOpacity
          onPress={() => {
            dispatch(incrementQty(item));
            dispatch(incrementQuantity(item));
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartCard;
