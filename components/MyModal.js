import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { BlurView } from "expo-blur";
import { Modal } from "react-native";

import PlantInfo from "./PlantInfo";

export const MyModal = ({
  children,
  visible,
  onRequestClose,
  onPressOverlay,
  plant,
  image,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onRequestClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onPressOverlay}
      >
        <BlurView style={StyleSheet.absoluteFill} tint="dark" intensity={50} />
        <PlantInfo plant={plant} image={image} />
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MyModal;
