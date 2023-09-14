import { View, Text, Dimensions, Image, TextInput } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Feather";
const { width, height } = Dimensions.get("window");
import Text from "../fonts/Text";
import TextB from "../fonts/TextBold";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../api/api";
import MyModal from "./MyModal";
import {
  addToCart,
  decrementQty,
  incrementQty,
  setQty,
} from "../redux/reducers/cartReducers";
import {
  incrementQuantity,
  decrementQuantity,
  setQuantity,
} from "../redux/reducers/productReducer";
const OrderCard = ({ item, name, fullname, image }) => {
  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    dispatch(addToCart(item));
    dispatch(incrementQuantity(item));
  };
  const cart = useSelector((state) => state.cart.cart);
  const HandlePress = () => {
    addItemToCart(item);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [isimage, setImage] = useState("");
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  useEffect(() => {
    getImage();
  }, []);
  const getImage = () => {
    axiosInstance
      .get(`/plant/image/${image}`)
      .then((response) => {
        setImage(response.data.image);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleQuantityChange = (value, item) => {
    if (!value) {
      dispatch(setQty({ ...item, newquantity: 0 }));
      dispatch(setQuantity({ ...item, newquantity: 0 }));
    } else {
      dispatch(setQty({ ...item, newquantity: parseInt(value) }));
      dispatch(setQuantity({ ...item, newquantity: parseInt(value) }));
    }
  };

  return (
    <View
      style={{
        width: width * 0.9,
        height: height * 0.15,
        backgroundColor: "#fafafa",
        borderRadius: 10,
        elevation: 5,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        flexDirection: "row",
        marginVertical: 6,
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
          source={{ uri: `data:image/jpeg;base64,${isimage}` }}
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
        <TextB
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            fontSize: 17,
            color: "#005f48",
            marginTop: "3%",
          }}
        >
          {name}
        </TextB>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ fontSize: 15, marginVertical: "3%" }}
        >
          {fullname}
        </Text>
        {cart.some((value) => value.id === item.id) ? (
          <View
            style={{
              height: height * 0.04,
              width: width * 0.3,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              borderRadius: 8,
              marginVertical: "3%",
              marginLeft: "0%",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                dispatch(decrementQty(item));
                dispatch(decrementQuantity(item));
              }}
              style={{
                width: width * 0.08,
                backgroundColor: "#005f48",
                borderRadius: 40,
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Text
                style={{
                  color: "#005f48",
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "white",
                }}
              >
                -
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: width * 0.08,
                borderWidth: 1,
                borderColor: "#005f48",
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <TextInput
                style={{
                  fontWeight: "bold",
                  color: "#005f48",
                  alignSelf: "center",
                  textAlign: "center",
                }}
                value={item.quantity.toString()}
                onChangeText={(text) => handleQuantityChange(text, item)}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                dispatch(incrementQty(item));
                dispatch(incrementQuantity(item));
              }}
              style={{
                width: width * 0.08,
                backgroundColor: "#005f48",
                borderRadius: 40,
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Text
                style={{
                  color: "#005f48",
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "white",
                }}
              >
                +
              </Text>
            </TouchableOpacity>
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
              backgroundColor: "#005f48",
            }}
            onPress={HandlePress}
          >
            <TextB style={{ color: "white" }}>Add</TextB>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        style={{
          width: width * 0.1,
          height: height * 0.15,
          alignItems: "center",
          alignSelf: "center",
          paddingTop: "8%",
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
