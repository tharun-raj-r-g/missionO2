import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TextInput,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import Text from "../fonts/Text";
import TextB from "../fonts/TextBold";
import React, { useState } from "react";
import { useEffect } from "react";
import axiosInstance from "../api/api";
import Icon from "react-native-vector-icons/Feather";
import DatePicker from "react-native-modern-datepicker";
import * as ImagePicker from "expo-image-picker";
const { width, height } = Dimensions.get("window");
const defaultProfileImage = require("../assets/profile.webp");
const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Enter your name");
  const [email, setEmail] = useState("Enter your Email");
  const [addressLine1, setAddressLine1] = useState("Enter AddressLine1");
  const [addressLine2, setAddressLine2] = useState("Enter AddressLine2");
  const [pinCode, setPinCode] = useState("Enter Pin Code");
  const [District, setDistrict] = useState("Enter District");
  const [state, setState] = useState("Enter State");
  const [Taluk, setTaluk] = useState("Enter Taluk");
  const [dob, setDOB] = useState("YYYY/MM/DD");
  const [isProfileData, setProfileData] = useState([]);
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const currentDate = new Date();
  const formattedStartDate = currentDate
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "-");
  const [startedDate, setStartedDate] = useState("01/01/2015");

  const [statelist, setstatelist] = useState([]);

  const [DeliveryDistrictList, setDeliveryDistrictList] = useState([]);

  const [DeliveryTalukList, setDeliveryTalukList] = useState([]);

  const [isDeliveryStateDropdownPress, setDeliveryStateDropdownOpen] =
    useState(false);

  const [isDeliveryDistrictDropdownOpen, setDeliveryDistrictDropdownOpen] =
    useState(false);

  const [isDeliveryTalukDropdownPress, setDeliveryTalukDropdownOpen] =
    useState(false);

  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const [modalVisible, setModalVisible] = useState(false);

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

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    axiosInstance
      .get(`/user/view-profile`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlMThhZDY4Zi0wODgzLTRhMWUtYTk2OC05YjhjY2UwMzZjMWQiLCJpYXQiOjE2OTQ2NjY0MTAsImV4cCI6MTY5NzI1ODQxMH0.2cAX_tSAb-hUalbhi-do0GX9r5gCGK3vFQDEANtM5LFLLdpojuYFZSVKzo_Mx3L5ttEqweGlua_MFcprr0o5Zg",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setProfileData(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setDOB(response.data.dob.slice(0, 10));
        setAddressLine1(response.data.address.addressLine1);
        setAddressLine2(response.data.address.addressLine2);
        setPinCode(response.data.address.pinCode);
        setDistrict(response.data.address.district);
        setState(response.data.address.state);
        setTaluk(response.data.address.taluk);
        console.log(response.data.name);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log("hjjji");
      });
  };

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdateProfile = () => {
    setIsEditing(false);
    handleUpload();
  };

  function handleChangeStartDate(propDate) {
    setStartedDate(propDate);
  }

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };

  const handleUpload = async () => {
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("dob", dob);
    data.append("address.addressLine1", addressLine1);
    data.append("address.addressLine2", addressLine2);
    data.append("address.pinCode", pinCode);
    data.append("address.taluk", Taluk);
    data.append("address.district", District);
    data.append("address.state", state);
    data.append("address.country", "India");

    axiosInstance
      .put("/user/update-profile", data, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlMThhZDY4Zi0wODgzLTRhMWUtYTk2OC05YjhjY2UwMzZjMWQiLCJpYXQiOjE2OTQ2NjY0MTAsImV4cCI6MTY5NzI1ODQxMH0.2cAX_tSAb-hUalbhi-do0GX9r5gCGK3vFQDEANtM5LFLLdpojuYFZSVKzo_Mx3L5ttEqweGlua_MFcprr0o5Zg",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage({ uri: result.assets[0].uri });
      setModalVisible(false);
    }
  };

  const removeImage = () => {
    setProfileImage(defaultProfileImage);
    setModalVisible(false);
  };

  const toggleModal = () => {
    if (profileImage.uri !== defaultProfileImage.uri) {
      setModalVisible(!modalVisible);
    } else {
      pickImage();
    }
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
          {isEditing ? (
            <View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <TextB style={styles.modalTitle}>Select an option</TextB>
                    <TouchableOpacity
                      style={styles.modalOption}
                      onPress={pickImage}
                    >
                      <Text style={styles.modalOptionText}>Change Image</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.modalOption}
                      onPress={removeImage}
                    >
                      <Text style={styles.modalOptionText}>Remove Image</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.modalOption}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={styles.modalOptionText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>

              <View style={{ alignItems: "center" }}>
                <TouchableOpacity onPress={toggleModal}>
                  <Image
                    style={{
                      height: height * 0.14,
                      width: width * 0.3,
                      borderRadius: 70,
                      marginTop: "2%",
                      opacity: 0.5,
                    }}
                    source={profileImage}
                  />
                  <Icon
                    name="edit"
                    size={30}
                    color="white"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: [{ translateX: -15 }, { translateY: -15 }],
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <Image
              style={{
                height: height * 0.14,
                width: width * 0.3,
                borderRadius: 70,
                marginTop: "2%",
              }}
              source={profileImage}
            />
          )}
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
            <Text style={{ color: "#005f48", fontSize: 20 }}>D.O.B</Text>
            {isEditing ? (
              <View>
                <TouchableOpacity onPress={handleOnPressStartDate}>
                  <Text style={{ color: "white", fontSize: 16 }}>{dob}</Text>
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
                        onSelectedChange={(date) => setDOB(date)}
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
              </View>
            ) : (
              <Text style={{ color: "white", fontSize: 16 }}>{dob}</Text>
            )}
          </View>
          {isEditing ? (
            <View
              style={{
                height: height * 0.2,
                width: width * 0.85,
                justifyContent: "space-between",
                marginBottom: "5%",
              }}
            >
              <View style={{ height: height * 0.04 }}>
                <Text style={{ color: "#005f48", fontSize: 20 }}>
                  Permanent Address
                </Text>
              </View>
              <View
                style={{
                  height: height * 0.04,
                  width: width * 0.85,
                  borderWidth: 1,
                  borderColor: "white",
                  borderRadius: 10,
                  paddingHorizontal: "2%",
                }}
              >
                <TextInput
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontFamily: "Montserrat",
                  }}
                  value={addressLine1}
                  onChangeText={setAddressLine1}
                />
              </View>
              <View
                style={{
                  height: height * 0.04,
                  width: width * 0.85,
                  borderWidth: 1,
                  borderColor: "white",
                  borderRadius: 10,
                  paddingHorizontal: "2%",
                }}
              >
                <TextInput
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontFamily: "Montserrat",
                  }}
                  value={addressLine2}
                  onChangeText={setAddressLine2}
                />
              </View>
              <View
                style={{
                  height: height * 0.04,
                  width: width * 0.85,
                  borderWidth: 1,
                  borderColor: "white",
                  borderRadius: 10,
                  paddingHorizontal: "2%",
                }}
              >
                <TextInput
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontFamily: "Montserrat",
                  }}
                  value={pinCode}
                  onChangeText={setPinCode}
                />
              </View>
            </View>
          ) : (
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
              <Text style={{ color: "white", fontSize: 16 }} numberOfLines={1}>
                {addressLine1 + ", " + addressLine2 + ", " + pinCode}
              </Text>
            </View>
          )}
          {!isEditing ? (
            <View>
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
                <Text style={{ color: "#005f48", fontSize: 20 }}>State</Text>
                <Text style={{ color: "white", fontSize: 16 }}>{state}</Text>
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
                <Text style={{ color: "#005f48", fontSize: 20 }}>District</Text>
                <Text style={{ color: "white", fontSize: 16 }}>{District}</Text>
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
                <Text style={{ color: "#005f48", fontSize: 20 }}>Taluk</Text>
                <Text style={{ color: "white", fontSize: 16 }}>{Taluk}</Text>
              </View>
            </View>
          ) : (
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
                <Text style={{ fontSize: 16, color: "#005f48" }}>
                  {" "}
                  Select State :
                </Text>
                <TouchableOpacity
                  style={{
                    height: height * 0.05,
                    width: width * 0.4,
                    borderWidth: 1,
                    borderColor: "white",
                    borderRadius: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  onPress={handleDeliveryStateDropdownPress}
                >
                  <Text
                    numberOfLines={1}
                    ellipsizeMode={"tail"}
                    style={{
                      marginLeft: "10%",
                      color: "white",
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
                      color="white"
                      style={{ marginRight: "3%" }}
                    />
                  )) || (
                    <Icon
                      name="chevron-down"
                      size={30}
                      color="white"
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
                <Text style={{ fontSize: 16, color: "#005f48" }}>
                  {" "}
                  Select District :
                </Text>
                {(state != "Select" && (
                  <TouchableOpacity
                    style={{
                      height: height * 0.05,
                      width: width * 0.4,
                      borderWidth: 1,
                      borderColor: "white",
                      borderRadius: 20,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    onPress={handleDeliveryDistrictDropdownPress}
                  >
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={"tail"}
                      style={{
                        marginLeft: "10%",
                        color: "white",
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
                        color="white"
                        style={{ marginRight: "3%" }}
                      />
                    )) || (
                      <Icon
                        name="chevron-down"
                        size={30}
                        color="white"
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
                <Text style={{ fontSize: 16, color: "#005f48" }}>
                  {" "}
                  Select Taluk :
                </Text>
                {(state != "Select" && District != "Select" && (
                  <TouchableOpacity
                    style={{
                      height: height * 0.05,
                      width: width * 0.4,
                      borderWidth: 1,
                      borderColor: "white",
                      borderRadius: 20,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    onPress={handleDeliveryTalukDropdownPress}
                  >
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={"tail"}
                      style={{
                        marginLeft: "10%",
                        color: "white",
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
                        color="white"
                        style={{ marginRight: "3%" }}
                      />
                    )) || (
                      <Icon
                        name="chevron-down"
                        size={30}
                        color="white"
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
          )}

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
              marginTop: "8%",
            }}
            onPress={isEditing ? handleUpdateProfile : handleEditProfile}
          >
            <TextB style={{ color: "white", fontSize: 18 }}>
              {isEditing ? "Update Profile" : "Edit Profile"}
            </TextB>
          </TouchableOpacity>

          {!isEditing ? (
            <TouchableOpacity
              style={{
                height: height * 0.07,
                width: width * 0.6,
                borderRadius: 30,
                backgroundColor: "#fff",
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                elevation: 4,
                shadowColor: "black",
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.5,
                shadowRadius: 10,
                marginTop: "8%",
              }}
            >
              <TextB style={{ color: "#005f48", fontSize: 18 }}>Sign out</TextB>
            </TouchableOpacity>
          ) : null}
          <View style={{ height: height * 0.15 }}></View>
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
  centeredView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  modalOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  modalOptionText: {
    fontSize: 16,
    color: "black",
  },
});
