import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useFocusEffect } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const MapScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [formattedAddress, setFormattedAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        setLoading(true);

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.error("Permission to access location was denied");
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation.coords);

        let geocode = await Location.reverseGeocodeAsync({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
        setAddress(geocode[0]);
        const formatted = `${geocode[0].name}, ${geocode[0].street}, ${geocode[0].city}, ${geocode[0].region}, ${geocode[0].postalCode}, ${geocode[0].country}`;
        setFormattedAddress(formatted);
        setLoading(false);
      })();
    }, [])
  );

  const handleConfirmAndContinue = () => {
    navigation.navigate("Cart", { liveAddress: formattedAddress });
  };

  return (
    <View style={{ height: "100%" }}>
      <View
        style={{
          height: height * 0.12,
          width: width,
          backgroundColor: "#00b388",
          borderBottomLeftRadius: 35,
          borderBottomRightRadius: 35,
          elevation: 8,
          shadowColor: "black",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.7,
          shadowRadius: 8,
          marginBottom: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "5%",
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 25,
            marginLeft: "15%",
          }}
        >
          Live Location
        </Text>
      </View>
      {loading ? (
        <ActivityIndicator
          size="large"
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        />
      ) : (
        <>
          {location && (
            <MapView
              style={{ height: "100%" }}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
              />
            </MapView>
          )}

          {formattedAddress && (
            <View
              style={{
                position: "absolute",
                bottom: 40,
                left: 20,
                right: 20,
                backgroundColor: "white",
                padding: 10,
                borderRadius: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>Address:</Text>
              <Text style={{ marginBottom: 15 }}>{formattedAddress}</Text>

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
                <Text style={{ fontWeight: "bold", color: "#fff" }}>
                  Confirm & Continue
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default MapScreen;
