import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
const { width, height } = Dimensions.get("window");
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/reducers/productReducer";
import axiosInstance from "../api/api";
import { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";
const HomePage = ({ navigation }) => {
  const products = useSelector((state) => state.product.product);
  const [plantdata, setplantdata] = useState([]);
  const dispatch = useDispatch();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [error, setError] = useState("abc");
  useEffect(() => {
    if (products.length > 0) {
      return;
    }
    getplants();
  }, []);

  useEffect(() => {
    if (plantdata.length > 0) {
      fetchProducts();
    }
  }, [plantdata]);

  const fetchProducts = () => {
    plantdata.map((item) => dispatch(getProducts(item)));
  };

  const getplants = () => {
    axiosInstance
      .get(`/plant/view/all/0/10`)
      .then((response) => {
        const modifiedPlantData = response.data.data.map((plant) => {
          return {
            ...plant,
            quantity: 0,
          };
        });
        setplantdata(modifiedPlantData);
        setDataLoaded(true);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
        console.log("hi");
      });
  };

  const cart = useSelector((state) => state.cart.cart);
  return (
    <View
      style={{
        height: "100%",
      }}
    >
      <View
        style={{
          height: "100%",
          backgroundColor: "#f2f2f2",
        }}
      >
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={"dark-content"}
        />
        <View
          style={{
            height: height * 0.4,
            backgroundColor: "#00b388",
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            elevation: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            overflow: "hidden",
          }}
        >
          <Image
            source={require("../assets/image1.png")}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0.4,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 16,
              marginTop: "10%",
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 15,
              }}
            ></View>
            <TouchableOpacity
              style={{
                width: 30,
                height: 30,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 15,
              }}
              onPress={() => {
                navigation.navigate("Cart");
              }}
            >
              <Icon
                name="cart-outline"
                size={Dimensions.get("window").width * 0.06}
                color="white"
                style={{ marginRight: "20%" }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 60,
                fontWeight: "bold",
                color: "#004B39",
                marginRight: 8,
                textShadowColor: "rgba(0, 0, 0, 0.25)",
                textShadowOffset: { width: 2.5, height: 2.5 },
                textShadowRadius: 5,
              }}
            >
              23,240
            </Text>
            <Image
              source={require("../assets/image2.png")}
              style={{
                width: 44,
                height: 44,
                resizeMode: "contain",
                marginLeft: 5,
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 16,
              color: "white",
              alignSelf: "center",
            }}
          >
            planted and counting...
          </Text>

          <View
            style={{
              height: height * 0.065,
              width: width,
              flexDirection: "row",
              justifyContent: "center",
              backgroundColor: "white",
              marginTop: "6%",
              elevation: 30,
              shadowColor: "black",
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.5,
              shadowRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#005f48",
                alignSelf: "center",
                marginRight: "4%",
                fontWeight: "bold",
              }}
            >
              Last 24 hours
            </Text>
            <Text
              style={{
                fontSize: 35,
                fontWeight: "bold",
                color: "#004B39",
                marginRight: "4%",
                textShadowColor: "rgba(0, 0, 0, 0.25)",
                textShadowOffset: { width: 2.5, height: 2.5 },
                textShadowRadius: 5,
                alignSelf: "center",
              }}
            >
              54
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: "#005f48",
                alignSelf: "center",
                marginRight: "5%",
                fontWeight: "bold",
              }}
            >
              Plants...
            </Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              height: height * 0.06,
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "10%",

              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                height: height * 0.06,
                marginLeft: "5%",
              }}
              onPress={() => {
                navigation.navigate("OrderStack");
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#005f48",
                  fontWeight: "bold",
                }}
              >
                Our Plants
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("OrderStack");
              }}
              style={{
                height: height * 0.06,
                marginRight: "5%",
                marginTop: "2%",
              }}
            >
              <Text style={{ textDecorationLine: "underline", color: "gray" }}>
                View all
              </Text>
            </TouchableOpacity>
          </View>
          {products.length==0 ? (
            <View style={{ marginTop: "20%" }}>
              
              <ActivityIndicator size="large" color="#00b388" />
            </View>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width: width }}
            >
              {products ? (
                <View style={{ alignItems: "center" }}>
                  {products.map((item, index) => {
                    if (index < 3) {
                      return (
                        <OrderCard
                          item={item}
                          name={item.name}
                          fullname={item.name}
                          image={item.images}
                        />
                      );
                    }
                  })}
                </View>
              ) : null}
            </ScrollView>
          )}
          {(products.length) ? (
            <TouchableOpacity
              style={{
                height: height * 0.05,
                width: width * 0.5,
                borderRadius: 30,
                backgroundColor: "#00b388",
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                elevation: 4,
                shadowColor: "black",
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.5,
                shadowRadius: 10,
                marginTop: "7%",
                alignSelf: "center",
                marginBottom: "10%",
              }}
              onPress={() => {
                navigation.navigate("OrderStack");
              }}
            >
              <Text
                style={{ fontSize: 16, color: "#005f48", fontWeight: "bold" }}
              >
                Explore More !
              </Text>
            </TouchableOpacity>
          ) : null}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    height: height * 0.4,
    backgroundColor: "#00b388",
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    overflow: "hidden",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  dimBackground: {
    opacity: 0.4,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 24,
    marginTop: 35,
  },
  iconContainer: {
    width: Dimensions.get("window").width * 0.08,
    height: Dimensions.get("window").width * 0.08,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Dimensions.get("window").width * 0.025,
  },
  logo: {
    width: Dimensions.get("window").width * 0.4,
    height: Dimensions.get("window").width * 0.15,
    resizeMode: "contain",
  },
  plantedInfo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  plantedCount: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#004B39",
    marginRight: 8,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 2.5, height: 2.5 },
    textShadowRadius: 5,
  },
  treeIcon: {
    width: 44,
    height: 44,
    resizeMode: "contain",
    marginLeft: Dimensions.get("window").width * 0.02,
  },
  plantedText: {
    fontSize: 16,
    color: "white",
    alignSelf: "center",
    marginBottom: Dimensions.get("window").width * 0.03,
  },
  bottomView: {
    height: "100%",
    backgroundColor: "#f2f2f2",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  carouselcontainer: {
    marginTop: width * 0.03,
  },
  text: {
    fontSize: 16,
    marginLeft: 15,
  },
  profilecontainer: {
    paddingTop: 10,
    marginLeft: 5,
  },
});

export default HomePage;
