import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TextInput,
  StatusBar,
} from "react-native";
import React, { useState, useRef } from "react";
import Icon from "react-native-vector-icons/Feather";
import { TouchableOpacity } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("window");
import Text from "../fonts/Text";
const VerificationPage = ({ navigation }) => {
  const [code, setCode] = useState("");
  const [digit1, setDigit1] = useState("");
  const [digit2, setDigit2] = useState("");
  const [digit3, setDigit3] = useState("");
  const [digit4, setDigit4] = useState("");
  const digit1Ref = useRef(null);
  const digit2Ref = useRef(null);
  const digit3Ref = useRef(null);
  const digit4Ref = useRef(null);

  const handleDigitChange = (index, value) => {
    switch (index) {
      case 1:
        setDigit1(value);
        if (value) {
          digit2Ref.current.focus();
        }
        break;
      case 2:
        setDigit2(value);
        if (value) {
          digit3Ref.current.focus();
        } else {
          digit1Ref.current.focus();
        }
        break;
      case 3:
        setDigit3(value);
        if (value) {
          digit4Ref.current.focus();
        } else {
          digit2Ref.current.focus();
        }
        break;
      case 4:
        setDigit4(value);
        if (!value) {
          digit3Ref.current.focus();
        }
        break;
    }
  };

  const handleVerificationCodeChange = () => {
    const verificationCode = digit1 + digit2 + digit3 + digit4;
    setCode(verificationCode);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={"dark-content"}
      />
      <View
        style={{
          height: height * 0.2,
          width: width,
          backgroundColor: "white",
          justifyContent: "flex-end",
        }}
      ></View>
      <View
        style={{
          height: height * 0.2,
          width: width,
          backgroundColor: "white",
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            height: height * 0.08,
            width: width * 0.62,
            marginBottom: "10%",
          }}
        >
          <Image
            source={require("../assets/Final-LRC-LOGO.png")}
            style={{
              height: height * 0.1,
              width: width * 0.3,
              resizeMode: "contain",
              marginLeft: "11%",
              position: "absolute",
              top: -70,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
          <Image
            source={require("../assets/Mission-O2-Logo-1.png")}
            style={{
              height: height * 0.12,
              width: width * 0.24,
              resizeMode: "contain",
              position: "absolute",
              right: -115,
              top: -55,
            }}
          />
          <Text
            style={{
              fontSize: 30,
              marginLeft: "12%",
              textShadowOffset: { width: 2, height: 2 },
              textShadowColor: "rgba(0, 0, 0, 0.2)",
              textShadowRadius: 5,
            }}
          >
            Verification
          </Text>
          <Image
            style={{ height: height * 0.1, width: width, resizeMode: "cover" }}
            source={require("../assets/grass.png")}
          />
        </View>
      </View>
      <View
        style={{
          height: height * 0.8,
          width: width,
          backgroundColor: "#00b388",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: height * 0.09,
            width: width * 0.85,
            borderBottomWidth: 1,
            borderColor: "white",
            marginBottom: "3%",
            marginTop: 20,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{ color: "#005f48", fontSize: 20, marginBottom: "2%" }}
            >
              Phone Number
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                borderRadius: 15,
                padding: 5,
                elevation: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
              }}
            >
              <Text>get OTP</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Icon
              name="phone"
              size={16}
              color="white"
              style={{
                marginHorizontal: width * 0.03,
                marginTop: height * 0.007,
              }}
            />
            <TextInput
              style={{ color: "white", fontSize: 16 }}
              placeholder="Enter phone no"
              placeholderTextColor="white"
            />
          </View>
          <View>
            <Text
              style={{
                color: "#005f48",
                fontSize: 20,
                marginBottom: "2%",
                marginTop: 30,
              }}
            >
              OTP
            </Text>
            <View style={styles.verificationCodeInputContainer}>
              <TextInput
                maxLength={1}
                style={styles.verificationCodeInput}
                onChangeText={(value) => {
                  handleDigitChange(1, value);
                  handleVerificationCodeChange();
                }}
                value={digit1}
                ref={digit1Ref}
              />
              <TextInput
                maxLength={1}
                style={styles.verificationCodeInput}
                onChangeText={(value) => {
                  handleDigitChange(2, value);
                  handleVerificationCodeChange();
                }}
                value={digit2}
                ref={digit2Ref}
              />
              <TextInput
                maxLength={1}
                style={styles.verificationCodeInput}
                onChangeText={(value) => {
                  handleDigitChange(3, value);
                  handleVerificationCodeChange();
                }}
                value={digit3}
                ref={digit3Ref}
              />
              <TextInput
                maxLength={1}
                style={styles.verificationCodeInput}
                onChangeText={(value) => {
                  handleDigitChange(4, value);
                  handleVerificationCodeChange();
                }}
                value={digit4}
                ref={digit4Ref}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  borderRadius: 15,
                  padding: 5,
                  elevation: 10,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                }}
              >
                <Text>Resend</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("ProfileFirst")}
                style={{
                  backgroundColor: "white",
                  borderRadius: 15,
                  padding: 5,
                  elevation: 10,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                }}
              >
                <Text>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default VerificationPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00b388",
    alignItems: "center",
    justifyContent: "center",
  },
  verificationCodeInputContainer: {
    flexDirection: "row",
  },
  verificationCodeInput: {
    flexDirection: "row",
    marginBottom: 10,
    height: 45,
    width: 45,
    borderRadius: 5,
    borderColor: "#fff",
    borderWidth: 1,
    textAlign: "center",
    marginRight: 15,
    fontSize: 24,
    color: "#fff",
    marginBottom: 50,
    marginTop: 10,
  },
});
