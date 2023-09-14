import React, { Component } from "react";
import { View, Animated } from "react-native";
import FastImage from "react-native-fast-image";

class GifComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animatedValue: new Animated.Value(0),
      isGifVisible: true,
    };
  }

  componentDidMount() {
    this.playGifAnimation();
  }

  playGifAnimation = () => {
    Animated.timing(this.state.animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      this.setState({ isGifVisible: false });
    });
  };

  render() {
    const { animatedValue, isGifVisible } = this.state;

    return (
      <View>
        {isGifVisible && (
          <Animated.View style={{ opacity: animatedValue }}>
            <FastImage
              source={require("../assets/Order.gif")}
              style={{ width: 200, height: 200 }}
            />
          </Animated.View>
        )}
      </View>
    );
  }
}

export default GifComponent;
