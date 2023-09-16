import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  Modal,
  Dimensions,
  ScrollView,
} from "react-native";
import Text from "../fonts/Text";
import TextB from "../fonts/TextBold";
import DatePicker from "react-native-modern-datepicker";
import axiosInstance from "../api/api";
import Icon from "react-native-vector-icons/Feather";
const { width, height } = Dimensions.get("window");

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const currentDate = new Date();
  const formattedStartDate = currentDate
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "-");
  const [selectedStartDate, setSelectedStartDate] = useState("YYYY/MM/DD");
  const [startedDate, setStartedDate] = useState("01/01/2015");
  const [District, setDistrict] = useState("Enter District");
  const [state, setState] = useState("Enter State");
  const [Taluk, setTaluk] = useState("Enter Taluk");

  const handleLogin = () => {
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Address Line 1:", addressLine1);
    console.log("Address Line 2:", addressLine2);
    console.log("Pincode:", pinCode);
  };

  function handleChangeStartDate(propDate) {
    setStartedDate(propDate);
  }

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };

  const [statelist, setstatelist] = useState([]);

  const [DeliveryDistrictList, setDeliveryDistrictList] = useState([]);

  const [DeliveryTalukList, setDeliveryTalukList] = useState([]);

  const [isDeliveryStateDropdownPress, setDeliveryStateDropdownOpen] =
    useState(false);

  const [isDeliveryDistrictDropdownOpen, setDeliveryDistrictDropdownOpen] =
    useState(false);

  const [isDeliveryTalukDropdownPress, setDeliveryTalukDropdownOpen] =
    useState(false);

  useEffect(() => {
    getState();
  }, []);
  useEffect(() => {
    getDeliveryDistrict();
  }, [state]);

  useEffect(() => {
    getDeliveryTaluk();
  }, [state, District]);

  const getState = () => {
    axiosInstance
      .get(`/address/view-places`)
      .then((response) => {
        setstatelist(response.data.elements);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getDeliveryDistrict = () => {
    axiosInstance
      .get(`/address/view-places`, {
        params: {
          state: state,
        },
      })
      .then((response) => {
        setDeliveryDistrictList(response.data.elements);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDeliveryTaluk = () => {
    axiosInstance
      .get(`/address/view-places`, {
        params: {
          state: state,
          district: District,
        },
      })
      .then((response) => {
        setDeliveryTalukList(response.data.elements);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeliveryStateDropdownPress = () => {
    setDeliveryStateDropdownOpen(!isDeliveryStateDropdownPress);
  };

  const handleDeliveryDistrictDropdownPress = () => {
    setDeliveryDistrictDropdownOpen(!isDeliveryDistrictDropdownOpen);
  };

  const handleDeliveryTalukDropdownPress = () => {
    setDeliveryTalukDropdownOpen(!isDeliveryTalukDropdownPress);
  };

  const handleDeliveryStateSelect = (name) => {
    setState(name);
    setDistrict("Select");
    setTaluk("Select");
    setDeliveryDistrictList([]);
    setDeliveryTalukList([]);
    setDeliveryStateDropdownOpen(false);
  };

  const handleDeliveryDistrictSelect = (name) => {
    setDistrict(name);
    setTaluk("Select");
    setDeliveryTalukList([]);
    setDeliveryDistrictDropdownOpen(false);
  };

  const handleDeliverytalukSelect = (name) => {
    setTaluk(name);
    setDeliveryTalukDropdownOpen(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={"dark-content"}
      />
      <Image
        source={require("../assets/tree.png")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.15,
        }}
      />

      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../assets/logomo2.png")}
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
            marginTop: 105,
          }}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ margin: 25 }}>
          <TextB style={{ fontSize: 30, color: "#004B39" }}>Signup</TextB>
          <Text style={{ fontSize: 16, color: "#004B39" }}>
            Signup to create a new account
          </Text>
        </View>
        <View style={{ width: "100%", alignItems: "center" }}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Name"
              placeholderTextColor={"#004B39"}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <TouchableOpacity
            onPress={handleOnPressStartDate}
            style={styles.inputView}
          >
            <Text
              style={{
                color: "#004B39",
              }}
            >
              {selectedStartDate}
            </Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={openStartDatePicker}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <DatePicker
                  mode="calendar"
                  minimumDate={formattedStartDate}
                  selected={startedDate}
                  onDateChanged={handleChangeStartDate}
                  onSelectedChange={(date) => setSelectedStartDate(date)}
                  options={{
                    backgroundColor: "#00b388",
                    textHeaderColor: "#004B39",
                    textDefaultColor: "#FFFFFF",
                    selectedTextColor: "#FFF",
                    mainColor: "#004B39",
                    textSecondaryColor: "#FFFFFF",
                  }}
                />
                <TouchableOpacity onPress={handleOnPressStartDate}>
                  <Text style={{ color: "white" }}>Select</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Email"
              placeholderTextColor={"#004B39"}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Password"
              placeholderTextColor={"#004B39"}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <TextB
            style={{
              alignSelf: "flex-start",
              marginLeft: 25,
              fontSize: 18,
              marginBottom: 20,
              color: "#004B39",
            }}
          >
            Address Details:
          </TextB>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Address Line 1"
              placeholderTextColor={"#004B39"}
              secureTextEntry={true}
              onChangeText={(text) => setAddressLine1(text)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Address Line 2"
              placeholderTextColor={"#004B39"}
              secureTextEntry={true}
              onChangeText={(text) => setAddressLine2(text)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Pincode"
              placeholderTextColor={"#004B39"}
              secureTextEntry={true}
              onChangeText={(text) => setPinCode(text)}
            />
          </View>

          <View>
            <View
              style={{
                height: height * 0.05,
                width: width * 0.85,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TextB style={{ fontSize: 16, color: "#004B39" }}>
                {" "}
                Select State :
              </TextB>
              <TouchableOpacity
                style={{
                  height: height * 0.05,
                  width: width * 0.4,
                  borderWidth: 2,
                  borderColor: "#004B39",
                  borderRadius: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "white",
                }}
                onPress={handleDeliveryStateDropdownPress}
              >
                <Text
                  numberOfLines={1}
                  ellipsizeMode={"tail"}
                  style={{
                    marginLeft: "10%",
                    color: "#004B39",
                    fontSize: 16,
                    width: width * 0.26,
                  }}
                >
                  {state}
                </Text>
                {(isDeliveryStateDropdownPress && (
                  <Icon
                    name="chevron-up"
                    size={30}
                    color="#004B39"
                    style={{ marginRight: "3%" }}
                  />
                )) || (
                  <Icon
                    name="chevron-down"
                    size={30}
                    color="#004B39"
                    style={{ marginRight: "3%" }}
                  />
                )}
              </TouchableOpacity>
            </View>
            {isDeliveryStateDropdownPress && (
              <View style={{}}>
                <ScrollView
                  nestedScrollEnabled={true}
                  showsVerticalScrollIndicator={true}
                  style={{
                    maxHeight: height * 0.25,
                    backgroundColor: "white",
                    borderWidth: 0.2,
                    borderColor: "grey",
                    borderRadius: 5,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    width: width * 0.4,
                    alignSelf: "flex-end",
                  }}
                >
                  {statelist.map((name) => (
                    <TouchableOpacity
                      key={name}
                      style={{
                        backgroundColor: "white",
                        borderWidth: 0.2,
                        borderLeftWidth: 0,
                        borderRightWidth: 0,
                        padding: "3%",
                        width: width * 0.4,
                        borderColor: "grey",
                      }}
                      onPress={() => handleDeliveryStateSelect(name)}
                    >
                      <Text style={{ textAlign: "left", fontSize: 14 }}>
                        {name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
            <View
              style={{
                height: height * 0.05,
                width: width * 0.85,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "5%",
              }}
            >
              <TextB style={{ fontSize: 16, color: "#004B39" }}>
                {" "}
                Select District :
              </TextB>
              {(state != "Select" && (
                <TouchableOpacity
                  style={{
                    height: height * 0.05,
                    width: width * 0.4,
                    borderWidth: 2,
                    borderColor: "#004B39",
                    borderRadius: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "white",
                  }}
                  onPress={handleDeliveryDistrictDropdownPress}
                >
                  <Text
                    numberOfLines={1}
                    ellipsizeMode={"tail"}
                    style={{
                      marginLeft: "10%",
                      color: "#004B39",
                      fontSize: 16,
                      width: width * 0.26,
                    }}
                  >
                    {District}
                  </Text>

                  {(isDeliveryDistrictDropdownOpen && (
                    <Icon
                      name="chevron-up"
                      size={30}
                      color="#004B39"
                      style={{ marginRight: "3%" }}
                    />
                  )) || (
                    <Icon
                      name="chevron-down"
                      size={30}
                      color="#004B39"
                      style={{ marginRight: "3%" }}
                    />
                  )}
                </TouchableOpacity>
              )) || (
                <View
                  style={{
                    height: height * 0.05,
                    width: width * 0.4,
                    backgroundColor: "#005f48",
                    borderRadius: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    numberOfLines={1}
                    ellipsizeMode={"tail"}
                    style={{
                      marginLeft: "10%",
                      color: "grey",
                      fontSize: 16,
                      width: width * 0.26,
                    }}
                  >
                    {District}
                  </Text>
                  <Icon
                    name="chevron-down"
                    size={30}
                    color="grey"
                    style={{ marginRight: "3%" }}
                  />
                </View>
              )}
            </View>
            {isDeliveryDistrictDropdownOpen && (
              <View style={{}}>
                <ScrollView
                  nestedScrollEnabled={true}
                  showsVerticalScrollIndicator={true}
                  style={{
                    maxHeight: height * 0.25,
                    backgroundColor: "white",
                    borderWidth: 0.2,
                    borderColor: "grey",
                    borderRadius: 5,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    width: width * 0.4,
                    alignSelf: "flex-end",
                  }}
                >
                  {DeliveryDistrictList.map((name) => (
                    <TouchableOpacity
                      key={name}
                      style={{
                        backgroundColor: "white",
                        borderWidth: 0.2,
                        borderLeftWidth: 0,
                        borderRightWidth: 0,
                        padding: "3%",
                        width: width * 0.4,
                        borderColor: "grey",
                      }}
                      onPress={() => handleDeliveryDistrictSelect(name)}
                    >
                      <Text style={{ textAlign: "left", fontSize: 14 }}>
                        {name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
            <View
              style={{
                height: height * 0.05,
                width: width * 0.85,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "5%",
              }}
            >
              <TextB style={{ fontSize: 16, color: "#004B39" }}>
                {" "}
                Select Taluk :
              </TextB>
              {(state != "Select" && District != "Select" && (
                <TouchableOpacity
                  style={{
                    height: height * 0.05,
                    width: width * 0.4,
                    borderWidth: 2,
                    borderColor: "#004B39",
                    borderRadius: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "white",
                  }}
                  onPress={handleDeliveryTalukDropdownPress}
                >
                  <Text
                    numberOfLines={1}
                    ellipsizeMode={"tail"}
                    style={{
                      marginLeft: "10%",
                      color: "#004B39",
                      fontSize: 16,
                      width: width * 0.26,
                    }}
                  >
                    {Taluk}
                  </Text>

                  {(isDeliveryTalukDropdownPress && (
                    <Icon
                      name="chevron-up"
                      size={30}
                      color="#004B39"
                      style={{ marginRight: "3%" }}
                    />
                  )) || (
                    <Icon
                      name="chevron-down"
                      size={30}
                      color="#004B39"
                      style={{ marginRight: "3%" }}
                    />
                  )}
                </TouchableOpacity>
              )) || (
                <View
                  style={{
                    height: height * 0.05,
                    width: width * 0.4,
                    backgroundColor: "#005f48",
                    borderRadius: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    numberOfLines={1}
                    ellipsizeMode={"tail"}
                    style={{
                      marginLeft: "10%",
                      color: "grey",
                      fontSize: 16,
                      width: width * 0.26,
                    }}
                  >
                    {Taluk}
                  </Text>
                  <Icon
                    name="chevron-down"
                    size={30}
                    color="grey"
                    style={{ marginRight: "3%" }}
                  />
                </View>
              )}
            </View>
            {isDeliveryTalukDropdownPress ? (
              <View style={{}}>
                <ScrollView
                  nestedScrollEnabled={true}
                  showsVerticalScrollIndicator={true}
                  style={{
                    maxHeight: height * 0.25,
                    backgroundColor: "white",
                    borderWidth: 0.2,
                    borderColor: "grey",
                    borderRadius: 5,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    width: width * 0.4,
                    alignSelf: "flex-end",
                  }}
                >
                  {DeliveryTalukList.map((name) => (
                    <TouchableOpacity
                      key={name}
                      style={{
                        backgroundColor: "white",
                        borderWidth: 0.2,
                        borderLeftWidth: 0,
                        borderRightWidth: 0,
                        padding: "3%",
                        width: width * 0.4,
                        borderColor: "grey",
                      }}
                      onPress={() => handleDeliverytalukSelect(name)}
                    >
                      <Text style={{ textAlign: "left", fontSize: 14 }}>
                        {name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            ) : null}
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <TextB style={styles.loginText}>SIGNUP</TextB>
          </TouchableOpacity>
        </View>
        <View style={styles.signupContainer}>
          <Text style={{ color: "#004B39" }}>Already a User? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <TextB
              style={{ textDecorationLine: "underline", color: "#004B39" }}
            >
              Login
            </TextB>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00b388",
    justifyContent: "center",
  },
  inputView: {
    width: width * 0.9,
    backgroundColor: "#fff",
    borderRadius: 25,
    height: height * 0.06,
    marginBottom: height * 0.02,
    justifyContent: "center",
    paddingLeft: width * 0.05,
    borderWidth: 2,
    borderColor: "#004B39",
  },
  inputText: {
    height: height * 0.07,
    color: "#004B39",
    fontFamily: "Montserrat",
  },
  loginBtn: {
    width: width * 0.9,
    backgroundColor: "#005f48",
    borderRadius: 25,
    height: height * 0.06,
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.03,
    marginBottom: height * 0.01,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  loginText: {
    color: "white",
    fontSize: 20,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: height * 0.02,
    marginTop: height * 0.025,
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
  },
  modalView: {
    margin: width * 0.05,
    backgroundColor: "#00b388",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    width: width * 0.9,
    height: width / height + 440,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default SignupScreen;
