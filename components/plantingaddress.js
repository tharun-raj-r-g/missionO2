import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
} from "react-native";
import Text from "../fonts/Text";
import TextB from "../fonts/TextBold";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
const CustomDropdown = ({
  liveAddress,
  onChange,
  addressLabel,
  ConfirmAddress,
}) => {
  const navigation = useNavigation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLiveSelected, setLiveSelected] = useState(false);
  const [isManualSelected, setManualSelected] = useState(false);
  const [addressLine1, setAddressLine1] = useState(null);
  const [addressLine2, setAddressLine2] = useState(null);
  const [pinCode, setPinCode] = useState(null);
  const [SelectedDeliveryAddress, setSelectedDeliveryAddress] =
    useState("Select an option");

  const handleAddressChange = (newValue) => {
    onChange(newValue);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (option) => {
    if (option === "Select Live Location") {
      setLiveSelected(true);
      setManualSelected(false);
      navigation.navigate("MapScreen");
    } else if (option === liveAddress) {
      handleAddressChange(option);
      setIsDropdownOpen(false);
    } else {
      handleAddressChange(option);
      setIsDropdownOpen(false);
    }
  };

  const handlaManualPress = () => {
    setManualSelected(!isManualSelected);
    setLiveSelected(false);
  };
  const handleDeliveryAddressSelectByManual = () => {
    setSelectedDeliveryAddress(
      addressLine1 + ", " + addressLine2 + ", " + pinCode
    );
    setIsDropdownOpen(!isDropdownOpen);
    ConfirmAddress(SelectedDeliveryAddress);
  };
  const handleDeliveryAddressSelectByLive = () => {
    setSelectedDeliveryAddress(liveAddress);
    setIsDropdownOpen(!isDropdownOpen);
    ConfirmAddress(SelectedDeliveryAddress);
  };

  return (
    <View>
      <View style={styles.dropdownButton}>
        <View
          style={[styles.dropdownContainer, { backgroundColor: "#00b388" }]}
        >
          <Text style={styles.dropdownButtonText}>{addressLabel}</Text>
        </View>
        <TouchableOpacity
          onPress={toggleDropdown}
          style={[
            styles.dropdownContainer,
            { marginTop: 0, padding: 0, flexDirection: "row" },
          ]}
        >
          <Text
            numberOfLines={1}
            style={[
              styles.dropdownButtonText,
              {
                color: "#000",
                fontSize: 14,
                maxWidth: "70%",
                marginLeft: 5,
              },
            ]}
          >
            {SelectedDeliveryAddress}
          </Text>
          <Icon
            name={isDropdownOpen ? "chevron-up" : "chevron-down"}
            size={32}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <View>
        {isDropdownOpen && (
          <View>
            <View
              style={{
                height: height * 0.09,
                width: width * 0.92,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  height: height * 0.05,
                  width: width * 0.45,
                  flexDirection: "row",
                  backgroundColor: !isLiveSelected ? "#00b388" : "#005f48",
                  borderRadius: 10,
                  justifyContent: "center",
                  elevation: 5,
                  shadowColor: "black",
                  shadowOffset: { width: 0, height: 5 },
                  shadowOpacity: 0.2,
                  shadowRadius: 8,
                }}
                onPress={() => {
                  handleOptionSelect("Select Live Location");
                }}
              >
                <Text
                  style={{ fontSize: 16, color: "white", alignSelf: "center" }}
                >
                  Live Location
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: height * 0.05,
                  width: width * 0.45,
                  flexDirection: "row",
                  backgroundColor: isManualSelected ? "#005f48" : "#00b388",
                  borderRadius: 10,
                  justifyContent: "center",
                  elevation: 5,
                  shadowColor: "black",
                  shadowOffset: { width: 0, height: 5 },
                  shadowOpacity: 0.2,
                  shadowRadius: 8,
                }}
                onPress={handlaManualPress}
              >
                <Text
                  style={{ fontSize: 16, color: "white", alignSelf: "center" }}
                >
                  Enter Manually
                </Text>
              </TouchableOpacity>
            </View>
            {isLiveSelected && liveAddress != null && (
              <View>
                <View
                  style={{
                    backgroundColor: "white",
                    borderRadius: 10,
                    width: width * 0.92,
                    height: height * 0.05,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{ color: "black", alignSelf: "center" }}
                    numberOfLines={1}
                  >
                    {liveAddress}
                  </Text>
                </View>
                {isLiveSelected && (
                  <TouchableOpacity
                    style={{
                      alignSelf: "center",
                      marginTop: "2%",
                      height: height * 0.05,
                      width: width * 0.25,
                      backgroundColor: "#005f48",
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "3%",
                    }}
                    onPress={handleDeliveryAddressSelectByLive}
                  >
                    <TextB
                      style={{
                        fontSize: 16,
                        color: "white",
                      }}
                    >
                      Select
                    </TextB>
                  </TouchableOpacity>
                )}
              </View>
            )}
            {isManualSelected && (
              <View>
                <View
                  style={{
                    backgroundColor: "white",
                    borderRadius: 10,
                    width: width * 0.92,
                    height: height * 0.05,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "2%",
                  }}
                >
                  <TextInput
                    style={{
                      color: "black",
                      fontSize: 16,
                      alignSelf: "flex-start",
                      marginLeft: "4%",
                    }}
                    placeholder="Enter Address Line 1"
                    value={addressLine1}
                    onChangeText={setAddressLine1}
                  />
                </View>
                <View
                  style={{
                    backgroundColor: "white",
                    borderRadius: 10,
                    width: width * 0.92,
                    height: height * 0.05,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "2%",
                  }}
                >
                  <TextInput
                    style={{
                      color: "black",
                      fontSize: 16,
                      alignSelf: "flex-start",
                      marginLeft: "4%",
                    }}
                    placeholder="Enter Address Line 2"
                    value={addressLine2}
                    onChangeText={setAddressLine2}
                  />
                </View>
                <View
                  style={{
                    backgroundColor: "white",
                    borderRadius: 10,
                    width: width * 0.92,
                    height: height * 0.05,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "2%",
                  }}
                >
                  <TextInput
                    style={{
                      color: "black",
                      fontSize: 16,
                      alignSelf: "flex-start",
                      marginLeft: "4%",
                    }}
                    placeholder="Enter Pin Code"
                    value={pinCode}
                    onChangeText={setPinCode}
                  />
                </View>
                {isManualSelected &&
                  addressLine1 &&
                  addressLine2 &&
                  pinCode && (
                    <TouchableOpacity
                      style={{
                        alignSelf: "center",
                        marginTop: "2%",
                        height: height * 0.05,
                        width: width * 0.25,
                        backgroundColor: "#005f48",
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "3%",
                      }}
                      onPress={handleDeliveryAddressSelectByManual}
                    >
                      <TextB
                        style={{
                          fontSize: 16,
                          color: "white",
                        }}
                      >
                        Select
                      </TextB>
                    </TouchableOpacity>
                  )}
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: width * 0.92,
  },
  dropdownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginTop: 5,
    marginLeft: 4,
    marginRight: 4,
    borderRadius: 10,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: "#fff",
  },
  optionsContainer: {
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: width * 0.92,
  },
  optionButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 18,
    color: "#333",
  },
  addressInput: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#eee",
  },
  saveButton: {
    alignSelf: "flex-end",
    marginTop: 5,
    backgroundColor: "#00b388",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 5,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default CustomDropdown;
