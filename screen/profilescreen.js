import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TextInput,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Text from "../fonts/Text";
import TextB from "../fonts/TextBold";
import React, { useState } from "react";
const { width, height } = Dimensions.get("window");
const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Rahul V");
  const [email, setEmail] = useState("rahulv@gmail.com");
  const [address, setAddress] = useState(
    "Plot No.14, Door No.3/2208, Padmavathy Street"
  );
  const [city, setCity] = useState("Chennai");
  const [state, setState] = useState("Tamil Nadu");
  const [dob, setDOB] = useState("22-06-2004");

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdateProfile = () => {
    setIsEditing(false);
  };

  const govtproof =
    "https://aadhaarcard.co.in/wp-content/uploads/2023/04/aadhaar-card.webp";
  const [proofOpen, setProofOpen] = useState(false);
  const calculateFontSize = (baseFontSize) => {
    const { width } = Dimensions.get("window");
    const scaleFactor = 0.05;
    return baseFontSize + width * scaleFactor;
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
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "#005f48", fontSize: 20 }}>Name</Text>
            {isEditing ? (
              <TextInput
                style={{
                  color: "white",
                  fontSize: 16,
                  fontFamily: "Montserrat",
                }}
                value={name}
                onChangeText={setName}
              />
            ) : (
              <Text style={{ color: "white", fontSize: 16 }}>{name}</Text>
            )}
          </View>
          <View
            style={{
              height: height * 0.08,
              width: width * 0.85,
              borderBottomWidth: 1,
              borderColor: "white",
              marginBottom: "3%",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "#005f48", fontSize: 20 }}>Email</Text>
            {isEditing ? (
              <TextInput
                style={{
                  color: "white",
                  fontSize: 16,
                  fontFamily: "Montserrat",
                }}
                value={email}
                onChangeText={setEmail}
              />
            ) : (
              <Text style={{ color: "white", fontSize: 16 }}>{email}</Text>
            )}
          </View>
          <View
            style={{
              height: height * 0.08,
              width: width * 0.85,
              borderBottomWidth: 1,
              borderColor: "white",
              justifyContent: "space-between",
              marginBottom: "3%",
            }}
          >
            <Text style={{ color: "#005f48", fontSize: 20 }}>
              Permanent Address
            </Text>
            {isEditing ? (
              <TextInput
                style={{
                  color: "white",
                  fontSize: 16,
                  fontFamily: "Montserrat",
                }}
                value={address}
                onChangeText={setAddress}
              />
            ) : (
              <Text style={{ color: "white", fontSize: 16 }} numberOfLines={1}>
                {address}
              </Text>
            )}
          </View>
          <View
            style={{
              height: height * 0.05,
              width: width * 0.85,
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "3%",
            }}
          >
            <View
              style={{
                height: height * 0.05,
                width: width * 0.4,
                borderBottomWidth: 1,
                borderColor: "white",
                justifyContent: "flex-end",
              }}
            >
              {isEditing ? (
                <TextInput
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontFamily: "Montserrat",
                  }}
                  value={city}
                  onChangeText={setCity}
                />
              ) : (
                <Text style={{ color: "white", fontSize: 16 }}>{city}</Text>
              )}
            </View>
            <View
              style={{
                height: height * 0.05,
                width: width * 0.4,
                borderBottomWidth: 1,
                borderColor: "white",
                justifyContent: "flex-end",
              }}
            >
              {isEditing ? (
                <TextInput
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontFamily: "Montserrat",
                  }}
                  value={state}
                  onChangeText={setState}
                />
              ) : (
                <Text style={{ color: "white", fontSize: 16 }}>{state}</Text>
              )}
            </View>
          </View>
          <View
            style={{
              height: height * 0.08,
              width: width * 0.85,
              borderBottomWidth: 1,
              borderColor: "white",
              justifyContent: "space-between",
              marginBottom: "3%",
            }}
          >
            <Text style={{ color: "#005f48", fontSize: 20 }}>D.O.B</Text>
            {isEditing ? (
              <TextInput
                style={{
                  color: "white",
                  fontSize: 16,
                  fontFamily: "Montserrat",
                }}
                value={dob}
                onChangeText={setDOB}
              />
            ) : (
              <Text style={{ color: "white", fontSize: 16 }}>{dob}</Text>
            )}
          </View>
          <TouchableOpacity
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
              marginTop: proofOpen ? "0%" : "8%",
            }}
            onPress={isEditing ? handleUpdateProfile : handleEditProfile}
          >
            <TextB style={{ color: "white", fontSize: 18 }}>
              {isEditing ? "Update Profile" : "Edit Profile"}
            </TextB>
          </TouchableOpacity>
          <View style={{ height: height * 0.2 }}></View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00b388",
    alignItems: "center",
    justifyContent: "center",
  },
});
