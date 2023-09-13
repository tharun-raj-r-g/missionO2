import {
  StyleSheet,
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
import TextB from "../fonts/TextBold";

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
        <TextB
          style={{
            color: "white",

            fontSize: 25,
            marginLeft: "15%",
          }}
        >
          Order
        </TextB>
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
