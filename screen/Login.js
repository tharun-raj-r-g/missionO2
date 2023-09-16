import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  Dimensions,
} from "react-native";
import Text from "../fonts/Text";
import TextB from "../fonts/TextBold";
const { width, height } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={"dark-content"}
      />
      <Image
        source={require("../assets/tree.png")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.15,
        }}
      />
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../assets/logomo2.png")}
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
        />
      </View>
      <View style={{ margin: 25 }}>
        <TextB style={{ fontSize: 30, color: "#004B39" }}>Login</TextB>
        <Text style={{ fontSize: 16, color: "#004B39" }}>
          Login to your existing account
        </Text>
      </View>
      <View style={{ width: "100%", alignItems: "center" }}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor={"#004B39"}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor={"#004B39"}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <TextB style={styles.loginText}>LOGIN</TextB>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{ alignItems: "flex-end", marginTop: 20 }}>
        <TextB
          style={{
            color: "#004B39",
            marginRight: 25,
            textDecorationLine: "underline",
          }}
        >
          Forgot Password?
        </TextB>
      </TouchableOpacity>
      <View style={styles.signupContainer}>
        <Text style={{ color: "#004B39" }}>New User? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <TextB style={{ textDecorationLine: "underline", color: "#004B39" }}>
            Signup
          </TextB>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00b388",
    justifyContent: "center",
  },
  inputView: {
    width: width * 0.9,
    backgroundColor: "#fff",
    borderRadius: 25,
    height: height * 0.06,
    marginBottom: height * 0.02,
    justifyContent: "center",
    paddingLeft: width * 0.05,
    borderWidth: 2,
    borderColor: "#004B39",
  },
  inputText: {
    height: height * 0.07,
    color: "#004B39",
    fontFamily: "Montserrat",
  },
  loginBtn: {
    width: width * 0.9,
    backgroundColor: "#005f48",
    borderRadius: 25,
    height: height * 0.06,
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.04,
    marginBottom: height * 0.01,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  loginText: {
    color: "white",
    fontSize: 20,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: height * 0.02,
    marginTop: height * 0.025,
  },
});
export default LoginScreen;
