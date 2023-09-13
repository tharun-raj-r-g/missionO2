import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Pressable,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import OrderCard from "../components/OrderCard";
const { width, height } = Dimensions.get("window");
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/reducers/productReducer";
import { useEffect } from "react";
import axiosInstance from "../api/api";
import MyModal from "../components/MyModal";
const plantlist = [
  {
    id: 0,
    name: "Tulsi",
    fullname: "Indian Tulsi",
    image:
      "https://balconygardenweb.b-cdn.net/wp-content/uploads/2015/10/how-to-grow-tulsi_mini.jpg",
    quantity: 0,
  },
  {
    id: 1,
    name: "Aloe Vera",
    fullname: "Indian Aloe Vera",
    image:
      "https://www.almanac.com/sites/default/files/styles/or/public/image_nodes/aloe-vera-white-pot_sunwand24-ss_edit.jpg?itok=BVzzldrw",
    quantity: 0,
  },
  {
    id: 2,
    name: "Calendula",
    fullname: "Indian Calendula",
    image:
      "https://cdn.pixabay.com/photo/2018/07/10/11/11/marigold-3528402_640.jpg",
    quantity: 0,
  },
  {
    id: 3,
    name: "Thyme",
    fullname: "Indian Thyme",
    image:
      "https://cdn-prod.medicalnewstoday.com/content/images/articles/266/266016/thyme.jpg",
    quantity: 0,
  },
  {
    id: 4,
    name: "Peppermint",
    fullname: "Indian Peppermint",
    image:
      "https://www.stylecraze.com/wp-content/uploads/2013/08/1634-23-Amazing-Benefits-Of-Peppermint-Leaves-For-Skin-Hair-And-Health-ss.jpg",
    quantity: 0,
  },
  {
    id: 5,
    name: "Vasaka",
    fullname: "Indian Vasaka",
    image:
      "https://5.imimg.com/data5/KT/SS/MY-29231069/vasaka-leaf-500x500.jpg",
    quantity: 0,
  },
];
const Order = ({ navigation }) => {
  const products = useSelector((state) => state.product.product);
  const dispatch = useDispatch();
  const [dataLoaded, setDataLoaded] = useState(true);
  const cart = useSelector((state) => state.cart.cart);
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={"dark-content"}
      />
      <View
        style={{
          height: height * 0.12,
          width: width,
          backgroundColor: "#00b388",
          borderBottomLeftRadius: 35,
          borderBottomRightRadius: 35,
          elevation: 8,
          shadowColor: "black",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.7,
          shadowRadius: 8,
          marginBottom: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "5%",
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 25,
            marginLeft: "15%",
          }}
        >
          Order
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Cart");
          }}
        >
          <Icon
            name="cart-outline"
            size={28}
            color="white"
            style={{ marginRight: "10%" }}
          />
        </TouchableOpacity>
      </View>
      {(dataLoaded == false && (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#00b388" />
        </View>
      )) || (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: width }}
        >
          {dataLoaded && (
            <View style={{ alignItems: "center" }}>
              {products.map((item, index) => (
                <OrderCard
                  item={item}
                  name={item.name}
                  fullname={item.name}
                  image={item.images}
                />
              ))}
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
