import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions
} from "react-native";
import Text from "../fonts/Text";
import TextB from "../fonts/TextBold";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
const DeliveryAddressComp = ({ liveAddress,selectedValue,onChange }) => {
  const navigation = useNavigation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [addressInput, setAddressInput] = useState("");
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [isLiveSelected, setLiveSelected] = useState(1);
  const options = ["Select Live Location", liveAddress, ...savedAddresses];

  const handleAddressChange=(newValue)=>{
    onChange(newValue);
  }
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (option) => {
    if (option === "Select Live Location") {
      setLiveSelected(-1);
      navigation.navigate("MapScreen");
    } else if (option === liveAddress) {
      handleAddressChange(option);
      setIsDropdownOpen(false);
    } else {
      handleAddressChange(option);
      setIsDropdownOpen(false);
    }
  };

  const handleAddressSave = () => {
    if (addressInput.trim() !== "") {
      setSavedAddresses([...savedAddresses, addressInput]);
      setAddressInput("");
    }
  };

  return (
    <View>
      <View style={styles.dropdownButton}>
        <View
          style={[styles.dropdownContainer, { backgroundColor: "#00b388" }]}
        >
          <Text style={styles.dropdownButtonText}>Planting Address</Text>
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
            {selectedValue === "select" ? "Select an option" : selectedValue}
          </Text>
          <Icon
            name={isDropdownOpen ? "chevron-up" : "chevron-down"}
            size={32}
            color="black"
          />
        </TouchableOpacity>
      </View>

      {isDropdownOpen && (
        <View style={styles.optionsContainer}>
          {options.map((option, index) => {
            if (index != isLiveSelected) {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleOptionSelect(option)}
                  style={[
                    styles.optionButton,
                    {
                      backgroundColor:
                        option === liveAddress ? "#fff" : "#00b388",
                      borderRadius:10,
                      marginBottom:"5%"
                    },
                  ]}
                >
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.optionText,
                      {
                        color: option === liveAddress ? "#000" : "#fff",
                        fontSize: option === liveAddress ? 14 : 16,
                        maxWidth: option === liveAddress ? "70%" : "100%",
                      },
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            }
          })}
          <TextInput
            placeholder="Enter an address"
            value={addressInput}
            onChangeText={setAddressInput}
            style={styles.addressInput}
          />
          <TouchableOpacity
            onPress={handleAddressSave}
            style={styles.saveButton}
          >
            <TextB style={styles.saveButtonText}>Save Address</TextB>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    marginBottom: 20,
  },
  dropdownButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: width*0.92,
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
    width: width*0.92,
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
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
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
  saveButtonText: {
    color: "#fff",
  },
});

export default DeliveryAddressComp;
