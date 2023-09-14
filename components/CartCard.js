import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput
} from "react-native";
import React from "react";
const { width, height } = Dimensions.get("window");
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Text from "../fonts/Text";
import TextB from "../fonts/TextBold";
import axiosInstance from "../api/api";
import {
  addToCart,
  decrementQty,
  incrementQty,
  setQty,
  removeFromCart,
} from "../redux/reducers/cartReducers";
import {
  incrementQuantity,
  decrementQuantity,
  setQuantity,
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
  const [isimage, setImage] = useState("");
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  useEffect(() => {
    getImage();
  }, []);
  const handleQuantityChange=(value,item)=>{
    if(!value)
    {
        dispatch(setQty({...item,newquantity:0}));
    dispatch(setQuantity({...item,newquantity:0}));
      
    }
    dispatch(setQty({...item,newquantity:parseInt(value)}));
    dispatch(setQuantity({...item,newquantity:parseInt(value)}));
  }
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
            uri: `data:image/jpeg;base64,${isimage}`,
          }}
        ></Image>
      </View>
      <View
        style={{
          height: height * 0.08,
          width: width * 0.35,
          paddingLeft: "3%",
          justifyContent: "center",
        }}
      >
        <TextB
          style={{ color: "white", fontSize: 14, width: width * 0.4 }}
          numberOfLines={1}
        >
          {name}
        </TextB>
        <Text
          style={{
            color: "white",
            fontSize: 10,
            opacity: 0.8,
            width: width * 0.4,
          }}
          numberOfLines={1}
        >
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
              width: width * 0.30,
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
              style={{width:width*0.08,backgroundColor:"#005f48",borderRadius:40,alignItems:'center',justifyContent:'center',height:"100%"}}
            >
              <Text
                style={{fontWeight: "bold", fontSize: 20,color:'white' }}
              >
                -
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{width:width*0.08,borderWidth:1,borderColor:"white",borderRadius:8,alignItems:'center',justifyContent:'center',height:"100%"}} >
            <TextInput style={{ fontWeight: "bold",color:"white",alignSelf:'center',textAlign:"center"}} value={item.quantity.toString()} onChangeText={(text) =>handleQuantityChange(text, item)} />
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => {
                dispatch(incrementQty(item));
                dispatch(incrementQuantity(item));
              }}
              style={{width:width*0.08,backgroundColor:"#005F48",borderRadius:40,alignItems:'center',justifyContent:'center',height:'100%'}}
            >
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 20,color:'white' }}
              >
                +
              </Text>
            </TouchableOpacity>
          </View>
    </View>
  );
};

export default CartCard;
