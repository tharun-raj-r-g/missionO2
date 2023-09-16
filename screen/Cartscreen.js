import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  PixelRatio,
  Modal,
  TextInput,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
const { width, height } = Dimensions.get("window");
import Icon from "react-native-vector-icons/Feather";
import CartCard from "../components/CartCard";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import axiosInstance from "../api/api";
import { useEffect } from "react";
import { zeroQuantityAll } from "../redux/reducers/productReducer";
import { emptyCart } from "../redux/reducers/cartReducers";
import Text from "../fonts/Text";
import TextB from "../fonts/TextBold";
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";
import FormData from "form-data";
import * as Permissions from "expo-permissions";

const Cartscreen = ({ navigation }) => {
  const route = useRoute();
  const cart = useSelector((state) => state.cart.cart);
  const products = useSelector((state) => state.product.product);

  const [statelist, setstatelist] = useState([]);

  const [DeliveryDistrictList, setDeliveryDistrictList] = useState([]);
  const [PlantingDistrictList, setPlantingDistrictList] = useState([]);

  const [DeliveryTalukList, setDeliveryTalukList] = useState([]);
  const [PlantingTalukList, setPlantingTalukList] = useState([]);

  const [isDeliveryStateDropdownPress, setDeliveryStateDropdownOpen] =
    useState(false);
  const [isPlantingStateDropdownPress, setPlantingStateDropdownOpen] =
    useState(false);

  const [isDeliveryDistrictDropdownOpen, setDeliveryDistrictDropdownOpen] =
    useState(false);
  const [isPlantingDistrictDropdownOpen, setPlantingDistrictDropdownOpen] =
    useState(false);

  const [isDeliveryTalukDropdownPress, setDeliveryTalukDropdownOpen] =
    useState(false);
  const [isPlantingTalukDropdownPress, setPlantingTalukDropdownOpen] =
    useState(false);

  const [selectedDeliveryState, setSelectedDeliveryState] = useState("Select");
  const [selectedPlantingState, setSelectedPlantingState] = useState("Select");

  const [selectedDeliveryDistrict, setSelectedDeliveryDistrict] =
    useState("Select");
  const [selectedPlantingDistrict, setSelectedPlantingDistrict] =
    useState("Select");

  const [selectedDeliveryTaluk, setSelectedDeliveryTaluk] = useState("Select");
  const [selectedPlantingTaluk, setSelectedPlantingTaluk] = useState("Select");

  const [images, setImages] = useState(Array(8).fill(null));
  const [imageList, setImageList] = useState([]);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isName, setName] = useState("");
  const [isEmail, setEmail] = useState("");
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const startDate = getFormatedDate("YYYY/MM/DD");
  const [selectedStartDate, setSelectedStartDate] = useState("YYYY/MM/DD");
  const [startedDate, setStartedDate] = useState("01/01/2015");
  const [isDeliveryAddressLine1, setDeliveryAddressLine1] = useState("");
  const [isDeliveryAddressLine2, setDeliveryAddressLine2] = useState("");
  const [isDeliveryPinCode, setDeliveryPinCode] = useState("");
  const [isPlantingAddressLocation, setPlantingAddressLocation] = useState("");
  const [isPlantLatitude, setPlantLatitude] = useState("");
  const [isPlantLongitude, setPlantLongitude] = useState("");
  const fontSize = PixelRatio.getFontScale() * 13.5;

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
        setName(response.data.name);
        setEmail(response.data.email);
        setSelectedStartDate(response.data.dob.slice(0, 10));
        setDeliveryAddressLine1(response.data.address.addressLine1);
        setDeliveryAddressLine2(response.data.address.addressLine2);
        setDeliveryPinCode(response.data.address.pinCode);
        setSelectedDeliveryState(response.data.address.state);
        setSelectedDeliveryDistrict(response.data.address.district);
        setSelectedDeliveryTaluk(response.data.address.taluk);
        console.log(isName);
        console.log(isEmail);
        console.log(response.data.dob);
        console.log(selectedStartDate);
      })
      .catch((error) => {
        console.log(error);
        console.log("hjjji");
      });
  };

  useEffect(() => {
    getState();
  }, []);
  useEffect(() => {
    getDeliveryDistrict();
  }, [selectedDeliveryState]);
  useEffect(() => {
    getPlantingDistrict();
  }, [selectedPlantingState]);
  useEffect(() => {
    getDeliveryTaluk();
  }, [selectedDeliveryState, selectedDeliveryDistrict]);
  useEffect(() => {
    getPlantingTaluk();
  }, [selectedPlantingState, selectedPlantingDistrict]);
  const ConfirmPlantingAddress = (location, latitude, longitude) => {
    setPlantingAddressLocation(location);
    setPlantLatitude(latitude);
    setPlantLongitude(longitude);
  };
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
          state: selectedDeliveryState,
        },
      })
      .then((response) => {
        setDeliveryDistrictList(response.data.elements);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getPlantingDistrict = () => {
    axiosInstance
      .get(`/address/view-places`, {
        params: {
          state: selectedPlantingState,
        },
      })
      .then((response) => {
        setPlantingDistrictList(response.data.elements);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDeliveryTaluk = () => {
    axiosInstance
      .get(`/address/view-places`, {
        params: {
          state: selectedDeliveryState,
          district: selectedDeliveryDistrict,
        },
      })
      .then((response) => {
        setDeliveryTalukList(response.data.elements);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getPlantingTaluk = () => {
    axiosInstance
      .get(`/address/view-places`, {
        params: {
          state: selectedPlantingState,
          district: selectedPlantingDistrict,
        },
      })
      .then((response) => {
        setPlantingTalukList(response.data.elements);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeliveryStateDropdownPress = () => {
    setDeliveryStateDropdownOpen(!isDeliveryStateDropdownPress);
  };
  const handlePlantingStateDropdownPress = () => {
    setPlantingStateDropdownOpen(!isPlantingStateDropdownPress);
  };

  const handleDeliveryDistrictDropdownPress = () => {
    setDeliveryDistrictDropdownOpen(!isDeliveryDistrictDropdownOpen);
  };
  const handlePlantingDistrictDropdownPress = () => {
    setPlantingDistrictDropdownOpen(!isPlantingDistrictDropdownOpen);
  };

  const handleDeliveryTalukDropdownPress = () => {
    setDeliveryTalukDropdownOpen(!isDeliveryTalukDropdownPress);
  };
  const handlePlantingTalukDropdownPress = () => {
    setPlantingTalukDropdownOpen(!isPlantingTalukDropdownPress);
  };

  const handleDeliveryStateSelect = (name) => {
    setSelectedDeliveryState(name);
    setSelectedDeliveryDistrict("Select");
    setSelectedDeliveryTaluk("Select");
    setDeliveryDistrictList([]);
    setDeliveryTalukList([]);
    setDeliveryStateDropdownOpen(false);
  };
  const handlePlantingStateSelect = (name) => {
    setSelectedPlantingState(name);
    setSelectedPlantingDistrict("Select");
    setSelectedPlantingTaluk("Select");
    setPlantingDistrictList([]);
    setPlantingTalukList([]);
    setPlantingStateDropdownOpen(false);
  };

  const handleDeliveryDistrictSelect = (name) => {
    setSelectedDeliveryDistrict(name);
    setSelectedDeliveryTaluk("Select");
    setDeliveryTalukList([]);
    setDeliveryDistrictDropdownOpen(false);
  };
  const handlePlantingDistrictSelect = (name) => {
    setSelectedPlantingDistrict(name);
    setSelectedPlantingTaluk("Select");
    setPlantingTalukList([]);
    setPlantingDistrictDropdownOpen(false);
  };

  const handleDeliverytalukSelect = (name) => {
    setSelectedDeliveryTaluk(name);
    setDeliveryTalukDropdownOpen(false);
  };
  const handlePlantingtalukSelect = (name) => {
    setSelectedPlantingTaluk(name);
    setPlantingTalukDropdownOpen(false);
  };

  const pickImage = (index) => {
    setSelectedFrame(index);
    setModalVisible(true);
  };

  const handleModalOption = async (option) => {
    try {
      setModalVisible(false);

      const { status } = await Permissions.askAsync(Permissions.CAMERA);

      if (status !== "granted") {
        alert(
          "Camera roll permission denied. Please enable it in your device settings to use the camera."
        );
        return;
      }

      if (option === "gallery") {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
        });

        if (!result.cancelled) {
          const newImages = [...images];
          newImages[selectedFrame] = result.uri;
          setImages(newImages);
          if (!imageList.includes(selectedFrame)) {
            setImageList([...imageList, selectedFrame]);
          }
        }
      } else if (option === "camera") {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
        });

        if (!result.cancelled) {
          const newImages = [...images];
          newImages[selectedFrame] = result.uri;
          setImages(newImages);
          if (!imageList.includes(selectedFrame)) {
            setImageList([...imageList, selectedFrame]);
          }
        }
      }
    } catch (error) {
      console.error("Error picking images: ", error);
    }
  };
  const dispatch = useDispatch();
  const handleUpload = async () => {
    const data = new FormData();
    data.append("locationURL", isPlantLatitude + " " + isPlantLongitude);
    data.append("address.addressLine1.", isDeliveryAddressLine1);
    data.append("address.addressLine2", isDeliveryAddressLine2);
    data.append("address.pinCode", isDeliveryPinCode);
    data.append("address.state", selectedDeliveryState);
    data.append("address.district", selectedDeliveryDistrict);
    data.append("address.taluk", selectedDeliveryTaluk);
    data.append("address.country", "India");
    console.log(images);
    images.forEach((image, index) => {
      if (image) {
        const uriParts = image.split(".");
        const fileType = uriParts[uriParts.length - 1];
        console.log(image);

        data.append("images", {
          uri: image,
          type: `image/${fileType}`,
          name: `image${index + 1}.${fileType}`,
        });
      }
    });

    cart.forEach((product, index) => {
      const productKey = `products[${index}]`;

      data.append(`${productKey}.plantId`, product.id);
      data.append(`${productKey}.plantName`, product.name);
      data.append(`${productKey}.type`, "plant");
      data.append(`${productKey}.quantity`, product.quantity);
    });
    data.append("state", selectedPlantingState);
    data.append("district", selectedPlantingDistrict);
    data.append("taluk", selectedDeliveryTaluk);
    axiosInstance
      .post("/orders/create", data, {
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

  const handleConfirm = () => {
    handleUpload();
    dispatch(emptyCart(cart));
    dispatch(zeroQuantityAll(products));
    navigation.navigate("OrderConfirm");
  };

  function handleChangeStartDate(propDate) {
    setStartedDate(propDate);
  }

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: cart.length ? "#f2f2f2" : "#00b388" },
      ]}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={"dark-content"}
      />
      {cart.length ? (
        <View>
          <View
            style={{
              height: height * 0.12,
              width: width * 0.92,
              flexDirection: "row",
              alignItems: "flex-end",
              marginBottom: "5%",
              alignSelf: "center",
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name="chevron-left"
                size={32}
                color="black"
                style={{ marginRight: "3%" }}
              />
            </TouchableOpacity>
            <Text style={{ marginBottom: "1.5%", fontSize: 16 }}>My Cart</Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            <TextB style={{ fontSize: 16, color: "black", marginBottom: "2%" }}>
              Enter your Name:
            </TextB>
            <View
              style={{
                height: height * 0.05,
                width: width * 0.92,
                justifyContent: "center",
                borderWidth: 2,
                borderColor: "#00b388",
                borderRadius: 20,
                marginBottom: "5%",
                padding: "2%",
              }}
            >
              <TextInput
                style={{
                  color: "#005f48",
                  fontSize,
                  fontFamily: "Montserrat",
                }}
                placeholder="Name"
                value={isName}
                onChangeText={setName}
              />
            </View>
            <TextB style={{ fontSize: 16, color: "black", marginBottom: "2%" }}>
              Enter your Email:
            </TextB>
            <View
              style={{
                height: height * 0.05,
                width: width * 0.92,
                justifyContent: "center",
                borderWidth: 2,
                borderColor: "#00b388",
                borderRadius: 20,
                padding: "2%",
                marginBottom: "5%",
              }}
            >
              <TextInput
                style={{
                  color: "#005f48",
                  fontSize,
                  fontFamily: "Montserrat",
                }}
                placeholder="Email"
                value={isEmail}
                onChangeText={setEmail}
              />
            </View>
            <TextB style={{ fontSize: 16, color: "black", marginBottom: "2%" }}>
              Enter DOB:
            </TextB>
            <TouchableOpacity
              onPress={handleOnPressStartDate}
              style={{
                height: height * 0.05,
                width: width * 0.92,
                justifyContent: "center",
                borderWidth: 2,
                borderColor: "#00b388",
                borderRadius: 20,
                padding: "2%",
              }}
            >
              <Text
                style={{
                  fontSize,
                  color: selectedStartDate == "YYYY/MM/DD" ? "gray" : "#005f48",
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
                    minimumDate={startDate}
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
            <View
              style={{
                width: width * 0.92,
                backgroundColor: "#00b388",
                borderRadius: 15,
                elevation: 5,
                shadowColor: "black",
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
                marginBottom: "5%",
                marginTop: "5%",
              }}
            >
              {cart.map((item, index) => (
                <CartCard
                  name={item.name}
                  fullname={item.fullname}
                  image={item.images}
                  item={item}
                />
              ))}

              <View
                style={{
                  height: height * 0.07,
                  width: width * 0.85,
                  flexDirection: "row",
                  alignItems: "center",
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: "white",
                  alignSelf: "center",
                }}
              >
                <View
                  style={{
                    height: height * 0.07,
                    width: width * 0.75,
                    paddingLeft: "3%",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 12, opacity: 0.8 }}>
                    Add more plants
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    height: height * 0.08,
                    width: width * 0.1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    navigation.navigate("Order");
                  }}
                >
                  <Icon name="plus-circle" size={24} color="white" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{
                  height: height * 0.12,
                  width: width * 0.92,
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
                onPress={() => {
                  navigation.navigate("Order");
                }}
              >
                <Text style={{ marginBottom: "2%", color: "white" }}>
                  explore more
                </Text>
              </TouchableOpacity>
            </View>
            <TextB
              style={{
                fontSize: 16,
                color: "black",
                marginBottom: "5%",
                alignSelf: "center",
              }}
            >
              Delivery Address
            </TextB>
            <View
              style={{
                height: height * 0.05,
                width: width * 0.92,
                justifyContent: "center",
                borderWidth: 2,
                borderColor: "#00b388",
                borderRadius: 20,
                marginBottom: "5%",
                padding: "2%",
              }}
            >
              <TextInput
                style={{
                  color: "#005f48",
                  fontSize,
                  fontFamily: "Montserrat",
                }}
                placeholder="Enter Address Line 1"
                value={isDeliveryAddressLine1}
                onChangeText={setDeliveryAddressLine1}
              />
            </View>
            <View
              style={{
                height: height * 0.05,
                width: width * 0.92,
                justifyContent: "center",
                borderWidth: 2,
                borderColor: "#00b388",
                borderRadius: 20,
                marginBottom: "5%",
                padding: "2%",
              }}
            >
              <TextInput
                style={{
                  color: "#005f48",
                  fontSize,
                  fontFamily: "Montserrat",
                }}
                placeholder="Enter Address Line 2"
                value={isDeliveryAddressLine2}
                onChangeText={setDeliveryAddressLine2}
              />
            </View>
            <View
              style={{
                height: height * 0.05,
                width: width * 0.92,
                justifyContent: "center",
                borderWidth: 2,
                borderColor: "#00b388",
                borderRadius: 20,
                marginBottom: "5%",
                padding: "2%",
              }}
            >
              <TextInput
                style={{
                  color: "#005f48",
                  fontSize,
                  fontFamily: "Montserrat",
                }}
                placeholder="Enter Pincode"
                value={isDeliveryPinCode}
                onChangeText={setDeliveryPinCode}
              />
            </View>
            <View
              style={{
                height: height * 0.05,
                width: width * 0.92,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TextB style={{ fontSize: 16 }}> Select State :</TextB>
              <TouchableOpacity
                style={{
                  height: height * 0.05,
                  width: width * 0.4,
                  backgroundColor: "#00b388",
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
                  {selectedDeliveryState}
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
                width: width * 0.92,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "5%",
              }}
            >
              <TextB style={{ fontSize: 16 }}> Select District :</TextB>
              {(selectedDeliveryState != "Select" && (
                <TouchableOpacity
                  style={{
                    height: height * 0.05,
                    width: width * 0.4,
                    backgroundColor: "#00b388",
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
                    {selectedDeliveryDistrict}
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
                    {selectedDeliveryDistrict}
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
                width: width * 0.92,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "5%",
              }}
            >
              <TextB style={{ fontSize: 16 }}> Select Taluk :</TextB>
              {(selectedDeliveryState != "Select" &&
                selectedDeliveryDistrict != "Select" && (
                  <TouchableOpacity
                    style={{
                      height: height * 0.05,
                      width: width * 0.4,
                      backgroundColor: "#00b388",
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
                      {selectedDeliveryTaluk}
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
                    {selectedDeliveryTaluk}
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
            <TextB
              style={{
                alignSelf: "center",
                marginLeft: width * 0.01,
                fontSize: 16,
                marginTop: "5%",
                marginBottom: "5%",
              }}
            >
              Planting Address
            </TextB>
            {isPlantingAddressLocation ? (
              <View
                style={{
                  height: height * 0.05,
                  width: width * 0.92,
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: "#00b388",
                  alignSelf: "center",
                  marginBottom: "5%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: "#005f48", fontSize: 14 }}
                  numberOfLines={1}
                >
                  {isPlantingAddressLocation}
                </Text>
              </View>
            ) : null}

            <TouchableOpacity
              style={{
                height: height * 0.05,
                width: width * 0.9,
                borderRadius: 10,
                alignSelf: "center",
                backgroundColor: "#00b388",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "5%",
              }}
              onPress={() => {
                navigation.navigate("MapScreen", {
                  ConfirmPlantingAddress: ConfirmPlantingAddress,
                });
              }}
            >
              {isPlantingAddressLocation ? (
                <TextB style={{ color: "white" }}>Change Location</TextB>
              ) : (
                <TextB style={{ color: "white" }}>
                  Select Location From Map
                </TextB>
              )}
            </TouchableOpacity>
            <View
              style={{
                height: height * 0.05,
                width: width * 0.92,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TextB style={{ fontSize: 16 }}> Select State :</TextB>
              <TouchableOpacity
                style={{
                  height: height * 0.05,
                  width: width * 0.4,
                  backgroundColor: "#00b388",
                  borderRadius: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onPress={handlePlantingStateDropdownPress}
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
                  {selectedPlantingState}
                </Text>
                {(isPlantingStateDropdownPress && (
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
            {isPlantingStateDropdownPress && (
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
                      onPress={() => handlePlantingStateSelect(name)}
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
                width: width * 0.92,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "5%",
              }}
            >
              <TextB style={{ fontSize: 16 }}> Select District :</TextB>
              {(selectedPlantingState != "Select" && (
                <TouchableOpacity
                  style={{
                    height: height * 0.05,
                    width: width * 0.4,
                    backgroundColor: "#00b388",
                    borderRadius: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  onPress={handlePlantingDistrictDropdownPress}
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
                    {selectedPlantingDistrict}
                  </Text>

                  {(isPlantingDistrictDropdownOpen && (
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
                    {selectedPlantingDistrict}
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
            {isPlantingDistrictDropdownOpen && (
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
                  {PlantingDistrictList.map((name) => (
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
                      onPress={() => handlePlantingDistrictSelect(name)}
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
                width: width * 0.92,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "5%",
              }}
            >
              <TextB style={{ fontSize: 16 }}> Select Taluk :</TextB>
              {(selectedPlantingState != "Select" &&
                selectedPlantingDistrict != "Select" && (
                  <TouchableOpacity
                    style={{
                      height: height * 0.05,
                      width: width * 0.4,
                      backgroundColor: "#00b388",
                      borderRadius: 20,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    onPress={handlePlantingTalukDropdownPress}
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
                      {selectedPlantingTaluk}
                    </Text>

                    {(isPlantingTalukDropdownPress && (
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
                    {selectedPlantingTaluk}
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
            {isPlantingTalukDropdownPress ? (
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
                  {PlantingTalukList.map((name) => (
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
                      onPress={() => handlePlantingtalukSelect(name)}
                    >
                      <Text style={{ textAlign: "left", fontSize: 14 }}>
                        {name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            ) : null}
            <TextB
              style={{
                alignSelf: "flex-start",
                marginLeft: width * 0.01,
                fontSize: 16,
                marginBottom: "5%",
                marginTop: "5%",
              }}
            >
              Upload Photo
            </TextB>

            <View style={styles.row}>
              {images.slice(0, 4).map((image, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.frame, { marginLeft: index === 0 ? 0 : 10 }]}
                  onPress={() => pickImage(index)}
                >
                  {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                  ) : (
                    <Icon name="plus" size={30} color="gray" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.row}>
              {images.slice(4, 8).map((image, index) => (
                <TouchableOpacity
                  key={index + 4}
                  style={[styles.frame, { marginLeft: index === 0 ? 0 : 10 }]}
                  onPress={() => pickImage(index + 4)}
                >
                  {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                  ) : (
                    <Icon name="plus" size={30} color="gray" />
                  )}
                </TouchableOpacity>
              ))}
            </View>

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
                    onPress={() => handleModalOption("gallery")}
                  >
                    <Text style={styles.modalOptionText}>
                      Choose from Gallery
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalOption}
                    onPress={() => handleModalOption("camera")}
                  >
                    <Text style={styles.modalOptionText}>Take a Photo</Text>
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

            {isName &&
            isEmail &&
            selectedStartDate &&
            isDeliveryAddressLine1 &&
            isDeliveryAddressLine2 &&
            isDeliveryPinCode &&
            selectedDeliveryState != "Select" &&
            selectedDeliveryDistrict != "Select" &&
            selectedDeliveryTaluk != "Select" &&
            isPlantingAddressLocation &&
            selectedPlantingState != "Select" &&
            selectedPlantingDistrict != "Select" &&
            selectedPlantingTaluk != "Select" &&
            imageList.length >= 2 ? (
              <TouchableOpacity
                style={{
                  height: height * 0.06,
                  width: width * 0.7,
                  borderRadius: 50,
                  backgroundColor: "#00b388",
                  elevation: 4,
                  shadowColor: "black",
                  shadowOffset: { width: 0, height: 5 },
                  shadowOpacity: 0.5,
                  shadowRadius: 10,
                  alignItems: "center",
                  flexDirection: "row",
                  marginTop: "10%",
                  alignSelf: "center",
                  justifyContent: "center",
                }}
                onPress={handleConfirm}
              >
                <TextB style={{ fontSize: 18, color: "white" }}>Confirm</TextB>
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  height: height * 0.06,
                  width: width * 0.7,
                  borderRadius: 50,
                  borderWidth: 1,
                  backgroundColor: "#005f48",
                  alignItems: "center",
                  flexDirection: "row",
                  marginTop: "10%",
                  alignSelf: "center",
                  justifyContent: "center",
                }}
              >
                <TextB style={{ fontSize: 18, color: "grey" }}>Confirm</TextB>
              </View>
            )}

            <View style={{ height: 50 }}></View>
          </ScrollView>
        </View>
      ) : (
        <View
          style={{
            height: height,
            width: width,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextB style={{ fontSize: 22, color: "white" }}>
            Your cart is empty !
          </TextB>
          <Image
            source={require("../assets/cartempty.png")}
            style={{
              height: height * 0.5,
              width: width * 0.7,
              marginRight: "4%",
            }}
          ></Image>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Order");
            }}
            style={{
              height: height * 0.07,
              width: width * 0.6,
              backgroundColor: "#005f48",
              borderRadius: 35,
              justifyContent: "center",
              alignItems: "center",
              elevation: 10,
              shadowColor: "black",
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
            }}
          >
            <TextB style={{ color: "white", fontSize: 20 }}>Add plants</TextB>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Cartscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  frame: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
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
});
