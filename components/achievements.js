import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";

const Achievements = ({ title, description }) => {
  return (
    <Pressable style={styles.container}>
      <Image source={require("../assets/medal.png")} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.learnMoreText}>Learn More</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    margin: 15,
    backgroundColor: "white",
    marginLeft: 25,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    position: "absolute",
    top: -12.5,
    left: -20,
  },
  content: {
    alignItems: "center",
  },
  title: {
    fontSize: 15,
    marginBottom: 8,
    color: "#005F48",
    marginTop: 10,
    width: 150,
    textAlign: "center",
  },
  description: {
    fontSize: 12,
    marginBottom: 8,
    width: 200,
    textAlign: "center",
  },
  learnMoreText: {
    fontSize: 12,
    color: "#00B388",
    marginBottom: 10,
  },
});

export default Achievements;
