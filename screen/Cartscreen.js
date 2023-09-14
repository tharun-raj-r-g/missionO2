import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  ImageBackground,
  Modal,
  TextInput,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
const { width, height } = Dimensions.get("window");
import Icon from "react-native-vector-icons/Feather";
import CartCard from "../components/CartCard";
import { useDispatch, useSelector } from "react-redux";
import PlantAddressComp from "../components/plantingaddress";
import * as ImagePicker from "expo-image-picker";
import axiosInstance from "../api/api";
import { useEffect } from "react";
import { emptyCart } from "../redux/reducers/cartReducers";
import Text from "../fonts/Text";
import TextB from "../fonts/TextBold";

const Cartscreen = ({ navigation }) => {
  const route = useRoute();
  const liveAddress = route.params?.liveAddress;
  const cart = useSelector((state) => state.cart.cart);
  const [selectedValue, setSelectedValue] = useState("select");
  const [statelist, setstatelist] = useState([]);
  const [districtlist, setdistrictlist] = useState([]);
  const [taluklist, settaluklist] = useState([]);
  const [isStateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [isDistrictDropdownOpen, setDistrictDropdownOpen] = useState(false);
  const [isTalukDropdownOpen, setTalukDropdownOpen] = useState(false);
  const [selectedState, setSelectedState] = useState("Select");
  const [selectedDistrict, setSelectedDistrict] = useState("Select");
  const [selectedTaluk, setSelectedTaluk] = useState("Select");
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState(null);
  const [selectedPlantAddress, setSelectedPlantAddress] = useState(null);
  const [images, setImages] = useState(Array(8).fill(null));
  const [imageList, setImageList] = useState([]);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isName, setName] = useState("");
  const [isEmail, setEmail] = useState("");
  const [isDOB, setDOB] = useState("");
  useEffect(() => {
    getState();
  }, []);
  useEffect(() => {
    getDistrict();
  }, [selectedState]);
  useEffect(() => {
    getTaluk();
  }, [selectedState, selectedDistrict]);
  const ConfirmDeliveryAddress = (data) => {
    setSelectedDeliveryAddress(data);
  };
  const ConfirmPlantAddress = (data) => {
    setSelectedPlantAddress(data);
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
  const getDistrict = () => {
    axiosInstance
      .get(`/address/view-places`, {
        params: {
          state: selectedState,
        },
      })
      .then((response) => {
        setdistrictlist(response.data.elements);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getTaluk = () => {
    axiosInstance
      .get(`/address/view-places`, {
        params: {
          state: selectedState,
          district: selectedDistrict,
        },
      })
      .then((response) => {
        settaluklist(response.data.elements);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleStateDropdownPress = () => {
    setStateDropdownOpen(!isStateDropdownOpen);
  };
  const handleDistrictDropdownPress = () => {
    setDistrictDropdownOpen(!isDistrictDropdownOpen);
  };
  const handleTalukDropdownPress = () => {
    setTalukDropdownOpen(!isTalukDropdownOpen);
  };
  const handleStateSelect = (name) => {
    setSelectedState(name);
    setSelectedDistrict("Select");
    setSelectedTaluk("Select");
    setdistrictlist([]);
    settaluklist([]);
    setStateDropdownOpen(false);
  };
  const handleDistrictSelect = (name) => {
    setSelectedDistrict(name);
    setSelectedTaluk("Select");
    settaluklist([]);
    setDistrictDropdownOpen(false);
  };
  const handleTalukSelect = (name) => {
    setSelectedTaluk(name);
    setTalukDropdownOpen(false);
  };
  const handleSelect = (newValue) => {
    setSelectedValue(newValue);
  };
  const handleDeliverySelect = (newValue) => {
    setSelectedDeliveryAddress(newValue);
  };

  const pickImage = (index) => {
    setSelectedFrame(index);
    setModalVisible(true);
  };

  const handleModalOption = async (option) => {
    try {
      setModalVisible(false);

      if (option === "gallery") {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
        });

        if (!result.canceled) {
          const newImages = [...images];
          newImages[selectedFrame] = result.assets[0].uri;
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

        if (!result.canceled) {
          const newImages = [...images];
          newImages[selectedFrame] = result.assets[0].uri;
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
  const handleConfirm = () => {
    navigation.navigate("OrderConfirm");
    dispatch(emptyCart(cart));
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
            <TextB style={{ fontSize: 18, color: "black", marginBottom: "2%" }}>
              Enter your name:
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
                  fontSize: 17,
                  fontFamily: "Montserrat",
                }}
                placeholder="Name"
                value={isName}
                onChangeText={setName}
              />
            </View>
            <TextB style={{ fontSize: 18, color: "black", marginBottom: "2%" }}>
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
                  fontSize: 17,
                  fontFamily: "Montserrat",
                }}
                placeholder="Email"
                value={isEmail}
                onChangeText={setEmail}
              />
            </View>
            <TextB style={{ fontSize: 18, color: "black", marginBottom: "2%" }}>
              Enter DOB:
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
              }}
            >
              <TextInput
                style={{
                  color: "#005f48",
                  fontSize: 17,
                  fontFamily: "Montserrat",
                }}
                placeholder="DOB"
                value={isDOB}
                onChangeText={setDOB}
              />
            </View>
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
                borderBottomWidth: 2,
                borderBottomColor: "#005f48",
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
            <View
              style={{
                height: height * 0.05,
                width: width * 0.92,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "10%",
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
                onPress={handleStateDropdownPress}
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
                  {selectedState}
                </Text>
                {(isStateDropdownOpen && (
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
            {isStateDropdownOpen && (
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
                      onPress={() => handleStateSelect(name)}
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
              {(selectedState != "Select" && (
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
                  onPress={handleDistrictDropdownPress}
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
                    {selectedDistrict}
                  </Text>

                  {(isDistrictDropdownOpen && (
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
                    {selectedDistrict}
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
            {isDistrictDropdownOpen && (
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
                  {districtlist.map((name) => (
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
                      onPress={() => handleDistrictSelect(name)}
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
              {(selectedState != "Select" && selectedDistrict != "Select" && (
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
                  onPress={handleTalukDropdownPress}
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
                    {selectedTaluk}
                  </Text>

                  {(isTalukDropdownOpen && (
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
                    {selectedTaluk}
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
            {isTalukDropdownOpen ? (
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
                  {taluklist.map((name) => (
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
                      onPress={() => handleTalukSelect(name)}
                    >
                      <Text style={{ textAlign: "left", fontSize: 14 }}>
                        {name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            ) : null}
            {imageList.length == 6 &&
            selectedDeliveryAddress != null &&
            selectedPlantAddress != null &&
            selectedState != "Select" &&
            selectedDistrict != "Select" &&
            selectedTaluk != "Select" ? (
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
                  alignItems: "center",
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
                  alignItems: "center",
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
  attachButton: {
    height: height * 0.06,
    width: width * 0.92,
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    marginTop: "5%",
  },
  icon: {
    marginLeft: width * 0.03,
  },
  attachText: {
    marginLeft: width * 0.03,
    fontSize: 16,
  },
  attachCount: {
    marginLeft: width * 0.03,
    fontSize: 16,
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
  addIcon: {
    fontSize: 24,
    color: "gray",
  },
});
