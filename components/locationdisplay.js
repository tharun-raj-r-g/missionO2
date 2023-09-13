import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Alert,
  TouchableOpacity,
  Text
} from "react-native";
import * as Location from "expo-location";

const Welcome = ({ ...props }) => {
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "Wait, we are fetching your location..."
  );

  useEffect(() => {
    CheckIfLocationEnabled();
    GetCurrentLocation();
  }, []);

  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        "Location Service not enabled",
        "Please enable your location services to continue",
        [{ text: "OK" }],
        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
  };

  const GetCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission not granted",
        "Allow the app to use location service.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }

    let { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      for (let item of response) {
        let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;

        setDisplayCurrentAddress(address);
      }
    }
  };

  return (
    <View
      style={[
        { flexDirection: "column" },
        {
          position: "absolute",
          bottom: 50,
          backgroundColor: "white",
          borderRadius: 15,
          left: 20,
          right: 20,
          padding: 20,
        },
      ]}
    >
      <View>
        <Text style={[{ color: "#000", fontSize: 15, fontWeight: "500" }]}>
          Locality
        </Text>
      </View>
      <View>
        <Text style={[{ color: "#000", fontSize: 12, fontWeight: "400" }]}>
          {displayCurrentAddress}
        </Text>
      </View>
      <TouchableOpacity
        style={[
          {
            backgroundColor: "#00b388",
            borderRadius: 15,
            paddingVertical: 20,
            marginTop: 10,
            alignItems: "center",
          },
        ]}
        onPress={props.onPress}
      >
        <View>
          <Text style={[{ color: "white" }]}>Confirm & Continue</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;
