import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";

const { width, height } = Dimensions.get("window");

const ProfileFirst = ({ navigation }) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [address, setAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [dob, setDOB] = useState(null);
  const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);
  const [selectedImageURI, setSelectedImageURI] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);

  const checkAllFieldsFilled = () => {
    if (name && email && address && city && state && dob) {
      setIsAllFieldsFilled(true);
    } else {
      setIsAllFieldsFilled(false);
    }
  };

  const handleAttachPhoto = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled) {
        const selectedAsset = result.assets[0];
        setSelectedImageURI(selectedAsset.uri);
        setIsImageSelected(true);
      }
    } catch (error) {
      console.error("Error picking an image: ", error);
    }
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
          <Text
            style={{
              fontSize: 30,
              marginLeft: "12%",
              textShadowOffset: { width: 2, height: 2 },
              textShadowColor: "rgba(0, 0, 0, 0.2)",
              textShadowRadius: 5,
            }}
          >
            Profile
          </Text>
          <Image
            style={{ height: height * 0.1, width: width, resizeMode: "cover" }}
            source={require("../assets/grass.png")}
          />
        </View>
        <View
          style={{
            height: height * 0.17,
            width: width * 0.35,
            backgroundColor: "#00b388",
            borderRadius: 70,
            alignItems: "center",
          }}
        >
          <Image
            style={{
              height: height * 0.14,
              width: width * 0.3,
              borderRadius: 70,
              marginTop: "2%",
            }}
            source={require("../assets/boy1.png")}
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
        <ScrollView showsVerticalScrollIndicator={false} style={{}}>
          <View
            style={{
              height: height * 0.08,
              width: width * 0.85,
              borderBottomWidth: 1,
              borderColor: "white",
              marginBottom: "3%",
            }}
          >
            <Text
              style={{ color: "#005f48", fontSize: 20, marginBottom: "2%" }}
            >
              Name
            </Text>
            <TextInput
              placeholder="Enter Name"
              placeholderTextColor={"#fff"}
              style={{ color: "white", fontSize: 16 }}
              value={name}
              onChangeText={(text) => {
                setName(text);
                checkAllFieldsFilled();
              }}
            />
          </View>
          <View
            style={{
              height: height * 0.08,
              width: width * 0.85,
              borderBottomWidth: 1,
              borderColor: "white",
              marginBottom: "3%",
            }}
          >
            <Text
              style={{ color: "#005f48", fontSize: 20, marginBottom: "2%" }}
            >
              Email
            </Text>
            <TextInput
              placeholder="Enter Email"
              placeholderTextColor={"#fff"}
              style={{ color: "white", fontSize: 16 }}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                checkAllFieldsFilled();
              }}
            />
          </View>
          <View
            style={{
              height: height * 0.08,
              width: width * 0.85,
              borderBottomWidth: 1,
              borderColor: "white",
            }}
          >
            <Text
              style={{ color: "#005f48", fontSize: 20, marginBottom: "2%" }}
            >
              Permanent Address
            </Text>
            <TextInput
              placeholder="Enter Address"
              placeholderTextColor={"#fff"}
              style={{ color: "white", fontSize: 16 }}
              value={address}
              onChangeText={(text) => {
                setAddress(text);
                checkAllFieldsFilled();
              }}
            />
          </View>
          <View
            style={{
              height: height * 0.08,
              width: width * 0.85,
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "2%",
            }}
          >
            <View
              style={{
                height: height * 0.08,
                width: width * 0.4,
                borderBottomWidth: 1,
                borderColor: "white",
                marginBottom: "3%",
                justifyContent: "flex-end",
              }}
            >
              <TextInput
                placeholder="Enter City"
                placeholderTextColor={"#fff"}
                style={{ color: "white", fontSize: 16 }}
                value={city}
                onChangeText={(text) => {
                  setCity(text);
                  checkAllFieldsFilled();
                }}
              />
            </View>
            <View
              style={{
                height: height * 0.08,
                width: width * 0.4,
                borderBottomWidth: 1,
                borderColor: "white",
                marginBottom: "3%",
                justifyContent: "flex-end",
              }}
            >
              <TextInput
                placeholder="Enter State"
                placeholderTextColor={"#fff"}
                style={{ color: "white", fontSize: 16 }}
                value={state}
                onChangeText={(text) => {
                  setState(text);
                  checkAllFieldsFilled();
                }}
              />
            </View>
          </View>
          <View
            style={{
              height: height * 0.08,
              width: width * 0.85,
              borderBottomWidth: 1,
              borderColor: "white",
              marginBottom: "3%",
            }}
          >
            <Text
              style={{ color: "#005f48", fontSize: 20, marginBottom: "2%" }}
            >
              D.O.B
            </Text>
            <TextInput
              placeholder="Enter DOB"
              placeholderTextColor={"#fff"}
              style={{ color: "white", fontSize: 16 }}
              value={dob}
              onChangeText={(text) => {
                setDOB(text);
                checkAllFieldsFilled();
              }}
            />
          </View>
          <View
            style={{
              height: height * 0.08,
              width: width * 0.85,
              borderBottomWidth: 1,
              borderColor: "white",
              marginBottom: "3%",
            }}
          >
            <Text
              style={{ color: "#005f48", fontSize: 20, marginBottom: "2%" }}
            >
              Govt Id
            </Text>
            <TouchableOpacity
              style={{
                height: height * 0.05,
                width: width * 0.85,
                borderWidth: 1,
                borderRadius: 20,
                borderColor: "white",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#00b388",
                elevation: 4,
                shadowColor: "black",
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.5,
                shadowRadius: 10,
                marginBottom: "2%",
              }}
              onPress={handleAttachPhoto}
            >
              <Icon
                name="paperclip"
                size={16}
                color="white"
                style={{ marginHorizontal: width * 0.03 }}
              />
              <Text style={{ color: "white", fontSize: 16 }}>Govt proof</Text>
            </TouchableOpacity>
          </View>

          {isImageSelected && (
            <View
              style={{
                height: height * 0.25,
                width: width * 0.8,
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
                marginTop: height * 0.05,
              }}
            >
              <Image
                source={{ uri: selectedImageURI }}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  resizeMode: "contain",
                }}
              />
              <Image
                source={{ uri: selectedImageURI }}
                style={{ width: "100%", height: "100%", resizeMode: "cover" }}
              />
              <TouchableOpacity
                onPress={() => {
                  setSelectedImageURI(null);
                  setIsImageSelected(false);
                }}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  borderRadius: 20,
                  padding: 5,
                }}
              >
                <Icon name="trash-2" size={24} color="white" />
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            onPress={() => navigation.navigate("Navi")}
            style={{
              height: height * 0.07,
              width: width * 0.6,
              borderRadius: 30,
              backgroundColor: "#005f48",
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              elevation: 4,
              shadowColor: "black",
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.5,
              shadowRadius: 10,
              marginTop: "8%",
            }}
            disabled={!isAllFieldsFilled}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
              Confirm Profile
            </Text>
          </TouchableOpacity>

          <View style={{ height: height * 0.2 }}></View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ProfileFirst;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00b388",
    alignItems: "center",
    justifyContent: "center",
  },
});
