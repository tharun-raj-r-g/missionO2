import { View, Text, Dimensions, Image } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Feather";
const { width, height } = Dimensions.get("window");
import { useState,useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch,useSelector } from "react-redux";
import axiosInstance from "../api/api";
import MyModal from "./MyModal";
import {
  addToCart,
  decrementQty,
  incrementQty,
} from "../redux/reducers/cartReducers";
import {
  incrementQuantity,
  decrementQuantity,
} from "../redux/reducers/productReducer";
const OrderCard = ({ item, name, fullname, image }) => {
  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    dispatch(addToCart(item)); // cart array being used
    dispatch(incrementQuantity(item)); // product array being used
  };
  const cart = useSelector((state) => state.cart.cart);
  const HandlePress = () => {
    addItemToCart(item);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const plant = {
    name: 'Example Plant',
    description: 'This is a beautiful example plant with lush green leaves.',
    imageSource: 'https://example.com/path-to-your-plant-image.jpg',
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
        
        width: width * 0.9,
        backgroundColor: "#fafafa",
        borderRadius: 10,
        elevation: 5,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        flexDirection: "row",
        marginVertical: 10,
      }}
    >
      <View
        style={{
          width: width * 0.45,
          height: height * 0.12,
          alignSelf: "center",
          alignItems: "flex-start",
          backgroundColor: "#fafafa",
        }}
      >
        <Image
          style={{
            height: height * 0.12,
            width: width * 0.3,
            resizeMode: "cover",
            marginLeft: "10%",
            borderRadius: 10,
          }}
          source={{ uri: `data:image/jpeg;base64,${isimage}`}}
        ></Image>
      </View>
      <View
        style={{
          width: width * 0.35,
          height: height * 0.12,
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        <Text
        numberOfLines={1} ellipsizeMode="tail"
          style={{
            fontSize: 17,
            fontWeight: "bold",
            color: "#005f48",
            marginTop: "3%",
          }}
        >
          {name}
        </Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 15, marginVertical: "3%" }}>{fullname}</Text>
        {cart.some((value) => value.id === item.id) ? (
          <View
            style={{
              height: height * 0.04,
              width: width * 0.18,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: "3%",
              borderWidth: 1,
              borderColor: "#005f48",
              borderRadius: 8,
              marginVertical: "3%",
              marginLeft: "0%",
            }}
          >
            <TouchableOpacity  onPress={() => {
                dispatch(decrementQty(item));
                dispatch(decrementQuantity(item));
              }}><Text style={{ color: "#005f48",fontWeight:"bold",fontSize:22}}>-</Text></TouchableOpacity>
            <Text style={{ fontWeight: "bold", color: "#005f48" }}>{item.quantity}</Text>
            <TouchableOpacity  onPress={() => {
                dispatch(incrementQty(item));
                dispatch(incrementQuantity(item));
              }}><Text style={{ color: "#005f48",fontWeight:"bold", fontSize:22}}>+</Text></TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              width: width * 0.15,
              justifyContent: "center",
              alignItems: "center",
              padding: "4%",
              borderRadius: 10,
              marginVertical: "3%",
              backgroundColor:"#005f48" ,
              
            }}
            onPress={HandlePress}
          >
            <Text style={{ fontWeight: "bold", color: "white" }}>Add</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        style={{
          width: width * 0.1,
          height: height * 0.15,
          alignItems: "center",
          alignSelf:"center",
          paddingTop:"8%",
        }}
        onPress={toggleModal}
      >
        <Icon name="info" size={20} color="#005f48" />
      </TouchableOpacity>
      <MyModal
        visible={modalVisible}
        onRequestClose={toggleModal}
        onPressOverlay={toggleModal}
        plant={item}
        image={isimage}
      />
    </View>
  );
};

export default OrderCard;
