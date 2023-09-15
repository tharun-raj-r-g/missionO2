import React, { useState, useEffect } from "react";
import {
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import axiosInstance from "../api/api";
import Text from "../fonts/Text";
import TextB from "../fonts/TextBold";
import Icon from "react-native-vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";

const { width, height } = Dimensions.get("window");

const OrderCompleteCard = ({ item, name, fullname, image }) => {
  const toggleModal1 = () => {
    setModalVisible1(!modalVisible1);
  };

  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [isimage, setImage] = useState("");
  const [orderStatus, setOrderStatus] = useState("Delivered");
  const [images, setImages] = useState(Array(8).fill(null));
  const [imageList, setImageList] = useState([]);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [orderCompletedModalVisible, setOrderCompletedModalVisible] =
    useState(false);
  const pickImage = (index) => {
    setSelectedFrame(index);
    setModalVisible2(true);
    setModalVisible1(false);
  };

  const handleModalOption = async (option) => {
    try {
      setModalVisible2(false);
      setModalVisible1(true);
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

  useEffect(() => {
    getImage();
  }, []);

  const getImage = () => {
    axiosInstance
      .get(`/plant/image/${image}`)
      .then((response) => {
        setImage(response.data.image);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCompleteOrder = () => {
    setModalVisible1(false);
    setOrderCompletedModalVisible(true);
    setTimeout(() => {
      setOrderCompletedModalVisible(false);
    }, 3000);
  };

  return (
    <View
      style={{
        width: width * 0.5,
        height: height * 0.3,
        backgroundColor: "#fafafa",
        borderRadius: 10,
        elevation: 5,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 6,
        marginHorizontal: 20,
      }}
    >
      <View
        style={{
          width: width * 0.45,
          height: height * 0.12,
          alignItems: "center",
          backgroundColor: "#fafafa",
        }}
      >
        <Image
          style={{
            height: height * 0.12,
            width: width * 0.3,
            resizeMode: "contain",
            borderRadius: 10,
          }}
          source={{ uri: `data:image/jpeg;base64,${isimage}` }}
        ></Image>
      </View>
      <View
        style={{
          width: width * 0.35,
          height: height * 0.12,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextB
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            fontSize: 17,
            color: "#005f48",
            marginTop: "3%",
          }}
        >
          {name}
        </TextB>

        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            fontSize: 11,
            marginVertical: "3%",
            color: orderStatus === "Delivered" ? "green" : "darkorange",
          }}
        >
          Status: {orderStatus}
        </Text>

        {orderStatus === "Delivered" ? (
          <TouchableOpacity
            onPress={toggleModal1}
            style={{
              flexDirection: "row",
              width: width * 0.4,
              justifyContent: "center",
              alignItems: "center",
              padding: "4%",
              borderRadius: 5,
              elevation: 5,
              shadowColor: "black",
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.5,
              shadowRadius: 10,
              marginVertical: "3%",
              backgroundColor: "#005f48",
            }}
          >
            <TextB style={{ color: "white" }}>Complete Order</TextB>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              width: width * 0.4,
              justifyContent: "center",
              alignItems: "center",
              padding: "4%",
              borderRadius: 5,
              elevation: 5,
              shadowColor: "black",
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.5,
              shadowRadius: 10,
              marginVertical: "3%",
              backgroundColor: "#ccc",
            }}
            disabled={true}
          >
            <TextB style={{ color: "white" }}>Complete Order</TextB>
          </TouchableOpacity>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible1}
          onRequestClose={() => setModalVisible1(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent2}>
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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "5%",
                }}
              >
                <TouchableOpacity
                  onPress={() => setModalVisible1(false)}
                  style={{
                    width: width * 0.38,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "2.5%",
                    borderRadius: 5,
                    elevation: 5,
                    shadowColor: "black",
                    shadowOffset: { width: 0, height: 5 },
                    shadowOpacity: 0.5,
                    shadowRadius: 10,
                    marginVertical: "2%",
                    backgroundColor: "#005f48",
                  }}
                >
                  <TextB style={{ color: "white" }}>Cancel</TextB>
                </TouchableOpacity>
                {imageList.length >= 1 ? (
                  <TouchableOpacity
                    onPress={handleCompleteOrder}
                    style={{
                      width: width * 0.38,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "2.5%",
                      borderRadius: 5,
                      elevation: 5,
                      shadowColor: "black",
                      shadowOffset: { width: 0, height: 5 },
                      shadowOpacity: 0.5,
                      shadowRadius: 10,
                      marginVertical: "2%",
                      backgroundColor: "#005f48",
                    }}
                  >
                    <TextB style={{ color: "white" }}>Complete Order</TextB>
                  </TouchableOpacity>
                ) : (
                  <View
                    onPress={handleCompleteOrder}
                    style={{
                      width: width * 0.38,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "2.5%",
                      borderRadius: 5,
                      elevation: 5,
                      shadowColor: "black",
                      shadowOffset: { width: 0, height: 5 },
                      shadowOpacity: 0.5,
                      shadowRadius: 10,
                      marginVertical: "2%",
                      backgroundColor: "gray",
                    }}
                  >
                    <TextB style={{ color: "white" }}>Complete Order</TextB>
                  </View>
                )}
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={() => setModalVisible2(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextB style={styles.modalTitle}>Select an option</TextB>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => handleModalOption("gallery")}
              >
                <Text style={styles.modalOptionText}>Choose from Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => handleModalOption("camera")}
              >
                <Text style={styles.modalOptionText}>Take a Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => setModalVisible2(false)}
              >
                <Text style={styles.modalOptionText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={orderCompletedModalVisible}
          onRequestClose={() => setOrderCompletedModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View
              style={[
                styles.modalContent,
                {
                  alignItems: "center",
                  justifyContent: "center",
                  width: "90%",
                },
              ]}
            >
              <TextB style={[styles.modalTitle, { color: "#005f48" }]}>
                Order Completed
              </TextB>
              <Text style={styles.modalOptionText}>
                Thank you for your order!
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default OrderCompleteCard;

const styles = StyleSheet.create({
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
  modalContent2: {
    backgroundColor: "white",
    width: "90%",
    height: "35%",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    padding: 20,
    justifyContent: "center",
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
});
