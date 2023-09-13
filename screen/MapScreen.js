import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, TouchableOpacity, StatusBar } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import Text from "../fonts/Text";
import TextB from "../fonts/TextBold";

const MapScreen = ({ navigation }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [clickedLocation, setClickedLocation] = useState(null);
  const [centerCoordinate, setCenterCoordinate] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      const { coords } = await Location.getCurrentPositionAsync({});
      setUserLocation(coords);
      setCurrentAddress(await getAddressFromLocation(coords));
      await mapRef.animateToRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  useEffect(() => {
    if (centerCoordinate) {
      getAddressFromLocation(centerCoordinate).then((address) => {
        setCurrentAddress(address);
      });
    }
  }, [centerCoordinate]);

  const getAddressFromLocation = async (location) => {
    const geocode = await Location.reverseGeocodeAsync(location);
    const address = `${geocode[0].name}, ${geocode[0].street}, ${geocode[0].city}, ${geocode[0].region}, ${geocode[0].postalCode}, ${geocode[0].country}`;
    return address;
  };

  const handleMapPress = async (event) => {
    const { coordinate } = event.nativeEvent;
    setClickedLocation(coordinate);
    setCenterCoordinate(coordinate); // Update center coordinate
  };

  const returnToUserLocation = async () => {
    if (userLocation && mapRef) {
      setClickedLocation(userLocation);
      setCenterCoordinate(userLocation); // Update center coordinate
      const address = await getAddressFromLocation(userLocation);
      setCurrentAddress(address);
      mapRef.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };  

  const handleConfirmAndContinue = () => {
    navigation.navigate("Cart");
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={"dark-content"}
      />

      <MapView
        ref={(ref) => setMapRef(ref)}
        style={styles.map}
        initialRegion={
          userLocation && {
            ...userLocation,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }
        }
        onPress={handleMapPress}
        onRegionChangeComplete={(region) => setCenterCoordinate(region)}
      >
        {centerCoordinate && (
          <Marker
            coordinate={centerCoordinate}
            pinColor="#00b388"
          />
        )}
      </MapView>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          backgroundColor: "white",
          position: "absolute",
          top: 50,
          left: 20,
          height: 50,
          width: 50,
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
          elevation: 10,
          borderWidth: 2,
          borderColor: "#00b388",
        }}
      >
        <MaterialIcons name="arrow-back" size={30} color="#00b388" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={returnToUserLocation}
        style={{
          backgroundColor: "white",
          position: "absolute",
          bottom: 220,
          right: 20,
          height: 50,
          width: 50,
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
          elevation: 10,
          borderWidth: 2,
          borderColor: "#00b388",
        }}
      >
        <MaterialIcons name="my-location" size={30} color="#00b388" />
      </TouchableOpacity>

      <View style={styles.addressContainer}>
        <TextB style={{ fontSize: 18 }}>Address:</TextB>
        <Text style={styles.addressText}>
          {currentAddress ? currentAddress : "Searching address..."}
        </Text>
        <TouchableOpacity
          onPress={handleConfirmAndContinue}
          style={{
            backgroundColor: "#00a079",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            borderRadius: 10,
            elevation: 5,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
          }}
        >
          <TextB style={{ color: "#fff" }}>Confirm & Continue</TextB>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  addressContainer: {
    padding: 10,
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    borderRadius: 20,
    backgroundColor: "white",
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  addressText: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
  },
});

export default MapScreen;
