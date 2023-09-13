import React, { useState, useRef, useEffect } from "react";
import { View, Image, ScrollView, Dimensions, StyleSheet } from "react-native";
import Text from "../fonts/Text";
import TextB from "../fonts/TextBold";

const Carousel = ({ items }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const windowWidth = Dimensions.get("window").width - 30;
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextPage = (currentPage + 1) % items.length;
      scrollViewRef.current.scrollTo({
        x: nextPage * windowWidth,
        animated: true,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [currentPage, items.length, windowWidth]);

  const handleScroll = (event) => {
    const page = Math.round(event.nativeEvent.contentOffset.x / windowWidth);
    setCurrentPage(page);
  };

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
      >
        {items.map((item, index) => (
          <View key={index} style={styles.carouselItem}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.infoContainer}>
              <TextB style={styles.title}>{item.title}</TextB>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.dotContainer}>
        {items.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentPage === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    height: 140,
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 20,
    marginTop: 10,
  },
  carouselItem: {
    flexDirection: "row",
    alignItems: "center",
    width: Dimensions.get("window").width - 30,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "51%",
    height: "100%",
    resizeMode: "contain",
    marginLeft: 2,
  },
  infoContainer: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 14,
    marginBottom: 6,
    color: "#005F48",
  },
  description: {
    fontSize: 10.5,
    marginBottom: 6,
    color: "#595959",
    textAlign: "justify",
  },
  date: {
    fontSize: 10.5,
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#005F48",
  },
});

export default Carousel;
