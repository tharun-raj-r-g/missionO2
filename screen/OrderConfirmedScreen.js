import { View, Dimensions, Image } from "react-native";
import React, { useEffect, useState } from "react";
import GifComponent from "../components/GifComponent";
import { TouchableOpacity } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("window");
import { CommonActions } from "@react-navigation/native";
import Text from "../fonts/Text";
import TextB from "../fonts/TextBold";
const OrderConfirmedScreen = ({ navigation }) => {
  const [isImageHidden, setImageHidden] = useState(false);

  useEffect(() => {
    // Hide the image after 5 seconds (adjust the delay as needed)
    const hideImageTimeout = setTimeout(() => {
      setImageHidden(true);
    }, 5000); // 5000 milliseconds = 5 seconds

    // Clean up the timeout to prevent memory leaks
    return () => clearTimeout(hideImageTimeout);
  }, []);
  const goToInitialState = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0, // The index of the screen to reset to (0 for the initial screen)
        routes: [
          { name: "HomeStack" }, // Replace with the actual name of your initial screen
        ],
      })
    );
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!isImageHidden && (
        <Image
          source={require("../assets/Order.gif")}
          style={{ height: height * 0.6, width: width }}
        />
      )}
      {isImageHidden && (
        <View>
          <TextB
            style={{
              fontSize: 30,
              color: "#005f48",

              textAlign: "center",
            }}
          >
            Thank you
          </TextB>
          <TextB style={{ fontSize: 20, marginTop: "5%" }}>
            for being a part of Mission O2!
          </TextB>
          <TouchableOpacity
            style={{
              height: height * 0.07,
              width: width * 0.4,
              alignSelf: "center",
              borderRadius: 15,
              backgroundColor: "#005F48",
              marginTop: "5%",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={goToInitialState}
          >
            <TextB style={{ color: "#00B388", fontSize: 18 }}>Go Home</TextB>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default OrderConfirmedScreen;
