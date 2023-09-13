import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get("window");
const PlantInfo = ({ plant, image}) => {
  return (
    <View style={styles.plantInfoContainer}>
      <Image source={{ uri: `data:image/jpeg;base64,${image}` }} style={styles.image} />
      <Text style={styles.name}>{plant.name}</Text>
      <Text style={styles.description}>{plant.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  plantInfoContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    height:height*0.4,
    width:width*0.8
  },
  image: {
    width: width*0.7,
    height: height*0.25,
    borderRadius: 75,
    marginBottom: 10,
    borderRadius:30,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign:"center"
  },
  description: {
    textAlign: 'center',
  },
});

export default PlantInfo;