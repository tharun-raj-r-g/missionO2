import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Text from "../fonts/Text";
import TextB from "../fonts/TextBold";
const ProfileComponent = ({ profileData }) => {
  const { name, place, description, imageSource } = profileData;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <TextB style={styles.name}>{name}</TextB>
        <Text style={styles.place}>{place}</Text>
        <Text style={styles.description}>{description} trees planted</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    margin: 25,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    overflow: "visible",
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    top: -25,
    position: "absolute",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    alignItems: "center",
    paddingTop: 25,
    paddingBottom: 10,
  },
  name: {
    fontSize: 15,
  },
  place: {
    fontSize: 15,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 10,
  },
});

export default ProfileComponent;
